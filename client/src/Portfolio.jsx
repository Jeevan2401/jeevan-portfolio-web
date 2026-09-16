/* Style preservation: This file is the imported source portfolio. Keep its dark cinematic layout, typography, palette, sections, and interaction language intact; changes below are limited to the requested intro hookup, truthful positioning copy, project context, and accessibility. */
import React, { useEffect, useRef, useState, useCallback } from "react";
import BMWIntro from "./components/BMWIntro";

// ---------- Design tokens ----------
const ACCENT = "#e0322c";
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#";

// ---------- Icons ----------
function GitHubIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z" fill={color} stroke="none"/>
    </svg>
  );
}
function LinkedInIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" stroke={color} strokeWidth="1.6"/>
      <path d="M7 10v7M7 6.9v.01M11 17v-4.2c0-1.5.9-2.4 2.2-2.4 1.2 0 2 .8 2 2.4V17" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 10.3V17" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
function EmailIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4.5" width="19" height="15" rx="3"/>
      <path d="M3.5 6.5l8.5 6 8.5-6"/>
    </svg>
  );
}
function WhatsAppIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.3 11.7a8.2 8.2 0 0 1-12.1 7.2L4 20l1.2-4.1A8.2 8.2 0 1 1 20.3 11.7Z" />
      <path d="M8.7 8.1c.2-.4.4-.4.7-.4h.6c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.5.7c.5.9 1.2 1.6 2.2 2.1l.6-.5c.2-.2.5-.2.7-.1l1.6.8c.2.1.3.3.3.5v.6c0 .3 0 .5-.4.7-.4.2-1.2.4-2.1.1-1.1-.3-2.4-1.1-3.5-2.2-1.1-1.1-1.9-2.4-2.2-3.5-.3-.9-.1-1.7.1-2.1Z" />
    </svg>
  );
}
function ArrowUpRightIcon({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H8M17 7V16" />
    </svg>
  );
}

const MANUS_ASSET_HOST = "https://jeevanfolio-hpx3da3e.manus.space";
const RESUME_DATA_URL = "/Jeevan_Resume.pdf";
const PROFILE_CARD_IMAGE = `${MANUS_ASSET_HOST}/manus-storage/jeevan-profile-card-crop_9a99806a.png`;
const LINKS = {
  github: "https://github.com/Jeevan2401",
  linkedin: "https://www.linkedin.com/in/jeevan-g-42a264373/",
  email: "mailto:jeevan24012007@gmail.com",
  whatsapp: "https://wa.me/917358419838?text=Hi%20Jeevan%2C%20I%27m%20%5BClient%20Name%5D.%20I%20need%20a%20%5BProject%20Type%5D%20website.%0A%0AProject%20brief%3A%20%5BShort%20project%20description%5D%0APreferred%20timeline%3A%20%5BTimeline%5D",
};

// Get your free access key at https://web3forms.com (takes ~30 seconds, just needs your email)
const WEB3FORMS_ACCESS_KEY = "4f5199f9-95ac-4fcc-9824-efedc913e6cc";

// ================= Hooks =================

function useGlitchText(finalText, { active = true, speed = 28, loopEvery = null } = {}) {
  const [text, setText] = useState(finalText);
  const timer = useRef(null);
  const runScramble = useCallback(() => {
    let iterations = 0;
    const total = finalText.length * 3;
    const tick = () => {
      iterations++;
      const revealCount = Math.floor((iterations / total) * finalText.length);
      const next = finalText
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealCount) return ch;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join("");
      setText(next);
      if (iterations < total) {
        timer.current = setTimeout(tick, speed);
      } else {
        setText(finalText);
      }
    };
    tick();
  }, [finalText, speed]);

  useEffect(() => {
    if (!active) {
      setText(finalText);
      return;
    }
    runScramble();
    let interval;
    if (loopEvery) {
      interval = setInterval(runScramble, loopEvery);
    }
    return () => {
      clearTimeout(timer.current);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalText, active]);
  return text;
}

function useOnScreen(ref, threshold = 0.2) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? scrolled / max : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useMouseParallax(strength = 30) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);
  return pos;
}

// ================= Reveal wrapper =================
function Reveal({ children, delay = 0, className = "", y = 24 }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref, 0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px) scale(1)" : `translateY(${y}px) scale(0.98)`,
        transition: `opacity 0.8s cubic-bezier(.16,.84,.44,1) ${delay}ms, transform 0.8s cubic-bezier(.16,.84,.44,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// letter-by-letter stagger reveal for headings
function StaggerText({ text, className = "", style = {}, delayStep = 22, startDelay = 0 }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref, 0.4);
  let characterIndex = 0;
  return (
    <span ref={ref} className={className} style={{ ...style, display: "inline-block" }}>
      {text.split(" ").map((word, wordIndex, words) => (
        <React.Fragment key={`${word}-${wordIndex}`}>
          <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((ch, i) => {
              const delay = startDelay + characterIndex++ * delayStep;
              return (
                <span
                  key={`${ch}-${i}`}
                  style={{
                    display: "inline-block",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0) rotate(0deg)" : "translateY(0.6em) rotate(6deg)",
                    transition: `opacity 0.5s ease ${delay}ms, transform 0.55s cubic-bezier(.16,.84,.44,1) ${delay}ms`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
          {wordIndex < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </span>
  );
}

// magnetic button wrapper
function Magnetic({ children, strength = 18, as: Tag = "div", style = {}, ...rest }) {
  const ref = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
    const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
    setT({ x, y });
  };
  const onLeave = () => setT({ x: 0, y: 0 });
  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        transform: `translate(${t.x}px, ${t.y}px)`,
        transition: "transform 0.18s cubic-bezier(.16,.84,.44,1)",
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// 3D tilt card
function TiltCard({ children, style = {} }) {
  const ref = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setRot({ x: (py - 0.5) * -10, y: (px - 0.5) * 10 });
  };
  const onLeave = () => setRot({ x: 0, y: 0 });
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        transform: `perspective(700px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) translateZ(0)`,
        transition: "transform 0.25s cubic-bezier(.16,.84,.44,1)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

// animated count-up number
function Counter({ to, suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref, 0.5);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

// floating particle canvas (hero background)
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w, h;
    let particles = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 55;
    particles = new Array(COUNT).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224,50,44,${p.o})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

// custom cursor: a soft torch-light glow that follows the pointer
function CustomCursor() {
  const ref = useRef(null);
  const isCoarse = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    if (isCoarse) return;
    let mx = -300, my = -300, cx = -300, cy = -300;
    let size = 220, targetSize = 220;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const HOVER_SELECTOR = "a, button, [role='button'], input, textarea, .cursor-hover";
    const onOver = (e) => { if (e.target.closest && e.target.closest(HOVER_SELECTOR)) targetSize = 320; };
    const onOut = (e) => { if (e.target.closest && e.target.closest(HOVER_SELECTOR)) targetSize = 220; };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    let raf;
    const loop = () => {
      cx += (mx - cx) * 0.16;
      cy += (my - cy) * 0.16;
      size += (targetSize - size) * 0.12;
      if (ref.current) {
        ref.current.style.left = `${cx}px`;
        ref.current.style.top = `${cy}px`;
        ref.current.style.width = `${size}px`;
        ref.current.style.height = `${size}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [isCoarse]);

  if (isCoarse) return null;

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: -300,
        left: -300,
        width: 220,
        height: 220,
        marginLeft: -110,
        marginTop: -110,
        borderRadius: "50%",
        background: `radial-gradient(circle, #fff3d6 0%, #ffe3ad 10%, ${ACCENT}3a 34%, ${ACCENT}14 58%, transparent 80%)`,
        mixBlendMode: "soft-light",
        filter: "blur(8px)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}

