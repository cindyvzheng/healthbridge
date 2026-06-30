"use client";
import Link from "next/link";
import Image from "next/image";

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
              <Image
                src="/healthbridge.png"
                alt="HealthBridge logo"
                width={36}
                height={36}
                style={{ objectFit: "contain", flexShrink: 0, filter: "brightness(0) invert(1)" }}
              />
              <span style={{ fontFamily: "Playfair Display, Georgia, serif", fontWeight: 700, fontSize: 20 }}>HealthBridge</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: 16, marginBottom: 16 }}>Explore</p>
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
            <p style={{ fontFamily: "Playfair Display, serif", fontWeight: 600, fontSize: 16, marginBottom: 16 }}>Say Hello</p>
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

        {/* 501c3 notice */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.75, maxWidth: 600, margin: 0 }}>
            HealthBridge is an official 501(c)(3) nonprofit committed to making healthcare careers accessible to all students. EIN: 81-2908499
          </p>
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
          <p style={{ color: "white", fontSize: 20, fontFamily: "Playfair Display, serif", fontWeight: 800 }}>
            © HealthBridge. &nbsp;<span style={{ fontWeight: 800, fontSize: 20, color: "white" }}> All rights reserved.</span>
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
