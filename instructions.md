# Siva's Portfolio — "Synapse" Build (Final, From Scratch)

This replaces all earlier drafts. One project description, one design system, one prompt sequence. Build this and nothing else.

---

## Part 1 — Project description

**Who this is for:** Siva Surya P, third-year B.Tech IT student at Sri Shakthi Institute of Engineering and Technology, Coimbatore, CGPA 8.23, graduating 2027. Positioned as an AI Engineer first (LangChain, LangGraph, RAG, Agentic AI, internship at Innomatics Research Labs) with a strong Full Stack secondary track (MERN, Spring Boot, Java). One published patent (HARBOUR Management System). Six real projects spanning computer vision, RAG/LLM systems, and full-stack web apps.

**What we're building:** A personal portfolio designed to do one thing immediately, in the first five seconds, prove this is someone who builds real, connected systems, not a templated student page. Everything visual is built around a single idea: nodes and connections, because that's what Siva's actual work looks like — LangGraph agent workflows, RAG knowledge retrieval, vector embeddings linking related information. The site's signature 3D element isn't decoration borrowed from a generic portfolio template; it's a visual metaphor for the work itself.

**Design name:** Synapse
**One-line pitch:** A dark, glowing portfolio built around a rotating 3D neural node-graph in the hero and animated constellation lines connecting the project grid, visually stunning and tied directly to what an AI/agentic engineer actually builds.

**Explicit instruction for this build:** no minimalism. Every section should feel considered, layered, and a little alive, motion, glow, and depth are not optional accents here, they're the point. The previous lighter, flatter direction is fully discarded.

---

## Part 2 — Design system

### Color palette (locked, exact values)
| Role | Value | Used for |
|---|---|---|
| Canvas | `#0A0A0F` | Page background |
| Surface | `#14141C` | Glass card base (used at 55-65% opacity with blur) |
| Border hairline | `rgba(255,255,255,0.08)` | All card and divider borders |
| Text primary | `#F4F3F7` | Headlines, primary body text |
| Text secondary | `#9C99AB` | Captions, muted text |
| Accent — Electric indigo | `#6C5CE7` | Primary accent, node color, CTA, links |
| Accent — Sunset coral | `#FF6B5B` | Secondary accent, AI/ML tags, connector line glow |
| Signal — Mint | `#00E6A0` | Reserved only for "available for work" status and live GitHub pulse |

### Typography
- **Display:** Bricolage Grotesque (Google Fonts) — used for all headings, bold and a little irregular
- **Body:** Inter
- **Live data numbers only:** JetBrains Mono

### The signature system — what makes this stunning and unique
1. **3D node-graph hero object**: instead of a generic wireframe shape, render 8-12 small glowing spheres ("nodes") connected by thin animated lines ("edges"), slowly rotating in 3D, built with react-three-fiber. Nodes pulse gently and at random intervals one edge "fires" a traveling light pulse along its length, like a signal passing through a network. This is the literal visual metaphor for agentic AI and RAG retrieval.
2. **Constellation scroll connectors**: as the user scrolls past the bento project grid, thin animated SVG lines draw themselves connecting related project cards (e.g. the two AI projects connect to each other, full-stack projects connect to each other), reinforcing the "connected systems" identity across the whole page, not just the hero.
3. **Particle field background**: a sparse, slow-drifting particle layer (simple canvas, not three.js, for performance) across the full page behind all content, like dust suspended in the aurora glow. Subtle, never distracting, opacity capped low.
4. **Kinetic hero typography**: "Siva Surya P" animates in letter by letter on load, each letter rising and fading in with a slight stagger, using framer-motion.
5. **Magnetic buttons**: primary CTA buttons subtly pull toward the cursor when it's within ~40px, using a spring-based transform, releasing smoothly when the cursor moves away.
6. **Glass bento cards everywhere** with a gradient-ring hover border (indigo to coral) and a soft internal glow that intensifies on hover.
7. **Glowing custom cursor**: small dot that grows and shifts to coral over clickable elements, disabled entirely on touch devices.
8. **Grain overlay** at very low opacity across the whole canvas, for texture and depth instead of a flat dark void.
9. **Aurora glow**: soft indigo-to-coral radial gradient behind the 3D hero object, bleeding gently into the page, never applied to text or buttons directly.

