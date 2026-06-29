import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles, 
  Info,
  RefreshCcw,
  LayoutDashboard
} from 'lucide-react';
import { motion } from 'motion/react';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onBackToStore: () => void;
  themeMode: 'light' | 'dark';
}

export default function LoginPage({
  onLoginSuccess,
  onBackToStore,
  themeMode
}: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username.trim() || !password.trim()) {
      setError('ইউজারনেম এবং পাসওয়ার্ড উভয়ই পূরণ করা আবশ্যক।');
      return;
    }

    setIsLoading(true);

    // Simulated short delay for highly responsive UX
    setTimeout(() => {
      // Credentials: username "admin", password "admin-auralux"
      if (username.trim() === 'admin' && password.trim() === 'admin-auralux') {
        localStorage.setItem('aura_admin_authenticated', 'true');
        onLoginSuccess();
      } else {
        setError('ভুল ইউজারনেম বা পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন।');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative font-sans transition-colors duration-300
      ${themeMode === 'dark' ? 'bg-[#120e0c] text-[#f6f3ed]' : 'bg-[#faf8f5] text-[#2c2621]'}`}
    >
      {/* Background ambient lightspots */}
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-[#e07a5f]/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md z-10 space-y-6">
        
        {/* Back Link */}
        <button
          onClick={onBackToStore}
          className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider opacity-60 hover:opacity-100 hover:text-teal-500 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>ওয়েবসাইটে ফিরে যান</span>
        </button>

        {/* Login Card */}
        <div className={`rounded-[2.5rem] border p-8 space-y-6 shadow-2xl transition-all duration-300
          ${themeMode === 'dark' ? 'bg-[#1a1614]/90 border-[#28211c]' : 'bg-white border-[#eae5de]'}`}
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex h-12 w-12 rounded-2xl bg-teal-500/10 text-teal-500 items-center justify-center mx-auto mb-2">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">অ্যাডমিন ড্যাশবোর্ড লগইন</h2>
            <p className="text-[11px] opacity-60">ড্যাশবোর্ড অ্যাক্সেস করতে এবং লাইভ অর্ডার পরিচালনা করতে প্রমাণীকরণ করুন</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase tracking-wider opacity-60 flex items-center space-x-1">
                <User className="h-3 w-3 text-teal-500" />
                <span>ইউজারনেম (Username):</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="যেমন: admin"
                  disabled={isLoading}
                  className="w-full pl-4 pr-10 py-3 rounded-2xl border border-inherit bg-transparent text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none focus:border-teal-500 font-mono"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5 text-left">
              <label className="text-[10px] font-black uppercase tracking-wider opacity-60 flex items-center space-x-1">
                <Lock className="h-3 w-3 text-teal-500" />
                <span>পাসওয়ার্ড (Password):</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="যেমন: admin-auralux"
                  disabled={isLoading}
                  className="w-full pl-4 pr-10 py-3 rounded-2xl border border-inherit bg-transparent text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none focus:border-teal-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-teal-500"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/5 text-[11px] text-rose-500 font-bold border border-rose-500/10 leading-normal text-left">
                ⚠️ {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-teal-500 hover:bg-teal-600 text-white font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/10 mt-2"
            >
              {isLoading ? (
                <>
                  <RefreshCcw className="h-4 w-4 animate-spin" />
                  <span>যাচাই করা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <LayoutDashboard className="h-4 w-4" />
                  <span>ড্যাশবোর্ডে প্রবেশ করুন</span>
                </>
              )}
            </button>
          </form>

          {/* Explicit Credentials Box (Helpful in Development mode to avoid getting locked out) */}
          <div className="p-4 rounded-2xl bg-teal-500/5 border border-teal-500/10 text-left space-y-2 text-[10px] leading-relaxed text-teal-600 dark:text-teal-400">
            <p className="font-bold flex items-center space-x-1 mb-0.5">
              <Info className="h-3.5 w-3.5" />
              <span>সহজে ডেমো লগইন করতে নিচের তথ্য ব্যবহার করুন:</span>
            </p>
            <div className="font-mono space-y-1 text-[9px] bg-teal-500/5 p-2 rounded-xl border border-teal-500/5">
              <div><span className="opacity-60">Username:</span> <strong className="font-bold">admin</strong></div>
              <div><span className="opacity-60">Password:</span> <strong className="font-bold">admin-auralux</strong></div>
            </div>
          </div>
        </div>

        <p className="text-[10px] opacity-40 text-center font-bold">© {new Date().getFullYear()} Aura Lux Sports. Secure Admin Terminal.</p>
      </div>
    </div>
  );
}
