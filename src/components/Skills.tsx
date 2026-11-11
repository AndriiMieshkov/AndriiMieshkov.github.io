import { useI18n } from '../i18n';
import { SectionHead } from './SectionHead';

export function Skills() {
  const { t } = useI18n();
  const e = t.education;
  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHead index="03" eyebrow={t.skills.eyebrow} title={t.skills.title} lead={t.skills.intro} />
        <div className="bento">
          {t.skills.groups.map((g, i) => (
            <div
              key={g.title}
              className={`bento__cell spotlight ${g.wide ? 'bento__cell--wide' : ''}`}
              data-reveal
              style={{ '--d': i % 3 } as React.CSSProperties}
            >
              <h3>{g.title}</h3>
              <ul className="skill-list">
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              {g.note && <p className="bento__note">{g.note}</p>}
            </div>
          ))}
        </div>

        <div className="edu" id="education">
          <div className="edu__col" data-reveal>
            <p className="eyebrow">
              <span className="mono">04</span> {e.eyebrow}
            </p>
            <ul className="edu__list">
              {e.items.map((it) => (
                <li key={it.degree} className="spotlight">
                  <p className="mono edu__period">{it.period}</p>
                  <h3>{it.degree}</h3>
                  <p className="muted">{it.school}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="edu__col" data-reveal>
            <p className="eyebrow">
              <span className="mono">05</span> {e.languagesTitle}
            </p>
            <ul className="langs">
              {e.languages.map((l) => (
                <li key={l.name} className="spotlight">
                  <div>
                    <h3>{l.name}</h3>
                    <p className="muted">{l.level}</p>
                  </div>
                  <span className="meter" aria-hidden="true">
                    {Array.from({ length: 6 }, (_, i) => (
                      <i key={i} className={i < l.value ? 'on' : ''} />
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
