export type Lang = 'en' | 'pl';

export const profile = {
  name: 'Andrii Mieshkov',
  email: 'andrii.mieshkov@gmail.com',
  github: 'https://github.com/AndriiMieshkov',
  githubLabel: 'github.com/AndriiMieshkov',
  linkedin: 'https://www.linkedin.com/in/andrii-mieshkov',
  linkedinLabel: 'linkedin.com/in/andrii-mieshkov',
  cv: './cv/Andrii_Mieshkov_CV.pdf',
  game: './play/card-duel/index.html',
} as const;

export interface Shot {
  id: string; // key in images.generated.json
  caption: string;
}

export interface Highlight {
  title: string;
  text: string;
}

export interface Job {
  role: string;
  company: string;
  period: string;
  stack: string[];
  bullets: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
  note?: string;
  wide?: boolean;
}

export type InterestIcon = 'gamepad' | 'paw';

export interface Content {
  nav: { work: string; experience: string; skills: string; about: string; contact: string; cv: string; menu: string };
  hero: {
    location: string;
    status: string;
    titleA: string;
    titleAccent: string;
    titleB: string;
    lead: string;
    ctaWork: string;
    ctaCv: string;
    facts: { value: string; label: string }[];
  };
  work: { eyebrow: string; title: string; lead: string };
  vien: {
    tag: string;
    title: string;
    meta: string;
    summary: string;
    stackLabel: string;
    stack: string[];
    highlights: Highlight[];
    other: { title: string; lead: string; items: Highlight[]; stack: string[] };
    desktopTab: string;
    mobileTab: string;
    desktop: Shot[];
    mobile: Shot[];
    open: string;
  };
  duel: {
    tag: string;
    title: string;
    meta: string;
    context: string;
    process: Highlight[];
    summary: string;
    stackLabel: string;
    stack: string[];
    highlights: Highlight[];
    play: string;
    playHint: string;
    restart: string;
    fullscreen: string;
    soundOn: string;
    soundOff: string;
    loading: string;
    note: string;
    error: string;
  };
  experience: { eyebrow: string; title: string; jobs: Job[] };
  skills: { eyebrow: string; title: string; intro: string; groups: SkillGroup[] };
  education: {
    eyebrow: string;
    items: { degree: string; school: string; period: string }[];
    languagesTitle: string;
    languages: { name: string; level: string; value: number }[];
  };
  about: {
    eyebrow: string;
    title: string;
    text: string[];
    interestsTitle: string;
    interests: { icon: InterestIcon; title: string; text: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    copy: string;
    copied: string;
    location: string;
  };
  footer: { built: string; source: string };
  a11y: { close: string; prev: string; next: string; lang: string; skip: string };
}

// Stack of the VIEN cabinet shown in the screenshots (from its package.json files).
const vienStack = [
  'Vue 3', 'Pinia', 'Vue Router', 'vue-i18n', 'Vite', 'JavaScript',
  'Node.js', 'Fastify', 'PostgreSQL', 'Redis', 'JWT', 'S3-compatible storage',
];
// Used on other VIEN projects that are not shown on this page.
const vienOtherStack = ['Next.js', 'React', 'Gemini API'];
const duelStack = ['JavaScript ES6+', 'PixiJS', 'WebGL / Canvas', 'OOP', 'Webpack', 'Babel', 'Tween.js', 'Spine', 'Howler.js'];

export const content: Record<Lang, Content> = {
  en: {
    nav: { work: 'Work', experience: 'Experience', skills: 'Skills', about: 'About', contact: 'Contact', cv: 'Download CV', menu: 'Menu' },
    hero: {
      location: 'Kraków, Poland',
      status: 'Open to new opportunities',
      titleA: 'I build ',
      titleAccent: 'fast, polished interfaces',
      titleB: ' — and the backends behind them.',
      lead:
        'Software Engineer with 1+ year of commercial experience shipping client dashboards, full-stack web apps and HTML5 playable ads. Vue, React / Next.js and TypeScript on the front; Node.js and PostgreSQL on the back.',
      ctaWork: 'See my work',
      ctaCv: 'Download CV',
      facts: [
        { value: '1+ yr', label: 'commercial experience' },
        { value: 'Full-stack', label: 'from DB schema to UI' },
        { value: 'C1 · B2', label: 'English · Polish' },
        { value: 'MSc', label: 'Software Engineering, 2026' },
      ],
    },
    work: {
      eyebrow: 'Selected work',
      title: 'Examples of what I build',
      lead: 'One project from each company: a secure, data-heavy client cabinet and a mobile game that has to fit inside an ad.',
    },
    vien: {
      tag: 'Full-stack web app',
      title: 'VIEN — Client Personal Account',
      meta: 'VIEN | Vitality & Energy · 2025 – 2026',
      summary:
        'A personal cabinet for a health-optimization program. Clients sign in without a password, follow their program step by step, read lab results against reference ranges, track trends over time, tick off their daily supplement plan and get documents from their coordinator — on desktop and mobile.',
      stackLabel: 'Stack of this project',
      stack: vienStack,
      highlights: [
        {
          title: 'Passwordless auth',
          text: 'Email magic link, WhatsApp OTP and Telegram Web App login. JWT in httpOnly cookies, Redis-backed sessions and rate limiting.',
        },
        {
          title: 'Data people can read',
          text: 'Lab results grouped by panel, out-of-range flags, date navigation and per-marker trend charts — so clients understand results without a specialist.',
        },
        {
          title: 'API & data layer',
          text: 'Fastify 5 REST API on Node.js. PostgreSQL with a normalized schema and JSON aggregation queries, S3-compatible object storage for documents, plus integration with external data storages.',
        },
        {
          title: 'Built for every screen',
          text: 'Mobile-first responsive layouts, EN / UK localisation with vue-i18n and product analytics events.',
        },
      ],
      other: {
        title: 'Also at VIEN — other projects, not shown here',
        lead: 'Besides this cabinet I worked on other VIEN client projects with a different stack:',
        items: [
          { title: 'Client websites', text: 'Websites built with Next.js and React.' },
          { title: 'AI-powered features', text: 'Integrations with the Gemini API.' },
          { title: 'Admin panel', text: 'Staff tool to manage users, analysis data, content and access roles.' },
        ],
        stack: vienOtherStack,
      },
      desktopTab: 'Desktop',
      mobileTab: 'Mobile',
      desktop: [
        { id: 'desktop-01-login', caption: 'Sign-in — email, WhatsApp or Telegram' },
        { id: 'desktop-02-general-info-program-progress', caption: 'Overview — profile, program progress and recent documents' },
        { id: 'desktop-03-lab-results-latest', caption: 'Lab results — summary of markers in range and needing attention' },
        { id: 'desktop-04-lab-results-by-date', caption: 'Lab results by date, grouped by panel' },
        { id: 'desktop-05-lab-result-trend-chart', caption: 'Marker trend chart against its reference range' },
        { id: 'desktop-06-supplement-plan-summary', caption: 'Supplement plan summary' },
        { id: 'desktop-07-daily-supplement-checklist', caption: 'Daily supplement checklist by time of day' },
      ],
      mobile: [
        { id: 'mobile-01-login', caption: 'Sign-in' },
        { id: 'mobile-02-home-documents-program', caption: 'Home' },
        { id: 'mobile-03-lab-results-by-date', caption: 'Lab results' },
        { id: 'mobile-04-lab-result-trend-chart', caption: 'Trend chart' },
        { id: 'mobile-05-supplement-plan', caption: 'Supplement plan' },
        { id: 'mobile-06-daily-supplement-checklist', caption: 'Daily checklist' },
        { id: 'mobile-07-documents', caption: 'Documents' },
      ],
      open: 'Open full size',
    },
    duel: {
      tag: 'HTML5 playable ad',
      title: 'Card Duel',
      meta: 'PlayToMax · 2026 · one example of my client work',
      context:
        'At PlayToMax, game studios order playable ads to promote their games. I built them in a team: a game designer writes the spec, an artist prepares the ad mockups and assets, a project manager keeps it on track — and I turn it into a working ad.',
      process: [
        { title: 'Spec', text: 'Our game designer writes the spec for the ad' },
        { title: 'Art', text: 'Our artist makes mockups and prepares assets from the client’s materials or asset pack' },
        { title: 'Build', text: 'I implement gameplay, animations and the end card' },
        { title: 'Ship', text: 'QA rounds, then builds for every ad network' },
      ],
      summary:
        'Race a bot to complete card combos — “3 of a kind”, “4 in sequence”, “3 odd” — by tapping cards on moving conveyors.',
      stackLabel: 'Stack',
      stack: duelStack,
      highlights: [
        {
          title: 'Clean game architecture',
          text: 'OOP design with a pure rules engine separated from rendering — one instance for the player, one for the bot.',
        },
        {
          title: 'Bot opponent & game feel',
          text: 'Tunable bot AI, tutorial hand, idle hints, card-flight tweens, win / lose flow and an end card with a store CTA.',
        },
        {
          title: 'One codebase, many targets',
          text: '7 ad networks × 4 variants (full, short, redirect, auto-redirect) from a single Webpack pipeline, portrait and landscape layouts.',
        },
        {
          title: 'Mobile performance',
          text: 'Builds tuned for size and frame rate on low-end phones and strict ad-platform limits, with a Canvas fallback when WebGL is unavailable.',
        },
      ],
      play: 'Tap to play',
      playHint: 'Loads a 3.6 MB game build',
      restart: 'Restart',
      fullscreen: 'Fullscreen',
      soundOn: 'Sound on',
      soundOff: 'Sound off',
      loading: 'Loading game…',
      note: 'Pauses automatically when you scroll away',
      error: 'The game could not start in this browser. Try “Fullscreen” or another browser.',
    },
    experience: {
      eyebrow: 'Experience',
      title: 'Where I’ve worked',
      jobs: [
        {
          role: 'Junior JavaScript Developer',
          company: 'PlayToMax',
          period: 'Mar 2026 – Oct 2026',
          stack: ['JavaScript', 'PixiJS', 'Webpack', 'HTML5'],
          bullets: [
            'Developed HTML5 playable ads and minigames in JavaScript for game studios’ mobile ad campaigns, working from client briefs, mockups and assets.',
            'Designed game rules and mechanics with an OOP architecture that keeps code clean and reusable.',
            'Optimised builds for performance and compatibility on mobile devices and ad platforms.',
            'Sole developer in a team with an artist and a PM, owning all technical implementation and asset integration.',
          ],
        },
        {
          role: 'Junior Software Engineer',
          company: 'VIEN | Vitality & Energy',
          period: 'Sep 2025 – May 2026',
          stack: ['Vue 3', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Gemini API'],
          bullets: [
            'Built websites and web applications for clients across the full cycle — requirements, development, testing and release.',
            'Designed backend logic, APIs and databases for authentication, user data and content management.',
            'Built client dashboards where users securely view analysis results, track changes over time and access their data in one place.',
            'Implemented charts and structured result views so clients understand their health metrics without specialist help.',
            'Created an admin panel for staff to manage users, analysis data, content and access roles.',
            'Debugged and tested my own code across frontend and backend before each release.',
            'Worked with the Gemini API, Vue and Next.js; collaborated with managers and designers to deliver features iteratively.',
          ],
        },
      ],
    },
    skills: {
      eyebrow: 'Skills',
      title: 'Toolbox',
      intro:
        'I’m a software engineer first: I start from the problem, pick the right tool and learn new languages and technologies quickly — the engineering methods carry over to any stack. Besides commercial work I build experience through freelance, university and personal projects.',
      groups: [
        { title: 'Frontend', items: ['TypeScript', 'JavaScript (ES6+)', 'Vue 3', 'React', 'Next.js', 'Pinia', 'HTML5', 'CSS3', 'Vite'], wide: true },
        { title: 'Backend', items: ['Node.js', 'NestJS', 'Fastify', 'Express.js', 'GraphQL (Apollo)', 'REST APIs'] },
        { title: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'S3 object storage'] },
        { title: 'Games & graphics', items: ['PixiJS', 'Three.js', 'WebGL', 'HTML5 games', 'Playable ads', 'Tween.js', 'Spine'] },
        { title: 'AI', items: ['Gemini API', 'Claude Code', 'Codex'] },
        { title: 'Testing & debugging', items: ['Debugging', 'Testing my own code', 'Unit tests', 'QA rounds'] },
        {
          title: 'Also used (non-commercial)',
          items: ['Python — data analysis', 'Java — backend', 'C# — game development'],
          note: 'Freelance, university and personal projects.',
          wide: true,
        },
        {
          title: 'Practices & tools',
          items: ['OOP', 'Auth & JWT', 'i18n', 'Responsive UI', 'Telegram / WhatsApp integrations', 'Git', 'Figma', 'Webpack', 'ESLint / Prettier'],
          wide: true,
        },
      ],
    },
    education: {
      eyebrow: 'Education',
      items: [
        {
          degree: 'Master’s Degree, Software Engineering',
          school: 'Igor Sikorsky Kyiv Polytechnic Institute (FICE)',
          period: 'Expected Dec 2026',
        },
        {
          degree: 'Bachelor’s Degree, Software Engineering',
          school: 'Igor Sikorsky Kyiv Polytechnic Institute (FICE)',
          period: 'Jun 2025',
        },
      ],
      languagesTitle: 'Languages',
      languages: [
        { name: 'English', level: 'C1 · Advanced', value: 5 },
        { name: 'Polish', level: 'B2 · Upper-intermediate', value: 4 },
      ],
    },
    about: {
      eyebrow: 'About me',
      title: 'Beyond the code',
      text: [
        'I like building things people actually enjoy using — whether it is a dashboard that makes medical data understandable or a small game that has to grab attention in a few seconds.',
      ],
      interestsTitle: 'Interests & hobbies',
      interests: [
        {
          icon: 'gamepad',
          title: 'Video games',
          text: 'Playing and analysing games across genres, with a particular interest in game design, mechanics and storytelling.',
        },
        {
          icon: 'paw',
          title: 'Animals & nature',
          text: 'Reading about wildlife, animal behaviour and nature.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let’s build something good.',
      lead: 'Looking for a Software Engineer, frontend or full-stack role in Kraków or remote. The fastest way to reach me is email.',
      copy: 'Copy',
      copied: 'Copied!',
      location: 'Kraków, Poland',
    },
    footer: { built: 'Designed & built by Andrii Mieshkov with React, TypeScript and Vite.', source: 'GitHub' },
    a11y: { close: 'Close', prev: 'Previous screenshot', next: 'Next screenshot', lang: 'Language', skip: 'Skip to content' },
  },

  pl: {
    nav: { work: 'Projekty', experience: 'Doświadczenie', skills: 'Umiejętności', about: 'O mnie', contact: 'Kontakt', cv: 'Pobierz CV', menu: 'Menu' },
    hero: {
      location: 'Kraków',
      status: 'Otwarty na nowe oferty',
      titleA: 'Tworzę ',
      titleAccent: 'szybkie, dopracowane interfejsy',
      titleB: ' — i backend, który za nimi stoi.',
      lead:
        'Software Engineer z ponad rocznym doświadczeniem komercyjnym: panele klienta, aplikacje full-stack i grywalne reklamy HTML5. Vue, React / Next.js i TypeScript na froncie; Node.js i PostgreSQL na backendzie.',
      ctaWork: 'Zobacz projekty',
      ctaCv: 'Pobierz CV',
      facts: [
        { value: '1+ rok', label: 'doświadczenia komercyjnego' },
        { value: 'Full-stack', label: 'od schematu bazy po UI' },
        { value: 'C1 · B2', label: 'angielski · polski' },
        { value: 'Mgr', label: 'Inżynieria oprogramowania, 2026' },
      ],
    },
    work: {
      eyebrow: 'Wybrane projekty',
      title: 'Przykłady mojej pracy',
      lead: 'Po jednym projekcie z każdej firmy: bezpieczny panel klienta z dużą ilością danych oraz mobilna gra, która musi zmieścić się w reklamie.',
    },
    vien: {
      tag: 'Aplikacja full-stack',
      title: 'VIEN — Panel klienta',
      meta: 'VIEN | Vitality & Energy · 2025 – 2026',
      summary:
        'Panel osobisty dla programu optymalizacji zdrowia. Klienci logują się bez hasła, śledzą postęp programu, czytają wyniki badań na tle norm, obserwują trendy, odhaczają codzienny plan suplementacji i otrzymują dokumenty od koordynatora — na desktopie i telefonie.',
      stackLabel: 'Stack tego projektu',
      stack: vienStack,
      highlights: [
        {
          title: 'Logowanie bez hasła',
          text: 'Magic link e-mail, kod OTP przez WhatsApp i logowanie przez Telegram Web App. JWT w ciasteczkach httpOnly, sesje i rate limiting w Redis.',
        },
        {
          title: 'Czytelne dane',
          text: 'Wyniki badań pogrupowane według paneli, oznaczenia wartości poza normą, nawigacja po datach i wykresy trendów — zrozumiałe bez specjalisty.',
        },
        {
          title: 'API i warstwa danych',
          text: 'REST API na Fastify 5 (Node.js). PostgreSQL ze znormalizowanym schematem i zapytaniami agregującymi JSON, magazyn obiektów zgodny z S3 na dokumenty oraz integracja z zewnętrznymi źródłami danych.',
        },
        {
          title: 'Na każdy ekran',
          text: 'Responsywne layouty mobile-first, lokalizacja EN / UK z vue-i18n i zdarzenia analityczne produktu.',
        },
      ],
      other: {
        title: 'Także w VIEN — inne projekty, niepokazane tutaj',
        lead: 'Poza tym panelem pracowałem przy innych projektach klientów VIEN, w innym stacku:',
        items: [
          { title: 'Strony dla klientów', text: 'Strony zbudowane w Next.js i React.' },
          { title: 'Funkcje oparte na AI', text: 'Integracje z Gemini API.' },
          { title: 'Panel administracyjny', text: 'Narzędzie dla zespołu do zarządzania użytkownikami, wynikami, treściami i rolami dostępu.' },
        ],
        stack: vienOtherStack,
      },
      desktopTab: 'Desktop',
      mobileTab: 'Mobile',
      desktop: [
        { id: 'desktop-01-login', caption: 'Logowanie — e-mail, WhatsApp lub Telegram' },
        { id: 'desktop-02-general-info-program-progress', caption: 'Przegląd — profil, postęp programu i ostatnie dokumenty' },
        { id: 'desktop-03-lab-results-latest', caption: 'Wyniki badań — podsumowanie wartości w normie i wymagających uwagi' },
        { id: 'desktop-04-lab-results-by-date', caption: 'Wyniki według daty, pogrupowane w panele' },
        { id: 'desktop-05-lab-result-trend-chart', caption: 'Wykres trendu na tle zakresu referencyjnego' },
        { id: 'desktop-06-supplement-plan-summary', caption: 'Podsumowanie planu suplementacji' },
        { id: 'desktop-07-daily-supplement-checklist', caption: 'Codzienna lista suplementów według pory dnia' },
      ],
      mobile: [
        { id: 'mobile-01-login', caption: 'Logowanie' },
        { id: 'mobile-02-home-documents-program', caption: 'Start' },
        { id: 'mobile-03-lab-results-by-date', caption: 'Wyniki badań' },
        { id: 'mobile-04-lab-result-trend-chart', caption: 'Wykres trendu' },
        { id: 'mobile-05-supplement-plan', caption: 'Plan suplementacji' },
        { id: 'mobile-06-daily-supplement-checklist', caption: 'Lista dzienna' },
        { id: 'mobile-07-documents', caption: 'Dokumenty' },
      ],
      open: 'Otwórz w pełnym rozmiarze',
    },
    duel: {
      tag: 'Grywalna reklama HTML5',
      title: 'Card Duel',
      meta: 'PlayToMax · 2026 · jeden z przykładów pracy dla klientów',
      context:
        'W PlayToMax studia gier zamawiają grywalne reklamy promujące ich gry. Tworzyłem je w zespole: game designer pisze specyfikację, grafik przygotowuje makiety i assety reklamy, project manager pilnuje terminów — a ja zamieniam to w działającą reklamę.',
      process: [
        { title: 'Specyfikacja', text: 'Nasz game designer pisze specyfikację reklamy' },
        { title: 'Grafika', text: 'Nasz grafik tworzy makiety i przygotowuje assety z materiałów lub paczki assetów klienta' },
        { title: 'Build', text: 'Implementuję rozgrywkę, animacje i end card' },
        { title: 'Wydanie', text: 'Rundy QA, potem buildy dla każdej sieci reklamowej' },
      ],
      summary:
        'Ścigaj się z botem w układaniu kombinacji kart — „3 jednakowe”, „4 po kolei”, „3 nieparzyste” — klikając karty na ruchomych taśmach.',
      stackLabel: 'Stack',
      stack: duelStack,
      highlights: [
        {
          title: 'Czysta architektura gry',
          text: 'Projekt obiektowy z czystym silnikiem reguł oddzielonym od renderowania — osobna instancja dla gracza i dla bota.',
        },
        {
          title: 'Bot i „game feel”',
          text: 'Konfigurowalne AI bota, samouczek, podpowiedzi, animacje lotu kart, ekran wygranej / przegranej i end card z CTA do sklepu.',
        },
        {
          title: 'Jeden kod, wiele platform',
          text: '7 sieci reklamowych × 4 warianty (pełny, krótki, redirect, auto-redirect) z jednego pipeline’u Webpack, layouty pion / poziom.',
        },
        {
          title: 'Wydajność na mobile',
          text: 'Buildy zoptymalizowane pod rozmiar i płynność na słabszych telefonach oraz limity platform reklamowych, z fallbackiem Canvas, gdy WebGL jest niedostępny.',
        },
      ],
      play: 'Kliknij, aby zagrać',
      playHint: 'Ładuje build gry 3,6 MB',
      restart: 'Od nowa',
      fullscreen: 'Pełny ekran',
      soundOn: 'Dźwięk wł.',
      soundOff: 'Dźwięk wył.',
      loading: 'Ładowanie gry…',
      note: 'Pauzuje się automatycznie po przewinięciu strony',
      error: 'Gra nie mogła się uruchomić w tej przeglądarce. Spróbuj „Pełny ekran” lub innej przeglądarki.',
    },
    experience: {
      eyebrow: 'Doświadczenie',
      title: 'Gdzie pracowałem',
      jobs: [
        {
          role: 'Junior JavaScript Developer',
          company: 'PlayToMax',
          period: 'mar 2026 – paź 2026',
          stack: ['JavaScript', 'PixiJS', 'Webpack', 'HTML5'],
          bullets: [
            'Tworzenie grywalnych reklam HTML5 i minigier w JavaScript dla mobilnych kampanii studiów gier — na podstawie briefów klientów, makiet i assetów.',
            'Projektowanie zasad i mechanik gry w architekturze obiektowej — czysty kod gotowy do ponownego użycia.',
            'Optymalizacja buildów pod wydajność i kompatybilność z urządzeniami mobilnymi i platformami reklamowymi.',
            'Jedyny developer w zespole z grafikiem i PM-em — pełna odpowiedzialność za implementację i integrację assetów.',
          ],
        },
        {
          role: 'Junior Software Engineer',
          company: 'VIEN | Vitality & Energy',
          period: 'wrz 2025 – maj 2026',
          stack: ['Vue 3', 'Next.js', 'React', 'Node.js', 'PostgreSQL', 'Gemini API'],
          bullets: [
            'Strony i aplikacje webowe dla klientów w pełnym cyklu — od wymagań, przez development i testy, po wdrożenie.',
            'Projektowanie logiki backendu, API i baz danych dla uwierzytelniania, danych użytkowników i zarządzania treścią.',
            'Panele klienta, w których użytkownicy bezpiecznie przeglądają wyniki, śledzą zmiany w czasie i mają dostęp do swoich danych w jednym miejscu.',
            'Wykresy i ustrukturyzowane widoki wyników, dzięki którym klienci rozumieją swoje parametry bez pomocy specjalisty.',
            'Panel administracyjny do zarządzania użytkownikami, wynikami, treściami i rolami dostępu.',
            'Debugowanie i testowanie własnego kodu (frontend i backend) przed każdym wydaniem.',
            'Praca z Gemini API, Vue i Next.js; iteracyjne dostarczanie funkcji we współpracy z managerami i designerami.',
          ],
        },
      ],
    },
    skills: {
      eyebrow: 'Umiejętności',
      title: 'Narzędzia',
      intro:
        'Jestem przede wszystkim inżynierem oprogramowania: zaczynam od problemu, dobieram właściwe narzędzie i szybko uczę się nowych języków i technologii — metody inżynierskie sprawdzają się w każdym stacku. Poza pracą komercyjną zdobywam doświadczenie w projektach freelance, na studiach i we własnych projektach.',
      groups: [
        { title: 'Frontend', items: ['TypeScript', 'JavaScript (ES6+)', 'Vue 3', 'React', 'Next.js', 'Pinia', 'HTML5', 'CSS3', 'Vite'], wide: true },
        { title: 'Backend', items: ['Node.js', 'NestJS', 'Fastify', 'Express.js', 'GraphQL (Apollo)', 'REST API'] },
        { title: 'Dane', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Magazyn obiektów S3'] },
        { title: 'Gry i grafika', items: ['PixiJS', 'Three.js', 'WebGL', 'Gry HTML5', 'Playable ads', 'Tween.js', 'Spine'] },
        { title: 'AI', items: ['Gemini API', 'Claude Code', 'Codex'] },
        { title: 'Testowanie i debugowanie', items: ['Debugowanie', 'Testowanie własnego kodu', 'Testy jednostkowe', 'Rundy QA'] },
        {
          title: 'Używane także (niekomercyjnie)',
          items: ['Python — analiza danych', 'Java — backend', 'C# — tworzenie gier'],
          note: 'Projekty freelance, studia i projekty własne.',
          wide: true,
        },
        {
          title: 'Praktyki i narzędzia',
          items: ['OOP', 'Auth i JWT', 'i18n', 'Responsywny UI', 'Integracje Telegram / WhatsApp', 'Git', 'Figma', 'Webpack', 'ESLint / Prettier'],
          wide: true,
        },
      ],
    },
    education: {
      eyebrow: 'Wykształcenie',
      items: [
        {
          degree: 'Studia magisterskie, Inżynieria oprogramowania',
          school: 'Politechnika Kijowska im. Igora Sikorskiego (FICE)',
          period: 'Ukończenie: gru 2026',
        },
        {
          degree: 'Studia licencjackie, Inżynieria oprogramowania',
          school: 'Politechnika Kijowska im. Igora Sikorskiego (FICE)',
          period: 'cze 2025',
        },
      ],
      languagesTitle: 'Języki',
      languages: [
        { name: 'Angielski', level: 'C1 · Zaawansowany', value: 5 },
        { name: 'Polski', level: 'B2 · Średnio zaawansowany', value: 4 },
      ],
    },
    about: {
      eyebrow: 'O mnie',
      title: 'Poza kodem',
      text: [
        'Lubię tworzyć rzeczy, z których ludzie naprawdę chcą korzystać — czy to panel, który sprawia, że dane medyczne stają się zrozumiałe, czy mała gra, która w kilka sekund musi przyciągnąć uwagę.',
      ],
      interestsTitle: 'Zainteresowania i hobby',
      interests: [
        {
          icon: 'gamepad',
          title: 'Gry wideo',
          text: 'Granie i analizowanie gier różnych gatunków — szczególnie interesuje mnie game design, mechaniki i narracja.',
        },
        {
          icon: 'paw',
          title: 'Zwierzęta i przyroda',
          text: 'Czytanie o dzikiej przyrodzie, zachowaniach zwierząt i naturze.',
        },
      ],
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Zbudujmy coś dobrego.',
      lead: 'Szukam roli Software Engineer, frontend lub full-stack w Krakowie lub zdalnie. Najszybciej odpowiem na e-mail.',
      copy: 'Kopiuj',
      copied: 'Skopiowano!',
      location: 'Kraków, Polska',
    },
    footer: { built: 'Zaprojektowane i zbudowane przez Andrii Mieshkov w React, TypeScript i Vite.', source: 'GitHub' },
    a11y: { close: 'Zamknij', prev: 'Poprzedni zrzut', next: 'Następny zrzut', lang: 'Język', skip: 'Przejdź do treści' },
  },
};
