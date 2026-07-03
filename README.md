# Siva Surya P — "Synapse" Portfolio

A dark, glowing portfolio themed around nodes and connections, representing Siva's work in AI Agent workflows, RAG knowledge retrieval, and full-stack engineering.

## 🛠️ Tech Stack
*   **Framework:** Next.js 14 (App Router, TypeScript)
*   **Styling:** Tailwind CSS v3, shadcn/ui
*   **3D Graphics:** React Three Fiber, Three.js, React Three Drei
*   **Animations:** Framer Motion, HTML5 2D Canvas
*   **API / DB:** Resend (Emails), Gemini API (Google GenAI), Upstash Redis (Rate Limiting)
*   **Host:** Vercel

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the credentials in `.env.local`. If you leave them empty, the application will fallback to **Simulation Mode** (mocking the contact submissions, Github stats, and chatbot replies) without throwing compile or runtime crashes!

### 3. Place Resume PDFs
Store your PDF resumes in:
*   `public/resume/Sivasurya_AI_Engineer_Resume.pdf`
*   `public/resume/Sivasurya_FullStack_Resume.pdf`

### 4. Place Recording Assets (Optional)
If you wish to show screen captures of your featured projects instead of the placeholder visual frames, place your image/GIF/video assets in `public/images/` and reference them in the featured bento cards in `components/sections/Projects.tsx`.

### 5. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it.

---

## 🏗️ Folder Structure
*   `app/` — Pages (`page.tsx`), root shell (`layout.tsx`), global styles (`globals.css`), and API route handlers (`api/`)
*   `components/`
    *   `sections/` — Main scroll pages (Hero, About, Skills, Projects, Internship, Patent, Resume, Contact, Navbar, ChatWidget)
    *   `three/` — R3F Canvas scene (`NodeGraphScene`) and static CSS fallback (`NodeGraphFallback`)
    *   `effects/` — Canvas particles (`ParticleField`), cursors (`CustomCursor`), and overlays (`GrainOverlay`)
    *   `ui/` — Global modals and popup inputs (`CommandPalette`)
*   `lib/` — Data collections (`data.ts`) and magnetic hooks (`useMagnetic.ts`)
*   `public/` — Static assets (images, resumes, textures)

---

## 🌐 Vercel Deployment Checklist

When deploying to Vercel, navigate to the project dashboard under **Settings > Environment Variables** and add the following keys:

1.  `RESEND_API_KEY` — API key from Resend for forwarding contact submissions.
2.  `GEMINI_API_KEY` — Google AI Studio key for chatbot queries.
3.  `GITHUB_TOKEN` — Personal access token from GitHub settings with `read:user` scopes.
4.  `UPSTASH_REDIS_REST_URL` — Redis REST URL endpoint.
5.  `UPSTASH_REDIS_REST_TOKEN` — Redis Token credentials.
6.  `NEXT_PUBLIC_EMAIL` — Public email address displayed across UI components (e.g. contact sections, badges).
7.  `NEXT_PUBLIC_PHONE` — Public phone number displayed across UI components.

---

## 🎨 Performance & Accessibility Features
*   **Graceful Degradation:** Views automatically swap Three.js canvas for static CSS grids on mobile widths (<768px) and when `prefers-reduced-motion` is active to optimize load times and preserve battery life.
*   **30 FPS Lock:** The drifting particle field is throttled to 30 FPS, preventing CPU spikes and layout stuttering.
*   **No Layout Shifts:** Canvas dimensions are bound to fallback layers, maintaining zero layout shifts (CLS) on transition thresholds.
