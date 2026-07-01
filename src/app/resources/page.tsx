"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

const resources = [
  {
    id: 1,
    title: "Pre-Med Starter Guide",
    description: "Everything you need to know about beginning your journey toward medical school — free MCAT prep resources, shadowing tips, and a realistic timeline for high school and college students.",
    category: "Medicine",
    level: "Exploring",
    time: "Self-paced",
    link: "/resources/1",
    tags: ["MCAT", "Shadowing", "Volunteering"],
    featured: true,
  },
  {
    id: 2,
    title: "Free MCAT Resources Compilation",
    description: "A curated list of completely free MCAT prep materials including Khan Academy, Anki decks, and community-sourced study guides.",
    category: "Medicine",
    level: "Committed",
    time: "3–6 months",
    link: "/resources/2",
    tags: ["MCAT", "Study guides"],
    featured: false,
  },
  {
    id: 3,
    title: "Public Health 101",
    description: "An introduction to the field of public health — what it is, what careers exist within it, and how to get your first experience without needing a degree or connections.",
    category: "Public Health",
    level: "Exploring",
    time: "1–2 hours",
    link: "/resources/3",
    tags: ["Community health", "Epidemiology"],
    featured: true,
  },
  {
    id: 4,
    title: "Finding Community Health Internships",
    description: "A step-by-step guide to finding paid and unpaid internships at community health centers, nonprofits, and government agencies — including tips for applicants with no prior experience.",
    category: "Public Health",
    level: "Applying",
    time: "1 hour",
    link: "/resources/4",
    tags: ["Internships", "Community health"],
    featured: false,
  },
  {
    id: 5,
    title: "Health Policy Careers Explained",
    description: "From legislative advocacy to think tanks to health system consulting — a breakdown of how to blend healthcare knowledge with economics and policy work.",
    category: "Policy",
    level: "Exploring",
    time: "45 min",
    link: "/resources/5",
    tags: ["Policy", "Economics", "Advocacy"],
    featured: true,
  },
  {
    id: 6,
    title: "Health Economics Crash Course",
    description: "An overview of the economic principles that shape healthcare systems, insurance markets, and health policy. Ideal for students interested in the business side of health.",
    category: "Policy",
    level: "Exploring",
    time: "2–3 hours",
    link: "/resources/6",
    tags: ["Economics", "Health systems"],
    featured: false,
  },
  {
    id: 7,
    title: "Nursing Career Pathway Overview",
    description: "Everything from CNA certification to becoming an RN or NP — a clear breakdown of the different nursing career tracks and what it takes to pursue each one.",
    category: "Nursing",
    level: "Exploring",
    time: "1 hour",
    link: "/resources/7",
    tags: ["RN", "NP", "CNA"],
    featured: true,
  },
  {
    id: 8,
    title: "Free Healthcare Volunteering Programs",
    description: "A list of structured volunteer programs at hospitals, clinics, and community health organizations that don't require prior healthcare experience to apply.",
    category: "All Paths",
    level: "Exploring",
    time: "Ongoing",
    link: "/resources/8",
    tags: ["Volunteering", "Clinical experience"],
    featured: false,
  },
  {
    id: 9,
    title: "Scholarships for Pre-Health Students",
    description: "A compiled list of scholarships and financial aid resources specifically for low-income students pursuing healthcare careers. Updated regularly.",
    category: "All Paths",
    level: "Applying",
    time: "Varies",
    link: "/resources/9",
    tags: ["Financial aid", "Scholarships"],
    featured: true,
  },
  {
    id: 10,
    title: "Writing a Personal Statement That Stands Out",
    description: "Practical advice on crafting a genuine, compelling personal statement for medical school, nursing school, or public health programs — especially when your background is non-traditional.",
    category: "All Paths",
    level: "Applying",
    time: "2–4 hours",
    link: "/resources/10",
    tags: ["Personal statement", "Applications"],
    featured: false,
  },
];

