"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

/* ---------- MARQUEE ---------- */
function Marquee() {
  const items = [
    "Health Economics", "Health Policy", "Biotech", "Health Administration",
    "Free Resources", "Find Your Path", "No Cost", "Student-Built",
    "Weekly Digest", "For Every Student",
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "var(--ink)", overflow: "hidden", padding: "14px 0", borderTop: "1px solid #222", borderBottom: "1px solid #1A2D3A" }}>
      <div className="marquee-track" style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 24,
            fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: i % 5 === 2 ? "var(--amber-light)" : "rgba(255,255,255,0.7)",
            padding: "0 24px", whiteSpace: "nowrap",
          }}>
            {item}
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--forest-light)", display: "inline-block", flexShrink: 0 }} />
          </span>
        ))}
      </div>
    </div>
  );
}

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
        <text fontFamily="Syne, sans-serif" fontSize="9.5" fontWeight="700" letterSpacing="1" fill="var(--forest)" textAnchor="start">
          <textPath href="#circlePath">{text}{text}</textPath>
        </text>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--forest)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
          🌱
        </div>
      </div>
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
  policy: {
    title: "Health Policy",
    desc: "You want to change the system from within. From Medicaid to the ACA, you understand that policy shapes who gets care.",
    color: "#3E1B4D",
    emoji: "⚖️",
  },
  economics: {
    title: "Health Economics",
    desc: "You want to understand the money. Why does insulin cost so much? You're determined to figure it out — and fix it.",
    color: "#2596be",
    emoji: "📊",
  },
  biotech: {
    title: "Biotech & Health Tech",
    desc: "You want to build the future. AI diagnostics, telemedicine, gene therapy — you're drawn to what's next.",
    color: "#1A6B8A",
    emoji: "🔬",
  },
  admin: {
    title: "Health Administration",
    desc: "You want to make things run right. Operations, leadership, and systems efficiency are your strengths.",
    color: "#3D5A80",
    emoji: "🏥",
  },
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
          <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20, color: "var(--ink)", marginBottom: 8 }}>3 questions. 60 seconds.</p>
          <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 380 }}>
            Discover which healthcare career path fits you: Policy, Administration, Biotech, or Health Economics.
          </p>
        </div>
        <button onClick={() => setStep(1)} style={{
          background: "var(--forest)", color: "white", padding: "13px 28px", borderRadius: 4,
          border: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13,
          letterSpacing: "0.08em", textTransform: "uppercase" as const, cursor: "pointer", transition: "background 0.2s",
        }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--forest-light)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--forest)"; }}
        >
          Start Quiz →
        </button>
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
        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>Your path</p>
        <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 26, color: "white", marginBottom: 14 }}>{r.title}</p>
        <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.65, marginBottom: 28 }}>{r.desc}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/pathways" style={{
            background: "white", color: r.color, padding: "10px 22px", borderRadius: 4,
            fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12,
            letterSpacing: "0.08em", textTransform: "uppercase" as const, textDecoration: "none",
          }}>Explore Path</Link>
          <button onClick={reset} style={{
            background: "rgba(255,255,255,0.15)", color: "white", padding: "10px 22px", borderRadius: 4,
            border: "1px solid rgba(255,255,255,0.3)", fontFamily: "Syne, sans-serif", fontWeight: 700,
            fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" as const, cursor: "pointer",
          }}>Retake</button>
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
      <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(17px, 2.5vw, 21px)", color: "var(--ink)", textAlign: "center", marginBottom: 28, letterSpacing: "-0.01em" }}>{q.q}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map(opt => (
          <button key={opt.value} onClick={() => handleAnswer(opt.value)} style={{
            background: "white", border: "1.5px solid var(--border)", borderRadius: 10,
            padding: "15px 20px", textAlign: "left" as const,
            fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15,
            color: "var(--text-muted)", cursor: "pointer", transition: "all 0.15s",
          }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--forest)"; el.style.color = "var(--ink)"; el.style.transform = "translateX(4px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border)"; el.style.color = "var(--text-muted)"; el.style.transform = "";
            }}
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
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [email, setEmail] = useState("");
  const [subDone, setSubDone] = useState(false);

  return (
    <>
      {/* ══════════════════════ HERO ══════════════════════ */}
      <section ref={heroRef} style={{ minHeight: "100svh", background: "var(--cream)", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", paddingTop: 68 }}>
        

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="hero-inner">
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "72px 40px 64px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--mint)", color: "var(--forest)", padding: "7px 16px", borderRadius: 50, fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 36 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--forest-muted)", display: "inline-block" }} />
              Free for all students · No login required
            </motion.div>

            <div style={{ marginBottom: 32 }}>
              <div style={{ overflow: "hidden", marginBottom: 4 }}>
                <motion.h1 initial={{ y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(40px, 7vw, 76px)", lineHeight: 0.95, letterSpacing: "-0.03em", color: "var(--ink)", margin: 0 }}>
                  Understanding healthcare
                </motion.h1>
              </div>
              <div style={{ overflow: "hidden" }}>
                <motion.h1 initial={{ y: 48, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.65, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
                  style={{ fontFamily: "DM Serif Display, serif", fontStyle: "italic", fontWeight: 400, fontSize: "clamp(40px, 7vw, 76px)", lineHeight: 1.0, letterSpacing: "-0.02em", color: "var(--forest)", margin: 0 }}>
                  shouldn&apos;t be this hard.
                </motion.h1>
              </div>
            </div>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.65 }}
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 17, color: "var(--text-muted)", lineHeight: 1.75, maxWidth: 520, marginBottom: 40 }}>
              HealthBridge is the free toolkit for students who want to fix healthcare — starting with their own career path.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.78 }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 64 }}>
              <Link href="/quiz" style={{
                display: "inline-flex", alignItems: "center", gap: 10, background: "var(--ink)", color: "white",
                padding: "14px 28px", borderRadius: 4, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13,
                letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--forest)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--ink)"; }}
              >
                Find Your Path
                <svg width="15" height="15" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link href="/resources" style={{
                display: "inline-flex", alignItems: "center", gap: 10, background: "transparent", color: "var(--ink)",
                padding: "13px 28px", borderRadius: 4, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13,
                letterSpacing: "0.07em", textTransform: "uppercase", textDecoration: "none", border: "1.5px solid var(--border)", transition: "border-color 0.2s",
              }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--ink)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                Browse Resources
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.95 }}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 0, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
              {[
                { value: "100%", label: "Free resources" },
                { value: "4", label: "Career paths" },
                { value: "0", label: "Barriers to access" },
              ].map((s, i) => (
                <div key={s.label} style={{ flex: 1, textAlign: "center", padding: "0 24px", borderRight: i < 2 ? "1px solid var(--border)" : "none" }}>
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.03em", color: "var(--forest)", lineHeight: 1, marginBottom: 4 }}>{s.value}</p>
                  <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 13, color: "var(--text-light)" }}>{s.label}</p>
                </div>
              ))}
              <div style={{ paddingLeft: 32, borderLeft: "1px solid var(--border)" }}>
                <RotatingBadge />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════ MARQUEE ══════════════════════ */}
      <Marquee />

      {/* ══════════════════════ TOPICS ══════════════════════ */}
      <section style={{ background: "var(--cream)", padding: "96px 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ maxWidth: 600, marginBottom: 56 }}>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 10 }}>
              What we cover
            </p>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 46px)", letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.05, marginBottom: 16 }}>
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
                  padding: "36px 32px 28px", textDecoration: "none", height: "100%",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = ""; el.style.boxShadow = ""; }}
                >
                  <span style={{ fontSize: 36, display: "block", marginBottom: 20 }}>{topic.emoji}</span>
                  <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20, color: topic.color, marginBottom: 10, letterSpacing: "-0.01em" }}>{topic.label}</p>
                  <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.6, flex: 1, marginBottom: 20 }}>{topic.desc}</p>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: topic.color, display: "inline-flex", alignItems: "center", gap: 6 }}>
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
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 10 }}>
              Career quiz
            </p>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 46px)", letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.05, marginBottom: 16 }}>
              Find your path.
            </h2>
            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>
              Take our 3-question quiz to discover which healthcare career fits you.
            </p>
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
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 10 }}>The Library</p>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1 }}>Start reading.</h2>
            </div>
            <Link href="/resources" style={{
              fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
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
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 13, color: "var(--border)", letterSpacing: "0.04em" }}>{r.num}</span>
                  <div>
                    <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--ink)", marginBottom: 4, letterSpacing: "-0.01em" }}>{r.title}</p>
                    <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14, color: "var(--text-muted)" }}>{r.desc}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--forest)", background: "var(--mint)", padding: "4px 12px", borderRadius: 2, whiteSpace: "nowrap" }}>{r.cat}</span>
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
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>
              Weekly digest
            </p>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(32px, 5vw, 52px)", letterSpacing: "-0.02em", color: "white", lineHeight: 1.05, marginBottom: 16 }}>
              Stay in the loop.
            </h2>
            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 16, color: "rgba(255,255,255,0.7)", lineHeight: 1.75, maxWidth: 460, margin: "0 auto 40px" }}>
              One healthcare topic explained simply, plus curated opportunities for students — straight to your inbox every week.
            </p>

            {subDone ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "20px 32px", display: "inline-block" }}>
                <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 16, color: "white" }}>
                  ✓ You&apos;re in — see you next week.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubDone(true); }}
                style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 460, margin: "0 auto" }}>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  style={{ width: "100%", padding: "14px 20px", border: "none", outline: "none", fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, color: "var(--ink)", background: "white", borderRadius: 6, boxShadow: "0 4px 24px rgba(0,0,0,0.15)" }}
                />
                <button type="submit" style={{
                  background: "var(--ink)", color: "white", padding: "14px 24px", border: "none",
                  fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.06em",
                  textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap", transition: "background 0.2s",
                  borderRadius: 6, width: "100%",
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--forest-light)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--ink)"; }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ BOTTOM MARQUEE ══════════════════════ */}
      <div style={{ background: "var(--ink)", overflow: "hidden", padding: "16px 0", borderTop: "1px solid #1A2D3A" }}>
        <div className="marquee-track" style={{ display: "flex", alignItems: "center" }}>
          {[...Array(20)].map((_, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 24,
              fontFamily: "DM Serif Display, serif", fontStyle: "italic", fontSize: 22,
              color: i % 3 === 0 ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
              padding: "0 28px", whiteSpace: "nowrap",
            }}>
              {i % 2 === 0 ? "Healthcare for everyone." : "No barriers."}
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--forest-light)", display: "inline-block", flexShrink: 0 }} />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-inner > div { flex-direction: column !important; padding: 0 24px !important; }
          .topics-grid { grid-template-columns: 1fr !important; }
          .join-grid { grid-template-columns: 1fr !important; }
          section { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}
