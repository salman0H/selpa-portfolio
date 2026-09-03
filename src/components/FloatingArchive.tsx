import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// Reliable setup for Astro's SSR environment
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const collection = [
  { id: 1, src: '/images/image_20812b.jpg', title: 'Black Clutch', speed: -100, width: 'w-[65vw] md:w-[25vw]', position: 'left-[5%] top-[10%]' },
  { id: 2, src: '/images/image_208147.jpg', title: 'Crossbody Bag', speed: -250, width: 'w-[70vw] md:w-[22vw]', position: 'right-[10%] top-[25%]' },
  { id: 3, src: '/images/image_208183.jpg', title: 'Minimalist Tote', speed: -150, width: 'w-[80vw] md:w-[35vw]', position: 'left-[15%] top-[45%]' },
  { id: 4, src: '/images/image_20842c.jpg', title: 'Laptop Folio', speed: -300, width: 'w-[60vw] md:w-[28vw]', position: 'right-[5%] top-[60%]' },
  { id: 5, src: '/images/image_2084aa.jpg', title: 'Leather Journal', speed: -120, width: 'w-[50vw] md:w-[20vw]', position: 'left-[8%] top-[75%]' },
  { id: 6, src: '/images/image_2084cb.jpg', title: 'Grid Notebook', speed: -200, width: 'w-[85vw] md:w-[30vw]', position: 'right-[15%] top-[85%]' },
  { id: 7, src: '/images/image_208505.jpg', title: 'Black Notepad', speed: -80, width: 'w-[55vw] md:w-[24vw]', position: 'left-[30%] top-[95%]' }
];

export default function FloatingArchive() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.floating-item');

    items.forEach((item: any, i) => {
      const speed = collection[i].speed;
      
      gsap.to(item, {
        y: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    });

  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-zinc-950 py-20 h-[350vh] md:h-[300vh] overflow-hidden">
      
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center pointer-events-none z-0 px-4 text-center">
        <h2 className="font-serif text-[15vw] md:text-[10vw] leading-none text-zinc-900 uppercase tracking-tighter mix-blend-difference">
          Archive
        </h2>
        <h3 className="font-fa text-3xl md:text-5xl text-zinc-800 font-light mt-4 mix-blend-difference">
          مجموعه آثار
        </h3>
      </div>

      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        <div className="relative w-full h-full max-w-7xl mx-auto">
          {collection.map((item) => (
            <div 
              key={item.id} 
              // GSAP scrolls this layer
              className={`floating-item absolute ${item.position} ${item.width} pointer-events-auto`}
            >
              {/* Tailwind zooms this inner layer without interfering with GSAP */}
              <div className="relative group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.15] hover:z-50 hover:shadow-2xl hover:shadow-black/80">
                
                <div className="w-full h-auto overflow-hidden bg-zinc-900 border border-zinc-800 product-hover">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-auto object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                
                <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute -bottom-12 left-0 w-full px-3 py-2 bg-zinc-950/90 rounded backdrop-blur-md">
                  <span className="font-serif text-sm text-zinc-300 uppercase tracking-widest">{item.title}</span>
                  <span className="font-serif text-xs text-zinc-500">No. 0{item.id}</span>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}