const categoryMeta: Record<string, { color: string; light: string; dim: string; abbr: string; icon: string }> = {
  "Medicine":      { color: "#2596BE", light: "#EBF5FB", dim: "#D0E8F5", abbr: "MED", icon: "🩺" },
  "Public Health": { color: "#C06030", light: "#FBF0E8", dim: "#F0D5C0", abbr: "PH",  icon: "🌍" },
  "Policy":        { color: "#6E48A0", light: "#F3EEFF", dim: "#E0D0F5", abbr: "POL", icon: "⚖️" },
  "Nursing":       { color: "#B03070", light: "#FEF0F5", dim: "#F5C8DE", abbr: "RN",  icon: "💙" },
  "All Paths":     { color: "#1E6B38", light: "#EBF5EE", dim: "#C5E8D0", abbr: "ALL", icon: "🌱" },
};

const levelMeta: Record<string, { label: string; color: string; desc: string }> = {
  "Exploring": { label: "Exploring",  color: "#2596BE", desc: "Just getting started" },
  "Committed": { label: "Committed",  color: "#C06030", desc: "Building your path" },
  "Applying":  { label: "Applying",   color: "#6E48A0", desc: "Ready to apply" },
};

const ALL_CATEGORIES = ["Medicine", "Public Health", "Policy", "Nursing", "All Paths"];
const ALL_LEVELS     = ["Exploring", "Committed", "Applying"];

