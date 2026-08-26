/*
 * Style preservation: a single exact side-profile BMW remains the only vehicle.
 * Motion uses CSS transform/opacity for a fast, lightweight technical prelude.
 */
import { useEffect, useRef, useState } from "react";

const INTRO_DURATION = 3100;
const BMW_REFERENCE = "/manus-storage/bmw-side-profile-css_812004bf.webp";
const ENGINE_REV = "/manus-storage/bmw-engine-rev_dede1da1.mp3";

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
    exitTimer.current = setTimeout(onComplete, reducedMotion ? 220 : 600);
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
    const duration = reducedMotion ? 380 : INTRO_DURATION;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const raw = Math.min((now - start) / duration, 1);
      setProgress(Math.min(100, Math.floor(raw * 100)));
      if (raw < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      finishTimer.current = setTimeout(() => startExit(reducedMotion), reducedMotion ? 20 : 12);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      if (finishTimer.current) clearTimeout(finishTimer.current);
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, [carReady, onComplete]);

  const nameOpacity = Math.max(0.14, Math.min(1, progress / 74));

  return (
    <section className={`bmw-intro ${leaving ? "bmw-intro--leaving" : ""}`} aria-label="Jeevan portfolio intro">
      <style>{`
        .bmw-intro {
          --intro-red: #e0322c;
          --intro-blue: #3078ba;
          --launch-duration: ${INTRO_DURATION}ms;
          position: fixed;
          inset: 0;
          z-index: 10000;
          overflow: hidden;
          display: grid;
          place-items: center;
          background: #080809;
          color: #f2f0ec;
          isolation: isolate;
          transition: opacity 580ms cubic-bezier(.16,.84,.44,1), transform 580ms cubic-bezier(.16,.84,.44,1), visibility 580ms step-end;
        }
        .bmw-intro--leaving { opacity: 0; transform: scale(1.01); visibility: hidden; pointer-events: none; }
        .bmw-intro--leaving .bmw-intro__reading { opacity: 0; transform: translateY(-12px); transition: opacity 260ms ease, transform 360ms cubic-bezier(.16,.84,.44,1); }
        .bmw-intro::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(ellipse at 38% 46%, rgba(224,50,44,.13), transparent 34%), linear-gradient(90deg, transparent 0%, rgba(255,255,255,.035) 50%, transparent 100%);
          pointer-events: none;
        }
        .bmw-intro__grid {
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: .24;
          background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
          background-size: 62px 62px;
          mask-image: radial-gradient(ellipse at center, black, transparent 72%);
          pointer-events: none;
        }
        .bmw-intro__road {
          position: absolute;
          z-index: 1;
          right: -5%;
          bottom: 0;
          left: -5%;
          height: 42%;
          background: linear-gradient(180deg, transparent, rgba(16,16,18,.78) 30%, #060607 100%);
          border-top: 1px solid rgba(255,255,255,.07);
          pointer-events: none;
        }
        .bmw-intro__rig {
          position: absolute;
          z-index: 2;
          top: 22%;
          left: 3.5vw;
          width: min(72vw, 1160px);
          aspect-ratio: 16 / 9;
          opacity: 0;
          transform-origin: 48% 66%;
          background: url("/manus-storage/bmw-side-profile-css_812004bf.webp") center / contain no-repeat;
          pointer-events: none;
          will-change: transform, opacity;
        }
        .bmw-intro__rig--ready { opacity: 1; animation: bmw-drag-pass var(--launch-duration) cubic-bezier(.2,.7,.18,1) both; }
        .bmw-intro__car {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
        }
        .bmw-intro__shadow {
          position: absolute;
          z-index: -1;
          left: 10%;
          right: 6%;
          bottom: 18%;
          height: 6%;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(0,0,0,.82), rgba(0,0,0,.3) 54%, transparent 75%);
          filter: blur(7px);
          opacity: .72;
          animation: bmw-shadow var(--launch-duration) cubic-bezier(.2,.7,.18,1) both;
        }
        .bmw-intro__wheel {
          position: absolute;
          z-index: 2;
          top: 59%;
          width: 12.8%;
          aspect-ratio: 1;
          border: 1px solid rgba(241,241,243,.32);
          border-radius: 50%;
          background: repeating-conic-gradient(from 0deg, rgba(255,255,255,.18) 0deg 3deg, transparent 3deg 15deg);
          box-shadow: inset 0 0 0 25% rgba(0,0,0,.28), 0 0 16px rgba(255,255,255,.08);
          mix-blend-mode: screen;
          opacity: 0;
          animation: bmw-wheel-spin var(--launch-duration) linear both;
        }
        .bmw-intro__wheel--rear { left: 17.3%; }
        .bmw-intro__wheel--front { left: 73.1%; }
        .bmw-intro__smoke {
          position: absolute;
          z-index: -2;
          top: 59%;
          left: 6%;
          width: 29%;
          height: 22%;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(185,185,190,.28), rgba(120,120,125,.12) 42%, transparent 72%);
          filter: blur(11px);
          opacity: 0;
          animation: bmw-smoke var(--launch-duration) ease-out both;
        }
        .bmw-intro__speedline {
          position: absolute;
          z-index: 2;
          top: 42%;
          left: -18%;
          width: 138%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(224,50,44,.74), rgba(48,120,186,.58), transparent);
          box-shadow: 0 -12px 0 rgba(255,255,255,.045), 0 12px 0 rgba(255,255,255,.045);
          pointer-events: none;
        }
        @keyframes bmw-drag-pass {
          0%, 15% { transform: translate3d(0,0,0) scale(1); filter: blur(0); }
          18% { transform: translate3d(.3vw,4px,0) scaleX(1.015) scaleY(.982); }
          24% { transform: translate3d(7vw,-1px,0) scaleX(1.006) scaleY(.995); filter: blur(.1px); }
          52% { transform: translate3d(44vw,-3px,0) scale(1.02); filter: blur(.22px); }
          79% { transform: translate3d(86vw,-1px,0) scale(1.012); filter: blur(.5px); }
          100% { transform: translate3d(137vw,0,0) scale(.99); filter: blur(1.1px); }
        }
        @keyframes bmw-wheel-spin {
          0%, 15% { transform: rotate(0); opacity: 0; }
          18% { opacity: .16; }
          100% { transform: rotate(2160deg); opacity: .24; }
        }
        @keyframes bmw-shadow {
          0%, 15% { transform: scaleX(.96); opacity: .65; }
          19% { transform: scaleX(1.08); opacity: .88; }
          70% { transform: scaleX(1.2); opacity: .74; }
          100% { transform: scaleX(1.5); opacity: 0; }
        }
        @keyframes bmw-smoke {
          0%, 15% { opacity: 0; transform: translateX(0) scale(.35); }
          21% { opacity: .72; transform: translateX(-2vw) scale(1); }
          40% { opacity: .22; transform: translateX(-7vw) scale(1.5); }
          100% { opacity: 0; transform: translateX(-12vw) scale(2.2); }
        }
        .bmw-intro__reading {
          position: relative;
          z-index: 3;
          width: min(90vw, 580px);
          margin-top: clamp(220px, 35vh, 360px);
          text-align: center;
          transition: opacity 260ms ease, transform 360ms cubic-bezier(.16,.84,.44,1);
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
          .bmw-intro__rig { top: 20%; left: 3vw; width: 106vw; }
          .bmw-intro__reading { margin-top: min(46vh, 350px); }
          .bmw-intro__speedline { top: 47%; }
          .bmw-intro__grid { background-size: 42px 42px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bmw-intro__rig--ready { animation: none; transform: translate3d(10vw,0,0); }
          .bmw-intro__wheel, .bmw-intro__smoke, .bmw-intro__shadow { animation: none; opacity: 0; }
          .bmw-intro, .bmw-intro__reading, .bmw-intro__rule b { transition-duration: 120ms; }
        }
      `}</style>
      <div className="bmw-intro__grid" aria-hidden="true" />
      <div className="bmw-intro__road" aria-hidden="true" />
      <div className={`bmw-intro__rig ${carReady ? "bmw-intro__rig--ready" : ""}`} aria-hidden="true">
        <div className="bmw-intro__shadow" />
        <div className="bmw-intro__smoke" />
        <img className="bmw-intro__car" src={BMW_REFERENCE} onLoad={() => setCarReady(true)} onError={() => setCarReady(true)} alt="" fetchPriority="high" />
        <span className="bmw-intro__wheel bmw-intro__wheel--rear" />
        <span className="bmw-intro__wheel bmw-intro__wheel--front" />
      </div>
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