### Non-negotiable performance rule
Every effect above must degrade gracefully. The 3D scene, particle field, and magnetic buttons must all check for `prefers-reduced-motion` and disable themselves if it's set, and the 3D scene specifically must never block Largest Contentful Paint. Visual richness is the goal, but a slow site fails the goal it's trying to serve.

---

## Part 3 — Prompt 0: set the role and context (run this first, always)

```
You are my senior frontend engineer and design partner for this project. Read this entire message before doing anything, it's the context for everything I'll ask you to build over the next several prompts. Don't write any code yet.

WHO I AM:
I'm Siva Surya P, a third-year B.Tech Information Technology student at Sri Shakthi Institute of Engineering and Technology, Coimbatore (CGPA 8.23, graduating 2027). I'm positioning myself primarily as an AI Engineer (LangChain, LangGraph, RAG pipelines, Agentic AI) with a strong secondary track in Full Stack development (MERN, Spring Boot, Java). I completed an Agentic AI internship at Innomatics Research Labs (Feb-May 2026) building LangGraph workflows and RAG pipelines. I have one published patent (Harbour Management System) and 5 real projects spanning computer vision, RAG/LLM systems, and full-stack web apps.

WHAT WE'RE BUILDING:
A maximally visual, "Synapse" themed portfolio. The core idea: nodes and connections, because that's literally what my work looks like (agent workflows, RAG retrieval graphs, vector embeddings). This is not a minimal design, motion, glow, and depth are the point, not accents. Don't simplify anything below for the sake of "cleaner" design unless I ask.

DESIGN DIRECTION - exact values, follow strictly:
- Canvas: #0A0A0F. Glass surface: #14141C at 55-65% opacity with backdrop-blur. Border hairline: rgba(255,255,255,0.08).
- Text: primary #F4F3F7, secondary #9C99AB.
- Accent indigo #6C5CE7 is the primary accent (CTAs, nodes, links). Accent coral #FF6B5B is secondary (AI/ML tags, connector glow, second aurora color). Signal mint #00E6A0 is reserved ONLY for an "available for work" status dot and a live GitHub commit pulse, nowhere else.
- Typography: Bricolage Grotesque for all headings via next/font/google, Inter for body, JetBrains Mono only for small live data numbers.
- The hero contains a 3D node-graph: 8-12 glowing spheres connected by thin lines, slowly rotating, built with react-three-fiber, with occasional traveling light pulses along the connector lines to suggest signals passing through a network.
- The bento project grid has animated SVG connector lines that draw themselves on scroll, linking related projects (AI projects connect to each other, full-stack projects connect to each other).
- A sparse drifting particle field sits behind all content site-wide, built with plain canvas (not three.js) for performance, opacity kept low.
- Hero headline text animates in letter by letter on load.
- Primary CTA buttons have a magnetic pull effect toward the cursor within about 40px.
- All cards are glass-style with a gradient-ring hover border (indigo to coral) and a soft glow that intensifies on hover.
- A custom glowing cursor dot grows and shifts to coral over clickable elements, disabled on touch devices.
- A subtle grain overlay sits across the whole page at low opacity.
- Every motion effect (3D rotation, particles, magnetic buttons, cursor) must check prefers-reduced-motion and disable itself if set. The 3D scene must never block Largest Contentful Paint, it lazy-loads client-side only, with a static aurora-gradient fallback on mobile and low-power devices.
- Bento grid sizing must encode importance, my two AI/ML projects get larger cells than the full-stack and systems projects, never random sizing.

TECH STACK - confirmed, don't deviate without asking me first:
Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, react-three-fiber + drei + three.js, Zod, Resend, Upstash Redis, the Anthropic Claude API for an "Ask Siva" chatbot, GitHub GraphQL API for live stats, deployed on Vercel.

HOW I WANT YOU TO WORK WITH ME:
- I'll send a series of prompts, one at a time, each building on the last. Keep prior decisions (file structure, design tokens, data shapes) consistent across all of them.
- Before a significant architectural choice I haven't specified, ask me in one short sentence rather than assuming silently.
- After each prompt, give me a short summary of what changed and any manual steps I need to take.
- Flag clearly if a specific effect would hurt performance or accessibility on real devices, but still build what I asked with the safest implementation, don't quietly water down the visual ambition without telling me first.
- Don't add features, libraries, or sections I haven't asked for in a given prompt.

Confirm you understand this, then wait for my next message before writing any code.
```

