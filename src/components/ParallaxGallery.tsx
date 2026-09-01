import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// دیتابیس محصولات تکمیلی
const extraProducts = [
  { id: 1, src: '/images/extra-1.jpg', title: 'Minimal Belt', category: 'Accessories', col: 1 },
  { id: 2, src: '/images/extra-2.jpg', title: 'Card Holder', category: 'Essentials', col: 2 },
  { id: 3, src: '/images/extra-3.jpg', title: 'Key Organizer', category: 'Hardware', col: 3 },
  { id: 4, src: '/images/extra-4.jpg', title: 'Desk Pad', category: 'Workspace', col: 1 },
  { id: 5, src: '/images/extra-5.jpg', title: 'Glasses Case', category: 'Protection', col: 2 },
  { id: 6, src: '/images/extra-6.jpg', title: 'Watch Strap', category: 'Timepiece', col: 3 },
];

export default function ParallaxGallery() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ایجاد تضاد حرکتی بین ستون‌ها (Parallax)
    gsap.to('.gallery-col-1', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    gsap.to('.gallery-col-2', {
      yPercent: 25, // حرکت در جهت مخالف/کندتر
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

    gsap.to('.gallery-col-3', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });
  }, { scope: container });

  const renderColumn = (colIndex: number, className: string, offsetClass: string = '') => (
    <div className={`flex flex-col gap-8 md:gap-16 w-full ${className} ${offsetClass}`}>
      {extraProducts.filter(p => p.col === colIndex).map((product) => (
        <div key={product.id} className="relative group w-full product-hover cursor-none">
          <div className="overflow-hidden bg-zinc-900 border border-zinc-800">
            <img 
              src={product.src} 
              alt={product.title} 
              className="w-full h-auto object-cover aspect-[3/4] grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            />
          </div>
          {/* توضیحات محصول که با هاور ظاهر می‌شود */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-4">
            <h4 className="font-serif text-2xl text-[#e5dcd3] uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {product.title}
            </h4>
            <span className="font-serif text-xs text-zinc-400 tracking-[0.3em] uppercase mt-2 -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {product.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section ref={container} className="relative w-full bg-zinc-950 py-32 md:py-48 overflow-hidden border-t border-zinc-900">
      
      <div className="max-w-7xl mx-auto px-4 md:px-20 mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <span className="font-serif text-sm tracking-[0.3em] text-zinc-500 uppercase block mb-4">Complete Collection</span>
          <h2 className="font-fa text-5xl md:text-7xl text-[#e5dcd3] font-light">
            سایر آثار <span className="font-serif italic text-zinc-600">Archive</span>
          </h2>
        </div>
        <p className="font-fa text-zinc-500 text-lg max-w-sm text-right leading-relaxed" dir="rtl">
          اکتشاف در میان جزئیات. مجموعه‌ای از اکسسوری‌های روزمره که با همان دقت و وسواسِ محصولات اصلی، طراحی و دوخته شده‌اند.
        </p>
      </div>

      {/* گرید پارالاکس */}
      <div className="max-w-7xl mx-auto px-4 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 h-[150vh] md:h-[180vh] overflow-hidden">
        {renderColumn(1, 'gallery-col-1')}
        {/* ستون میانی با آفست منفی شروع می‌شود تا جای حرکت به پایین داشته باشد */}
        {renderColumn(2, 'gallery-col-2', 'md:-mt-[30vh]')} 
        {renderColumn(3, 'gallery-col-3', 'md:mt-[15vh]')}
      </div>
      
    </section>
  );
}