import { useI18n } from './i18n';
import { useReveal } from './hooks/useReveal';
import { useSpotlight } from './hooks/useSpotlight';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Work } from './components/Work';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  const { lang, t } = useI18n();
  useReveal([lang]);
  useSpotlight();
  return (
    <>
      <a className="skip" href="#work">{t.a11y.skip}</a>
      <div className="backdrop" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
