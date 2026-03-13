# HADEUL Home

AI, 게임, 소프트웨어 솔루션 기업 **(주)하들소프트(HADEUL)** 공식 웹사이트

> **Live Preview**: `cloudflared tunnel --url http://localhost:7080` (Cloudflare Quick Tunnel)

## Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **UI** | React 19, Tailwind CSS 4 |
| **Animation** | Framer Motion (scroll-driven, kinetic typography, parallax) |
| **Rich Editor** | TipTap v3 (YouTube embed, multi-image upload) |
| **Database** | SQLite (better-sqlite3, WAL mode) |
| **Email** | Nodemailer |
| **Auth** | Bearer Token (admin API) |
| **Styling** | PostCSS, @tailwindcss/postcss |
| **Build** | Turbopack |
| **Deploy** | Docker (multi-stage build, standalone output) |
| **Tunnel** | Cloudflare Tunnel (cloudflared) |

## Database Schema (SQLite)

데이터베이스 파일: `data/hadeul.db`

### categories
| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PK | 카테고리 ID |
| name | TEXT | 카테고리명 (예: AI · Machine Learning) |
| slug | TEXT UNIQUE | URL 슬러그 |
| sort_order | INTEGER | 정렬 순서 |

### portfolio
| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PK | UUID |
| category_id | TEXT FK | 카테고리 참조 |
| client | TEXT | 의뢰사명 |
| title | TEXT | 프로젝트 제목 |
| description | TEXT | 한줄 설명 |
| detail | TEXT | 상세 설명 (HTML, TipTap) |
| architecture | TEXT | 기술 아키텍처 (HTML) |
| image | TEXT | 대표 이미지 URL |
| tech_stack | TEXT | 기술 스택 (쉼표 구분) |
| is_featured | INTEGER | 홈 노출 여부 (0/1) |
| sort_order | INTEGER | 정렬 순서 |
| year | INTEGER | 연도 (레거시) |
| month | INTEGER | 월 (레거시) |
| created_at | TEXT | 생성일 |
| updated_at | TEXT | 수정일 |

### news
| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PK | UUID |
| title | TEXT | 제목 |
| summary | TEXT | 요약 |
| content | TEXT | 본문 (HTML, TipTap) |
| category | TEXT | 카테고리 (Product/Partnership/Investment/Award/Company/Notice) |
| image | TEXT | 대표 이미지 URL |
| is_published | INTEGER | 공개 여부 (0/1) |
| published_at | TEXT | 게시일 |
| created_at | TEXT | 생성일 |
| updated_at | TEXT | 수정일 |

### job_postings
| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PK | UUID |
| title | TEXT | 포지션명 |
| department | TEXT | 부서 |
| job_type | TEXT | 근무 형태 (정규직/계약직/인턴/프리랜서) |
| location | TEXT | 근무지 |
| description | TEXT | 직무 설명 (HTML) |
| requirements | TEXT | 자격 요건 (HTML) |
| is_active | INTEGER | 활성 여부 (0/1) |
| created_at | TEXT | 생성일 |
| updated_at | TEXT | 수정일 |

### settings
| Column | Type | Description |
|--------|------|-------------|
| key | TEXT PK | 설정 키 |
| value | TEXT | 설정 값 |

