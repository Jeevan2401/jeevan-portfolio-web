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
function ArrowUpRightIcon({ size = 14, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H8M17 7V16" />
    </svg>
  );
}

const RESUME_DATA_URL = "/manus-storage/Jeevan_Resume_f783bfa1.pdf";
const LINKS = {
  github: "https://github.com/Jeevan2401",
  linkedin: "https://www.linkedin.com/in/jeevan-g-42a264373/",
  email: "mailto:jeevan24012007@gmail.com",
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
    tag: "AI · Desktop · BUILT PROJECT",
    title: "R.A.V.A.N.A.",
    blurb:
      "A voice-driven AI desktop assistant with a glassmorphic UI, wake-word activation, and goodbye-triggered shutdown handling.",
    stack: ["Python", "Speech Recognition", "AI Integration"],
    github: "https://github.com/Jeevan2401/ravana-ai-asistant",
  },
  {
    tag: "AI · Final Year Project · BUILT PROJECT",
    title: "TruthLens",
    blurb:
      "A fake news detection system trained on a ~54k-article dataset, shipped as a Flask app with a Chrome extension and Docker packaging.",
    stack: ["Flask", "scikit-learn", "Chrome Extension", "Docker"],
    github: "https://github.com/Jeevan2401/truthlens-fake-news-detector",
  },
  {
    tag: "Computer Vision · BUILT PROJECT",
    title: "Doomscroll Detector",
    blurb:
      "A phone-in-hand / doomscroll monitor built with real-time computer vision to nudge you off your screen when it catches you scrolling too long.",
    stack: ["Python", "OpenCV", "MediaPipe"],
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
  { n: 4, suffix: "+", label: "Projects Shipped" },
  { n: 400, suffix: "+", label: "Hours of Practice" },
  { n: 3, suffix: "", label: "Stacks Mastered" },
];

// ================= Main =================
export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error
  const name = useGlitchText("JEEVAN", { active: loaded, speed: 26, loopEvery: 9000 });
  const progress = useScrollProgress();
  const parallax = useMouseParallax(24);

  const handleFormChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setFormStatus("error");
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
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  useEffect(() => {
    if (!introDone) return;
    document.body.style.overflow = "";
    const t = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(t);
  }, [introDone]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
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
        @media (max-width: 640px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-form-row { grid-template-columns: 1fr !important; }
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
        <Magnetic strength={14}>
          <div
            className="mono spin-slow"
            style={{
              width: 34,
              height: 34,
              border: `1px solid ${ACCENT}`,
              color: ACCENT,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 1,
              borderRadius: 5,
              position: "relative",
              overflow: "hidden",
              transform: "rotate(-7deg)",
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>JG</span>
            <span aria-hidden style={{ position: "absolute", left: -2, bottom: 5, width: 13, height: 2, background: ACCENT, boxShadow: `8px -4px 0 ${ACCENT}` }} />
          </div>
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
          <div
            key={n.id}
            onClick={() => scrollTo(n.id)}
            className="menu-item"
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              padding: "18px 0",
              borderBottom: "1px solid #ffffff14",
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
          </div>
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

        <div className="mono flicker" style={{ color: ACCENT, fontSize: 12, letterSpacing: 3, marginBottom: 18, position: "relative" }}>
          WEBSITE DEVELOPER · COMPUTER SCIENCE STUDENT
        </div>
        <h1
          className="display"
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
          style={{
            maxWidth: 520,
            color: "#b9b9be",
            fontSize: 16,
            lineHeight: 1.6,
            marginTop: 22,
            position: "relative",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.8s ease 1.1s, transform 0.8s ease 1.1s",
          }}
        >
          Website developer building responsive, practical digital experiences. Computer Science student, independent builder, focused on work that ships.
        </p>
        <div
          style={{
            display: "flex",
            gap: 14,
            marginTop: 34,
            flexWrap: "wrap",
            position: "relative",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.8s ease 1.3s, transform 0.8s ease 1.3s",
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
            EXPLORE WORK →
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
            LET'S TALK
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
                <div className="display" style={{ fontSize: 44, fontWeight: 700, color: ACCENT }}>
                  <Counter to={s.n} suffix={s.suffix} />
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
      <section id="work" style={{ padding: "10vh 6vw", borderTop: "1px solid #ffffff14" }}>
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
        <div
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
                      {p.github && (
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
      <section id="experience" style={{ padding: "10vh 6vw", borderTop: "1px solid #ffffff14" }}>
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
      <section id="contact" style={{ padding: "10vh 6vw", borderTop: "1px solid #ffffff14" }}>
        <Reveal>
          <div className="mono" style={{ color: ACCENT, fontSize: 12, letterSpacing: 3, marginBottom: 10 }}>
            — GET IN TOUCH
          </div>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="display" style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 700, margin: "0 0 40px" }}>
            Have a website in mind?
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
            <div style={{ border: "1px solid #ffffff1a", background: "#131315", padding: 24, height: "100%" }}>
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
                Know My Full Story →
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <form
              onSubmit={handleFormSubmit}
              style={{
                border: "1px solid #ffffff1a",
                background: "#131315",
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  style={{
                    background: "#0a0a0b",
                    border: "1px solid #ffffff22",
                    color: "#f2f0ec",
                    padding: "12px 14px",
                    fontSize: 14,
                  }}
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleFormChange}
                  placeholder="Your email"
                  style={{
                    background: "#0a0a0b",
                    border: "1px solid #ffffff22",
                    color: "#f2f0ec",
                    padding: "12px 14px",
                    fontSize: 14,
                  }}
                />
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleFormChange}
                  placeholder="Have an idea for a website? Let's turn it into something people want to use."
                rows={5}
                style={{
                  background: "#0a0a0b",
                  border: "1px solid #ffffff22",
                  color: "#f2f0ec",
                  padding: "12px 14px",
                  fontSize: 14,
                  resize: "vertical",
                }}
              />
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
                <div className="mono" style={{ fontSize: 12.5, color: "#3ddc84", letterSpacing: 0.3 }}>
                  ✓ Message sent — I'll get back to you soon.
                </div>
              )}
              {formStatus === "error" && (
                <div className="mono" style={{ fontSize: 12.5, color: ACCENT, letterSpacing: 0.3 }}>
                  ✕ Please fill every field, or try again in a moment.
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
