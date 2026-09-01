import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    if (!dotRef.current || !ringRef.current || !textRef.current) return;

    // نقطه مرکزی (سرعت بالا - بدون تاخیر)
    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.05, ease: "power4.out" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.05, ease: "power4.out" });

    // حلقه بیرونی (سرعت پایین‌تر - فیزیک فنری)
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.4, ease: "power3.out" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.4, ease: "power3.out" });

    const moveCursor = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // افکت‌ها برای عناصر تعاملی
    const interactiveElements = document.querySelectorAll('a, button');
    const productElements = document.querySelectorAll('.product-hover');

    const onHoverLink = () => {
      gsap.to(dotRef.current, { scale: 0, opacity: 0, duration: 0.3 });
      gsap.to(ringRef.current, { width: 50, height: 50, backgroundColor: 'rgba(229, 220, 211, 0.1)', borderColor: 'rgba(229, 220, 211, 0.5)', duration: 0.3 });
    };

    const onHoverProduct = () => {
      gsap.to(dotRef.current, { scale: 0, opacity: 0, duration: 0.3 });
      gsap.to(ringRef.current, { 
        width: 80, height: 80, 
        backgroundColor: '#e5dcd3', 
        borderColor: '#e5dcd3', 
        mixBlendMode: 'normal',
        duration: 0.4, ease: 'back.out(1.5)' 
      });
      setCursorText("مشاهده");
      gsap.to(textRef.current, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 });
    };

    const onLeave = () => {
      gsap.to(dotRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(ringRef.current, { 
        width: 32, height: 32, 
        backgroundColor: 'transparent', 
        borderColor: 'rgba(229, 220, 211, 0.3)', 
        mixBlendMode: 'difference',
        duration: 0.3 
      });
      setCursorText("");
      gsap.to(textRef.current, { opacity: 0, scale: 0, duration: 0.2 });
    };

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onHoverLink);
      el.addEventListener('mouseleave', onLeave);
    });

    productElements.forEach((el) => {
      el.addEventListener('mouseenter', onHoverProduct);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverLink);
        el.removeEventListener('mouseleave', onLeave);
      });
      productElements.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverProduct);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* حلقه بیرونی با قابلیت نمایش متن */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#e5dcd3]/30 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference overflow-hidden"
      >
        <span ref={textRef} className="font-fa text-[10px] font-bold text-zinc-950 opacity-0 scale-0">
          {cursorText}
        </span>
      </div>
      
      {/* نقطه مرکزی */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#e5dcd3] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      ></div>
    </>
  );
}