// per-letter magnetic/lift animation on hover for the hero name
function AnimatedName({ text }) {
  const letterRefs = useRef([]);
  useEffect(() => {
    let mouse = { x: -9999, y: -9999 };
    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    let raf;
    const loop = () => {
      letterRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.hypot(mouse.x - cx, mouse.y - cy);
        const radius = 160;
        const influence = Math.max(0, 1 - dist / radius);
        const lift = influence * 26;
        const scale = 1 + influence * 0.4;
        const skew = ((mouse.x - cx) / radius) * influence * 10;
        el.style.transform = `translateY(${-lift}px) scale(${scale}) skewX(${skew}deg)`;
        el.style.color = influence > 0.35 ? ACCENT : "#f2f0ec";
        el.style.textShadow = influence > 0.35 ? `0 0 ${influence * 30}px ${ACCENT}aa` : "none";
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <span style={{ display: "inline-block" }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          ref={(el) => (letterRefs.current[i] = el)}
          style={{
            display: "inline-block",
            transition: "transform 0.18s cubic-bezier(.16,.84,.44,1), color 0.18s ease, text-shadow 0.18s ease",
            willChange: "transform",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

// centered loader intro: number counts 0 -> 100, name reveals below it, loading bar fills beneath the name
function LegacyBurnoutIntro({ onDone }) {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setCount(Math.round(eased * 100));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        const t1 = setTimeout(() => setExit(true), 350);
        const t2 = setTimeout(() => onDone && onDone(), 950);
        rafRef.current = { t1, t2 };
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (typeof rafRef.current === "number") cancelAnimationFrame(rafRef.current);
      else if (rafRef.current) {
        clearTimeout(rafRef.current.t1);
        clearTimeout(rafRef.current.t2);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "#0a0a0b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: exit ? 0 : 1,
        transition: "opacity 0.6s ease",
        pointerEvents: exit ? "none" : "auto",
      }}
    >
      <style>{`
        @keyframes introNameFade {
          from { opacity: 0; transform: translateY(10px); letter-spacing: 6px; }
          to { opacity: 1; transform: translateY(0); letter-spacing: 2px; }
        }
        @keyframes introFadeIn {
          from { opacity: 0; } to { opacity: 1; }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
        }}
      >
        {/* number counting up 0 -> 100 */}
        <div
          className="mono"
          style={{
            fontSize: "clamp(15px, 2.2vw, 20px)",
            color: ACCENT,
            letterSpacing: 3,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {String(count).padStart(3, "0")}%
        </div>

        {/* name */}
        <div
          className="display"
          style={{
            fontSize: "clamp(28px, 6vw, 56px)",
            fontWeight: 700,
            color: "#f2f0ec",
            letterSpacing: 2,
            animation: "introNameFade 0.6s ease forwards",
          }}
        >
          JEEVAN
        </div>

        {/* loading bar */}
        <div
          style={{
            width: "clamp(160px, 26vw, 260px)",
            height: 3,
            borderRadius: 2,
            background: "#ffffff1a",
            overflow: "hidden",
            marginTop: 6,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${count}%`,
              background: ACCENT,
              borderRadius: 2,
              transition: "width 0.05s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// marquee ticker strip
function Marquee({ text, speed = 22 }) {
  const items = new Array(8).fill(text);
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid #ffffff1a",
        borderBottom: "1px solid #ffffff1a",
        background: "#101012",
        padding: "14px 0",
      }}
    >
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `marquee-scroll ${speed}s linear infinite`,
        }}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="display"
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: i % 2 === 0 ? "#f2f0ec" : ACCENT,
              padding: "0 26px",
              whiteSpace: "nowrap",
              letterSpacing: 0.5,
            }}
          >
            {t} ✦
          </span>
        ))}
      </div>
    </div>
  );
}

// ================= Data =================
const NAV = [
  { id: "work", label: "Work", num: "01" },
  { id: "experience", label: "Experience", num: "02" },
  { id: "contact", label: "Contact", num: "03" },
];

const PROJECTS = [
  {
    tag: "Website Development · Client Project",
    title: "YOYO Fitness Center",
    blurb:
      "A fitness-center website currently in development. Project details, final features, and the live release will be shared soon.",
    stack: ["Responsive Website", "Modern UI", "In Progress"],
    techSummary: "A responsive client website in progress, with the final service, booking, and visual-system details to be released at launch.",
    status: "COMING SOON",
  },
  {
    tag: "AI · Desktop · BUILT PROJECT",
    title: "R.A.V.A.N.A.",
    blurb:
      "A voice-driven AI desktop assistant with a glassmorphic UI, wake-word activation, and goodbye-triggered shutdown handling.",
    stack: ["Python", "Speech Recognition", "AI Integration"],
    techSummary: "Python coordinates voice input, speech recognition, and AI responses inside a desktop-assistant workflow.",
    github: "https://github.com/Jeevan2401/ravana-ai-asistant",
  },
  {
    tag: "AI · Final Year Project · BUILT PROJECT",
    title: "TruthLens",
    blurb:
      "A fake news detection system trained on a ~54k-article dataset, shipped as a Flask app with a Chrome extension and Docker packaging.",
    stack: ["Flask", "scikit-learn", "Chrome Extension", "Docker"],
    techSummary: "A Flask delivery layer connects a scikit-learn classifier to a browser extension, packaged for repeatable setup with Docker.",
    github: "https://github.com/Jeevan2401/truthlens-fake-news-detector",
  },
  {
    tag: "Computer Vision · BUILT PROJECT",
    title: "Doomscroll Detector",
    blurb:
      "A phone-in-hand / doomscroll monitor built with real-time computer vision to nudge you off your screen when it catches you scrolling too long.",
    stack: ["Python", "OpenCV", "MediaPipe"],
    techSummary: "Python combines OpenCV image handling with MediaPipe landmarks to detect phone-in-hand behavior in real time.",
    github: "https://github.com/Jeevan2401/doomscroll-detector",
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Development Intern",
    org: "NoviTech R&D Private Limited",
    period: "JULY 2026",
    desc:
      "Building and shipping full-stack features end to end — from API design to UI — inside a small, fast-moving R&D team.",
    points: [
      "Shipped production features across the stack under real deadlines",
      "Worked directly with APIs, databases, and deployment pipelines",
    ],
  },
  {
    role: "Computer Science Student",
    org: "SRM Arts and Science College",
    period: "Ongoing",
    desc:
      "Coursework and independent projects spanning full-stack web development, systems programming, and applied cryptography.",
    points: [
      "Self-directed builds in Python and the React/Express ecosystem",
      "Focus on turning coursework into shippable, real projects",
    ],
  },
];

const STATS = [
  { value: "04", label: "PROJECT LOGS" },
  { value: "WEB", label: "RESPONSIVE FIRST" },
  { value: "DESIGN", label: "TO LAUNCH" },
];

function getFormError(field, value) {
  const trimmed = value.trim();
  if (!trimmed) return `${field[0].toUpperCase()}${field.slice(1)} is required.`;
  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Enter a valid email address.";
  if (field === "message" && trimmed.length < 12) return "Add a little more detail so I can understand the idea.";
  return "";
}

function SectionRouteMark({ align = "right" }) {
  return (
    <div aria-hidden style={{ position: "absolute", top: 30, [align]: "6vw", display: "flex", gap: 4, opacity: 0.75, pointerEvents: "none" }}>
      <span style={{ display: "block", width: 24, height: 2, background: ACCENT, boxShadow: "0 7px 0 #ffffff33" }} />
      <span style={{ display: "block", width: 7, height: 9, borderLeft: `1px solid ${ACCENT}`, borderBottom: `1px solid ${ACCENT}` }} />
    </div>
  );
}

