import { useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const products = [
  {
    id: 1,
    title: "Travel Journal",
    image: "/images/journal-raw.jpg",
    alignment: "justify-start",
    speed: 100
  },
  {
    id: 2,
    title: "Laptop Folio",
    image: "/images/folio-raw.jpg",
    alignment: "justify-end mt-32",
    speed: -50
  },
  {
    id: 3,
    title: "Craft Archive",
    image: "/images/tools-raw.jpg",
    alignment: "justify-center mt-64",
    speed: 150
  }
];

export default function EditorialArchive() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.collage-item');
    
    items.forEach((item: any, i) => {
      const image = item.querySelector('.parallax-img');
      const text = item.querySelector('.reveal-text');
      const speed = products[i].speed;

      gsap.to(image, {
        y: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.fromTo(text, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top center+=100',
            toggleActions: 'play reverse play reverse'
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full py-32 px-4 md:px-20 min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto flex flex-col gap-40">
        {products.map((product) => (
          <div key={product.id} className={`collage-item flex w-full ${product.alignment} relative`}>
            <div className="relative w-[85vw] md:w-[45vw] h-[60vh] overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title}
                className="parallax-img w-full h-[120%] object-cover absolute top-[-10%]"
              />
            </div>
            <h2 className="reveal-text absolute top-1/2 -translate-y-1/2 left-4 md:left-1/4 text-4xl md:text-7xl font-serif text-[#e5dcd3] mix-blend-difference z-20 pointer-events-none uppercase">
              {product.title}
            </h2>
          </div>
        ))}
      </div>
    </section>
  );
}