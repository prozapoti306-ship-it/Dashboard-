import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface AnimatedConfirmButtonProps {
  isOrdering: boolean;
  isSuccess: boolean;
  paymentMethod: string;
  t: (bn: string, en: string) => string;
}

type AnimationStage = 
  | 'idle' 
  | 'worker-enter' 
  | 'loading-box' 
  | 'door-close' 
  | 'driving' 
  | 'driving-away' 
  | 'success';

export default function AnimatedConfirmButton({
  isOrdering,
  isSuccess,
  paymentMethod,
  t
}: AnimatedConfirmButtonProps) {
  const [stage, setStage] = useState<AnimationStage>('idle');
  const isCOD = paymentMethod === 'COD';

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;
    let timer3: NodeJS.Timeout;
    let timer4: NodeJS.Timeout;
    let timer5: NodeJS.Timeout;

    if (isOrdering) {
      // 1. Worker enters & Van door swings open (0ms - 2500ms)
      setStage('worker-enter');
      
      // 2. Box is loaded gently into the cargo hold (2500ms - 4100ms)
      timer1 = setTimeout(() => {
        setStage('loading-box');
      }, 2500);

      // 3. Worker closes door manually & waves goodbye (4100ms - 5300ms)
      timer2 = setTimeout(() => {
        setStage('door-close');
      }, 4100);

      // 4. Engine bobs, headlights turn on, road scrolls (5300ms - 9000ms)
      timer3 = setTimeout(() => {
        setStage('driving');
      }, 5300);

      // 5. Success received -> Truck speeds away off-screen right (9000ms - 10000ms)
      timer4 = setTimeout(() => {
        setStage('driving-away');
      }, 9000);

      // 6. Final green success checkmark state (10000ms+)
      timer5 = setTimeout(() => {
        setStage('success');
      }, 10000);
    } else {
      // Return to idle state if reset
      setStage('idle');
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [isOrdering]);

  return (
    <div className="w-full relative">
      <style>{`
        /* 1. 3D Perspective and Hinges */
        .van-perspective {
          perspective: 350px;
        }

        /* 2. Premium Truck Entrance */
        @keyframes premium-truck-enter {
          0% {
            transform: translateX(-180px);
            opacity: 0;
          }
          65% {
            transform: translateX(8px);
            opacity: 1;
          }
          100% {
            transform: translateX(0px);
            opacity: 1;
          }
        }
        .anim-truck-enter {
          animation: premium-truck-enter 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        /* 3. Delivery Worker Entering */
        @keyframes premium-worker-enter {
          0% {
            transform: translateX(-40px);
            opacity: 0;
          }
          100% {
            transform: translateX(0px);
            opacity: 1;
          }
        }
        .anim-worker-enter {
          animation: premium-worker-enter 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* 4. Worker Walking Leg Swing */
        @keyframes worker-legs {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(18deg); }
        }
        .anim-worker-legs {
          animation: worker-legs 0.22s ease-in-out infinite;
          animation-iteration-count: 7; /* stops swing after ~1.5s, right when walking ends! */
          transform-origin: 50% 70%;
        }

        /* 5. Truck Back Gate Swing Open (rotateY in 3D perspective) */
        @keyframes premium-door-open {
          0% {
            transform: rotateY(0deg);
            fill: #e2e8f0;
          }
          100% {
            transform: rotateY(-115deg);
            fill: #cbd5e1;
          }
        }
        .anim-door-open {
          animation: premium-door-open 1.0s cubic-bezier(0.4, 0, 0.2, 1) 1.5s forwards;
          transform-origin: 3px 13px; /* hinge location at the rear left edge */
        }

        /* 6. Soft Placement Transition for Golden Box (No throwing) */
        @keyframes premium-box-soft-place {
          0% {
            transform: translate(-10px, -4px) scale(0.8);
            opacity: 0;
          }
          15% {
            transform: translate(-5px, -2px) scale(1.05);
            opacity: 1;
          }
          50% {
            /* worker holds it elegantly near cargo opening */
            transform: translate(6px, -1px) scale(0.95);
            opacity: 1;
          }
          85% {
            /* placing it gently inside the cargo bed */
            transform: translate(18px, 1px) scale(0.85);
            opacity: 1;
          }
          100% {
            /* placed and slides softly into the dark cargo interior */
            transform: translate(28px, 1px) scale(0.4);
            opacity: 0;
          }
        }
        .anim-box-soft-place {
          animation: premium-box-soft-place 1.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        /* 7. Worker Lifting and Placing Arms */
        @keyframes left-arm-place {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-25deg) translateY(-1px); }
          50% { transform: rotate(-15deg); }
          80% { transform: rotate(-35deg) translate(3px, -1px); }
          100% { transform: rotate(0deg); }
        }
        .anim-left-arm-place {
          animation: left-arm-place 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes right-arm-place {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-25deg) translateY(-1px); }
          50% { transform: rotate(-15deg); }
          80% { transform: rotate(-35deg) translate(3px, -1px); }
          100% { transform: rotate(0deg); }
        }
        .anim-right-arm-place {
          animation: right-arm-place 1.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* 7b. Worker Right Arm Closes Door Manually and then Waves Goodbye! */
        @keyframes right-arm-close-wave {
          /* Phase 1: Push door shut (0% to 40% of 1.2s -> 0s to 0.48s) */
          0% {
            transform: rotate(0deg);
          }
          15% {
            transform: rotate(-45deg) translate(2px, -2px);
          }
          35% {
            transform: rotate(-15deg) translate(1px, -1px);
          }
          40% {
            transform: rotate(0deg);
          }
          /* Phase 2: Wave Goodbye (45% to 90% of 1.2s -> 0.54s to 1.08s) */
          45% {
            transform: rotate(-120deg) translate(-2px, -3px);
          }
          53% { transform: rotate(-145deg) translate(-1px, -4px); }
          61% { transform: rotate(-105deg) translate(-3px, -2px); }
          69% { transform: rotate(-145deg) translate(-1px, -4px); }
          77% { transform: rotate(-105deg) translate(-3px, -2px); }
          85% { transform: rotate(-145deg) translate(-1px, -4px); }
          90% {
            transform: rotate(-120deg) translate(-2px, -3px);
          }
          /* Phase 3: Lower hand (90% to 100%) */
          100% {
            transform: rotate(0deg);
          }
        }
        .anim-right-arm-close-wave {
          animation: right-arm-close-wave 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* 8. Truck Back Gate Swing Close */
        @keyframes premium-door-close {
          0% {
            transform: rotateY(-115deg);
            fill: #cbd5e1;
          }
          100% {
            transform: rotateY(0deg);
            fill: #e2e8f0;
          }
        }
        .anim-door-close {
          animation: premium-door-close 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-origin: 3px 13px;
        }

        /* 9. Delivery Worker Waving and Fading Out */
        @keyframes premium-worker-goodbye-fade {
          0% {
            transform: translateX(0px);
            opacity: 1;
          }
          75% {
            transform: translateX(0px);
            opacity: 1;
          }
          100% {
            transform: translateX(0px);
            opacity: 0;
          }
        }
        .anim-worker-goodbye-fade {
          animation: premium-worker-goodbye-fade 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        /* 10. Dashed Road Scroll (moving lanes under truck) */
        @keyframes premium-road-scroll {
          0% {
            background-position: 0px 0;
          }
          100% {
            background-position: -40px 0;
          }
        }
        .anim-road-scroll {
          background-image: linear-gradient(to right, rgba(255,255,255,0.45) 50%, transparent 50%);
          background-size: 16px 2.5px;
          animation: premium-road-scroll 0.2s linear infinite;
        }

        /* 11. Driving Wheel Spin */
        @keyframes premium-wheel-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .anim-wheel-spin {
          animation: premium-wheel-spin 0.25s linear infinite;
        }

        /* 12. Engine Vibration / Bobbing Up and Down */
        @keyframes premium-truck-vibe {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-1.5px) rotate(0.4deg);
          }
        }
        .anim-truck-vibe {
          animation: premium-truck-vibe 0.14s ease-in-out infinite;
        }

        /* 13. Headlight Light Cone Pulsation */
        @keyframes premium-light-pulse {
          0%, 100% { opacity: 0.8; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.08); }
        }
        .anim-light-pulse {
          animation: premium-light-pulse 0.2s ease-in-out infinite;
        }

        /* 14. Truck Rocket Away (Launch Out Right) */
        @keyframes premium-truck-away {
          0% {
            transform: translateX(0px) scaleX(1);
          }
          20% {
            transform: translateX(-16px) scaleX(1.04);
          }
          100% {
            transform: translateX(330px) scaleX(0.92);
          }
        }
        .anim-truck-away {
          animation: premium-truck-away 1.0s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards;
        }

        /* 15. Success Popup Scale */
        @keyframes premium-success-pop {
          0% {
            transform: scale(0.85);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .anim-success-pop {
          animation: premium-success-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        /* 16. Pulse Glow for active order state */
        .glow-active {
          box-shadow: 0 0 15px rgba(20, 184, 166, 0.25);
        }
      `}</style>

      <button
        type="submit"
        disabled={isOrdering || stage === 'success'}
        className={`w-full h-15 relative rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-500 overflow-hidden shadow-lg flex items-center justify-center cursor-pointer active:scale-97 select-none border border-transparent
          ${stage === 'success' 
            ? 'bg-emerald-600 text-white shadow-emerald-600/30 border-emerald-500' 
            : stage === 'driving-away'
              ? 'bg-[#0f172a] text-white'
              : isOrdering 
                ? 'bg-[#090d16] text-white border-zinc-800/40 glow-active' 
                : 'bg-teal-500 hover:bg-teal-600 text-white shadow-teal-500/15'
          }`}
      >
        {/* Subtle running background light shine during ordering */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-teal-500/10 transition-all duration-1000 ease-out z-0 pointer-events-none"
          style={{ opacity: isOrdering ? 1 : 0 }}
        />

        {/* ==================== STAGE 1: IDLE ==================== */}
        {stage === 'idle' && (
          <div className="flex items-center space-x-2.5 z-10 transition-all duration-300 transform hover:scale-102">
            <Check className="h-5 w-5 shrink-0 stroke-[3.5] animate-pulse" />
            <span className="font-extrabold tracking-wide">
              {isCOD 
                ? t('অর্ডার নিশ্চিত করুন (ক্যাশ অন ডেলিভারি)', 'Confirm Order (COD)') 
                : t('পেমেন্ট ও অর্ডার নিশ্চিত করুন', 'Confirm Payment & Order')
              }
            </span>
          </div>
        )}

        {/* ==================== ACTIVE ANIMATION CYCLE ==================== */}
        {stage !== 'idle' && stage !== 'success' && (
          <div className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden">
            
            {/* Horizontal Dashed Road lanes (Scrolls actively when in 'driving' state) */}
            <div 
              className={`absolute left-4 right-4 h-[2.5px] bottom-3.5 opacity-0 transition-opacity duration-300 pointer-events-none
                ${stage === 'driving' ? 'anim-road-scroll opacity-50' : 'opacity-0'}`} 
            />

            {/* Stage Animation Container (270px width) */}
            <div className="relative w-68 h-14 flex items-center justify-center van-perspective">
              
              {/* Delivery Worker (Sits on the left side near truck's cargo entry) */}
              {(stage === 'worker-enter' || stage === 'loading-box' || stage === 'door-close') && (
                <div 
                  className={`absolute bottom-[11px] left-[32px] w-9 h-11 pointer-events-none z-20 flex flex-col items-center
                    ${stage === 'worker-enter' ? 'anim-worker-enter' : ''}
                    ${stage === 'door-close' ? 'anim-worker-goodbye-fade' : ''}
                  `}
                >
                  <div className="relative w-full h-full">
                    {/* Worker Head & Cap */}
                    <svg className="w-full h-full" viewBox="0 0 36 44">
                      {/* Hair/Head */}
                      <circle cx="18" cy="11" r="5" fill="#fbcfe8" />
                      <path d="M14 9c0-3 2-4 4-4s4 1 4 4z" fill="#7c2d12" />
                      {/* Premium Courier Cap */}
                      <path d="M12 8c2-4 8-4 11-1l3 2v2h-14z" fill="#f97316" />
                      <rect x="18" y="7" width="9" height="1.5" fill="#1e2937" rx="0.5" />

                      {/* Body Uniform */}
                      <path d="M13 16h10l1.5 12h-13z" fill="#1e3a8a" />
                      {/* Orange Safety Vest Stripes */}
                      <rect x="15" y="17" width="2" height="11" fill="#f97316" />
                      <rect x="19" y="17" width="2" height="11" fill="#f97316" />
                      <rect x="13" y="20" width="10" height="2" fill="#f97316" />

                      {/* Left Arm (stands down, or supports holding) */}
                      <g 
                        style={{ transformOrigin: '14px 17px' }}
                        className={`origin-[14px_17px]
                          ${stage === 'loading-box' ? 'anim-left-arm-place' : ''}
                        `}
                      >
                        <path d="M14 17l-5 6v2l5-4z" fill="#1e3a8a" />
                        <circle cx="9" cy="24" r="1.5" fill="#fbcfe8" />
                      </g>

                      {/* Right Arm (waves, pushes, loads) */}
                      <g 
                        style={{ transformOrigin: '22px 17px' }}
                        className={`origin-[22px_17px]
                          ${stage === 'loading-box' ? 'anim-right-arm-place' : ''}
                          ${stage === 'door-close' ? 'anim-right-arm-close-wave' : ''}
                        `}
                      >
                        <path d="M22 17l5 5v2l-5-4z" fill="#1e3a8a" />
                        <circle cx="27" cy="23" r="1.5" fill="#fbcfe8" />
                      </g>

                      {/* Animated Legs */}
                      <g className={`${stage === 'worker-enter' ? 'anim-worker-legs' : ''}`}>
                        <rect x="15" y="28" width="2.5" height="5" fill="#1e2937" />
                        <rect x="14" y="32" width="4.5" height="2" fill="#78350f" rx="0.5" />
                      </g>
                      <g className={`${stage === 'worker-enter' ? 'anim-worker-legs' : ''}`} style={{ animationDelay: '0.1s' }}>
                        <rect x="18.5" y="28" width="2.5" height="5" fill="#1e2937" />
                        <rect x="18" y="32" width="4.5" height="2" fill="#78350f" rx="0.5" />
                      </g>
                    </svg>
                  </div>
                </div>
              )}

              {/* Cardboard Box (Golden/Saffron Premium Box) */}
              {stage === 'loading-box' && (
                <div className="absolute left-[49px] top-[14px] w-[15px] h-[15px] pointer-events-none z-30 anim-box-soft-place">
                  <svg className="w-full h-full drop-shadow-md" viewBox="0 0 20 20">
                    {/* 3D Box front/sides */}
                    <rect x="1" y="1" width="18" height="18" rx="2.5" fill="#d97706" />
                    <rect x="2" y="2" width="16" height="16" rx="1.5" fill="#f59e0b" />
                    {/* Black/Brown tape line */}
                    <path d="M8 2v16" stroke="#78350f" strokeWidth="2.5" />
                    <path d="M1 9.5h18" stroke="#78350f" strokeWidth="1.2" opacity="0.8" />
                    {/* Gloss highlight */}
                    <path d="M3 3l5 5" stroke="#fef08a" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
                  </svg>
                </div>
              )}

              {/* Delivery Van / Truck Container */}
              <div 
                className={`absolute bottom-[11px] h-9.5 w-21 pointer-events-none z-10
                  ${stage === 'worker-enter' ? 'left-[68px] anim-truck-enter' : ''}
                  ${stage === 'loading-box' ? 'left-[68px]' : ''}
                  ${stage === 'door-close' ? 'left-[68px]' : ''}
                  ${stage === 'driving' ? 'left-[68px] anim-truck-vibe' : ''}
                  ${stage === 'driving-away' ? 'anim-truck-away' : ''}
                `}
              >
                <div className="relative w-full h-full">
                  {/* Headlights Glow Cone Effect (Only projects during driving stage) */}
                  {stage === 'driving' && (
                    <div 
                      className="absolute right-[-45px] top-[-3px] w-[50px] h-[26px] bg-gradient-to-r from-yellow-300/70 via-yellow-300/20 to-transparent pointer-events-none rounded-r-full anim-light-pulse"
                      style={{
                        clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 70%)',
                      }}
                    />
                  )}

                  {/* High Quality Truck Body Parts SVG */}
                  <svg className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]" viewBox="0 0 84 38">
                    {/* Definitions for 3D gradients and glosses */}
                    <defs>
                      <linearGradient id="cabinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>
                      <linearGradient id="cargoGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="100%" stopColor="#e2e8f0" />
                      </linearGradient>
                      <linearGradient id="bumperGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#94a3b8" />
                        <stop offset="100%" stopColor="#475569" />
                      </linearGradient>
                      <linearGradient id="wheelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#374151" />
                        <stop offset="100%" stopColor="#111827" />
                      </linearGradient>
                    </defs>

                    {/* Trailer/Cargo Bed (White cargo container) */}
                    <rect x="3" y="2" width="46" height="24" rx="2" fill="url(#cargoGrad)" stroke="#cbd5e1" strokeWidth="0.5" />
                    
                    {/* Metallic side security rails on cargo */}
                    <rect x="5" y="22" width="42" height="1.5" fill="#94a3b8" opacity="0.8" />
                    <line x1="12" y1="2" x2="12" y2="24" stroke="#cbd5e1" strokeWidth="0.8" />
                    <line x1="25" y1="2" x2="25" y2="24" stroke="#cbd5e1" strokeWidth="0.8" />
                    <line x1="38" y1="2" x2="38" y2="24" stroke="#cbd5e1" strokeWidth="0.8" />

                    {/* Cabin (Front part) with beautiful curved streamlined 3D profile */}
                    <path d="M49 8.5h16.5l8 7.5v12H49z" fill="url(#cabinGrad)" />
                    {/* Windshield Glossy Overlay */}
                    <path d="M53 10.5h9.5l5.5 5.5v5h-15z" fill="#0f172a" />
                    <path d="M54 12h7l4 4v3h-11z" fill="#38bdf8" opacity="0.4" />
                    <path d="M55 12h3l3 3v1h-6z" fill="#ffffff" opacity="0.6" /> {/* sun reflection highlight */}

                    {/* Side Mirror */}
                    <rect x="49" y="13" width="2" height="4.5" rx="0.5" fill="#475569" />
                    
                    {/* Premium Front Chrome Bumper */}
                    <path d="M72 25h4.5a1.5 1.5 0 011.5 1.5v0a1.5 1.5 0 01-1.5 1.5H72z" fill="url(#bumperGrad)" />
                    
                    {/* Headlights (Yellow glowing bulbs) */}
                    <circle cx="73.5" cy="21.5" r="1.8" fill="#fef08a" />
                    <circle cx="73.5" cy="21.5" r="3.2" fill="#facc15" className="animate-pulse" opacity={stage === 'driving' ? 1 : 0.3} />

                    {/* ==================== SWINGING 3D REAR DOOR ==================== */}
                    <path 
                      className={`stroke-slate-400 stroke-[1.5]
                        ${stage === 'worker-enter' ? 'anim-door-open' : ''}
                        ${stage === 'loading-box' ? 'anim-door-open' : ''}
                        ${stage === 'door-close' ? 'anim-door-close' : ''}
                        ${stage === 'driving' || stage === 'driving-away' ? 'anim-door-close' : ''}
                      `}
                      d="M3 2v24h1V2z" 
                      fill="#e2e8f0"
                    />

                    {/* Left Wheel (Tire + Hubcap Spokes) */}
                    <g 
                      className={`transform-gpu ${stage === 'driving' || stage === 'driving-away' ? 'anim-wheel-spin' : ''}`} 
                      style={{ transformOrigin: '17px 28px' }}
                    >
                      <circle cx="17" cy="28" r="6.5" fill="url(#wheelGrad)" stroke="#f8fafc" strokeWidth="0.8" />
                      <circle cx="17" cy="28" r="3" fill="#cbd5e1" />
                      {/* Wheel Spokes for spin reference */}
                      <line x1="17" y1="21.5" x2="17" y2="34.5" stroke="#f8fafc" strokeWidth="0.8" opacity="0.7" />
                      <line x1="10.5" y1="28" x2="23.5" y2="28" stroke="#f8fafc" strokeWidth="0.8" opacity="0.7" />
                    </g>

                    {/* Right Wheel (Tire + Hubcap Spokes) */}
                    <g 
                      className={`transform-gpu ${stage === 'driving' || stage === 'driving-away' ? 'anim-wheel-spin' : ''}`} 
                      style={{ transformOrigin: '53px 28px' }}
                    >
                      <circle cx="53" cy="28" r="6.5" fill="url(#wheelGrad)" stroke="#f8fafc" strokeWidth="0.8" />
                      <circle cx="53" cy="28" r="3" fill="#cbd5e1" />
                      {/* Wheel Spokes for spin reference */}
                      <line x1="53" y1="21.5" x2="53" y2="34.5" stroke="#f8fafc" strokeWidth="0.8" opacity="0.7" />
                      <line x1="46.5" y1="28" x2="59.5" y2="28" stroke="#f8fafc" strokeWidth="0.8" opacity="0.7" />
                    </g>
                  </svg>
                </div>
              </div>

              {/* Stage Subtext Indicator */}
              <span className="absolute top-[3px] text-[10px] sm:text-[11px] font-black tracking-widest text-teal-300 uppercase animate-pulse select-none z-10">
                {stage === 'worker-enter' && t('ডেলিভারি ভ্যান আসছে...', 'Delivery van arriving...')}
                {stage === 'loading-box' && t('অর্ডার বক্স লোড হচ্ছে...', 'Loading parcel box...')}
                {stage === 'door-close' && t('ডাটা ভ্যালিডেশন হচ্ছে...', 'Securing order...')}
                {stage === 'driving' && t('অর্ডার সম্পন্ন হচ্ছে...', 'Completing purchase...')}
                {stage === 'driving-away' && t('ডেলিভারি শুরু হচ্ছে!', 'Shipped!')}
              </span>
            </div>

          </div>
        )}

        {/* ==================== STAGE 5: SUCCESS COMPLETE ==================== */}
        {stage === 'success' && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-emerald-600 anim-success-pop">
            <div className="flex items-center space-x-2.5">
              <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center text-white scale-110 shadow-inner">
                <Check className="h-4 w-4 stroke-[4] animate-bounce" />
              </div>
              <span className="text-sm font-black tracking-wider text-white uppercase drop-shadow">
                {t('অর্ডার সম্পন্ন হয়েছে ✔', 'Order Placed ✔')}
              </span>
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
