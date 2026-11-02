import type { ImgHTMLAttributes } from 'react';
import images from '../data/images.json';

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string };

export default function ResponsiveImage({ src, alt, sizes = '100vw', loading = 'lazy', ...props }: Props) {
  const image = images[src as keyof typeof images];
  return <img
    width={image?.width}
    height={image?.height}
    decoding="async"
    {...props}
    src={image?.variants[1].src ?? src}
    srcSet={image?.variants.map(variant => `${variant.src} ${variant.width}w`).join(', ')}
    sizes={sizes}
    loading={loading}
    alt={alt}
  />;
}
