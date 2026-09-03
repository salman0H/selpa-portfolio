import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TypographyManifesto() {
  const container = useRef<HTMLDivElement>(null);
  const hoverImageRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    const lines = gsap.utils.toArray('.reveal-line');
    gsap.fromTo(lines,
      { y: 150, skewY: 5, opacity: 0 },
      {
        y: 0, skewY: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out',
        scrollTrigger: { trigger: container.current, start: 'top 75%' }
      }
    );

    gsap.to('.bg-typography', {
      y: -200,
      ease: 'none',
      scrollTrigger: { trigger: container.current, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  }, { scope: container });

  // Mouse-follow logic for the floating image (high performance with quickTo)
  useEffect(() => {
    if (!hoverImageRef.current) return;
    
    const xMove = gsap.quickTo(hoverImageRef.current, "x", { duration: 0.4, ease: "power3" });
    const yMove = gsap.quickTo(hoverImageRef.current, "y", { duration: 0.4, ease: "power3" });

    const moveImage = (e: MouseEvent) => {
      xMove(e.clientX - 150); // Offset to center the image
      yMove(e.clientY - 200);
    };

    window.addEventListener('mousemove', moveImage);
    return () => window.removeEventListener('mousemove', moveImage);
  }, []);

  useEffect(() => {
    if (isHovering) {
      gsap.to(hoverImageRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' });
    } else {
      gsap.to(hoverImageRef.current, { scale: 0, opacity: 0, duration: 0.4, ease: 'power3.in' });
    }
  }, [isHovering]);

  return (
    <section ref={container} className="relative w-full py-40 md:py-60 bg-zinc-950 text-[#e5dcd3] overflow-hidden">
      
      {/* Floating image that follows the mouse */}
      <div 
        ref={hoverImageRef} 
        className="fixed top-0 left-0 w-[300px] h-[400px] pointer-events-none z-50 scale-0 opacity-0 overflow-hidden"
      >
        <img src="/images/desk-raw.jpg" alt="Craft Texture" className="w-full h-full object-cover grayscale" />
      </div>

      {/* Oversized calligraphy in the background for avant-garde contrast */}
      <div className="bg-typography absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.04] select-none text-[30vw] font-art whitespace-nowrap text-zinc-100">
        اصالت پنهان
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-20 relative z-10">
        
        <div className="flex items-start justify-between border-t border-zinc-800 pt-8 mb-32">
          <span className="font-serif text-xs uppercase tracking-[0.4em] text-zinc-500">Manifesto</span>
          <span className="font-serif text-xs uppercase tracking-[0.4em] text-zinc-500">[ 01 ]</span>
        </div>

        <div className="flex flex-col gap-2 md:gap-6 text-right" dir="rtl">
          <div className="overflow-hidden py-2">
            <h2 className="reveal-line font-fa font-light text-5xl md:text-[6rem] leading-tight text-zinc-300">
              ما به اشیایی باور داریم
            </h2>
          </div>
          <div className="overflow-hidden py-2 flex items-center justify-start gap-4">
            <h2 className="reveal-line font-fa font-light text-5xl md:text-[6rem] leading-tight text-zinc-300">
              که با گذشت
            </h2>
            {/* Interactive word */}
            <span 
              className="reveal-line hover-reveal font-serif italic text-6xl md:text-[7rem] text-zinc-500 translate-y-2 relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Time
              <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-zinc-500 origin-left scale-x-0 transition-transform duration-500" style={{ transform: isHovering ? 'scaleX(1)' : 'scaleX(0)' }}></span>
            </span>
          </div>
          <div className="overflow-hidden py-2">
            <h2 className="reveal-line font-fa font-light text-5xl md:text-[6rem] leading-tight text-zinc-300">
              شخصیت می‌گیرند،
            </h2>
          </div>
          <div className="overflow-hidden py-2 flex items-center justify-start gap-6 mt-4 md:mt-8">
            <span className="reveal-line hidden md:block w-32 h-[1px] bg-zinc-600"></span>
            <h2 className="reveal-line font-fa font-bold text-5xl md:text-[6rem] leading-tight text-[#e5dcd3]">
              نه اینکه فرسوده شوند.
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-32 md:mt-48">
          <div className="md:col-span-4 flex flex-col justify-end overflow-hidden">
            <p className="reveal-line font-serif text-xs tracking-[0.2em] text-zinc-600 uppercase leading-loose">
              An act of rebellion against<br />mass production.
            </p>
          </div>
          <div className="md:col-span-8 overflow-hidden">
            <p className="reveal-line font-fa text-lg md:text-2xl text-zinc-400 leading-[2.2] text-justify font-light" dir="rtl">
              در دنیای پرشتاب امروز، سلپا یک مکث است. یک بازگشت به ریشه‌ها. هر برشی که روی چرم می‌خورد، هر کوکی که با دست زده می‌شود، نمادی از احترام به اصالت است. ما روی جزئیاتی زمان می‌گذاریم که شاید در نگاه اول به چشم نیایند، اما در گذر زمان، تفاوت میان یک «کالا» و یک «میراث» را رقم می‌زنند.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}