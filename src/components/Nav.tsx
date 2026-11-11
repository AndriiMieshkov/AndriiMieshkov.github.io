import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { profile, type Lang } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { Icon } from './Icon';

const SECTIONS = ['work', 'experience', 'skills', 'about', 'contact'] as const;

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const active = useActiveSection(SECTIONS as unknown as string[]);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const progressRef = useRef<HTMLDivElement>(null);

  // rAF-throttled; writes a transform on one element so scrolling never restyles the page.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  // Close the menu first, then scroll: jumping while the body is scroll-locked lands short.
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
      history.replaceState(null, '', `#${id}`);
    });
  };

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__bar container">
        <a href="#top" className="nav__logo" aria-label="Andrii Mieshkov — home" onClick={() => setOpen(false)}>
          <span className="nav__mark">AM</span>
          <span className="nav__name">Andrii Mieshkov</span>
        </a>

        <nav className="nav__links" aria-label="Main">
          {SECTIONS.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'is-active' : ''} onClick={() => setOpen(false)}>
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <div className="lang" role="group" aria-label={t.a11y.lang}>
            {(['en', 'pl'] as Lang[]).map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="btn btn--small btn--ghost nav__cv" href={profile.cv} download>
            <Icon name="download" size={16} />
            <span>CV</span>
          </a>
          <button
            type="button"
            className="nav__burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
      <div className="nav__progress" ref={progressRef} aria-hidden="true" />

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {SECTIONS.map((id, i) => (
            <a key={id} href={`#${id}`} style={{ '--i': i } as React.CSSProperties} onClick={(e) => goTo(e, id)}>
              <span className="mono">0{i + 1}</span>
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <a className="btn btn--primary" href={profile.cv} download>
          <Icon name="download" /> {t.nav.cv}
        </a>
      </div>
    </header>
  );
}
