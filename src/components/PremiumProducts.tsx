import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: '01',
    titleEn: "Travel Journal",
    titleFa: "ژورنال مسافرتی",
    image: "/images/journal-raw.jpg",
    desc: "محافظت بی‌نقص با چرم فول‌گرین ضخیم و قفل برنجی آنتیک.",
    alignment: "items-start"
  },
  {
    id: '02',
    titleEn: "Laptop Folio",
    titleFa: "فولیو مک‌بوک",
    image: "/images/folio-raw.jpg",
    desc: "طراحی مینیمال و پاکتی با یک استاد برنجی مات.",
    alignment: "items-end"
  },
  {
    id: '03',
    titleEn: "Minimal Wallet",
    titleFa: "کیف پول مینیمال",
    image: "/images/slider-final.jpg", // از عکسی که برای اسلایدر تولید کردی استفاده می‌کنیم
    desc: "طراحی هندسی با لبه‌های پرداخت شده ارگانیک.",
    alignment: "items-start"
  }
];

export default function PremiumProducts() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const rows = gsap.utils.toArray('.product-row');

    rows.forEach((row: any) => {
      const imageContainer = row.querySelector('.img-container');
      const image = row.querySelector('.parallax-img');
      const textBlock = row.querySelector('.text-parallax');
      const line = row.querySelector('.reveal-line');

      // افکت باز شدن ماسک عکس هنگام رسیدن به آن (Clip-path Reveal)
      gsap.fromTo(imageContainer, 
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
          }
        }
      );

      // پارالاکس عکس (حرکت کندتر از اسکرول)
      gsap.to(image, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: row,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1, // عدد 1 باعث نرمی و تاخیر فیزیکی (Fluidity) می‌شود
        }
      });

      // پارالاکس متن (حرکت در جهت مخالف عکس برای عمق دادن)
      gsap.to(textBlock, {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: row,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // خط جداکننده
      gsap.fromTo(line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 70%',
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-zinc-950 py-32 flex flex-col gap-32 md:gap-60 overflow-hidden text-[#e5dcd3]">
      
      {/* تیتر بخش */}
      <div className="max-w-7xl mx-auto px-4 md:px-20 w-full flex justify-between items-center border-b border-zinc-800 pb-8">
        <span className="font-serif text-xs uppercase tracking-[0.4em] text-zinc-500">Selected Works</span>
        <span className="font-serif text-xs uppercase tracking-[0.4em] text-zinc-500">2026</span>
      </div>

      {products.map((product, index) => (
        <div key={product.id} className={`product-row relative w-full flex flex-col ${product.alignment} px-4 md:px-20 max-w-7xl mx-auto`}>
          
          {/* بلاک متنی شناور */}
          <div className={`text-parallax relative z-20 mix-blend-difference pointer-events-none w-full flex flex-col ${index % 2 !== 0 ? 'md:items-end' : 'md:items-start'}`}>
            <div className="flex items-center gap-4 md:gap-8 mb-2">
              <span className="font-serif text-xl md:text-3xl text-zinc-500 italic">{product.id}</span>
              <h2 className="font-fa font-bold text-5xl md:text-[8rem] leading-none text-[#e5dcd3] uppercase tracking-tighter">
                {product.titleFa}
              </h2>
            </div>
            <h3 className="font-serif text-3xl md:text-6xl text-zinc-400 italic ml-12 md:ml-24">
              {product.titleEn}
            </h3>
          </div>

          {/* کانتینر عکس با افکت ماسک */}
          <div className="img-container relative w-[90vw] md:w-[50vw] h-[50vh] md:h-[80vh] mt-[-10vh] md:mt-[-20vh] z-10 overflow-hidden group">
            <img 
              src={product.image} 
              alt={product.titleEn} 
              className="parallax-img absolute top-[-20%] left-0 w-full h-[140%] object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
            />
            {/* لایه تاریک‌کننده برای خوانایی */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-1000"></div>
            
            {/* دکمه شناور روی عکس */}
            <div className="absolute bottom-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <button className="w-16 h-16 rounded-full bg-[#e5dcd3] text-zinc-950 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <ArrowUpLeft className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* توضیحات محصول */}
          <div className="relative z-20 w-full max-w-sm mt-8 flex flex-col gap-4" dir="rtl">
            <div className="reveal-line w-full h-[1px] bg-zinc-700 origin-right"></div>
            <p className="font-fa text-lg text-zinc-400 font-light leading-relaxed">
              {product.desc}
            </p>
          </div>

        </div>
      ))}
    </section>
  );
}