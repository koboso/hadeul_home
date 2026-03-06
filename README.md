# HADEUL Home

AI 기반, 게임, 소프트웨어 솔루션 기업 **하들(HADEUL)** 공식 웹사이트

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **UI** | React 19, Tailwind CSS 4 |
| **Animation** | Framer Motion |
| **Styling** | PostCSS, @tailwindcss/postcss |
| **Build** | Turbopack |
| **Deploy** | Docker (multi-stage build, standalone output) |
| **Proxy** | Nginx Proxy Manager |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (Header + Footer)
│   ├── page.tsx            # Index - cinematic scroll storytelling
│   ├── globals.css         # Theme, gradients, animations
│   └── about/
│       └── page.tsx        # About - mission, values, timeline
└── components/
    ├── Header.tsx          # Responsive nav (glassmorphism)
    ├── Footer.tsx          # 4-column footer
    ├── ScrollReveal.tsx    # Scroll-triggered fade-in
    ├── ScrollText.tsx      # Full-screen scroll text
    ├── ParallaxSection.tsx # Parallax wrapper
    └── CountUp.tsx         # Number count-up animation
```

## Getting Started

```bash
# Install
npm install

# Dev
npm run dev

# Build
npm run build

# Production
npm start
```

## Docker

```bash
# Build & Run
docker compose up -d --build

# Access
http://localhost:3080
```

## Key Features

- Sticky scroll text transitions (cinematic storytelling)
- Horizontal scroll service cards
- Scroll-driven parallax hero
- Animated counters on viewport entry
- Marquee text banner
- Dark theme with glassmorphism
- Responsive mobile navigation
- Multi-stage Docker build (lightweight production image)
