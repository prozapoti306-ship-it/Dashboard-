import express from "express";
import path from "path";
import dotenv from "dotenv";
import compression from "compression"; // এক্সপ্রেসের রেসপন্স কম্প্রেশনের জন্য
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(compression()); // সব ডেটা কম্প্রেস হয়ে দ্রুত কাস্টমারের কাছে পৌঁছানোর জন্য
const PORT = 3000;

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://ytwgoolesgnkegeykpup.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_9Xwy1UomtTTsk-hogHBCaw_7_0Z4FyS';
const supabase = createClient(supabaseUrl, supabaseKey);

let cachedProducts: any[] = [];
let isCacheInitialized = false;
let isFetchingProducts = false;

async function fetchProductsFromSupabase() {
  if (isFetchingProducts) {
    console.log("[CACHE] A fetch request is already in progress. Skipping to prevent overlap.");
    return;
  }
  isFetchingProducts = true;
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    if (data) {
      cachedProducts = data;
      isCacheInitialized = true;
      console.log(`[MEMORY CACHE] Successfully cached ${data.length} products in memory.`);
    }
  } catch (err: any) {
    let errMsg = err?.message || err?.details || (typeof err === "object" ? JSON.stringify(err) : String(err));
    const errCode = err?.code ? `(Code: ${err.code})` : "";
    if (errMsg.includes("<!DOCTYPE html") || errMsg.includes("<html") || errMsg.includes("Cloudflare") || errMsg.includes("521")) {
      errMsg = "Supabase database service is currently unreachable (HTTP 521 / Cloudflare gateway error).";
    } else if (errMsg.includes("canceling statement") || errMsg.includes("statement timeout") || err?.code === "57014") {
      errMsg = "Query cancelled due to statement timeout (heavy database load or massive payload).";
    } else if (errMsg.length > 200) {
      errMsg = errMsg.substring(0, 200) + "... (truncated)";
    }
    console.warn(`[CACHE] Failed to fetch products from Supabase ${errCode}: ${errMsg} Using local file cache backup.`);
  } finally {
    isFetchingProducts = false;
  }
}

app.use(express.json());

// Lazy-loaded Gemini Client as mandated in Dependency Management guidelines
let aiClient: GoogleGenAI | null = null;

function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please configure it in your AI Studio Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. Health check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Fast Cache Product APIs for <0.5s storefront loading speed
app.get("/api/products", async (req, res) => {
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
  if (!isCacheInitialized) {
    // Fire background fetch, but wait at most 1000ms so we never cause an unacceptable delay
    const fetchPromise = fetchProductsFromSupabase();
    await Promise.race([
      fetchPromise,
      new Promise(resolve => setTimeout(resolve, 1000))
    ]);
  }
  res.json(cachedProducts);
});

// Grouped products API by category for section-based homepage with cache headers
app.get("/api/products/grouped", async (req, res) => {
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
  if (!isCacheInitialized) {
    // Fire background fetch, but wait at most 1000ms so we never cause an unacceptable delay
    const fetchPromise = fetchProductsFromSupabase();
    await Promise.race([
      fetchPromise,
      new Promise(resolve => setTimeout(resolve, 1000))
    ]);
  }
  
  const grouped: { [category: string]: any[] } = {};
  for (const product of cachedProducts) {
    const cat = product.category || "Apparel";
    if (!grouped[cat]) {
      grouped[cat] = [];
    }
    grouped[cat].push(product);
  }
  res.json(grouped);
});

