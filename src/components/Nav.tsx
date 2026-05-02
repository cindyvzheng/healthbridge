"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/resources", label: "Resources" },
  { href: "/pathways", label: "Pathways" },
  { href: "/quiz", label: "Quiz" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/#newsletter", label: "Newsletter" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
      background: scrolled ? "rgba(245,239,227,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
    }}>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "var(--forest)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 3C10 3 5 6 5 10.5C5 13.538 7.238 16 10 16C12.762 16 15 13.538 15 10.5C15 6 10 3 10 3Z" fill="white" opacity="0.9"/>
                <path d="M8 10.5H12M10 8.5V12.5" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: 18, color: "var(--ink)", letterSpacing: "-0.03em" }}>HealthBridge</span>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: 2 }} className="nav-desktop">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                textDecoration: "none", padding: "8px 14px",
                fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: 13,
                letterSpacing: "0.06em", textTransform: "uppercase",
                color: pathname === href ? "var(--ink)" : "var(--text-muted)",
                background: pathname === href ? "rgba(0,0,0,0.06)" : "transparent",
                borderRadius: 4, transition: "color 0.15s, background 0.15s",
              }}
                onMouseEnter={(e) => { if (pathname !== href) (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
                onMouseLeave={(e) => { if (pathname !== href) (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
              >{label}</Link>
            ))}
            <a href="https://healthbridge.beehiiv.com/" target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", marginLeft: 12,
              background: "var(--terra)", color: "white", padding: "9px 16px", borderRadius: 4,
              fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 12,
              letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", transition: "opacity 0.2s",
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >Subscribe</a>
          </nav>

          <button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="nav-mobile-btn"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }}>
            <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ display: "block", height: 2, background: "var(--ink)", borderRadius: 2, transition: "all 0.25s", transform: open ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ display: "block", height: 2, background: "var(--ink)", borderRadius: 2, transition: "all 0.25s", opacity: open ? 0 : 1 }} />
              <span style={{ display: "block", height: 2, background: "var(--ink)", borderRadius: 2, transition: "all 0.25s", transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: "var(--cream)", borderTop: "1px solid var(--border)", padding: "16px 24px 24px" }}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              display: "block", padding: "14px 0", textDecoration: "none",
              fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 16,
              letterSpacing: "0.04em", textTransform: "uppercase",
              color: pathname === href ? "var(--forest)" : "var(--ink)",
              borderBottom: "1px solid var(--border)",
            }}>{label}</Link>
          ))}
          <a href="https://healthbridge.beehiiv.com/" target="_blank" rel="noopener noreferrer" style={{
            display: "block", marginTop: 16, background: "var(--terra)", color: "white",
            padding: "14px 24px", borderRadius: 4, fontFamily: "Playfair Display, serif",
            fontWeight: 700, fontSize: 14, letterSpacing: "0.08em", textTransform: "uppercase",
            textDecoration: "none", textAlign: "center",
          }}>Subscribe</a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
