import { useCallback, useEffect, useRef, useState } from 'react';
import type { Shot } from '../data/content';
import { useI18n } from '../i18n';
import { Icon } from './Icon';
import { Img, largestSrc } from './Img';

interface Props {
  desktop: Shot[];
  mobile: Shot[];
}

type Mode = 'desktop' | 'mobile';

export function Gallery({ desktop, mobile }: Props) {
  const { t } = useI18n();
  const [mode, setMode] = useState<Mode>('desktop');
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const shots = mode === 'desktop' ? desktop : mobile;
  const shot = shots[index];

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + shots.length) % shots.length), [shots.length]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (zoomed && !d.open) d.showModal();
    if (!zoomed && d.open) d.close();
  }, [zoomed]);

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomed, go]);

  // Basic swipe support on the stage.
  const touchX = useRef<number | null>(null);
  const swipe = {
    onTouchStart: (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX),
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      touchX.current = null;
    },
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setIndex(0);
  };

  return (
    <div className={`gallery gallery--${mode}`}>
      <div className="gallery__bar">
        <div className="segmented" role="tablist" aria-label="Screenshots">
          {(['desktop', 'mobile'] as Mode[]).map((m) => (
            <button key={m} role="tab" type="button" aria-selected={mode === m} onClick={() => switchMode(m)}>
              {m === 'desktop' ? t.vien.desktopTab : t.vien.mobileTab}
            </button>
          ))}
        </div>
        <p className="gallery__counter mono" aria-live="polite">
          {String(index + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}
        </p>
      </div>

      <div className="gallery__stage" {...swipe}>
        <button type="button" className="gallery__arrow gallery__arrow--prev" onClick={() => go(-1)} aria-label={t.a11y.prev}>
          <Icon name="chevL" />
        </button>

        <button type="button" className="gallery__frame" onClick={() => setZoomed(true)} aria-label={`${shot.caption} — ${t.vien.open}`}>
          {mode === 'desktop' ? (
            <span className="browser">
              <span className="browser__bar" aria-hidden="true">
                <i /><i /><i />
                <span className="browser__url mono">cabinet.vien.health</span>
              </span>
              <Img key={shot.id} id={shot.id} alt={shot.caption} sizes="(max-width: 1100px) 92vw, 760px" />
            </span>
          ) : (
            <span className="phone">
              <Img key={shot.id} id={shot.id} alt={shot.caption} sizes="(max-width: 600px) 64vw, 300px" />
            </span>
          )}
          <span className="gallery__zoom" aria-hidden="true">
            <Icon name="expand" size={16} />
          </span>
        </button>

        <button type="button" className="gallery__arrow gallery__arrow--next" onClick={() => go(1)} aria-label={t.a11y.next}>
          <Icon name="chevR" />
        </button>
      </div>

      <p className="gallery__caption">{shot.caption}</p>

      <div className="gallery__thumbs" role="list">
        {shots.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="listitem"
            className={i === index ? 'is-active' : ''}
            aria-current={i === index}
            aria-label={s.caption}
            onClick={() => setIndex(i)}
          >
            <Img id={s.id} alt="" sizes="120px" />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        onClose={() => setZoomed(false)}
        onClick={(e) => e.target === e.currentTarget && setZoomed(false)}
      >
        {zoomed && (
          <figure className={`lightbox__figure lightbox__figure--${mode}`} {...swipe}>
            <img src={largestSrc(shot.id)} alt={shot.caption} />
            <figcaption>{shot.caption}</figcaption>
          </figure>
        )}
        <button type="button" className="icon-btn lightbox__close" onClick={() => setZoomed(false)} aria-label={t.a11y.close}>
          <Icon name="close" />
        </button>
        <button type="button" className="icon-btn lightbox__nav lightbox__nav--prev" onClick={() => go(-1)} aria-label={t.a11y.prev}>
          <Icon name="chevL" />
        </button>
        <button type="button" className="icon-btn lightbox__nav lightbox__nav--next" onClick={() => go(1)} aria-label={t.a11y.next}>
          <Icon name="chevR" />
        </button>
      </dialog>
    </div>
  );
}
