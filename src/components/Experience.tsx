import { useI18n } from '../i18n';
import { SectionHead } from './SectionHead';
import { Tags } from './Tags';

export function Experience() {
  const { t } = useI18n();
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHead index="02" eyebrow={t.experience.eyebrow} title={t.experience.title} />
        <ol className="timeline">
          {t.experience.jobs.map((j) => (
            <li key={j.company} className="timeline__item spotlight" data-reveal>
              <div className="timeline__side">
                <p className="timeline__period mono">{j.period}</p>
                <p className="timeline__company">{j.company}</p>
              </div>
              <div className="timeline__main">
                <h3>{j.role}</h3>
                <ul className="bullets">
                  {j.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <Tags items={j.stack} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
