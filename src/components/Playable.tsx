import { useCallback, useEffect, useRef, useState } from 'react';
import { profile } from '../data/content';
import { useI18n } from '../i18n';
import { Icon } from './Icon';
import { Img } from './Img';

type State = 'idle' | 'loading' | 'ready' | 'error';

/** Globals the game build exposes on its own window (same origin, so we can reach them). */
interface GameWindow extends Window {
  App?: {
    pause?: () => void;
    resume?: () => void;
    pixiApp?: {
      view?: HTMLCanvasElement;
      renderer?: { gl?: WebGLRenderingContext };
      destroy?: (removeView?: boolean) => void;
    };
  };
  Howler?: { mute: (muted: boolean) => void; unload?: () => void };
}

const gameWindow = (frame: HTMLIFrameElement | null) => (frame?.contentWindow ?? null) as GameWindow | null;

/** Frees the game's GPU context and audio before the iframe goes away, so restarts never pile up WebGL contexts. */
function teardown(frame: HTMLIFrameElement | null) {
  const win = gameWindow(frame);
  if (!win) return;
  try {
    win.App?.pixiApp?.renderer?.gl?.getExtension('WEBGL_lose_context')?.loseContext();
    win.App?.pixiApp?.destroy?.(true);
    win.Howler?.unload?.();
  } catch {
    /* game already gone */
  }
  frame!.src = 'about:blank';
}

/** Click-to-load iframe so the game build never slows down the first paint. */
export function Playable() {
  const { t } = useI18n();
  const [state, setState] = useState<State>('idle');
  const [run, setRun] = useState(0);
  const [muted, setMuted] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const mutedRef = useRef(muted);
  mutedRef.current = muted;

  const start = () => {
    teardown(frameRef.current);
    setState('loading');
    setRun((r) => r + 1);
  };

  const onLoad = useCallback(() => {
    const win = gameWindow(frameRef.current);
    if (!win || win.location.href === 'about:blank') return;
    // The game boots on its own `load` event; give it a moment, then confirm a renderer exists.
    setTimeout(() => {
      const w = gameWindow(frameRef.current);
      const app = w?.App?.pixiApp;
      if (!w || !app) {
        setState('error');
        return;
      }
      app.view?.addEventListener('webglcontextlost', () => setState('error'));
      // The click on the poster already counts as a user gesture for this origin, so let the
      // game's sound manager unlock audio now instead of waiting for a tap inside the frame.
      w.document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      w.Howler?.mute(mutedRef.current);
      setState('ready');
    }, 600);
  }, []);

  // Pause the game (render loop + audio) while it is scrolled out of view.
  useEffect(() => {
    if (state !== 'ready' || !rootRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const win = gameWindow(frameRef.current);
        if (!win?.App) return;
        try {
          if (entry.isIntersecting) {
            win.App.resume?.();
            win.Howler?.mute(mutedRef.current);
          } else {
            win.App.pause?.();
            win.Howler?.mute(true);
          }
        } catch {
          /* ignore */
        }
      },
      { threshold: 0.15 },
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, [state, run]);

  useEffect(() => {
    gameWindow(frameRef.current)?.Howler?.mute(muted);
  }, [muted]);

  useEffect(() => {
    const frame = frameRef;
    return () => teardown(frame.current);
  }, []);

  return (
    <div className="playable" ref={rootRef}>
      <div className="phone phone--game">
        <span className="phone__island" aria-hidden="true" />
        {state === 'idle' ? (
          <button type="button" className="playable__poster" onClick={start}>
            <Img id="card-duel-poster" alt="Card Duel gameplay" sizes="(max-width: 600px) 70vw, 320px" />
            <span className="playable__overlay">
              <span className="playable__play">
                <Icon name="play" size={30} />
              </span>
              <span className="playable__label">{t.duel.play}</span>
              <span className="playable__hint mono">{t.duel.playHint}</span>
            </span>
          </button>
        ) : (
          <>
            {state === 'loading' && (
              <span className="playable__status" role="status">
                <span className="spinner" aria-hidden="true" />
                {t.duel.loading}
              </span>
            )}
            {state === 'error' && (
              <span className="playable__status playable__status--error" role="alert">
                {t.duel.error}
              </span>
            )}
            <iframe
              key={run}
              ref={frameRef}
              src={profile.game}
              title="Card Duel — playable ad"
              allow="autoplay; fullscreen"
              onLoad={onLoad}
            />
          </>
        )}
      </div>

      <div className="playable__controls">
        <button type="button" className="btn btn--small btn--ghost" onClick={start} disabled={state === 'idle'}>
          <Icon name="restart" size={16} /> {t.duel.restart}
        </button>
        <button
          type="button"
          className="btn btn--small btn--ghost"
          onClick={() => setMuted((m) => !m)}
          aria-pressed={!muted}
          disabled={state !== 'ready'}
        >
          <Icon name={muted ? 'mute' : 'volume'} size={16} /> {muted ? t.duel.soundOff : t.duel.soundOn}
        </button>
        <a className="btn btn--small btn--ghost" href={profile.game} target="_blank" rel="noreferrer">
          <Icon name="expand" size={16} /> {t.duel.fullscreen}
        </a>
      </div>
      <p className="playable__note mono">{t.duel.note}</p>
    </div>
  );
}
