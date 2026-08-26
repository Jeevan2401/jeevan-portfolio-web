/*
 * Style preservation: This prelude borrows the source portfolio's near-black ground,
 * off-white type, mono telemetry labels, red accent, and restrained motion language.
 * It is intentionally isolated so the existing portfolio remains unchanged after it ends.
 */
import { useEffect, useRef, useState } from "react";

const INTRO_DURATION = 3100;
const BMW_CUTOUT = "/manus-storage/bmw-m4-intro-cutout_b91bb02d.png";

type BMWIntroProps = {
  onComplete: () => void;
};

export default function BMWIntro({ onComplete }: BMWIntroProps) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reducedMotion = motionQuery.matches;
    const duration = reducedMotion ? 460 : INTRO_DURATION;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const raw = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));

      if (raw < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      finishTimer.current = setTimeout(() => setLeaving(true), reducedMotion ? 50 : 260);
      exitTimer.current = setTimeout(onComplete, reducedMotion ? 260 : 860);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      if (finishTimer.current) clearTimeout(finishTimer.current);
      if (exitTimer.current) clearTimeout(exitTimer.current);
    };
  }, [onComplete]);

  const nameOpacity = Math.max(0.14, Math.min(1, progress / 78));

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
          transition: opacity 600ms cubic-bezier(.16,.84,.44,1), visibility 600ms step-end;
        }
        .bmw-intro--leaving { opacity: 0; visibility: hidden; pointer-events: none; }
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
          pointer-events: none;
        }
        .bmw-intro__car {
          position: absolute;
          width: min(72vw, 1120px);
          max-width: none;
          top: 25%;
          left: 0;
          z-index: 2;
          filter: drop-shadow(0 28px 20px rgba(0,0,0,.5)) drop-shadow(-42px 0 16px rgba(224,50,44,.12));
          transform: translate3d(-106%, 0, 0);
          animation: bmw-launch ${INTRO_DURATION}ms cubic-bezier(.15,.78,.17,1) forwards;
          user-select: none;
          pointer-events: none;
        }
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
        @keyframes bmw-launch {
          0% { transform: translate3d(-106%, 0, 0) skewX(-2deg); filter: blur(.2px) drop-shadow(0 28px 20px rgba(0,0,0,.5)); }
          10% { transform: translate3d(-84%, 1px, 0) skewX(-1deg); }
          38% { transform: translate3d(10vw, 0, 0) skewX(0); }
          72% { transform: translate3d(62vw, -1px, 0) skewX(1deg); filter: blur(.55px) drop-shadow(-60px 0 18px rgba(224,50,44,.16)); }
          100% { transform: translate3d(128vw, 0, 0) skewX(2deg); filter: blur(1.2px) drop-shadow(-90px 0 16px rgba(224,50,44,.08)); }
        }
        @media (max-width: 640px) {
          .bmw-intro__car { width: 142vw; top: 31%; }
          .bmw-intro__reading { margin-top: min(46vh, 350px); }
          .bmw-intro__speedline { top: 47%; }
          .bmw-intro__grid { background-size: 42px 42px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .bmw-intro__car { animation: none; transform: translate3d(-18%, 0, 0); opacity: .32; filter: grayscale(.1) blur(.2px); }
          .bmw-intro, .bmw-intro__name, .bmw-intro__rule b { transition-duration: 120ms; }
        }
      `}</style>
      <div className="bmw-intro__grid" aria-hidden="true" />
      <div className="bmw-intro__speedline" aria-hidden="true" />
      <img className="bmw-intro__car" src={BMW_CUTOUT} alt="" aria-hidden="true" />
      <div className="bmw-intro__reading">
        <div className="bmw-intro__index"><span>LAUNCH SEQUENCE</span><span className="bmw-intro__bars" aria-hidden="true"><i /><i /><i /></span></div>
        <output className="bmw-intro__percentage" aria-live="polite">{String(progress).padStart(3, "0")}<span>%</span></output>
        <p className="bmw-intro__name" style={{ opacity: nameOpacity, transform: `translateY(${(1 - nameOpacity) * 10}px)` }}>JEEVAN</p>
        <div className="bmw-intro__rule" aria-hidden="true"><b style={{ transform: `scaleX(${progress / 100})` }} /></div>
      </div>
      <button type="button" className="bmw-intro__skip" onClick={onComplete}>SKIP INTRO</button>
    </section>
  );
}