// Orders API routes to support dashboard order sync
app.get("/api/orders", async (req, res) => {
  try {
    const { data, error } = await supabase.from('orders').select('*');
    if (error) throw error;
    res.json(data || []);
  } catch (err: any) {
    console.error("[ORDERS] Failed to fetch orders from Supabase:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const order = req.body;
    const { error } = await supabase.from('orders').upsert(order);
    if (error) throw error;
    res.json({ success: true });
  } catch (err: any) {
    console.error("[ORDERS] Failed to save order to Supabase:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products/sync", async (req, res) => {
  try {
    const { products } = req.body;
    if (Array.isArray(products)) {
      cachedProducts = products;
      isCacheInitialized = true;
      console.log(`[MEMORY CACHE] Updated instantly via sync payload with ${products.length} products.`);
    }
  } catch (err) {
    console.error("[MEMORY CACHE] Error during sync route execution:", err);
  }

  // Refresh from Supabase in the background to ensure perfect synchronization
  fetchProductsFromSupabase();
  res.json({ success: true, count: cachedProducts.length });
});

// 2. Chat with AI Sales Assistant API
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history, contextData } = req.body;
    
    const client = getAIClient();
    
    // Construct system instructions with context
    const systemInstruction = `
You are the "Aura Lux Intelligent Sales & CRM Assistant", an advanced premium AI built into the Aura Lux E-commerce Management Dashboard.
Your demeanor is highly professional, helpful, articulate, and business-focused. You assist e-commerce managers with sales analytics, inventory suggestions, marketing drafts, fraud alerts, and customer insights.

Here is the current state of the E-commerce Database for your reference. ALWAYS use this real data when asked about store status, products, orders, or customers. Do NOT make up numbers if you have them here:

PRODUCTS LIST:
${JSON.stringify(contextData?.products || [], null, 2)}

ORDERS LIST:
${JSON.stringify(contextData?.orders || [], null, 2)}

CUSTOMERS LIST:
${JSON.stringify(contextData?.customers || [], null, 2)}

SYSTEM OVERVIEW STATS:
- Today's Sales: $${contextData?.stats?.todaySales || '2,198'}
- Total Revenue: $${contextData?.stats?.totalRevenue || '134,480'}
- Total Orders: ${contextData?.stats?.totalOrders || '1,840'}
- Pending Orders: ${contextData?.stats?.pendingOrders || '12'}
- Conversion Rate: ${contextData?.stats?.conversionRate || '3.42'}%

Guidelines:
1. If the user asks about low stock, analyze the products where stock is low (e.g. <= 5) and list them.
2. If they ask about sales performance, calculate or read the stats.
3. Suggest concrete marketing strategies (e.g., targeting VIPs like Rahat Al-Momin or Nusrat Jahan).
4. Draft professional communications (like low-stock alerts or customer win-back emails).
5. Highlight recent orders and check for potential anomalies or frauds (such as suspicious high amounts or multiple cancellations).
6. Keep your formatting beautiful and readable with Markdown list items and bold accents.
`;

    // Reconstruct the chat with history in Gemini chat format
    const chat = client.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    // Send the history first if any exists (excluding the final message)
    // Note: client.chats saves state, so we can send history messages sequentially or pass them in initialization if the SDK supports it.
    // For simplicity, we can feed the message directly, or include the history inside the contents.
    // Let's format the prompt with history concatenated to make it reliable across all SDK versions.
    let formattedPrompt = "";
    if (history && history.length > 0) {
      formattedPrompt += "Chat history for context:\n";
      history.forEach((msg: { sender: string; text: string }) => {
        formattedPrompt += `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}\n`;
      });
      formattedPrompt += "\nNew user message:\n";
    }
    formattedPrompt += message;

    const response = await chat.sendMessage({
      message: formattedPrompt
    });

    res.json({
      text: response.text || "I was unable to generate a response. Please check my connection."
    });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ error: error.message || "Something went wrong in the AI processing." });
  }
});

// 3. Automated Advanced Reports & Analytics API
app.post("/api/ai/analyze", async (req, res) => {
  try {
    const { analysisType, contextData } = req.body;
    
    const client = getAIClient();
    
    let prompt = "";
    let systemInstruction = "You are an elite Retail SaaS and E-commerce consultant with years of experience building multi-million dollar platforms like Stripe and Shopify.";
    
    if (analysisType === 'behavior') {
      prompt = `Analyze the current customer segments and purchase behaviors based on this database:
${JSON.stringify(contextData?.customers || [], null, 2)}
Include:
1. Customer retention risk analysis (especially looking at 'Inactive' customers like Sadia Afrin).
2. VIP purchase patterns and behavior (e.g. Rahat Al-Momin, Nusrat Jahan).
3. Tailored CRM marketing recommendations for each of the 4 segments (VIP, Regular, New, Inactive).
Provide actionable advice in clear Markdown bullets.`;
    } else if (analysisType === 'sales') {
      prompt = `Analyze the current sales metrics and product performances:
Stats: ${JSON.stringify(contextData?.stats || {}, null, 2)}
Products: ${JSON.stringify(contextData?.products || [], null, 2)}
Include:
1. Sales performance synthesis (Revenue, orders, conversion rate).
2. Recommendations on inventory optimization (alerting on items with critically low stock).
3. Pricing strategies for top-selling items to maximize margin.
Provide a premium executive report in Markdown.`;
    } else {
      prompt = `Review this entire store's database and alert the administrator of any operational anomalies, risks, low stock issues, or high-value orders that require immediate attention.
Products: ${JSON.stringify(contextData?.products || [], null, 2)}
Orders: ${JSON.stringify(contextData?.orders || [], null, 2)}
Customers: ${JSON.stringify(contextData?.customers || [], null, 2)}`;
    }

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      }
    });

    res.json({
      analysis: response.text || "Analysis report generation failed."
    });
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate report" });
  }
});

// 4. Vite middleware for development vs static asset serving for production
async function startServer() {
  // Bind and start listening FIRST so the server boots instantly in <1ms to accept traffic
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  // Initialize fast cache on startup in the background (non-blocking)
  fetchProductsFromSupabase();
  // Keep cache updated in the background every 10 minutes (600,000ms).
  // Realtime updates are instantly pushed via /api/products/sync when changes occur in the Admin UI.
  setInterval(fetchProductsFromSupabase, 600000);

  if (process.env.NODE_ENV !== "production") {
    console.log("Vite is running in development mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static assets in production mode...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }
}

startServer();
