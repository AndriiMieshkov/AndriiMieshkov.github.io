import { useEffect } from 'react';

/** Feeds pointer position into CSS vars so `.spotlight` cards can draw a glow under the cursor. */
export function useSpotlight() {
  useEffect(() => {
    if (!matchMedia('(hover: hover)').matches) return;
    let frame = 0;
    let last: PointerEvent | null = null;
    const apply = () => {
      frame = 0;
      const card = (last?.target as Element | null)?.closest<HTMLElement>('.spotlight');
      if (!card || !last) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${last.clientX - r.left}px`);
      card.style.setProperty('--my', `${last.clientY - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
}
