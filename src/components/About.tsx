import { useI18n } from '../i18n';
import { Icon } from './Icon';
import { SectionHead } from './SectionHead';

export function About() {
  const { t } = useI18n();
  const a = t.about;
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead index="06" eyebrow={a.eyebrow} title={a.title} />
        <div className="about">
          <div className="about__text" data-reveal>
            {a.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div data-reveal>
            <p className="about__label">{a.interestsTitle}</p>
            <ul className="interests">
              {a.interests.map((it) => (
                <li key={it.title} className="spotlight">
                  <span className="interests__icon">
                    <Icon name={it.icon} size={22} />
                  </span>
                  <div>
                    <h3>{it.title}</h3>
                    <p>{it.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
