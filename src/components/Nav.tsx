"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
 
const links = [
  { href: "/resources", label: "Resources" },
  { href: "/pathways", label: "Pathways" },
  { href: "/quiz", label: "Quiz" },
  { href: "/contact", label: "Contact" },
  { href: "/#newsletter", label: "Newsletter" },
];
 
const aboutLinks = [
  { href: "/about", label: "About HealthBridge" },
  { href: "/team", label: "Meet the Team" },
];
 
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const pathname = usePathname();
  const aboutRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  useEffect(() => { setOpen(false); setAboutOpen(false); }, [pathname]);
 
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
 
  const isAboutActive = pathname === "/about" || pathname === "/team";
 
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
 
          {/* Logo + wordmark */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
            <Image
              src="/healthbridge.png"
              alt="HealthBridge logo"
              width={36}
              height={36}
              style={{ objectFit: "contain", flexShrink: 0 }}
            />
            <span style={{
              fontFamily: "Playfair Display, serif", fontWeight: 800, fontSize: 18,
              color: "var(--ink)", letterSpacing: "-0.03em",
            }}>HealthBridge</span>
          </Link>
 
          {/* Desktop nav */}
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
 
            {/* About dropdown */}
            <div ref={aboutRef} style={{ position: "relative" }}>
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                style={{
                  background: isAboutActive ? "rgba(0,0,0,0.06)" : "transparent",
                  border: "none", cursor: "pointer", padding: "8px 14px",
                  fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: 13,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  color: isAboutActive ? "var(--ink)" : aboutOpen ? "var(--ink)" : "var(--text-muted)",
                  borderRadius: 4, transition: "color 0.15s, background 0.15s",
                  display: "flex", alignItems: "center", gap: 5,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
                onMouseLeave={(e) => { if (!isAboutActive && !aboutOpen) (e.currentTarget as HTMLElement).style.color = "var(--text-muted)"; }}
              >
                About
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transition: "transform 0.2s", transform: aboutOpen ? "rotate(180deg)" : "none" }}>
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
 
              {aboutOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 8px)", left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--cream)", border: "1px solid var(--border)",
                  borderRadius: 10, padding: "6px", minWidth: 200,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                  zIndex: 100,
                }}>
                  {aboutLinks.map(({ href, label }) => (
                    <Link key={href} href={href} style={{
                      display: "block", padding: "10px 14px",
                      fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: 13,
                      letterSpacing: "0.05em", textTransform: "uppercase",
                      color: pathname === href ? "var(--forest)" : "var(--ink)",
                      background: pathname === href ? "rgba(0,0,0,0.05)" : "transparent",
                      borderRadius: 6, textDecoration: "none", transition: "background 0.15s",
                    }}
                      onMouseEnter={(e) => { if (pathname !== href) (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.04)"; }}
                      onMouseLeave={(e) => { if (pathname !== href) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                    >{label}</Link>
                  ))}
                </div>
              )}
            </div>
 
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
 
          {/* Mobile hamburger */}
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
 
      {/* Mobile drawer */}
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
 
          {/* Mobile About accordion */}
          <div>
            <button
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                width: "100%", padding: "14px 0", background: "none", border: "none",
                borderBottom: "1px solid var(--border)", cursor: "pointer",
                fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 16,
                letterSpacing: "0.04em", textTransform: "uppercase",
                color: isAboutActive ? "var(--forest)" : "var(--ink)",
              }}
            >
              About
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transition: "transform 0.2s", transform: mobileAboutOpen ? "rotate(180deg)" : "none" }}>
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileAboutOpen && (
              <div style={{ paddingLeft: 16, borderBottom: "1px solid var(--border)" }}>
                {aboutLinks.map(({ href, label }) => (
                  <Link key={href} href={href} style={{
                    display: "block", padding: "12px 0", textDecoration: "none",
                    fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: 14,
                    letterSpacing: "0.04em", textTransform: "uppercase",
                    color: pathname === href ? "var(--forest)" : "var(--text-muted)",
                  }}>{label}</Link>
                ))}
              </div>
            )}
          </div>
 
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
