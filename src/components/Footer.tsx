"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--forest)",
      color: "white",
      padding: "64px 24px 40px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 48,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36, height: 36,
                background: "rgba(255,255,255,0.15)",
                borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3C10 3 5 6 5 10.5C5 13.538 7.238 16 10 16C12.762 16 15 13.538 15 10.5C15 6 10 3 10 3Z" fill="white" opacity="0.9"/>
                  <path d="M8 10.5H12M10 8.5V12.5" stroke="var(--forest)" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ fontFamily: "Fraunces, Georgia, serif", fontWeight: 700, fontSize: 20 }}>HealthBridge</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <p style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 16, marginBottom: 16 }}>Explore</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { href: "/resources", label: "Resource Library" },
                { href: "/pathways", label: "Career Pathways" },
                { href: "/about", label: "About Us" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 14, transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: "Fraunces, serif", fontWeight: 600, fontSize: 16, marginBottom: 16 }}>Say Hello</p>
            <a
            href="mailto:hello@healthbridgeproject.org"
            style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, textDecoration: "none", wordBreak: "break-all" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
          >
            hello@healthbridgeproject.org
          </a>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, marginTop: 8 }}>We respond within 48 hours.</p>
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            © {new Date().getFullYear()} HealthBridge. Free for all students.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/terms" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >Terms of Service</Link>
            <Link href="/privacy" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  ); 
}
