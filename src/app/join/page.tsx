"use client";
import { useState } from "react";

const roles = [
  {
    id: "content",
    title: "Content Writer",
    emoji: "✍️",
    desc: "Research and write career guides, resource summaries, and pathway content for students.",
    skills: ["Writing", "Research", "Healthcare interest"],
    time: "2-4 hrs/week",
  },
  {
    id: "researcher",
    title: "Researcher",
    emoji: "🔬",
    desc: "Find, verify, and organize free resources, scholarships, and programs for our library.",
    skills: ["Research", "Attention to detail", "Organization"],
    time: "2-3 hrs/week",
  },
  {
    id: "outreach",
    title: "Outreach & Community",
    emoji: "📢",
    desc: "Connect HealthBridge with schools, clubs, and organizations to reach more students who need it.",
    skills: ["Communication", "Networking", "Social media"],
    time: "2-4 hrs/week",
  },
  {
    id: "web",
    title: "Web & Design",
    emoji: "💻",
    desc: "Help build, maintain, and improve the HealthBridge platform and visual design.",
    skills: ["HTML/CSS or design tools", "Problem-solving"],
    time: "3-5 hrs/week",
  },
];

export default function JoinPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    grade: "",
    role: "",
    why: "",
    experience: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: 100 }}>
      {/* Header */}
      <section style={{
        background: "linear-gradient(135deg, var(--forest) 0%, var(--forest-light) 100%)",
        padding: "72px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", top: -40, right: 80, width: 160, height: 160, borderRadius: "50%", background: "rgba(201,106,62,0.15)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.1)",
            color: "white",
            padding: "8px 16px",
            borderRadius: 50,
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 24,
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--terra-light)", display: "inline-block" }} />
            NOW ACCEPTING APPLICATIONS
          </div>
          <h1 style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(38px, 6vw, 64px)",
            fontWeight: 700,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 20,
            maxWidth: 600,
          }}>
            Join the HealthBridge team.
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, lineHeight: 1.7, maxWidth: 520, marginBottom: 32 }}>
            No experience required. We&apos;re a student-led team that values curiosity, care, and commitment — you&apos;ll build real skills while helping others find their path in healthcare.
          </p>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[
              { label: "Volunteer role", sub: "No pay, but real experience" },
              { label: "Remote & flexible", sub: "Work around your schedule" },
              { label: "Students only", sub: "High school & college" },
            ].map(({ label, sub }) => (
              <div key={label}>
                <p style={{ color: "white", fontWeight: 600, fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 15 }}>{label}</p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, fontFamily: "Plus Jakarta Sans, sans-serif" }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 700, color: "var(--forest)", marginBottom: 8 }}>
          Open Roles
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 16, marginBottom: 40 }}>Click a role to pre-select it in the application below.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 64 }}>
          {roles.map((r) => (
            <div
              key={r.id}
              onClick={() => {
                setForm((f) => ({ ...f, role: r.id }));
                document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                background: form.role === r.id ? "var(--forest)" : "white",
                border: `2px solid ${form.role === r.id ? "var(--forest)" : "var(--border)"}`,
                borderRadius: 20,
                padding: 24,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (form.role !== r.id) {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--forest-muted)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (form.role !== r.id) {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }
              }}
            >
              <p style={{ fontSize: 32, marginBottom: 12 }}>{r.emoji}</p>
              <h3 style={{ fontFamily: "Fraunces, serif", fontSize: 19, fontWeight: 600, color: form.role === r.id ? "white" : "var(--forest)", marginBottom: 8 }}>{r.title}</h3>
              <p style={{ color: form.role === r.id ? "rgba(255,255,255,0.75)" : "var(--text-muted)", fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{r.desc}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                {r.skills.map((s) => (
                  <span key={s} style={{
                    fontSize: 12,
                    padding: "3px 10px",
                    borderRadius: 50,
                    background: form.role === r.id ? "rgba(255,255,255,0.15)" : "var(--cream)",
                    color: form.role === r.id ? "rgba(255,255,255,0.9)" : "var(--text-muted)",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}>{s}</span>
                ))}
              </div>
              <p style={{ fontSize: 13, color: form.role === r.id ? "rgba(255,255,255,0.6)" : "var(--text-light)", fontFamily: "Plus Jakarta Sans, sans-serif" }}>⏱ {r.time}</p>
            </div>
          ))}
        </div>

        {/* Application Form */}
        <div id="apply-form" style={{ scrollMarginTop: 120 }}>
          {submitted ? (
            <div style={{
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: 24,
              padding: "72px 48px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 32, color: "var(--forest)", marginBottom: 12 }}>Application received!</h2>
              <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.7, maxWidth: 400, margin: "0 auto 28px" }}>
                Thank you, <strong>{form.name}</strong>. We&apos;ll review your application and be in touch at <strong>{form.email}</strong> within 5–7 days.
              </p>
              <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", grade: "", role: "", why: "", experience: "" }); }} className="btn-secondary">
                Submit another application
              </button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 48 }}>
              {/* Info */}
              <div>
                <h2 style={{ fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 700, color: "var(--forest)", marginBottom: 16 }}>
                  Apply to Join
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
                  We review applications on a rolling basis. If we think you&apos;re a good fit, we&apos;ll reach out within 5–7 days to chat.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    "No experience required",
                    "Flexible time commitment",
                    "Build real portfolio work",
                    "Connect with other student contributors",
                    "Make a genuine impact",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "var(--mint)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <p style={{ color: "var(--text-muted)", fontSize: 15 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} style={{
                background: "white",
                border: "1px solid var(--border)",
                borderRadius: 24,
                padding: "36px",
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--text)", marginBottom: 6, fontFamily: "Plus Jakarta Sans, sans-serif" }}>Full Name *</label>
                    <input required type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-input" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--text)", marginBottom: 6, fontFamily: "Plus Jakarta Sans, sans-serif" }}>Email *</label>
                    <input required type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-input" />
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--text)", marginBottom: 6, fontFamily: "Plus Jakarta Sans, sans-serif" }}>Current Grade / Year *</label>
                  <select required value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} className="form-input">
                    <option value="">Select your grade...</option>
                    <option>High School — 9th grade</option>
                    <option>High School — 10th grade</option>
                    <option>High School — 11th grade</option>
                    <option>High School — 12th grade</option>
                    <option>College — Freshman</option>
                    <option>College — Sophomore</option>
                    <option>College — Junior</option>
                    <option>College — Senior</option>
                  </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--text)", marginBottom: 6, fontFamily: "Plus Jakarta Sans, sans-serif" }}>Role Interest *</label>
                  <select required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="form-input">
                    <option value="">Select a role...</option>
                    {roles.map((r) => <option key={r.id} value={r.id}>{r.title}</option>)}
                    <option value="general">Open to anything</option>
                  </select>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--text)", marginBottom: 6, fontFamily: "Plus Jakarta Sans, sans-serif" }}>Why do you want to join HealthBridge? *</label>
                  <textarea required rows={4} placeholder="Tell us about your interest in healthcare, your community, or why this matters to you..." value={form.why} onChange={(e) => setForm({ ...form, why: e.target.value })} className="form-input" style={{ resize: "vertical" }} />
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 14, color: "var(--text)", marginBottom: 6, fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    Any relevant experience? <span style={{ fontWeight: 400, color: "var(--text-light)" }}>(optional)</span>
                  </label>
                  <textarea rows={3} placeholder="Don't worry if you don't have any — we'll train you." value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="form-input" style={{ resize: "vertical" }} />
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center", opacity: loading ? 0.75 : 1 }} disabled={loading}>
                  {loading ? "Submitting..." : "Submit Application"}
                  {!loading && <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1.5fr"] { grid-template-columns: 1fr !important; }
          form > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
