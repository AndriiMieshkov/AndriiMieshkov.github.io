import { useI18n } from '../i18n';
import type { Highlight } from '../data/content';
import { Gallery } from './Gallery';
import { Playable } from './Playable';
import { SectionHead } from './SectionHead';
import { Tags } from './Tags';

function Highlights({ items, compact = false }: { items: Highlight[]; compact?: boolean }) {
  return (
    <ul className={`highlights ${compact ? 'highlights--compact' : ''}`}>
      {items.map((h, i) => (
        <li key={h.title} className="spotlight" data-reveal={compact ? undefined : ''} style={{ '--d': i % 4 } as React.CSSProperties}>
          <h4>{h.title}</h4>
          <p>{h.text}</p>
        </li>
      ))}
    </ul>
  );
}

function Stack({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="stack">
      <p className="stack__label">{label}</p>
      <Tags items={items} label={label} />
    </div>
  );
}

export function Work() {
  const { t } = useI18n();
  const v = t.vien;
  const d = t.duel;
  return (
    <section className="section" id="work">
      <div className="container">
        <SectionHead index="01" eyebrow={t.work.eyebrow} title={t.work.title} lead={t.work.lead} />

        <article className="case" id="vien" aria-labelledby="vien-title">
          <header className="case__head" data-reveal>
            <span className="case__tag">{v.tag}</span>
            <h3 id="vien-title">{v.title}</h3>
            <p className="case__meta mono">{v.meta}</p>
          </header>
          <div className="case__body">
            <div className="case__media" data-reveal>
              <Gallery desktop={v.desktop} mobile={v.mobile} />
            </div>
            <div className="case__text" data-reveal>
              <p className="case__summary">{v.summary}</p>
              <Stack label={v.stackLabel} items={v.stack} />
            </div>
          </div>
          <Highlights items={v.highlights} />

          <aside className="also" data-reveal>
            <div className="also__head">
              <h4>{v.other.title}</h4>
              <p>{v.other.lead}</p>
            </div>
            <ul className="also__list">
              {v.other.items.map((it) => (
                <li key={it.title}>
                  <strong>{it.title}</strong>
                  <span>{it.text}</span>
                </li>
              ))}
            </ul>
            <Tags items={v.other.stack} />
          </aside>
        </article>

        <article className="case case--duel" id="card-duel" aria-labelledby="duel-title">
          <div className="case__body case__body--reverse">
            <header className="case__head" data-reveal>
              <span className="case__tag case__tag--alt">{d.tag}</span>
              <h3 id="duel-title">{d.title}</h3>
              <p className="case__meta mono">{d.meta}</p>
              <p className="case__context">{d.context}</p>
              <ol className="process">
                {d.process.map((s, i) => (
                  <li key={s.title}>
                    <span className="process__num mono">0{i + 1}</span>
                    <strong>{s.title}</strong>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ol>
            </header>
            <div className="case__media case__media--game" data-reveal>
              <Playable />
            </div>
            <div className="case__text" data-reveal>
              <p className="case__summary">{d.summary}</p>
              <Stack label={d.stackLabel} items={d.stack} />
              <Highlights items={d.highlights} compact />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