---

## Part 4 — Full prompt sequence

### Phase 0 — Setup

**Prompt 1**
```
Create a new Next.js 14 project, App Router, TypeScript. Set up Tailwind CSS v3 and shadcn/ui with the "neutral" base (we will override colors). Install framer-motion, lucide-react, zod, resend, three, @react-three/fiber, @react-three/drei.
Folder structure: app/ (page.tsx, layout.tsx, globals.css), components/ (sections/, ui/, three/, effects/), lib/ (utils.ts, data.ts), public/ (images/, resume/, textures/).
Scaffold only, confirm it runs, no UI yet.
```

**Prompt 2**
```
Set up the Synapse design tokens in globals.css and tailwind.config.ts:
Colors: canvas #0A0A0F, surface #14141C (plus a surface-glass variant at 60% opacity), border-hairline rgba(255,255,255,0.08), text-primary #F4F3F7, text-secondary #9C99AB, accent-indigo #6C5CE7, accent-coral #FF6B5B, signal-mint #00E6A0.
Fonts via next/font/google: Bricolage Grotesque as --font-display, Inter as --font-body, JetBrains Mono as --font-data.
Utilities: .glass-card (surface-glass background, backdrop-filter blur(16px), 1px hairline border, 16px radius), .hover-gradient-ring (pseudo-element gradient border indigo-to-coral at 135deg, 0 to 1 opacity on hover), .grain-overlay (fixed full-screen low-opacity noise texture, pointer-events none, placeholder image for now).
Default page background canvas, default text color text-primary. No components yet.
```

