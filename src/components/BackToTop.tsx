import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BackToTop() {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        gsap.to(btnRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" });
      } else {
        gsap.to(btnRef.current, { autoAlpha: 0, y: 20, duration: 0.4, ease: "power2.in" });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTop = () => {
    // استفاده از اسکرول نرم بومی مرورگر (بدون باگ GSAP)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button 
      ref={btnRef} 
      onClick={goTop} 
      className="fixed bottom-8 left-8 md:bottom-12 md:left-12 z-[90] w-14 h-14 bg-zinc-950 text-[#e5dcd3] rounded-full flex items-center justify-center opacity-0 translate-y-5 hover:scale-110 transition-transform duration-300 mix-blend-difference border border-[#e5dcd3]/30"
      aria-label="Back to top"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7"/>
      </svg>
    </button>
  );
}