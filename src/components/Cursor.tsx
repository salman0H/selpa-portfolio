import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    
    // Skip the custom cursor on mobile and touch devices
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) return;

    // Smooth cursor movement
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15, // Creates a soft, fluid motion
        ease: "power2.out"
      });
    };

    // Detect hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Enlarge the cursor over an interactive element
      if (target.closest('a, button, input, textarea, .product-hover')) {
        gsap.to(cursor, { 
          scale: 3.5, 
          backgroundColor: 'transparent', 
          border: '0.5px solid #e5dcd3', 
          duration: 0.3 
        });
      } else {
        // Return to the default solid dot
        gsap.to(cursor, { 
          scale: 1, 
          backgroundColor: '#e5dcd3', 
          border: 'none', 
          duration: 0.3 
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      // Keep the cursor above all page content
      className="fixed top-0 left-0 w-4 h-4 bg-[#e5dcd3] rounded-full pointer-events-none z-[9999999] mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
    ></div>
  );
}