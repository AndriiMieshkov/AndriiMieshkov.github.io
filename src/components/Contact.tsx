import { useState } from 'react';
import { profile } from '../data/content';
import { useI18n } from '../i18n';
import { Icon } from './Icon';

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__card" data-reveal>
          <p className="eyebrow">
            <span className="mono">07</span> {c.eyebrow}
          </p>
          <h2 className="contact__title">{c.title}</h2>
          <p className="contact__lead">{c.lead}</p>

          <div className="contact__email">
            <a href={`mailto:${profile.email}`} className="contact__mail">
              {profile.email}
            </a>
            <button type="button" className="btn btn--small btn--ghost" onClick={copy}>
              <Icon name={copied ? 'check' : 'copy'} size={16} />
              <span aria-live="polite">{copied ? c.copied : c.copy}</span>
            </button>
          </div>

          <ul className="contact__links">
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" /> {profile.linkedinLabel}
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <Icon name="github" /> {profile.githubLabel}
              </a>
            </li>
            <li>
              <span>
                <Icon name="pin" /> {c.location}
              </span>
            </li>
          </ul>

          <a className="btn btn--primary" href={profile.cv} download>
            <Icon name="download" /> {t.nav.cv} (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
