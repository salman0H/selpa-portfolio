import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpLeft } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "چرم فول‌گرین",
    desc: "بالاترین لایه پوست با حفظ بافت طبیعی؛ متریالی زنده که با گذشت زمان پتینه می‌بندد و شخصیت می‌گیرد."
  },
  {
    title: "دوخت سنتی",
    desc: "تکنیک Saddle Stitch با نخ موم‌زده؛ گره‌های مستقل که مقاومت سازه را در برابر پارگی تضمین می‌کنند."
  },
  {
    title: "پرداخت ارگانیک",
    desc: "صیقل لبه‌ها با صمغ کتیرا و موم زنبور عسل، بدون استفاده از رنگ‌های شیمیایی پلاستیکی."
  }
];

export default function ContactExperience() {
  const container = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  // رفرنس‌های افکت مگنتیک
  const magneticBtn = useRef<HTMLAnchorElement>(null);
  const magneticText = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    // انیمیشن Marquee
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 15,
        repeat: -1,
      });
    }

    // ظاهر شدن دراماتیک عنوان
    gsap.fromTo('.reveal-title',
      { y: 100, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1.5, ease: 'power4.out',
        scrollTrigger: {
          trigger: '.reveal-title',
          start: 'top 80%',
        }
      }
    );

    // منطق فیزیک مگنتیک دکمه تلگرام
    const btn = magneticBtn.current;
    const text = magneticText.current;

    if (btn && text) {
      // استفاده از quickTo برای پرفورمنس بالا در حرکت موس
      const xToBtn = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3" });
      const yToBtn = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3" });
      const xToText = gsap.quickTo(text, "x", { duration: 0.4, ease: "power3" });
      const yToText = gsap.quickTo(text, "y", { duration: 0.4, ease: "power3" });

      const hoverEffect = (e: MouseEvent) => {
        const { left, top, width, height } = btn.getBoundingClientRect();
        // محاسبه فاصله موس از مرکز دکمه
        const x = (e.clientX - left - width / 2) * 0.2; // 20% کشش برای کل دکمه
        const y = (e.clientY - top - height / 2) * 0.3; // 30% کشش عمودی

        xToBtn(x);
        yToBtn(y);
        // متن داخلی کمی بیشتر/کمتر حرکت می‌کند تا حس پارالاکس ایجاد شود
        xToText(x * 0.6); 
        yToText(y * 0.6);
      };

      const resetEffect = () => {
        // بازگشت حالت الاستیک به مرکز
        gsap.to([btn, text], { 
          x: 0, 
          y: 0, 
          duration: 0.8, 
          ease: 'elastic.out(1, 0.3)' 
        });
      };

      btn.addEventListener('mousemove', hoverEffect);
      btn.addEventListener('mouseleave', resetEffect);

      return () => {
        btn.removeEventListener('mousemove', hoverEffect);
        btn.removeEventListener('mouseleave', resetEffect);
      };
    }
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-[#e5dcd3] text-zinc-950 overflow-hidden pt-32 pb-20">
      
      {/* اسکرول متنی بی‌نهایت (Marquee) */}
      <div className="marquee-container w-full overflow-hidden whitespace-nowrap border-b border-zinc-950/20 pb-8 mb-20">
        <div ref={marqueeRef} className="inline-block text-8xl md:text-[9rem] font-serif uppercase tracking-tighter opacity-10">
          <span className="mx-8">Handcrafted in Mashhad</span>
          <span className="mx-8">—</span>
          <span className="mx-8">Bespoke Leather Goods</span>
          <span className="mx-8">—</span>
          <span className="mx-8">Handcrafted in Mashhad</span>
          <span className="mx-8">—</span>
          <span className="mx-8">Bespoke Leather Goods</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20">
        
        {/* ستون راست: آکاردئون تعاملی ویژگی‌ها */}
        <div className="flex flex-col border-t border-zinc-950/20">
          <h3 className="font-serif text-2xl uppercase tracking-widest mb-10 mt-6 text-zinc-500">The Process</h3>
          
          <div className="flex flex-col" dir="rtl">
            {features.map((feat, idx) => (
              <div 
                key={idx}
                className="group border-b border-zinc-950/20 py-8 transition-all duration-500"
                onMouseEnter={() => setActiveFeature(idx)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="flex items-center justify-between">
                  <h4 className={`font-fa font-bold text-3xl md:text-4xl transition-colors duration-500 ${activeFeature !== null && activeFeature !== idx ? 'text-zinc-950/30' : 'text-zinc-950'}`}>
                    {feat.title}
                  </h4>
                  <span className={`transition-transform duration-500 ${activeFeature === idx ? '-rotate-45' : 'rotate-0'}`}>
                    <ArrowUpLeft className="w-8 h-8 opacity-50 group-hover:opacity-100" />
                  </span>
                </div>
                
                <div className={`overflow-hidden transition-all duration-700 ease-in-out ${activeFeature === idx ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                  <p className="font-fa text-lg md:text-xl leading-relaxed text-zinc-700 max-w-md">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ستون چپ: اطلاعات تماس و دکمه مگنتیک */}
        <div className="flex flex-col justify-between">
          <div className="reveal-title mb-20" dir="rtl">
            <h2 className="font-fa font-bold text-5xl md:text-7xl leading-tight mb-8 text-zinc-900">
              برای سفارش‌های <br/>
              شخصی‌سازی شده
            </h2>
            <p className="font-fa text-xl text-zinc-600 max-w-sm leading-relaxed">
              هر محصول نقطه‌ی شروعی برای یک مکالمه است. برای انتخاب چرم، تغییر ابعاد و یا لمس محصولات از نزدیک با ما در ارتباط باشید.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {/* کارت آدرس فیزیکی */}
            <div className="group border border-zinc-950/20 p-8 rounded-[2rem] hover:bg-zinc-950 hover:text-[#e5dcd3] transition-colors duration-700" dir="rtl">
              <span className="block font-serif text-sm uppercase tracking-widest opacity-50 mb-4 group-hover:opacity-70">Physical Atelier</span>
              <h5 className="font-fa font-bold text-3xl mb-2">مشهد، کافه ایوار</h5>
              <p className="font-fa opacity-70 text-lg">نقطه تماس فیزیکی و نمایش آثار</p>
            </div>

            {/* دکمه مگنتیک تلگرام */}
            <a 
              ref={magneticBtn}
              href="https://t.me/salmonFishMan" 
              target="_blank"
              rel="noreferrer"
              className="group relative flex items-center justify-center w-full py-16 border-2 border-zinc-950 rounded-[3rem] overflow-hidden"
            >
              {/* پس‌زمینه پرشونده هنگام هاور */}
              <div className="absolute inset-0 bg-zinc-950 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"></div>
              
              {/* متن داخلی مگنتیک */}
              <span ref={magneticText} className="relative z-10 font-sans text-3xl md:text-5xl font-light tracking-wider text-zinc-950 group-hover:text-[#e5dcd3] transition-colors duration-500 pointer-events-none">
                @salmonFishMan
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}