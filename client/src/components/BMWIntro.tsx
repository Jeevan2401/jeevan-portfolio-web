/*
 * Style preservation: the generated motion clip remains a short near-black,
 * red/blue technical prelude and hands back cleanly to the existing portfolio.
 */
import { useEffect, useRef, useState } from "react";

const INTRO_DURATION = 3350;
const BMW_LAUNCH_VIDEO = "/manus-storage/bmw-launch-motion-web_8dd3d99f.mp4";
const BMW_POSTER = "/manus-storage/bmw-m4-intro-matte_58f0c649.webp";
const ENGINE_REV = "/manus-storage/bmw-engine-rev_dede1da1.mp3";

type BMWIntroProps = {
  onComplete: () => void;
};

export default function BMWIntro({ onComplete }: BMWIntroProps) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [mediaReady, setMediaReady] = useState(false);
  const [soundMuted, setSoundMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startExit = (reducedMotion = false) => {
    setLeaving(true);
    audioRef.current?.pause();
    videoRef.current?.pause();
    if (finishTimer.current) clearTimeout(finishTimer.current);
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(onComplete, reducedMotion ? 220 : 660);
  };

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !soundMuted;
    setSoundMuted(nextMuted);
    audio.muted = nextMuted;
    if (nextMuted) {
      audio.pause();
      return;
    }
    audio.currentTime = 0;
    audio.play().catch(() => setSoundMuted(true));
  };

  useEffect(() => {
    if (!mediaReady) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = motionQuery.matches;
    const duration = reducedMotion ? 420 : INTRO_DURATION;
    const start = performance.now();
    let frame = 0;

    if (reducedMotion) videoRef.current?.pause();

    const tick = (now: number) => {
      const raw = Math.min((now - start) / duration, 1);
      setProgress(Math.min(100, Math.floor(raw * 100)));
      if (raw < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      finishTimer.current = setTimeout(() => startExit(reducedMotion), reducedMotion ? 20 : 16);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      if (finishTimer.current) clearTimeout(finishTimer.current);
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, [mediaReady, onComplete]);

  const nameOpacity = Math.max(0.14, Math.min(1, progress / 74));

  return (
    <section className={`bmw-intro ${leaving ? "bmw-intro--leaving" : ""}`} aria-label="Jeevan portfolio intro">
      <style>{`
        .bmw-intro {
          --intro-red: #e0322c;
          --intro-blue: #3078ba;
          position: fixed;
          inset: 0;
          z-index: 10000;
          overflow: hidden;
          display: grid;
          place-items: center;
          background: #080809;
          color: #f2f0ec;
          isolation: isolate;
          transition: opacity 620ms cubic-bezier(.16,.84,.44,1), transform 620ms cubic-bezier(.16,.84,.44,1), visibility 620ms step-end;
        }
        .bmw-intro--leaving { opacity: 0; transform: scale(1.012); visibility: hidden; pointer-events: none; }
        .bmw-intro--leaving .bmw-intro__reading { opacity: 0; transform: translateY(-12px); transition: opacity 320ms ease, transform 420ms cubic-bezier(.16,.84,.44,1); }
        .bmw-intro::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(circle at 50% 48%, rgba(224,50,44,.12), transparent 34%), linear-gradient(90deg, transparent 0%, rgba(255,255,255,.035) 50%, transparent 100%);
          pointer-events: none;
        }
        .bmw-intro__grid {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: .25;
          background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
          background-size: 62px 62px;
          mask-image: radial-gradient(ellipse at center, black, transparent 72%);
          pointer-events: none;
        }
        .bmw-intro__video {
          position: absolute;
          z-index: 2;
          top: 50%;
          left: 50%;
          width: min(100vw, 1440px);
          min-width: 920px;
          height: auto;
          transform: translate(-50%, -50%);
          opacity: 0;
          object-fit: cover;
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, transparent 17%, #000 26%, #000 100%);
          mask-image: linear-gradient(90deg, transparent 0%, transparent 17%, #000 26%, #000 100%);
          mix-blend-mode: screen;
          filter: contrast(1.04) saturate(1.02) drop-shadow(0 28px 22px rgba(0,0,0,.42));
          transition: opacity 180ms ease;
          pointer-events: none;
        }
        .bmw-intro__video--ready { opacity: .98; }
        .bmw-intro__speedline {
          position: absolute;
          z-index: 2;
          top: 42%;
          left: -15%;
          width: 130%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(224,50,44,.72), rgba(48,120,186,.52), transparent);
          box-shadow: 0 -12px 0 rgba(255,255,255,.04), 0 12px 0 rgba(255,255,255,.04);
          pointer-events: none;
        }
        .bmw-intro__reading {
          position: relative;
          z-index: 3;
          width: min(90vw, 580px);
          margin-top: clamp(220px, 35vh, 360px);
          text-align: center;
          transition: opacity 320ms ease, transform 420ms cubic-bezier(.16,.84,.44,1);
        }
        .bmw-intro__index { display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 14px; color: #77777e; font: 500 10px/1 "JetBrains Mono", monospace; letter-spacing: .2em; }
        .bmw-intro__bars { display: inline-flex; gap: 3px; }
        .bmw-intro__bars i { display: block; width: 24px; height: 2px; background: var(--intro-blue); }
        .bmw-intro__bars i:nth-child(2) { background: #f2f0ec; }
        .bmw-intro__bars i:nth-child(3) { background: var(--intro-red); }
        .bmw-intro__percentage { color: #f2f0ec; font: 700 clamp(58px, 12vw, 132px)/.85 "Space Grotesk", sans-serif; letter-spacing: -.08em; font-variant-numeric: tabular-nums; text-shadow: 0 0 34px rgba(224,50,44,.14); }
        .bmw-intro__percentage span { color: var(--intro-red); font-size: .36em; letter-spacing: -.03em; margin-left: .08em; vertical-align: .17em; }
        .bmw-intro__name { margin: 20px 0 0; color: #f2f0ec; font: 700 clamp(28px, 5vw, 56px)/1 "Space Grotesk", sans-serif; letter-spacing: .08em; transition: opacity 100ms linear, transform 240ms cubic-bezier(.16,.84,.44,1); }
        .bmw-intro__rule { display: flex; width: 100%; height: 2px; margin-top: 22px; background: rgba(255,255,255,.12); overflow: hidden; }
        .bmw-intro__rule b { display: block; width: 100%; height: 100%; transform-origin: left; background: linear-gradient(90deg, var(--intro-blue) 0 24%, #f2f0ec 24% 30%, var(--intro-red) 30% 100%); transition: transform 60ms linear; }
        .bmw-intro__skip, .bmw-intro__sound { position: absolute; bottom: clamp(18px, 4vw, 42px); z-index: 4; border: 1px solid rgba(255,255,255,.28); background: rgba(8,8,9,.66); color: #b9b9be; padding: 10px 13px; font: 500 10px/1 "JetBrains Mono", monospace; letter-spacing: .14em; transition: border-color 180ms ease, color 180ms ease, transform 160ms cubic-bezier(.16,.84,.44,1); }
        .bmw-intro__skip { right: clamp(18px, 4vw, 48px); }
        .bmw-intro__sound { left: clamp(18px, 4vw, 48px); display: inline-flex; align-items: center; gap: 8px; }
        .bmw-intro__skip:hover, .bmw-intro__skip:focus-visible, .bmw-intro__sound:hover, .bmw-intro__sound:focus-visible { border-color: var(--intro-red); color: #f2f0ec; outline: none; }
        .bmw-intro__skip:active, .bmw-intro__sound:active { transform: scale(.97); }
        .bmw-intro__sound-indicator { width: 6px; height: 6px; border-radius: 50%; background: currentColor; box-shadow: 0 0 0 3px currentColor; opacity: .75; }
        @media (max-width: 640px) {
          .bmw-intro__video { width: auto; min-width: 0; height: 58vh; top: 34%; }
          .bmw-intro__reading { margin-top: min(46vh, 350px); }
          .bmw-intro__speedline { top: 47%; }
          .bmw-intro__grid { background-size: 42px 42px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bmw-intro__video { opacity: .32; filter: grayscale(.1) blur(.2px); }
          .bmw-intro, .bmw-intro__reading, .bmw-intro__rule b { transition-duration: 120ms; }
        }
      `}</style>
      <div className="bmw-intro__grid" aria-hidden="true" />
      <video
        ref={videoRef}
        className={`bmw-intro__video ${mediaReady ? "bmw-intro__video--ready" : ""}`}
        src={BMW_LAUNCH_VIDEO}
        poster={BMW_POSTER}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={(event) => { event.currentTarget.playbackRate = 1.2; setMediaReady(true); }}
        onError={() => setMediaReady(true)}
        aria-hidden="true"
      />
      <div className="bmw-intro__speedline" aria-hidden="true" style={{ transform: `translate3d(${-progress * 0.18}vw, 0, 0) skewY(-2deg)`, opacity: 0.52 + Math.min(progress, 70) / 70 * 0.48 }} />
      <audio ref={audioRef} src={ENGINE_REV} preload="metadata" muted={soundMuted} />
      <div className="bmw-intro__reading">
        <div className="bmw-intro__index"><span>LAUNCH SEQUENCE</span><span className="bmw-intro__bars" aria-hidden="true"><i /><i /><i /></span></div>
        <output className="bmw-intro__percentage" aria-live="polite">{String(progress).padStart(3, "0")}<span>%</span></output>
        <p className="bmw-intro__name" style={{ opacity: nameOpacity, transform: `translateY(${(1 - nameOpacity) * 10}px)` }}>JEEVAN</p>
        <div className="bmw-intro__rule" aria-hidden="true"><b style={{ transform: `scaleX(${progress / 100})` }} /></div>
      </div>
      <button type="button" className="bmw-intro__sound" onClick={toggleSound} aria-pressed={!soundMuted} aria-label={soundMuted ? "Enable engine sound" : "Mute engine sound"}>
        <span className="bmw-intro__sound-indicator" aria-hidden="true" />
        {soundMuted ? "SOUND OFF" : "SOUND ON"}
      </button>
      <button type="button" className="bmw-intro__skip" onClick={() => startExit(window.matchMedia("(prefers-reduced-motion: reduce)").matches)}>SKIP INTRO</button>
    </section>
  );
}
