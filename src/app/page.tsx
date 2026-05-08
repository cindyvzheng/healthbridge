"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

/* ---------- ROTATING BADGE ---------- */
function RotatingBadge() {
  const text = "FREE · FOR ALL STUDENTS · NO BARRIERS · ";
  const radius = 52;
  return (
    <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
      <svg width="120" height="120" viewBox="0 0 120 120" className="spin-slow" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <path id="circlePath" d={`M60,60 m-${radius},0 a${radius},${radius} 0 1,1 ${radius * 2},0 a${radius},${radius} 0 1,1 -${radius * 2},0`} />
        </defs>
        <text fontFamily="Playfair Display, serif" fontSize="9.5" fontWeight="700" letterSpacing="1" fill="rgba(255,255,255,0.5)" textAnchor="start">
          <textPath href="#circlePath">{text}{text}</textPath>
        </text>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
          🌱
        </div>
      </div>
    </div>
  );
}

/* ---------- BRIDGE GRAPHIC ---------- */
function BridgeGraphic() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 540, aspectRatio: "4/3" }}>
      {/* Soft glow behind bridge */}
      <div style={{
        position: "absolute",
        top: "25%", left: "15%", right: "15%", bottom: "5%",
        background: "radial-gradient(ellipse, rgba(255,255,255,0.07) 0%, transparent 70%)",
        filter: "blur(24px)",
        zIndex: 0,
        pointerEvents: "none",
      }} />

      <svg viewBox="0 0 520 390" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}>

        {/* Water shimmer base */}
        <ellipse cx="260" cy="346" rx="215" ry="16" fill="rgba(255,255,255,0.06)" />
        <ellipse cx="260" cy="352" rx="160" ry="10" fill="rgba(255,255,255,0.03)" />

        {/* Bridge road/deck */}
        <rect x="28" y="236" width="464" height="11" rx="5" fill="white" />
        <rect x="28" y="243" width="464" height="4" rx="2" fill="rgba(0,0,0,0.12)" />

        {/* Left tower cables — fan out to left */}
        {[0,1,2,3,4,5,6,7,8,9].map(i => (
          <line key={`lca${i}`} x1="178" y1="64" x2={28 + i * 16} y2="236"
            stroke="rgba(255,255,255,0.28)" strokeWidth="1.3" />
        ))}
        {/* Left tower cables — fan out to right */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={`lcb${i}`} x1="178" y1="64" x2={194 + i * 18} y2="236"
            stroke="rgba(255,255,255,0.28)" strokeWidth="1.3" />
        ))}

        {/* Right tower cables — fan out to right */}
        {[0,1,2,3,4,5,6,7,8,9].map(i => (
          <line key={`rca${i}`} x1="342" y1="64" x2={492 - i * 16} y2="236"
            stroke="rgba(255,255,255,0.28)" strokeWidth="1.3" />
        ))}
        {/* Right tower cables — fan out to left */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={`rcb${i}`} x1="342" y1="64" x2={326 - i * 18} y2="236"
            stroke="rgba(255,255,255,0.28)" strokeWidth="1.3" />
        ))}

        {/* LEFT TOWER */}
        <rect x="169" y="62" width="18" height="178" rx="4" fill="white" />
        {/* Left tower depth shading */}
        <rect x="169" y="62" width="5" height="178" rx="4" fill="rgba(0,0,0,0.1)" />
        {/* Left tower crossbars */}
        <rect x="148" y="114" width="60" height="10" rx="5" fill="white" opacity="0.9" />
        <rect x="153" y="148" width="50" height="8" rx="4" fill="white" opacity="0.7" />
        <rect x="158" y="178" width="40" height="7" rx="3" fill="white" opacity="0.5" />
        {/* Left spire */}
        <polygon points="178,22 169,65 187,65" fill="white" />
        {/* Left spire tip glow */}
        <circle cx="178" cy="22" r="5" fill="white" opacity="0.9" />
        <circle cx="178" cy="22" r="10" fill="white" opacity="0.15" />
        <circle cx="178" cy="22" r="18" fill="white" opacity="0.06" />

        {/* RIGHT TOWER */}
        <rect x="333" y="62" width="18" height="178" rx="4" fill="white" />
        <rect x="333" y="62" width="5" height="178" rx="4" fill="rgba(0,0,0,0.1)" />
        {/* Right tower crossbars */}
        <rect x="312" y="114" width="60" height="10" rx="5" fill="white" opacity="0.9" />
        <rect x="317" y="148" width="50" height="8" rx="4" fill="white" opacity="0.7" />
        <rect x="322" y="178" width="40" height="7" rx="3" fill="white" opacity="0.5" />
        {/* Right spire */}
        <polygon points="342,22 333,65 351,65" fill="white" />
        <circle cx="342" cy="22" r="5" fill="white" opacity="0.9" />
        <circle cx="342" cy="22" r="10" fill="white" opacity="0.15" />
        <circle cx="342" cy="22" r="18" fill="white" opacity="0.06" />

        {/* Main catenary suspension cable */}
        <path d="M 28 144 Q 178 228 260 198 Q 342 168 492 144"
          stroke="rgba(255,255,255,0.5)" strokeWidth="3" fill="none"
          strokeLinecap="round" />
        {/* Shadow cable */}
        <path d="M 28 148 Q 178 232 260 202 Q 342 172 492 148"
          stroke="rgba(0,0,0,0.15)" strokeWidth="2" fill="none" />

        {/* Pillars below deck */}
        <rect x="169" y="247" width="18" height="76" rx="3" fill="rgba(255,255,255,0.3)" />
        <rect x="333" y="247" width="18" height="76" rx="3" fill="rgba(255,255,255,0.3)" />
        {/* Pillar bases */}
        <rect x="155" y="318" width="46" height="9" rx="4" fill="rgba(255,255,255,0.2)" />
        <rect x="319" y="318" width="46" height="9" rx="4" fill="rgba(255,255,255,0.2)" />

        {/* Reflection in water */}
        <path d="M 80 334 Q 190 330 260 332 Q 340 334 440 330"
          stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" fill="none" />
        <path d="M 100 342 Q 200 339 260 341 Q 325 342 420 339"
          stroke="rgba(255,255,255,0.09)" strokeWidth="1" fill="none" />

        {/* Subtle city skyline silhouette in bg */}
        <rect x="50" y="215" width="8" height="22" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="62" y="205" width="10" height="32" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="76" y="210" width="7" height="27" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="418" y="208" width="8" height="29" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="430" y="200" width="10" height="37" rx="1" fill="rgba(255,255,255,0.06)" />
        <rect x="444" y="212" width="7" height="25" rx="1" fill="rgba(255,255,255,0.06)" />
      </svg>
    </div>
  );
}

