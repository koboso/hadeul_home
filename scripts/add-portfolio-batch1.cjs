const Database = require("better-sqlite3");
const path = require("path");
const crypto = require("crypto");
const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);

const insert = db.prepare(`INSERT INTO portfolio (id, category_id, client, title, description, detail, image, year, month, is_featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

const entries = [
  // 1. 무인기 지상통제 소프트웨어
  [
    crypto.randomUUID(),
    "cat-defense",
    "국방 연구기관",
    "무인기 지상통제 소프트웨어 · 전술차량 고도화",
    "무인항공기(UAV)의 실시간 비행제어·임무관리·영상수신을 통합하는 지상통제 소프트웨어 및 전술차량 탑재 시스템 고도화 개발",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>본 프로젝트는 국방 연구기관의 요구에 따라 무인항공기(UAV)의 지상통제 소프트웨어(GCS: Ground Control Station)를 개발하고, 전술차량에 탑재되는 통합 운용 시스템을 고도화한 사업입니다. 임베디드 환경에서 C/C++ 기반으로 개발된 GCS는 UAV의 비행경로 계획, 실시간 비행상태 모니터링, 임무 페이로드 제어, 영상정보 수신·처리를 단일 인터페이스에서 수행합니다. 전술차량 탑재 환경의 진동·온도·전자파 조건을 고려한 내환경 설계와, 군 통신 프로토콜 연동을 통해 야전 운용에 적합한 신뢰성과 가용성을 확보한 국방 핵심 소프트웨어입니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">System Architecture</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">UAV</div>
      <div style="color: white; font-weight: 600;">비행체 센서</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">DATA LINK</div>
      <div style="color: white; font-weight: 600;">군 통신 프로토콜</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">GCS ENGINE</div>
      <div style="color: white; font-weight: 600;">비행제어·임무관리</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(245,158,11,0.2); border: 1px solid rgba(245,158,11,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">DISPLAY</div>
      <div style="color: white; font-weight: 600;">전술차량 HMI</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 실시간 비행제어 및 임무관리 엔진</h3>
<p><strong>Problem:</strong> UAV 운용에는 비행경로 사전 계획, 실시간 경로 변경, 임무 페이로드(EO/IR 카메라, SAR 등) 제어가 동시에 이루어져야 하며, 모든 명령은 밀리초 단위의 지연 시간 내에 처리되어야 합니다. 기존 시스템은 각 기능이 분리되어 운용자의 인지 부하가 높고, 비상 상황 대응이 지연되는 문제가 있었습니다.</p>
<p><strong>Solution:</strong> C/C++ 기반 실시간 처리 엔진을 설계하여 비행제어 명령 생성, 텔레메트리 데이터 파싱, 임무장비 제어를 단일 이벤트 루프에서 처리합니다. 웨이포인트 기반 경로 계획과 실시간 경로 수정을 지원하며, 비상 상황(통신 두절, 배터리 저하, 지오펜스 이탈) 발생 시 자동 귀환(RTL) 및 비상 착륙 프로시저를 자동 실행합니다. STANAG 4586 표준 메시지를 준용한 통신 프로토콜로 다양한 UAV 기종과의 호환성을 확보했습니다.</p>

<h3>B. 전술차량 탑재 통합 디스플레이 시스템</h3>
<p><strong>Problem:</strong> 전술차량 내부의 제한된 공간에서 비행상태, 영상정보, 지도, 임무 현황을 동시에 표시해야 하며, 차량 이동 중 진동과 직사광선 환경에서도 가독성과 조작성이 보장되어야 했습니다.</p>
<p><strong>Solution:</strong> 멀티 디스플레이 구성으로 비행상태 패널, 영상 수신 창, 전술지도를 분할 표시하고, 터치 인터페이스와 물리 버튼을 병행하여 장갑 착용 상태에서도 조작 가능한 HMI를 구현했습니다. 화면 밝기 자동 조절과 야간 모드를 적용하여 모든 조명 조건에서의 가독성을 확보하고, GPS/INS 통합 항법 데이터를 전술지도에 오버레이하여 UAV-차량 간 상대 위치를 직관적으로 표시합니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">C/C++</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Embedded Linux</span>
  <span style="background: rgba(245,158,11,0.2); color: #fcd34d; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">STANAG 4586</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Real-time OS</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>야전 운용 신뢰성:</strong> 전술차량 탑재 환경에서 MIL-STD 기준을 충족하는 내환경 설계로 혹서·혹한·진동 조건에서의 안정적 운용 검증 완료</li>
<li><strong>다기종 호환:</strong> 표준 통신 프로토콜 적용으로 소형·중형 UAV 기종 교체 시 GCS 소프트웨어 재사용 가능</li>
<li><strong>운용 효율성:</strong> 통합 인터페이스로 운용 인원 축소 및 임무 준비 시간 단축</li>
<li><strong>기술 자산:</strong> 국방 무인기 분야의 핵심 소프트웨어 기술 내재화 및 후속 사업 적용 기반 확보</li>
</ul>

<h2>04. Technical Identity</h2>
<p>임베디드 C/C++ 기반의 실시간 제어 시스템과 군 통신 프로토콜 연동, 전술차량 내환경 적합성을 동시에 달성한 국방 특화 프로젝트입니다. UAV 비행제어·임무관리의 실시간 처리 역량과 전술 환경에서의 견고한 소프트웨어 설계 능력을 입증하며, 국방 무인체계 분야의 깊은 도메인 전문성을 보여줍니다.</p>`,
    "/images/portfolio/default-defense.jpg",
    2019, 1, 1, 100
  ],

  // 2. ICT 스마트 예비군 훈련체계 태블릿
  [
    crypto.randomUUID(),
    "cat-defense",
    "국방부 · 예비군",
    "ICT 스마트 예비군 훈련체계 태블릿",
    "ICT 기술 기반 예비군 훈련 관리·평가·실시간 상황공유를 지원하는 안드로이드 태블릿 애플리케이션 개발",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>ICT 스마트 예비군 훈련체계 태블릿 프로젝트는 국방부 예비군 훈련의 디지털 전환을 위해 안드로이드 태블릿 애플리케이션을 개발한 사업입니다. 기존 종이 기반의 훈련 관리·출결·평가 체계를 모바일 디지털 플랫폼으로 전환하여, 예비군 훈련의 효율성과 관리 정확성을 획기적으로 향상시켰습니다. 약 3개월간의 집중 개발을 통해 Java 기반 안드로이드 앱을 완성하였으며, 훈련 현장에서의 실시간 데이터 수집, 훈련병 관리, 성적 평가, 상황 보고를 통합 지원합니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">Application Flow</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">INPUT</div>
      <div style="color: white; font-weight: 600;">출결 관리</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">PROCESS</div>
      <div style="color: white; font-weight: 600;">훈련 실행·평가</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(245,158,11,0.2); border: 1px solid rgba(245,158,11,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">SYNC</div>
      <div style="color: white; font-weight: 600;">서버 연동</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">OUTPUT</div>
      <div style="color: white; font-weight: 600;">통계·보고</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 훈련 관리 및 출결 디지털화</h3>
<p><strong>Problem:</strong> 예비군 훈련은 전국 수백 개 훈련장에서 수십만 명을 대상으로 진행되며, 종이 출결부와 수기 기록에 의존하여 데이터 입력 오류, 집계 지연, 문서 분실 위험이 상존했습니다. 훈련 현황의 실시간 파악이 불가능하여 상급 부대의 의사결정에 시간 지연이 발생했습니다.</p>
<p><strong>Solution:</strong> 태블릿 앱에서 QR 코드 스캔 또는 전자 서명 기반의 출결 처리를 구현하여 현장 출석 확인을 즉시 디지털화합니다. 훈련 과목별 일정 관리, 훈련병 인적사항 조회, 분대·소대 편성을 앱 내에서 수행하며, 로컬 SQLite DB에 우선 저장 후 네트워크 가용 시 중앙 서버와 동기화하는 오프라인 퍼스트 아키텍처를 적용하여 통신 환경이 열악한 훈련장에서도 안정적으로 운용됩니다.</p>

<h3>B. 실시간 성적 평가 및 상황 보고 체계</h3>
<p><strong>Problem:</strong> 사격·각개전투·화생방 등 훈련 과목별 성적 평가가 수기로 이루어져 집계·통계 산출에 수일이 소요되었고, 훈련 진행 상황을 상급 부대에 보고하는 데 전화·팩스에 의존하여 정보 전달의 정확성과 신속성이 부족했습니다.</p>
<p><strong>Solution:</strong> 과목별 평가 기준을 앱에 내장하여 현장에서 즉시 점수를 입력·산출하고, 개인별·부대별 성적 통계를 자동 생성합니다. 훈련 진행률, 참석률, 평가 결과를 실시간으로 중앙 서버에 전송하여 상급 부대 지휘관이 웹 대시보드를 통해 전국 훈련 현황을 즉시 파악할 수 있는 상황 보고 체계를 구축했습니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Android</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Java</span>
  <span style="background: rgba(245,158,11,0.2); color: #fcd34d; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">SQLite</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">REST API</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>훈련 관리 혁신:</strong> 종이 기반 관리 체계를 디지털로 전환하여 데이터 정확성 향상 및 행정 소요 시간 대폭 절감</li>
<li><strong>실시간 현황 파악:</strong> 전국 훈련장의 진행 상황을 중앙에서 실시간 모니터링 가능</li>
<li><strong>오프라인 운용:</strong> 통신 불안정 지역에서도 로컬 저장 후 동기화 방식으로 무중단 사용 가능</li>
<li><strong>확장 가능성:</strong> 동원훈련, 민방위 훈련 등 유사 훈련 체계로의 확대 적용 기반 마련</li>
</ul>

<h2>04. Technical Identity</h2>
<p>3개월이라는 집중 개발 기간 내에 안드로이드 태블릿 앱의 기획·설계·개발·현장 테스트를 완수한 애자일 프로젝트입니다. 군 특수 환경의 요구사항(보안, 오프라인 운용, 견고성)을 모바일 앱에 반영한 국방 모바일 솔루션 역량과, 대규모 인원 관리 시스템의 설계 능력을 입증합니다.</p>`,
    "/images/portfolio/default-defense.jpg",
    2018, 1, 0, 101
  ],

  // 3. 축산악취 수집 및 통합 모니터링 통계 시스템
  [
    crypto.randomUUID(),
    "cat-eco",
    "환경 관리 기관",
    "축산악취 수집 및 통합 모니터링 통계 시스템",
    "IoT 센서 기반 축산시설 악취 물질 실시간 수집·분석 및 웹 대시보드 통합 모니터링·통계 시스템 개발",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>축산악취 수집 및 통합 모니터링 통계 시스템은 축산시설에서 발생하는 악취 물질(암모니아, 황화수소, 메르캅탄 등)을 IoT 센서로 실시간 수집하고, 웹 기반 대시보드에서 통합 모니터링·통계 분석을 수행하는 환경 관리 플랫폼입니다. 축산 농가 주변 주민들의 악취 민원이 증가하는 사회적 문제에 대응하여, 과학적 데이터에 기반한 악취 관리 체계를 구축함으로써 환경 규제 대응과 축산업의 지속 가능성을 동시에 확보합니다. 현장 센서 데이터의 자동 수집부터 통계 보고서 생성까지 악취 관리 전 과정을 디지털화한 통합 솔루션입니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">IoT Monitoring Architecture</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">SENSOR</div>
      <div style="color: white; font-weight: 600;">악취 IoT 센서</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">GATEWAY</div>
      <div style="color: white; font-weight: 600;">데이터 수집·전송</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">SERVER</div>
      <div style="color: white; font-weight: 600;">분석·저장 엔진</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(245,158,11,0.2); border: 1px solid rgba(245,158,11,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">DASHBOARD</div>
      <div style="color: white; font-weight: 600;">통합 모니터링</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. IoT 센서 기반 악취 데이터 실시간 수집 체계</h3>
<p><strong>Problem:</strong> 축산시설의 악취 측정은 공정시험법에 따른 수동 시료 채취 방식으로 수행되어, 측정 빈도가 낮고(연 1~2회) 시간·비용 부담이 컸습니다. 악취는 기상 조건(풍향·풍속·온도·습도)에 따라 시시각각 변동하므로, 간헐적 측정으로는 실태를 정확히 파악할 수 없었습니다.</p>
<p><strong>Solution:</strong> 축산시설 주요 발생원(축사, 퇴비장, 정화시설)에 IoT 악취 센서를 설치하여 암모니아(NH₃), 황화수소(H₂S), 복합악취 농도를 1분~5분 주기로 연속 측정합니다. 각 센서 노드는 LoRa/LTE 게이트웨이를 통해 측정 데이터를 중앙 서버로 전송하며, 기상 관측 장비와 연동하여 풍향·풍속·온습도 데이터를 동시에 수집합니다. 센서 자가진단 및 이상값 필터링 알고리즘을 내장하여 데이터 품질을 자동으로 관리합니다.</p>

<h3>B. 웹 대시보드 통합 모니터링 및 통계 분석</h3>
<p><strong>Problem:</strong> 수집된 대량의 시계열 악취 데이터를 의미 있는 정보로 가공하여 환경 관리 담당자에게 제공해야 하며, 기준치 초과 시 즉시 알림과 대응 조치가 이루어져야 했습니다. 또한 규제 기관 보고용 통계 자료의 자동 생성이 필요했습니다.</p>
<p><strong>Solution:</strong> 웹 기반 통합 대시보드에서 모든 측정 지점의 실시간 악취 농도를 지도 위에 히트맵으로 시각화하고, 시간대별·계절별·기상조건별 추이 그래프를 제공합니다. 악취 배출 기준치(악취방지법 시행규칙) 초과 시 SMS·이메일 알림을 자동 발송하며, 일간·주간·월간·연간 통계 보고서를 자동 생성하여 PDF/Excel로 다운로드할 수 있습니다. 풍향별 악취 장미도(Odor Rose) 분석으로 주변 영향권 평가를 지원합니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">IoT Sensor</span>
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">LoRa/LTE</span>
  <span style="background: rgba(245,158,11,0.2); color: #fcd34d; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Web Dashboard</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Time-series DB</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>과학적 악취 관리:</strong> 주관적 민원 대응에서 데이터 기반 객관적 악취 관리 체계로 전환</li>
<li><strong>규제 대응:</strong> 악취방지법 기준치 상시 모니터링으로 법적 리스크 사전 예방</li>
<li><strong>민원 해소:</strong> 실시간 측정 데이터 공개로 주민 신뢰 확보 및 악취 민원 감소</li>
<li><strong>확장성:</strong> 산업단지, 하수처리장 등 다른 악취 발생원으로 모니터링 시스템 확대 적용 가능</li>
</ul>

<h2>04. Technical Identity</h2>
<p>IoT 센서 네트워크 구축부터 데이터 수집·분석·시각화까지 환경 모니터링 시스템의 전 영역을 아우르는 풀스택 IoT 프로젝트입니다. 축산 환경이라는 특수한 도메인에서 센서 하드웨어 연동, 시계열 데이터 처리, 통계 분석, 웹 대시보드 개발의 종합적 기술 역량을 입증합니다.</p>`,
    "/images/portfolio/default-eco.jpg",
    2021, 1, 1, 102
  ],

  // 4. 전산유체역학 기반 악취 확산 모델링
  [
    crypto.randomUUID(),
    "cat-ai-ml",
    "환경 관리 기관",
    "전산유체역학 기반 악취 확산 모델링",
    "CFD(전산유체역학) 시뮬레이션 기반의 축산 악취 대기 확산 예측 모델 개발 및 3D 가시화 시스템 구축",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>전산유체역학(CFD: Computational Fluid Dynamics) 기반 악취 확산 모델링 프로젝트는 축산시설에서 발생하는 악취 물질의 대기 중 확산 경로와 농도 분포를 과학적으로 예측하는 시뮬레이션 시스템을 개발한 사업입니다. Python 기반의 CFD 솔버를 활용하여 지형, 건물, 기상 조건을 반영한 3차원 유동장 해석을 수행하고, 악취 물질의 이류·확산·침적 과정을 수치적으로 모사합니다. 실측 데이터와의 검증을 통해 모델의 신뢰성을 확보하였으며, 악취 영향권 예측과 저감 시설 배치 최적화를 지원하는 환경 의사결정 도구입니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">CFD Simulation Pipeline</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">PRE-PROCESS</div>
      <div style="color: white; font-weight: 600;">지형·격자 생성</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">SOLVER</div>
      <div style="color: white; font-weight: 600;">CFD 유동 해석</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">DISPERSION</div>
      <div style="color: white; font-weight: 600;">확산 모델링</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(245,158,11,0.2); border: 1px solid rgba(245,158,11,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">VISUALIZATION</div>
      <div style="color: white; font-weight: 600;">3D 농도 분포</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 3차원 CFD 유동장 해석 엔진</h3>
<p><strong>Problem:</strong> 축산시설 주변의 악취 확산은 지형 기복, 건물 배치, 대기 안정도, 풍속·풍향 등 복합적 요인에 의해 결정되며, 가우시안 확산 모델과 같은 단순 해석 모델로는 복잡한 지형에서의 유동 패턴(후류, 와류, 역류)을 정확히 예측할 수 없었습니다.</p>
<p><strong>Solution:</strong> Python 기반 CFD 프레임워크를 활용하여 Navier-Stokes 방정식의 RANS(Reynolds-Averaged Navier-Stokes) 해석을 수행합니다. 수치 지형 모델(DEM)과 건물 3D 모델을 입력으로 비정렬 격자를 자동 생성하고, k-ε 난류 모델을 적용하여 대기 경계층의 난류 구조를 모사합니다. 대기 안정도 등급(Pasquill-Gifford)에 따른 경계 조건 설정을 자동화하여, 기상 조건별 시나리오 분석을 효율적으로 수행할 수 있습니다.</p>

<h3>B. 악취 확산 예측 및 3D 가시화</h3>
<p><strong>Problem:</strong> CFD 유동장 해석 결과를 바탕으로 악취 물질의 농도 분포를 산출하고, 이를 비전문가(환경 관리 담당자, 지역 주민)도 직관적으로 이해할 수 있는 형태로 시각화해야 했습니다.</p>
<p><strong>Solution:</strong> 유동장 해석 결과에 스칼라 이송 방정식을 커플링하여 악취 물질의 이류·난류확산·지표면 침적을 계산합니다. 복수 발생원의 동시 방출과 화학 반응에 의한 농도 변화를 고려하며, 계산 결과를 3D 등농도면(Iso-surface), 수평·수직 단면 농도 분포, 지상면 농도 맵으로 가시화합니다. 웹 기반 3D 뷰어를 통해 시점을 자유롭게 조절하며 확산 패턴을 탐색할 수 있으며, 시간에 따른 확산 과정을 애니메이션으로 재생하는 기능도 제공합니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Python</span>
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">CFD/FVM</span>
  <span style="background: rgba(245,158,11,0.2); color: #fcd34d; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">NumPy/SciPy</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">ParaView</span>
  <span style="background: rgba(236,72,153,0.2); color: #f9a8d4; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">OpenFOAM</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>과학적 예측:</strong> 실측 불가능한 미래 확산 시나리오를 수치 시뮬레이션으로 사전 예측 가능</li>
<li><strong>시설 최적화:</strong> 악취 저감 시설(바이오커버, 방풍림 등)의 배치 위치·규모 최적화에 CFD 결과 활용</li>
<li><strong>환경 영향 평가:</strong> 신규 축산시설 인허가 시 악취 영향권 예측 자료로 활용 가능</li>
<li><strong>기술 확장:</strong> 대기 오염 물질(미세먼지, VOCs) 확산 모델링, 도시 바람길 분석 등으로 응용 가능</li>
</ul>

<h2>04. Technical Identity</h2>
<p>전산유체역학(CFD)이라는 고급 수치해석 기술을 환경 문제 해결에 적용한 융합 기술 프로젝트입니다. Navier-Stokes 방정식 기반의 유동 해석과 스칼라 이송 모델링에 대한 깊은 이론적 이해, Python 기반 과학 컴퓨팅 역량, 3D 가시화 기술을 결합하여 환경 분야 AI·시뮬레이션 전문성을 입증합니다.</p>`,
    "/images/portfolio/default-ai.jpg",
    2021, 1, 1, 103
  ],

  // 5. 신재생에너지 온라인 VR전시관
  [
    crypto.randomUUID(),
    "cat-eco",
    "에너지 관련 기관",
    "신재생에너지 온라인 VR전시관",
    "태양광·풍력·수소 등 신재생에너지원을 체험할 수 있는 웹 기반 3D/VR 인터랙티브 온라인 전시관 개발",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>신재생에너지 온라인 VR전시관 프로젝트는 태양광, 풍력, 수소에너지 등 신재생에너지원의 원리·기술·활용 사례를 일반 시민이 웹 브라우저에서 3D/VR로 체험할 수 있는 인터랙티브 온라인 전시관을 개발한 사업입니다. 코로나19 팬데믹 상황에서 물리적 전시관 방문이 제한되는 환경에서, 시공간 제약 없이 누구나 접근 가능한 디지털 전시 환경을 구축하여 신재생에너지에 대한 국민 인식 제고와 교육 효과를 달성했습니다. WebGL 기반 3D 렌더링과 VR 인터랙션을 결합한 몰입형 전시 경험을 제공합니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">VR Exhibition Structure</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
    <div style="background: rgba(245,158,11,0.2); border: 1px solid rgba(245,158,11,0.4); padding: 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 24px; margin-bottom: 4px;">&#9728;</div>
      <div style="color: white; font-weight: 600; font-size: 13px;">태양광관</div>
    </div>
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 24px; margin-bottom: 4px;">&#127744;</div>
      <div style="color: white; font-weight: 600; font-size: 13px;">풍력관</div>
    </div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 24px; margin-bottom: 4px;">&#9883;</div>
      <div style="color: white; font-weight: 600; font-size: 13px;">수소관</div>
    </div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 24px; margin-bottom: 4px;">&#127758;</div>
      <div style="color: white; font-weight: 600; font-size: 13px;">통합 체험관</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. WebGL 기반 3D 전시 공간 구현</h3>
<p><strong>Problem:</strong> 물리적 전시관의 공간감과 전시 동선을 온라인에서 재현해야 하며, 별도 프로그램 설치 없이 웹 브라우저만으로 3D 환경을 원활하게 구동해야 했습니다. 다양한 디바이스(PC, 태블릿, 모바일)에서의 호환성도 확보해야 했습니다.</p>
<p><strong>Solution:</strong> WebGL 기반 3D 렌더링 엔진을 활용하여 전시관 건물 내부·외부를 사실적으로 모델링하고, 1인칭 시점으로 자유롭게 이동하며 전시물을 관람할 수 있는 내비게이션 시스템을 구현했습니다. 에너지원별 전시관(태양광관, 풍력관, 수소관)을 독립적으로 설계하되 공통 로비에서 연결하는 동선을 구성하고, LOD와 텍스처 압축으로 로딩 시간과 메모리 사용을 최적화하여 모바일 환경에서도 30fps 이상의 렌더링 성능을 확보했습니다.</p>

<h3>B. 인터랙티브 콘텐츠 및 VR 체험</h3>
<p><strong>Problem:</strong> 단순 3D 공간 관람만으로는 교육 효과가 제한적이므로, 관람자가 직접 조작하고 체험하는 인터랙티브 요소가 필요했습니다. VR 헤드셋 사용자를 위한 몰입형 인터랙션도 지원해야 했습니다.</p>
<p><strong>Solution:</strong> 각 전시 공간에 인터랙티브 체험 콘텐츠를 배치하여 태양광 패널의 각도 조절에 따른 발전량 변화 시뮬레이션, 풍력 터빈의 구조 분해·조립 체험, 수소 연료전지의 전기화학 반응 과정 애니메이션 등을 제공합니다. WebXR API를 통해 VR 헤드셋 연결 시 완전 몰입형 체험으로 전환되며, 핸드 컨트롤러로 전시물을 직접 조작할 수 있습니다. 음성 해설과 자막을 동시에 제공하여 접근성을 높였습니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">WebGL</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Three.js</span>
  <span style="background: rgba(245,158,11,0.2); color: #fcd34d; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">WebXR</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">3D Modeling</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>접근성 혁신:</strong> 시공간 제약 없이 누구나 웹 브라우저로 신재생에너지 전시관 관람 가능</li>
<li><strong>교육 효과:</strong> 인터랙티브 체험 콘텐츠로 단순 관람 대비 높은 교육 몰입도와 이해도 달성</li>
<li><strong>비용 효율:</strong> 물리적 전시관 운영·유지보수 비용 대비 경제적인 디지털 전시 운영</li>
<li><strong>콘텐츠 확장:</strong> 신규 에너지원(지열, 바이오매스 등) 전시관 추가가 용이한 모듈형 구조</li>
</ul>

<h2>04. Technical Identity</h2>
<p>WebGL 3D 렌더링, WebXR 가상현실, 인터랙티브 콘텐츠 기획을 융합한 디지털 전시 기술 프로젝트입니다. 웹 기반 3D/VR 기술의 실용적 적용 역량과 교육·홍보 목적의 콘텐츠 설계 능력을 동시에 보여주며, 공공 기관의 디지털 전환 니즈에 대응한 사례입니다.</p>`,
    "/images/portfolio/default-eco.jpg",
    2021, 1, 0, 104
  ],

  // 6. 엠텍 인공지능 플랫폼 연동 System
  [
    crypto.randomUUID(),
    "cat-ai-ml",
    "㈜엠텍",
    "엠텍 인공지능 플랫폼 연동 System",
    "㈜엠텍의 AI 엔진과 외부 시스템 간 데이터 파이프라인 구축 및 API 기반 인공지능 플랫폼 통합 연동 시스템 개발",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>엠텍 인공지능 플랫폼 연동 System은 ㈜엠텍이 보유한 AI 엔진(머신러닝·딥러닝 모델)을 다양한 외부 비즈니스 시스템과 연동하는 통합 플랫폼을 개발한 프로젝트입니다. AI 모델의 학습·추론 파이프라인을 표준화된 API로 추상화하여, 엔터프라이즈 환경의 ERP·MES·CRM 등 기간계 시스템에서 AI 기능을 쉽게 호출·활용할 수 있는 미들웨어 계층을 구축했습니다. 데이터 전처리, 모델 서빙, 결과 후처리, 모니터링까지 AI 운영의 전 과정을 자동화하여 AI 기술의 실무 적용 장벽을 낮추는 플랫폼입니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">Platform Integration Architecture</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(245,158,11,0.2); border: 1px solid rgba(245,158,11,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">SOURCE</div>
      <div style="color: white; font-weight: 600;">외부 시스템</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">MIDDLEWARE</div>
      <div style="color: white; font-weight: 600;">API Gateway</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">AI ENGINE</div>
      <div style="color: white; font-weight: 600;">ML/DL 모델</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">OUTPUT</div>
      <div style="color: white; font-weight: 600;">추론 결과 반환</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. AI 모델 서빙 및 API 표준화 계층</h3>
<p><strong>Problem:</strong> ㈜엠텍의 AI 모델은 다양한 프레임워크(TensorFlow, PyTorch, scikit-learn)로 개발되어 있으며, 각 모델의 입출력 형식과 호출 방식이 상이하여 외부 시스템과의 연동에 개별적인 커스텀 개발이 필요했습니다. 모델 버전 관리와 A/B 테스트도 체계화되지 않아 운영 효율성이 낮았습니다.</p>
<p><strong>Solution:</strong> RESTful API 기반의 모델 서빙 계층을 구축하여 프레임워크에 무관하게 통일된 API 인터페이스로 AI 모델을 호출할 수 있도록 추상화했습니다. 모델 등록·버전 관리·배포 파이프라인을 자동화하고, 요청 큐잉과 배치 처리로 대량 추론 요청을 효율적으로 처리합니다. API 키 기반 인증과 요청 제한(Rate Limiting)으로 보안과 안정성을 확보했습니다.</p>

<h3>B. 데이터 파이프라인 및 연동 어댑터</h3>
<p><strong>Problem:</strong> 외부 시스템의 데이터 형식(DB, CSV, JSON, XML)과 AI 모델이 요구하는 입력 형식 간 변환이 필요하며, 실시간 스트리밍과 배치 처리를 모두 지원해야 했습니다.</p>
<p><strong>Solution:</strong> 플러그인 방식의 데이터 어댑터를 개발하여 RDBMS, NoSQL, 파일 시스템, 메시지 큐 등 다양한 데이터 소스와의 연결을 표준화했습니다. ETL 파이프라인으로 데이터 전처리(정규화, 결측치 처리, 특징 추출)를 자동 수행하며, 추론 결과의 후처리 및 대상 시스템으로의 역전송을 지원합니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">REST API</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Python</span>
  <span style="background: rgba(245,158,11,0.2); color: #fcd34d; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">TensorFlow</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Docker</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>AI 도입 가속화:</strong> 표준 API를 통해 기존 시스템에 AI 기능을 신속하게 통합 가능</li>
<li><strong>운영 자동화:</strong> 모델 배포·모니터링·버전 관리를 자동화하여 MLOps 기반 확보</li>
<li><strong>유연한 확장:</strong> 신규 AI 모델 추가 시 API 등록만으로 서비스 즉시 제공 가능</li>
<li><strong>비즈니스 가치:</strong> AI 기술을 실무 업무에 직접 연결하여 비즈니스 의사결정 품질 향상</li>
</ul>

<h2>04. Technical Identity</h2>
<p>AI 모델 서빙, API 설계, 데이터 파이프라인 구축을 아우르는 AI 플랫폼 엔지니어링 프로젝트입니다. 다양한 ML/DL 프레임워크의 통합 운영과 엔터프라이즈 시스템 연동에 대한 기술적 깊이를 보여주며, AI의 실용적 비즈니스 적용을 가능하게 하는 미들웨어 설계 역량을 입증합니다.</p>`,
    "/images/portfolio/default-ai.jpg",
    2018, 1, 0, 105
  ],

  // 7. 삼성중공업 선형설계 업무포탈 시스템
  [
    crypto.randomUUID(),
    "cat-maritime",
    "삼성중공업",
    "삼성중공업 선형설계 업무포탈 시스템",
    "삼성중공업 선박 선형(Hull Form) 설계 부서의 업무 프로세스 관리·협업·데이터 공유를 위한 웹 기반 통합 포탈 시스템 개발",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>삼성중공업 선형설계 업무포탈 시스템은 선박 건조의 핵심 공정인 선형(Hull Form) 설계 부서의 업무 프로세스를 통합 관리하는 웹 기반 포탈 시스템입니다. 선형설계는 선박의 저항·추진 성능, 복원성, 구조 안전성을 결정하는 핵심 설계 단계로서, 다수의 전문 엔지니어가 협업하여 수행합니다. 본 시스템은 설계 데이터의 체계적 관리, 설계 변경 이력 추적, 부서 간 협업 워크플로우, 설계 기준·표준 문서 관리를 단일 포탈에서 수행하여 삼성중공업의 선형설계 업무 효율성과 설계 품질을 향상시켰습니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">업무포탈 System Architecture</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">설계 입력</div>
      <div style="color: white; font-weight: 600;">선형 데이터</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">워크플로우</div>
      <div style="color: white; font-weight: 600;">설계 검토·승인</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">데이터 관리</div>
      <div style="color: white; font-weight: 600;">버전·이력 추적</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(245,158,11,0.2); border: 1px solid rgba(245,158,11,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">협업</div>
      <div style="color: white; font-weight: 600;">부서 간 공유</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 선형설계 데이터 통합 관리 체계</h3>
<p><strong>Problem:</strong> 선형설계 과정에서 생성되는 대량의 설계 데이터(선형 곡면 데이터, 수조 시험 결과, CFD 해석 결과, 오프셋 테이블 등)가 개인 PC와 부서 파일 서버에 분산 저장되어 있어, 데이터 검색·재사용이 어렵고 버전 혼동으로 인한 설계 오류 위험이 있었습니다.</p>
<p><strong>Solution:</strong> 선종(컨테이너선, 유조선, LNG선 등)별·호선(Hull Number)별로 설계 데이터를 체계적으로 분류·저장하는 중앙 저장소를 구축했습니다. 설계 파일의 체크인/체크아웃 기반 동시 편집 제어, 버전 비교·롤백 기능, 메타데이터(선종, 재화중량톤수, 주요 치수) 기반 검색을 제공합니다. 과거 유사 선형의 설계 데이터를 신속하게 검색·참조할 수 있어 설계 초기 단계의 효율성을 대폭 향상시켰습니다.</p>

<h3>B. 설계 워크플로우 및 협업 시스템</h3>
<p><strong>Problem:</strong> 선형설계는 초기설계→기본설계→상세설계 단계를 거치며 구조, 의장, 기관 등 타 설계 부서와의 긴밀한 협업이 필요합니다. 설계 변경 요청·검토·승인 프로세스가 이메일과 오프라인 회의에 의존하여 지연과 누락이 발생했습니다.</p>
<p><strong>Solution:</strong> 설계 변경 요청(ECR)·설계 변경 지시(ECO) 워크플로우를 시스템화하여, 요청 등록→담당자 배정→검토→승인→반영 전 과정을 포탈에서 관리합니다. 관련 부서 자동 통보, 검토 의견 온라인 취합, 승인 이력 감사 추적 기능을 제공하며, 프로젝트 일정 대비 설계 진행률을 대시보드로 시각화합니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Java/Spring</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Oracle DB</span>
  <span style="background: rgba(245,158,11,0.2); color: #fcd34d; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Web Portal</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Workflow Engine</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>설계 효율성:</strong> 과거 선형 데이터의 신속한 검색·재사용으로 초기 설계 소요 시간 단축</li>
<li><strong>품질 향상:</strong> 버전 관리와 변경 이력 추적으로 설계 오류 방지 및 품질 보증 체계 강화</li>
<li><strong>협업 강화:</strong> 부서 간 온라인 협업 체계로 커뮤니케이션 지연 및 정보 누락 최소화</li>
<li><strong>지식 자산화:</strong> 축적된 설계 데이터와 노하우가 조직의 지적 자산으로 체계적으로 관리</li>
</ul>

<h2>04. Technical Identity</h2>
<p>조선 해양 산업의 핵심 설계 프로세스인 선형설계 업무를 깊이 이해하고, 대규모 엔지니어링 데이터의 체계적 관리와 협업 워크플로우를 웹 포탈로 구현한 조선 도메인 특화 프로젝트입니다. 삼성중공업이라는 글로벌 조선사의 설계 업무 요구사항을 충족하는 엔터프라이즈급 시스템 설계 역량을 입증합니다.</p>`,
    "/images/portfolio/default-maritime.jpg",
    2018, 1, 1, 106
  ],

  // 8. Microsoft Azure 빅데이터 얼굴인식 로봇 제어 플랫폼
  [
    crypto.randomUUID(),
    "cat-ai-ml",
    "로봇 기업",
    "Microsoft Azure 빅데이터 얼굴인식 로봇 제어 플랫폼",
    "Microsoft Azure Face API와 QR 코드 인식을 결합한 안드로이드 기반 로봇 제어 플랫폼 개발",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>Microsoft Azure 빅데이터 얼굴인식 로봇 제어 플랫폼은 Azure Cognitive Services의 Face API를 활용한 얼굴 인식과 QR 코드 스캔 기능을 결합하여 서비스 로봇의 사용자 인터랙션을 지능화한 플랫폼입니다. 안드로이드(Java) 기반의 로봇 제어 앱과 C# 기반의 Azure 백엔드 서비스로 구성되며, 로봇이 사용자를 얼굴로 인식하여 개인화된 서비스를 제공하고, QR 코드 스캔으로 특정 업무 시나리오를 실행하는 지능형 로봇 제어 체계입니다. 클라우드 AI 서비스의 실시간 호출과 로봇 하드웨어 제어를 통합한 엣지-클라우드 협업 아키텍처를 구현했습니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">Edge-Cloud Robot Architecture</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">ROBOT</div>
      <div style="color: white; font-weight: 600;">카메라·센서</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">ANDROID APP</div>
      <div style="color: white; font-weight: 600;">얼굴·QR 캡처</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">AZURE CLOUD</div>
      <div style="color: white; font-weight: 600;">Face API 인식</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(245,158,11,0.2); border: 1px solid rgba(245,158,11,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">CONTROL</div>
      <div style="color: white; font-weight: 600;">로봇 동작 실행</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. Azure Face API 기반 사용자 인식 엔진</h3>
<p><strong>Problem:</strong> 서비스 로봇이 사용자를 개별적으로 인식하여 맞춤형 서비스를 제공하려면 얼굴 인식 기능이 필요하나, 로봇 탑재 컴퓨팅 자원으로는 고정밀 얼굴 인식 모델의 실시간 운영이 어려웠습니다. 조명 변화, 각도 차이, 마스크 착용 등 현실 환경의 다양한 조건에서도 높은 인식률이 요구되었습니다.</p>
<p><strong>Solution:</strong> 로봇의 카메라로 촬영한 얼굴 이미지를 Azure Face API로 전송하여 클라우드에서 얼굴 검출·특징 추출·비교를 수행합니다. 사전 등록된 사용자의 얼굴 정보를 Azure Person Group으로 관리하고, 실시간 인식 결과를 1초 이내에 반환받아 로봇의 인사·안내·서비스 시나리오를 트리거합니다. 네트워크 지연 시를 대비한 로컬 캐싱과 오프라인 폴백 로직을 구현하여 서비스 연속성을 보장합니다.</p>

<h3>B. QR 코드 인식 및 로봇 제어 시나리오 엔진</h3>
<p><strong>Problem:</strong> 얼굴 인식 외에 특정 업무·서비스 시나리오를 로봇에게 지시하는 간편한 인터페이스가 필요했으며, 로봇의 이동·음성·디스플레이·모터 제어를 통합적으로 관리하는 시나리오 실행 체계가 요구되었습니다.</p>
<p><strong>Solution:</strong> QR 코드 스캔으로 특정 서비스 시나리오(회의실 안내, 방문자 접수, 물품 배달 등)를 즉시 실행하는 시스템을 구현했습니다. 안드로이드 앱에서 카메라 기반 QR 코드 디코딩과 시나리오 매핑을 처리하며, C# 백엔드에서 시나리오 정의·관리·배포를 수행합니다. 로봇의 이동 경로, 음성 안내, 화면 표시, 팔 동작을 시퀀스로 정의하여 비개발자도 시나리오를 편집할 수 있는 관리 도구를 제공합니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Android/Java</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">C#/.NET</span>
  <span style="background: rgba(245,158,11,0.2); color: #fcd34d; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Azure Face API</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">QR Recognition</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>지능형 로봇 서비스:</strong> 얼굴 인식 기반 개인화 서비스로 로봇 활용 가치 극대화</li>
<li><strong>클라우드 AI 활용:</strong> Azure Cognitive Services를 통해 최신 AI 모델을 별도 학습 없이 즉시 적용</li>
<li><strong>시나리오 확장성:</strong> QR 코드 기반 시나리오 시스템으로 서비스 영역을 유연하게 확장 가능</li>
<li><strong>멀티 플랫폼:</strong> Android + C# + Azure의 크로스 플랫폼 아키텍처로 다양한 로봇 하드웨어에 적용 가능</li>
</ul>

<h2>04. Technical Identity</h2>
<p>Microsoft Azure 클라우드 AI 서비스, 안드로이드 모바일 개발, 로봇 하드웨어 제어를 융합한 멀티 플랫폼 AI 로보틱스 프로젝트입니다. 클라우드-엣지 협업 아키텍처 설계, 실시간 영상 처리, 로봇 시나리오 엔진 개발 등 다양한 기술 스택의 통합 역량을 보여줍니다.</p>`,
    "/images/portfolio/default-ai.jpg",
    2018, 1, 0, 107
  ],

  // 9. (주)삼양 바이오팜 바코드 System
  [
    crypto.randomUUID(),
    "cat-smart-factory",
    "㈜삼양 바이오팜",
    "(주)삼양 바이오팜 바코드 System",
    "바이오 제약 생산 시설의 원자재·중간재·완제품 바코드 기반 이력 추적 및 재고 관리 시스템 도입·안정화",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>(주)삼양 바이오팜 바코드 System은 바이오 제약 생산 시설에 바코드 기반의 자재 이력 추적 및 재고 관리 시스템을 도입하고 안정화한 프로젝트입니다. 의약품 제조업의 엄격한 GMP(Good Manufacturing Practice) 규정에 부합하는 원자재 입고부터 완제품 출하까지의 전 과정 추적성(Traceability)을 확보하고, 실시간 재고 현황 파악과 유효기간 관리를 자동화하여 제약 생산의 품질 관리와 물류 효율성을 동시에 향상시켰습니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">Barcode Tracking Flow</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">입고</div>
      <div style="color: white; font-weight: 600;">원자재 스캔</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">생산</div>
      <div style="color: white; font-weight: 600;">공정 투입 기록</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">검사</div>
      <div style="color: white; font-weight: 600;">품질 검증</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(245,158,11,0.2); border: 1px solid rgba(245,158,11,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">출하</div>
      <div style="color: white; font-weight: 600;">완제품 추적</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. GMP 적합 바코드 이력 추적 체계</h3>
<p><strong>Problem:</strong> 바이오 제약 생산에서는 원자재 로트(Lot) 단위의 완벽한 이력 추적이 GMP 규정상 필수이며, 수기 기록에 의존할 경우 기록 오류, 누락, 위변조 위험이 존재했습니다. 리콜 발생 시 해당 로트의 원자재 출처와 완제품 유통 경로를 신속히 추적해야 하나 수기 장부로는 수일이 소요되었습니다.</p>
<p><strong>Solution:</strong> 모든 원자재·중간재·완제품에 바코드 라벨을 부착하고, 입고·불출·생산 투입·공정 이동·포장·출하 각 단계에서 바코드 스캔으로 이력을 자동 기록합니다. 각 스캔 시점에 작업자 ID, 타임스탬프, 위치 정보가 함께 저장되어 완벽한 감사 추적(Audit Trail)을 구현하며, 로트 번호 기반 양방향 추적(원자재→완제품, 완제품→원자재)을 지원하여 리콜 대응 시간을 수 분 이내로 단축했습니다.</p>

<h3>B. 실시간 재고 관리 및 유효기간 관리</h3>
<p><strong>Problem:</strong> 바이오 원자재는 엄격한 보관 조건(온도, 습도)과 유효기간 관리가 필요하며, 선입선출(FIFO) 원칙의 준수가 품질 관리의 핵심이었습니다. 수작업 재고 실사는 빈도가 낮아 실시간 재고 파악이 불가능했습니다.</p>
<p><strong>Solution:</strong> 바코드 스캔 기반의 실시간 재고 자동 갱신 시스템을 구축하여 입출고 즉시 재고 수량이 반영됩니다. 유효기간 임박 자재 자동 알림, FIFO 위반 경고, 안전 재고 미달 알림을 제공하며, 창고 위치별(랙·셸프·빈) 재고 현황을 시각적으로 표시하여 자재 검색 시간을 최소화합니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Barcode System</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">GMP Compliance</span>
  <span style="background: rgba(245,158,11,0.2); color: #fcd34d; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">WMS</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Lot Tracking</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>GMP 적합성:</strong> 바코드 기반 자동 이력 기록으로 GMP 감사(Audit) 대응 역량 강화</li>
<li><strong>리콜 대응:</strong> 로트 단위 양방향 추적으로 리콜 대상 식별 시간을 수일에서 수 분으로 단축</li>
<li><strong>재고 정확성:</strong> 실시간 재고 관리로 재고 정확도 향상 및 과잉·부족 재고 방지</li>
<li><strong>확장 가능:</strong> 2D 바코드, RFID 등 차세대 자동인식 기술로의 업그레이드 기반 확보</li>
</ul>

<h2>04. Technical Identity</h2>
<p>바이오 제약이라는 고도의 규제 산업에서 바코드 시스템의 도입부터 안정화까지를 수행한 스마트 팩토리 프로젝트입니다. GMP 규정에 대한 깊은 이해와 생산 현장의 업무 프로세스 분석 역량, 바코드 하드웨어-소프트웨어 통합 기술을 입증하며, 제약 산업 디지털 전환의 실무 경험을 보여줍니다.</p>`,
    "/images/portfolio/default-factory.jpg",
    2017, 1, 0, 108
  ],

  // 10. 자전거 무인대여 시스템 Demo App
  [
    crypto.randomUUID(),
    "cat-mobility",
    "HADEUL · 자체 R&D",
    "자전거 무인대여 시스템 Demo App",
    "IoT 스마트락 연동 자전거 무인대여 서비스의 모바일 앱 프로토타입 및 관리 시스템 데모 개발",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>자전거 무인대여 시스템 Demo App은 하듈이 자체 R&D로 기획·개발한 IoT 기반 자전거 무인대여 서비스의 프로토타입입니다. 스마트폰 앱으로 주변 대여소 검색, 자전거 예약, QR/블루투스 기반 잠금 해제, 이용 요금 자동 정산까지의 무인대여 전 과정을 구현했습니다. IoT 스마트락 하드웨어와 모바일 앱, 관리 서버의 3계층 아키텍처를 설계하고, 공유 모빌리티 서비스의 핵심 기술 요소를 검증한 기술 데모입니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">Unmanned Rental System Flow</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">SEARCH</div>
      <div style="color: white; font-weight: 600;">대여소 검색</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">UNLOCK</div>
      <div style="color: white; font-weight: 600;">QR/BLE 해제</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">RIDE</div>
      <div style="color: white; font-weight: 600;">이용·GPS 추적</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(245,158,11,0.2); border: 1px solid rgba(245,158,11,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 100px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">RETURN</div>
      <div style="color: white; font-weight: 600;">반납·자동 정산</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. IoT 스마트락 연동 및 잠금 제어</h3>
<p><strong>Problem:</strong> 무인대여 시스템의 핵심은 스마트폰으로 자전거의 물리적 잠금장치를 원격 제어하는 것이며, BLE(Bluetooth Low Energy) 통신의 신뢰성, 배터리 소모 최적화, 무단 사용 방지가 주요 기술 과제였습니다.</p>
<p><strong>Solution:</strong> BLE 기반 스마트락 통신 프로토콜을 설계하여 앱-스마트락 간 암호화된 인증·해제 명령을 주고받습니다. QR 코드 스캔으로 대여 세션을 시작하고 BLE 페어링으로 잠금을 해제하는 이중 인증 체계를 구현했습니다. 스마트락의 배터리 잔량 모니터링, 잠금 상태 실시간 보고, 비정상 이동 감지 알림 기능을 포함하며, BLE 연결 실패 시 서버 측 원격 제어 폴백을 제공합니다.</p>

<h3>B. 모바일 앱 및 관리 시스템</h3>
<p><strong>Problem:</strong> 사용자가 직관적으로 주변 자전거를 찾아 대여하고, 이용 후 간편하게 반납·결제할 수 있는 UX가 필요했으며, 관리자는 전체 자전거의 위치·상태·이용 현황을 실시간으로 파악해야 했습니다.</p>
<p><strong>Solution:</strong> 지도 기반 UI로 주변 대여소와 이용 가능 자전거 수를 실시간 표시하고, 예약→대여→이용→반납→결제의 전 과정을 3탭 이내로 완료할 수 있는 간결한 UX를 설계했습니다. GPS 기반 이용 경로 기록과 이동 거리·시간 산출, 구간별 요금 자동 계산을 수행합니다. 관리 웹 시스템에서는 전체 자전거의 위치를 지도에 표시하고, 배터리 부족·고장·구역 이탈 자전거를 자동으로 식별하여 정비 알림을 발송합니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Mobile App</span>
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">BLE/IoT</span>
  <span style="background: rgba(245,158,11,0.2); color: #fcd34d; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">GPS Tracking</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Smart Lock</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>기술 검증:</strong> 공유 모빌리티 서비스의 핵심 기술(IoT 잠금, 위치 추적, 자동 정산)을 프로토타입으로 검증</li>
<li><strong>자체 R&D:</strong> 외부 수주가 아닌 자체 기술 연구로 공유 경제 플랫폼 기획·개발 역량 확보</li>
<li><strong>확장 가능:</strong> 전동킥보드, 전동자전거 등 다른 모빌리티 수단으로의 플랫폼 확장 기반 마련</li>
<li><strong>데이터 축적:</strong> 이용 패턴 데이터 분석을 통한 대여소 최적 배치, 수요 예측 등 데이터 기반 운영 기반 확보</li>
</ul>

<h2>04. Technical Identity</h2>
<p>IoT 하드웨어(스마트락) 연동, 모바일 앱 개발, 위치 기반 서비스, 실시간 서버 통신을 아우르는 풀스택 모빌리티 프로젝트입니다. 자체 R&D로 공유 모빌리티 서비스의 전체 아키텍처를 기획·설계·구현한 경험은 새로운 서비스 도메인에 대한 기술적 탐구 의지와 종합적 시스템 설계 역량을 보여줍니다.</p>`,
    "/images/portfolio/default-mobility.jpg",
    2017, 1, 0, 109
  ],

  // 11. 딥러닝 기반 비정형 데이터(음성) 전사 시스템
  [
    crypto.randomUUID(),
    "cat-ai-ml",
    "음성 데이터 연구기관",
    "딥러닝 기반 비정형 데이터(음성) 전사 시스템",
    "딥러닝 음성인식(ASR) 모델과 Google Cloud 인프라를 활용한 대규모 음성 데이터 자동 전사 및 교정 웹 시스템 개발",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>딥러닝 기반 비정형 데이터(음성) 전사 시스템은 대규모 음성 데이터를 자동으로 텍스트로 변환(전사, Transcription)하는 웹 기반 시스템을 개발한 프로젝트입니다. Google Cloud Platform의 Speech-to-Text API와 자체 딥러닝 ASR(Automatic Speech Recognition) 모델을 결합하여 높은 인식 정확도를 달성하고, 웹 인터페이스를 통해 전사 결과의 검수·교정·관리를 수행합니다. Python 백엔드와 PHP 웹 프론트엔드로 구성되며, 약 5개월간의 개발을 통해 음성 데이터 연구기관의 대규모 전사 업무를 자동화했습니다.</p>

<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">ASR Transcription Pipeline</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    <div style="background: rgba(59,130,246,0.2); border: 1px solid rgba(59,130,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">INPUT</div>
      <div style="color: white; font-weight: 600;">음성 업로드</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">PRE-PROCESS</div>
      <div style="color: white; font-weight: 600;">노이즈 제거·분할</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">ASR ENGINE</div>
      <div style="color: white; font-weight: 600;">딥러닝 음성인식</div>
    </div>
    <div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>
    <div style="background: rgba(245,158,11,0.2); border: 1px solid rgba(245,158,11,0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 110px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">REVIEW</div>
      <div style="color: white; font-weight: 600;">검수·교정 UI</div>
    </div>
  </div>
</div>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 딥러닝 ASR 엔진 및 Google Cloud 연동</h3>
<p><strong>Problem:</strong> 대규모 음성 데이터의 수동 전사는 1시간 분량의 음성에 4~6시간의 전사 인력이 소요되어 비용과 시간 측면에서 비효율적이었습니다. 다양한 발화 환경(인터뷰, 회의, 전화 통화)과 화자의 방언·말투 차이로 인해 범용 ASR 엔진의 인식률이 불안정했습니다.</p>
<p><strong>Solution:</strong> Google Cloud Speech-to-Text API를 1차 전사 엔진으로 활용하고, 도메인 특화 언어 모델(Language Model)과 음향 모델(Acoustic Model)을 자체 학습한 딥러닝 ASR을 2차 보정 엔진으로 결합하는 앙상블 파이프라인을 구축했습니다. Python으로 음성 전처리(노이즈 제거, VAD 기반 발화 구간 검출, 화자 분리)를 수행한 후, 병렬 처리로 대량 음성 파일의 일괄 전사를 자동화합니다. 전사 결과에 타임스탬프를 매핑하여 음성-텍스트 동기화를 지원합니다.</p>

<h3>B. 웹 기반 전사 결과 검수·교정 시스템</h3>
<p><strong>Problem:</strong> 자동 전사의 인식률이 100%에 도달할 수 없으므로, 전사 결과를 효율적으로 검수·교정할 수 있는 도구가 필요했습니다. 대량의 전사 작업을 복수의 검수자에게 분배하고 품질을 관리하는 워크플로우도 요구되었습니다.</p>
<p><strong>Solution:</strong> PHP 기반 웹 인터페이스에서 음성 재생과 전사 텍스트 편집을 동일 화면에서 수행할 수 있는 검수 도구를 개발했습니다. 음성의 특정 구간을 클릭하면 해당 위치의 텍스트가 하이라이트되고, 텍스트 수정 시 타임스탬프가 자동으로 재조정됩니다. 전사 작업의 할당·진행률 관리·품질 점검(이중 검수)을 지원하는 관리 대시보드를 제공하며, 교정된 데이터는 ASR 모델의 재학습 데이터로 활용되는 피드백 루프를 구성했습니다.</p>

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">
  <span style="background: rgba(16,185,129,0.2); color: #6ee7b7; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Python</span>
  <span style="background: rgba(59,130,246,0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Google Cloud STT</span>
  <span style="background: rgba(245,158,11,0.2); color: #fcd34d; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">PHP</span>
  <span style="background: rgba(139,92,246,0.2); color: #c4b5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">Deep Learning ASR</span>
  <span style="background: rgba(236,72,153,0.2); color: #f9a8d4; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">WebAudio API</span>
</div>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>전사 효율화:</strong> 수동 전사 대비 작업 시간을 70% 이상 단축하여 대규모 음성 데이터 처리 가능</li>
<li><strong>품질 개선 루프:</strong> 검수·교정 데이터를 ASR 모델 재학습에 활용하여 지속적 인식률 향상</li>
<li><strong>다국어 확장:</strong> Google Cloud STT의 다국어 지원과 자체 모델 학습을 통해 다양한 언어로 확장 가능</li>
<li><strong>연구 지원:</strong> 전사된 텍스트 데이터의 언어학적 분석, 코퍼스 구축 등 후속 연구 기반 제공</li>
</ul>

<h2>04. Technical Identity</h2>
<p>딥러닝 음성인식, Google Cloud AI 서비스, 웹 기반 어노테이션 도구를 결합한 AI 데이터 처리 프로젝트입니다. 5개월간의 집중 개발로 음성 전처리부터 ASR 추론, 결과 검수까지의 전체 파이프라인을 구축한 경험은 비정형 데이터 처리와 AI 서비스 통합에 대한 실전적 역량을 입증합니다.</p>`,
    "/images/portfolio/default-ai.jpg",
    2020, 1, 1, 110
  ],
];

let count = 0;
for (const entry of entries) {
  try {
    insert.run(...entry);
    count++;
    console.log(`Added: ${entry[3]}`);
  } catch(e) {
    console.log(`Skip: ${entry[3]} - ${e.message}`);
  }
}
console.log(`\nTotal: ${count} entries added`);
db.close();