**Prompt 3**
```
Create lib/data.ts with full TypeScript interfaces and this data:

PROFILE: Siva Surya P. Titles: "AI Engineer" / "Python Developer" / "Full Stack Engineer". Email sivatechie17@gmail.com. Phone +91 9087474500. Education: B.Tech IT, Sri Shakthi Institute of Engineering and Technology, Coimbatore, CGPA 8.23, graduating 2027. HSC: Bishop Ubagarasamy Matric Hr. Sec. School, Tirupur, 85%.

INTERNSHIP: Agentic AI Intern, Innomatics Research Labs, Feb 2026-May 2026. Built Agentic AI workflows using LangGraph and LLMs. Implemented RAG pipelines with vector databases for context-aware responses.

SKILLS by category: Languages (Python, JavaScript, Java, Data Structures & Algorithms), AI/ML & GenAI (NumPy, Pandas, LangChain, LangGraph, RAG, HuggingFace Transformers, OpenCV), Frameworks (FastAPI, Node.js, Express.js, React.js, Spring Boot), Databases (MongoDB, ChromaDB), Tools (REST APIs, Git/GitHub, Postman, VS Code).

CERTIFICATIONS: Python Professional Course - Infosys SpringBoard, Java Professional Course - Infosys SpringBoard, Prompt Engineering - DeepLearning.AI.

PROJECTS, with id, category ("ai" | "fullstack" | "systems"), featured boolean:
1. id "nulaware-ai", "NulAware AI - Interactive Data Profiling Assistant", category "ai", featured true. Pitch: Interactive data profiling assistant built with Streamlit, ChromaDB, and Gemini. Enables CSV upload, automated profiling, semantic retrieval, natural-language Q&A, and PDF reports. Bullets: Automated CSV profiling, schema analysis, and data quality scoring; Semantic indexing and retrieval pipeline with ChromaDB vector store; Multi-agent LangGraph orchestrator for intent classification and RAG; Dynamic data visualization dashboard and PDF report compilation. Stack: Streamlit, ChromaDB, Gemini API, LangGraph, ydata-profiling, Python, Plotly. Demo: https://huggingface.co/spaces/yaliniBabukannan/Nullaware
2. id "rag-assistant", "RAG-Based Customer Support Assistant | NovaTech Solutions", category "ai", featured true. Pitch: RAG-based customer support assistant retrieving context-aware responses from enterprise knowledge bases using vector search and LLM reasoning. Bullets: intent-based routing, vector search with embeddings, Human-in-the-Loop escalation, Streamlit chat interface. Stack: Python, LangChain, LangGraph, Gemini API, ChromaDB, Streamlit, HuggingFace Embeddings.
3. id "gesture-cursor", "Cursor Movement by Hand Gesture", category "ai", featured true. Pitch: computer vision app for hands-free mouse control via real-time hand gestures from webcam. Bullets: hand landmark detection mapped to move, left-click, right-click, double-click, scroll. Stack: Python, OpenCV, MediaPipe, PyAutoGUI, NumPy.
4. id "college-sphere", "College Sphere - Multi-College Events Management System", category "fullstack", featured false. Pitch: full-stack MERN app for multi-college event management, centralized creation/registration/tracking. Bullets: role-based auth (Super Admin, College Admin, Student), responsive UI, scalable backend. Stack: React, Node.js, Express.js, MongoDB, Cloudinary, OTP Authentication.
5. id "attendance-system", "Automated Attendance Management System", category "fullstack", featured false. Pitch: full-stack MERN role-based attendance platform with student/teacher/admin dashboards. Bullets: biometric & face-recognition, offline QR attendance, poll/video attendance, analytics export. Stack: MongoDB, Express.js, React.js, Node.js, Spring Boot, Face Recognition APIs, QR Module.
6. id "parking-system", "Parking Lot Management System", category "systems", featured false. Pitch: console-based parking system with real-time entry/exit, dynamic slot assignment, automated billing. Stack: Java, OOP, Collections (HashMap, Queue).

PATENT: "HARBOUR Management System", published in International Journal of Progressive Research in Engineering Management and Science.

AREAS OF INTEREST: Generative AI and Backend Applications, Full Stack Web Development, Mobile & Web Application Development.

Export typed constants ready for import.
```

### Phase 1 — The signature 3D node-graph hero

**Prompt 4**
```
Create components/three/NodeGraphScene.tsx, a client component using react-three-fiber.
Generate 10 nodes as small glowing spheres (radius 0.08, emissive accent-indigo #6C5CE7) positioned in a loose 3D cluster within a sphere of radius 2.2, using a deterministic pseudo-random layout so it's identical on every load (no Math.random without a fixed seed).
Connect a sensible subset of nodes with thin line edges (accent-indigo at low opacity) so the result looks like a small neural network or knowledge graph, not a fully connected mesh, around 14-16 edges total.
Animate slow continuous rotation of the whole group (one full rotation roughly every 50 seconds) using useFrame.
Every few seconds, pick a random edge and animate a small bright point (color accent-coral #FF6B5B) traveling from one end to the other over about 1.5 seconds, to suggest a signal or data packet moving through the network. Stagger multiple pulses so it never feels mechanical or evenly timed.
Add a soft ambient light and one point light tinted toward accent-coral behind the cluster for the aurora glow effect.
Add a parallax tilt: the whole group rotates slightly (max 8 degrees) toward the mouse position, lerped smoothly.
Cap dpr at [1, 1.5], use frameloop "demand" with invalidate-on-interaction. Use dynamic import with ssr: false. Render nothing until mounted client-side.
```