/* ---------- QUIZ ---------- */
const quizQuestions = [
  {
    q: "What aspect of healthcare interests you most?",
    options: [
      { label: "Laws, policy, and systems", value: "policy" },
      { label: "Costs, insurance, and funding", value: "economics" },
      { label: "Technology and innovation", value: "biotech" },
      { label: "Hospital operations and leadership", value: "admin" },
    ],
  },
  {
    q: "How do you prefer to work?",
    options: [
      { label: "Research, write, and advocate", value: "policy" },
      { label: "Analyze data and patterns", value: "economics" },
      { label: "Build, experiment, and create", value: "biotech" },
      { label: "Plan, lead, and organize", value: "admin" },
    ],
  },
  {
    q: "What impact matters most to you?",
    options: [
      { label: "Changing broken systems", value: "policy" },
      { label: "Making healthcare affordable", value: "economics" },
      { label: "Inventing new treatments", value: "biotech" },
      { label: "Making hospitals run better", value: "admin" },
    ],
  },
];

const quizResults: Record<string, { title: string; desc: string; color: string; emoji: string }> = {
  policy: { title: "Health Policy", desc: "You want to change the system from within. From Medicaid to the ACA, you understand that policy shapes who gets care.", color: "#3E1B4D", emoji: "⚖️" },
  economics: { title: "Health Economics", desc: "You want to understand the money. Why does insulin cost so much? You're determined to figure it out — and fix it.", color: "#2596be", emoji: "📊" },
  biotech: { title: "Biotech & Health Tech", desc: "You want to build the future. AI diagnostics, telemedicine, gene therapy — you're drawn to what's next.", color: "#1A6B8A", emoji: "🔬" },
  admin: { title: "Health Administration", desc: "You want to make things run right. Operations, leadership, and systems efficiency are your strengths.", color: "#3D5A80", emoji: "🏥" },
};

