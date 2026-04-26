# HealthBridge — Product Requirements Document

**Version:** 1.0  
**Date:** 2026-04-19  
**Status:** Draft

---

## 1. Overview

**HealthBridge** is a free, web-based toolkit that helps low-income students explore healthcare careers. It bridges the gap between healthcare and economics/policy education, giving motivated students the resources, guidance, and community they need to pursue meaningful paths in medicine and health systems.

The platform was born from a founder's personal experience volunteering in Brooklyn — connecting with patients and recognizing that students from under-resourced communities often lack structured pathways into healthcare. HealthBridge is the answer to that gap.

---

## 2. Goals

| Goal | Metric |
|---|---|
| Make healthcare career resources accessible to low-income students | 500 registered users in first 6 months |
| Reduce barrier to entry for healthcare/economics career exploration | 70%+ of users complete at least one resource pathway |
| Build a community of students and collaborators | 20+ team members / contributors in Year 1 |
| Establish trust and recurring engagement | 40%+ monthly return visit rate |

---

## 3. Target Users

### Primary: Low-Income High School & College Students
- Ages 15–22
- Interested in medicine, public health, healthcare policy, or health economics
- Limited access to mentors, internships, or career guidance
- Mobile-first users, likely on shared or lower-spec devices

### Secondary: Student Volunteers / Contributors
- Students who want to give back and build their own experience
- Future team members who join via the "Join Our Team" CTA

### Tertiary: Collaborating Organizations
- Non-profits, community health centers, university programs looking to partner

---

## 4. Core Features

### 4.1 Resource Library
- Curated guides on healthcare career paths (medicine, nursing, public health, health policy, health economics)
- Organized by category and difficulty level (exploring → committed → applying)
- Free to access, no login required for browsing
- Filterable by career interest, cost, time commitment

### 4.2 Career Pathway Explorer
- Step-by-step visual roadmaps for different healthcare careers
- Each path includes: typical timeline, required steps, free resources, scholarship/program links
- Highlights low-cost or no-cost entry points specifically

### 4.3 About / Founder Story Page
- Personal narrative connecting Brooklyn volunteer experience to the platform's mission
- Human, student-written tone — not corporate
- Communicates the "why" clearly to build trust and resonance with the audience

### 4.4 Contact Page
- Simple contact form + direct email: **joinhealthbridge@gmail.com**
- "Have a question, suggestion, or want to collaborate? We'd love to hear from you."
- Response SLA: within 48 hours

### 4.5 Join Our Team
- Application or interest form for students who want to contribute
- Roles: content writers, researchers, outreach, web/design
- No experience required — framed as a learning opportunity

### 4.6 Newsletter / Updates (Phase 2)
- Opt-in email updates for new resources, opportunities, events
- Low-frequency (2x/month max) to avoid fatigue

---

## 5. Design Requirements

### Visual Style
- **Tone:** Clean, modern, friendly, approachable
- **Audience feel:** Student-focused — not clinical, not corporate
- **Layout:** Easy to scan — heavy use of headlines, bullet points, cards, and whitespace
- **Color palette:** Warm but professional; avoid cold/clinical blues; consider soft teals, warm whites, or earthy accents
- **Typography:** Readable at all sizes; accessible font sizing (16px+ body)
- **Imagery:** Real, diverse students and communities — no stock-photo-feeling imagery

### Accessibility
- WCAG 2.1 AA compliant
- Works on low-bandwidth connections
- Mobile-first responsive layout

### Performance
- Lighthouse score 90+ on mobile
- No heavy JS frameworks unless necessary — prioritize fast load times for users on slower devices

---

## 6. Information Architecture

```
/ (Home)
  ├── Hero: Mission statement + primary CTA
  ├── What is HealthBridge?
  ├── Featured Resources / Pathways (preview)
  └── Join the community CTA

/resources
  ├── Filter bar (career type, level)
  └── Resource cards (title, description, tags, link)

/pathways
  └── Career Pathway Explorer (interactive roadmaps)

/about
  └── Founder story + mission

/contact
  └── Contact form + email + Join Our Team link

/join
  └── Team interest / application form
```

---

## 7. Technical Requirements

### Stack (Recommended)
- **Framework:** Next.js (App Router) — fast, SEO-friendly, easy to deploy
- **Hosting:** Vercel (free tier sufficient for launch)
- **Styling:** Tailwind CSS + shadcn/ui components
- **CMS:** Notion or a headless CMS (e.g., Sanity free tier) for resource content management — allows non-technical team members to add resources
- **Forms:** React Hook Form + email forwarding to joinhealthbridge@gmail.com (e.g., Resend or Formspree free tier)
- **Analytics:** Vercel Analytics or Plausible (privacy-friendly)

### Constraints
- **Cost: $0** — all services must have free tiers sufficient for launch
- No user authentication required for Phase 1
- No payment processing

---

## 8. Content Requirements

| Page | Content Owner | Status |
|---|---|---|
| Home hero + copy | Founder | To write |
| About / founder story | Founder | Draft provided |
| Resource library (initial 10–15 items) | Team | To compile |
| Career pathway diagrams | Team | To design |
| Contact page copy | Founder | Draft provided |
| Join Our Team form fields | Founder | To define |

---

## 9. Launch Phases

### Phase 1 — MVP (Target: 6 weeks)
- Home, About, Contact, Join pages live
- Static resource library (10–15 curated resources)
- 2 career pathway roadmaps (e.g., Pre-Med, Public Health)
- Mobile-responsive, accessible

### Phase 2 — Growth (Months 2–4)
- Expand resource library to 40+ items with filtering
- Add 3–5 more career pathways
- Newsletter signup + first send
- SEO optimization

### Phase 3 — Community (Months 4–6)
- Student blog / stories section
- Partnerships page
- Volunteer/contributor profiles

---

## 10. Success Metrics

| Metric | Target (3 months post-launch) |
|---|---|
| Unique visitors | 1,000/month |
| Resource page views | 3,000/month |
| Contact / Join form submissions | 50+ |
| Team size | 5–10 active contributors |
| Bounce rate | < 55% |

---

## 11. Out of Scope (Phase 1)

- User accounts / login
- Forum or community chat
- Paid features
- Mobile app
- Internship matching / job board

---

## 12. Open Questions

1. Who owns ongoing content updates — one person or a rotating team?
2. Is there a target launch date tied to a school year or application cycle?
3. Should the site be English-only at launch or plan for multilingual from the start?
4. Are there existing partner organizations to feature at launch?
5. What does "Join Our Team" lead to — a form, an email, or a Notion page?