**Prompt 5**
```
Create components/three/NodeGraphFallback.tsx: a static image or CSS approximation, a radial gradient blending accent-indigo and accent-coral at low opacity, with a few small static dots scattered to vaguely suggest the node graph shape, no animation, no JS.
In the hero section, render NodeGraphFallback instead of the real Canvas when viewport width is under 768px or prefers-reduced-motion is set. Use a simple media query check.
Confirm zero layout shift when switching between the two.
```

### Phase 2 — Site-wide atmosphere

**Prompt 6**
```
Create components/effects/ParticleField.tsx: a full-page fixed canvas (not three.js, plain 2D canvas API) rendering 40-60 small soft dots in text-secondary color at very low opacity, drifting slowly in random directions, wrapping around when they leave the viewport.
Mount this once in the root layout, behind all page content, pointer-events none.
Disable entirely if prefers-reduced-motion is set. Cap the animation to a reasonable frame rate (throttle to ~30fps) to avoid unnecessary battery drain.
```

**Prompt 7**
```
Create components/effects/GrainOverlay.tsx: a fixed full-screen div with a subtle noise/grain texture at 4% opacity, pointer-events none, mix-blend-mode overlay, sitting above the particle field but below page content in z-index. Use a placeholder texture for now and add a code comment noting Siva should swap in a real grain PNG from public/textures/.
Mount this in the root layout alongside the particle field.
```

**Prompt 8**
```
Create components/effects/CustomCursor.tsx: a small circular dot (8px, accent-indigo) following the mouse with slight lag via framer-motion spring physics.
On hovering any link, button, or card, it scales to 32px and shifts to accent-coral with a smooth transition.
Only render and only hide the native cursor on devices with "(pointer: fine)" via matchMedia, never on touch devices.
Mount in the root layout.
```

**Prompt 9**
```
Create a useMagnetic hook in lib/useMagnetic.ts: given a ref to a button element, track mouse distance to its center, and within a 40px radius apply a spring-based transform pulling the button up to 8px toward the cursor, releasing smoothly back to center when the cursor leaves that radius.
Apply this hook to the primary CTA buttons we'll build in the hero (Prompt 12). Don't build the buttons yet, just the hook, with a short usage comment.
```

### Phase 3 — Navigation and command palette

**Prompt 10**
```
Build a floating glass dock nav (.glass-card), centered, fixed top, pill-shaped.
Links: About, Skills, Projects, Internship, Patent, Resume, Contact.
A signal-mint pulsing dot plus "Available for work" text on the left.
Shrinks and intensifies blur on scroll, animated with framer-motion.
A "Cmd+K" hint pill on the right opening the command palette built next.
```

**Prompt 11**
```
Build a command palette triggered by Cmd+K / Ctrl+K, glass-styled modal, with commands: "Go to Projects", "Go to Skills", "Download Resume", "Open GitHub", "Open LinkedIn", "Copy email address", "Ask Siva (AI)". Fuzzy filter as the user types. Darkened blurred scrim behind it. Fade and scale in with framer-motion.
```

### Phase 4 — Hero and about