function Quiz() {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const getResult = (ans: string[]) => {
    const counts: Record<string, number> = { policy: 0, economics: 0, biotech: 0, admin: 0 };
    ans.forEach(a => { if (a in counts) counts[a]++; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  };

  const handleAnswer = (val: string) => {
    const na = [...answers, val];
    setAnswers(na);
    setStep(prev => (prev < 3 ? (prev + 1) as 1 | 2 | 3 | 4 : 4));
  };

  const reset = () => { setStep(0); setAnswers([]); };

  if (step === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <span style={{ fontSize: 52 }}>🧭</span>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: 20, color: "var(--ink)", marginBottom: 8 }}>3 questions. 60 seconds.</p>
          <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 380 }}>
            Discover which healthcare career path fits you: Policy, Administration, Biotech, or Health Economics.
          </p>
        </div>
        <button onClick={() => setStep(1)} style={{
          background: "var(--forest)", color: "white", padding: "13px 28px", borderRadius: 4,
          border: "none", fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 13,
          letterSpacing: "0.08em", textTransform: "uppercase" as const, cursor: "pointer", transition: "background 0.2s",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--forest-light)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--forest)"; }}
        >Start Quiz →</button>
      </motion.div>
    );
  }

  if (step === 4) {
    const r = quizResults[getResult(answers)];
    return (
      <motion.div key="result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: r.color, borderRadius: 16, padding: "40px 48px", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
        <span style={{ fontSize: 52, display: "block", marginBottom: 16 }}>{r.emoji}</span>
        <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>Your path</p>
        <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: 26, color: "white", marginBottom: 14 }}>{r.title}</p>
        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.65, marginBottom: 28 }}>{r.desc}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pathways" style={{ background: "white", color: r.color, padding: "10px 22px", borderRadius: 4, fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" as const, textDecoration: "none" }}>Explore Path</Link>
          <button onClick={reset} style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "10px 22px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.3)", fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" as const, cursor: "pointer" }}>Retake</button>
        </div>
      </motion.div>
    );
  }

  const q = quizQuestions[step - 1];
  return (
    <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }} style={{ maxWidth: 520, margin: "0 auto" }}>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 36 }}>
        {[1, 2, 3].map(n => (
          <div key={n} style={{ width: 48, height: 3, borderRadius: 2, background: n <= step ? "var(--forest)" : "var(--border)", transition: "background 0.3s" }} />
        ))}
      </div>
      <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: "clamp(17px, 2.5vw, 21px)", color: "var(--ink)", textAlign: "center", marginBottom: 28, letterSpacing: "-0.01em" }}>{q.q}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map(opt => (
          <button key={opt.value} onClick={() => handleAnswer(opt.value)} style={{
            background: "white", border: "1.5px solid var(--border)", borderRadius: 10,
            padding: "15px 20px", textAlign: "left" as const,
            fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15,
            color: "var(--text-muted)", cursor: "pointer", transition: "all 0.15s",
          }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--forest)"; el.style.color = "var(--ink)"; el.style.transform = "translateX(4px)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-muted)"; el.style.transform = ""; }}
          >{opt.label}</button>
        ))}
      </div>
    </motion.div>
  );
}

