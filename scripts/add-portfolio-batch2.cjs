/**
 * Portfolio Batch 2 Insert Script
 * Adds 8 new portfolio entries: Edutech, Media, Web·Platform
 */
const Database = require("better-sqlite3");
const path = require("path");
const crypto = require("crypto");

const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);

const insert = db.prepare(
  `INSERT INTO portfolio (id, category_id, client, title, description, detail, image, year, month, is_featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
);

const entries = [
  // ━━━ 1. TMD 미션 코드이썬 (Edutech, 2019) ━━━
  [
    crypto.randomUUID(),
    "cat-edutech",
    "TMD (교육 기관)",
    "TMD 미션 코드이썬 — 웹 기반 Python 코딩 교육 플랫폼",
    "웹 브라우저 기반 인터랙티브 Python 코딩 교육 플랫폼으로, 별도 설치 없이 실시간 코드 실행·자동 채점·미션 기반 학습을 지원하는 온라인 코딩 교육 시스템",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>TMD 미션 코드이썬은 프로그래밍 입문자를 위한 <strong>웹 기반 Python 코딩 교육 플랫폼</strong>입니다. 별도의 개발 환경 설치 없이 웹 브라우저만으로 Python 코드를 작성하고 실행할 수 있는 온라인 IDE 환경을 제공하며, 미션(Mission) 기반의 단계별 학습 커리큘럼을 통해 학습자가 스스로 문제를 해결하며 프로그래밍 역량을 키울 수 있도록 설계되었습니다. 자동 채점 시스템과 실시간 피드백 기능을 탑재하여 교육자의 평가 부담을 줄이고, 학습자의 자기주도 학습을 극대화하는 에듀테크 솔루션입니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">System Architecture</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">FRONTEND</div>
      <div style="color: white; font-weight: 600;">Web IDE Editor</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">BACKEND</div>
      <div style="color: white; font-weight: 600;">Mission Engine</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(236,72,153,0.2); border: 1px solid rgba(236,72,153,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">EXECUTION</div>
      <div style="color: white; font-weight: 600;">Python Sandbox</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">GRADING</div>
      <div style="color: white; font-weight: 600;">Auto Evaluator</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 웹 기반 Python 코딩 환경 (Online IDE)</h3>
<p><strong>Problem:</strong> 프로그래밍 교육 현장에서 학습자마다 서로 다른 운영체제와 환경에 Python을 설치하고 설정하는 과정이 수업 시간의 상당 부분을 차지하며, 설치 오류로 인한 학습 이탈이 빈번했습니다.</p>
<p><strong>Solution:</strong> 웹 브라우저 기반의 코드 에디터와 서버 측 Python 실행 환경(Sandbox)을 구축하여, 별도 설치 없이 URL 접속만으로 즉시 코딩을 시작할 수 있는 환경을 구현했습니다. 구문 강조(Syntax Highlighting), 자동 완성, 실시간 에러 표시 기능을 탑재하고, 코드 실행 결과를 즉시 출력 패널에 표시하여 초보자도 직관적으로 학습할 수 있습니다.</p>

<h3>B. 미션 기반 학습 엔진 및 자동 채점 시스템</h3>
<p><strong>Problem:</strong> 단순 강의식 교육은 학습자의 능동적 참여를 이끌어내기 어렵고, 다수의 학습자가 제출한 코드를 교육자가 수동으로 채점하는 데 과도한 시간이 소요되었습니다.</p>
<p><strong>Solution:</strong> 단계별 미션 시스템을 설계하여 학습자가 게임과 같이 미션을 수행하며 프로그래밍 개념을 체득할 수 있도록 했습니다. 각 미션에는 테스트 케이스 기반의 자동 채점 로직이 내장되어, 코드 제출 즉시 정답 여부와 상세 피드백을 제공합니다. 학습 진도율, 미션 달성률, 오류 패턴 등을 대시보드로 시각화하여 교육자가 학습자별 취약점을 파악할 수 있습니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Python</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Web IDE</span>
  <span style="background: rgba(236,72,153,0.2); color: #f9a8d4; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Auto Grading</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Mission System</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>학습 접근성 혁신:</strong> 설치 없는 웹 기반 환경으로 프로그래밍 교육의 진입 장벽을 획기적으로 낮춤</li>
<li><strong>교육 효율화:</strong> 자동 채점 시스템으로 교육자의 평가 업무 부담 80% 이상 절감</li>
<li><strong>학습 데이터 분석:</strong> 학습자별 코딩 패턴과 오류 유형 분석을 통한 맞춤형 피드백 제공 가능</li>
<li><strong>커리큘럼 확장성:</strong> 미션 템플릿 기반 설계로 다양한 프로그래밍 언어·주제로 확장 가능한 구조</li>
</ul>

<h2>04. Technical Identity</h2>
<p>웹 기반 코드 실행 환경(Sandbox)과 자동 채점 엔진이라는 기술적 도전을 해결하고, 미션 기반 게이미피케이션을 접목하여 학습 몰입도를 높인 에듀테크 프로젝트입니다. 서버 측 코드 실행의 보안성·격리성 확보와 실시간 피드백 시스템 설계 역량을 입증하며, 비전공자를 위한 코딩 교육 대중화에 기여한 사례입니다.</p>`,
    "/images/portfolio/default-edutech.jpg",
    2019, 1, 1, 200
  ],

  // ━━━ 2. 충남대 음성인식 한글 교육 App (Edutech, 2017) ━━━
  [
    crypto.randomUUID(),
    "cat-edutech",
    "충남대학교",
    "충남대 음성인식 한글 교육 App '넙죽이와 졸렁이'",
    "유아·아동 대상 음성인식 기반 한글 교육 모바일 앱으로, 캐릭터 인터랙션과 발음 평가를 통한 재미있는 한글 학습 환경 제공",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>'넙죽이와 졸렁이'는 충남대학교와 공동으로 개발한 <strong>음성인식 기반 한글 교육 모바일 앱</strong>입니다. 유아 및 초등학교 저학년을 대상으로, 한글 자모음 인식과 발음 교정을 게임형 캐릭터 인터랙션과 결합하여 아이들이 즐기면서 한글을 배울 수 있는 환경을 제공합니다. 음성인식 엔진을 통해 학습자의 발음을 실시간으로 평가하고 피드백을 제공하며, '넙죽이'와 '졸렁이'라는 친근한 캐릭터가 학습 동기를 부여하여 자기주도 한글 학습을 유도합니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">App Architecture Flow</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(251,191,36,0.2); border: 1px solid rgba(251,191,36,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">INPUT</div>
      <div style="color: white; font-weight: 600;">음성 캡처</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">RECOGNITION</div>
      <div style="color: white; font-weight: 600;">음성인식 엔진</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">EVALUATION</div>
      <div style="color: white; font-weight: 600;">발음 평가</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">FEEDBACK</div>
      <div style="color: white; font-weight: 600;">캐릭터 반응</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 아동 최적화 음성인식 엔진</h3>
<p><strong>Problem:</strong> 기존 범용 음성인식 엔진은 성인 음성 데이터로 학습되어, 유아·아동의 높은 음역대와 불명확한 발음 패턴에 대한 인식률이 현저히 낮았습니다. 특히 한글 자모음의 미세한 발음 차이(예: 'ㅂ'과 'ㅃ', 'ㄱ'과 'ㄲ')를 아동 음성에서 구별하는 것이 기술적 난제였습니다.</p>
<p><strong>Solution:</strong> 아동 음성 샘플을 기반으로 음성인식 모델의 음향 매개변수를 최적화하고, 한글 자모음별 발음 기준 데이터를 구축하여 아동 음성에 특화된 인식 파이프라인을 설계했습니다. 발음 정확도를 점수화하여 학습 수준에 맞는 단계별 피드백을 제공하며, 반복 학습 데이터를 기반으로 발음 개선 추이를 추적합니다.</p>

<h3>B. 캐릭터 인터랙션 기반 학습 동기 부여 시스템</h3>
<p><strong>Problem:</strong> 유아·아동 학습자의 집중 시간이 짧아 단순 반복 학습 방식으로는 학습 지속성을 유지하기 어렵고, 학습 동기를 지속적으로 부여할 수 있는 기제가 필요했습니다.</p>
<p><strong>Solution:</strong> '넙죽이'와 '졸렁이' 캐릭터가 학습자의 발음 결과에 따라 다양한 감정 표현과 애니메이션으로 반응하는 인터랙션 시스템을 구현했습니다. 정확한 발음 시 캐릭터가 즐거워하고, 재시도가 필요한 경우 격려하는 등 정서적 피드백을 통해 학습 몰입도를 높였습니다. 스티커 보상, 단계별 스토리 진행 등 게이미피케이션 요소를 적극 활용했습니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Android</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Java</span>
  <span style="background: rgba(251,191,36,0.2); color: #fcd34d; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">음성인식</span>
  <span style="background: rgba(236,72,153,0.2); color: #f9a8d4; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">한글 교육</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>아동 한글 교육 혁신:</strong> 음성인식 기술과 캐릭터 인터랙션을 결합한 차별화된 한글 교육 경험 제공</li>
<li><strong>발음 교정 효과:</strong> 실시간 발음 평가와 시각적 피드백을 통한 체계적인 발음 개선 지원</li>
<li><strong>학산연 협력 모델:</strong> 대학 연구실의 음성인식 연구 성과를 실용적 교육 앱으로 상용화한 산학 협력 사례</li>
<li><strong>콘텐츠 확장성:</strong> 자모음 학습에서 단어·문장 수준까지 확장 가능한 모듈형 커리큘럼 설계</li>
</ul>

<h2>04. Technical Identity</h2>
<p>아동 음성 특성에 최적화된 음성인식 엔진과 캐릭터 기반 정서적 피드백 시스템을 결합한 에듀테크 프로젝트입니다. Android 네이티브 앱 개발 역량과 음성인식 기술의 교육 도메인 적용 경험을 입증하며, 대학 연구 성과의 실용화라는 산학 협력의 성공 사례입니다.</p>`,
    "/images/portfolio/default-edutech.jpg",
    2017, 1, 0, 201
  ],

  // ━━━ 3. 한글보물찾기 (Edutech, 2018) ━━━
  [
    crypto.randomUUID(),
    "cat-edutech",
    "충남대학교 응용교육측정평가연구소",
    "사용자 음성인식 기반 학습 어플리케이션 한글보물찾기",
    "Android·iOS 크로스 플랫폼 음성인식 한글 학습 앱으로, 보물찾기 게임 요소를 접목하여 자모음부터 단어까지 단계별 발음 학습을 제공하는 교육용 애플리케이션",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>'한글보물찾기'는 충남대학교 응용교육측정평가연구소와 협력하여 개발한 <strong>음성인식 기반 한글 학습 모바일 앱</strong>입니다. Android와 iOS 양 플랫폼을 지원하며, '보물찾기'라는 게임 메타포를 활용하여 학습자가 한글 자모음과 단어를 발음하면서 보물을 발견하는 탐험형 학습 경험을 제공합니다. 3개월간의 집중 개발을 통해 음성인식 정확도와 학습 효과를 동시에 확보한 에듀테크 프로젝트입니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">Cross-Platform Architecture</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">ANDROID</div>
      <div style="color: white; font-weight: 600;">Java App</div>
    </div>
    <div style="background: rgba(251,191,36,0.2); border: 1px solid rgba(251,191,36,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">iOS</div>
      <div style="color: white; font-weight: 600;">Objective-C App</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">CORE</div>
      <div style="color: white; font-weight: 600;">음성인식 엔진</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">GAMIFICATION</div>
      <div style="color: white; font-weight: 600;">보물찾기 엔진</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 크로스 플랫폼 음성인식 학습 엔진</h3>
<p><strong>Problem:</strong> Android(Java)와 iOS(Objective-C)에서 동일한 수준의 음성인식 정확도와 학습 경험을 제공해야 했으나, 각 플랫폼의 오디오 캡처 API와 음성인식 프레임워크가 상이하여 일관된 인식률 확보가 어려웠습니다. 또한 3개월이라는 짧은 개발 기간 내에 양 플랫폼을 완성해야 하는 일정 제약이 있었습니다.</p>
<p><strong>Solution:</strong> 플랫폼별 네이티브 음성 캡처 모듈 위에 공통 음성인식 처리 레이어를 설계하여, 한글 발음 평가 알고리즘을 플랫폼 독립적으로 구현했습니다. Android에서는 Java 기반 AudioRecord API, iOS에서는 Objective-C 기반 AVAudioEngine을 활용하되, 음성 특징 추출(MFCC)과 발음 유사도 판정 로직은 공통 모듈로 분리하여 일관된 평가 결과를 보장합니다.</p>

<h3>B. 보물찾기 게이미피케이션 학습 시스템</h3>
<p><strong>Problem:</strong> 학습자(주로 아동)의 반복 학습에 대한 흥미를 지속시키기 어려웠으며, 단순한 발음 연습만으로는 학습 완료율이 낮았습니다.</p>
<p><strong>Solution:</strong> 보물찾기 게임 메커니즘을 학습 과정에 접목하여, 올바른 발음을 할 때마다 보물(아이템)을 획득하고 맵을 탐험하는 구조로 설계했습니다. 자모음 단계→음절 단계→단어 단계로 이어지는 학습 경로를 보물 지도 형태로 시각화하고, 각 단계 완료 시 특별 보물과 캐릭터 성장 보상을 제공하여 학습 지속성을 크게 향상시켰습니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Android</span>
  <span style="background: rgba(251,191,36,0.2); color: #fcd34d; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">iOS</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Java</span>
  <span style="background: rgba(236,72,153,0.2); color: #f9a8d4; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Objective-C</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">음성인식</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>크로스 플랫폼 접근성:</strong> Android·iOS 양 플랫폼 지원으로 최대 사용자 도달 범위 확보</li>
<li><strong>연구 기반 교육 효과:</strong> 응용교육측정평가연구소의 학습 이론을 기반으로 과학적으로 설계된 커리큘럼</li>
<li><strong>게이미피케이션 효과:</strong> 보물찾기 메타포를 통해 아동 학습자의 반복 학습 참여율 향상</li>
<li><strong>단기 개발 역량:</strong> 3개월 내 양 플랫폼 앱 완성으로 빠른 시장 출시 및 연구 검증 가능</li>
</ul>

<h2>04. Technical Identity</h2>
<p>Android(Java)와 iOS(Objective-C) 네이티브 크로스 플랫폼 개발 역량과 음성인식 기술을 게이미피케이션 교육 콘텐츠와 융합한 프로젝트입니다. 대학 연구기관의 교육학적 검증 체계와 실용적 앱 개발을 결합하여, 3개월의 단기간에 높은 완성도의 양 플랫폼 앱을 출시한 효율적 개발 사례입니다.</p>`,
    "/images/portfolio/default-edutech.jpg",
    2018, 1, 0, 202
  ],

  // ━━━ 4. S-100 홍보 동영상 (Media · Streaming, 2017) ━━━
  [
    crypto.randomUUID(),
    "cat-media",
    "선박해양플랜트연구소 (KRISO)",
    "S-100 수로정보 실해역 실험 홍보 동영상 제작",
    "차세대 수로정보 표준(S-100) 기반 실해역 실험 성과를 드론 촬영과 4K 렌더링으로 제작한 연구 성과 홍보 영상",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>본 프로젝트는 선박해양플랜트연구소(KRISO)의 <strong>S-100 수로정보 실해역 실험 성과를 홍보하는 영상 콘텐츠</strong>를 기획·제작한 사업입니다. 차세대 국제 수로 표준인 S-100 기반의 전자해도 및 수로정보 시스템이 실제 해상 환경에서 작동하는 모습을 드론 촬영과 4K 고해상도 영상으로 담아, 연구 성과의 기술적 가치와 실용성을 효과적으로 전달합니다. 학술 발표, 국제 기구 보고, 정부 보고용 등 다양한 목적으로 활용할 수 있는 전문 기술 홍보 영상입니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">Production Pipeline</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">PRE-PRODUCTION</div>
      <div style="color: white; font-weight: 600;">기획·스토리보드</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(236,72,153,0.2); border: 1px solid rgba(236,72,153,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">SHOOTING</div>
      <div style="color: white; font-weight: 600;">드론·현장 촬영</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">POST-PRODUCTION</div>
      <div style="color: white; font-weight: 600;">편집·4K 렌더링</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">DELIVERY</div>
      <div style="color: white; font-weight: 600;">다목적 배포</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 실해역 드론 촬영 및 현장 영상 기획</h3>
<p><strong>Problem:</strong> S-100 표준의 기술적 내용은 전문가가 아닌 이상 이해하기 어려우며, 실해역 실험의 성과를 문서만으로 전달하기에는 시각적 임팩트가 부족했습니다. 또한 해상 환경에서의 촬영은 기상·파도·바람 등 통제 불가능한 변수가 많아 계획적 영상 제작이 어려웠습니다.</p>
<p><strong>Solution:</strong> 실험 일정에 맞춰 사전 스토리보드를 작성하고, 해상 드론 촬영 전문 장비를 활용하여 선박의 항행과 S-100 기반 장비 운용 장면을 조감 및 근접 앵글로 촬영했습니다. 기상 조건별 촬영 시나리오를 복수 준비하고, 핵심 실험 장면은 멀티 카메라 세팅으로 촬영하여 영상 소스의 다양성을 확보했습니다.</p>

<h3>B. 4K 후반 작업 및 기술 정보 시각화</h3>
<p><strong>Problem:</strong> 해상 촬영 원본 영상의 색감 보정과 안정화 처리가 필요했으며, S-100 표준의 기술적 내용을 비전문가도 이해할 수 있는 시각 요소로 변환해야 했습니다.</p>
<p><strong>Solution:</strong> 4K 해상도의 고품질 후반 작업을 통해 해상 촬영 영상의 컬러 그레이딩과 손떨림 보정을 수행하고, S-100 표준 체계와 실험 데이터를 모션 그래픽과 인포그래픽으로 시각화하여 영상에 삽입했습니다. 나레이션과 자막(국·영문)을 추가하여 국내외 발표용으로 활용 가능한 완성도를 확보했습니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">드론 촬영</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">4K 영상</span>
  <span style="background: rgba(236,72,153,0.2); color: #f9a8d4; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">모션 그래픽</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">기술 홍보 영상</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>연구 성과 시각화:</strong> 전문적 기술 내용을 비전문가도 이해할 수 있는 영상 콘텐츠로 변환하여 연구 성과의 확산 효과 극대화</li>
<li><strong>국제 발표 활용:</strong> 국·영문 자막 지원으로 IHO 등 국제 기구 발표 및 해외 홍보에 직접 활용 가능</li>
<li><strong>다목적 콘텐츠:</strong> 학술 발표, 정부 보고, 대국민 홍보 등 다양한 용도로 편집·활용 가능한 소스 확보</li>
<li><strong>해양 촬영 노하우:</strong> 실해역 환경에서의 드론 촬영 경험과 기상 대응 촬영 프로토콜 축적</li>
</ul>

<h2>04. Technical Identity</h2>
<p>고도의 기술적 연구 성과를 드론 촬영과 4K 영상 제작 기술로 시각화한 전문 미디어 프로젝트입니다. 해상 환경이라는 특수 촬영 조건에서의 영상 기획·촬영·후반 작업 역량을 입증하며, 기술 홍보 영상 제작에 있어 기술적 이해와 영상 미학을 동시에 갖춘 제작 사례입니다.</p>`,
    "/images/portfolio/default-media.jpg",
    2017, 1, 0, 203
  ],

  // ━━━ 5. FIBERPRO 홈페이지 (Web · Platform, 2020) ━━━
  [
    crypto.randomUUID(),
    "cat-web",
    "㈜파이버프로",
    "FIBERPRO 상장사 홈페이지 제작",
    "코스닥 상장사 ㈜파이버프로의 한국어·영어·중국어 3개 국어 기업 홈페이지 구축 프로젝트 (fiberpro.com / fiberpro.co.kr / fiberpro.cc)",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>본 프로젝트는 광 계측 솔루션 전문 코스닥 상장 기업인 <strong>㈜파이버프로의 기업 홈페이지를 한국어·영어·중국어 3개 국어로 구축</strong>한 사업입니다. 상장사로서 요구되는 IR(Investor Relations) 정보 공시, 제품 카탈로그, 기술 문서, 글로벌 파트너 네트워크 소개 등을 체계적으로 관리할 수 있는 기업 웹사이트를 6개월간 개발했습니다. fiberpro.com(영문), fiberpro.co.kr(국문), fiberpro.cc(중문) 3개 도메인으로 운영되며, 각 언어권의 비즈니스 문화에 최적화된 UX를 제공합니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">Multi-Language Site Architecture</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">KOR</div>
      <div style="color: white; font-weight: 600;">fiberpro.co.kr</div>
    </div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">ENG</div>
      <div style="color: white; font-weight: 600;">fiberpro.com</div>
    </div>
    <div style="background: rgba(236,72,153,0.2); border: 1px solid rgba(236,72,153,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">CHN</div>
      <div style="color: white; font-weight: 600;">fiberpro.cc</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">BACKEND</div>
      <div style="color: white; font-weight: 600;">PHP CMS</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(251,191,36,0.2); border: 1px solid rgba(251,191,36,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">DATABASE</div>
      <div style="color: white; font-weight: 600;">MySQL</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 다국어 콘텐츠 관리 시스템 (Multilingual CMS)</h3>
<p><strong>Problem:</strong> 한국어·영어·중국어 3개 국어의 콘텐츠를 독립적으로 관리하면서도 제품 정보, IR 공시 자료 등 공통 데이터는 동기화되어야 했습니다. 각 언어권별 콘텐츠 업데이트 주기가 다르고, 번역 워크플로우의 체계적 관리가 필요했습니다.</p>
<p><strong>Solution:</strong> PHP 기반 커스텀 CMS를 구축하여 콘텐츠를 언어별로 독립 관리하면서도, 제품 코드·사양 등 구조화된 데이터는 마스터-슬레이브 구조로 동기화하는 아키텍처를 설계했습니다. 관리자 인터페이스에서 언어별 콘텐츠 상태(작성 중·번역 중·게시)를 추적할 수 있고, 공통 미디어 자산은 중앙 관리하여 저장 공간 효율성을 확보했습니다.</p>

<h3>B. 상장사 IR 정보 및 제품 카탈로그 시스템</h3>
<p><strong>Problem:</strong> 코스닥 상장사로서 경영 공시, 재무 정보, 주가 정보 등 IR 콘텐츠의 적시 업데이트가 필수적이며, 광 계측 장비라는 전문 기술 제품의 사양·카탈로그를 체계적으로 전시해야 했습니다.</p>
<p><strong>Solution:</strong> IR 섹션에서는 공시 자료 업로드, 재무제표 연동, 투자자 문의 폼 등을 구현하고, 제품 카탈로그 섹션에서는 제품군별 분류·검색·사양 비교 기능을 제공합니다. PDF 카탈로그 다운로드, 제품별 기술 자료 라이브러리, 영상 갤러리 등을 통합하여 원스톱 제품 정보 허브를 구축했습니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">PHP</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">MySQL</span>
  <span style="background: rgba(236,72,153,0.2); color: #f9a8d4; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">다국어 CMS</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">반응형 웹</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>글로벌 비즈니스 확장:</strong> 3개 국어 지원으로 한국·영미권·중화권 거래처 및 투자자와의 커뮤니케이션 채널 확보</li>
<li><strong>상장사 신뢰도 강화:</strong> 체계적인 IR 정보 공시와 전문적인 기업 이미지로 투자자 신뢰도 향상</li>
<li><strong>제품 마케팅 효율화:</strong> 온라인 제품 카탈로그와 기술 자료 라이브러리로 영업 지원 효율 극대화</li>
<li><strong>운영 자립성:</strong> 직관적인 관리자 CMS로 비개발 인력도 콘텐츠 업데이트 가능</li>
</ul>

<h2>04. Technical Identity</h2>
<p>코스닥 상장사의 기업 이미지와 IR 요구사항을 충족하는 3개 국어 기업 홈페이지를 6개월간 개발한 웹 프로젝트입니다. PHP 기반 커스텀 CMS 개발, 다국어 콘텐츠 동기화 설계, 상장사 수준의 보안·안정성 확보 역량을 입증하며, B2B 기술 기업의 글로벌 웹 프레즌스 구축 경험을 보여주는 사례입니다.</p>`,
    "/images/portfolio/default-web.jpg",
    2020, 1, 1, 204
  ],

  // ━━━ 6. 한국효문화진흥원 본청 시스템 (Web · Platform, 2018) ━━━
  [
    crypto.randomUUID(),
    "cat-web",
    "한국효문화진흥원",
    "한국효문화진흥원 본청 시스템 개발",
    "장소 대관·교육 예약·전시 예약 기능을 포함한 한국효문화진흥원 본청 통합 웹 시스템 개발 및 서버 관리 (k-hyo.kr)",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>본 프로젝트는 <strong>한국효문화진흥원의 본청 업무를 디지털화하는 통합 웹 시스템</strong>을 개발한 사업입니다. 장소 대관 관리, 교육 프로그램 예약, 전시 관람 예약 등 진흥원의 핵심 대국민 서비스를 온라인으로 전환하고, 내부 업무 프로세스를 효율화하는 웹 기반 통합 시스템을 5개월간 구축했습니다. k-hyo.kr 도메인으로 운영되며, 서버 인프라 관리까지 포함한 풀 스택 서비스를 제공합니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">Integrated Service Architecture</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">SERVICE 1</div>
      <div style="color: white; font-weight: 600;">장소 대관</div>
    </div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">SERVICE 2</div>
      <div style="color: white; font-weight: 600;">교육 예약</div>
    </div>
    <div style="background: rgba(236,72,153,0.2); border: 1px solid rgba(236,72,153,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">SERVICE 3</div>
      <div style="color: white; font-weight: 600;">전시 예약</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">PLATFORM</div>
      <div style="color: white; font-weight: 600;">PHP + MySQL</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(251,191,36,0.2); border: 1px solid rgba(251,191,36,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">INFRA</div>
      <div style="color: white; font-weight: 600;">Server Mgmt</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 장소 대관 및 예약 통합 시스템</h3>
<p><strong>Problem:</strong> 진흥원 내 강당, 회의실, 교육실 등 다양한 시설의 대관 신청이 전화·방문·공문 등 오프라인 방식으로 접수되어, 예약 충돌·누락이 빈번하고 관리 인력의 업무 부담이 컸습니다. 교육 프로그램과 전시 관람 예약 역시 별도로 관리되어 시설 활용 현황의 통합 파악이 불가능했습니다.</p>
<p><strong>Solution:</strong> 시설별 예약 가능 시간대를 실시간 캘린더로 시각화하고, 온라인 대관 신청→관리자 승인→확정 통보의 전 과정을 웹 워크플로우로 구현했습니다. 교육 프로그램 예약과 전시 관람 예약을 동일한 예약 엔진 위에 통합하여, 시설 활용 현황을 대시보드에서 한눈에 파악할 수 있습니다. 중복 예약 방지 로직과 자동 이메일·SMS 알림 기능을 탑재했습니다.</p>

<h3>B. 공공기관 웹 접근성 및 서버 관리</h3>
<p><strong>Problem:</strong> 공공기관 웹사이트로서 웹 접근성 지침 준수가 필수적이며, 안정적인 서비스 운영을 위한 서버 모니터링과 보안 패치 등 지속적인 인프라 관리가 요구되었습니다.</p>
<p><strong>Solution:</strong> 한국형 웹 콘텐츠 접근성 지침(KWCAG)을 준수하는 UI/UX를 설계하고, 서버 상태 모니터링, 정기 백업, 보안 업데이트 등 운영 관리 체계를 구축했습니다. SSL 인증서 관리, 방화벽 설정, 정기 취약점 점검 등 공공기관 수준의 보안 정책을 적용하여 안정적인 서비스 운영을 보장합니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">PHP</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">MySQL</span>
  <span style="background: rgba(236,72,153,0.2); color: #f9a8d4; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">예약 시스템</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">서버 관리</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>대국민 서비스 디지털화:</strong> 장소 대관·교육·전시 예약의 온라인 전환으로 시민 편의성 대폭 향상</li>
<li><strong>업무 효율화:</strong> 수작업 예약 관리를 시스템화하여 관리 인력의 업무 부담 감소 및 예약 충돌 해소</li>
<li><strong>시설 활용 최적화:</strong> 통합 대시보드를 통한 시설 활용률 분석 및 운영 의사결정 지원</li>
<li><strong>안정적 운영:</strong> 서버 관리 포함 풀 서비스로 공공기관 수준의 안정성·보안성 확보</li>
</ul>

<h2>04. Technical Identity</h2>
<p>공공기관의 다중 서비스(대관·교육·전시)를 하나의 통합 예약 엔진으로 구현하고, 서버 인프라 관리까지 포괄하는 풀 스택 프로젝트입니다. 공공 웹 접근성 기준 충족, 예약 충돌 방지 알고리즘, 공공기관 보안 정책 적용 등 공공 SI 프로젝트의 실전 역량을 입증하는 사례입니다.</p>`,
    "/images/portfolio/default-web.jpg",
    2018, 1, 1, 205
  ],

  // ━━━ 7. 한국효문화진흥원 자료관리 시스템 (Web · Platform, 2018) ━━━
  [
    crypto.randomUUID(),
    "cat-web",
    "한국효문화진흥원",
    "한국효문화진흥원 자료관리 시스템",
    "한국효문화진흥원의 효 관련 자료·콘텐츠를 체계적으로 수집·분류·관리하는 웹 기반 자료관리 시스템 및 서버 관리 (k-hyodb.kr)",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>본 프로젝트는 <strong>한국효문화진흥원의 효 관련 자료를 체계적으로 관리하는 웹 기반 자료관리 시스템</strong>을 구축한 사업입니다. 효 문화와 관련된 문서, 이미지, 영상, 연구 자료 등 다양한 형태의 디지털 자산을 중앙에서 수집·분류·검색·관리할 수 있는 플랫폼을 5개월간 개발했습니다. k-hyodb.kr 도메인으로 운영되며, 서버 인프라 관리를 포함한 종합 서비스를 제공합니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">Data Management Architecture</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">INPUT</div>
      <div style="color: white; font-weight: 600;">자료 수집</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">CLASSIFY</div>
      <div style="color: white; font-weight: 600;">메타데이터 분류</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(236,72,153,0.2); border: 1px solid rgba(236,72,153,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">STORAGE</div>
      <div style="color: white; font-weight: 600;">DB + File Store</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">ACCESS</div>
      <div style="color: white; font-weight: 600;">검색·열람</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 디지털 자산 분류 및 메타데이터 관리 시스템</h3>
<p><strong>Problem:</strong> 효 문화 관련 자료가 문서, 이미지, 영상, 음원, 연구 보고서 등 다양한 형태로 산재해 있었으며, 체계적인 분류 기준과 검색 수단이 부재하여 필요한 자료의 활용이 어려웠습니다. 자료 간 관계성(예: 동일 주제의 사진·영상·문서)을 파악하는 것도 불가능했습니다.</p>
<p><strong>Solution:</strong> 효 문화 도메인에 특화된 분류 체계(Taxonomy)를 설계하고, 자료 유형별 메타데이터 스키마를 정의하여 일관된 기준으로 자료를 등록·분류할 수 있는 시스템을 구축했습니다. 자료 간 태깅과 연관 관계 매핑을 지원하여 주제별 통합 검색과 관련 자료 자동 추천 기능을 구현했습니다. 풀텍스트 검색과 메타데이터 필터링을 결합한 복합 검색 인터페이스를 제공합니다.</p>

<h3>B. 파일 저장소 및 접근 권한 관리</h3>
<p><strong>Problem:</strong> 대용량 멀티미디어 파일의 안정적 저장과 효율적 전송이 필요했으며, 내부 직원·연구자·일반 공개 등 접근 권한 수준에 따른 자료 열람 통제가 요구되었습니다.</p>
<p><strong>Solution:</strong> 파일 유형별 최적화된 저장 구조를 설계하고, 대용량 파일의 청크(Chunk) 업로드와 썸네일 자동 생성을 구현했습니다. 역할 기반 접근 제어(RBAC)를 적용하여 관리자·편집자·열람자 등 권한 수준에 따른 자료 접근 정책을 시행하고, 다운로드 이력과 열람 통계를 기록하여 자료 활용 현황을 추적합니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">PHP</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">MySQL</span>
  <span style="background: rgba(236,72,153,0.2); color: #f9a8d4; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">자료관리</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">서버 관리</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>지식 자산 체계화:</strong> 산재된 효 문화 자료를 중앙 데이터베이스로 통합하여 기관의 핵심 지식 자산 체계화</li>
<li><strong>자료 활용도 향상:</strong> 체계적 분류와 강력한 검색 기능으로 필요 자료의 즉시 접근 및 활용 가능</li>
<li><strong>운영 연속성:</strong> 서버 관리 포함 종합 서비스로 시스템의 장기 안정적 운영 보장</li>
<li><strong>확장 가능성:</strong> 분류 체계 확장과 신규 자료 유형 추가가 용이한 유연한 아키텍처</li>
</ul>

<h2>04. Technical Identity</h2>
<p>공공기관의 도메인 특화 디지털 자산 관리 시스템을 PHP 기반으로 구축하고, 서버 인프라 관리까지 담당한 종합 프로젝트입니다. 자료 분류 체계 설계, 메타데이터 모델링, 역할 기반 접근 제어 등 데이터 관리 시스템의 핵심 역량을 입증하며, 한국효문화진흥원과의 지속적 파트너십을 보여주는 사례입니다.</p>`,
    "/images/portfolio/default-web.jpg",
    2018, 1, 0, 206
  ],

  // ━━━ 8. 여행 스케줄 작성 및 추천 웹 시스템 (Web · Platform, 2019) ━━━
  [
    crypto.randomUUID(),
    "cat-web",
    "여행 플랫폼",
    "여행 스케줄 작성 및 추천 웹 시스템",
    "사용자 맞춤형 여행 일정 작성과 AI 기반 관광지·숙소·맛집 추천을 제공하는 웹 기반 여행 플래닝 시스템",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>본 프로젝트는 <strong>사용자 맞춤형 여행 일정을 작성하고 관광지·숙소·맛집을 추천하는 웹 기반 여행 플래닝 시스템</strong>을 개발한 사업입니다. 여행 목적지, 기간, 예산, 관심 카테고리 등 사용자 입력 정보를 기반으로 최적화된 여행 일정을 자동 생성하고, 드래그 앤 드롭 인터페이스로 자유롭게 일정을 편집할 수 있는 직관적인 여행 계획 도구를 3개월간 구축했습니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">Travel Planning System Flow</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">USER INPUT</div>
      <div style="color: white; font-weight: 600;">여행 조건 입력</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">RECOMMEND</div>
      <div style="color: white; font-weight: 600;">맞춤 추천 엔진</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(236,72,153,0.2); border: 1px solid rgba(236,72,153,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">SCHEDULE</div>
      <div style="color: white; font-weight: 600;">일정 자동 생성</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">SHARE</div>
      <div style="color: white; font-weight: 600;">일정 공유·저장</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 맞춤형 여행지 추천 엔진</h3>
<p><strong>Problem:</strong> 여행 계획 수립 시 방대한 관광지·숙소·맛집 정보 중에서 사용자의 취향과 조건에 맞는 장소를 선별하는 데 많은 시간과 노력이 소요되었습니다. 기존 여행 사이트들은 인기 순위 기반의 일률적 추천만 제공하여 개인화된 여행 경험을 지원하지 못했습니다.</p>
<p><strong>Solution:</strong> 사용자의 여행 목적(관광·휴양·미식·액티비티), 동반자 유형(가족·연인·친구·혼자), 예산 범위, 선호 카테고리 등 복합 조건을 기반으로 최적 장소를 추천하는 엔진을 구현했습니다. 장소 간 이동 거리와 소요 시간, 운영 시간, 계절별 추천도 등을 종합 고려하여 현실적인 추천 결과를 제공하며, 사용자 평가 데이터를 반영하여 추천 정확도를 지속적으로 개선합니다.</p>

<h3>B. 인터랙티브 일정 편집기 및 공유 시스템</h3>
<p><strong>Problem:</strong> 추천받은 장소들을 시간순으로 배치하고 이동 동선을 최적화하는 과정이 수작업으로 이루어져 불편했으며, 동행자와의 일정 공유 및 공동 편집 기능이 부재했습니다.</p>
<p><strong>Solution:</strong> 드래그 앤 드롭 기반의 타임라인 일정 편집기를 구현하여 추천 장소를 직관적으로 배치·조정할 수 있게 했습니다. 지도 뷰와 일정 뷰를 동기화하여 동선을 시각적으로 확인할 수 있고, 장소 간 이동 시간을 자동 계산하여 비현실적 일정을 경고합니다. 고유 URL을 통한 일정 공유, 동행자 초대 및 공동 편집 기능을 제공합니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">PHP</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">MySQL</span>
  <span style="background: rgba(236,72,153,0.2); color: #f9a8d4; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">추천 엔진</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">지도 API</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>여행 계획 효율화:</strong> 추천 엔진과 자동 일정 생성으로 여행 계획 수립 시간을 획기적으로 단축</li>
<li><strong>개인화 경험:</strong> 복합 조건 기반 맞춤 추천으로 사용자별 최적화된 여행 일정 제공</li>
<li><strong>소셜 기능:</strong> 일정 공유·공동 편집으로 그룹 여행 계획 수립의 협업 효율 향상</li>
<li><strong>데이터 기반 개선:</strong> 사용자 평가 데이터 축적을 통한 추천 알고리즘 지속 고도화 기반 확보</li>
</ul>

<h2>04. Technical Identity</h2>
<p>추천 알고리즘과 인터랙티브 UI를 결합한 여행 플래닝 웹 시스템을 3개월간 구축한 프로젝트입니다. 복합 조건 기반 추천 엔진 설계, 드래그 앤 드롭 일정 편집 UI, 지도 API 연동 등 웹 기반 서비스 플랫폼 개발의 종합적 역량을 입증하는 사례입니다.</p>`,
    "/images/portfolio/default-web.jpg",
    2019, 1, 0, 207
  ],
];

let count = 0;
for (const entry of entries) {
  try {
    insert.run(...entry);
    count++;
    console.log(`\u2705 Added: ${entry[3]}`);
  } catch (e) {
    console.log(`\u26a0\ufe0f Skip: ${entry[3]} - ${e.message}`);
  }
}
console.log(`\nTotal: ${count} entries added`);
db.close();
