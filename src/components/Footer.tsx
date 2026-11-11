import { profile } from '../data/content';
import { useI18n } from '../i18n';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} Andrii Mieshkov. {t.footer.built}
        </p>
        <a href={profile.github} target="_blank" rel="noreferrer">
          {t.footer.source} ↗
        </a>
      </div>
    </footer>
  );
}
