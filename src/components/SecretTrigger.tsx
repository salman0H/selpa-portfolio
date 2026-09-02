import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SecretTrigger() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pullAmount = 0;
    let isTriggered = false;
    let isLocked = false; // System safety lock

    // Lock the trigger when the whispers page opens
    const handleOpen = () => { isLocked = true; };
    
    // Keep the trigger locked during the four-second exit animation to cancel scroll momentum
    const handleExit = () => { 
      setTimeout(() => { isLocked = false; }, 4000); 
    };

    window.addEventListener('openWhispers', handleOpen);
    window.addEventListener('exitWhispers', handleExit);

    const handleWheel = (e: WheelEvent) => {
      // Ignore all scrolling while the system is locked
      if (isLocked) {
        pullAmount = 0;
        return;
      }

      if (window.scrollY <= 0 && e.deltaY < 0 && !isTriggered) {
        pullAmount += Math.abs(e.deltaY);
        
        const progress = Math.min(pullAmount / 150, 1);
        
        gsap.to(overlayRef.current, { 
          opacity: progress, 
          backdropFilter: `blur(${progress * 15}px)`,
          duration: 0.1 
        });

        if (progress >= 1) {
          isTriggered = true;
          isLocked = true; // Lock the system immediately after triggering
          
          gsap.to(textRef.current, { 
            opacity: 1, 
            scale: 1.05, 
            duration: 1.5, 
            ease: "power3.out" 
          });
          
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('openWhispers'));
            
            setTimeout(() => {
              pullAmount = 0;
              isTriggered = false;
              gsap.set([overlayRef.current, textRef.current], { opacity: 0 });
              gsap.set(textRef.current, { scale: 0.95 });
            }, 1000);
          }, 1500);
        }
      } else if (pullAmount > 0 && !isTriggered) {
        pullAmount = Math.max(0, pullAmount - 15);
        gsap.to(overlayRef.current, { 
          opacity: Math.min(pullAmount / 150, 1),
          backdropFilter: `blur(${Math.min(pullAmount / 150, 1) * 15}px)`
        });
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('openWhispers', handleOpen);
      window.removeEventListener('exitWhispers', handleExit);
    };
  }, []);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[99999] opacity-0 pointer-events-none bg-zinc-950/70 transition-all duration-100 flex items-center justify-center"
    >
      <div 
        className="absolute inset-0 opacity-40 mix-blend-screen" 
        style={{ background: 'radial-gradient(circle at center, #ffffff 0%, transparent 50%)', filter: 'blur(50px)' }}
      ></div>
      
      <div ref={textRef} className="relative z-10 flex flex-col items-center opacity-0 scale-95">
        <span 
          className="font-serif text-4xl md:text-6xl tracking-[0.6em] text-[#e5dcd3] uppercase mb-4" 
          style={{ textShadow: '0 0 30px rgba(229,220,211,0.6)' }}
        >
          The Whispers
        </span>
        <span className="font-fa font-light text-sm md:text-base text-zinc-400 tracking-widest">
          فراخوانی از اعماق بایگانی...
        </span>
      </div>
    </div>
  );
}