/*
 * Style preservation: This prelude borrows the source portfolio's near-black ground,
 * off-white type, mono telemetry labels, red accent, and restrained motion language.
 * It is intentionally isolated so the existing portfolio remains unchanged after it ends.
 */
import { useEffect, useRef, useState } from "react";

const INTRO_DURATION = 3100;
const BMW_CUTOUT = "/manus-storage/bmw-m4-intro-matte_58f0c649.webp";
const ENGINE_REV = "/manus-storage/bmw-engine-rev_dede1da1.mp3";

function getCarPosition(progress: number) {
  const stops = [
    [0, -88], [15, -50], [36, -18], [60, 2], [76, 24], [89, 58], [100, 128],
  ];
  const nextIndex = stops.findIndex(([stop]) => progress <= stop);
  if (nextIndex <= 0) return stops[0][1];
  const [startProgress, startPosition] = stops[nextIndex - 1];
  const [endProgress, endPosition] = stops[nextIndex];
  const localProgress = (progress - startProgress) / (endProgress - startProgress);
  return startPosition + (endPosition - startPosition) * localProgress;
}

function getCarScale(progress: number) {
  if (progress <= 72) return 0.74 + (progress / 72) * 0.38;
  if (progress <= 88) return 1.12 + ((progress - 72) / 16) * 0.04;
  return 1.16 - ((progress - 88) / 12) * 0.22;
}

function getCarYaw(progress: number) {
  if (progress <= 58) return -7 + (progress / 58) * 7;
  if (progress <= 82) return ((progress - 58) / 24) * 6;
  return 6 + ((progress - 82) / 18) * 3;
}

type BMWIntroProps = {
  onComplete: () => void;
};