/* ---------- MAIN PAGE ---------- */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [email, setEmail] = useState("");
  const [subDone, setSubDone] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      window.open(`https://healthbridge.beehiiv.com/subscribe?email=${encodeURIComponent(email)}`, "_blank");
      setSubDone(true);
    }
  };

  return (
    <>
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section ref={heroRef} style={{
        background: "#0a2e3d",
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
        paddingTop: 68, minHeight: "100svh",
      }}>
        {/* Subtle depth gradient */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 15% 50%, rgba(37,150,190,0.18) 0%, transparent 55%), radial-gradient(ellipse at 85% 30%, rgba(37,150,190,0.10) 0%, transparent 50%)",
        }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{
            maxWidth: 1200, margin: "0 auto", padding: "60px 48px 80px",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center",
          }} className="hero-grid">

            {/* Left — text */}
            <div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.75)", padding: "7px 16px", borderRadius: 50, fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 32, border: "1px solid rgba(255,255,255,0.12)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7ECBA1", display: "inline-block" }} />
                Free for all students · No login required
              </motion.div>

              <div style={{ marginBottom: 28 }}>
                <div style={{ overflow: "hidden", marginBottom: 2 }}>
                  <motion.h1 initial={{ y: 56, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 68px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "white", margin: 0 }}>
                    Understanding
                  </motion.h1>
                </div>
                <div style={{ overflow: "hidden", marginBottom: 2 }}>
                  <motion.h1 initial={{ y: 56, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(36px, 5vw, 68px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "white", margin: 0 }}>
                    healthcare
                  </motion.h1>
                </div>
                <div style={{ overflow: "hidden" }}>
                  <motion.h1 initial={{ y: 56, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontFamily: "DM Serif Display, serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(36px, 5vw, 68px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "rgba(255,255,255,0.45)", margin: 0 }}>
                    shouldn&apos;t be this hard.
                  </motion.h1>
                </div>
              </div>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.68 }}
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 17, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 460, marginBottom: 40 }}>
                HealthBridge is the free toolkit for students who want to fix healthcare — starting with their own career path.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}
                style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 56 }}>
                <Link href="/quiz" style={{
                  display: "inline-flex", alignItems: "center", gap: 10, background: "white", color: "#0a2e3d",
                  padding: "14px 28px", borderRadius: 4, fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 13,
                  letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.2s",
                }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "#d5eef7"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "white"; }}
                >
                  Find Your Path
                  <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
                <Link href="/resources" style={{
                  display: "inline-flex", alignItems: "center", gap: 10, background: "transparent", color: "rgba(255,255,255,0.8)",
                  padding: "13px 28px", borderRadius: 4, fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 13,
                  letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", border: "1.5px solid rgba(255,255,255,0.25)", transition: "border-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.6)"; el.style.color = "white"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(255,255,255,0.25)"; el.style.color = "rgba(255,255,255,0.8)"; }}
                >
                  Browse Resources
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.0 }}
                style={{ display: "flex", alignItems: "center", gap: 0, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                {[
                  { value: "100%", label: "Free resources" },
                  { value: "4", label: "Career paths" },
                  { value: "0", label: "Barriers" },
                ].map((s, i) => (
                  <div key={s.label} style={{ flex: 1, padding: "0 20px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none", paddingLeft: i === 0 ? 0 : 20 }}>
                    <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "-0.03em", color: "white", lineHeight: 1, marginBottom: 4 }}>{s.value}</p>
                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{s.label}</p>
                  </div>
                ))}
                <div style={{ paddingLeft: 20 }}>
                  <RotatingBadge />
                </div>
              </motion.div>
            </div>

            {/* Right — bridge */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              className="hero-graphic"
            >
              <BridgeGraphic />
            </motion.div>
          </div>
        </motion.div>

        {/* Wave cut into cream */}
        <div style={{ position: "absolute", bottom: -2, left: 0, right: 0, zIndex: 2, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80, display: "block" }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--cream)" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════ TOPICS ══════════════════════ */}
      <section style={{ background: "var(--cream)", padding: "96px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ maxWidth: 600, marginBottom: 56 }}>
            <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 10 }}>What we cover</p>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 46px)", letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.05, marginBottom: 16 }}>
              The side of healthcare<br />
              <span style={{ fontFamily: "DM Serif Display, serif", fontStyle: "italic", fontWeight: 400, color: "var(--forest)" }}>no one teaches you.</span>
            </h2>
            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>
              From why prescriptions cost so much to how AI is reshaping hospitals — we break it all down.
            </p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="topics-grid">
            {[
              { emoji: "📊", label: "Health Economics", desc: "Why healthcare costs so much and who actually pays for it.", color: "var(--forest)", bg: "var(--mint)" },
              { emoji: "⚖️", label: "Health Policy", desc: "Medicaid, Medicare, the ACA — explained.", color: "#3E1B4D", bg: "#EAD8F0" },
              { emoji: "🔬", label: "Health Technology", desc: "How AI, telemedicine, and data are changing medicine.", color: "#1A6B8A", bg: "#D5EEF7" },
            ].map((topic, i) => (
              <motion.div key={topic.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link href="/resources" style={{
                  display: "flex", flexDirection: "column", background: topic.bg, borderRadius: 16,
                  padding: "36px 32px 28px", textDecoration: "none", height: "100%", transition: "transform 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = ""; }}
                >
                  <span style={{ fontSize: 36, display: "block", marginBottom: 20 }}>{topic.emoji}</span>
                  <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: 20, color: topic.color, marginBottom: 10, letterSpacing: "-0.01em" }}>{topic.label}</p>
                  <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.6, flex: 1, marginBottom: 20 }}>{topic.desc}</p>
                  <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: topic.color, display: "inline-flex", alignItems: "center", gap: 6 }}>
                    Explore
                    <svg width="13" height="13" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ QUIZ ══════════════════════ */}
      <section id="quiz" style={{ background: "var(--cream-dark)", padding: "96px 40px", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 10 }}>Career quiz</p>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 46px)", letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.05, marginBottom: 16 }}>Find your path.</h2>
            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>Take our 3-question quiz to discover which healthcare career fits you.</p>
          </motion.div>
          <Quiz />
        </div>
      </section>

      {/* ══════════════════════ RESOURCES ══════════════════════ */}
      <section style={{ background: "var(--cream)", padding: "96px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 10 }}>The Library</p>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1 }}>Start reading.</h2>
            </div>
            <Link href="/resources" style={{
              fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
              color: "var(--text-light)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
              border: "1px solid var(--border)", padding: "10px 18px", borderRadius: 4, background: "white", transition: "all 0.2s",
            }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--ink)"; el.style.color = "var(--ink)"; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-light)"; }}
            >
              Full library
              <svg width="14" height="14" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { num: "01", title: "Pre-Med Starter Guide", cat: "Medicine", desc: "MCAT prep, shadowing, and a realistic timeline — all free." },
              { num: "02", title: "Public Health 101", cat: "Public Health", desc: "What it is, what careers exist, and how to get started." },
              { num: "03", title: "Health Policy Careers Explained", cat: "Policy", desc: "From advocacy to think tanks — blending healthcare and law." },
              { num: "04", title: "Scholarships for Pre-Health Students", cat: "All Paths", desc: "Compiled list of financial aid specifically for low-income students." },
              { num: "05", title: "Free Healthcare Volunteering Programs", cat: "All Paths", desc: "Structured programs that don't require prior experience." },
            ].map((r, i) => (
              <motion.div key={r.num} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.07 }}>
                <Link href="/resources" style={{
                  display: "grid", gridTemplateColumns: "56px 1fr auto", alignItems: "center",
                  gap: 24, padding: "24px 8px", borderBottom: "1px solid var(--border)",
                  textDecoration: "none", transition: "background 0.15s", borderRadius: 4,
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(37,150,190,0.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: 13, color: "var(--border)", letterSpacing: "0.04em" }}>{r.num}</span>
                  <div>
                    <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 18, color: "var(--ink)", marginBottom: 4, letterSpacing: "-0.01em" }}>{r.title}</p>
                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14, color: "var(--text-muted)" }}>{r.desc}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--forest)", background: "var(--mint)", padding: "4px 12px", borderRadius: 2, whiteSpace: "nowrap" }}>{r.cat}</span>
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16" style={{ flexShrink: 0, color: "var(--border)" }}><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ NEWSLETTER ══════════════════════ */}
      <section id="newsletter" style={{ background: "var(--forest)", padding: "96px 40px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Weekly digest</p>
            <h2 style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.02em", color: "white", lineHeight: 1.05, marginBottom: 16 }}>Stay in the loop.</h2>
            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 460, margin: "0 auto 40px" }}>
              One healthcare topic explained simply, plus curated opportunities for students — straight to your inbox every week.
            </p>
            {subDone ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "20px 32px", display: "inline-block" }}>
                <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 16, color: "white" }}>
                  ✓ Redirecting you to Beehiiv to confirm your subscription!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 460, margin: "0 auto" }}>
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required
                  style={{ width: "100%", padding: "14px 20px", border: "none", outline: "none", fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, color: "var(--ink)", background: "white", borderRadius: 6, boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
                />
                <button type="submit" style={{
                  background: "var(--ink)", color: "white", padding: "14px 24px", border: "none",
                  fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em",
                  textTransform: "uppercase", cursor: "pointer", transition: "background 0.2s", borderRadius: 6, width: "100%",
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--forest-light)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--ink)"; }}
                >Subscribe</button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-graphic { display: none !important; }
          .topics-grid { grid-template-columns: 1fr !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}
