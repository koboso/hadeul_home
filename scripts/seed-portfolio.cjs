/**
 * Portfolio Data Seed Script v2
 * - No tech stacks in detail
 * - No year/month (all set to 0)
 * - More images in detail pages
 * - More entries with new industry categories
 */
const Database = require("better-sqlite3");
const path = require("path");
const crypto = require("crypto");

const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

function uuid() {
  return crypto.randomUUID();
}

// ── Categories ──────────────────────────────────────────────
const CATS = [
  ["cat-ai-ml",        "AI · Machine Learning",  "ai-ml",           1],
  ["cat-llm",          "LLM · Generative AI",    "llm",             2],
  ["cat-ai-agent",     "AI Agent",               "ai-agent",        3],
  ["cat-game",         "Game",                   "game",            4],
  ["cat-edutech",      "Edutech",                "edutech",         5],
  ["cat-fintech",      "Fintech",                "fintech",         6],
  ["cat-smart-factory","Smart Factory",          "smart-factory",   7],
  ["cat-mobility",     "Mobility",               "mobility",        8],
  ["cat-healthcare",   "Healthcare",             "healthcare",      9],
  ["cat-eco",          "Eco · ESG",              "eco-esg",        10],
  ["cat-maritime",     "Maritime · 해양",         "maritime",       11],
  ["cat-defense",      "Defense · 국방",          "defense",        12],
  ["cat-security",     "Security · 보안",         "security",       13],
  ["cat-iot",          "IoT · 사물인터넷",         "iot",            14],
  ["cat-robotics",     "Robotics · 로보틱스",      "robotics",       15],
  ["cat-web",          "Web · Platform",          "web-platform",   16],
  ["cat-media",        "Media · Streaming",       "media-streaming",17],
  ["cat-etc",          "ETC",                     "etc",            18],
];

db.exec("DELETE FROM portfolio");
db.exec("DELETE FROM categories");
const insertCat = db.prepare("INSERT INTO categories (id, name, slug, sort_order) VALUES (?, ?, ?, ?)");
const catTx = db.transaction(() => {
  for (const [id, name, slug, order] of CATS) {
    insertCat.run(id, name, slug, order);
  }
});
catTx();

const img = (name) => `/uploads/portfolio/${name}`;

