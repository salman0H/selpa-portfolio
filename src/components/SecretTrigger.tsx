import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SecretTrigger() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pullAmount = 0;
    let isTriggered = false;

    const handleWheel = (e: WheelEvent) => {
      // فقط زمانی که در بالاترین نقطه سایت هستیم و به بالا اسکرول میکنیم
      if (window.scrollY <= 0 && e.deltaY < 0 && !isTriggered) {
        pullAmount += Math.abs(e.deltaY);
        
        // کاربر فقط 150 پیکسل اسکرول کند کافیست
        const progress = Math.min(pullAmount / 150, 1);
        
        // افکت محو شدن صفحه زیرین و ایجاد مه تاریک
        gsap.to(overlayRef.current, { 
          opacity: progress, 
          backdropFilter: `blur(${progress * 15}px)`,
          duration: 0.1 
        });

        // وقتی به حد نصاب رسید، خودش بقیه کارها را اتوماتیک انجام می‌دهد
        if (progress >= 1) {
          isTriggered = true;
          
          // انیمیشن نجواگونه متن (بزرگ شدن و درخشش)
          gsap.to(textRef.current, { 
            opacity: 1, 
            scale: 1.05, 
            duration: 1.5, 
            ease: "power3.out" 
          });
          
          // بعد از ۱.۵ ثانیه تماشای افکت، اتوماتیک وارد نجواها می‌شود
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('openWhispers'));
            
            // ریست کردن تریگر در پس‌زمینه برای دفعات بعد
            setTimeout(() => {
              pullAmount = 0;
              isTriggered = false;
              gsap.set([overlayRef.current, textRef.current], { opacity: 0 });
              gsap.set(textRef.current, { scale: 0.95 });
            }, 1000);
          }, 1500);
        }
      } else if (pullAmount > 0 && !isTriggered) {
        // اگر کاربر اسکرول را رها کرد، مه به آرامی از بین می‌رود
        pullAmount = Math.max(0, pullAmount - 15);
        gsap.to(overlayRef.current, { 
          opacity: Math.min(pullAmount / 150, 1),
          backdropFilter: `blur(${Math.min(pullAmount / 150, 1) * 15}px)`
        });
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[99999] opacity-0 pointer-events-none bg-zinc-950/70 transition-all duration-100 flex items-center justify-center"
    >
      {/* افکت نور شعاعی و مرموز به جای نویز */}
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