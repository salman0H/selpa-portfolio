import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > window.innerHeight);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
      })}
      className={`fixed bottom-5 left-5 md:bottom-12 md:left-12 z-[90] w-12 h-12 bg-zinc-950 text-[#e5dcd3] rounded-full flex items-center justify-center transition-[opacity,transform,visibility] duration-300 border border-[#e5dcd3]/30 ${visible ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-5'}`}
      aria-label="بازگشت به بالای صفحه"
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