### page_views
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER PK | 자동 증가 |
| path | TEXT | 페이지 경로 |
| referrer | TEXT | 리퍼러 |
| user_agent | TEXT | 브라우저 UA |
| ip | TEXT | IP 주소 |
| created_at | TEXT | 조회 시각 |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (dark theme, SEO metadata)
│   ├── page.tsx                # 메인 - Hero, 스크롤 텍스트, 포트폴리오, Stats, 파트너 마퀴, CTA
│   ├── globals.css             # Theme, gradients, YouTube embed, chart styles
│   ├── company/page.tsx        # 회사 소개
│   ├── services/page.tsx       # 서비스 상세
│   ├── portfolio/
│   │   ├── page.tsx            # 포트폴리오 목록 (카테고리 필터)
│   │   └── [id]/
│   │       ├── page.tsx        # 상세 (Server Component, SEO/JSON-LD)
│   │       └── PortfolioDetailClient.tsx  # 클라이언트 렌더링
│   ├── news/
│   │   ├── page.tsx            # 뉴스 목록
│   │   └── [id]/
│   │       ├── page.tsx        # 뉴스 상세 (Server Component, SEO/JSON-LD)
│   │       └── NewsDetailClient.tsx
│   ├── careers/
│   │   ├── page.tsx            # 채용 (Hadeul Way, FAQ, 포지션 목록)
│   │   └── [id]/
│   │       ├── page.tsx        # 채용 상세 (Server Component, SEO/JSON-LD)
│   │       └── CareerDetailClient.tsx  # 클라이언트 렌더링
│   ├── inquiry/page.tsx        # 문의 폼
│   ├── admin/
│   │   ├── page.tsx            # 대시보드 (Analytics)
│   │   ├── portfolio/page.tsx  # 포트폴리오 CRUD
│   │   ├── news/page.tsx       # 뉴스 CRUD
│   │   ├── careers/page.tsx    # 채용 CRUD
│   │   └── settings/page.tsx   # 사이트 설정
│   └── api/
│       ├── portfolio/          # GET (목록/필터), POST (생성)
│       │   ├── route.ts
│       │   ├── [id]/route.ts   # GET/PUT/DELETE
│       │   └── upload/route.ts # 이미지 업로드
│       ├── news/               # GET/POST, [id] GET/PUT/DELETE
│       ├── careers/            # GET/POST, [id] GET/PUT/DELETE
│       ├── categories/route.ts
│       ├── inquiry/route.ts    # 문의 메일 발송
│       ├── admin/
│       │   ├── login/route.ts
│       │   ├── settings/route.ts
│       │   └── analytics/route.ts
│       ├── analytics/track/route.ts
│       └── maintenance/route.ts
├── components/
│   ├── Nav.tsx                 # Fixed navigation (glassmorphism)
│   ├── PageFooter.tsx          # 공통 푸터
│   ├── HeroBackgrounds.tsx     # 페이지별 Hero 배경 (비디오, 파티클 등)
│   └── RichEditor.tsx          # TipTap 에디터 (YouTube, 다중 이미지, 링크)
├── lib/
│   ├── db.ts                   # SQLite 초기화 + 마이그레이션
│   └── auth.ts                 # Bearer token 인증
data/
└── hadeul.db                   # SQLite 데이터베이스
public/
├── images/
│   ├── default-portfolio.svg   # 포트폴리오 기본 이미지
│   └── partners/               # 협력사 SVG 로고 (30개)
└── uploads/
    └── portfolio/              # 업로드된 포트폴리오 이미지
scripts/
├── seed-portfolio.cjs          # 초기 포트폴리오 데이터 시드
├── gen-partner-logos.cjs       # 협력사 로고 SVG 생성
└── fix-architecture.cjs        # 아키텍처 필드 마이그레이션
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | 메인 - Hero(AI 영상 + IMAGINE BEYOND REALITY), 스크롤 텍스트, 포트폴리오, Split Reveal, Stats, 파트너 마퀴, CTA |
| `/company` | 회사 소개 - 미션, 비전, 핵심 가치, 연혁, 리더십 |
| `/services` | 서비스 - AI Solutions, Game Development, Software Solutions |
| `/portfolio` | 포트폴리오 - 카테고리 필터, 디폴트 이미지 폴백 |
| `/portfolio/[id]` | 포트폴리오 상세 - SEO 메타, JSON-LD, 아키텍처, 기술스택 배지 |
| `/news` | 뉴스 - DB 기반, 빈 상태 처리 |
| `/news/[id]` | 뉴스 상세 - SEO 메타, JSON-LD |
| `/careers` | 채용 - Hadeul Way (6가지 가치), FAQ, DB 기반 포지션 목록 |
| `/careers/[id]` | 채용 상세 - 직무 소개, 자격 요건, 공고 정보 사이드바 |
| `/inquiry` | 문의 - 문의 유형 카드(2×2), 연락 폼, 오피스 정보 |
| `/admin` | 관리자 대시보드 (Analytics, Portfolio, News, Careers, Settings) |

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

- **SQLite Database** — better-sqlite3, WAL 모드, 자동 마이그레이션
- **Admin System** — 포트폴리오/뉴스/채용 CRUD, 이미지 업로드, 리치 에디터
- **SEO/AEO** — generateMetadata, Open Graph, Twitter Cards, JSON-LD 구조화 데이터
- **Portfolio** — 80+ 프로젝트, 18개 산업 카테고리, 기술 스택 태그, 아키텍처 다이어그램
- **Video Hero** — 각 페이지별 풀스크린 영상 히어로 섹션
- **Career Detail** — 채용 공고 상세 페이지 (Server + Client Component, HTML 렌더링)
- **Partner Marquee** — 협력사 SVG 로고 무한 스크롤
- **Rich Editor** — TipTap v3 (YouTube embed, 다중 이미지 업로드, 링크)
- **Scroll Animations** — StickyScene 스크롤 동기화, kinetic typography, 카운터
- **Dark Theme** — #0a0a0a 베이스, purple/pink/cyan 그라데이션
- **Animated Buttons** — 그라데이션 무한 순환 애니메이션
- **Default Fallback** — 깨진/미등록 이미지 자동 대체
- **Docker** — Multi-stage build, standalone output
