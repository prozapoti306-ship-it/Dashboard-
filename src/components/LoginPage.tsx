import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  RefreshCcw,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  
  // Interactive Lamp States
  const [isLightOn, setIsLightOn] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

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
      if (username.trim() === 'admin' && password.trim() === 'admin-auralux') {
        localStorage.setItem('aura_admin_authenticated', 'true');
        onLoginSuccess();
      } else {
        setError('ভুল ইউজারনেম বা পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন।');
        setIsLoading(false);
      }
    }, 800);
  };

  const handlePull = () => {
    setIsPulling(true);
    setTimeout(() => {
      setIsPulling(false);
      setIsLightOn(prev => !prev);
    }, 150);
  };

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-4 relative font-sans transition-all duration-700 select-none overflow-hidden
      ${isLightOn ? 'bg-[#0f0d0c]' : 'bg-[#050505]'}`}
    >
      {/* Background ambient lightspots when light is on */}
      <AnimatePresence>
        {isLightOn && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_35%_45%,rgba(251,191,36,0.12)_0%,rgba(251,191,36,0.02)_50%,transparent_75%)] pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      {/* Back to Website Navigation Link */}
      <button
        onClick={onBackToStore}
        className="absolute top-6 left-6 z-50 inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-all cursor-pointer bg-neutral-900/40 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/5 hover:border-white/10"
      >
        <ArrowLeft className="h-4 w-4 text-amber-500" />
        <span>ওয়েবসাইটে ফিরে যান</span>
      </button>

      {/* Main Grid Wrapper */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-center relative min-h-[550px] z-10 px-4">
        
        {/* Left Column: Interactive Desk Lamp */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative h-[360px] md:h-[420px]">
          
          {/* Light Beam Glowing cone */}
          <AnimatePresence>
            {isLightOn && (
              <>
                {/* Desktop Beam (radiating to the right/down) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute left-[54%] top-[110px] w-[500px] h-[340px] origin-top-left pointer-events-none z-10 hidden md:block"
                  style={{
                    background: 'linear-gradient(135deg, rgba(253,224,71,0.2) 0%, rgba(253,224,71,0.04) 50%, transparent 80%)',
                    clipPath: 'polygon(0% 0%, 100% 45%, 100% 100%, 0% 100%)',
                    filter: 'blur(1px)'
                  }}
                />

                {/* Mobile Beam (radiating straight down) */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 top-[110px] w-[350px] h-[350px] origin-top pointer-events-none z-10 md:hidden"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(253,224,71,0.2) 0%, rgba(253,224,71,0.03) 70%, transparent 100%)',
                    clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
                    filter: 'blur(1px)'
                  }}
                />
              </>
            )}
          </AnimatePresence>

          {/* Lamp Base Stand */}
          <div className="absolute bottom-6 flex flex-col items-center">
            {/* The ground support table line */}
            <div className="w-48 h-1 bg-[#1a1614] rounded-full opacity-60 mb-1" />
            
            {/* Flat Base */}
            <div className={`h-3 rounded-full transition-all duration-500
              ${isLightOn 
                ? 'bg-gradient-to-r from-[#2c221c] via-[#b8860b] to-[#2c221c] w-28 shadow-[0_5px_15px_rgba(251,191,36,0.3)]' 
                : 'bg-[#1e1916] w-24'}`} 
            />
          </div>

          {/* Stem / Stand Column */}
          <div className={`absolute bottom-[32px] w-2 rounded-t-lg transition-all duration-500 origin-bottom
            ${isLightOn 
              ? 'bg-gradient-to-r from-[#2c221c] via-[#f3e5ab] to-[#2c221c] h-52' 
              : 'bg-[#221c19] h-48'}`} 
          />

          {/* Lampshade Assembly (Top dome) */}
          <div className="absolute top-[80px] flex flex-col items-center z-20">
            {/* Lampshade Top Rounded Dome */}
            <div className={`w-40 h-20 rounded-t-full transition-all duration-500 relative overflow-hidden border
              ${isLightOn 
                ? 'bg-gradient-to-b from-white to-[#fef08a] border-white/60 shadow-[0_-5px_25px_rgba(253,224,71,0.5),0_8px_30px_rgba(255,255,255,0.7)]' 
                : 'bg-[#2f2722] border-[#1e1916]'}`} 
            />

            {/* Glowing Bulb / Socket underside */}
            {isLightOn && (
              <div className="absolute bottom-[-4px] w-28 h-4 bg-[#fef08a] rounded-b-full filter blur-[4px] opacity-90 animate-pulse" />
            )}
          </div>

          {/* Tactile Pull Chain/String Switch */}
          <motion.div 
            style={{ 
              height: isPulling ? '100px' : '75px',
            }}
            className="w-[1.5px] bg-neutral-500 absolute left-1/2 translate-x-12 top-[156px] z-30 origin-top flex flex-col items-center transition-all duration-150 ease-out cursor-pointer"
            onClick={handlePull}
          >
            {/* Rope segment border dotted */}
            <div className="w-[1.5px] h-full bg-neutral-400/80 border-l border-dotted border-white/50" />
            
            {/* Metallic Golden Bead / Handle */}
            <div 
              className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-200 via-yellow-500 to-amber-700 border border-amber-800/40 shadow-xl cursor-pointer hover:scale-125 transition-transform shrink-0 relative -bottom-1 flex items-center justify-center active:scale-90"
              title="লাইট অন/অফ করতে টানুন"
            >
              {/* Shiny reflection */}
              <div className="w-1 h-1 rounded-full bg-white/70" />
              
              {/* Pulsing indicator when light is off to guide user */}
              {!isLightOn && (
                <span className="absolute -inset-1 rounded-full bg-yellow-400/50 animate-ping pointer-events-none" />
              )}
            </div>
          </motion.div>

          {/* Quick interactive helper tooltip */}
          <div className="absolute bottom-[-16px] text-center w-full">
            <span className={`text-[10px] font-bold tracking-wider transition-all duration-500 uppercase
              ${isLightOn ? 'text-amber-500/50' : 'text-amber-400/80 animate-pulse'}`}
            >
              {isLightOn ? 'Light switch is active' : '💡 লাইট জ্বালাতে সুইচটি টানুন (Pull switch to login)'}
            </span>
          </div>

        </div>

        {/* Right Column: Illuminated Glassmorphism Login Card */}
        <div className="md:col-span-7 flex justify-center items-center relative min-h-[420px] w-full">
          
          <motion.div
            animate={isLightOn 
              ? { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' } 
              : { opacity: 0, y: 30, scale: 0.95, pointerEvents: 'none' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.15 }}
            className="w-full max-w-sm backdrop-blur-xl bg-neutral-900/60 border border-white/10 rounded-[2.5rem] p-8 space-y-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] relative z-20 text-white"
          >
            {/* Welcome Title Header */}
            <div className="text-center space-y-1">
              <h2 className="text-3xl font-black tracking-tight text-white font-sans uppercase">Welcome</h2>
              <p className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Aura Lux Admin Portal</p>
            </div>

            {/* Inputs Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Username Input Field */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <User className="h-4 w-4 text-amber-500/70" />
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter name"
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-black/40 text-xs text-white focus:ring-1 focus:ring-amber-500/50 focus:outline-none focus:border-amber-500/50 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                    <Lock className="h-4 w-4 text-amber-500/70" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    disabled={isLoading}
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-white/10 bg-black/40 text-xs text-white focus:ring-1 focus:ring-amber-500/50 focus:outline-none focus:border-amber-500/50 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Native Error Messages */}
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 text-[11px] text-rose-400 font-bold border border-rose-500/20 leading-normal text-left">
                  ⚠️ {error}
                </div>
              )}

              {/* Premium Gold Metallic Action Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] hover:from-[#e5c060] hover:via-[#f5e3b5] hover:to-[#b8860b] text-neutral-900 font-extrabold rounded-2xl text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/10 cursor-pointer active:scale-[0.98] border-none mt-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCcw className="h-4 w-4 animate-spin text-neutral-900" />
                    <span>যাচাই করা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <LayoutDashboard className="h-4 w-4 text-neutral-900" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>

      {/* Brand Footer */}
      <p className="text-[10px] opacity-30 text-center font-bold absolute bottom-6 w-full text-neutral-400">
        © {new Date().getFullYear()} Aura Lux Sports. Secure Admin Terminal.
      </p>
    </div>
  );
}
