"use client";
import Image from "next/image";

const founder = {
  name: "Cindy Zheng",
  role: "Founder, CEO & Web Developer",
  bio: "A summer spent at a rehabilitation center in Brooklyn changed the way I view healthcare. There, I met many patients who I connected with personally, and I wanted to take something meaningful out of that experience while also giving back to my community. So I created HealthBridge: a free toolkit to help students find their path in healthcare — without expensive programs or connections. Just opportunity. Healthcare ultimately affects every one of us, and I built HealthBridge hoping it sparks something similar in other students, just as my summer did.",
  photo: "/team/cindy-zheng.jpg",
};

const directors = [
  {
    name: "Claire Feng",
    role: "Director of Marketing",
    bio: "I'm a sophomore from the Bay Area, California. I'm interested in the business field and love participating in marketing and social-media related activities because it lets me combine my passion for digital art and design with my leadership and business skills. I'm really excited to be part of HealthBridge because it not only helps students better understand healthcare, but also teaches them the reasoning behind crucial topics such as pricing, systems, and economics.",
    photo: "/team/claire-feng.png",
  },
  {
    name: "Christian Lee",
    role: "Director of Outreach",
    bio: "I'm a high school student from California with a strong interest in environmental science and ecology. I've been involved in research, journal publications, and conservation projects that address real-world environmental challenges. I'm excited to be part of the HealthBridge team and hope to expand its reach to those who truly need it.",
    photo: "/team/christian-lee.jpg",
  },
];

const heads = [
  {
    name: "Aman",
    role: "Head of Newsletter & Events",
    bio: "I'm a student from Connecticut involved in FBLA, Robotics, and Coding. Beyond school, I've done research in biology and computer science at universities like Yale, UConn, and Fairfield University. I wanted to get involved in HealthBridge to help students find opportunities in healthcare and build their careers early.",
    photo: "/team/aman.jpg",
  },
  {
    name: "Arnav Chhatwal",
    role: "Head of Social Media",
    bio: "I'm a student from New York heavily involved in Science Olympiad, Varsity Swim, and Varsity Tennis. I'm also in the process of building my first application. I'm planning to go into Mechanical Engineering — I love doing things hands-on while also being able to program applications and various other things.",
    photo: "/team/arnav-chhatwal.jpg",
  },
  {
    name: "Kesiya Kurian",
    role: "Head of Content & Writing",
    bio: "I'm a student from New York passionate about medicine and law, and I hope to one day become a CRNA. I love helping people, reading, writing, and baking. I hope I'll be able to make a real impact through HealthBridge.",
    photo: "/team/kesiya-kurian.jpg",
  },
  {
    name: "Max Xiao",
    role: "Engineering Lead",
    bio: "I'm a student from Texas. I love the study of mathematics and machine learning, especially their applications in the real world. In my free time, I play the saxophone and violin and work on interesting programming projects. I'm looking forward to helping grow HealthBridge and drive its mission.",
    photo: "/team/max-xiao.png",
  },
  {
    name: "Naveen Gunawardana",
    role: "Software Engineer",
    bio: "I'm a 16-year-old software engineer from San Francisco. You can learn more about me at naveengunawardana.com or through my organization mentalitysports.com. I'm passionate about health because my family faces many issues similar to what this project aims to overcome.",
    photo: "/team/naveen-gunawardana.png",
  },
];

const team = [
  {
    name: "Claire Wang",
    role: "Social Media Manager",
    bio: "I'm a high school student from NJ interested in business and marketing. I'm involved in FBLA and Model UN, as well as volunteering at the animal shelter. Outside of that, I enjoy taking pictures and hanging out with friends. I'm super excited to be contributing to this project!",
    photo: "/team/claire-wang.jpg",
  },
  {
    name: "Noah Shen",
    role: "Outreach Coordinator",
    bio: "I'm a student from Washington interested in business. I'm involved in school sports like water polo, and I enjoy playing sports with friends, gaming, and traveling. I'm excited to be involved in this project because it gives me a chance to contribute to something meaningful while learning from the experience.",
    photo: "/team/noah-shen.jpg",
  },
];

function MemberCard({ member, large = false }: { member: typeof founder; large?: boolean }) {
  return (
    <div style={{
      background: "white",
      borderRadius: 20,
      overflow: "hidden",
      border: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      transition: "transform 0.2s, box-shadow 0.2s",
    }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.10)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div style={{
        width: "100%",
        aspectRatio: "1/1",
        overflow: "hidden",
        background: "var(--cream-dark)",
        flexShrink: 0,
      }}>
        <Image
          src={member.photo}
          alt={member.name}
          width={400}
          height={400}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
        />
      </div>
      <div style={{ padding: large ? "28px 28px 32px" : "22px 22px 26px", flex: 1 }}>
        <p style={{
          fontFamily: "Playfair Display, serif", fontWeight: 700,
          fontSize: large ? 13 : 11, letterSpacing: "0.12em",
          textTransform: "uppercase", color: "var(--forest)",
          marginBottom: 6,
        }}>{member.role}</p>
        <h3 style={{
          fontFamily: "Playfair Display, serif", fontWeight: 800,
          fontSize: large ? 24 : 20, color: "var(--ink)",
          letterSpacing: "-0.02em", marginBottom: 12,
        }}>{member.name}</h3>
        <p style={{
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontSize: large ? 15 : 14, color: "var(--text-muted)",
          lineHeight: 1.75,
        }}>{member.bio}</p>
      </div>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
      <p style={{
        fontFamily: "Playfair Display, serif", fontWeight: 700, fontSize: 11,
        letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-light)",
        whiteSpace: "nowrap",
      }}>{label}</p>
      <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}

export default function TeamPage() {
  return (
    <div style={{ paddingTop: 100 }}>

      {/* Header */}
      <section style={{ background: "var(--forest)", padding: "72px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <p style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Playfair Display, serif", marginBottom: 16 }}>
            Meet the Team
          </p>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: "white", lineHeight: 1.1, marginBottom: 20, maxWidth: 640, letterSpacing: "-0.02em" }}>
            Built by students,<br />
            <span style={{ fontFamily: "DM Serif Display, serif", fontStyle: "italic", fontWeight: 400 }}>for students.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 17, lineHeight: 1.75, maxWidth: 520 }}>
            HealthBridge is entirely student-run. Here's the team making it happen.
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "72px 24px 100px" }}>

        {/* Founder + Director of Marketing */}
        <SectionLabel label="Founder & Leadership" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, marginBottom: 72 }} className="team-grid-2">
          <MemberCard member={founder} large />
          <MemberCard member={directors[0]} large />
        </div>

        {/* Directors */}
        <SectionLabel label="Directors" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, marginBottom: 72, maxWidth: 480 }}>
          <MemberCard member={directors[1]} />
        </div>

        {/* Heads & Engineering */}
        <SectionLabel label="Heads & Engineering" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, marginBottom: 72 }} className="team-grid-heads">
          {heads.map((m) => <MemberCard key={m.name} member={m} />)}
        </div>

        {/* Social Media & Outreach */}
        <SectionLabel label="Social Media & Outreach" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 680 }}>
          {team.map((m) => <MemberCard key={m.name} member={m} />)}
        </div>

      </section>

      <style>{`
        @media (max-width: 640px) {
          .team-grid-2 { grid-template-columns: 1fr !important; }
          .team-grid-heads { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
