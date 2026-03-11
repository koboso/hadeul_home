const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);

const update = db.prepare(
  "UPDATE portfolio SET title=?, description=?, detail=? WHERE title LIKE ?"
);

const entries = [
  // [newTitle, newDesc, newDetail, oldTitlePattern]
  [
    "Online Mass Registration System",
    "수만 건 동시 접수를 안정적으로 처리하는 대규모 트래픽 기반 코어 접수 엔진",
    `<h2>01. Strategic Overview</h2><p>대전 베이비페어는 매 시즌 수만 명의 부모가 동시에 접수를 시도하는 대규모 오프라인 행사입니다. 하들소프트는 대규모 동시 트래픽을 안정적으로 수용하면서도 실시간 현황 모니터링이 가능한 코어 접수 엔진을 설계·구축했습니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 큐 기반 동시 접수 처리 엔진</h3><p><strong>Problem:</strong> 접수 오픈 시점에 수만 건의 요청이 수 초 내에 집중되어, 일반적인 동기 처리 방식으로는 서버 장애와 데이터 유실이 불가피했습니다.</p><p><strong>Solution:</strong> 메시지 큐 기반 비동기 처리 아키텍처를 도입하여 접수 요청을 순차적으로 안정 처리했습니다.</p><h3>B. 실시간 현황 대시보드</h3><p><strong>Problem:</strong> 운영팀이 접수 진행 상황을 실시간으로 파악할 수 없었습니다.</p><p><strong>Solution:</strong> WebSocket 기반 실시간 대시보드를 구현하여 접수 건수, 대기열 상태, 서버 부하율을 시각적으로 모니터링합니다.</p><h3>C. SMS·이메일 자동 확인 시스템</h3><p><strong>Problem:</strong> 접수 완료 여부를 고객이 확인할 수 없어 중복 접수와 문의가 폭주했습니다.</p><p><strong>Solution:</strong> 접수 완료 즉시 SMS·이메일로 접수 확인서를 자동 발송합니다. QR 코드를 포함하여 현장 입장 시 빠른 본인 확인이 가능합니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>동시 접속 안정성:</strong> 피크 시간 수만 건의 동시 요청을 무중단으로 처리하며 접수 누락률 제로를 달성</li><li><strong>재사용 가능 아키텍처:</strong> 큐 기반 엔진은 다른 대규모 행사에도 즉시 적용 가능한 범용 모듈로 설계</li></ul><h2>04. Technical Identity</h2><p>본 프로젝트는 하들소프트가 보유한 대규모 트래픽 처리 역량과 실시간 시스템 설계 능력을 증명합니다.</p>`,
    "%온라인 대규모 접수%",
  ],
  [
    "Unizine Corporate Portfolio Website",
    "디자인 전문 기업의 포트폴리오와 서비스를 소개하는 브랜드 중심 웹사이트",
    `<h2>01. Strategic Overview</h2><p>유니자인은 다양한 디자인 프로젝트를 수행하는 전문 기업으로, 자사의 크리에이티브 역량을 온라인에서 효과적으로 전달할 수 있는 포트폴리오 웹사이트가 필요했습니다.</p><img src="/uploads/portfolio/unizine-homepage-2.png" alt="유니자인 포트폴리오 상세" /><h2>02. System Architecture & Key Functions</h2><h3>A. 비주얼 갤러리 & 카테고리 필터</h3><p><strong>Problem:</strong> 디자인 작업물이 분야별로 다양하여 방문자가 원하는 유형을 빠르게 탐색하기 어려웠습니다.</p><p><strong>Solution:</strong> 카테고리별 필터링과 태그 기반 검색을 지원하는 반응형 갤러리를 구현했습니다. Lazy Loading과 이미지 최적화를 적용하여 빠른 로딩을 보장합니다.</p><h3>B. 프로젝트 의뢰 문의 시스템</h3><p><strong>Problem:</strong> 의뢰 문의가 체계화되지 않아 필수 정보가 누락된 채 유입되었습니다.</p><p><strong>Solution:</strong> 프로젝트 유형, 예산, 일정 등 구조화된 입력 폼을 설계하고 접수 즉시 관리자에게 알림을 발송합니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>포트폴리오 접근성:</strong> 체계적인 갤러리와 필터로 잠재 고객이 관심 분야를 빠르게 탐색 가능</li><li><strong>의뢰 전환율 향상:</strong> 구조화된 문의 폼으로 비즈니스 기회 포착률 향상</li></ul><h2>04. Technical Identity</h2><p>하들소프트가 디자인 중심 기업의 요구사항을 이해하고, 기술 구현과 시각적 완성도를 동시에 달성하는 역량을 입증합니다.</p>`,
    "%유니자인%",
  ],
  [
    "Barista Certification Registration Platform",
    "바리스타 자격증 시험 일정 공고부터 합격자 조회까지 원스톱 접수 플랫폼",
    `<h2>01. Strategic Overview</h2><p>한국바리스타협회는 전국 단위의 바리스타 자격증 시험을 운영하며, 시험 공고에서 원서 접수, 수험표 발급, 합격자 조회에 이르는 전 과정을 디지털화할 필요가 있었습니다.</p><img src="/uploads/portfolio/barista-certification-site-2.png" alt="바리스타 자격증 접수 상세" /><h2>02. System Architecture & Key Functions</h2><h3>A. 시험 일정 공고 & 원서 접수</h3><p><strong>Problem:</strong> 시험 일정과 접수 기간 안내가 산발적으로 이루어져 응시자들이 정보를 놓치는 경우가 빈번했습니다.</p><p><strong>Solution:</strong> 관리자가 시험 일정·장소·정원을 등록하면 자동 공고 페이지가 생성되고, 시간 기반 접수 제어 시스템으로 기간 내에만 접수가 활성화됩니다.</p><h3>B. 수험표 발급 & 합격자 조회</h3><p><strong>Problem:</strong> 수험표 별도 발송과 합격 개별 통보 방식은 비용이 높고 오류 가능성이 컸습니다.</p><p><strong>Solution:</strong> 온라인 수험표 직접 출력과 수험 번호·생년월일 기반 합격 조회 기능을 제공합니다.</p><h3>C. 결제 연동 & 정산 관리</h3><p><strong>Problem:</strong> 접수비 결제와 입금 확인을 수작업으로 처리하여 정산 오류가 발생했습니다.</p><p><strong>Solution:</strong> PG 결제 연동으로 신용카드·계좌이체 등 다양한 결제 수단을 지원합니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>접수 프로세스 디지털 전환:</strong> 오프라인 기반 접수 업무를 완전 온라인화하여 운영 비용 절감</li><li><strong>확장 가능 구조:</strong> 타 자격증 시험에도 동일 플랫폼 재활용 가능</li></ul><h2>04. Technical Identity</h2><p>하들소프트가 자격증 시험 운영 도메인을 정확히 분석하고, 접수-결제-발급-조회 전 프로세스를 하나의 플랫폼으로 통합 구현한 사례입니다.</p>`,
    "%바리스타 자격증%",
  ],
  [
    "Sooju Industry Corporate Website",
    "제조업 기반 수주산업의 제품 라인업과 납품 실적을 소개하는 기업 웹사이트",
    `<h2>01. Strategic Overview</h2><p>수주산업은 제조업 기반의 B2B 기업으로, 자사 제품 라인업과 납품 실적을 체계적으로 소개할 수 있는 전문 웹사이트가 필요했습니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 제품 라인업 카탈로그</h3><p><strong>Problem:</strong> 다양한 제품군의 사양·용도를 체계적으로 정리하여 거래처에 제시할 온라인 채널이 없었습니다.</p><p><strong>Solution:</strong> 제품군별 카테고리 분류와 상세 사양 페이지를 구축하여 관리자가 CMS를 통해 직접 등록·수정할 수 있도록 설계했습니다.</p><h3>B. 납품 실적 아카이브 & 견적 문의</h3><p><strong>Problem:</strong> 주요 납품 이력을 증빙할 공식 채널이 없어 신뢰도 확보가 어려웠습니다.</p><p><strong>Solution:</strong> 연도별·분야별 납품 실적 레퍼런스 페이지와 견적 문의 연동 폼을 제공합니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>온라인 영업 채널 확보:</strong> 검색 엔진을 통한 잠재 거래처 유입 경로 마련</li><li><strong>견적 응대 효율화:</strong> 구조화된 문의 시스템으로 영업 응대 시간 단축</li></ul><h2>04. Technical Identity</h2><p>하들소프트가 제조업 B2B 도메인의 특성을 이해하고, 제품 정보 관리·납품 실적 전시·견적 프로세스를 하나의 플랫폼에 통합 구현한 사례입니다.</p>`,
    "%수주산업%",
  ],
  [
    "DIRECTREADER — Cross-Platform Remote File Viewer",
    "PC 문서·이미지·미디어를 모바일·태블릿에서 원격 열람하는 크로스 플랫폼 뷰어",
    `<h2>01. Strategic Overview</h2><p>PC에 저장된 문서, 이미지, 미디어 파일을 이동 중에 확인해야 하는 상황은 빈번하지만, 클라우드 없이 즉시 열람할 수 있는 방법은 제한적입니다. DIRECTREADER는 Wi-Fi/LAN을 활용하여 PC 파일을 실시간으로 원격 열람할 수 있는 크로스 플랫폼 뷰어입니다.</p><img src="/uploads/portfolio/directreader-2.png" alt="DirectReader 상세" /><h2>02. System Architecture & Key Functions</h2><h3>A. Wi-Fi/LAN 기반 보안 연결</h3><p><strong>Problem:</strong> 클라우드 경유 파일 공유는 보안 우려와 업로드 지연이 존재합니다.</p><p><strong>Solution:</strong> 로컬 네트워크 내 직접 연결 방식을 채택하여 외부 서버를 거치지 않는 보안 통신을 구현했습니다.</p><h3>B. 멀티 포맷 파일 뷰어</h3><p><strong>Problem:</strong> 문서, 이미지, 미디어 등 다양한 파일 형식을 하나의 앱에서 통합 지원해야 했습니다.</p><p><strong>Solution:</strong> 파일 확장자에 따라 최적화된 뷰어 엔진을 자동 선택하는 멀티 포맷 렌더링 시스템을 구축했습니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>클라우드 불필요:</strong> 보안 민감 환경에서도 활용 가능</li><li><strong>즉시 접근성:</strong> 별도 업로드 없이 PC 파일을 실시간 열람</li><li><strong>크로스 플랫폼:</strong> iOS, Android, 태블릿 모두 지원</li></ul><h2>04. Technical Identity</h2><p>DIRECTREADER는 하들소프트의 네트워크 프로그래밍, 멀티 포맷 파일 처리, 크로스 플랫폼 개발 역량을 집약한 자체 제품입니다.</p>`,
    "%DIRECTREADER%",
  ],
  [
    "SPL Noise Meter — Real-Time Sound Level Measurement",
    "스마트폰 마이크로 실시간 소음(SPL)을 측정하는 사운드 레벨 미터 앱",
    `<h2>01. Strategic Overview</h2><p>SPL Noise Meter는 스마트폰의 내장 마이크를 활용하여 실시간으로 데시벨(dB) 단위의 소음을 측정하고, 직관적인 그래프로 시각화하는 유틸리티 앱입니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 실시간 SPL 측정 엔진</h3><p><strong>Problem:</strong> 스마트폰 마이크의 하드웨어 특성상, 원시 오디오 데이터를 정확한 dB 값으로 변환하는 보정 로직이 필요했습니다.</p><p><strong>Solution:</strong> RMS 값을 실시간 산출하고, 기기별 보정 계수를 적용하여 신뢰도 높은 SPL 측정값을 제공합니다. 최소값, 최대값, 평균값을 동시에 추적합니다.</p><h3>B. 실시간 그래프 시각화</h3><p><strong>Problem:</strong> 숫자만으로는 소음 변화의 패턴을 직관적으로 파악하기 어렵습니다.</p><p><strong>Solution:</strong> 시간축 기반 실시간 라인 그래프를 구현하고, 위험 수준(85dB 이상) 구간은 색상 변화로 즉시 인지할 수 있습니다.</p><h2>03. Project Impact</h2><ul><li><strong>접근성:</strong> 별도 장비 없이 스마트폰만으로 즉시 소음 측정 가능</li><li><strong>건강 인식:</strong> 청력 보호 기준 경고 기능으로 소음성 난청 예방에 기여</li></ul><h2>04. Technical Identity</h2><p>하들소프트의 오디오 신호 처리 역량과 실시간 데이터 시각화 기술을 보여주는 자체 제품입니다.</p>`,
    "%소음측정기%",
  ],
  [
    "RAIN SOUNDS — Sleep & Meditation Ambient App",
    "자연 빗소리 기반의 수면 보조 및 명상·집중력 향상 앰비언트 사운드 앱",
    `<h2>01. Strategic Overview</h2><p>RAIN SOUNDS는 고품질 자연 빗소리를 통해 뇌파를 안정시키고, 수면·명상·집중 환경을 조성하는 앰비언트 사운드 앱입니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. Seamless Loop 사운드 엔진</h3><p><strong>Problem:</strong> 일반적인 오디오 반복 재생은 루프 경계에서 끊김이 발생하여 수면 중 집중을 방해합니다.</p><p><strong>Solution:</strong> 크로스페이드 기반 Seamless Loop 기술을 적용하여 끊김 없는 자연스러운 연속 재생을 구현했습니다.</p><h3>B. 수면 타이머 & 백그라운드 재생</h3><p><strong>Problem:</strong> 잠든 후에도 계속 재생되면 배터리 소모가 크고, 다른 앱 사용 중 재생이 중단되면 불편합니다.</p><p><strong>Solution:</strong> 설정 시간 후 볼륨 페이드아웃 수면 타이머와 백그라운드 재생을 구현했습니다.</p><h2>03. Project Impact</h2><ul><li><strong>수면 품질 개선:</strong> 자연 빗소리와 수면 타이머로 입면 시간 단축과 수면 질 향상에 기여</li><li><strong>배터리 효율:</strong> 수면 타이머와 최적화된 백그라운드 재생으로 배터리 소모 최소화</li></ul><h2>04. Technical Identity</h2><p>Seamless Loop 처리, 백그라운드 오디오 세션 관리, 페이드아웃 타이머 등 오디오 앱 특화 기술을 안정적으로 구현한 사례입니다.</p>`,
    "%RAIN SOUNDS%",
  ],
];

let count = 0;
for (const [title, desc, detail, pattern] of entries) {
  const result = update.run(title, desc, detail, pattern);
  if (result.changes > 0) count++;
  else console.log("\u26a0\ufe0f No match for:", pattern);
}
console.log(`\u2705 Updated ${count} entries`);
db.close();
