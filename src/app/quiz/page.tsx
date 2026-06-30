"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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

export default function QuizPage() {
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

  return (
    <main style={{ minHeight: "100svh", background: "var(--cream-dark)", paddingTop: 68, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ maxWidth: 640, width: "100%", padding: "80px 40px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 56 }}>
          <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: 10 }}>Career quiz</p>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px, 4vw, 46px)", letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.05, marginBottom: 16 }}>Find your path.</h1>
          <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 16, color: "var(--text-muted)", lineHeight: 1.75 }}>Take our 3-question quiz to discover which healthcare career fits you.</p>
        </motion.div>

        {step === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <span style={{ fontSize: 52 }}>🧭</span>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20, color: "var(--ink)", marginBottom: 8 }}>3 questions. 60 seconds.</p>
              <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, color: "var(--text-muted)", lineHeight: 1.65, maxWidth: 380 }}>Discover which healthcare career path fits you: Policy, Administration, Biotech, or Health Economics.</p>
            </div>
            <button onClick={() => setStep(1)} style={{ background: "var(--forest)", color: "white", padding: "13px 28px", borderRadius: 4, border: "none", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
              Start Quiz →
            </button>
          </motion.div>
        )}

        {step > 0 && step < 4 && (
          <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} style={{ maxWidth: 520, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 36 }}>
              {[1, 2, 3].map(n => (
                <div key={n} style={{ width: 48, height: 3, borderRadius: 2, background: n <= step ? "var(--forest)" : "var(--border)", transition: "background 0.3s" }} />
              ))}
            </div>
            <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(17px, 2.5vw, 21px)", color: "var(--ink)", textAlign: "center", marginBottom: 28 }}>{quizQuestions[step - 1].q}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {quizQuestions[step - 1].options.map(opt => (
                <button key={opt.value} onClick={() => handleAnswer(opt.value)} style={{ background: "white", border: "1.5px solid var(--border)", borderRadius: 10, padding: "15px 20px", textAlign: "left", fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, color: "var(--text-muted)", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--forest)"; el.style.color = "var(--ink)"; el.style.transform = "translateX(4px)"; }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-muted)"; el.style.transform = ""; }}
                >{opt.label}</button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (() => {
          const r = quizResults[getResult(answers)];
          return (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: r.color, borderRadius: 16, padding: "40px 48px", maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
              <span style={{ fontSize: 52, display: "block", marginBottom: 16 }}>{r.emoji}</span>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>Your path</p>
              <p style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 26, color: "white", marginBottom: 14 }}>{r.title}</p>
              <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.65, marginBottom: 28 }}>{r.desc}</p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/pathways" style={{ background: "white", color: r.color, padding: "10px 22px", borderRadius: 4, fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>Explore Path</Link>
                <button onClick={reset} style={{ background: "rgba(255,255,255,0.15)", color: "white", padding: "10px 22px", borderRadius: 4, border: "1px solid rgba(255,255,255,0.3)", fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>Retake</button>
              </div>
            </motion.div>
          );
        })()}
      </div>
    </main>
  );
}