**Prompt 12**
```
Build the hero section layered over NodeGraphScene/NodeGraphFallback.
"Siva Surya P" animates in letter by letter on load (stagger each letter's rise and fade with framer-motion).
Below it, a rotating subtitle cycling "AI Engineer" / "Python Developer" / "Full Stack Engineer" with AnimatePresence.
One sentence below that, in text-secondary, positioning him around agentic AI systems and RAG pipelines.
A stat row in JetBrains Mono: "05 Projects", "01 Patent Published", "8.23 CGPA", "01 Internship - Innomatics", counting up on scroll into view.
Two CTA buttons using the useMagnetic hook from Prompt 9: "View projects" (solid accent-indigo, white text, soft glow shadow) and "Download resume" (outline, .hover-gradient-ring).
Add a subtle dark scrim behind the text block if needed so it stays readable over the 3D scene and particle field.
```

**Prompt 13**
```
Build the About section as a .glass-card, two columns on desktop, one on mobile.
Left: first-person bio covering the B.Tech IT degree at Sri Shakthi Institute of Engineering and Technology, the Agentic AI internship at Innomatics, and interest in Generative AI and backend applications.
Right: education timeline (Sri Shakthi Institute CGPA 8.23, expected 2027; Bishop Ubagarasamy Matric Hr. Sec. School, 85%, 2023) plus the 3 certifications as a checklist.
Apply .hover-gradient-ring to this card.
```

### Phase 5 — Skills and the constellation project grid

**Prompt 14**
```
Build the Skills section, grouped into the 5 categories from data.ts. Each skill as a small glass chip, hairline border, slightly brighter glass on hover. Stagger in with framer-motion whileInView, 0.03s delay per chip. Category labels in Bricolage Grotesque, skill names in Inter.
```

**Prompt 15**
```
Build the Projects bento grid: CSS grid with mixed cell sizes, each cell a .glass-card with .hover-gradient-ring. Featured projects (rag-assistant, gesture-cursor) take 2x1 wide cells, the rest take 1x1.
Each card: title (Bricolage Grotesque), 1-2 line pitch (Inter, text-secondary), tech stack as small glass chips, "View on GitHub" link with external-link icon, accent-indigo on hover.
Category tag: "ai" gets accent-coral tinted label, others get neutral text-secondary label.
Featured cards include a 16:9 placeholder for a future demo GIF, with a code comment noting Siva will replace this with real screen recordings.
Filter tabs above the grid: All, AI/ML, Full Stack, Systems, filtering with framer-motion's layout prop for smooth reflow.
```

**Prompt 16**
```
Add an SVG overlay layer above the projects bento grid (absolutely positioned, pointer-events none, matching the grid's bounding box) that draws thin animated connector lines between related project cards: the two "ai" category cards connect to each other, and the "fullstack" category cards connect to each other.
Use a stroke in accent-indigo at low opacity with a soft accent-coral glow filter. Animate each line drawing itself (stroke-dashoffset technique) when the projects section scrolls into view, using framer-motion's whileInView or an Intersection Observer.
Recalculate line endpoints on window resize so they stay attached to the correct card corners.
```

**Prompt 17**
```
Add a "Details" interaction to each bento project card: clicking "Details" opens a glass-style modal (slide-over on mobile) showing a fuller case study, pitch, problem, approach, architecture bullets, and what it demonstrates, pulled from a new projectDetails object in lib/data.ts keyed by project id.
Scaffold the structure with one example project filled in, I will paste in the rest of the case study content myself.
Close on overlay click, Escape, or a close button. Animate in with framer-motion fade and scale.
```

### Phase 6 — Credibility sections

**Prompt 18**
```
Build the Internship section as a vertical timeline in a .glass-card: "Agentic AI Intern - Innomatics Research Labs", "Feb 2026 - May 2026", with the two bullet points about LangGraph workflows and RAG pipelines. Code comment noting this should extend cleanly if more internships are added later.
```

**Prompt 19**
```
Build the Patent & Publication section as a single .glass-card with a softly glowing accent-indigo document icon, showing "HARBOUR Management System" and "International Journal of Progressive Research in Engineering Management and Science".
```

