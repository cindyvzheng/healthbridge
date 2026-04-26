"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const pathways = [
  {
    id: "pre-med",
    title: "Pre-Med / Medicine",
    emoji: "🩺",
    tagline: "Become a physician, surgeon, or specialist",
    accentColor: "#2596be",
    bgColor: "#D5EEF7",
    timeline: "8–12 years",
    difficulty: "Highly Competitive",
    steps: [
      {
        phase: "High School",
        timeline: "Ages 14–18",
        items: [
          "Take AP Biology, Chemistry, and Statistics",
          "Volunteer at a local hospital or clinic",
          "Shadow a physician (ask local community health centers)",
          "Maintain strong GPA — aim for 3.5+",
          "Explore free pre-med communities online (r/premed, Student Doctor Network)",
        ],
        resources: ["Khan Academy Biology", "Free hospital volunteering programs"],
      },
      {
        phase: "Undergraduate",
        timeline: "4 years",
        items: [
          "Complete pre-med prerequisites (Biology, Chemistry, Organic Chem, Physics, Math)",
          "Get clinical experience — EMT certification, scribe work, or clinic volunteering",
          "Begin MCAT preparation (start 1–2 years before applying)",
          "Research experience strengthens applications significantly",
          "Look into post-bac programs if GPA needs improvement",
        ],
        resources: ["Free MCAT resources (Khan Academy, Anki decks)", "Fee-waiver programs for low-income applicants"],
      },
      {
        phase: "Medical School Applications",
        timeline: "Year 4 of undergrad",
        items: [
          "Take the MCAT — free prep resources available",
          "Apply via AMCAS (fee waivers available for low-income students)",
          "Write a compelling personal statement",
          "Secure letters of recommendation from physicians and professors",
          "Consider DO programs — equally valid, more holistic admissions",
        ],
        resources: ["AAMC Fee Waiver Program", "HPSP Military Scholarship", "Full-tuition scholarships at select schools"],
      },
      {
        phase: "Medical School",
        timeline: "4 years",
        items: [
          "Years 1–2: Preclinical coursework (Sciences, anatomy, pathology)",
          "Years 3–4: Clinical rotations across specialties",
          "USMLE Step 1 and Step 2 licensing exams",
          "Choose a specialty and apply to residency programs",
          "Loan forgiveness programs available for underserved communities",
        ],
        resources: ["Public Service Loan Forgiveness", "NHSC Scholarship (for underserved communities)"],
      },
      {
        phase: "Residency & Beyond",
        timeline: "3–7+ years",
        items: [
          "Complete residency in chosen specialty",
          "Fellowship training for subspecialties (optional)",
          "Board certification exams",
          "Begin practice — average physician income $200k–$350k+",
        ],
        resources: ["NHSC loan repayment programs"],
      },
    ],
  },
  {
    id: "public-health",
    title: "Public Health",
    emoji: "🌍",
    tagline: "Improve health for entire communities",
    accentColor: "#1A3A5C",
    bgColor: "#E8EFF7",
    timeline: "4–6 years",
    difficulty: "Accessible",
    steps: [
      {
        phase: "Explore the Field",
        timeline: "High school / Early college",
        items: [
          "Learn what public health actually means — it's not just medicine",
          "Follow public health organizations: CDC, WHO, local health departments",
          "Look for community health programs in your area",
          "Free online courses: Introduction to Public Health on Coursera/edX",
          "Consider volunteering with community organizations",
        ],
        resources: ["CDC Foundation Internships", "Free Coursera public health courses"],
      },
      {
        phase: "Undergraduate",
        timeline: "4 years",
        items: [
          "Majors that work: Public Health, Biology, Sociology, Political Science, Economics",
          "Take statistics — critical for this field",
          "Internships at local health departments are highly accessible",
          "Community-based research experience is valuable",
          "Consider Peace Corps or AmeriCorps for both experience and loan benefits",
        ],
        resources: ["AmeriCorps Health programs", "Local health department internships"],
      },
      {
        phase: "Master of Public Health (MPH)",
        timeline: "2 years",
        items: [
          "MPH is the standard advanced degree in this field",
          "Concentrations: Epidemiology, Health Policy, Environmental Health, Global Health",
          "Many programs offer substantial financial aid",
          "Some employers pay for MPH while you work",
          "Practicum requirement gives real-world experience",
        ],
        resources: ["SOPHAS fee waivers", "Scholarships for underrepresented students"],
      },
      {
        phase: "Career",
        timeline: "Ongoing",
        items: [
          "Health departments (local, state, federal)",
          "Nonprofits and community health organizations",
          "Global health organizations",
          "Research institutions",
          "Healthcare consulting and policy firms",
        ],
        resources: ["APHA Career Center", "USAJobs.gov for government positions"],
      },
    ],
  },
];

