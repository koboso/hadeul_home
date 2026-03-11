/**
 * Portfolio Description Update Script
 * Updates title, description, and detail fields for existing portfolio entries.
 */
const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

function img(name) {
  return "/uploads/portfolio/" + name;
}

// ── Update entries ──────────────────────────────────────────
const updates = [
  // === SMART FACTORY ===
  {
    matchTitle: "%철도차량 공장 자동화%",
    title: "Railroad Vehicle Factory Automation & RFID Inventory Management System",
    description: "바코드·RFID 기반 철도차량 부품 창고 자동화 및 실시간 재고·입출고 관리 시스템",
    detail:
      '<h2>01. Strategic Overview</h2>' +
      '<p>철도차량 정비 현장에서는 수천 종의 부품을 수기 대장과 엑셀로 관리해 왔으며, 재고 오차·분실·발주 지연이 반복되었습니다. 철도차량관리단은 부품 입출고 전 과정을 디지털화하고 실시간 가시성을 확보하기 위해 RFID 기반 스마트 팩토리 시스템을 도입하였습니다. 하들소프트는 바코드와 RFID 태그를 결합한 이중 인식 체계를 설계하여, 창고 현장부터 경영진 대시보드까지 끊김 없는 데이터 흐름을 구현했습니다.</p>' +
      '<img src="' + img("railroad-factory-automation-2.jpg") + '" alt="RFID 재고관리 대시보드" />' +
      '<h2>02. System Architecture & Key Functions</h2>' +
      '<h3>A. RFID·바코드 이중 인식 입출고 자동화</h3>' +
      '<p><strong>Problem:</strong> 기존 수기 입출고 기록 방식은 하루 평균 50건 이상의 오기재가 발생하였고, 재고 실사 시 3~5일이 소요되어 정비 일정에 차질을 빚었습니다.</p>' +
      '<p><strong>Solution:</strong> 각 부품에 RFID 태그와 바코드를 동시 부착하고, 게이트형 리더기와 핸디형 리더기를 병행 배치하여 입고·출고·반품·폐기 시 자동 인식 처리합니다.</p>' +
      '<h3>B. 실시간 재고 현황 대시보드 및 자동 보고서</h3>' +
      '<p><strong>Problem:</strong> 관리자가 재고 현황을 파악하려면 각 창고 담당자에게 개별 연락하여 집계해야 했고, 월간 보고서 작성에 이틀 이상이 소요되었습니다.</p>' +
      '<p><strong>Solution:</strong> 웹 기반 통합 대시보드를 구축하여 품목별·창고별·기간별 재고 수량, 입출고 추이, 안전 재고 미달 품목을 실시간으로 시각화합니다.</p>' +
      '<h3>C. 안전 재고 알림 및 발주 연계</h3>' +
      '<p><strong>Problem:</strong> 핵심 부품 재고 소진을 뒤늦게 인지하여 긴급 발주가 빈번했고, 이로 인해 조달 비용이 증가했습니다.</p>' +
      '<p><strong>Solution:</strong> 품목별 안전 재고 기준치를 설정하고, 재고가 기준 이하로 하락하면 담당자에게 자동 알림을 전송합니다.</p>' +
      '<h2>03. Project Impact & Scalability</h2>' +
      '<ul><li><strong>재고 정확도 향상:</strong> 수기 관리 대비 재고 오차율을 95% 이상 감소시켜, 실사 주기를 분기 1회로 축소했습니다.</li><li><strong>업무 효율화:</strong> 입출고 처리 시간을 건당 평균 5분에서 30초 이내로 단축하고, 보고서 작성 공수를 완전 자동화했습니다.</li><li><strong>비용 절감:</strong> 긴급 발주 건수가 70% 감소하여 연간 조달 비용을 절감하고, 부품 분실률이 대폭 낮아졌습니다.</li></ul>' +
      '<h2>04. Technical Identity</h2>' +
      '<p>본 프로젝트는 하들소프트가 보유한 하드웨어-소프트웨어 통합 역량을 실증한 사례입니다. RFID 미들웨어 연동, 대용량 태그 이벤트 실시간 처리, 그리고 직관적인 관리자 대시보드 UX를 하나의 플랫폼으로 통합하여, 제조·물류 현장의 디지털 전환을 성공적으로 이끌었습니다.</p>',
  },
  {
    matchTitle: "%블루라이트 LED%",
    title: "Bluelight LED Business Operations Management System",
    description: "LED 조명 사업의 영업·재고·설치·A/S를 하나로 통합한 전산 사업망 관리 시스템",
    detail:
      '<h2>01. Strategic Overview</h2>' +
      '<p>블루라이트 LED는 LED 조명 제조·유통·설치·사후관리까지 전 밸류체인을 운영하는 기업으로, 각 부서가 별도의 엑셀과 수기 장부로 업무를 처리하고 있었습니다. 하들소프트는 영업 파이프라인부터 매출 리포트까지 전 업무를 단일 웹 플랫폼으로 통합하여, 데이터 기반 의사결정이 가능한 전산 사업망을 구축했습니다.</p>' +
      '<img src="' + img("bluelight-led-system-2.png") + '" alt="블루라이트 LED 통합 관리 화면" />' +
      '<h2>02. System Architecture & Key Functions</h2>' +
      '<h3>A. 영업 파이프라인 및 견적 관리</h3>' +
      '<p><strong>Problem:</strong> 영업 담당자마다 개인 엑셀로 거래처와 견적을 관리하여 파이프라인 전체 현황을 파악할 수 없었습니다.</p>' +
      '<p><strong>Solution:</strong> CRM 기반 영업 파이프라인 모듈을 구축하여 리드 등록부터 견적 발송, 계약 체결, 수금까지 전 단계를 시스템화했습니다.</p>' +
      '<h3>B. 재고 및 입출고 통합 관리</h3>' +
      '<p><strong>Problem:</strong> LED 모듈, 드라이버, 프레임 등 수백 종의 부자재 재고가 분산되어 있어 정확한 가용 재고 파악이 어려웠습니다.</p>' +
      '<p><strong>Solution:</strong> 바코드 기반 입출고 처리와 창고별 재고 현황 조회 기능을 구현하고, 영업 모듈의 수주 확정 시 재고를 자동 차감하여 과잉 수주를 방지합니다.</p>' +
      '<h3>C. 설치 현장 일정 및 A/S 이력 관리</h3>' +
      '<p><strong>Problem:</strong> 설치 기사 배정과 현장 일정이 구두·메신저로 전달되어 누락과 중복이 잦았습니다.</p>' +
      '<p><strong>Solution:</strong> 캘린더 기반 설치 스케줄 관리와 기사 배정 시스템을 구축하고, A/S 접수 시 고객·제품·설치 이력이 자동 연결됩니다.</p>' +
      '<h2>03. Project Impact & Scalability</h2>' +
      '<ul><li><strong>업무 통합:</strong> 5개 이상의 분산 시스템을 단일 플랫폼으로 통합하여 부서 간 데이터 단절을 해소했습니다.</li><li><strong>매출 가시성:</strong> 실시간 매출·수금 현황 리포트를 통해 경영진의 의사결정 속도를 대폭 향상시켰습니다.</li><li><strong>고객 만족도 개선:</strong> A/S 평균 처리 시간을 단축하고, 설치 일정 누락률을 제로에 가깝게 낮추었습니다.</li></ul>' +
      '<h2>04. Technical Identity</h2>' +
      '<p>본 프로젝트는 하들소프트의 비즈니스 프로세스 분석 및 통합 시스템 설계 역량을 보여주는 대표 사례입니다.</p>',
  },

  // === IoT ===
  {
    matchTitle: "%전원블랙박스%",
    title: "Vehicle Blackbox Remote Monitoring IoT Platform",
    description: "차량 블랙박스 영상·전원 상태를 실시간으로 원격 모니터링하는 IoT 플랫폼",
    detail:
      '<h2>01. Strategic Overview</h2>' +
      '<p>차량 관제 시장에서 블랙박스는 사고 영상 녹화 기능에 머물러 있었으며, 차량 전원 상태 이상이나 블랙박스 오작동은 운전자가 직접 확인하기 전까지 인지할 수 없었습니다. 하들소프트는 임베디드 펌웨어부터 클라우드 서버, 웹 대시보드, 모바일 앱까지 풀스택 IoT 솔루션을 설계·구현했습니다.</p>' +
      '<img src="' + img("power-blackbox-monitoring-2.png") + '" alt="블랙박스 원격 모니터링 대시보드" />' +
      '<h2>02. System Architecture & Key Functions</h2>' +
      '<h3>A. 실시간 영상 스트리밍 및 전원 상태 모니터링</h3>' +
      '<p><strong>Problem:</strong> 관리자가 수백 대 차량의 블랙박스 작동 여부를 확인하려면 차량별로 직접 점검해야 했습니다.</p>' +
      '<p><strong>Solution:</strong> 블랙박스에 IoT 통신 모듈을 연동하여 전원 전압, 저장장치 상태, 카메라 동작 여부를 주기적으로 서버에 전송합니다.</p>' +
      '<h3>B. GPS 위치 추적 및 이상 감지 알림</h3>' +
      '<p><strong>Problem:</strong> 차량 위치 파악이 실시간으로 이루어지지 않아 도난·무단 사용 감지가 지연되었습니다.</p>' +
      '<p><strong>Solution:</strong> GPS 모듈을 통해 차량 위치를 실시간 추적하고 이동 경로를 지도 위에 시각화합니다. 지오펜스 이탈 등 이상 상황 시 푸시 알림과 SMS를 즉시 발송합니다.</p>' +
      '<h3>C. 모바일 앱 및 웹 통합 관제</h3>' +
      '<p><strong>Problem:</strong> 기존 관제 시스템은 데스크톱 전용으로, 현장 관리자의 모바일 접근이 불가능했습니다.</p>' +
      '<p><strong>Solution:</strong> iOS·Android 네이티브 앱과 반응형 웹 대시보드를 동시 제공합니다.</p>' +
      '<h2>03. Project Impact & Scalability</h2>' +
      '<ul><li><strong>사전 장애 감지:</strong> 블랙박스 고장 및 전원 이상을 실시간으로 탐지하여 무녹화 운행 시간을 대폭 줄였습니다.</li><li><strong>운영 비용 절감:</strong> 현장 점검 출동 횟수를 크게 줄이고, 원격 진단으로 유지보수 효율을 높였습니다.</li><li><strong>대규모 확장:</strong> 클라우드 기반 아키텍처로 수천 대 차량까지 안정적으로 확장 가능합니다.</li></ul>' +
      '<h2>04. Technical Identity</h2>' +
      '<p>본 프로젝트는 하들소프트의 IoT 풀스택 개발 역량을 종합적으로 입증합니다. 임베디드 펌웨어 통신 프로토콜 설계, 대용량 센서 데이터의 실시간 수집·처리, 그리고 멀티플랫폼 클라이언트 개발까지, End-to-End IoT 솔루션 구축 능력을 보여줍니다.</p>',
  },
  {
    matchTitle: "%차량 알콜 감지%",
    title: "Vehicle Alcohol Detection & Logging System",
    description: "차량 운전석 알콜 센서 기반 음주 감지·서버 로깅 및 시동 잠금 연동 시스템",
    detail:
      '<h2>01. Strategic Overview</h2>' +
      '<p>음주운전은 대형 교통사고의 주요 원인으로, 법인 차량·버스·화물차 운영 기업에게 막대한 법적·재정적 리스크를 초래합니다. 하들소프트는 MQ-3 알콜 센서를 차량 운전석에 장착하고, 측정값을 GPS 위치·시간 정보와 함께 서버에 실시간 전송하며, 음주 감지 시 시동을 자동 잠금하는 통합 IoT 시스템을 개발했습니다.</p>' +
      '<img src="' + img("vehicle-alcohol-detection-2.png") + '" alt="알콜 감지 로깅 시스템 구성도" />' +
      '<h2>02. System Architecture & Key Functions</h2>' +
      '<h3>A. MQ-3 센서 기반 실시간 음주 감지</h3>' +
      '<p><strong>Problem:</strong> 운행 전 음주 여부 확인이 관리자의 수동 체크에 의존하여, 새벽·야간 운행에서는 확인 자체가 불가능했습니다.</p>' +
      '<p><strong>Solution:</strong> 운전석에 MQ-3 알콜 가스 센서를 장착하고, 시동 키 ON 시 자동으로 호기 알콜 농도를 측정합니다. 기준치 초과 시 즉시 차량 ECU에 시동 잠금 신호를 전송합니다.</p>' +
      '<h3>B. GPS·시간·측정값 서버 전송 및 로깅</h3>' +
      '<p><strong>Problem:</strong> 음주 측정 기록이 차량 로컬에만 저장되어 사후 감사가 어려웠습니다.</p>' +
      '<p><strong>Solution:</strong> 매 측정마다 알콜 농도, GPS 좌표, 타임스탬프, 차량 식별번호를 LTE 통신으로 중앙 서버에 실시간 전송합니다.</p>' +
      '<h3>C. 관리자 대시보드 및 알림 체계</h3>' +
      '<p><strong>Problem:</strong> 다수 차량의 음주 측정 현황을 일괄 모니터링할 수단이 없었습니다.</p>' +
      '<p><strong>Solution:</strong> 웹 기반 관리자 대시보드에서 전체 차량의 금일 측정 현황, 위반 이력, 센서 상태를 실시간으로 조회합니다.</p>' +
      '<h2>03. Project Impact & Scalability</h2>' +
      '<ul><li><strong>음주운전 사전 차단:</strong> 시동 잠금 연동으로 음주 상태 운행을 물리적으로 차단합니다.</li><li><strong>법적 리스크 감소:</strong> GPS·시간 정보가 포함된 측정 로그를 통해 기업의 안전관리 의무 이행을 입증할 수 있습니다.</li><li><strong>다차종 호환:</strong> 12V·24V 차량 전원 모두 지원하며, 승용·화물·버스 등 다양한 차종에 범용 설치가 가능합니다.</li></ul>' +
      '<h2>04. Technical Identity</h2>' +
      '<p>본 프로젝트는 하들소프트가 센서 하드웨어 인터페이스, 차량 ECU 연동, IoT 통신 프로토콜, 서버-클라이언트 통합 플랫폼을 아우르는 전 계층 개발 역량을 갖추고 있음을 증명합니다.</p>',
  },

  // === DEFENSE ===
  {
    matchTitle: "%항공우주력연구원%",
    title: "Aerospace Research Institute Website",
    description: "항공우주력연구원의 연구 성과 및 조직 소개를 위한 국방 보안 준수 반응형 웹사이트",
    detail:
      '<h2>01. Strategic Overview</h2>' +
      '<p>항공우주력연구원은 대한민국 공군의 항공우주 분야 핵심 연구기관으로서, 그 연구 성과와 조직 역량을 대내외에 효과적으로 전달할 수 있는 공식 웹사이트가 필요했습니다. 본 프로젝트는 국방부 보안 규정을 철저히 준수하면서도 현대적인 사용자 경험을 제공하는 반응형 웹사이트를 구축하는 것을 목표로 진행되었습니다.</p>' +
      '<img src="' + img("aerospace-research-homepage-2.png") + '" alt="항공우주력연구원 웹사이트 상세 화면" />' +
      '<h2>02. System Architecture & Key Functions</h2>' +
      '<h3>A. 국방 보안 준수 CMS 구축</h3>' +
      '<p><strong>Problem:</strong> 군사 기관의 웹사이트는 일반적인 오픈소스 CMS를 사용할 수 없으며, 국방부 보안 가이드라인에 부합하는 자체 콘텐츠 관리 체계가 요구되었습니다.</p>' +
      '<p><strong>Solution:</strong> 국방부 보안 적합성 검증을 통과한 커스텀 CMS를 개발하였습니다. 다단계 인증(MFA), 감사 추적 로그, 역할 기반 접근 제어(RBAC)를 적용했습니다.</p>' +
      '<h3>B. 발간물 아카이브 및 조직도 시스템</h3>' +
      '<p><strong>Problem:</strong> 연구원의 다년간 축적된 연구 보고서, 학술 논문 등 방대한 발간물을 체계적으로 분류·검색할 수 있는 디지털 아카이브가 부재하였습니다.</p>' +
      '<p><strong>Solution:</strong> 연도·분야·저자별 다차원 필터링을 지원하는 발간물 아카이브 시스템과 동적 트리 구조 조직도를 구축하였습니다.</p>' +
      '<h2>03. Project Impact & Scalability</h2>' +
      '<ul><li><strong>보안 적합성 인증:</strong> 국방부 정보보안 감사를 통과하여 군 기관 웹사이트 표준 모델로 채택되었습니다.</li><li><strong>발간물 디지털 전환:</strong> 기존 오프라인 보관 자료의 디지털 아카이빙을 통해 연구 자산의 접근성과 활용도를 획기적으로 개선하였습니다.</li><li><strong>반응형 대응:</strong> PC, 태블릿, 모바일 환경에서 동일한 수준의 사용자 경험을 제공합니다.</li></ul>' +
      '<h2>04. Technical Identity</h2>' +
      '<p>본 프로젝트는 하들소프트가 국방 분야의 높은 보안 요건과 엄격한 규정 환경 속에서도 현대적이고 사용자 친화적인 웹 솔루션을 구현할 수 있는 역량을 보유하고 있음을 증명합니다.</p>',
  },

  // === SECURITY ===
  {
    matchTitle: "%NFC 순찰%",
    title: "NFC-Based Security Patrol System",
    description: "NFC 태그 기반 보안 순찰 경로 확인 및 실시간 관제 iOS 앱·웹 대시보드 시스템",
    detail:
      '<h2>01. Strategic Overview</h2>' +
      '<p>대형 건물, 산업 시설, 주거 단지 등에서 보안 순찰은 인력에 의존하는 만큼 순찰 누락이나 경로 이탈이 빈번하게 발생합니다. 본 프로젝트는 NFC 태그를 순찰 경로의 주요 체크포인트에 설치하고, 순찰 요원이 iOS 앱을 통해 태그를 인식하면 실시간으로 서버에 순찰 기록이 전송되는 통합 보안 순찰 관리 시스템을 구축하였습니다.</p>' +
      '<img src="' + img("nfc-patrol-system-2.jpg") + '" alt="NFC 순찰 시스템 대시보드 및 앱 화면" />' +
      '<h2>02. System Architecture & Key Functions</h2>' +
      '<h3>A. NFC 기반 순찰 인증 및 GPS 연동</h3>' +
      '<p><strong>Problem:</strong> 기존 순찰 확인 방식은 종이 서명이나 바코드 스캔에 의존하여 위·변조가 용이했습니다.</p>' +
      '<p><strong>Solution:</strong> 각 체크포인트에 고유 ID가 부여된 NFC 태그를 설치하고, iOS 앱이 태그 인식 시 GPS 좌표와 타임스탬프를 동시에 기록합니다.</p>' +
      '<h3>B. 실시간 이탈 알림 및 관리자 웹 대시보드</h3>' +
      '<p><strong>Problem:</strong> 순찰 요원이 지정 경로를 이탈하거나 체크포인트를 누락해도 사후에야 파악할 수 있었습니다.</p>' +
      '<p><strong>Solution:</strong> 지정 시간 내 체크포인트 미인식 또는 경로 이탈 시 관리자에게 실시간 푸시 알림을 발송합니다. 관리자 웹 대시보드에서 순찰 완료율 통계, 이상 이벤트 로그를 종합 확인합니다.</p>' +
      '<h2>03. Project Impact & Scalability</h2>' +
      '<ul><li><strong>순찰 신뢰도 향상:</strong> NFC+GPS 이중 검증으로 순찰 데이터의 위·변조를 원천 차단하였습니다.</li><li><strong>보안 공백 최소화:</strong> 실시간 이탈 알림으로 즉각적인 대응이 가능해졌습니다.</li><li><strong>다중 현장 확장:</strong> 클라우드 기반 서버 구조로 다수의 건물·시설에 동시 적용이 가능합니다.</li></ul>' +
      '<h2>04. Technical Identity</h2>' +
      '<p>하들소프트는 NFC 하드웨어 연동, GPS 위치 서비스, 실시간 서버 통신, 그리고 웹 기반 관제 시스템을 하나의 통합 플랫폼으로 완성하였습니다.</p>',
  },
  {
    matchTitle: "%PC 보안 취약점%",
    title: "PC Security Vulnerability Scanner Module",
    description: "OS 패치·방화벽·백신·패스워드 정책을 자동 스캔하여 보안 등급을 산출하는 PC 보안 점검 모듈",
    detail:
      '<h2>01. Strategic Overview</h2>' +
      '<p>기업 내부 IT 환경에서 개별 PC의 보안 취약점은 전체 네트워크 보안을 위협하는 가장 큰 요인 중 하나입니다. 본 프로젝트는 사용자 개입 없이 PC의 주요 보안 항목을 자동으로 스캔하고, 정량적 보안 등급을 산출하여 관리자에게 보고하는 보안 취약점 검색 모듈을 개발하였습니다.</p>' +
      '<img src="' + img("pc-security-search-module-2.png") + '" alt="PC 보안 취약점 스캔 결과 화면" />' +
      '<h2>02. System Architecture & Key Functions</h2>' +
      '<h3>A. 다항목 자동 보안 스캔 엔진</h3>' +
      '<p><strong>Problem:</strong> 기존 보안 점검은 관리자가 각 PC를 수동으로 확인하거나 체크리스트 방식으로 운영하여 점검 누락이 잦았습니다.</p>' +
      '<p><strong>Solution:</strong> Windows 시스템 API를 활용하여 OS 패치, 방화벽, 백신, 패스워드 정책을 자동 수집·분석하는 스캔 엔진을 개발했습니다. 각 항목에 가중치를 부여한 점수 체계를 통해 종합 보안 등급(A~F)을 자동 산출합니다.</p>' +
      '<h3>B. 보안 리포트 자동 생성 및 중앙 관리</h3>' +
      '<p><strong>Problem:</strong> 보안 점검 결과를 수동으로 취합하고 보고서를 작성하는 과정에서 데이터 누락이 발생하였습니다.</p>' +
      '<p><strong>Solution:</strong> 개별 PC의 스캔 결과를 중앙 서버에 자동 전송하고, 부서별·등급별 통계를 포함한 보안 리포트를 PDF 형태로 자동 생성합니다.</p>' +
      '<h2>03. Project Impact & Scalability</h2>' +
      '<ul><li><strong>점검 자동화:</strong> 수동 점검 대비 시간과 비용을 대폭 절감하고 점검 누락을 방지하였습니다.</li><li><strong>컴플라이언스 대응:</strong> ISMS, ISO 27001 등 정보보안 인증 감사 시 증빙 자료로 즉시 활용 가능합니다.</li><li><strong>대규모 확장:</strong> 에이전트 기반 분산 구조로 수천 대 PC 환경에서도 안정적으로 동작합니다.</li></ul>' +
      '<h2>04. Technical Identity</h2>' +
      '<p>하들소프트는 Windows 시스템 레벨의 보안 API에 대한 깊은 이해와 보안 정책 자동화 역량을 본 프로젝트를 통해 입증하였습니다.</p>',
  },
  {
    matchTitle: "%개방형 사용자 계정%",
    title: "Open Account App Protection System",
    description: "공유 디바이스 환경에서 개별 앱을 패스워드·지문으로 보호하는 앱 잠금 보안 솔루션",
    detail:
      '<h2>01. Strategic Overview</h2>' +
      '<p>가정, 교육 기관, 기업 등에서 하나의 디바이스를 여러 사용자가 공유하는 환경이 증가하고 있습니다. 본 프로젝트는 하들소프트의 자체 R&D로 개발된 앱 보호 시스템으로, 개별 앱 단위의 패스워드 및 생체 인증(지문) 잠금 기능을 제공합니다.</p>' +
      '<img src="' + img("app-protection-open-account-2.png") + '" alt="앱 보호 시스템 기능 상세 화면" />' +
      '<h2>02. System Architecture & Key Functions</h2>' +
      '<h3>A. 앱별 잠금 및 생체 인증</h3>' +
      '<p><strong>Problem:</strong> 안드로이드 운영체제의 기본 잠금 기능은 디바이스 전체를 잠그는 방식으로, 특정 앱만 선택적으로 보호하는 것이 불가능했습니다.</p>' +
      '<p><strong>Solution:</strong> Android Accessibility Service와 시스템 레벨 API를 활용하여 앱 실행 감지 시 잠금 화면을 오버레이하는 방식으로 앱별 독립 잠금을 구현하였습니다.</p>' +
      '<h3>B. 침입 감지 및 앱 사용 관리</h3>' +
      '<p><strong>Problem:</strong> 잠금만으로는 누가 무단 접근을 시도했는지 파악할 수 없었습니다.</p>' +
      '<p><strong>Solution:</strong> 잘못된 인증 시도가 감지되면 전면 카메라를 통해 침입 시도자의 사진을 자동 촬영합니다. 앱별 일일 사용 시간 제한과 앱 숨기기 기능도 제공합니다.</p>' +
      '<h2>03. Project Impact & Scalability</h2>' +
      '<ul><li><strong>프라이버시 보호:</strong> 공유 디바이스 환경에서 개인 앱 데이터의 무단 접근을 원천적으로 차단합니다.</li><li><strong>자체 기술 자산:</strong> 자체 R&D 프로젝트로서 Android 시스템 레벨 보안 기술의 지적재산을 확보하였습니다.</li></ul>' +
      '<h2>04. Technical Identity</h2>' +
      '<p>하들소프트의 자체 연구개발 역량을 보여주는 대표 프로젝트입니다. Android 시스템 저수준 API 활용, 생체 인증 통합, 실시간 이벤트 감지 등 모바일 보안 분야의 핵심 기술을 자체적으로 확보하였습니다.</p>',
  },

  // === ROBOTICS ===
  {
    matchTitle: "%구체 형태의 방수%",
    title: "Spherical Waterproof Telepresence Robot",
    description: "수중·습윤 환경을 위한 IP67 방수 구체형 텔레프레전스 로봇 시스템",
    detail:
      '<h2>01. Strategic Overview</h2>' +
      '<p>선박 내부, 해양 플랜트, 수중 시설 등 고습도·침수 환경에서의 원격 점검 및 모니터링은 기존 로봇 시스템으로는 대응이 어려웠습니다. KRISO와 협력하여 IP67 등급의 완전 방수 구체형 텔레프레전스 로봇을 개발하였습니다.</p>' +
      '<img src="' + img("spherical-telepresence-robot-2.png") + '" alt="구체형 방수 텔레프레전스 로봇 상세" />' +
      '<h2>02. System Architecture & Key Functions</h2>' +
      '<h3>A. IP67 방수 구체 설계 및 360도 구동 시스템</h3>' +
      '<p><strong>Problem:</strong> 해양 환경의 높은 습도, 해수 비말, 일시적 침수 조건에서 전자 장비를 보호하면서도 자유로운 이동이 가능한 로봇 형상이 필요했습니다.</p>' +
      '<p><strong>Solution:</strong> 완전 밀폐된 구체 형태의 외장을 설계하여 IP67 등급의 방수·방진 성능을 달성하였습니다. 구체 내부의 중심 이동 메커니즘을 통해 360도 전방향 이동이 가능합니다.</p>' +
      '<h3>B. 멀티센서 환경 모니터링 및 원격 조종</h3>' +
      '<p><strong>Problem:</strong> 선박 내부나 해양 플랜트의 밀폐 구역은 위험 요소를 사전에 감지해야 하지만, 인력 투입이 불가능한 환경이 많았습니다.</p>' +
      '<p><strong>Solution:</strong> 온도, 습도, 가속도 센서를 통합하여 환경 데이터를 실시간으로 수집·전송합니다. 통신 두절 시 자동 귀환 프로토콜을 적용하여 장비 손실을 방지합니다.</p>' +
      '<h2>03. Project Impact & Scalability</h2>' +
      '<ul><li><strong>극한 환경 대응:</strong> IP67 방수 인증을 통해 기존 로봇이 진입할 수 없던 수중·고습도 환경에서의 원격 점검을 실현하였습니다.</li><li><strong>안전성 향상:</strong> 위험 구역에 인력 대신 로봇을 투입하여 작업자의 안전을 확보했습니다.</li><li><strong>산업 확장성:</strong> 해양뿐 아니라 화학 플랜트, 원자력 시설 등 다양한 극한 환경으로 적용 가능합니다.</li></ul>' +
      '<h2>04. Technical Identity</h2>' +
      '<p>하들소프트는 본 프로젝트를 통해 하드웨어 설계와 소프트웨어 제어를 아우르는 로봇 시스템 통합 개발 역량을 증명하였습니다.</p>',
  },
  {
    matchTitle: "%원격지 로봇 컨트롤%",
    title: "Remote Robot Control & Audio-Video Telepresence",
    description: "블루투스 로봇 원격 조종과 WebRTC 기반 실시간 영상·음성 텔레프레전스 시스템",
    detail:
      '<h2>01. Strategic Overview</h2>' +
      '<p>원격지 로봇 제어와 실시간 커뮤니케이션을 결합한 텔레프레전스 시스템은 산업 현장 원격 점검, 원격 교육 등 다양한 분야에서 수요가 증가하고 있습니다. 본 프로젝트는 블루투스를 통한 로봇 원격 조작과 WebRTC 기술을 활용한 실시간 영상·음성 텔레프레전스를 하나의 안드로이드 앱에서 통합 제공합니다.</p>' +
      '<img src="' + img("remote-robot-telepresence-2.jpg") + '" alt="원격 로봇 텔레프레전스 조작 화면" />' +
      '<h2>02. System Architecture & Key Functions</h2>' +
      '<h3>A. 블루투스 로봇 원격 조작 시스템</h3>' +
      '<p><strong>Problem:</strong> 전용 컨트롤러는 비용이 높고 휴대성이 떨어지며, Wi-Fi 기반 제어는 네트워크 환경에 따라 불안정할 수 있었습니다.</p>' +
      '<p><strong>Solution:</strong> BLE 통신을 기반으로 스마트폰에서 직접 로봇을 조작하는 시스템을 구현하였습니다. 다중 로봇 동시 제어를 위해 병렬 통신 구조를 설계하였습니다.</p>' +
      '<h3>B. WebRTC 실시간 영상·음성 텔레프레전스</h3>' +
      '<p><strong>Problem:</strong> 로봇 카메라 영상을 원격지에서 지연 없이 확인하면서 양방향 음성 통신을 수행해야 했습니다.</p>' +
      '<p><strong>Solution:</strong> WebRTC 기술을 적용하여 초저지연 P2P 영상·음성 통신을 구현하였습니다. 자체 TURN/STUN 시그널링 서버를 구축하여 NAT 환경에서도 안정적인 연결을 보장합니다.</p>' +
      '<h2>03. Project Impact & Scalability</h2>' +
      '<ul><li><strong>통합 플랫폼:</strong> 로봇 제어와 텔레프레전스를 단일 앱에서 제공하여 운용 복잡도를 줄였습니다.</li><li><strong>초저지연 통신:</strong> WebRTC 기반 P2P 통신으로 실시간 원격 조작에 필요한 응답 속도를 달성하였습니다.</li><li><strong>기술 자산 확보:</strong> WebRTC 시그널링 서버, BLE 통신 프로토콜 등 핵심 기술을 자체 R&D로 확보하였습니다.</li></ul>' +
      '<h2>04. Technical Identity</h2>' +
      '<p>본 프로젝트는 하들소프트의 실시간 통신 기술과 하드웨어 연동 역량을 결합한 자체 연구 성과입니다.</p>',
  },
];

// ── Execute updates ──────────────────────────────────────────
const stmt = db.prepare(
  "UPDATE portfolio SET title = ?, description = ?, detail = ? WHERE title LIKE ?"
);

const runUpdates = db.transaction(() => {
  for (const entry of updates) {
    const result = stmt.run(entry.title, entry.description, entry.detail, entry.matchTitle);
    if (result.changes > 0) {
      console.log(`[OK] Updated: "${entry.title}" (${result.changes} row(s))`);
    } else {
      console.log(`[WARN] No match found for: "${entry.matchTitle}"`);
    }
  }
});

runUpdates();

console.log(`\nDone. Processed ${updates.length} entries.`);
db.close();
