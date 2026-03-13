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

### 2. 서비스 페이지 — 개발 프로세스 섹션 리디자인

**피드백 사항:**
- 개발 프로세스가 다른 섹션 대비 밋밋함
- 클릭 시 상세 내용을 보여주는 인터랙션 필요
- 2025년 트렌드 기반 다이나믹한 UI 요구

**작업 내용:**

#### 2-1. 인터랙티브 타임라인 카드
- 6개 스텝을 클릭 가능한 카드로 변경
- 각 단계별 고유 컬러 (purple → indigo → cyan → emerald → pink → amber)
- hover 시 lift + scale 애니메이션, 카드 간 화살표 커넥터

#### 2-2. 활성 상태 다이나믹 효과
- 아이콘 pulse ring 이중 애니메이션
- 배경 shimmer 그라데이션
- 하단 바운싱 화살표 인디케이터

#### 2-3. 확장 상세 패널
- 클릭 시 아래로 패널 확장 (주요 활동 + 산출물)
- 체크마크 아이콘 spring 등장, 산출물 태그 회전+스케일 등장
- 배경 glow 호흡 애니메이션
- 이전/다음 스텝 네비게이션 + 도트 인디케이터

#### 2-4. AI/SW 프로젝트 영상 영역 개선
- `object-cover` → `object-contain` + 패딩으로 영상 전체 표시
- 잘리지 않고 여백 내에서 영상 비율 유지

**수정 파일:**
- `src/app/services/page.tsx` — 개발 프로세스 인터랙티브 리디자인, 영상 영역 개선

---

### 3. 메인 페이지 수정

**작업 내용:**

#### 3-1. 2번 섹션 텍스트 변경
- "specialized e-commerce" → "complex corporate challenges"
- "gaming" 하이라이트 추가

#### 3-2. 4번 SplitReveal 즉시 표시
- StickyScene(250vh 스크롤 연동) 제거
- `useInView`로 뷰포트 30% 진입 시 즉시 이미지 좌우 분리 + 텍스트 등장
- `once: false`로 설정하여 벗어났다 돌아오면 닫혔다 다시 열리는 트릭 효과

#### 3-3. Nav 하단 보더 제거
- 스크롤 시 나타나는 `border-b border-white/5` 제거 (로딩바처럼 보이던 이슈)

**수정 파일:**
- `src/app/page.tsx` — 텍스트 변경, SplitReveal 리팩터링
- `src/components/Nav.tsx` — 하단 보더 제거

---

### 4. 회사소개 페이지 — Core Competence 개선

**피드백 사항:**
- 핵심 역량 카드 순서 변경 및 제목 리네이밍 (더 임팩트 있게)
- 기술 태그·스택 면밀 점검 (게임 엔진이 다른 카테고리에 들어가면 안 됨)
- 모달 팝업 영상 위치 상단으로 조정

**작업 내용:**

#### 4-1. 카드 순서 변경 & 제목 리네이밍
- 순서: AI & Deep Tech → Digital Product → IoT & Edge → Defense & Maritime → Interactive Contents → Cloud & Infra
- 서브타이틀 정리: 인공지능·딥러닝, 웹·앱·SaaS, 스마트 인더스트리, 국방·해양 특수체계, 인터랙티브 콘텐츠, 클라우드·DevOps

#### 4-2. 기술 태그·스택 점검
- Defense & Maritime: Unity/Unreal 제거 → HLA/DIS, 3D 시뮬레이션 (국방 표준 프로토콜)
- Defense 보안 & 인프라: 컨테이너 보안 → 보안 OS
- IoT 카드 태그: Dashboard → OPC-UA (산업 프로토콜)
- Game 카드 태그: TypeScript → 멀티플레이어 (→ 이후 C# C++ 으로 최종 변경)

#### 4-3. 모달 영상 위치 조정
- 영상/이미지 컨테이너: `items-center` → `items-start` (상단 정렬)
- 높이: `h-full` → `h-[60%]` (영상 영역 축소, 텍스트 영역 확보)
- 패딩 축소: `p-4` → `p-3`

**수정 파일:**
- `src/app/company/page.tsx` — COMPETENCES 데이터 순서·제목·태그·스택 변경, 모달 영상 위치 조정

---

### 5. 서비스 페이지 — 간격 축소 & 다이나믹 효과 추가

**피드백 사항:**
- 각 섹션별 간격이 너무 넓음
- 전체적으로 다이나믹한 느낌이 부족

**작업 내용:**

#### 5-1. 섹션 간격 축소
- 서비스 섹션: `min-h-screen py-20` → `py-16 md:py-24` (min-h-screen 제거)
- 프로세스 섹션: `py-32` → `py-20 md:py-24`
- CTA 섹션: `py-32` → `py-20 md:py-24`

#### 5-2. 스크롤 다이나믹 효과
- 스크롤 기반 scale 트랜지션 (0.95→1→0.97)
- 서비스 번호 blur-in 등장 효과
- 제목 skewY 슬라이드 애니메이션
- 태그 순차 spring 팝업 등장 (stagger 60ms)

#### 5-3. 카드 인터랙션
- Featured Project 카드 3D tilt 호버 (rotateX/Y + perspective)
- 영상 호버 시 1.03x 확대 효과
- 카드 보더 호버 시 밝아짐

#### 5-4. 섹션 구분 요소
- 섹션 간 그라데이션 라인 구분선 (scaleY 애니메이션)

**수정 파일:**
- `src/app/services/page.tsx` — 간격 축소, 다이나믹 모션 효과 추가

---

### 6. Cloudflare Tunnel 설정

**작업 내용:**
- ngrok 무료 플랜 대역폭 초과로 대안 필요
- cloudflared 설치 (MSI)
- Quick Tunnel 모드로 외부 접근 설정 (도메인 불필요)
- 포트: 7080 (Docker dev 환경)

---