export default function BMWIntro({ onComplete }: BMWIntroProps) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [carReady, setCarReady] = useState(false);
  const [soundMuted, setSoundMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startExit = (reducedMotion = false) => {
    setLeaving(true);
    audioRef.current?.pause();
    if (finishTimer.current) clearTimeout(finishTimer.current);
    if (exitTimer.current) clearTimeout(exitTimer.current);
    exitTimer.current = setTimeout(onComplete, reducedMotion ? 320 : 920);
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
    if (!carReady) return;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = motionQuery.matches;
    const duration = reducedMotion ? 460 : INTRO_DURATION;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const raw = Math.min((now - start) / duration, 1);
      setProgress(Math.min(100, Math.floor(raw * 100)));

      if (raw < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      finishTimer.current = setTimeout(() => startExit(reducedMotion), reducedMotion ? 50 : 260);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      if (finishTimer.current) clearTimeout(finishTimer.current);
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, [onComplete, carReady]);

  const nameOpacity = Math.max(0.14, Math.min(1, progress / 78));
  const carPosition = getCarPosition(progress);
  const carScale = getCarScale(progress);
  const carYaw = getCarYaw(progress);
  const carLift = Math.sin((progress / 100) * Math.PI) * -10;
  const carOpacity = progress < 10 ? 0.55 + progress * 0.045 : progress > 95 ? 1 - ((progress - 95) / 5) * 0.16 : 1;
  const shadowScale = 0.66 + Math.min(progress, 86) / 86 * 0.48;

  return (
    <section
      className={`bmw-intro ${leaving ? "bmw-intro--leaving" : ""}`}
      aria-label="Jeevan portfolio intro"
    >
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
          perspective: 1500px;
          transition: opacity 860ms cubic-bezier(.16,.84,.44,1), transform 860ms cubic-bezier(.16,.84,.44,1), filter 860ms cubic-bezier(.16,.84,.44,1), visibility 860ms step-end;
        }
        .bmw-intro--leaving { opacity: 0; transform: scale(1.018); filter: blur(1.4px); visibility: hidden; pointer-events: none; }
        .bmw-intro--leaving .bmw-intro__reading { opacity: 0; transform: translateY(-16px); transition: opacity 460ms ease, transform 560ms cubic-bezier(.16,.84,.44,1); }
        .bmw-intro--leaving .bmw-intro__speedline { opacity: 0; transform: skewY(-2deg) scaleX(1.15); transition: opacity 400ms ease, transform 720ms cubic-bezier(.16,.84,.44,1); }
        .bmw-intro::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 48%, rgba(224,50,44,.12), transparent 35%),
            linear-gradient(90deg, transparent 0%, rgba(255,255,255,.03) 50%, transparent 100%);
          pointer-events: none;
        }
        .bmw-intro__grid {
          position: absolute;
          inset: 0;
          opacity: .32;
          background-image: linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
          background-size: 62px 62px;
          mask-image: radial-gradient(ellipse at center, black, transparent 72%);
          pointer-events: none;
        }
        .bmw-intro__speedline {
          position: absolute;
          top: 42%;
          left: -15%;
          width: 130%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(224,50,44,.75), rgba(48,120,186,.55), transparent);
          box-shadow: 0 -12px 0 rgba(255,255,255,.04), 0 12px 0 rgba(255,255,255,.04);
          transform: skewY(-2deg);
          transition: opacity 120ms linear;
          pointer-events: none;
        }
        .bmw-intro__ground-shadow {
          position: absolute;
          top: clamp(358px, 58vh, 490px);
          left: 0;
          z-index: 1;
          width: min(52vw, 760px);
          height: 34px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(0,0,0,.7) 0%, rgba(0,0,0,.28) 44%, transparent 72%);
          opacity: .8;
          filter: blur(5px);
          pointer-events: none;
          transform-origin: center;
          will-change: transform, opacity;
        }
        .bmw-intro__car {
          position: absolute;
          width: min(78vw, 1180px);
          max-width: none;
          top: 25%;
          left: 0;
          z-index: 2;
          opacity: 0;
          mix-blend-mode: screen;
          -webkit-mask-image: radial-gradient(ellipse 94% 84% at center, #000 52%, rgba(0,0,0,.9) 68%, transparent 100%);
          mask-image: radial-gradient(ellipse 94% 84% at center, #000 52%, rgba(0,0,0,.9) 68%, transparent 100%);
          filter: drop-shadow(0 28px 20px rgba(0,0,0,.5)) drop-shadow(-42px 0 16px rgba(224,50,44,.12));
          transform: translate3d(-106%, 0, 0);
          transform-origin: 52% 68%;
          transition: opacity 120ms linear;
          will-change: transform, opacity;
          user-select: none;
          pointer-events: none;
        }
        .bmw-intro__car--ready { opacity: 1; }
        .bmw-intro__reading {
          position: relative;
          z-index: 3;
          width: min(90vw, 580px);
          margin-top: clamp(220px, 35vh, 360px);
          text-align: center;
        }
        .bmw-intro__index {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 14px;
          color: #77777e;
          font: 500 10px/1 "JetBrains Mono", monospace;
          letter-spacing: .2em;
        }
        .bmw-intro__bars { display: inline-flex; gap: 3px; }
        .bmw-intro__bars i { display: block; width: 24px; height: 2px; background: var(--intro-blue); }
        .bmw-intro__bars i:nth-child(2) { background: #f2f0ec; }
        .bmw-intro__bars i:nth-child(3) { background: var(--intro-red); }
        .bmw-intro__percentage {
          color: #f2f0ec;
          font: 700 clamp(58px, 12vw, 132px)/.85 "Space Grotesk", sans-serif;
          letter-spacing: -.08em;
          font-variant-numeric: tabular-nums;
          text-shadow: 0 0 34px rgba(224,50,44,.14);
        }
        .bmw-intro__percentage span { color: var(--intro-red); font-size: .36em; letter-spacing: -.03em; margin-left: .08em; vertical-align: .17em; }
        .bmw-intro__name {
          margin: 20px 0 0;
          color: #f2f0ec;
          font: 700 clamp(28px, 5vw, 56px)/1 "Space Grotesk", sans-serif;
          letter-spacing: .08em;
          transition: opacity 100ms linear, transform 240ms cubic-bezier(.16,.84,.44,1);
        }
        .bmw-intro__rule { display: flex; width: 100%; height: 2px; margin-top: 22px; background: rgba(255,255,255,.12); overflow: hidden; }
        .bmw-intro__rule b { display: block; width: 100%; height: 100%; transform-origin: left; background: linear-gradient(90deg, var(--intro-blue) 0 24%, #f2f0ec 24% 30%, var(--intro-red) 30% 100%); transition: transform 60ms linear; }
        .bmw-intro__skip {
          position: absolute;
          right: clamp(18px, 4vw, 48px);
          bottom: clamp(18px, 4vw, 42px);
          z-index: 4;
          border: 1px solid rgba(255,255,255,.28);
          background: rgba(8,8,9,.66);
          color: #b9b9be;
          padding: 10px 13px;
          font: 500 10px/1 "JetBrains Mono", monospace;
          letter-spacing: .14em;
          transition: border-color 180ms ease, color 180ms ease, transform 160ms cubic-bezier(.16,.84,.44,1);
        }
        .bmw-intro__skip:hover, .bmw-intro__skip:focus-visible { border-color: var(--intro-red); color: #f2f0ec; outline: none; }
        .bmw-intro__skip:active { transform: scale(.97); }
        .bmw-intro__sound {
          position: absolute;
          left: clamp(18px, 4vw, 48px);
          bottom: clamp(18px, 4vw, 42px);
          z-index: 4;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255,255,255,.28);
          background: rgba(8,8,9,.66);
          color: #b9b9be;
          padding: 10px 13px;
          font: 500 10px/1 "JetBrains Mono", monospace;
          letter-spacing: .14em;
          transition: border-color 180ms ease, color 180ms ease, transform 160ms cubic-bezier(.16,.84,.44,1);
        }
        .bmw-intro__sound:hover, .bmw-intro__sound:focus-visible { border-color: var(--intro-red); color: #f2f0ec; outline: none; }
        .bmw-intro__sound:active { transform: scale(.97); }
        .bmw-intro__sound-indicator { width: 6px; height: 6px; border-radius: 50%; background: currentColor; box-shadow: 0 0 0 3px currentColor; opacity: .75; }
        @media (max-width: 640px) {
          .bmw-intro__car { width: 142vw; top: 31%; }
          .bmw-intro__ground-shadow { top: 57%; width: 92vw; }
          .bmw-intro__reading { margin-top: min(46vh, 350px); }
          .bmw-intro__speedline { top: 47%; }
          .bmw-intro__grid { background-size: 42px 42px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bmw-intro__car--ready { opacity: .32; filter: grayscale(.1) blur(.2px); }
          .bmw-intro, .bmw-intro__name, .bmw-intro__rule b { transition-duration: 120ms; }
        }
      `}</style>
      <div className="bmw-intro__grid" aria-hidden="true" />
      <div className="bmw-intro__speedline" aria-hidden="true" style={{ transform: `translate3d(${-progress * 0.18}vw, 0, 0) skewY(-2deg)`, opacity: 0.55 + Math.min(progress, 70) / 70 * 0.45 }} />
      <audio ref={audioRef} src={ENGINE_REV} preload="metadata" muted={soundMuted} />
      <div className="bmw-intro__ground-shadow" aria-hidden="true" style={{ transform: `translate3d(${carPosition + 9}vw, 0, 0) scaleX(${shadowScale})`, opacity: 0.62 + Math.min(progress, 80) / 80 * 0.2 }} />
      <img className={`bmw-intro__car ${carReady ? "bmw-intro__car--ready" : ""}`} src={BMW_CUTOUT} onLoad={() => setCarReady(true)} onError={() => setCarReady(true)} style={{ opacity: carOpacity, transform: `translate3d(${carPosition}vw, ${carLift}px, 0) scale(${carScale}) rotateY(${carYaw}deg)`, filter: "drop-shadow(0 28px 20px rgba(0,0,0,.5)) drop-shadow(-42px 0 16px rgba(224,50,44,.14))" }} alt="" aria-hidden="true" />
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
