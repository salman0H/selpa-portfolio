import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  
  const textSolidRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textOutlineRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const xToSolid = gsap.quickTo(textSolidRef.current, "x", { duration: 1.2, ease: "power3.out" });
    const yToSolid = gsap.quickTo(textSolidRef.current, "y", { duration: 1.2, ease: "power3.out" });
    
    const xToOutline = gsap.quickTo(textOutlineRef.current, "x", { duration: 1.2, ease: "power3.out" });
    const yToOutline = gsap.quickTo(textOutlineRef.current, "y", { duration: 1.2, ease: "power3.out" });
    
    const xToImage = gsap.quickTo(imageRef.current, "x", { duration: 0.8, ease: "power4.out" });
    const yToImage = gsap.quickTo(imageRef.current, "y", { duration: 0.8, ease: "power4.out" });
    const rotateImage = gsap.quickTo(imageRef.current, "rotation", { duration: 1, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / innerWidth;
      const y = (e.clientY - innerHeight / 2) / innerHeight;

      xToSolid(x * 100);
      yToSolid(y * 50);
      xToOutline(x * 100);
      yToOutline(y * 50);

      xToImage(x * -80);
      yToImage(y * -40);
      rotateImage(x * -10); 
    };

    window.addEventListener("mousemove", handleMouseMove);

    gsap.to(imageRef.current, {
      yPercent: 40,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    gsap.to([textSolidRef.current, textOutlineRef.current], {
      yPercent: -30,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full h-screen bg-[#e5dcd3] overflow-hidden flex items-center justify-center">
      
      {/* لایه ۱: متن توپر در پس‌زمینه */}
      <h1 
        ref={textSolidRef} 
        className="absolute z-10 font-serif text-[28vw] leading-none text-zinc-900 uppercase tracking-tighter pointer-events-none select-none mix-blend-multiply opacity-90"
      >
        SELPA
      </h1>

      {/* لایه ۲: تصویر */}
      <div 
        ref={imageRef}
        className="relative z-20 w-[85vw] md:w-[30vw] h-[60vh] md:h-[70vh] shadow-2xl shadow-black/40 pointer-events-none"
      >
        <img 
          src="/images/image_20812b.jpg" 
          alt="Leather Craft" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* لایه ۳: متن توخالی در پیش‌زمینه (با افکت Difference و حاشیه سفید) */}
      <h1 
        ref={textOutlineRef} 
        className="absolute z-30 font-serif text-[28vw] leading-none text-transparent uppercase tracking-tighter pointer-events-none select-none mix-blend-difference"
        style={{ WebkitTextStroke: '2px white' }}
      >
        SELPA
      </h1>

      {/* تایپوگرافی فارسی با افکت Difference و رنگ پایه سفید */}
      <div className="absolute z-40 bottom-10 right-8 md:bottom-16 md:right-16 flex flex-col items-start text-right pointer-events-none mix-blend-difference text-white" dir="rtl">
        
        <h2 className="font-fa text-xl md:text-3xl font-light mb-[-1.5rem] md:mb-[-2.5rem] pr-2 md:pr-4 z-10 opacity-90">
          آتلیه چرم
        </h2>
        
        <span className="font-display text-[7.5rem] md:text-[11rem] leading-none tracking-tight text-white">
          سلپا
        </span>
        
        <div className="flex items-center gap-4 mt-1 md:mt-2 opacity-80">
          <span className="w-16 md:w-24 h-[1px] bg-white"></span>
          <p className="font-serif text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase" dir="ltr">
            Bespoke Leather Craft
          </p>
        </div>
      </div>

      {/* تاریخ تاسیس با افکت Difference */}
      <div className="absolute z-40 top-10 left-8 md:top-16 md:left-16 mix-blend-difference text-white">
        <span className="font-serif text-xs md:text-sm uppercase tracking-[0.4em] font-bold">
          Est. 2026
        </span>
      </div>

    </section>
  );
}