// ── Portfolio Data ──────────────────────────────────────────
const portfolioData = [
  // ━━━ MARITIME · 해양 ━━━
  {
    client: "국립해양조사원 · 선박해양플랜트연구소",
    title: "S-100 Registry Management & Catalogue Service Platform",
    description: "국제 차세대 수로 업무 표준(S-100) 기반의 국가 표준 항목 관리 및 거버넌스 체계 구축",
    image: img("s100-registry-1.png"),
    category: "cat-maritime", is_featured: 1, sort_order: 1,
    detail: `
      <h2>01. Strategic Overview (전략적 개요)</h2>
      <p>본 프로젝트는 차세대 국제 해양 데이터 표준인 S-100을 기반으로, 해사안전 및 수로정보의 국가 표준화 항목을 체계적으로 등록하고 관리하는 <strong>중앙 허브 플랫폼</strong>을 구축한 사례입니다.</p>
      <p>복잡한 국제 표준 규격을 준수하면서도, 제안부터 승인까지의 전 과정을 디지털 워크플로우로 구현하여 데이터의 신뢰성과 무결성을 확보했습니다.</p>
      <img src="${img("s100-registry-2.png")}" alt="S-100 Registry 시스템 아키텍처" />

      <h2>02. System Architecture & Key Functions (주요 설계 역량)</h2>

      <h3>A. 지능형 표준 데이터 사전 (FCD Management System)</h3>
      <p><strong>Problem:</strong> 방대한 양의 제품 표준(Product Specification) 항목을 일관성 있게 관리할 체계 부족.</p>
      <p><strong>Solution:</strong> Feature Concept Dictionary(FCD) 등록소 시스템을 구축하여, 수천 개의 해양 물리량 및 객체 정의를 전산화하고 일괄 관리할 수 있는 아키텍처 설계.</p>

      <h3>B. 시각화 표준 관리 (Portrayal Catalogue System)</h3>
      <p><strong>Problem:</strong> 표준 항목에 따른 기호(Symbol)와 시각적 표현 방식의 표준화 필요.</p>
      <p><strong>Solution:</strong> 수로 정보의 시각적 규격을 관리하는 Portrayal Catalogue 심볼 관리 시스템을 통합하여, 데이터와 시각화 규격이 상호 운용되도록 구현.</p>

      <h3>C. 엔터프라이즈 거버넌스 엔진 (Workflow & Authority)</h3>
      <p><strong>Problem:</strong> 다수의 이해관계자가 참여하는 표준 제안 및 검토 과정의 투명성 확보.</p>
      <p><strong>Solution:</strong> 제안 → 검토 → 승인으로 이어지는 단계별 워크플로우 엔진을 구축. 권한 기반(제안자/검토자/승인자)의 사용자 관리 체계를 통해 국제 표준 연동 프로세스의 엄격함을 시스템으로 강제함.</p>

      <h2>03. Project Impact & Scalability (성과 및 확장성)</h2>
      <ul>
        <li><strong>국가 인프라 확보:</strong> 국립해양조사원 및 선박해양플랜트연구소와 공동 개발을 통해, <strong>국가 표준화 항목 등록소(Registry)</strong>로서의 공신력 확보.</li>
        <li><strong>글로벌 표준 대응:</strong> 다국어 지원 및 IHO(국제수로기구) 표준 연동을 통해, 향후 전 세계적으로 적용될 S-100 표준화 생태계의 선제적 기술 대응 완료.</li>
        <li><strong>데이터 무결성:</strong> 복잡한 제품 표준 카탈로그 서비스를 통해 해사 안전 데이터의 정확한 배포 및 서비스 기반 마련.</li>
      </ul>

      <h2>04. Technical Identity</h2>
      <p>하들소프트는 일반적인 웹 에이전시가 다루기 힘든 <strong>국제 표준 아키텍처(S-100)</strong>를 깊이 이해하고, 이를 웹 기반의 관리 시스템으로 형상화하는 데 성공했습니다. 데이터 간의 복잡한 관계성을 정의하고, 엄격한 승인 절차를 로직으로 구현하는 High-End 엔지니어링 역량을 증명한 프로젝트입니다.</p>
    `,
  },
  {
    client: "선박해양플랜트연구소 (KRISO)",
    title: "Maritime Navigation Simulator Prototype",
    description: "실시간 해양 물리 엔진과 3D 렌더링을 결합한 차세대 선박운항 시뮬레이터 시작품 개발",
    image: img("ship-navigation-simulator-1.png"),
    category: "cat-maritime", is_featured: 1, sort_order: 2,
    detail: `
      <h2>01. Strategic Overview</h2>
      <p>선박해양플랜트연구소(KRISO)와의 기술 협력 프로젝트로, 해양 환경의 복잡한 물리 현상(파도, 조류, 풍향)을 실시간으로 재현하는 선박운항 시뮬레이터의 시작품을 개발하였습니다. 실제 항해 훈련 환경을 디지털 트윈으로 구현하는 것이 핵심 목표였습니다.</p>
      <img src="${img("ship-navigation-simulator-2.png")}" alt="선박운항 시뮬레이터 상세" />

      <h2>02. Core Engineering</h2>
      <h3>A. 6-DOF 선박 운동 시뮬레이션</h3>
      <p><strong>Challenge:</strong> 파도와 조류에 의한 선박의 6자유도(Surge, Sway, Heave, Roll, Pitch, Yaw) 운동을 물리적으로 정확하게 재현해야 함.</p>
      <p><strong>Approach:</strong> 운동방정식 솔버를 구현하여 외력 요소에 따른 선체 반응을 실시간으로 계산. 해양 환경 데이터(파고, 파주기, 풍속)를 파라미터로 주입하여 다양한 해상 조건을 시뮬레이션.</p>

      <h3>B. 다중 뷰포트 및 HUD 시스템</h3>
      <p><strong>Challenge:</strong> 조타실, 선교, 외부 시점 등 복수의 관측 시점을 동시에 렌더링하면서 일관된 프레임레이트 유지.</p>
      <p><strong>Approach:</strong> 뷰포트별 독립적 카메라 시스템과 LOD(Level of Detail) 최적화를 적용. 레이더, 속도계 등 계기판 UI를 Overlay 방식으로 실시간 렌더링.</p>

      <h3>C. 시나리오 기반 훈련 모드</h3>
      <p>악천후, 야간 항해, 좁은 수로 통과 등 실제 항해에서 발생할 수 있는 다양한 시나리오를 사전 정의하고, 훈련생의 대응 능력을 평가할 수 있는 시스템 구축.</p>

      <h2>03. Technical Identity</h2>
      <p>단순한 시각적 시뮬레이터가 아닌, <strong>물리 기반의 정밀한 운동 시뮬레이션</strong>을 구현하여 연구 기관의 엄격한 검증을 통과한 프로젝트입니다. 하들소프트의 임베디드-그래픽스 융합 역량을 증명합니다.</p>
      <p><em>기술 소유권: 선박해양플랜트연구소</em></p>
    `,
  },

  // ━━━ SMART FACTORY ━━━
  {
    client: "철도차량관리단",
    title: "Railroad Vehicle Factory Automation & RFID Inventory Management System",
    description: "바코드·RFID 기반 철도차량 부품 창고 자동화 및 실시간 재고·입출고 관리 시스템",
    image: img("railroad-factory-automation-1.jpg"),
    category: "cat-smart-factory", is_featured: 1, sort_order: 3,
    detail: `
      <h2>01. Strategic Overview</h2>
      <p>철도차량 정비 현장에서는 수천 종의 부품을 수기 대장과 엑셀로 관리해 왔으며, 재고 오차·분실·발주 지연이 반복되었습니다. 철도차량관리단은 부품 입출고 전 과정을 디지털화하고 실시간 가시성을 확보하기 위해 RFID 기반 스마트 팩토리 시스템을 도입하였습니다. 하들소프트는 바코드와 RFID 태그를 결합한 이중 인식 체계를 설계하여, 창고 현장부터 경영진 대시보드까지 끊김 없는 데이터 흐름을 구현했습니다.</p>
      <img src="${img("railroad-factory-automation-2.jpg")}" alt="RFID 재고관리 대시보드" />

      <h2>02. System Architecture & Key Functions</h2>
      <h3>A. RFID·바코드 이중 인식 입출고 자동화</h3>
      <p><strong>Problem:</strong> 기존 수기 입출고 기록 방식은 하루 평균 50건 이상의 오기재가 발생하였고, 재고 실사 시 3~5일이 소요되어 정비 일정에 차질을 빚었습니다.</p>
      <p><strong>Solution:</strong> 각 부품에 RFID 태그와 바코드를 동시 부착하고, 게이트형 리더기와 핸디형 리더기를 병행 배치하여 입고·출고·반품·폐기 시 자동 인식 처리합니다. 태그 발급 모듈을 통해 신규 부품 등록 즉시 RFID 태그를 현장에서 발급하며, 중복 방지 로직으로 데이터 무결성을 보장합니다.</p>
      <h3>B. 실시간 재고 현황 대시보드 및 자동 보고서</h3>
      <p><strong>Problem:</strong> 관리자가 재고 현황을 파악하려면 각 창고 담당자에게 개별 연락하여 집계해야 했고, 월간 보고서 작성에 이틀 이상이 소요되었습니다.</p>
      <p><strong>Solution:</strong> 웹 기반 통합 대시보드를 구축하여 품목별·창고별·기간별 재고 수량, 입출고 추이, 안전 재고 미달 품목을 실시간으로 시각화합니다. 일간·주간·월간 보고서를 스케줄러가 자동 생성하여 관리자 메일로 발송하며, Excel·PDF 다운로드를 지원합니다.</p>
      <h3>C. 안전 재고 알림 및 발주 연계</h3>
      <p><strong>Problem:</strong> 핵심 부품 재고 소진을 뒤늦게 인지하여 긴급 발주가 빈번했고, 이로 인해 조달 비용이 증가했습니다.</p>
      <p><strong>Solution:</strong> 품목별 안전 재고 기준치를 설정하고, 재고가 기준 이하로 하락하면 담당자에게 자동 알림을 전송합니다. 발주 요청서 초안을 자동 생성하여 승인 워크플로우와 연결함으로써 조달 리드타임을 단축합니다.</p>

      <h2>03. Project Impact & Scalability</h2>
      <ul>
        <li><strong>재고 정확도 향상:</strong> 수기 관리 대비 재고 오차율을 95% 이상 감소시켜, 실사 주기를 분기 1회로 축소했습니다.</li>
        <li><strong>업무 효율화:</strong> 입출고 처리 시간을 건당 평균 5분에서 30초 이내로 단축하고, 보고서 작성 공수를 완전 자동화했습니다.</li>
        <li><strong>비용 절감:</strong> 긴급 발주 건수가 70% 감소하여 연간 조달 비용을 절감하고, 부품 분실률이 대폭 낮아졌습니다.</li>
        <li><strong>확장성:</strong> 타 정비 기지 및 물류 창고로의 확장이 가능하도록 모듈형 아키텍처를 적용하였습니다.</li>
      </ul>

      <h2>04. Technical Identity</h2>
      <p>본 프로젝트는 하들소프트가 보유한 하드웨어-소프트웨어 통합 역량을 실증한 사례입니다. RFID 미들웨어 연동, 대용량 태그 이벤트 실시간 처리, 그리고 직관적인 관리자 대시보드 UX를 하나의 플랫폼으로 통합하여, 제조·물류 현장의 디지털 전환을 성공적으로 이끌었습니다.</p>
    `,
  },
  {
    client: "블루라이트 LED",
    title: "Bluelight LED Business Operations Management System",
    description: "LED 조명 사업의 영업·재고·설치·A/S를 하나로 통합한 전산 사업망 관리 시스템",
    image: img("bluelight-led-system-1.png"),
    category: "cat-smart-factory", sort_order: 10,
    detail: `
      <h2>01. Strategic Overview</h2>
      <p>블루라이트 LED는 LED 조명 제조·유통·설치·사후관리까지 전 밸류체인을 운영하는 기업으로, 각 부서가 별도의 엑셀과 수기 장부로 업무를 처리하고 있었습니다. 영업팀의 견적이 재고팀에 실시간 반영되지 않아 과잉 수주가 발생하고, 설치 일정과 A/S 이력이 분산 관리되어 고객 응대 품질이 저하되었습니다. 하들소프트는 영업 파이프라인부터 매출 리포트까지 전 업무를 단일 웹 플랫폼으로 통합하여, 데이터 기반 의사결정이 가능한 전산 사업망을 구축했습니다.</p>
      <img src="${img("bluelight-led-system-2.png")}" alt="블루라이트 LED 통합 관리 화면" />

      <h2>02. System Architecture & Key Functions</h2>
      <h3>A. 영업 파이프라인 및 견적 관리</h3>
      <p><strong>Problem:</strong> 영업 담당자마다 개인 엑셀로 거래처와 견적을 관리하여 파이프라인 전체 현황을 파악할 수 없었고, 담당자 부재 시 고객 대응이 불가능했습니다.</p>
      <p><strong>Solution:</strong> CRM 기반 영업 파이프라인 모듈을 구축하여 리드 등록부터 견적 발송, 계약 체결, 수금까지 전 단계를 시스템화했습니다. 견적서 자동 생성 및 제품 단가표 연동으로 일관된 가격 정책을 유지하며, 영업 실적 대시보드로 팀 성과를 실시간 모니터링합니다.</p>
      <h3>B. 재고 및 입출고 통합 관리</h3>
      <p><strong>Problem:</strong> LED 모듈, 드라이버, 프레임 등 수백 종의 부자재 재고가 창고·매장·시공 현장에 분산되어 있어 정확한 가용 재고 파악이 어려웠습니다.</p>
      <p><strong>Solution:</strong> 바코드 기반 입출고 처리와 창고별 재고 현황 조회 기능을 구현하고, 영업 모듈의 수주 확정 시 재고를 자동 차감하여 과잉 수주를 방지합니다. 안전 재고 미달 시 자동 알림과 발주 연계 기능을 제공합니다.</p>
      <h3>C. 설치 현장 일정 및 A/S 이력 관리</h3>
      <p><strong>Problem:</strong> 설치 기사 배정과 현장 일정이 구두·메신저로 전달되어 누락과 중복이 잦았고, A/S 접수 후 처리 현황 추적이 불가능했습니다.</p>
      <p><strong>Solution:</strong> 캘린더 기반 설치 스케줄 관리와 기사 배정 시스템을 구축하고, A/S 접수 시 고객·제품·설치 이력이 자동 연결되어 신속한 원인 파악과 대응이 가능합니다. 모든 A/S 처리 결과는 이력으로 누적되어 품질 분석에 활용됩니다.</p>

      <h2>03. Project Impact & Scalability</h2>
      <ul>
        <li><strong>업무 통합:</strong> 5개 이상의 분산 시스템을 단일 플랫폼으로 통합하여 부서 간 데이터 단절을 해소했습니다.</li>
        <li><strong>매출 가시성:</strong> 실시간 매출·수금 현황 리포트를 통해 경영진의 의사결정 속도를 대폭 향상시켰습니다.</li>
        <li><strong>고객 만족도 개선:</strong> A/S 평균 처리 시간을 단축하고, 설치 일정 누락률을 제로에 가깝게 낮추었습니다.</li>
        <li><strong>확장 가능:</strong> 신규 제품 라인 추가 및 지사 확대 시 모듈 단위로 유연하게 확장할 수 있는 구조로 설계되었습니다.</li>
      </ul>

      <h2>04. Technical Identity</h2>
      <p>본 프로젝트는 하들소프트의 비즈니스 프로세스 분석 및 통합 시스템 설계 역량을 보여주는 대표 사례입니다. 복잡하게 얽힌 영업·물류·현장·서비스 업무 흐름을 체계적으로 분석하고, 사용자 친화적인 단일 인터페이스로 통합함으로써 중소 제조기업의 디지털 경쟁력을 강화했습니다.</p>
    `,
  },

  // ━━━ IoT · 사물인터넷 ━━━
  {
    client: "전원 주식회사",
    title: "전원블랙박스 원격 모니터링 시스템",
    description: "차량 블랙박스 영상 및 전원 상태를 실시간으로 원격 모니터링하는 IoT 기반 통합 관리 플랫폼",
    image: img("power-blackbox-monitoring-1.png"),
    category: "cat-iot", is_featured: 1, sort_order: 4,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>차량에 설치된 블랙박스의 영상 데이터와 전원 상태를 실시간으로 원격 모니터링할 수 있는 IoT 기반 통합 관리 플랫폼을 개발하였습니다. 모바일 앱과 웹 대시보드를 통해 차량 관제가 가능합니다.</p>
      <img src="${img("power-blackbox-monitoring-2.png")}" alt="블랙박스 모니터링 대시보드" />
      <h2>주요 기능</h2>
      <ul>
        <li>실시간 블랙박스 영상 스트리밍 및 녹화 조회</li>
        <li>전원 상태(배터리 전압, 충전 상태) 실시간 모니터링</li>
        <li>이상 감지 시 푸시 알림 및 알림 이력 관리</li>
        <li>GPS 기반 차량 위치 추적 및 이동경로 시각화</li>
        <li>웹 대시보드 및 모바일 앱 동시 지원</li>
      </ul>
    `,
  },
  {
    client: "교통안전 솔루션 기업",
    title: "차량 알콜 감지 로깅 시스템",
    description: "차량 내부 운전석의 알콜 농도를 실시간 감지하고 기록하는 IoT 로깅 시스템",
    image: img("vehicle-alcohol-detection-1.png"),
    category: "cat-iot", sort_order: 20,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>음주운전 예방을 위해, 차량 운전석에 설치된 알콜 센서로 음주 여부를 실시간 감지하고, 데이터를 서버에 로깅하는 IoT 시스템을 개발하였습니다.</p>
      <img src="${img("vehicle-alcohol-detection-2.png")}" alt="차량 알콜 감지 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>MQ-3 알콜 센서 기반 음주 감지</li>
        <li>실시간 알콜 농도 측정 및 등급 판정</li>
        <li>GPS 위치 + 시간 + 측정값 서버 전송 및 로깅</li>
        <li>음주 감지 시 시동 잠금 연동 인터페이스</li>
        <li>관리자 대시보드를 통한 로그 조회 및 통계</li>
      </ul>
    `,
  },

  // ━━━ DEFENSE · 국방 ━━━
  {
    client: "국방부 · 공군",
    title: "항공우주력연구원 공식 홈페이지 구축",
    description: "항공우주력연구원의 연구 성과 및 조직 소개를 위한 반응형 웹사이트 설계 및 개발",
    image: img("aerospace-research-homepage-1.png"),
    category: "cat-defense", sort_order: 5,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>항공우주력연구원의 연구 성과, 조직 구성, 발간물 등을 체계적으로 소개하기 위한 공식 웹사이트를 구축하였습니다. 국방 보안 요건을 충족하면서도 직관적인 UI/UX를 제공합니다.</p>
      <img src="${img("aerospace-research-homepage-2.png")}" alt="항공우주력연구원 상세 페이지" />
      <h2>주요 기능</h2>
      <ul>
        <li>반응형 웹 디자인 (PC/Tablet/Mobile)</li>
        <li>연구 성과 및 발간물 아카이브</li>
        <li>조직도 및 인력 소개 페이지</li>
        <li>게시판 및 공지사항 관리 시스템</li>
        <li>관리자 CMS (콘텐츠 관리 시스템)</li>
        <li>정부 보안 가이드라인 준수</li>
      </ul>
    `,
  },

  // ━━━ SECURITY · 보안 ━━━
  {
    client: "보안 관제 기업",
    title: "NFC 순찰 시스템 (iOS)",
    description: "NFC 태그를 활용한 보안 순찰 경로 확인 및 실시간 순찰 기록 관리 iOS 앱",
    image: img("nfc-patrol-system-1.jpg"),
    category: "cat-security", sort_order: 11,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>건물 및 시설의 보안 순찰 경로에 설치된 NFC 태그를 iOS 기기로 인식하여, 순찰 기록을 실시간으로 서버에 전송하고 관리하는 시스템을 개발하였습니다.</p>
      <img src="${img("nfc-patrol-system-2.jpg")}" alt="NFC 순찰 시스템 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>NFC 태그 인식 기반 순찰 체크포인트 확인</li>
        <li>GPS 연동 위치 기반 순찰 경로 추적</li>
        <li>실시간 순찰 기록 서버 전송 및 저장</li>
        <li>순찰 이탈 및 미순찰 알림</li>
        <li>관리자 웹 대시보드 (순찰 현황, 통계, 리포트)</li>
      </ul>
    `,
  },
  {
    client: "보안 솔루션 기업",
    title: "PC 보안 취약점 검색 모듈",
    description: "PC 시스템의 보안 취약점을 자동 스캔하고 위험도를 분석하는 보안 검색 모듈",
    image: img("pc-security-search-module-1.png"),
    category: "cat-security", sort_order: 19,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>기업 및 기관의 PC 보안 점검을 자동화하기 위한 취약점 검색 모듈을 개발하였습니다. OS 패치, 방화벽 설정, 백신 상태, 패스워드 정책 등을 자동 스캔하여 보안 등급을 산출합니다.</p>
      <img src="${img("pc-security-search-module-2.png")}" alt="PC 보안 검색 모듈 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>Windows 레지스트리/서비스 보안 설정 스캔</li>
        <li>OS 보안 패치 현황 점검</li>
        <li>방화벽 및 백신 소프트웨어 상태 확인</li>
        <li>패스워드 강도 및 정책 점검</li>
        <li>보안 취약점 리포트 자동 생성</li>
      </ul>
    `,
  },
  {
    client: "HADEUL · 자체 R&D",
    title: "개방형 사용자 계정 개별 앱 보호 시스템",
    description: "공유 디바이스 환경에서 개별 앱을 패스워드/지문으로 보호하는 모바일 보안 솔루션",
    image: img("app-protection-open-account-1.png"),
    category: "cat-security", sort_order: 24,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>가족, 교육기관 등 하나의 사용자 계정을 공유하는 환경에서, 개별 앱을 패스워드 또는 생체인증으로 보호하는 보안 솔루션을 개발하였습니다.</p>
      <img src="${img("app-protection-open-account-2.png")}" alt="앱 보호 시스템 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>앱별 개별 잠금 설정 (PIN, 패턴, 지문)</li>
        <li>잠금 해제 시도 로그 및 침입 사진 촬영</li>
        <li>앱 사용 시간 제한 기능</li>
        <li>앱 숨기기 기능</li>
        <li>배터리 최적화로 백그라운드 상시 보호</li>
      </ul>
    `,
  },

  // ━━━ ROBOTICS · 로보틱스 ━━━
  {
    client: "KRISO · 선박해양플랜트연구소",
    title: "구체 형태의 방수 텔레프리전스 로봇",
    description: "방수 설계된 구체형 로봇에 카메라와 센서를 탑재하여 원격지에서 실시간 제어하는 텔레프리전스 시스템",
    image: img("spherical-telepresence-robot-1.png"),
    category: "cat-robotics", is_featured: 1, sort_order: 13,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>수중 및 습한 환경에서 운용 가능한 구체 형태의 방수 텔레프리전스 로봇을 설계·개발하였습니다. 내장 카메라와 다양한 센서를 통해 원격지에서 실시간 영상 및 환경 데이터를 전송받을 수 있습니다.</p>
      <img src="${img("spherical-telepresence-robot-2.png")}" alt="텔레프리전스 로봇 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>IP67 방수 등급의 구체형 로봇 하우징 설계</li>
        <li>실시간 카메라 영상 스트리밍 (360도 회전)</li>
        <li>원격 조종 인터페이스 (모바일/PC)</li>
        <li>온도·습도·가속도 센서 데이터 수집</li>
        <li>Wi-Fi/Bluetooth 기반 통신</li>
      </ul>
    `,
  },
  {
    client: "HADEUL · 자체 R&D",
    title: "원격지 로봇 컨트롤 / 음성영상 텔레프레전스",
    description: "블루투스 기반 로봇 원격 조작과 WebRTC 영상·음성 텔레프리전스를 결합한 모바일 로봇 제어 시스템",
    image: img("remote-robot-telepresence-1.jpg"),
    category: "cat-robotics", sort_order: 14,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>블루투스 기능을 이용한 로봇 원격 조작 API와 WebRTC 기반 실시간 영상·음성 텔레프리전스 시스템을 결합하여, 모바일 디바이스에서 로봇을 제어하면서 동시에 양방향 커뮤니케이션이 가능한 시스템을 구축하였습니다.</p>
      <img src="${img("remote-robot-telepresence-2.jpg")}" alt="원격 로봇 제어 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>블루투스(BLE) 기반 로봇 원격 조작 API</li>
        <li>WebRTC 실시간 영상·음성 통화</li>
        <li>안드로이드 애플리케이션 개발</li>
        <li>RTC(TURN/STUN) 시그널링 서버 구축 및 운영</li>
        <li>다중 로봇 동시 제어 지원</li>
      </ul>
    `,
  },

  // ━━━ EDUTECH ━━━
  {
    client: "코딩 교육 기업",
    title: "모듈형 로봇 코딩 교육 앱",
    description: "주행, 온도·습도 센서 등 모듈형 로봇을 블루투스로 제어하며 코딩을 학습하는 교육용 모바일 앱",
    image: img("modular-robot-1.png"),
    category: "cat-edutech", is_featured: 1, sort_order: 15,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>모듈형 로봇(주행, 온도·습도 센서 등)을 블루투스로 연결하여 제어하면서, 블록 코딩 방식으로 프로그래밍 개념을 학습할 수 있는 교육용 모바일 앱을 개발하였습니다.</p>
      <img src="${img("modular-robot-2.png")}" alt="모듈형 로봇 코딩 교육 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>블록 코딩 인터페이스 (Scratch 스타일)</li>
        <li>Bluetooth 기반 로봇 실시간 제어</li>
        <li>센서 데이터 실시간 시각화 (온도, 습도, 조도)</li>
        <li>모터 제어 (전진, 후진, 회전, 속도 조절)</li>
        <li>단계별 학습 커리큘럼 및 미션</li>
      </ul>
    `,
  },
  {
    client: "코리아사이언스",
    title: "코리아 사이언스 공식 웹사이트 제작",
    description: "과학 교육 및 체험 프로그램 소개를 위한 인터랙티브 웹사이트 구축",
    image: img("korea-science-homepage-1.png"),
    category: "cat-edutech", sort_order: 6,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>과학 교육 콘텐츠 및 체험 프로그램을 소개하고, 온라인 예약·접수 기능을 제공하는 반응형 웹사이트를 구축하였습니다.</p>
      <h2>주요 기능</h2>
      <ul>
        <li>프로그램별 상세 소개 및 갤러리</li>
        <li>온라인 프로그램 예약 및 접수 시스템</li>
        <li>공지사항 및 뉴스 게시판</li>
        <li>반응형 웹 디자인</li>
        <li>관리자 대시보드</li>
      </ul>
    `,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "우리아이동동 — 읽어주는 동화책",
    description: "부모가 직접 목소리로 동화를 녹음하여 아이에게 들려주는 인터랙티브 동화책 앱",
    image: img("dongdong-storybook-1.png"),
    category: "cat-edutech", sort_order: 36,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>부모가 직접 동화를 읽으며 녹음하고, 아이에게 부모의 목소리로 동화를 들려주는 인터랙티브 동화책 앱입니다. 페이지별 녹음이 가능하며, 그림과 함께 재생됩니다.</p>
      <img src="${img("dongdong-storybook-2.png")}" alt="우리아이동동 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>페이지별 음성 녹음 및 재생</li>
        <li>동화 일러스트와 동기화된 오디오 재생</li>
        <li>녹음 관리 및 여러 명의 목소리 저장</li>
        <li>자동 페이지 넘기기</li>
      </ul>
    `,
  },

  // ━━━ MEDIA · STREAMING ━━━
  {
    client: "날씨 서비스 플랫폼",
    title: "날씨 및 위치 기반 음악 추천 스트리밍 시스템",
    description: "현재 날씨와 사용자 위치를 분석하여 맞춤형 음악을 추천하고 스트리밍하는 플랫폼",
    image: img("weather-music-streaming-1.png"),
    category: "cat-media", sort_order: 16,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>사용자의 현재 위치와 날씨 데이터를 실시간으로 분석하여, 분위기에 맞는 음악을 자동으로 추천하고 스트리밍하는 context-aware 음악 서비스를 개발하였습니다.</p>
      <img src="${img("weather-music-streaming-2.png")}" alt="음악 추천 스트리밍 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>GPS 기반 위치 자동 감지</li>
        <li>기상청 API 연동 실시간 날씨 데이터 수집</li>
        <li>날씨·시간대·계절 기반 음악 추천 알고리즘</li>
        <li>음악 스트리밍 및 플레이리스트 관리</li>
        <li>웹 + 모바일 앱 동시 지원</li>
      </ul>
    `,
  },
  {
    client: "대한축구협회",
    title: "영상·음성 스트리밍 라이브러리 개발",
    description: "축구협회 영상 중계 및 분석을 위한 고성능 영상·음성 스트리밍 라이브러리 개발",
    image: "",
    category: "cat-media", sort_order: 17,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>대한축구협회의 경기 영상 중계 및 실시간 분석을 위해, 저지연 고품질 영상·음성 스트리밍 라이브러리를 자체 개발하였습니다.</p>
      <h2>주요 기능</h2>
      <ul>
        <li>H.264/AAC 코덱 기반 인코딩/디코딩</li>
        <li>적응형 비트레이트 스트리밍 (ABR)</li>
        <li>저지연 실시간 스트리밍 (1초 미만 레이턴시)</li>
        <li>다중 카메라 동시 수신 및 전환</li>
        <li>녹화 및 VOD 변환 기능</li>
      </ul>
    `,
  },

  // ━━━ MOBILITY ━━━
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "GPS HUD 속도계",
    description: "GPS 기반 실시간 속도 측정 및 HUD(Head-Up Display) 유리 반사 모드를 지원하는 속도계 앱",
    image: "",
    category: "cat-mobility", sort_order: 50,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>GPS 센서를 활용하여 실시간 차량 속도를 측정하고, HUD(Head-Up Display) 모드로 자동차 유리에 반사시켜 볼 수 있는 속도계 앱입니다.</p>
      <h2>주요 기능</h2>
      <ul>
        <li>GPS 기반 실시간 속도 측정 (km/h, mph)</li>
        <li>HUD 미러 모드 (유리 반사)</li>
        <li>다양한 색상 테마</li>
        <li>최고 속도, 평균 속도 기록</li>
      </ul>
    `,
  },

  // ━━━ FINTECH ━━━
  {
    client: "세무그룹 명성",
    title: "세무그룹 명성 기업 홈페이지 구축",
    description: "세무/회계 법인의 서비스 소개 및 상담 예약 기능을 갖춘 기업 웹사이트",
    image: img("tax-group-myungsung-1.png"),
    category: "cat-fintech", sort_order: 8,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>세무·회계 법인의 전문 서비스를 소개하고, 온라인 상담 예약 및 세무 관련 자료를 제공하는 기업 웹사이트를 구축하였습니다.</p>
      <img src="${img("tax-group-myungsung-2.png")}" alt="세무그룹 명성 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>서비스 영역별 상세 소개 (세무, 회계, 컨설팅)</li>
        <li>온라인 상담 예약 폼</li>
        <li>세무 뉴스 및 자료실</li>
        <li>전문가 프로필 및 실적 소개</li>
        <li>반응형 웹 디자인</li>
      </ul>
    `,
  },
  {
    client: "피부관리 전문업체 금단비가",
    title: "금단비가 상담 업무 및 내부 ERP 시스템",
    description: "매장 관리, 정산, 상품, 직원 인센티브 등 피부관리 전문업체의 전사적 자원 관리 시스템",
    image: img("geumdan-erp-1.png"),
    category: "cat-fintech", sort_order: 21,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>피부관리 전문업체의 매장 운영 전반을 디지털화하는 내부 ERP 시스템을 구축하였습니다. 상담 예약, 매장 관리, 정산, 상품 관리, 직원 인센티브 등을 통합 관리합니다.</p>
      <img src="${img("geumdan-erp-2.png")}" alt="금단비가 ERP 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>고객 상담 예약 및 이력 관리 (CRM)</li>
        <li>매장별 매출 및 정산 시스템</li>
        <li>상품(시술) 관리 및 재고 현황</li>
        <li>직원 인센티브 및 성과 정산</li>
        <li>일별/월별/분기별 경영 리포트</li>
      </ul>
    `,
  },

  // ━━━ WEB · PLATFORM ━━━
  {
    client: "대전 베이비페어",
    title: "온라인 대규모 접수 시스템 (코어 접수 엔진)",
    description: "수만 건의 동시 접수를 처리하는 고성능 온라인 대규모 접수 시스템 설계 및 구축",
    image: img("online-registration-system-1.png"),
    category: "cat-web", sort_order: 9,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>대전 베이비페어 등 대형 행사의 온라인 사전 접수를 위한 코어 접수 시스템을 개발하였습니다. 오픈 시점에 수만 건의 동시 접수 트래픽을 안정적으로 처리하는 것이 핵심 과제였습니다.</p>
      <h2>주요 기능</h2>
      <ul>
        <li>대규모 동시접속 처리 (큐 기반 접수 엔진)</li>
        <li>실시간 접수 현황 대시보드</li>
        <li>접수자 정보 관리 및 엑셀 다운로드</li>
        <li>모바일 최적화 접수 폼</li>
        <li>SMS/이메일 자동 확인 발송</li>
      </ul>
      <h2>도입 효과</h2>
      <p>오픈 동시에 몰리는 대규모 트래픽을 안정적으로 처리하여, 접수 장애 없이 행사 운영을 완료하였습니다.</p>
    `,
  },
  {
    client: "유니자인",
    title: "유니자인 기업 홈페이지",
    description: "디자인 전문 기업의 포트폴리오 및 서비스 소개 웹사이트 구축",
    image: img("unizine-homepage-1.png"),
    category: "cat-web", sort_order: 22,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>디자인 전문 기업 유니자인의 서비스 소개 및 포트폴리오 전시를 위한 기업 홈페이지를 제작하였습니다.</p>
      <img src="${img("unizine-homepage-2.png")}" alt="유니자인 홈페이지 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>포트폴리오 갤러리 및 카테고리 필터</li>
        <li>서비스 영역 소개 페이지</li>
        <li>프로젝트 의뢰 문의 폼</li>
        <li>반응형 웹 디자인</li>
      </ul>
    `,
  },
  {
    client: "한국바리스타협회",
    title: "바리스타 자격증 접수 사이트",
    description: "바리스타 자격증 시험 일정 관리 및 온라인 원서 접수 시스템",
    image: img("barista-certification-site-1.png"),
    category: "cat-web", sort_order: 12,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>바리스타 자격증 시험의 일정 공고, 원서 접수, 수험표 발급, 합격자 조회 등 시험 운영 전반을 지원하는 온라인 접수 시스템을 개발하였습니다.</p>
      <img src="${img("barista-certification-site-2.png")}" alt="바리스타 자격증 접수 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>시험 일정 공고 및 지역별 고사장 관리</li>
        <li>온라인 원서 접수 및 사진 업로드</li>
        <li>수험표 발급 및 인쇄</li>
        <li>합격자 조회 및 자격증 발급 관리</li>
        <li>결제 연동 (수험료 온라인 결제)</li>
      </ul>
    `,
  },
  {
    client: "수주산업",
    title: "수주산업 기업 홈페이지 제작",
    description: "제조업 기반 수주산업 기업의 제품 및 서비스 소개 웹사이트",
    image: img("sooju-industry-homepage-1.png"),
    category: "cat-web", sort_order: 25,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>수주산업 기업의 제품 라인업, 기술력, 납품 실적을 소개하는 기업 웹사이트를 구축하였습니다.</p>
      <h2>주요 기능</h2>
      <ul>
        <li>제품 라인업 소개 및 갤러리</li>
        <li>납품 실적 및 인증 현황</li>
        <li>온라인 견적 문의 폼</li>
        <li>반응형 디자인</li>
      </ul>
    `,
  },
  {
    client: "HADEUL · 자체 개발",
    title: "DIRECTREADER — PC 원격 파일 뷰어",
    description: "PC의 자료를 모바일·태블릿에서 원격으로 열람할 수 있는 크로스 플랫폼 원격 뷰어",
    image: img("directreader-1.png"),
    category: "cat-web", sort_order: 26,
    detail: `
      <h2>프로젝트 개요</h2>
      <p>PC에 저장된 문서, 이미지, 미디어 파일을 모바일 기기 및 태블릿에서 별도 설치 없이 원격으로 열람할 수 있는 크로스 플랫폼 뷰어 프로그램을 개발하였습니다.</p>
      <img src="${img("directreader-2.png")}" alt="DirectReader 상세" />
      <h2>주요 기능</h2>
      <ul>
        <li>PC 서버 → 모바일/태블릿 클라이언트 구조</li>
        <li>파일 탐색 및 폴더 네비게이션</li>
        <li>문서/이미지/동영상 원격 뷰잉</li>
        <li>Wi-Fi/LAN 기반 보안 연결</li>
        <li>멀티 디바이스 동시 접속</li>
      </ul>
    `,
  },

  // ━━━ HEALTHCARE ━━━
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "소음측정기 — SPL Noise Meter",
    description: "마이크 센서를 활용한 실시간 소음(SPL) 측정 앱. 최소·최대·평균값 및 그래픽 시각화 제공",
    image: "", category: "cat-healthcare", sort_order: 51,
    detail: `<h2>프로젝트 개요</h2><p>스마트폰 마이크를 이용하여 주변 소음의 음압 레벨(SPL)을 실시간 측정하는 앱입니다. 이웃 소음, 생활 소음, 차량 내부 등 일상 환경의 소음 수준을 객관적으로 측정합니다.</p><h2>주요 기능</h2><ul><li>실시간 소음 레벨(dB) 측정</li><li>최소(min), 최대(max), 평균(avg) 표시</li><li>실시간 그래프 시각화</li><li>소음 수준별 위험도 안내</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "RAIN SOUNDS — 빗소리 수면 보조 앱",
    description: "자연의 빗소리로 수면, 명상, 집중력 향상을 돕는 사운드스케이프 앱",
    image: "", category: "cat-healthcare", sort_order: 52,
    detail: `<h2>프로젝트 개요</h2><p>수면과 체력 회복에 도움이 되는 자연의 빗소리를 제공하는 사운드스케이프 앱입니다. 뇌파 안정화를 통해 수면 유도, 명상, 집중력 향상에 효과적입니다.</p><h2>주요 기능</h2><ul><li>다양한 빗소리 사운드 (부드러운 비, 폭우, 천둥 등)</li><li>Seamless Loop 재생</li><li>수면 타이머 설정</li><li>백그라운드 재생 지원</li></ul>`,
  },

  // ━━━ GAME ━━━
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "타슈 레이싱 — O2O 쿠폰 연동 레이싱 게임",
    description: "대전 공공자전거 타슈를 테마로 한 레이싱 게임. 게임 내 아이템 획득 시 실제 쿠폰으로 전환 가능",
    image: img("technopark-award-1.png"),
    category: "cat-game", is_featured: 1, sort_order: 33,
    detail: `<h2>프로젝트 개요</h2><p>대전 공공자전거 '타슈'를 테마로 한 모바일 레이싱 게임으로, 게임 내 아이템을 획득하면 실제 사용 가능한 제휴 쿠폰으로 전환되는 O2O(Online to Offline) 서비스를 구현하였습니다.</p><h2>주요 기능</h2><ul><li>3D 레이싱 게임플레이</li><li>게임 내 아이템 → 실제 쿠폰 전환 시스템</li><li>제휴 매장 위치 기반 쿠폰 사용</li><li>리더보드 및 랭킹 시스템</li></ul><h2>수상</h2><p>대전테크노파크 개발부문 <strong>장려상</strong> 수상</p>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "영어 단어 낱말 퍼즐 맞추기 그림 버전",
    description: "Word Search 업그레이드 버전 — 단어를 찾을 때 그림 힌트를 제공하는 교육형 퍼즐 게임",
    image: img("english-word-puzzle-1.png"),
    category: "cat-game", sort_order: 30,
    detail: `<h2>프로젝트 개요</h2><p>단어 찾기 게임(Word Search)의 업그레이드 버전으로, 하단의 단어를 터치하면 해당 단어의 그림을 볼 수 있어 학습 효과와 재미를 동시에 제공합니다.</p><img src="${img("english-word-puzzle-2.png")}" alt="영어 단어 퍼즐 상세" /><h2>주요 기능</h2><ul><li>그림 힌트 기반 단어 검색 퍼즐</li><li>다양한 난이도 및 카테고리별 단어 세트</li><li>학습 진행률 추적</li><li>Google Play Games 리더보드 연동</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "블럭배틀 3D : 멀티플레이",
    description: "지우개 싸움을 3D 물리 엔진으로 구현한 실시간 멀티플레이 대전 게임",
    image: img("block-battle-3d-1.png"),
    category: "cat-game", sort_order: 31,
    detail: `<h2>프로젝트 개요</h2><p>한국의 전통 놀이인 '지우개 싸움'을 3D 물리 엔진으로 구현한 멀티플레이 대전 게임입니다. 블럭을 드래그하여 발사하고, 상대 블럭을 밀어내는 전략적 플레이가 가능합니다.</p><img src="${img("block-battle-3d-2.png")}" alt="블럭배틀 3D 상세" /><h2>주요 기능</h2><ul><li>3D 물리 엔진 기반 블럭 움직임</li><li>실시간 1:1 멀티플레이</li><li>에너지 시스템 및 파워업 아이템</li><li>다양한 블럭 스킨 및 필드</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "OTHER FINGERS — 멀티터치 파티 게임",
    description: "여러 명이 동시에 손가락을 올려놓고 공을 피하는 멀티터치 파티 게임",
    image: img("other-fingers-1.png"),
    category: "cat-game", sort_order: 32,
    detail: `<h2>프로젝트 개요</h2><p>여러 명이 한 기기에 손가락을 올려놓고, 움직이는 공을 피하는 멀티터치 파티 게임입니다. 최대 10명까지 동시 플레이가 가능합니다.</p><img src="${img("other-fingers-2.png")}" alt="Other Fingers 상세" /><h2>주요 기능</h2><ul><li>최대 10명 멀티터치 동시 플레이</li><li>세계 기록 도전 모드</li><li>다양한 난이도 및 공 패턴</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "MAKE JUMPER — 멀티 캐릭터 점프 액션",
    description: "최대 5명의 캐릭터를 동시에 조작하는 극강 난이도 점프 액션 게임",
    image: "", category: "cat-game", sort_order: 34,
    detail: `<h2>프로젝트 개요</h2><p>화면을 터치하는 간단한 조작이지만, 최대 5명의 캐릭터를 동시에 제어해야 하는 극강 난이도 점프 액션 게임입니다. "No One Dies" 장르의 대표 게임으로, 10초 이상 버티는 것이 목표입니다.</p><h2>주요 기능</h2><ul><li>최대 5명 캐릭터 동시 조작</li><li>원터치 조작 시스템</li><li>랜덤 장애물 생성</li><li>친구와 내기 모드</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "TINT — 빛의 3원색 블록 색칠 퍼즐",
    description: "빛의 3원색을 조합하여 블록을 물들이는 독창적 색 조합 퍼즐 게임 (앱스토리 4월호 소개)",
    image: "", category: "cat-game", sort_order: 35,
    detail: `<h2>프로젝트 개요</h2><p>2016년 앱스토리(Appstory) 4월호 '독창적 인디게임' 카테고리에 소개된 게임입니다. 빛의 3원색(빨강, 초록, 파랑)을 이용하여 블록을 물들이고, 같은 색 블록 3개 이상을 맞추면 제거되는 퍼즐 게임입니다.</p><h2>주요 기능</h2><ul><li>빛의 3원색(RGB) 조합 시스템</li><li>스테이지별 목표 달성 모드</li><li>점진적 난이도 상승</li></ul><h2>미디어</h2><p>앱스토리(Appstory) 2016년 4월호 <strong>테마앱 — 독창적 인디게임</strong> 선정</p>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "한글퍼즐 ㄱ에서 ㅎ까지",
    description: "한글 자음을 조합하여 ㅎ까지 완성하는 한국형 Letters Mania 퍼즐 게임",
    image: "", category: "cat-game", sort_order: 37,
    detail: `<h2>프로젝트 개요</h2><p>알파벳 퍼즐 게임의 한글 버전으로, 한글 자음(ㄱ~ㅎ)을 조합하여 다음 자음을 만들어가는 퍼즐 게임입니다. "왜 한글로 된 퍼즐 게임은 없을까?"라는 질문에서 출발하여, 한국어 사용자를 위한 퍼즐 게임을 제작하였습니다.</p><h2>주요 기능</h2><ul><li>한글 자음(ㄱ~ㅎ) 조합 시스템</li><li>최종 목표: ㅎ(히읗)까지 도달</li><li>직관적인 터치 인터페이스</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "GET Z — 알파벳 조합 퍼즐",
    description: "같은 알파벳을 조합하여 Z까지 만들어가는 극강 난이도 Letters Mania 퍼즐 게임",
    image: "", category: "cat-game", sort_order: 38,
    detail: `<h2>프로젝트 개요</h2><p>같은 알파벳 3개 이상을 연결하면 다음 순서의 알파벳이 생성되는 퍼즐 게임입니다. 최종 목표는 알파벳 Z를 만드는 것으로, 높은 논리력과 전략적 사고가 요구됩니다.</p><h2>주요 기능</h2><ul><li>알파벳 3개 이상 연결 → 다음 알파벳 생성</li><li>최종 목표: Z 알파벳 생성</li><li>극강 난이도 도전 모드</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "COLORIS MATRIX — 블록 색상 퍼즐",
    description: "제한된 공간에 직사각형 블록을 배치하여 최고 점수를 얻는 전략 퍼즐 게임",
    image: "", category: "cat-game", sort_order: 39,
    detail: `<h2>프로젝트 개요</h2><p>제한된 공간 안에 블록을 놓아서 최고 점수를 얻는 전략 퍼즐 게임입니다. 하단 3개의 블록을 터치하여 회전시키거나, 길게 터치하여 상단 보드로 이동시킵니다.</p><h2>주요 기능</h2><ul><li>터치 회전 / 롱프레스 이동 조작</li><li>전략적 블록 배치 시스템</li><li>점수 도전 및 랭킹</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "2048 X PLUS — 극강 난이도 2048",
    description: "기본 2048에 다양한 난이도 모드를 추가한 업그레이드 퍼즐 게임",
    image: "", category: "cat-game", sort_order: 40,
    detail: `<h2>프로젝트 개요</h2><p>기본 2048 게임의 업그레이드 버전으로, 다양한 난이도 모드(Easy, Normal, Hard, Expert)와 커스텀 테마를 지원합니다.</p><h2>주요 기능</h2><ul><li>4단계 난이도 모드</li><li>다크/라이트 테마 전환</li><li>극강 난이도 도전 모드</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "최강 스도쿠",
    description: "초보자부터 전문가까지 4단계 난이도를 지원하는 심플하고 직관적인 스도쿠 게임",
    image: "", category: "cat-game", sort_order: 41,
    detail: `<h2>프로젝트 개요</h2><p>초보자부터 전문가까지 4단계 난이도를 지원하는 스도쿠 게임입니다. 심플한 인터페이스와 직관적인 조작법으로 누구나 쉽게 즐길 수 있습니다.</p><h2>주요 기능</h2><ul><li>4단계 난이도 (Easy, Normal, Hard, Expert)</li><li>사운드 설정 기능</li><li>간편한 숫자 변경 인터페이스</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "STAY ON THE PIANO LINE — 미로 탈출",
    description: "흰색 선을 따라 미로를 탈출하는 집중력 게임",
    image: "", category: "cat-game", sort_order: 42,
    detail: `<h2>프로젝트 개요</h2><p>미로 속에 갇힌 플레이어가 흰 선을 따라 탈출하는 집중력 게임입니다. 얼마나 오래 버틸 수 있는지 도전해보세요.</p><h2>주요 기능</h2><ul><li>무한 생성 미로 패턴</li><li>점진적 속도 증가</li><li>최고 기록 도전</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "2048 NUMBER PUZZLE",
    description: "기본 모드와 극강 난이도 모드를 제공하는 2048 숫자 퍼즐 게임",
    image: "", category: "cat-game", sort_order: 43,
    detail: `<h2>프로젝트 개요</h2><p>기본 모드와 극강 난이도로 나누어 플레이할 수 있는 2048 퍼즐 게임입니다. 다크 테마를 지원하여 어두운 환경에서도 눈의 피로 없이 즐길 수 있습니다.</p><h2>주요 기능</h2><ul><li>기본 / 극강 난이도 선택</li><li>다크/라이트 테마</li><li>기록 저장 및 통계</li></ul>`,
  },

  // ━━━ ETC ━━━
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "전파·전자파 금속 탐지기",
    description: "스마트폰 내장 자기장 센서를 이용한 전파, 전자파, 금속 탐지 유틸리티 앱",
    image: "", category: "cat-etc", sort_order: 53,
    detail: `<h2>프로젝트 개요</h2><p>스마트폰 내장 자기장 센서(Magnetometer)를 활용하여 주변의 자기장(전파, 전자파)을 측정하는 앱입니다. 일반 상태 약 49μT 기준으로 금속·자성체 존재 시 수치가 증가하는 원리를 이용합니다.</p><h2>주요 기능</h2><ul><li>자기장 실시간 측정 (μT/mG 단위)</li><li>게이지 및 그래프 시각화</li><li>경고 알림 설정</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "FLASH LIGHT FREE — 플래시라이트 LED",
    description: "개인정보 수집 없이 가장 밝은 LED 플래시를 제공하는 손전등 앱",
    image: "", category: "cat-etc", sort_order: 54,
    detail: `<h2>프로젝트 개요</h2><p>개인정보를 일체 수집하지 않으면서 카메라 플래시를 최대 밝기로 활용하는 손전등 앱입니다. 스트로브(섬광) 기능과 응원 도구 모드도 제공합니다.</p><h2>주요 기능</h2><ul><li>최대 밝기 LED 플래시</li><li>스트로브(섬광) 모드</li><li>응원 도구 모드</li><li>개인정보 수집 없음</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "SMART RULER — 스마트폰 자/줄자",
    description: "스마트폰 화면으로 물건의 길이를 CM/INCH 단위로 측정하는 디지털 자 앱",
    image: "", category: "cat-etc", sort_order: 55,
    detail: `<h2>프로젝트 개요</h2><p>스마트폰 화면에 눈금을 표시하고, 터치하여 물건 양 끝에 게이지를 맞추면 길이를 측정하는 디지털 자 앱입니다.</p><h2>주요 기능</h2><ul><li>CM / INCH 단위 전환</li><li>터치 기반 게이지 조작</li><li>직관적인 눈금 인터페이스</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "LED 디지털 탁상 시계",
    description: "공부, 운동, 프레젠테이션 등 다양한 환경에서 사용 가능한 LED 스타일 디지털 시계",
    image: "", category: "cat-etc", sort_order: 56,
    detail: `<h2>프로젝트 개요</h2><p>LED 스타일의 디지털 시계로, 크기 조절이 가능하며 공부, 수강신청, 운동, 프레젠테이션(PPT) 등 다양한 환경에서 활용할 수 있습니다.</p><h2>주요 기능</h2><ul><li>크기 자유 조절</li><li>LED 스타일 디자인</li><li>거치대/탁상 모드</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "EASY 전광판 SCROLLER",
    description: "콘서트, 파티, 프로포즈 등에서 활용 가능한 LED 전광판 스크롤러 앱",
    image: "", category: "cat-etc", sort_order: 57,
    detail: `<h2>프로젝트 개요</h2><p>콘서트, 클럽, 공연, 파티, 프로포즈 등에서 유용하게 사용할 수 있는 LED 전광판 앱입니다. 글씨 크기, 속도, 깜빡임 효과를 조절할 수 있습니다.</p><h2>주요 기능</h2><ul><li>텍스트 스크롤 전광판</li><li>7가지 배경색 / 텍스트색 변경</li><li>글씨 크기 및 속도 조절</li><li>깜빡임 효과</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "안드로이드 수평계",
    description: "스마트폰 방향 센서를 이용한 수평/수직 측정 유틸리티 앱",
    image: "", category: "cat-etc", sort_order: 58,
    detail: `<h2>프로젝트 개요</h2><p>스마트폰 내장 방향 센서를 이용하여 수평, 수직, 높낮이를 측정하는 유틸리티 앱입니다.</p><h2>주요 기능</h2><ul><li>수평/수직 실시간 측정</li><li>홀드(일시정지) 기능</li><li>캘리브레이션 기능</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "손전등 + 돋보기",
    description: "LED 플래시와 카메라 줌을 결합한 손전등 겸 디지털 돋보기 앱",
    image: "", category: "cat-etc", sort_order: 59,
    detail: `<h2>프로젝트 개요</h2><p>LED 플래시와 카메라 확대 기능을 결합한 멀티 유틸리티 앱입니다. 어두운 곳에서 작은 글씨를 확대하여 볼 수 있으며, 사진 촬영 기능도 포함되어 있습니다.</p><h2>주요 기능</h2><ul><li>LED 밝기 조절</li><li>1.0x ~ 5.0x 화면 확대</li><li>캡쳐 이미지 앨범 저장</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "안드로이드 돋보기",
    description: "카메라 줌과 플래시를 활용한 디지털 돋보기/현미경 앱",
    image: "", category: "cat-etc", sort_order: 60,
    detail: `<h2>프로젝트 개요</h2><p>노안 등으로 가까운 글씨를 보기 어려운 분들을 위해 만든 디지털 돋보기 앱입니다. 플래시 기능으로 저녁에도 선명하게 확대 가능합니다.</p><h2>주요 기능</h2><ul><li>카메라 줌 확대</li><li>LED 플래시 연동</li><li>오토 포커싱</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "거울 어플",
    description: "스마트폰 전면 카메라를 활용한 간편 거울 앱",
    image: "", category: "cat-etc", sort_order: 61,
    detail: `<h2>프로젝트 개요</h2><p>스마트폰의 전면 카메라를 활용하여 간편하게 거울처럼 사용할 수 있는 유틸리티 앱입니다.</p><h2>주요 기능</h2><ul><li>전면 카메라 거울 모드</li><li>밝기 조절</li><li>일시정지 캡쳐</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "메트로놈",
    description: "1~400 BPM 설정이 가능한 심플한 디지털 메트로놈 앱",
    image: "", category: "cat-etc", sort_order: 62,
    detail: `<h2>프로젝트 개요</h2><p>음악 연주자를 위한 디지털 메트로놈 앱입니다. 기타, 드럼, 전자악기 등 다양한 악기 연습에 활용할 수 있습니다.</p><h2>주요 기능</h2><ul><li>BPM: 1~400 설정</li><li>Beat: 1~400 설정</li><li>심플한 인터페이스</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "안드로이드 LED 전광판",
    description: "택시, 콘서트, 파티 등 다양한 상황에서 활용 가능한 풀스크린 LED 전광판 앱",
    image: "", category: "cat-etc", sort_order: 63,
    detail: `<h2>프로젝트 개요</h2><p>택시 잡기, 콘서트 응원, 파티, 이벤트 등 다양한 상황에서 활용 가능한 LED 전광판 앱입니다. 다국어를 지원하며 전체 화면 LED 디스플레이 모드를 제공합니다.</p><h2>주요 기능</h2><ul><li>글씨 크기/색상 조정</li><li>스크롤 속도 설정</li><li>전체 LED 디스플레이 화면</li><li>다국어 지원</li></ul>`,
  },
  {
    client: "HADEUL · 자체 퍼블리싱",
    title: "손전등 + 시계",
    description: "LED 플래시와 시계 기능을 결합한 야간 유틸리티 앱",
    image: "", category: "cat-etc", sort_order: 64,
    detail: `<h2>프로젝트 개요</h2><p>LED 플래시와 시계 기능을 결합한 야간 유틸리티 앱입니다. 어두운 곳에서 시간 확인과 조명을 동시에 해결합니다.</p><h2>주요 기능</h2><ul><li>밝은 LED 플래시</li><li>디지털 시계 동시 표시</li><li>원터치 ON/OFF</li></ul>`,
  },
];

// ── Insert ──────────────────────────────────────────────────
const insertPortfolio = db.prepare(`
  INSERT INTO portfolio (id, category_id, client, title, description, detail, image, year, month, is_featured, sort_order)
  VALUES (?, ?, ?, ?, ?, ?, ?, 0, 0, ?, ?)
`);

const tx = db.transaction(() => {
  db.exec("DELETE FROM portfolio");
  for (const item of portfolioData) {
    insertPortfolio.run(
      uuid(), item.category, item.client, item.title, item.description,
      (item.detail || "").trim(), item.image || "", item.is_featured || 0, item.sort_order
    );
  }
});
tx();

console.log(`✅ Inserted ${portfolioData.length} portfolio items`);
console.log(`✅ Inserted ${CATS.length} categories`);

const byCategory = db.prepare(`
  SELECT c.name, COUNT(p.id) as cnt
  FROM categories c LEFT JOIN portfolio p ON c.id = p.category_id
  GROUP BY c.id ORDER BY c.sort_order
`).all();
console.log("\n📊 Category breakdown:");
byCategory.forEach((r) => {
  if (r.cnt > 0) console.log(`   ${r.name}: ${r.cnt}`);
});

db.close();