/* ── tiny icon components ─────────────────────────────────────── */
const IconClock = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconGrid = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
const IconList = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M5 4h9M5 8h9M5 12h9M2 4h.5M2 8h.5M2 12h.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconX = () => (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

/* ── List Card ─────────────────────────────────────────────────── */
function ListCard({ r, index, visited }: { r: typeof resources[0]; index: number; visited: number[] }) {
  const [hovered, setHovered] = useState(false);
  const meta = categoryMeta[r.category];
  const lvl  = levelMeta[r.level];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "56px 1fr auto",
        gap: 0,
        borderBottom: "1px solid var(--border)",
        background: hovered ? meta.light : "transparent",
        transition: "background 0.2s ease",
        position: "relative",
        cursor: "default",
      }}
    >
      {/* Left accent stripe */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: hovered ? 4 : 2,
        background: meta.color,
        transition: "width 0.2s ease",
        borderRadius: "0 1px 1px 0",
      }} />

      {/* Number column */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 28,
        paddingLeft: 16,
        gap: 8,
      }}>
        <span style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: 11,
          letterSpacing: "0.08em",
          color: hovered ? meta.color : "var(--border)",
          transition: "color 0.2s",
        }}>
          {String(r.id).padStart(2, "0")}
        </span>
        <span style={{
          fontSize: 16,
          lineHeight: 1,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.2s",
        }}>
          {meta.icon}
        </span>
      </div>

      {/* Main content */}
      <div style={{ padding: "24px 24px 24px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: meta.color,
            background: meta.dim,
            padding: "3px 8px",
            borderRadius: 3,
          }}>
            {r.category}
          </span>
          <span style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 600,
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: lvl.color,
            opacity: 0.75,
          }}>
            · {r.level}
          </span>
        </div>

        <h3 style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: "clamp(15px, 2vw, 18px)",
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          marginBottom: 8,
          lineHeight: 1.2,
        }}>
          {r.title}
        </h3>

        <p style={{
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: 13.5,
          color: "var(--text-muted)",
          lineHeight: 1.65,
          marginBottom: 12,
          maxWidth: 640,
        }}>
          {r.description}
        </p>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {r.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: "var(--text-light)",
              background: "rgba(0,0,0,0.04)",
              padding: "2px 8px",
              borderRadius: 3,
              letterSpacing: "0.03em",
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right meta + CTA */}
      <div style={{
        padding: "24px 24px 24px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "space-between",
        minWidth: 140,
        gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-light)" }}>
          <IconClock />
          <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12, whiteSpace: "nowrap" }}>
            {r.time}
          </span>
        </div>

        <Link href={r.link} style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          fontFamily: "Syne, sans-serif",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hovered ? meta.color : "var(--text-muted)",
          textDecoration: "none",
          transition: "color 0.2s",
          whiteSpace: "nowrap",
        }}>
          {visited.includes(r.id) ? "Continue reading" : "Open"}
          <IconArrow />
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Grid Card ─────────────────────────────────────────────────── */
function GridCard({ r, index, visited }: { r: typeof resources[0]; index: number; visited: number[] }) {
  const [hovered, setHovered] = useState(false);
  const meta = categoryMeta[r.category];
  const lvl  = levelMeta[r.level];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? meta.light : "white",
        border: `1px solid ${hovered ? meta.dim : "var(--border)"}`,
        borderRadius: 10,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 32px ${meta.color}20` : "none",
      }}
    >
      {/* Top stripe */}
      <div style={{ height: 5, background: meta.color, flexShrink: 0 }} />

      <div style={{ padding: "22px 24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>{meta.icon}</span>
            <span style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: meta.color,
            }}>
              {r.category}
            </span>
          </div>
          <span style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 800,
            fontSize: 11,
            color: hovered ? meta.color : "var(--border)",
            letterSpacing: "0.04em",
            transition: "color 0.2s",
          }}>
            {String(r.id).padStart(2, "0")}
          </span>
        </div>

        <h3 style={{
          fontFamily: "Syne, sans-serif",
          fontWeight: 800,
          fontSize: 17,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          lineHeight: 1.25,
          marginBottom: 10,
        }}>
          {r.title}
        </h3>

        <p style={{
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: 13,
          color: "var(--text-muted)",
          lineHeight: 1.65,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          marginBottom: 14,
        }}>
          {r.description}
        </p>

        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 16 }}>
          {r.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: "Plus Jakarta Sans, sans-serif",
              fontSize: 11,
              fontWeight: 500,
              color: "var(--text-light)",
              background: "rgba(0,0,0,0.04)",
              padding: "2px 7px",
              borderRadius: 3,
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          paddingTop: 14,
          borderTop: `1px solid ${hovered ? meta.dim : "var(--border)"}`,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          transition: "border-color 0.2s",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text-light)" }}>
              <IconClock />
              <span style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12 }}>{r.time}</span>
            </div>
            <span style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: lvl.color,
              opacity: 0.8,
            }}>
              {r.level}
            </span>
          </div>
          <Link href={r.link} style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: hovered ? meta.color : "var(--text-muted)",
            textDecoration: "none",
            transition: "all 0.2s",
            padding: "8px 12px",
            borderRadius: 4,
            background: hovered ? meta.light : "transparent",
          }}>
            {visited.includes(r.id) ? "Continue reading" : "Open"}
            <IconArrow />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Page ─────────────────────────────────────────────────── */
export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeLevel,    setActiveLevel]    = useState<string>("All");
  const [search,         setSearch]         = useState("");
  const [viewMode,       setViewMode]       = useState<"list" | "grid">("list");
  const [sidebarOpen,    setSidebarOpen]    = useState(false);
  const [visitedResources, setVisitedResources] = useState<number[]>([]);

  useEffect(() => {
    const updateVisitedResources = () => {
      const visited = Cookies.get('visitedResources');
      if (visited) {
        setVisitedResources(JSON.parse(visited));
      }
    };

    updateVisitedResources();

    // Update when page becomes visible (user navigates back from resource page)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        updateVisitedResources();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      const matchCat   = activeCategory === "All" || r.category === activeCategory;
      const matchLevel = activeLevel    === "All" || r.level    === activeLevel;
      const q          = search.toLowerCase();
      const matchSearch = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.tags.some(t => t.toLowerCase().includes(q));
      return matchCat && matchLevel && matchSearch;
    });
  }, [activeCategory, activeLevel, search]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { "All": resources.length };
    ALL_CATEGORIES.forEach((c) => {
      counts[c] = resources.filter((r) => r.category === c).length;
    });
    return counts;
  }, []);

  const hasFilters = activeCategory !== "All" || activeLevel !== "All" || search !== "";

  const clearFilters = () => {
    setActiveCategory("All");
    setActiveLevel("All");
    setSearch("");
  };

  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", background: "var(--cream)" }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div style={{
        background: "var(--ink)",
        padding: "56px 40px 64px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background grid pattern */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(37,150,190,0.08) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }} />
        {/* Glow */}
        <div style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,150,190,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--forest)",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ display: "inline-block", width: 28, height: 1, background: "var(--forest)" }} />
                Resource Library
              </motion.p>

              <div style={{ overflow: "hidden", marginBottom: 6 }}>
                <motion.h1
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(44px, 7vw, 80px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 0.92,
                    color: "white",
                    margin: 0,
                  }}
                >
                  The Library.
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  fontFamily: "DM Serif Display, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(16px, 2.5vw, 22px)",
                  color: "rgba(255,255,255,0.45)",
                  marginTop: 16,
                  lineHeight: 1.4,
                }}
              >
                Free resources for every stage of your journey.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: "flex", gap: 0, border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, overflow: "hidden" }}
            >
              {[
                { val: resources.length, label: "Resources" },
                { val: ALL_CATEGORIES.length, label: "Categories" },
                { val: "100%", label: "Free" },
              ].map((s, i) => (
                <div key={s.label} style={{
                  padding: "18px 28px",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.1)" : "none",
                  textAlign: "center",
                }}>
                  <p style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 800,
                    fontSize: 28,
                    letterSpacing: "-0.03em",
                    color: "var(--forest)",
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    {s.val}
                  </p>
                  <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Category chips row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: "flex", gap: 8, marginTop: 40, flexWrap: "wrap" }}
          >
            {ALL_CATEGORIES.map((cat) => {
              const m = categoryMeta[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? "All" : cat)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "8px 14px",
                    borderRadius: 6,
                    border: `1px solid ${activeCategory === cat ? m.color : "rgba(255,255,255,0.12)"}`,
                    background: activeCategory === cat ? `${m.color}22` : "transparent",
                    color: activeCategory === cat ? m.color : "rgba(255,255,255,0.5)",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <span>{m.icon}</span>
                  {cat}
                  <span style={{
                    background: activeCategory === cat ? m.color : "rgba(255,255,255,0.1)",
                    color: activeCategory === cat ? "white" : "rgba(255,255,255,0.35)",
                    padding: "1px 6px",
                    borderRadius: 10,
                    fontSize: 10,
                    fontWeight: 700,
                    transition: "all 0.2s",
                  }}>
                    {categoryCounts[cat]}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── BODY ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 40px 80px", display: "grid", gridTemplateColumns: "260px 1fr", gap: 40, alignItems: "start" }}
        className="resources-grid"
      >

        {/* ── SIDEBAR ──────────────────────────────────────── */}
        <aside style={{
          position: "sticky",
          top: 88,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
          className="resources-sidebar"
        >
          <div style={{
            background: "white",
            border: "1px solid var(--border)",
            borderRadius: 10,
            overflow: "hidden",
          }}>
            {/* Search */}
            <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--border)" }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-light)", pointerEvents: "none" }}>
                  <IconSearch />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px 9px 36px",
                    background: "var(--cream-dark)",
                    border: "1.5px solid transparent",
                    borderRadius: 7,
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontSize: 13,
                    color: "var(--text)",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--forest)"; }}
                  onBlur={(e)  => { e.target.style.borderColor = "transparent"; }}
                />
              </div>
            </div>

            {/* Category section */}
            <div style={{ padding: "12px 0" }}>
              <p style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-light)",
                padding: "4px 16px 8px",
              }}>
                Category
              </p>
              {[{ label: "All", color: "#0D1B2A" }, ...ALL_CATEGORIES.map(c => ({ label: c, color: categoryMeta[c].color }))].map(({ label, color }) => {
                const isActive = activeCategory === label || (label === "All" && activeCategory === "All");
                const count = categoryCounts[label] ?? resources.length;
                const icon = label === "All" ? "✦" : categoryMeta[label]?.icon;
                return (
                  <button
                    key={label}
                    onClick={() => setActiveCategory(label)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 16px",
                      background: isActive ? `${color}10` : "transparent",
                      border: "none",
                      borderLeft: `3px solid ${isActive ? color : "transparent"}`,
                      cursor: "pointer",
                      transition: "all 0.15s",
                      gap: 8,
                      textAlign: "left",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13 }}>{icon}</span>
                      <span style={{
                        fontFamily: "Plus Jakarta Sans, sans-serif",
                        fontWeight: isActive ? 600 : 400,
                        fontSize: 13,
                        color: isActive ? color : "var(--text-muted)",
                        transition: "color 0.15s",
                      }}>
                        {label}
                      </span>
                    </span>
                    <span style={{
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 700,
                      fontSize: 11,
                      color: isActive ? color : "var(--text-light)",
                      background: isActive ? `${color}18` : "var(--cream-dark)",
                      padding: "2px 7px",
                      borderRadius: 10,
                      transition: "all 0.15s",
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Level / Journey section */}
            <div style={{ borderTop: "1px solid var(--border)", padding: "12px 0 8px" }}>
              <p style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-light)",
                padding: "4px 16px 8px",
              }}>
                Your Stage
              </p>

              {/* Journey line */}
              <div style={{ position: "relative", padding: "0 16px 12px" }}>
                {/* Connecting line */}
                <div style={{
                  position: "absolute",
                  left: 24,
                  top: 18,
                  bottom: 22,
                  width: 1,
                  background: "var(--border)",
                }} />

                {[{ label: "All", desc: "Show everything" }, ...ALL_LEVELS.map(l => ({ label: l, desc: levelMeta[l].desc }))].map(({ label, desc }) => {
                  const isActive = activeLevel === label;
                  const color = label === "All" ? "#0D1B2A" : levelMeta[label]?.color ?? "#0D1B2A";
                  return (
                    <button
                      key={label}
                      onClick={() => setActiveLevel(label)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "7px 0",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        position: "relative",
                        zIndex: 1,
                        textAlign: "left",
                      }}
                    >
                      <div style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: `2px solid ${isActive ? color : "var(--border)"}`,
                        background: isActive ? color : "white",
                        flexShrink: 0,
                        transition: "all 0.2s",
                        boxShadow: isActive ? `0 0 0 3px ${color}20` : "none",
                      }} />
                      <div>
                        <p style={{
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                          fontWeight: isActive ? 600 : 400,
                          fontSize: 13,
                          color: isActive ? color : "var(--text-muted)",
                          lineHeight: 1.2,
                          margin: 0,
                          transition: "color 0.2s",
                        }}>
                          {label}
                        </p>
                        <p style={{
                          fontFamily: "Plus Jakarta Sans, sans-serif",
                          fontSize: 11,
                          color: "var(--text-light)",
                          margin: 0,
                          lineHeight: 1.3,
                        }}>
                          {desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Clear filters */}
            <AnimatePresence>
              {hasFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ borderTop: "1px solid var(--border)", overflow: "hidden" }}
                >
                  <button
                    onClick={clearFilters}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 7,
                      padding: "12px 16px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "Syne, sans-serif",
                      fontWeight: 600,
                      fontSize: 11,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--text-muted)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
                  >
                    <IconX />
                    Clear all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar CTA */}
          <div style={{
            marginTop: 16,
            background: "var(--ink)",
            borderRadius: 10,
            padding: "20px 20px",
          }}>
            <p style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: "-0.01em",
              color: "white",
              marginBottom: 6,
              lineHeight: 1.3,
            }}>
              Know a resource we&apos;re missing?
            </p>
            <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 14, lineHeight: 1.5 }}>
              Help us grow the library for other students.
            </p>
            <Link href="/contact" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--forest)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(37,150,190,0.3)",
              paddingBottom: 2,
              transition: "border-color 0.2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--forest)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,150,190,0.3)"; }}
            >
              Suggest a resource
              <IconArrow />
            </Link>
          </div>
        </aside>

        {/* ── CONTENT AREA ─────────────────────────────────── */}
        <div>
          {/* Toolbar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 12,
          }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
              }}>
                {filtered.length}
              </span>
              <span style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontSize: 13,
                color: "var(--text-muted)",
              }}>
                resource{filtered.length !== 1 ? "s" : ""} found
                {activeCategory !== "All" && (
                  <span style={{ color: categoryMeta[activeCategory]?.color }}> in {activeCategory}</span>
                )}
              </span>
            </div>

            {/* View toggle */}
            <div style={{
              display: "inline-flex",
              border: "1px solid var(--border)",
              borderRadius: 7,
              overflow: "hidden",
              background: "white",
            }}>
              {(["list", "grid"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    background: viewMode === mode ? "var(--ink)" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: viewMode === mode ? "white" : "var(--text-muted)",
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    transition: "all 0.2s",
                  }}
                >
                  {mode === "list" ? <IconList /> : <IconGrid />}
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Active filter chips */}
          <AnimatePresence>
            {hasFilters && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}
              >
                {activeCategory !== "All" && (
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: categoryMeta[activeCategory]?.color,
                    background: categoryMeta[activeCategory]?.light,
                    border: `1px solid ${categoryMeta[activeCategory]?.dim}`,
                    padding: "4px 10px 4px 12px",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                    onClick={() => setActiveCategory("All")}
                  >
                    {activeCategory}
                    <IconX />
                  </span>
                )}
                {activeLevel !== "All" && (
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: levelMeta[activeLevel]?.color,
                    background: `${levelMeta[activeLevel]?.color}12`,
                    border: `1px solid ${levelMeta[activeLevel]?.color}30`,
                    padding: "4px 10px 4px 12px",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                    onClick={() => setActiveLevel("All")}
                  >
                    {activeLevel}
                    <IconX />
                  </span>
                )}
                {search && (
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    fontWeight: 500,
                    fontSize: 12,
                    color: "var(--text-muted)",
                    background: "var(--cream-dark)",
                    border: "1px solid var(--border)",
                    padding: "4px 10px 4px 12px",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                    onClick={() => setSearch("")}
                  >
                    &ldquo;{search}&rdquo;
                    <IconX />
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Resource Cards */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  textAlign: "center",
                  padding: "80px 40px",
                  background: "white",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                }}
              >
                <p style={{ fontSize: 36, marginBottom: 16 }}>◌</p>
                <h3 style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: 20,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  marginBottom: 8,
                }}>
                  No resources found
                </h3>
                <p style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>
                  Try adjusting your filters or clearing the search.
                </p>
                <button
                  onClick={clearFilters}
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--forest)",
                    background: "var(--mint)",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Clear filters
                </button>
              </motion.div>
            ) : viewMode === "list" ? (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                {filtered.map((r, i) => (
                  <ListCard key={r.id} r={r} index={i} visited={visitedResources} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: 16,
                }}
              >
                {filtered.map((r, i) => (
                  <GridCard key={r.id} r={r} index={i} visited={visitedResources} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Responsive overrides ─────────────────────────── */}
      <style>{`
        @media (max-width: 860px) {
          .resources-grid {
            grid-template-columns: 1fr !important;
          }
          .resources-sidebar {
            position: static !important;
          }
        }
        @media (max-width: 600px) {
          .resources-grid {
            padding: 24px 16px 64px !important;
          }
        }
      `}</style>
    </div>
  );
}
