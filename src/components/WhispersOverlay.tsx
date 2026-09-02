import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import WhisperForm from './WhisperForm';

gsap.registerPlugin(ScrollTrigger);

export default function WhispersOverlay({ whispers }: { whispers: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isExiting = useRef(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleExit = () => exitRoutine();

    window.addEventListener('openWhispers', handleOpen);
    window.addEventListener('exitWhispers', handleExit);

    return () => {
      window.removeEventListener('openWhispers', handleOpen);
      window.removeEventListener('exitWhispers', handleExit);
    };
  }, []);

  const exitRoutine = () => {
    if (isExiting.current || !containerRef.current) return;
    isExiting.current = true;

    // --- This signal switches the hero state ---
    window.dispatchEvent(new CustomEvent('whispersReturned'));

    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';

    window.scrollTo({ top: document.body.scrollHeight });

    gsap.to(containerRef.current, {
      yPercent: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => {
        setIsOpen(false);
        isExiting.current = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  useEffect(() => {
    if (isOpen && containerRef.current) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      containerRef.current.scrollTop = 0;

      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );

      const ctx = gsap.context(() => {
        gsap.utils.toArray('.whisper-item-overlay').forEach((item: any) => {
          gsap.fromTo(item,
            { y: 50, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 1, ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                scroller: containerRef.current,
                start: 'top 85%'
              }
            }
          );
        });
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={containerRef} data-lenis-prevent="true" className="fixed inset-0 z-[100] bg-[#e5dcd3] overflow-y-auto overflow-x-hidden">
        
        <button 
          onClick={exitRoutine}
          className="fixed top-8 right-8 md:top-12 md:right-12 z-50 font-serif text-xs tracking-[0.3em] uppercase text-zinc-900 border border-zinc-900 px-6 py-2 rounded-full hover:bg-zinc-900 hover:text-[#e5dcd3] transition-colors"
        >
          Return
        </button>

        <div className="w-full flex flex-col pt-32">
          <div className="flex flex-col items-center text-center px-4 mb-32">
            <span className="font-serif text-sm md:text-base tracking-[0.5em] uppercase block mb-6 text-zinc-500">The Hidden Archive</span>
            <h2 className="font-art text-7xl md:text-[10rem] leading-none mb-8 text-zinc-950" style={{ textRendering: 'optimizeLegibility' }}>نجواها</h2>
          </div>

          <div className="max-w-7xl mx-auto px-4 md:px-20 w-full">
            {whispers.length === 0 ? (
              <p className="font-fa text-center text-zinc-500 text-2xl italic my-20">سکوت مطلق. اولین نجوا را شما ثبت کنید.</p>
            ) : (
              <div className="flex flex-col gap-32 md:gap-40 pb-40">
                {whispers.map((whisper, i) => (
                  <div key={i} className={`whisper-item-overlay relative flex flex-col w-full max-w-4xl ${i % 2 === 0 ? 'md:self-end md:text-right md:items-end' : 'md:self-start md:text-left md:items-start'}`} dir={i % 2 === 0 ? 'rtl' : 'ltr'}>
                    <p className="relative z-10 font-fa text-3xl md:text-5xl font-light leading-tight text-zinc-900 mb-6" dir="rtl">
                      "{whisper.message}"
                    </p>
                    <div className="relative z-10 flex items-center gap-4 opacity-50">
                      <span className="w-12 h-[1px] bg-zinc-900"></span>
                      <span className="font-serif text-sm tracking-widest uppercase">{whisper.author}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="w-full bg-zinc-950 text-[#e5dcd3] py-32 mt-20 flex flex-col items-center px-4">
            <div className="text-center mb-16">
              <span className="font-serif text-xs tracking-[0.4em] uppercase text-[#e5dcd3]/50 mb-4 block">Bespoke Challenge</span>
              <h3 className="font-fa text-4xl md:text-6xl font-light mb-6">طراح رویای خود باشید</h3>
              <p className="font-fa text-zinc-400 font-light max-w-md mx-auto leading-relaxed" dir="rtl">
                شما به عنوان یک طراح برگزیده شده‌اید. ایده‌ها و رویاهای خود را برای ما ارسال کنید تا در آتلیه سلپا به واقعیت تبدیل شود.
              </p>
            </div>
            <div className="w-full max-w-2xl">
              <WhisperForm />
            </div>
          </div>

        </div>
    </div>
  );
}