function StepCard({
  step,
  index,
  accentColor,
  isOpen,
  onToggle,
}: {
  step: (typeof pathways)[0]["steps"][0];
  index: number;
  accentColor: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <div
        style={{
          border: "1px solid var(--border)",
          borderLeft: `3px solid ${isOpen ? accentColor : "var(--border)"}`,
          borderRadius: 6,
          background: "white",
          overflow: "hidden",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: isOpen ? "0 4px 24px rgba(37,150,190,0.08)" : "none",
        }}
      >
        {/* Header — always visible */}
        <button
          onClick={onToggle}
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "56px 1fr auto",
            alignItems: "center",
            gap: 20,
            padding: "20px 24px",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <span
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 28,
              letterSpacing: "-0.04em",
              color: isOpen ? accentColor : "var(--border)",
              transition: "color 0.2s",
              lineHeight: 1,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          <div>
            <p
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: 17,
                color: "var(--ink)",
                letterSpacing: "-0.01em",
                marginBottom: 2,
              }}
            >
              {step.phase}
            </p>
            <p
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: 13,
                color: "var(--text-light)",
              }}
            >
              {step.timeline}
            </p>
          </div>

          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: `1.5px solid ${isOpen ? accentColor : "var(--border)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "border-color 0.2s, transform 0.25s",
              transform: isOpen ? "rotate(45deg)" : "none",
            }}
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 16 16">
              <path
                d="M8 3v10M3 8h10"
                stroke={isOpen ? accentColor : "var(--text-light)"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </button>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  padding: "0 24px 24px 24px",
                  paddingLeft: 100,
                }}
              >
                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    background: "var(--border-light)",
                    marginBottom: 20,
                  }}
                />

                {/* Items */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  {step.items.map((item, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: accentColor,
                          flexShrink: 0,
                          marginTop: 7,
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                          fontSize: 14,
                          color: "var(--text-muted)",
                          lineHeight: 1.7,
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Resources */}
                {step.resources.length > 0 && (
                  <div
                    style={{
                      background: "var(--cream-dark)",
                      borderRadius: 6,
                      padding: "14px 18px",
                      borderLeft: `3px solid ${accentColor}`,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: accentColor,
                        marginBottom: 8,
                      }}
                    >
                      Free Resources
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {step.resources.map((r) => (
                        <span
                          key={r}
                          style={{
                            fontFamily: "Plus Jakarta Sans, sans-serif",
                            fontSize: 13,
                            color: "var(--ink)",
                            background: "white",
                            border: "1px solid var(--border)",
                            borderRadius: 4,
                            padding: "5px 12px",
                          }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function PathwaysPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [openStep, setOpenStep] = useState<number | null>(0);
  const pathway = pathways[activeIdx];

  return (
    <div style={{ paddingTop: 68, background: "var(--cream)" }}>

      {/* ── HERO ── */}
      <section
        style={{
          background: "var(--ink)",
          padding: "72px 40px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.06)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: "30%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.04)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--forest-muted)",
                marginBottom: 20,
              }}
            >
              Career Pathways
            </p>
            <h1
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                color: "white",
                marginBottom: 16,
              }}
            >
              Your roadmap<br />
              <span
                style={{
                  fontFamily: "DM Serif Display, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--forest)",
                }}
              >
                starts here.
              </span>
            </h1>
            <p
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: 17,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.75,
                maxWidth: 520,
                marginTop: 20,
              }}
            >
              Step-by-step roadmaps with free resources and realistic timelines —
              built for students starting from scratch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── PATHWAY SWITCHER ── */}
      <section style={{ background: "var(--cream-dark)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", gap: 0 }}>
            {pathways.map((p, i) => (
              <button
                key={p.id}
                onClick={() => { setActiveIdx(i); setOpenStep(0); }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "22px 28px",
                  background: "none",
                  border: "none",
                  borderBottom: `3px solid ${activeIdx === i ? p.accentColor : "transparent"}`,
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 22 }}>{p.emoji}</span>
                <div style={{ textAlign: "left" }}>
                  <p
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: 14,
                      color: activeIdx === i ? "var(--ink)" : "var(--text-light)",
                      letterSpacing: "-0.01em",
                      transition: "color 0.2s",
                    }}
                  >
                    {p.title}
                  </p>
                  <p
                    style={{
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontSize: 12,
                      color: "var(--text-light)",
                    }}
                  >
                    {p.timeline} · {p.difficulty}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PATHWAY CONTENT ── */}
      <section style={{ padding: "64px 40px 80px" }}>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: 56,
            alignItems: "start",
          }}
        >

          {/* Sidebar */}
          <motion.div
            key={pathway.id + "-sidebar"}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: "sticky", top: 100 }}
          >
            <div
              style={{
                background: pathway.bgColor,
                borderRadius: 8,
                padding: "28px 24px",
                marginBottom: 20,
              }}
            >
              <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>
                {pathway.emoji}
              </span>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: 22,
                  color: pathway.accentColor,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  marginBottom: 8,
                }}
              >
                {pathway.title}
              </h2>
              <p
                style={{
                  fontFamily: "DM Serif Display, serif",
                  fontStyle: "italic",
                  fontSize: 15,
                  color: "var(--text-muted)",
                  marginBottom: 20,
                }}
              >
                {pathway.tagline}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  paddingTop: 16,
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 600,
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-light)",
                    }}
                  >
                    Timeline
                  </span>
                  <span
                    style={{
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      color: "var(--ink)",
                    }}
                  >
                    {pathway.timeline}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 600,
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-light)",
                    }}
                  >
                    Entry
                  </span>
                  <span
                    style={{
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      color: pathway.accentColor,
                    }}
                  >
                    {pathway.difficulty}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 600,
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-light)",
                    }}
                  >
                    Steps
                  </span>
                  <span
                    style={{
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      color: "var(--ink)",
                    }}
                  >
                    {pathway.steps.length} phases
                  </span>
                </div>
              </div>
            </div>

            {/* Step index */}
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 8,
                overflow: "hidden",
                background: "white",
              }}
            >
              <p
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 600,
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-light)",
                  padding: "12px 16px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                Phases
              </p>
              {pathway.steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setOpenStep(openStep === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 16px",
                    background: openStep === i ? pathway.bgColor : "none",
                    border: "none",
                    borderBottom: i < pathway.steps.length - 1 ? "1px solid var(--border-light)" : "none",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background 0.15s",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 800,
                      fontSize: 12,
                      color: openStep === i ? pathway.accentColor : "var(--border)",
                      flexShrink: 0,
                      transition: "color 0.15s",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      color: openStep === i ? "var(--ink)" : "var(--text-muted)",
                      transition: "color 0.15s",
                    }}
                  >
                    {step.phase}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Steps */}
          <div>
            <motion.div
              key={pathway.id + "-header"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 28,
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--text-light)",
                    marginBottom: 6,
                  }}
                >
                  {pathway.steps.length} phases
                </p>
                <h2
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(24px, 3vw, 34px)",
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                  }}
                >
                  {pathway.title} Roadmap
                </h2>
              </div>
              <button
                onClick={() => setOpenStep(openStep !== null ? null : 0)}
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-light)",
                  background: "none",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  padding: "8px 16px",
                  cursor: "pointer",
                  transition: "color 0.15s, border-color 0.15s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "var(--ink)";
                  el.style.borderColor = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.color = "var(--text-light)";
                  el.style.borderColor = "var(--border)";
                }}
              >
                {openStep !== null ? "Collapse all" : "Expand all"}
              </button>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={pathway.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {pathway.steps.map((step, i) => (
                  <StepCard
                    key={step.phase}
                    step={step}
                    index={i}
                    accentColor={pathway.accentColor}
                    isOpen={openStep === i}
                    onToggle={() => setOpenStep(openStep === i ? null : i)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── QUIZ ── */}
      <section
        id="quiz"
        style={{
          background: "var(--ink)",
          padding: "80px 40px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--forest-muted)",
                  marginBottom: 16,
                }}
              >
                Not sure which path?
              </p>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(32px, 4vw, 52px)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.0,
                  color: "white",
                  marginBottom: 20,
                }}
              >
                Find your fit<br />
                <span
                  style={{
                    fontFamily: "DM Serif Display, serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "var(--forest)",
                  }}
                >
                  in 3 questions.
                </span>
              </h2>
              <p
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.8,
                  maxWidth: 380,
                  marginBottom: 32,
                }}
              >
                Answer 3 quick questions and get matched to your healthcare
                career path — Policy, Administration, Biotech, or Health
                Economics.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Health Policy", "Administration", "Biotech", "Health Economics"].map(
                  (label) => (
                    <span
                      key={label}
                      style={{
                        fontFamily: "Syne, sans-serif",
                        fontWeight: 700,
                        fontSize: 11,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.55)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 4,
                        padding: "6px 12px",
                      }}
                    >
                      {label}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 8,
                overflow: "hidden",
                minHeight: 460,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* TODO: Replace YOUR_TYPEFORM_ID with your actual Typeform form ID */}
              <iframe
                src="https://YOUR_TYPEFORM_ID.typeform.com/to/YOUR_TYPEFORM_ID"
                width="100%"
                height="460"
                frameBorder="0"
                allow="camera; microphone; autoplay; encrypted-media;"
                style={{ display: "block" }}
                title="Healthcare Career Path Quiz"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── COMING SOON ── */}
      <section style={{ background: "var(--cream-dark)", padding: "80px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 16,
              marginBottom: 40,
            }}
          >
            {[
              { emoji: "💙", label: "Nursing", sub: "CNA → RN → NP" },
              { emoji: "⚖️", label: "Health Policy", sub: "Where medicine meets law" },
              { emoji: "📊", label: "Health Economics", sub: "The business of health" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "white",
                  border: "1px dashed var(--border)",
                  borderRadius: 8,
                  padding: "28px 24px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  opacity: 0.6,
                }}
              >
                <span style={{ fontSize: 28 }}>{item.emoji}</span>
                <div>
                  <p
                    style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: 15,
                      color: "var(--ink)",
                      marginBottom: 2,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "DM Serif Display, serif",
                      fontStyle: "italic",
                      fontSize: 13,
                      color: "var(--text-muted)",
                    }}
                  >
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--text-light)",
                  marginBottom: 6,
                }}
              >
                More coming soon
              </p>
              <p
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontSize: 15,
                  color: "var(--text-muted)",
                  maxWidth: 440,
                }}
              >
                Nursing, Health Policy, and Health Economics pathways are in the works. Want to help build them?
              </p>
            </div>
            <Link href="/join" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "var(--ink)",
              color: "white",
              padding: "13px 22px",
              borderRadius: 4,
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--forest)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--ink)"; }}
            >
              Join Our Team
              <svg width="14" height="14" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          section > div[style*="grid-template-columns: 260px"] {
            grid-template-columns: 1fr !important;
          }
          section > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="grid-template-columns: 1fr 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section[style*="padding: 64px 40px"] {
            padding: 48px 24px 64px !important;
          }
          section[style*="padding: 80px 40px"],
          section[style*="padding: 72px 40px 80px"] {
            padding: 56px 24px !important;
          }
        }
        @media (max-width: 600px) {
          button[style*="padding: 22px 28px"] {
            padding: 16px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
