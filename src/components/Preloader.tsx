import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textEnRef = useRef<HTMLHeadingElement>(null);
  const textFaRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null); // Progress bar reference
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Lock site scrolling during loading
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock scrolling and remove the component from the DOM
        document.body.style.overflow = '';
        setIsMounted(false);
      }
    });

    // 0. Animate the progress bar filling
    tl.to(progressRef.current, { scaleX: 1, duration: 2.8, ease: "power2.inOut" }, 0);

    // 1. Animate the Selpa name and decorative line in
    tl.to(textEnRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }, 0.2)
      .to(lineRef.current, { scaleX: 1, duration: 1, ease: "power3.inOut" }, 0.5)
      .to(textFaRef.current, { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }, 0.7)
      
      // 2. Brief pause for visibility
      .to({}, { duration: 0.6 })
      
      // 3. Animate the text and progress bar out
      .to([textEnRef.current, textFaRef.current, lineRef.current], { 
        opacity: 0, 
        y: -20, 
        duration: 0.8, 
        ease: "power3.in",
        stagger: 0.1
      })
      .to(progressRef.current, { opacity: 0, duration: 0.4 }, "-=0.6")
      
      // 4. Raise the dark curtain to reveal the main site
      .to(containerRef.current, { 
        yPercent: -100, 
        duration: 1.5, 
        ease: "expo.inOut" 
      });

  }, []);

  if (!isMounted) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[999999] bg-zinc-950 flex flex-col items-center justify-center pointer-events-none"
    >
      {/* overflow-hidden is omitted so the dots in the Persian text are not clipped */}
      <div className="flex flex-col items-center">
        <h1 
          ref={textEnRef} 
          className="font-serif text-5xl md:text-7xl text-[#e5dcd3] tracking-[0.5em] uppercase opacity-0 translate-y-10"
        >
          Selpa
        </h1>
        
        <div 
          ref={lineRef} 
          className="w-16 h-[1px] bg-zinc-700 my-8 opacity-50 origin-center scale-x-0"
        ></div>
        
        {/* Add bottom padding (pb-4) to leave room for the dots */}
        <h2 
          ref={textFaRef} 
          className="font-art text-5xl md:text-7xl text-zinc-500 opacity-0 translate-y-10 pb-4"
          style={{ textRendering: 'optimizeLegibility' }}
        >
          سلپا
        </h2>
      </div>

      {/* Minimal progress bar at the bottom of the page */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 md:w-64 h-[1px] bg-zinc-800 overflow-hidden">
        <div 
          ref={progressRef} 
          className="w-full h-full bg-[#e5dcd3] origin-left scale-x-0"
        ></div>
      </div>
      
    </div>
  );
}