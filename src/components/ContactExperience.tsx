import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function ContactExperience() {
  const container = useRef<HTMLDivElement>(null);
  const magneticBtn = useRef<HTMLAnchorElement>(null);
  const magneticText = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = magneticBtn.current;
    const text = magneticText.current;
    
    if (btn && text) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: 'power2.out' });
        gsap.to(text, { x: x * 0.1, y: y * 0.1, duration: 0.5, ease: 'power2.out' });
      };
      
      const handleMouseLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
        gsap.to(text, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
      };

      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    // z-50 places this layer above all scattered archive images
    <section id="contact-section" ref={container} className="relative z-50 w-full min-h-screen bg-[#e5dcd3] text-zinc-900 py-32 px-4 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-20">
        
        <div className="flex flex-col w-full md:w-1/2" dir="rtl">
          <h2 className="font-display text-6xl md:text-8xl text-zinc-950 mb-8 leading-none tracking-tight">
            شخصی‌سازی <br/> شده
          </h2>
          <p className="font-fa text-lg text-zinc-600 font-light max-w-md leading-relaxed mb-16">
            هر محصول نقطه‌ی شروعی برای یک مکالمه است. برای انتخاب چرم، تغییر ابعاد و یا لمس محصولات از نزدیک با ما در ارتباط باشید.
          </p>

          <div className="flex flex-col w-full border-t border-zinc-300">
            {['چرم فول‌گرین', 'دوخت سنتی', 'پرداخت ارگانیک'].map((item, i) => (
              <div key={i} className="group flex justify-between items-center py-6 border-b border-zinc-300 cursor-pointer">
                <span className="font-fa text-2xl md:text-4xl text-zinc-800 font-light group-hover:translate-x-[-10px] transition-transform duration-300">{item}</span>
                <svg className="w-6 h-6 text-zinc-400 group-hover:text-zinc-900 transition-colors transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full md:w-1/2 items-end justify-center gap-8 mt-10 md:mt-0" dir="rtl">
          
          <div className="w-full md:w-[28rem] border border-zinc-300 rounded-[2rem] p-10 flex flex-col items-center text-center">
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-zinc-500 mb-6">Physical Atelier</span>
            <h3 className="font-fa text-3xl font-bold text-zinc-900 mb-4">مشهد، کافه ایوار</h3>
            <p className="font-fa text-zinc-600 font-light">نقطه تماس فیزیکی و نمایش آثار</p>
          </div>

          <a 
            href="https://t.me/salmonFishMan" 
            target="_blank"
            rel="noreferrer"
            ref={magneticBtn} 
            className="group relative w-full md:w-[28rem] h-32 border border-zinc-950 rounded-[3rem] flex items-center justify-center overflow-hidden bg-transparent hover:bg-zinc-950 transition-colors duration-500"
          >
            <span ref={magneticText} className="relative z-10 font-sans text-2xl md:text-3xl font-light tracking-widest text-zinc-950 group-hover:text-[#e5dcd3] transition-colors duration-500 pointer-events-none" dir="ltr">
              @salmonFishMan
            </span>
          </a>

        </div>
      </div>
    </section>
  );
}