**Prompt 20**
```
Build the Resume section: two glass cards with .hover-gradient-ring, "AI Engineer Resume" and "Full Stack Resume", each with a solid accent-indigo download button and a "Preview" toggle expanding an inline react-pdf viewer. PDFs at public/resume/Sivasurya_AI_Engineer_Resume.pdf and public/resume/Sivasurya_FullStack_Resume.pdf.
```

### Phase 7 — Contact and intelligence layer

**Prompt 21**
```
Build the Contact section as a .glass-card with a form (Name, Email, Message) posting to app/api/contact/route.ts, validated with Zod, sent via Resend.
Submit button: solid accent-indigo with a soft glow shadow and the magnetic hook applied. Success state: signal-mint checkmark animation. Friendly error/retry state on failure.
Below the form, direct links (email, phone, GitHub, LinkedIn, LeetCode) as glass icon buttons with the custom cursor's coral hover effect.
```

**Prompt 22**
```
Build the "Ask Siva" floating chat widget, bottom-right, collapsed as a round glass button with a glowing indigo ring, expanding into a .glass-card chat panel.
Create app/api/chat/route.ts calling the Claude API (model claude-sonnet-4-6) via the Anthropic SDK with a system prompt containing Siva's full resume context.
Stream the response with the Vercel AI SDK, soft indigo typing-dot animation while waiting.
Rate limit with Upstash Redis, 5 messages per visitor IP per day, with a friendly limit-reached message.
Fallback message "Siva's AI assistant is taking a quick break, try again shortly" if the API call fails.
```

**Prompt 23**
```
Create a server component fetching live data from the GitHub GraphQL API (commits this year, pinned repos, total stars) for username [Siva's GitHub username], with Next.js ISR at a 1-hour revalidate.
Display a stats strip near Projects: total commits, top pinned repo with stars, a signal-mint pulsing dot next to "synced live", and a "view full GitHub" link. Token stored as GITHUB_TOKEN in .env.local.
```

### Phase 8 — Performance, polish, and deploy

**Prompt 24**
```
Audit performance with special attention to every signature effect:
- Confirm the 3D node-graph scene never delays Largest Contentful Paint, hero text and CTAs must be visible and interactive before the 3D scene finishes loading.
- Confirm the particle field is throttled and doesn't cause jank while scrolling.
- Confirm glass blur isn't applied to too many simultaneously visible cards at once on mid-range devices, reduce blur intensity rather than removing the effect if needed.
- Confirm the magnetic buttons and custom cursor don't cause layout shift.
- Confirm prefers-reduced-motion disables the 3D rotation, particle drift, magnetic pull, connector line animation, and cursor scaling, with static fallbacks for each.
- Run a mental Lighthouse check, fix anything below 85 performance or 95 accessibility.
```

**Prompt 25**
```
Add metadata to app/layout.tsx (title, description, Open Graph tags). Generate a dynamic OG image at app/api/og/route.tsx via @vercel/og showing Siva's name, title, and a static rendering of the aurora gradient.
Add app/robots.ts and app/sitemap.ts.
Add .env.example listing RESEND_API_KEY, ANTHROPIC_API_KEY, GITHUB_TOKEN, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN.
Add a README.md with setup instructions and a final Vercel environment variable checklist.
```

---

## Part 5 — Before you launch

- Record real screen captures for the hand gesture cursor project and the RAG assistant before swapping out the Prompt 15 placeholders, this is the single highest-impact manual step in the whole build.
- Test the 3D node-graph hero on your actual phone early, not just in browser dev tools, the fallback in Prompt 5 exists because this is the riskiest piece for mobile performance.
- Don't skip Prompt 24, it's the difference between "visually stunning" and "visually stunning but slow," which is a worse outcome than either plain or fast alone.
- Intel Unnati (OpenVINO, Intel Geti, INT8 quantization) isn't on either resume you've shared, if that internship is current, Prompt 18 is structured to extend cleanly for it.
- This file fully replaces every earlier prompt set, build only from this one.
