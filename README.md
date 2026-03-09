# HADEUL Home

AI, 게임, 소프트웨어 솔루션 기업 **(주)하들소프트(HADEUL)** 공식 웹사이트

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **UI** | React 19, Tailwind CSS 4 |
| **Animation** | Framer Motion (scroll-driven, kinetic typography) |
| **Styling** | PostCSS, @tailwindcss/postcss |
| **Build** | Turbopack |
| **Deploy** | Docker (multi-stage build, standalone output) |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout (dark theme)
│   ├── page.tsx              # Index - immersive scroll + kinetic typography
│   ├── globals.css           # Theme, gradients, animations
│   ├── company/
│   │   └── page.tsx          # Company - mission, values, timeline, leadership
│   ├── services/
│   │   └── page.tsx          # Services - AI, game, software detail
│   ├── news/
│   │   └── page.tsx          # News - category filter, article list
│   ├── careers/
│   │   └── page.tsx          # Careers - perks, open positions
│   └── inquiry/
│       └── page.tsx          # Inquiry - contact types, form
└── components/
    ├── Nav.tsx               # Fixed navigation (transparent → blur on scroll)
    └── PageFooter.tsx        # Shared footer
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | 메인 - Hero(AI 영상 + kinetic text), 스크롤 텍스트 리빌, 수평 갤러리, 스플릿 리빌, 통계, 비디오, CTA |
| `/company` | 회사 소개 - 미션, 비전, 핵심 가치, 연혁, 리더십 |
| `/services` | 서비스 - AI Solutions, Game Development, Software Solutions 상세 |
| `/news` | 뉴스 - 카테고리별 소식 리스트 |
| `/careers` | 채용 - 복리후생, 채용 포지션 |
| `/inquiry` | 문의 - 문의 유형, 연락 폼, 오피스 정보 |

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
# Development (hot reload, port 7080)
docker compose -f docker-compose.dev.yml up -d

# Production (port 7080)
CACHE_BUST=$(date +%s) docker compose build
docker compose up -d

# Rebuild (cache bust)
CACHE_BUST=$(date +%s) docker compose build --no-cache
docker compose up -d --force-recreate
```

## Key Features

- **Scroll-synced animations** — StickyScene 패턴으로 스크롤과 컨텐츠 완벽 동기화
- **Kinetic typography** — Hero 섹션 텍스트 애니메이션 (CREATE / INNOVATE / TRANSFORM)
- **Scroll text reveal** — 스크롤에 따라 단어별 opacity 활성화 + 프로그레스 바
- **Horizontal scroll gallery** — 서비스 카드 횡스크롤 (sticky + translateX)
- **Split reveal** — 좌우 이미지 분리 + 중앙 텍스트 등장
- **AI video backgrounds** — Pexels 로열티프리 AI 관련 영상
- **Animated counters** — 뷰포트 진입 시 숫자 카운트업
- **Dark theme** — #0a0a0a 베이스, purple/pink/cyan 그라데이션 악센트
- **Fixed nav** — 스크롤 시 glassmorphism 배경 전환
- **Multi-stage Docker** — Node.js standalone 빌드, 경량 프로덕션 이미지
