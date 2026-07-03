import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Layers, 
  Warehouse, 
  BarChart3, 
  Settings, 
  Bell, 
  Code,
  Eye, 
  EyeOff,
  Sun, 
  Moon,
  Sparkles,
  RefreshCcw,
  FolderHeart,
  Undo2,
  UserCheck,
  HelpCircle,
  X,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { SystemSettings } from '../types';
// @ts-ignore
import trendZoneLogo from '../assets/images/trend_zone_logo_1782968033190.jpg';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  settings: SystemSettings;
  setSettings: React.Dispatch<React.SetStateAction<SystemSettings>>;
  notificationCount: number;
  openNotificationPanel: () => void;
  openAiAssistant: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onGoToStore?: () => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  settings, 
  setSettings, 
  notificationCount,
  openNotificationPanel,
  openAiAssistant,
  isMobileOpen = false,
  onCloseMobile,
  onGoToStore
}: SidebarProps) {
  
  const menuItems = [
    { id: 'dashboard', label: 'ড্যাশবোর্ড (Dashboard)', icon: LayoutDashboard },
    { id: 'orders', label: 'অর্ডারস (Orders)', icon: ShoppingBag, badge: 12 },
    { id: 'customers', label: 'CRM কাস্টমার (CRM)', icon: Users },
    { id: 'products', label: 'প্রোডাক্টস (Products)', icon: Layers },
    { id: 'inventory', label: 'ইনভেন্টরি (Stock)', icon: Warehouse, badge: 2 },
    { id: 'collections', label: 'কালেকশন (Collections)', icon: FolderHeart },
    { id: 'analytics', label: 'রিপোর্টস (Reports)', icon: BarChart3 },
    { id: 'marketing', label: 'মার্কেটিং (Marketing)', icon: Sparkles },
    { id: 'returns', label: 'রিটার্নস (Returns)', icon: Undo2, badge: 1 },
    { id: 'tech-stack', label: 'WordPress সিঙ্ক (Sync)', icon: RefreshCcw },
    { id: 'settings', label: 'সেটিংস (Settings)', icon: Settings },
    { id: 'user-management', label: 'ইউজার ম্যানেজমেন্ট', icon: UserCheck },
    { id: 'support', label: 'সাপোর্ট (Support)', icon: HelpCircle },
  ];

  const toggleTheme = () => {
    setSettings(prev => ({
      ...prev,
      themeMode: prev.themeMode === 'dark' ? 'light' : 'dark'
    }));
  };

  const toggleEyeProtection = () => {
    setSettings(prev => ({
      ...prev,
      eyeProtectionEnabled: !prev.eyeProtectionEnabled
    }));
  };

  return (
    <aside 
      id="sidebar-container" 
      className={`w-64 border-r flex flex-col justify-between h-screen transition-all duration-300
        ${isMobileOpen 
          ? 'fixed left-0 top-0 h-full z-50 w-64 shadow-2xl translate-x-0 flex' 
          : 'fixed md:sticky md:top-0 left-0 top-0 -translate-x-full md:translate-x-0 h-full md:h-screen z-50 md:z-10 w-64 hidden md:flex'
        }
        ${settings.themeMode === 'dark' 
          ? 'bg-[#1a1614] border-[#322822]/40 text-[#f6f3ed]' 
          : 'bg-[#fcfbf9] border-[#e8e4dc] text-[#2c2621]'
        } backdrop-blur-xl`}
    >
      {/* Brand Logo & Header */}
      <div className="flex flex-col h-[calc(100vh-210px)]">
        <div className="p-5 flex items-center justify-between border-b border-inherit flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative flex h-9 w-9 items-center justify-center shrink-0">
              <img 
                src={settings.brandLogo || trendZoneLogo} 
                alt={`${settings.brandName} Logo`} 
                className="h-9 w-9 object-contain rounded-full transition-transform duration-300 hover:scale-105"
                style={{ filter: 'drop-shadow(0px 0px 4px rgba(212, 175, 55, 0.6))' }}
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-sans font-bold tracking-tight text-md block">{settings.brandName}</span>
              <span className="text-[9px] uppercase tracking-wider opacity-60 font-sans block max-w-[130px] truncate" title={settings.tagline || "Premium ERP"}>
                {settings.tagline || "Premium ERP"}
              </span>
            </div>
          </div>

          {/* Mobile Close Button */}
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-1.5 rounded-xl border border-inherit hover:bg-neutral-100 dark:hover:bg-white/5 transition-all cursor-pointer"
              title="Close Menu"
            >
              <X className="h-4 w-4 opacity-75" />
            </button>
          )}
        </div>

        {/* Visit Live Storefront Action */}
        {onGoToStore && (
          <div className="px-5 pt-4 pb-2 border-b border-inherit bg-teal-500/5 dark:bg-teal-500/10 flex-shrink-0">
            <button
              onClick={() => {
                onGoToStore();
                if (onCloseMobile) onCloseMobile();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-tr from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 text-white shadow-md shadow-teal-500/15 transition-all duration-200 transform active:scale-95 cursor-pointer group"
            >
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-4 w-4 animate-pulse" />
                <span>ই-কমার্স ওয়েবসাইট (Visit Store)</span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        )}

        {/* Navigation Items - Scrollable for luxury UI safety */}
        <nav className="p-3 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                id={`sidebar-item-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 group relative
                  ${isActive 
                    ? settings.themeMode === 'dark'
                      ? 'bg-gradient-to-r from-[#e07a5f]/20 to-[#f2cc8f]/10 text-[#f4f1de] shadow-inner border border-[#e07a5f]/20'
                      : 'bg-gradient-to-r from-amber-50 to-orange-50 text-[#8d5b4c] border border-orange-100 shadow-sm'
                    : 'hover:bg-amber-500/5 hover:translate-x-1'
                  }`}
              >
                <div className="flex items-center space-x-2.5">
                  <IconComponent className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110
                    ${isActive 
                      ? 'text-[#e07a5f]' 
                      : 'opacity-70 group-hover:opacity-100'
                    }`} 
                  />
                  <span>{item.label}</span>
                </div>
                
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold
                    ${item.id === 'inventory' 
                      ? 'bg-amber-500/25 text-amber-500' 
                      : 'bg-[#e07a5f]/25 text-[#e07a5f]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls (Eye protection settings) */}
      <div className="p-4 border-t border-inherit space-y-3 bg-inherit">
        {/* Real-time AI Assistant Quick Trigger */}
        <button
          onClick={() => {
            openAiAssistant();
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-tr from-amber-600 to-orange-500 hover:from-amber-500 hover:to-orange-400 text-white shadow-lg shadow-orange-600/10 transition-all duration-200 transform active:scale-95"
        >
          <Sparkles className="h-4 w-4" />
          <span>AI সেলস অ্যাসিস্ট্যান্ট</span>
        </button>

        {/* Notifications & System Quick controls */}
        <div className="flex items-center justify-between px-2 pt-1">
          {/* Notifications button */}
          <button 
            onClick={() => {
              openNotificationPanel();
              if (onCloseMobile) onCloseMobile();
            }}
            className="relative p-2 rounded-lg hover:bg-amber-500/5 transition-colors group"
            title="Notifications"
          >
            <Bell className="h-4.5 w-4.5 opacity-80 group-hover:opacity-100" />
            {notificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            )}
          </button>

          {/* Eye Protection Warm Mode button */}
          <button 
            onClick={toggleEyeProtection}
            className={`p-2 rounded-lg transition-colors group relative
              ${settings.eyeProtectionEnabled 
                ? 'bg-amber-500/15 text-amber-500' 
                : 'hover:bg-amber-500/5'
              }`}
            title={settings.eyeProtectionEnabled ? "Eye Protection ON" : "Eye Protection OFF"}
          >
            {settings.eyeProtectionEnabled ? (
              <Eye className="h-4.5 w-4.5 animate-pulse" />
            ) : (
              <EyeOff className="h-4.5 w-4.5 opacity-80 group-hover:opacity-100" />
            )}
          </button>

          {/* Theme Mode Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-amber-500/5 transition-colors group"
            title={settings.themeMode === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {settings.themeMode === 'dark' ? (
              <Sun className="h-4.5 w-4.5 text-amber-400 hover:text-amber-300" />
            ) : (
              <Moon className="h-4.5 w-4.5 text-[#2c2621] opacity-80 group-hover:opacity-100" />
            )}
          </button>
        </div>

        {/* Eye Protection Banner Status */}
        {settings.eyeProtectionEnabled && (
          <div className="p-2.5 rounded-lg text-[10px] bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 leading-relaxed text-center font-medium">
            👁️ চোখের আরাম মোড (Amber Filter) সক্রিয়। আরামদায়ক ভিউইং {settings.blueLightFilterLevel}% এ সেট করা।
          </div>
        )}
      </div>
    </aside>
  );
}