// ================= Main =================
export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileCardOpen, setProfileCardOpen] = useState(false);
  const [profileCardFlipped, setProfileCardFlipped] = useState(false);
  const [shareStatus, setShareStatus] = useState("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [formStatus, setFormStatus] = useState("idle"); // idle | validation | sending | success | error
  const name = useGlitchText("JEEVAN", { active: loaded, speed: 26, loopEvery: 9000 });
  const progress = useScrollProgress();
  const parallax = useMouseParallax(24);
  const cardAudioContextRef = useRef(null);
  const shareTimerRef = useRef(null);

  const handleFormChange = (e) => {
    const { name: field, value } = e.target;
    setForm((f) => ({ ...f, [field]: value }));
    if (touched[field]) setFormErrors((errors) => ({ ...errors, [field]: getFormError(field, value) }));
    if (formStatus !== "idle") setFormStatus("idle");
  };

  const handleFieldBlur = (e) => {
    const { name: field, value } = e.target;
    setTouched((fields) => ({ ...fields, [field]: true }));
    setFormErrors((errors) => ({ ...errors, [field]: getFormError(field, value) }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = Object.keys(form).reduce((errors, field) => ({ ...errors, [field]: getFormError(field, form[field]) }), {});
    setTouched({ name: true, email: true, message: true });
    setFormErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      setFormStatus("validation");
      return;
    }
    setFormStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          subject: `New portfolio message from ${form.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTouched({ name: false, email: false, message: false });
        setFormErrors({ name: "", email: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const restorePageScroll = () => {
      root.style.overflow = "auto";
      root.style.overflowX = "hidden";
      root.style.overflowY = "auto";
      root.style.overscrollBehavior = "auto";
      body.style.overflow = "auto";
      body.style.overflowX = "hidden";
      body.style.overflowY = "auto";
      body.style.overscrollBehavior = "auto";
      body.style.touchAction = "auto";
    };
    if (!introDone) {
      root.style.overflow = "hidden";
      root.style.overflowY = "hidden";
      root.style.overscrollBehavior = "none";
      body.style.overflow = "hidden";
      body.style.overflowY = "hidden";
      body.style.overscrollBehavior = "none";
      body.style.touchAction = "none";
      return;
    }
    restorePageScroll();
    const unlockFrame = requestAnimationFrame(restorePageScroll);
    const unlockTimer = setTimeout(restorePageScroll, 90);
    const t = setTimeout(() => setLoaded(true), 150);
    return () => {
      cancelAnimationFrame(unlockFrame);
      clearTimeout(unlockTimer);
      clearTimeout(t);
    };
  }, [introDone]);


  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleProfileCard = () => {
    if (profileCardOpen) setProfileCardFlipped(false);
    setProfileCardOpen((open) => !open);
  };

  const closeProfileCard = () => {
    setProfileCardFlipped(false);
    setProfileCardOpen(false);
  };

  const playCardSwoosh = () => {
    if (typeof window === "undefined") return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!cardAudioContextRef.current) cardAudioContextRef.current = new AudioContextClass();
    const context = cardAudioContextRef.current;
    if (context.state === "suspended") context.resume().catch(() => {});
    const now = context.currentTime;
    const gain = context.createGain();
    const tone = context.createOscillator();
    const air = context.createOscillator();
    tone.type = "triangle";
    air.type = "sine";
    tone.frequency.setValueAtTime(220, now);
    tone.frequency.exponentialRampToValueAtTime(720, now + 0.24);
    air.frequency.setValueAtTime(490, now);
    air.frequency.exponentialRampToValueAtTime(920, now + 0.2);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.026, now + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.29);
    tone.connect(gain);
    air.connect(gain);
    gain.connect(context.destination);
    tone.start(now);
    air.start(now);
    tone.stop(now + 0.3);
    air.stop(now + 0.3);
  };

  const flipProfileCard = () => {
    playCardSwoosh();
    setProfileCardFlipped((flipped) => !flipped);
  };

  const handleProfileShare = async () => {
    if (typeof window === "undefined") return;
    const shareData = {
      title: "Jeevan G. — Website Developer",
      text: "Explore Jeevan G.'s website developer profile.",
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("shared");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setShareStatus("copied");
      } else {
        setShareStatus("copy-unavailable");
      }
    } catch (error) {
      if (error?.name === "AbortError") return;
      setShareStatus("copy-unavailable");
    }
    if (shareTimerRef.current) clearTimeout(shareTimerRef.current);
    shareTimerRef.current = setTimeout(() => setShareStatus("idle"), 2600);
  };

  return (
    <div
      style={{
        background: "#0a0a0b",
        color: "#f2f0ec",
        fontFamily: "'Inter', system-ui, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        cursor: "default",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; width: 100%; max-width: 100%; overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        #root { overflow-x: hidden; max-width: 100vw; }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .display { font-family: 'Space Grotesk', sans-serif; }
        ::selection { background: ${ACCENT}; color: #0a0a0b; }
        a { color: inherit; text-decoration: none; }
        .identity-trigger { width: 34px; height: 34px; padding: 0; border: 1px solid ${ACCENT}; color: ${ACCENT}; background: #0a0a0bcc; cursor: pointer; position: relative; isolation: isolate; box-shadow: 5px 5px 0 #e0322c2b, inset 0 0 0 1px #ffffff0c; }
        .identity-trigger::after { content: ''; position: absolute; right: -2px; bottom: 5px; width: 16px; height: 2px; background: ${ACCENT}; box-shadow: -8px -5px 0 #f2f0ec; opacity: .9; pointer-events: none; }
        .identity-trigger__coin { position: absolute; inset: 4px; display: grid; place-items: center; border: 1px solid #e0322c88; color: ${ACCENT}; font: 600 12px/1 'JetBrains Mono', monospace; letter-spacing: 1px; transform-style: preserve-3d; animation: identityOrbit 8s linear infinite; }
        .identity-trigger:hover, .identity-trigger:focus-visible, .identity-trigger[aria-expanded='true'] { border-color: #f2f0ec; color: #f2f0ec; outline: none; box-shadow: 0 0 0 3px #e0322c33, 5px 5px 0 #e0322c55; }
        .identity-trigger:active { transform: scale(.96); }
        .identity-trigger__caption { position: absolute; left: 48px; top: 50%; color: #8b8b90; white-space: nowrap; opacity: 0; transform: translate(-4px, -50%); pointer-events: none; transition: opacity 160ms ease, transform 160ms cubic-bezier(.16,.84,.44,1); font: 500 9px/1 'JetBrains Mono', monospace; letter-spacing: .12em; }
        .identity-trigger:hover .identity-trigger__caption, .identity-trigger:focus-visible .identity-trigger__caption { opacity: 1; transform: translate(0, -50%); }
        @keyframes identityOrbit { from { transform: rotate(-7deg); } to { transform: rotate(353deg); } }
        @keyframes profileCardEnter { from { opacity: 0; transform: translateY(-10px) rotateX(-4deg) scale(.97); } to { opacity: 1; transform: translateY(0) rotateX(0) scale(1); } }
        .profile-card { position: fixed; z-index: 75; top: 72px; left: 20px; width: min(292px, calc(100vw - 40px)); padding: 10px; overflow: hidden; background: linear-gradient(145deg, #171719 0%, #0b0b0c 65%); border: 1px solid #e0322cdd; box-shadow: 0 0 0 1px #e0322c22, 0 0 20px #e0322c28, 14px 16px 0 #050506, 0 18px 50px #00000077, inset 0 0 0 1px #ffffff0b; animation: profileCardEnter 360ms cubic-bezier(.16,.84,.44,1) both; transform-origin: top left; touch-action: pan-y; overscroll-behavior: auto; }
        .profile-card::before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .55; background: linear-gradient(112deg, transparent 0 42%, #e0322c1c 46%, transparent 53%), repeating-linear-gradient(0deg, transparent 0 22px, #ffffff05 23px 24px); }
        .profile-card__topline { position: relative; z-index: 3; }
        .profile-card__topline { display: flex; align-items: center; justify-content: space-between; min-height: 18px; color: #c9c9cc; font: 500 9px/1 'JetBrains Mono', monospace; letter-spacing: .14em; }
        .profile-card__close { width: 24px; height: 24px; padding: 0; border: 1px solid #ffffff33; color: #b8b8bd; background: #0a0a0ba8; cursor: pointer; font: 500 12px/1 'JetBrains Mono', monospace; }
        .profile-card__close:hover, .profile-card__close:focus-visible { color: #f2f0ec; border-color: ${ACCENT}; outline: none; }
        .profile-card__scene { position: relative; z-index: 1; display: block; width: 100%; height: 392px; margin-top: 9px; padding: 0; color: inherit; text-align: left; border: 0; background: transparent; cursor: pointer; perspective: 1000px; transform-style: preserve-3d; touch-action: pan-y; }
        .profile-card__scene:focus-visible { outline: 2px solid #f2f0ec; outline-offset: 4px; }
        .profile-card__flipper { position: relative; display: block; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform 460ms cubic-bezier(.16,.84,.44,1); }
        .profile-card__scene[data-flipped='true'] .profile-card__flipper { transform: rotateY(180deg); transition-duration: 640ms; }
        .profile-card__face { position: absolute; inset: 0; display: block; overflow: hidden; padding: 10px; border: 1px solid #ffffff20; background: linear-gradient(145deg, #141416 0%, #09090a 100%); backface-visibility: hidden; -webkit-backface-visibility: hidden; box-shadow: inset 0 0 0 1px #ffffff06; }
        .profile-card__face--back { transform: rotateY(180deg); background: linear-gradient(145deg, #181416 0%, #0b0b0d 64%, #131014 100%); }
        .profile-card__face::before { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .55; background: linear-gradient(125deg, transparent 0 37%, #e0322c18 38% 39%, transparent 40% 61%, #63c8ff16 62% 63%, transparent 64%), repeating-linear-gradient(0deg, transparent 0 24px, #ffffff05 25px 26px); }
        .profile-card__face > * { position: relative; z-index: 1; }
        .profile-card__art { position: relative; display: block; aspect-ratio: 1.12; overflow: hidden; border: 1px solid #ffffff20; background: #161618; }
        .profile-card__art::before { content: 'JG // PROFILE'; position: absolute; z-index: 2; top: 9px; left: 9px; padding: 5px 6px; color: #f2f0ec; background: #0a0a0bd1; border-left: 2px solid ${ACCENT}; font: 500 8px/1 'JetBrains Mono', monospace; letter-spacing: .12em; }
        .profile-card__art::after { content: ''; position: absolute; z-index: 1; inset: 0; pointer-events: none; background: linear-gradient(180deg, transparent 52%, #050506dd 100%), linear-gradient(110deg, transparent 36%, #e0322c2b 55%, transparent 67%); mix-blend-mode: screen; }
        .profile-card__art img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: 50% 18%; filter: contrast(1.02) saturate(.88); }
        .profile-card__identity { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin: 12px 2px 0; }
        .profile-card__name { margin: 0; color: #f2f0ec; font: 700 23px/.95 'Space Grotesk', sans-serif; letter-spacing: -.06em; }
        .profile-card__rank { color: ${ACCENT}; font: 500 9px/1 'JetBrains Mono', monospace; letter-spacing: .12em; white-space: nowrap; }
        .profile-card__role { position: relative; z-index: 1; display: block; margin: 7px 2px 0; color: #b8b8bd; font: 500 9px/1.45 'JetBrains Mono', monospace; letter-spacing: .08em; }
        .profile-card__stats { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-top: 12px; }
        .profile-card__stat { min-width: 0; padding: 8px; border: 1px solid #ffffff18; background: #ffffff05; }
        .profile-card__stat b { display: block; color: ${ACCENT}; font: 600 8px/1 'JetBrains Mono', monospace; letter-spacing: .1em; }
        .profile-card__stat span { display: block; margin-top: 5px; color: #e4e4e6; font: 500 10px/1.2 'JetBrains Mono', monospace; letter-spacing: .04em; }
        .profile-card__note { display: block; margin: 11px 2px 1px; color: #7f7f85; font: 500 8px/1.35 'JetBrains Mono', monospace; letter-spacing: .08em; }
        .profile-card__backhead { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; padding-bottom: 10px; border-bottom: 1px solid #ffffff18; }
        .profile-card__backhead b { color: #f2f0ec; font: 700 17px/1 'Space Grotesk', sans-serif; letter-spacing: -.04em; }
        .profile-card__backhead span { color: ${ACCENT}; font: 500 8px/1 'JetBrains Mono', monospace; letter-spacing: .12em; }
        .profile-card__skillset { display: grid; gap: 8px; margin-top: 12px; }
        .profile-card__skillrow { display: grid; grid-template-columns: 64px 1fr; gap: 8px; align-items: start; padding: 8px 0; border-bottom: 1px solid #ffffff10; }
        .profile-card__skillrow b { color: ${ACCENT}; font: 500 8px/1.2 'JetBrains Mono', monospace; letter-spacing: .11em; }
        .profile-card__skillrow span { color: #d5d5d8; font: 500 9px/1.4 'JetBrains Mono', monospace; letter-spacing: .02em; }
        .profile-card__backstats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; margin-top: 13px; }
        .profile-card__backstat { padding: 8px 6px; border: 1px solid #ffffff1c; background: #ffffff05; text-align: center; }
        .profile-card__backstat b { display: block; color: #f2f0ec; font: 700 17px/.9 'Space Grotesk', sans-serif; letter-spacing: -.06em; }
        .profile-card__backstat span { display: block; margin-top: 5px; color: #89898f; font: 500 7px/1.25 'JetBrains Mono', monospace; letter-spacing: .07em; }
        .profile-card__flip-hint { display: block; margin-top: 13px; color: ${ACCENT}; font: 500 8px/1.3 'JetBrains Mono', monospace; letter-spacing: .1em; }
        .profile-card__share { position: relative; z-index: 3; display: flex; align-items: center; gap: 8px; margin-top: 10px; }
        .profile-card__share-button { flex: 1; min-height: 34px; padding: 9px 10px; border: 1px solid ${ACCENT}; color: #f2f0ec; background: #e0322c12; cursor: pointer; font: 500 9px/1 'JetBrains Mono', monospace; letter-spacing: .11em; transition: background 180ms ease, color 180ms ease, transform 160ms cubic-bezier(.16,.84,.44,1); }
        .profile-card__share-button:hover, .profile-card__share-button:focus-visible { background: ${ACCENT}; color: #0a0a0b; outline: none; }
        .profile-card__share-button:active { transform: scale(.98); }
        .profile-card__share-status { min-width: 66px; color: #98989e; font: 500 8px/1.25 'JetBrains Mono', monospace; letter-spacing: .08em; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
        .portfolio-hero::after { content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .22; background: linear-gradient(105deg, transparent 0 42%, #e0322c0a 48%, transparent 58%), repeating-linear-gradient(0deg, transparent 0 28px, #ffffff05 29px 30px); mix-blend-mode: screen; }
        .hero-signal { position: absolute; z-index: 1; top: 14%; right: 6vw; width: min(34vw, 460px); aspect-ratio: 1.12; pointer-events: none; opacity: .42; border-right: 1px solid #e0322c55; border-bottom: 1px solid #e0322c55; background: linear-gradient(135deg, transparent 0 35%, #e0322c0d 35% 36%, transparent 36% 62%, #ffffff08 62% 63%, transparent 63%), repeating-linear-gradient(90deg, transparent 0 48px, #ffffff06 49px 50px); }
        .hero-signal::before { content: attr(data-mark); position: absolute; right: 8%; top: 6%; color: ${ACCENT}; font: 700 clamp(110px, 17vw, 260px)/.78 'Space Grotesk', sans-serif; letter-spacing: -.12em; opacity: .12; transform: skewX(-10deg); }
        .hero-signal::after { content: ''; position: absolute; right: 0; top: 0; width: 56px; height: 34px; border-top: 2px solid ${ACCENT}; border-right: 2px solid ${ACCENT}; box-shadow: -22px 16px 0 -1px #f2f0ec; opacity: .72; }
        .proj-card { position: relative; overflow: hidden; transition: border-color 220ms ease, background 220ms ease, box-shadow 220ms ease; }
        .proj-card::after { content: ''; position: absolute; top: 12px; right: 12px; width: 16px; height: 12px; border-top: 1px solid #e0322c66; border-right: 1px solid #e0322c66; opacity: .6; pointer-events: none; transition: opacity 220ms ease, transform 220ms ease; }
        .proj-card::before { content: ''; position: absolute; left: 12px; bottom: 12px; width: 18px; height: 12px; border-left: 1px solid #e0322c55; border-bottom: 1px solid #e0322c55; pointer-events: none; opacity: .72; }
        .proj-card:hover::after, .proj-card:focus-visible::after, .proj-card:focus-within::after { opacity: 1; transform: translate(-2px, 2px); }
        .proj-card:hover, .proj-card:focus-visible, .proj-card:focus-within { border-color: ${ACCENT}88 !important; background: #171719 !important; box-shadow: 0 20px 46px rgba(0,0,0,.24), inset 3px 0 0 ${ACCENT}; outline: none; }
        .proj-tech-reveal { max-height: 0; opacity: 0; overflow: hidden; transform: translateY(5px); transition: max-height 260ms cubic-bezier(.16,.84,.44,1), opacity 180ms ease, transform 260ms cubic-bezier(.16,.84,.44,1); }
        .proj-card:hover .proj-tech-reveal, .proj-card:focus-visible .proj-tech-reveal, .proj-card:focus-within .proj-tech-reveal { max-height: 78px; opacity: 1; transform: translateY(0); }
        .proj-tech-reveal__label { display: block; margin-top: 15px; color: ${ACCENT}; font: 500 9.5px/1 "JetBrains Mono", monospace; letter-spacing: .13em; }
        .proj-tech-reveal__copy { display: block; margin-top: 6px; color: #b8b8bd; font-size: 12px; line-height: 1.55; }
        .contact-module { position: relative; overflow: hidden; }
        .contact-module::before, .contact-module::after { content: ''; position: absolute; width: 18px; height: 12px; pointer-events: none; opacity: .62; }
        .contact-module::before { left: 12px; top: 12px; border-top: 1px solid ${ACCENT}; border-left: 1px solid ${ACCENT}; }
        .contact-module::after { right: 12px; bottom: 12px; border-right: 1px solid ${ACCENT}; border-bottom: 1px solid ${ACCENT}; }
        .contact-whatsapp { position: relative; overflow: hidden; isolation: isolate; transition: background 180ms ease, border-color 180ms ease, transform 160ms cubic-bezier(.16,.84,.44,1), box-shadow 180ms ease; }
        .contact-whatsapp::before { content: ''; position: absolute; z-index: 0; inset: 0; background: linear-gradient(108deg, transparent 0 37%, ${ACCENT}d9 45%, ${ACCENT}f2 58%, transparent 68%); transform: translateX(-116%); transition: transform 440ms cubic-bezier(.16,.84,.44,1); }
        .contact-whatsapp svg, .contact-whatsapp__copy, .contact-whatsapp__arrow { position: relative; z-index: 1; transition: transform 240ms cubic-bezier(.16,.84,.44,1), color 180ms ease; }
        .contact-whatsapp:hover, .contact-whatsapp:focus-visible { background: ${ACCENT}24 !important; border-color: ${ACCENT} !important; box-shadow: 0 12px 26px -12px ${ACCENT}dd; outline: none; }
        .contact-whatsapp:hover::before, .contact-whatsapp:focus-visible::before { transform: translateX(116%); }
        .contact-whatsapp:hover svg, .contact-whatsapp:focus-visible svg { transform: rotate(-10deg) scale(1.13); }
        .contact-whatsapp:hover .contact-whatsapp__copy, .contact-whatsapp:focus-visible .contact-whatsapp__copy { transform: translateX(3px); }
        .contact-whatsapp:hover .contact-whatsapp__arrow, .contact-whatsapp:focus-visible .contact-whatsapp__arrow { transform: translate(4px, -2px); }
        .contact-whatsapp:active { transform: scale(.98); }
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-form-row { grid-template-columns: 1fr !important; }
          .proj-tech-reveal { max-height: 78px; opacity: 1; transform: none; }
          .portfolio-hero { min-height: 100svh !important; justify-content: center !important; padding: 104px 20px 88px !important; }
          .hero-eyebrow { font-size: 9px !important; letter-spacing: 1.8px !important; margin-bottom: 15px !important; }
          .hero-title { font-size: clamp(48px, 18vw, 72px) !important; }
          .hero-copy { max-width: 31ch !important; margin-top: 18px !important; font-size: 14px !important; line-height: 1.55 !important; }
          .hero-actions { gap: 10px !important; margin-top: 22px !important; }
          .hero-actions button { padding: 12px 14px !important; font-size: 10px !important; }
          .identity-trigger { width: 38px !important; height: 38px !important; }
          .profile-card { top: 74px; left: 14px; width: min(286px, calc(100vw - 28px)); }
          .hero-signal { right: -8vw; top: 8%; width: 66vw; opacity: .3; }
        }
        button, a.cursor-hover, .send-btn, input, textarea {
          border-radius: 10px;
        }

        .nav-link { position: relative; }
        .nav-link::after {
          content: ''; position: absolute; left: 0; bottom: -4px; height: 1px; width: 0;
          background: ${ACCENT}; transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        .proj-card { transition: border-color 0.3s ease, box-shadow 0.3s ease; }
        .proj-card:hover { border-color: ${ACCENT}88; box-shadow: 0 20px 50px -20px ${ACCENT}55; }

        .send-btn { transition: background 0.25s ease, box-shadow 0.25s ease; }
        .send-btn:hover { background: #ff3b33; box-shadow: 0 8px 24px -6px ${ACCENT}aa; }

        input, textarea { font-family: 'Inter', sans-serif; transition: border-color 0.25s ease, box-shadow 0.25s ease; }
        input:focus, textarea:focus { outline: none; border-color: ${ACCENT} !important; box-shadow: 0 0 0 3px ${ACCENT}22; }
        .field-message { min-height: 17px; margin-top: 6px; color: #8b8b90; font: 500 10.5px/1.4 'JetBrains Mono', monospace; letter-spacing: .1px; }
        .field-message--error { color: ${ACCENT}; }
        @keyframes formSuccessIn {
          from { opacity: 0; transform: translateY(8px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .form-success { display: flex; align-items: center; gap: 9px; padding: 11px 13px; border: 1px solid #3ddc844d; background: #3ddc8410; animation: formSuccessIn .42s cubic-bezier(.16,.84,.44,1) both; }
        .form-success__mark { display: grid; place-items: center; width: 18px; height: 18px; flex: 0 0 auto; border-radius: 50%; background: #3ddc84; color: #0a0a0b; font-size: 12px; font-weight: 700; }

        @keyframes flicker {
          0%, 100% { opacity: 1; } 92% { opacity: 1; } 93% { opacity: 0.35; } 94% { opacity: 1; }
        }
        .flicker { animation: flicker 6s infinite; }

        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(61,220,132,0.6); }
          70% { box-shadow: 0 0 0 8px rgba(61,220,132,0); }
          100% { box-shadow: 0 0 0 0 rgba(61,220,132,0); }
        }
        .pulse-dot { animation: pulseDot 2s infinite; }

        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        .float { animation: floatY 5s ease-in-out infinite; }

        @keyframes spinSlow {
          from { transform: rotate(0deg); } to { transform: rotate(360deg); }
        }
        .spin-slow { animation: spinSlow 14s linear infinite; }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .scanline { animation: scanline 5s linear infinite; }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .gradient-anim {
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .menu-item {
          animation: fadeInUp 0.5s cubic-bezier(.16,.84,.44,1) both;
        }

        @media (pointer: coarse) {
          .hide-mobile-cursor-fx { display: none !important; }
          .identity-trigger__caption { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .identity-trigger__coin { animation: none; transform: rotate(-7deg); }
          .profile-card { animation-duration: 1ms; }
          .profile-card__flipper, .profile-card__scene[data-flipped='true'] .profile-card__flipper { transition-duration: 1ms; transform: none; }
          .profile-card__scene[data-flipped='true'] .profile-card__face--front { display: none; }
          .profile-card__scene[data-flipped='true'] .profile-card__face--back { display: block; transform: none; }
        }
      `}</style>

      {!introDone && <BMWIntro onComplete={() => setIntroDone(true)} />}
      <CustomCursor />

      {/* ---------- SCROLL PROGRESS ---------- */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: 2,
          width: `${progress * 100}%`,
          background: ACCENT,
          zIndex: 60,
          transition: "width 0.08s linear",
        }}
      />

      {/* ---------- NAV ---------- */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 20px",
          background: "linear-gradient(#0a0a0bcc, transparent)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Magnetic strength={8}>
          <button
            type="button"
            className="identity-trigger"
            aria-expanded={profileCardOpen}
            aria-controls="profile-card"
            aria-label={profileCardOpen ? "Close Jeevan profile card" : "Open Jeevan profile card"}
            onClick={toggleProfileCard}
          >
            <span className="identity-trigger__coin" aria-hidden>JG</span>
            <span className="identity-trigger__caption" aria-hidden>PROFILE CARD</span>
          </button>
        </Magnetic>
        <Magnetic strength={10} as="button" onClick={() => setMenuOpen((v) => !v)}
          className="mono"
          style={{
            background: "transparent",
            border: `1px solid #ffffff33`,
            color: "#f2f0ec",
            fontSize: 12,
            letterSpacing: 1.5,
            padding: "9px 14px",
            cursor: "pointer",
          }}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </Magnetic>
      </header>

      {profileCardOpen && (
        <aside id="profile-card" className="profile-card" aria-label="Jeevan profile card">
          <div className="profile-card__topline">
            <span>{profileCardFlipped ? "TECHNICAL LOADOUT // 02" : "DEVELOPER PROFILE // 01"}</span>
            <button type="button" className="profile-card__close" onClick={closeProfileCard} aria-label="Close profile card">×</button>
          </div>
          <button
            type="button"
            className="profile-card__scene"
            data-flipped={profileCardFlipped}
            aria-pressed={profileCardFlipped}
            aria-label={profileCardFlipped ? "Technical skills and statistics shown. Activate to return to the portrait." : "Portrait shown. Activate to reveal detailed technical skills and statistics."}
            onClick={flipProfileCard}
          >
            <span className="profile-card__flipper">
              <span className="profile-card__face profile-card__face--front">
                <span className="profile-card__art"><img src={PROFILE_CARD_IMAGE} alt="Portrait of Jeevan G." /></span>
                <span className="profile-card__identity">
                  <span className="profile-card__name">Jeevan G.</span>
                  <span className="profile-card__rank">JG // 01</span>
                </span>
                <span className="profile-card__role">WEBSITE DEVELOPER · COMPUTER SCIENCE STUDENT</span>
                <span className="profile-card__stats" aria-label="Profile specialties">
                  <span className="profile-card__stat"><b>BUILD TYPE</b><span>Websites</span></span>
                  <span className="profile-card__stat"><b>FOCUS</b><span>Responsive UX</span></span>
                </span>
                <span className="profile-card__note">ACTIVATE CARD // TECHNICAL LOADOUT</span>
              </span>
              <span className="profile-card__face profile-card__face--back">
                <span className="profile-card__backhead"><b>Technical Skills</b><span>BACK // 02</span></span>
                <span className="profile-card__skillset">
                  <span className="profile-card__skillrow"><b>PYTHON</b><span>Project-based · AI, desktop, and vision builds</span></span>
                  <span className="profile-card__skillrow"><b>JAVASCRIPT</b><span>Active · React and Vite web interfaces</span></span>
                  <span className="profile-card__skillrow"><b>HTML + CSS</b><span>Active · responsive layouts and interaction styling</span></span>
                  <span className="profile-card__skillrow"><b>SQL</b><span>Learning path · data-aware full-stack work</span></span>
                </span>
                <span className="profile-card__backstats" aria-label="Portfolio statistics">
                  <span className="profile-card__backstat"><b>03</b><span>ACTIVE LANGUAGES</span></span>
                  <span className="profile-card__backstat"><b>04</b><span>PROJECT LOGS</span></span>
                  <span className="profile-card__backstat"><b>01</b><span>LEARNING PATH</span></span>
                </span>
                <span className="profile-card__flip-hint">ACTIVATE CARD // PORTRAIT FACE</span>
              </span>
            </span>
          </button>
          <div className="profile-card__share">
            <button type="button" className="profile-card__share-button" onClick={handleProfileShare}>SHARE PROFILE ↗</button>
            <output className="profile-card__share-status" aria-live="polite">
              {shareStatus === "shared" ? "SHARED" : shareStatus === "copied" ? "LINK COPIED" : shareStatus === "copy-unavailable" ? "UNAVAILABLE" : ""}
            </output>
          </div>
        </aside>
      )}

      {/* ---------- FULLSCREEN MENU ---------- */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "#0a0a0bf5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 8vw",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.55s cubic-bezier(.76,0,.24,1)",
        }}
      >
        {NAV.map((n, i) => (
          <button
            type="button"
            key={n.id}
            onClick={() => scrollTo(n.id)}
            className="menu-item"
            style={{
              display: "flex",
              width: "100%",
              alignItems: "baseline",
              gap: 16,
              padding: "18px 0",
              borderBottom: "1px solid #ffffff14",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              background: "transparent",
              color: "inherit",
              textAlign: "left",
              cursor: "pointer",
              animationDelay: menuOpen ? `${i * 90}ms` : "0ms",
            }}
          >
            <span className="mono" style={{ color: ACCENT, fontSize: 13 }}>
              {n.num}
            </span>
            <span
              className="display"
              style={{ fontSize: "clamp(28px,6vw,56px)", fontWeight: 700, transition: "transform 0.3s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateX(14px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateX(0)")}
            >
              {n.label}
            </span>
          </button>
        ))}
        <div style={{ marginTop: 30, display: "flex", gap: 14, flexWrap: "wrap" }}>
          {[
            { icon: GitHubIcon, href: LINKS.github, label: "GitHub" },
            { icon: LinkedInIcon, href: LINKS.linkedin, label: "LinkedIn" },
            { icon: EmailIcon, href: LINKS.email, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="cursor-hover"
              style={{
                width: 38,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ffffff22",
                borderRadius: 8,
                color: "#8b8b90",
              }}
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>

      {/* ---------- HERO ---------- */}
      <section
        id="top"
        className="portfolio-hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 6vw",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <ParticleField />
        <div className="hero-signal" data-mark="JG" aria-hidden="true" />
        <div
          aria-hidden
          className="gradient-anim"
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 30% 30%, ${ACCENT}22, transparent 45%), radial-gradient(circle at 70% 70%, ${ACCENT}18, transparent 40%)`,
            transform: `translate(${parallax.x}px, ${parallax.y}px)`,
            transition: "transform 0.2s ease-out",
            pointerEvents: "none",
          }}
        />
        <div
          className="scanline"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "30%",
            background: `linear-gradient(${ACCENT}0d, transparent)`,
            pointerEvents: "none",
          }}
        />

        <div className="mono flicker hero-eyebrow" style={{ color: ACCENT, fontSize: 12, letterSpacing: 3, marginBottom: 18, position: "relative" }}>
          WEBSITE DEVELOPER · COMPUTER SCIENCE STUDENT
        </div>
        <h1
          className="display hero-title"
          style={{
            fontSize: "clamp(52px, 14vw, 150px)",
            fontWeight: 700,
            lineHeight: 0.92,
            letterSpacing: -2,
            margin: 0,
            wordBreak: "break-word",
            position: "relative",
            transform: `translate(${parallax.x * 0.3}px, ${parallax.y * 0.3}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          <AnimatedName text={name} />
        </h1>
        <p
          className="hero-copy"
          style={{
            maxWidth: 520,
            color: "#b9b9be",
            fontSize: 16,
            lineHeight: 1.6,
            marginTop: 22,
            position: "relative",
            opacity: 1,
            transform: "translateY(0)",
          }}
        >
          Website developer building responsive, practical digital experiences. Computer Science student, independent builder, focused on work that ships.
        </p>
        <div
          className="hero-actions"
          style={{
            display: "flex",
            gap: 14,
            marginTop: 34,
            flexWrap: "wrap",
            position: "relative",
            opacity: 1,
            transform: "translateY(0)",
          }}
        >
          <Magnetic strength={20} as="button" onClick={() => scrollTo("work")}
            className="mono send-btn"
            style={{
              background: ACCENT,
              color: "#0a0a0b",
              border: "none",
              padding: "13px 22px",
              fontSize: 12,
              letterSpacing: 1.5,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            OPEN PROJECT LOG →
          </Magnetic>
          <Magnetic strength={20} as="button" onClick={() => scrollTo("contact")}
            className="mono"
            style={{
              background: "transparent",
              color: "#f2f0ec",
              border: "1px solid #ffffff33",
              padding: "13px 22px",
              fontSize: 12,
              letterSpacing: 1.5,
              cursor: "pointer",
            }}
          >
            START A WEBSITE
          </Magnetic>
        </div>

        <div
          className="mono float"
          style={{
            position: "absolute",
            bottom: 26,
            left: "6vw",
            fontSize: 11,
            color: "#63636a",
            letterSpacing: 2,
          }}
        >
          SCROLL ↓
        </div>
      </section>

      <Marquee text="WEBSITES · RESPONSIVE EXPERIENCES · REACT · PYTHON · AI · SHIPPING" speed={20} />

      {/* ---------- PHILOSOPHY ---------- */}
      <section
        style={{
          padding: "10vh 6vw",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid #ffffff14",
        }}
      >
        <div
          aria-hidden
          className="float"
          style={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            width: 520,
            height: 520,
            transform: "translateX(-50%)",
            background: `radial-gradient(circle at 50% 50%, ${ACCENT}55, transparent 70%)`,
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />
        <Reveal>
          <div className="mono" style={{ color: ACCENT, fontSize: 12, letterSpacing: 3, marginBottom: 14 }}>
            THE PHILOSOPHY
          </div>
        </Reveal>
        <p
          className="display"
          style={{
            fontSize: "clamp(24px, 4vw, 42px)",
            fontWeight: 500,
            lineHeight: 1.35,
            maxWidth: 780,
            margin: 0,
            position: "relative",
            zIndex: 1,
          }}
        >
          <StaggerText text="I build websites by working across design and development — deciding how an experience should look, feel, and work — " />
          <span style={{ color: ACCENT }}>
            <StaggerText text="not just something that ships." startDelay={900} />
          </span>
        </p>
        <Reveal delay={160}>
          <p style={{ color: "#8b8b90", maxWidth: 560, marginTop: 24, lineHeight: 1.7, fontSize: 15 }}>
            I build business sites, portfolios, landing pages, responsive web experiences, and AI-powered ideas. Still early in the career; committed to useful builds, clean handoffs, and work finished end to end.
          </p>
        </Reveal>

        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 60,
            flexWrap: "wrap",
          }}
        >
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div>
                <div className="display" style={{ fontSize: 38, fontWeight: 700, color: ACCENT, letterSpacing: -1 }}>
                  {s.value}
                </div>
                <div className="mono" style={{ fontSize: 11, letterSpacing: 1, color: "#8b8b90", marginTop: 4 }}>
                  {s.label.toUpperCase()}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- WORK ---------- */}
      <section id="work" style={{ padding: "10vh 6vw", borderTop: "1px solid #ffffff14", position: "relative", overflow: "hidden" }}>
        <SectionRouteMark />
        <Reveal>
          <div className="mono" style={{ color: ACCENT, fontSize: 12, letterSpacing: 3, marginBottom: 10 }}>
            — FEATURED WORK
          </div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="display" style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 700, margin: "0 0 40px" }}>
            Selected Projects
          </h2>
        </Reveal>
        <div className="mono" style={{ display: "inline-flex", alignItems: "center", gap: 10, margin: "-22px 0 28px", paddingTop: 10, borderTop: "1px solid #ffffff1a", color: "#8b8b90", fontSize: 10, letterSpacing: 1.2 }}>
          <span style={{ display: "inline-block", width: 18, height: 2, background: ACCENT, boxShadow: "7px -4px 0 #f2f0ec" }} />
          BUILD ARCHIVE · {String(PROJECTS.length).padStart(2, "0")} ENTRIES
        </div>
        <div
          className="project-archive-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <TiltCard>
                <div
                  className="proj-card"
                  tabIndex={0}
                  style={{
                    border: "1px solid #ffffff1a",
                    background: "#131315",
                    padding: 26,
                    height: "100%",
                    minHeight: 210,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                      <div className="mono" style={{ fontSize: 11, color: ACCENT, letterSpacing: 1.5 }}>
                        {p.tag}
                      </div>
                      {p.status ? (
                        <span className="mono" style={{ color: "#f2f0ec", border: `1px solid ${ACCENT}88`, background: `${ACCENT}12`, padding: "5px 7px", fontSize: 9, letterSpacing: 1.1 }}>
                          {p.status}
                        </span>
                      ) : p.github && (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="cursor-hover"
                          aria-label={`${p.title} on GitHub`}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 30,
                            height: 30,
                            borderRadius: 8,
                            border: "1px solid #ffffff22",
                            color: "#a3a3a8",
                            transition: "color 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = ACCENT;
                            e.currentTarget.style.borderColor = `${ACCENT}88`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#a3a3a8";
                            e.currentTarget.style.borderColor = "#ffffff22";
                          }}
                        >
                          <GitHubIcon size={15} />
                        </a>
                      )}
                    </div>
                    <h3 className="display" style={{ fontSize: 22, margin: "0 0 10px", fontWeight: 700 }}>
                      {p.title}
                    </h3>
                    <p style={{ color: "#a3a3a8", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                      {p.blurb}
                    </p>
                    <div className="proj-tech-reveal">
                      <span className="proj-tech-reveal__label">TECH SNAPSHOT</span>
                      <span className="proj-tech-reveal__copy">{p.techSummary}</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
                      {p.stack.map((s) => (
                        <span
                          key={s}
                          className="mono"
                          style={{
                            fontSize: 10.5,
                            letterSpacing: 0.5,
                            color: "#8b8b90",
                            border: "1px solid #ffffff22",
                            padding: "4px 8px",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        className="mono cursor-hover"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          marginTop: 16,
                          fontSize: 11.5,
                          letterSpacing: 0.5,
                          color: ACCENT,
                        }}
                      >
                        View source <ArrowUpRightIcon size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- EXPERIENCE ---------- */}
      <section id="experience" style={{ padding: "10vh 6vw", borderTop: "1px solid #ffffff14", position: "relative", overflow: "hidden" }}>
        <SectionRouteMark align="left" />
        <Reveal>
          <div className="mono" style={{ color: ACCENT, fontSize: 12, letterSpacing: 3, marginBottom: 10 }}>
            — WHERE THE WORK HAPPENS
          </div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="display" style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 700, margin: "0 0 40px" }}>
            Experience
          </h2>
        </Reveal>
        <div style={{ maxWidth: 760, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 55,
              top: 0,
              bottom: 0,
              width: 1,
              background: `linear-gradient(${ACCENT}, transparent)`,
            }}
          />
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.role} delay={i * 100}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "110px 1fr",
                  gap: 20,
                  padding: "28px 0",
                  borderTop: i === 0 ? "1px solid #ffffff1a" : "1px solid #ffffff14",
                  position: "relative",
                }}
              >
                <div className="mono" style={{ color: "#63636a", fontSize: 12, letterSpacing: 1 }}>
                  {e.period}
                </div>
                <div
                  className="pulse-dot"
                  style={{
                    position: "absolute",
                    left: 51,
                    top: 34,
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: "#3ddc84",
                  }}
                />
                <div>
                  <h3 className="display" style={{ fontSize: 20, fontWeight: 700, margin: "0 0 4px" }}>
                    {e.role}
                  </h3>
                  <div style={{ color: ACCENT, fontSize: 13, marginBottom: 12 }}>{e.org}</div>
                  <p style={{ color: "#a3a3a8", fontSize: 14, lineHeight: 1.65, margin: "0 0 12px" }}>
                    {e.desc}
                  </p>
                  <ul style={{ margin: 0, paddingLeft: 18, color: "#8b8b90", fontSize: 13.5, lineHeight: 1.8 }}>
                    {e.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- CONTACT ---------- */}
      <section id="contact" style={{ padding: "10vh 6vw", borderTop: "1px solid #ffffff14", position: "relative", overflow: "hidden" }}>
        <SectionRouteMark />
        <Reveal>
          <div className="mono" style={{ color: ACCENT, fontSize: 12, letterSpacing: 3, marginBottom: 10 }}>
            — GET IN TOUCH
          </div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="display" style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 700, margin: "0 0 40px" }}>
              Have a responsive website in mind?
          </h2>
        </Reveal>

        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(220px, 320px) 1fr",
            gap: 24,
          }}
        >
          <Reveal delay={80}>
            <div className="contact-module" style={{ border: "1px solid #ffffff1a", background: "#131315", padding: 24, height: "100%" }}>
              <div className="mono" style={{ fontSize: 11, letterSpacing: 1.5, color: "#8b8b90", marginBottom: 8 }}>
                AVAILABILITY
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 26 }}>
                <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#3ddc84" }} />
                <span style={{ fontSize: 14 }}>Open to website projects &amp; collaborations</span>
              </div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: 1.5, color: "#8b8b90", marginBottom: 10 }}>
                SOCIALS
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 26 }}>
                {[
                  { icon: GitHubIcon, href: LINKS.github, label: "GitHub" },
                  { icon: LinkedInIcon, href: LINKS.linkedin, label: "LinkedIn" },
                  { icon: EmailIcon, href: LINKS.email, label: "Email" },
                ].map((s) => (
                  <Magnetic key={s.label} strength={16} as="a" href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                    className="cursor-hover"
                    aria-label={s.label}
                    style={{
                      width: 34,
                      height: 34,
                      border: "1px solid #ffffff22",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <s.icon size={15} />
                  </Magnetic>
                ))}
              </div>
              <div className="mono" style={{ color: "#8b8b90", fontSize: 10, letterSpacing: 1.25, lineHeight: 1.55, marginBottom: 10 }}>
                FAST PROJECT BRIEF · TYPICAL RESPONSE WITHIN 24 HOURS
              </div>
              <Magnetic strength={12} as="a" href={LINKS.whatsapp} target="_blank" rel="noreferrer"
                className="mono cursor-hover contact-whatsapp"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 9,
                  width: "100%",
                  border: `1px solid ${ACCENT}88`,
                  background: `${ACCENT}12`,
                  color: "#f2f0ec",
                  padding: "12px 14px",
                  fontSize: 11,
                  letterSpacing: 1.1,
                  marginBottom: 10,
                }}
              >
                <WhatsAppIcon size={16} color={ACCENT} />
                <span className="contact-whatsapp__copy">WHATSAPP // QUICK PROJECT BRIEF</span>
                <span className="contact-whatsapp__arrow" aria-hidden="true">↗</span>
              </Magnetic>
              <Magnetic strength={12} as="a" href={RESUME_DATA_URL} download="Jeevan_Resume.pdf"
                className="mono cursor-hover send-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: ACCENT,
                  color: "#0a0a0b",
                  border: "none",
                  padding: "13px 20px",
                  fontSize: 12,
                  letterSpacing: 1,
                  fontWeight: 600,
                  marginTop: 6,
                }}
              >
                OPEN RÉSUMÉ FILE →
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <form
              onSubmit={handleFormSubmit}
              noValidate
              className="contact-module"
              style={{
                border: "1px solid #ffffff1a",
                background: "#131315",
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div className="mono" style={{ color: "#8b8b90", fontSize: 10, letterSpacing: 1.25, marginBottom: 2 }}>
                PROJECT BRIEF // RESPONSE BY EMAIL
              </div>
              <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    onBlur={handleFieldBlur}
                    placeholder="Your name"
                    aria-invalid={Boolean(touched.name && formErrors.name)}
                    aria-describedby="name-feedback"
                    style={{
                      width: "100%",
                      background: "#0a0a0b",
                      border: `1px solid ${touched.name && formErrors.name ? ACCENT : "#ffffff22"}`,
                      color: "#f2f0ec",
                      padding: "12px 14px",
                      fontSize: 14,
                    }}
                  />
                  <div id="name-feedback" className={`field-message ${touched.name && formErrors.name ? "field-message--error" : ""}`} aria-live="polite">{touched.name ? formErrors.name : ""}</div>
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleFormChange}
                    onBlur={handleFieldBlur}
                    placeholder="Your email"
                    aria-invalid={Boolean(touched.email && formErrors.email)}
                    aria-describedby="email-feedback"
                    style={{
                      width: "100%",
                      background: "#0a0a0b",
                      border: `1px solid ${touched.email && formErrors.email ? ACCENT : "#ffffff22"}`,
                      color: "#f2f0ec",
                      padding: "12px 14px",
                      fontSize: 14,
                    }}
                  />
                  <div id="email-feedback" className={`field-message ${touched.email && formErrors.email ? "field-message--error" : ""}`} aria-live="polite">{touched.email ? formErrors.email : ""}</div>
                </div>
              </div>
              <div>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleFormChange}
                  onBlur={handleFieldBlur}
                  placeholder="Have an idea for a website? Let's turn it into something people want to use."
                  aria-invalid={Boolean(touched.message && formErrors.message)}
                  aria-describedby="message-feedback"
                  rows={5}
                  style={{
                    width: "100%",
                    background: "#0a0a0b",
                    border: `1px solid ${touched.message && formErrors.message ? ACCENT : "#ffffff22"}`,
                    color: "#f2f0ec",
                    padding: "12px 14px",
                    fontSize: 14,
                    resize: "vertical",
                  }}
                />
                <div id="message-feedback" className={`field-message ${touched.message && formErrors.message ? "field-message--error" : ""}`} aria-live="polite">{touched.message ? formErrors.message : ""}</div>
              </div>
              <Magnetic strength={14} as="button"
                type="submit"
                disabled={formStatus === "sending"}
                className="mono send-btn"
                style={{
                  alignSelf: "flex-start",
                  background: ACCENT,
                  color: "#0a0a0b",
                  border: "none",
                  padding: "13px 22px",
                  fontSize: 12,
                  letterSpacing: 1.5,
                  fontWeight: 600,
                  cursor: formStatus === "sending" ? "default" : "pointer",
                  opacity: formStatus === "sending" ? 0.6 : 1,
                }}
              >
                {formStatus === "sending" ? "SENDING..." : "SEND MESSAGE →"}
              </Magnetic>
              {formStatus === "success" && (
                <div className="form-success mono" role="status" aria-live="polite" style={{ fontSize: 12, color: "#d8ffe9", letterSpacing: 0.3 }}>
                  <span className="form-success__mark" aria-hidden="true">✓</span>
                  <span>Message received — I’ll get back to you soon.</span>
                </div>
              )}
              {formStatus === "error" && (
                <div className="mono" style={{ fontSize: 12.5, color: ACCENT, letterSpacing: 0.3 }}>
                  ✕ That did not send. Please try again in a moment.
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer
        className="mono"
        style={{
          borderTop: "1px solid #ffffff14",
          padding: "22px 6vw",
          fontSize: 11.5,
          color: "#63636a",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <span>© 2026 Jeevan G. Crafted with care.</span>
        <span>Built with Obsession</span>
      </footer>
    </div>
  );
}
