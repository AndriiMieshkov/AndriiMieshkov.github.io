import { useI18n } from '../i18n';
import { profile } from '../data/content';
import { Icon } from './Icon';
import { Img } from './Img';

const MARQUEE = [
  'TypeScript', 'Vue 3', 'React', 'Next.js', 'Node.js', 'Fastify', 'NestJS', 'PostgreSQL',
  'Redis', 'GraphQL', 'PixiJS', 'WebGL', 'Gemini API', 'Vite', 'Webpack', 'Figma',
];

export function Hero() {
  const { t } = useI18n();
  const h = t.hero;
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__meta" data-reveal>
            <span className="status">
              <span className="status__dot" aria-hidden="true" />
              {h.status}
            </span>
            <span className="hero__loc">
              <Icon name="pin" size={15} /> {h.location}
            </span>
          </p>

          <h1 className="hero__title" data-reveal style={{ '--d': 1 } as React.CSSProperties}>
            {h.titleA}
            <span className="gradient-text">{h.titleAccent}</span>
            {h.titleB}
          </h1>

          <p className="hero__lead" data-reveal style={{ '--d': 2 } as React.CSSProperties}>
            <strong>Andrii Mieshkov</strong> — {h.lead}
          </p>

          <div className="hero__cta" data-reveal style={{ '--d': 3 } as React.CSSProperties}>
            <a className="btn btn--primary" href="#work">
              {h.ctaWork} <Icon name="arrow" />
            </a>
            <a className="btn btn--ghost" href={profile.cv} download>
              <Icon name="download" /> {h.ctaCv}
            </a>
            <div className="hero__social">
              <a className="icon-btn" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Icon name="github" size={20} />
              </a>
              <a className="icon-btn" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Icon name="linkedin" size={20} />
              </a>
            </div>
          </div>

          <dl className="facts" data-reveal style={{ '--d': 4 } as React.CSSProperties}>
            {h.facts.map((f) => (
              <div key={f.label} className="facts__item">
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <a href="#vien" tabIndex={-1} aria-label="VIEN" className="hero__device hero__device--a">
            <Img id="mobile-02-home-documents-program" alt="" sizes="(max-width: 900px) 40vw, 240px" eager />
          </a>
          <a href="#card-duel" tabIndex={-1} aria-label="Card Duel" className="hero__device hero__device--b">
            <Img id="card-duel-poster" alt="" sizes="(max-width: 900px) 40vw, 240px" eager />
          </a>
          <div className="hero__chip hero__chip--1 mono">&lt;Vue /&gt;</div>
          <div className="hero__chip hero__chip--2 mono">60 fps</div>
          <div className="hero__chip hero__chip--3 mono">SELECT * FROM results</div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE].map((s, i) => (
            <span key={i}>{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
