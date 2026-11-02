import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ResponsiveImage from './ResponsiveImage';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
  { src: '/images/slider-hide.jpg', title: 'Raw Hide', label: 'انتخاب چرم' },
  { src: '/images/slider-pattern.jpg', title: 'The Measure', label: 'طراحی و برش' },
  { src: '/images/slider-stitch.jpg', title: 'Saddle Stitch', label: 'دوخت با دست' },
  { src: '/images/slider-final.jpg', title: 'The Legacy', label: 'همراهی ماندگار' }
];

export default function HorizontalGallery() {
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.to(track.current, {
        x: () => -(track.current!.scrollWidth - container.current!.clientWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: container.current, pin: true, scrub: 1,
          end: () => `+=${track.current!.scrollWidth - container.current!.clientWidth}`,
          invalidateOnRefresh: true, anticipatePin: 1
        }
      });
    });
    return () => media.revert();
  }, { scope: container });

  return (
    <section id="craft" ref={container} className="craft-section" aria-labelledby="craft-title">
      <header className="craft-heading">
        <span className="eyebrow" dir="ltr">From material to memory</span>
        <h2 id="craft-title" className="font-fa">از چرم تا یک همراه</h2>
      </header>
      <div ref={track} className="craft-track" dir="ltr">
        {galleryImages.map((image, index) => (
          <figure key={image.src} className="craft-slide">
            <div className="craft-image">
              <ResponsiveImage src={image.src} alt={image.label} sizes="(min-width: 1024px) 75vw, 90vw" />
            </div>
            <figcaption>
              <span className="font-serif">0{index + 1} / {image.title}</span>
              <h3 className="font-fa" dir="rtl">{image.label}</h3>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
