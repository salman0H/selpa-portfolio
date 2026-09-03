import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const galleryImages = [
  { id: 1, src: '/images/slider-hide.jpg', title: 'Raw Hide' },
  { id: 2, src: '/images/slider-pattern.jpg', title: 'The Measure' },
  { id: 3, src: '/images/slider-stitch.jpg', title: 'Saddle Stitch' },
  { id: 4, src: '/images/slider-final.jpg', title: 'The Legacy' }
];

export default function HorizontalGallery() {
  const container = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.gallery-slide');
    
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: 1,
        // 1. Use the exact viewport width instead of the dynamic element width
        end: () => `+=${window.innerWidth * (sections.length - 1)}`,
        // 2. Anticipate pinning to prevent sudden jumps
        anticipatePin: 1, 
        // 3. Recalculate scroll positions when layers change
        invalidateOnRefresh: true, 
      }
    });

    // 4. Briefly delay the GSAP refresh until the DOM and above-the-fold images load
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // 5. Refresh calculations when all page assets finish loading
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);

    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener('load', handleLoad);
    };
  }, { scope: container });

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-zinc-950" dir="ltr">
      <div className="absolute top-10 left-10 z-20 pointer-events-none">
        <span className="font-serif text-sm tracking-[0.3em] text-zinc-500 uppercase">Gallery Archive</span>
      </div>
      
      <div ref={slider} className="flex h-full w-[400vw] relative z-10">
        {galleryImages.map((img) => (
          <div key={img.id} className="gallery-slide relative w-screen h-full flex items-center justify-center p-8 md:p-24">
            <div className="relative w-full h-full overflow-hidden group">
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out scale-105 group-hover:scale-100" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000"></div>
              <h2 className="absolute bottom-10 left-10 text-[#e5dcd3] font-serif text-5xl md:text-8xl mix-blend-difference uppercase pointer-events-none">
                {img.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}