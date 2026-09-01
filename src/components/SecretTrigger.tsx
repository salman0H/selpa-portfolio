import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SecretTrigger() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pullAmount = 0;
    let isTriggered = false;
    let touchStartY = 0;

    const updateUI = () => {
      if (!overlayRef.current) return;
      
      // محاسبه میزان کشش (تا سقف 300 پیکسل)
      const progress = Math.min(pullAmount / 300, 1);
      gsap.to(overlayRef.current, { opacity: progress, duration: 0.1 });

      // اگر کشش به حد نصاب رسید، انتقال به صفحه مخفی
      if (progress >= 1 && !isTriggered) {
        isTriggered = true;
        window.location.href = '/whispers'; // آدرس صفحه مخفی
      }
    };

    // تشخیص اسکرول موس (چرخ موس به سمت بالا)
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY <= 0 && e.deltaY < 0) {
        pullAmount += Math.abs(e.deltaY);
        updateUI();
      } else if (pullAmount > 0) {
        pullAmount = 0;
        updateUI();
      }
    };

    // تشخیص لمس در موبایل (کشیدن انگشت به پایین)
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY <= 0) touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY <= 0 && touchStartY > 0) {
        const delta = e.touches[0].clientY - touchStartY;
        if (delta > 0) {
          pullAmount = delta * 1.5; // ضریب سرعت در موبایل
          updateUI();
        }
      }
    };

    const handleTouchEnd = () => {
      if (!isTriggered) {
        pullAmount = 0;
        updateUI();
        touchStartY = 0;
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div 
      ref={overlayRef} 
      className="fixed top-0 left-0 w-full h-screen bg-zinc-950 text-[#e5dcd3] z-[99999] opacity-0 pointer-events-none flex flex-col items-center justify-center transition-opacity"
    >
      <span className="font-serif text-3xl md:text-5xl tracking-[0.5em] uppercase mb-6">The Whispers</span>
      <span className="font-fa font-light text-sm md:text-base text-zinc-500 tracking-widest">
        در حال ورود به بایگانی مخفی...
      </span>
    </div>
  );
}