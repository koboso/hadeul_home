# Feedback Work List

## 2026-03-13 작업 내역

### 1. 포트폴리오/뉴스 리스트 페이지 UX 개선

**피드백 사항:**
- 리스트 페이지 로딩 시 로딩 상태를 알려주는 UI/UX 필요
- 무한 스크롤 효과 개선 필요

**작업 내용:**

#### 1-1. 스켈레톤 로딩 UI 추가
- 포트폴리오: 6개 카드 형태의 pulse 애니메이션 스켈레톤
- 뉴스: 4개 바 형태의 pulse 애니메이션 스켈레톤
- 최초 데이터 로딩 중 자연스러운 로딩 상태 표시

#### 1-2. Staggered 렌더링 (행 단위 순차 표시)
- 데이터 로딩 완료 후 한꺼번에 표시하지 않고 3개씩 순차적으로 표시
- 포트폴리오: 3개씩 120ms 간격으로 등장
- 뉴스: 3개씩 100ms 간격으로 등장
- CSS `@keyframes fadeInUp` 애니메이션 적용 (아래에서 위로 페이드인)
- 카테고리/탭 변경 시에도 동일한 stagger 효과 적용

#### 1-3. Intersection Observer 무한 스크롤
- 기존 방식 대신 Intersection Observer API 기반 무한 스크롤 구현
- `rootMargin: "200px"` 설정으로 하단 200px 전에 미리 다음 배치 로딩
- 추가 로딩 시에도 stagger 효과 유지

#### 1-4. 저사양 기기 대응
- framer-motion `whileInView` 제거, 순수 CSS 애니메이션으로 교체
- `animate-[fadeInUp_0.4s_ease-out_both]` + `animationDelay` 조합
- GPU 가속 없이도 부드러운 애니메이션 제공

**수정 파일:**
- `src/app/portfolio/page.tsx` — staggered infinite scroll 적용
- `src/app/news/page.tsx` — staggered infinite scroll 적용
- `src/app/globals.css` — fadeInUp keyframe, feed-scroll 스크롤바 스타일 추가

---

### 2. Cloudflare Tunnel 설정

**작업 내용:**
- ngrok 무료 플랜 대역폭 초과로 대안 필요
- cloudflared 설치 (MSI)
- Quick Tunnel 모드로 외부 접근 설정 (도메인 불필요)
- 포트: 7080 (Docker dev 환경)

---
