import { useState } from 'react';
import images from '../data/images.generated.json';

type ImageMeta = { widths: number[]; width: number; height: number; placeholder: string };
const meta = images as Record<string, ImageMeta>;

interface Props {
  id: string;
  alt: string;
  sizes: string;
  className?: string;
  eager?: boolean;
}

export const imgSrc = (id: string, w: number) => `./img/${id}-${w}.webp`;
export const largestSrc = (id: string) => imgSrc(id, meta[id].widths.at(-1)!);
export const imageMeta = (id: string) => meta[id];

/** Responsive WebP with intrinsic size (no layout shift) and a blurred inline placeholder. */
export function Img({ id, alt, sizes, className = '', eager = false }: Props) {
  const m = meta[id];
  const [loaded, setLoaded] = useState(false);
  return (
    <span
      className={`img ${loaded ? 'is-loaded' : ''} ${className}`}
      style={{ aspectRatio: `${m.width} / ${m.height}`, backgroundImage: `url(${m.placeholder})` }}
    >
      <img
        src={imgSrc(id, m.widths[0])}
        srcSet={m.widths.map((w) => `${imgSrc(id, w)} ${w}w`).join(', ')}
        sizes={sizes}
        width={m.width}
        height={m.height}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete && el.naturalWidth) setLoaded(true);
        }}
      />
    </span>
  );
}
