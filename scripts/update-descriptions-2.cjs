const Database = require("better-sqlite3");
const path = require("path");
const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);

const update = db.prepare("UPDATE portfolio SET title=?, description=?, detail=? WHERE title LIKE ?");

const entries = [
  // 1. 모듈형 로봇 코딩
  [
    "Modular Robot Coding Education App",
    "블루투스 모듈형 로봇을 블록 코딩으로 제어하며 프로그래밍을 학습하는 교육용 모바일 앱",
    `<h2>01. Strategic Overview</h2><p>코딩 교육의 핵심은 추상적 논리를 실제 결과로 연결하는 경험에 있습니다. 본 프로젝트는 모듈형 로봇(주행 모듈, 온도·습도 센서 모듈)을 블루투스로 연결하고, Scratch 스타일의 블록 코딩 인터페이스를 통해 학생들이 직접 로봇을 프로그래밍할 수 있는 교육용 모바일 앱을 개발했습니다.</p><img src="/uploads/portfolio/modular-robot-2.png" alt="블록 코딩 인터페이스 및 로봇 제어 화면" /><h2>02. System Architecture & Key Functions</h2><h3>A. 블루투스 기반 로봇 통신 엔진</h3><p><strong>Problem:</strong> 교육 현장에서 다수의 학생이 동시에 각자의 로봇과 안정적으로 연결을 유지해야 합니다.</p><p><strong>Solution:</strong> BLE 기반 자동 페어링 및 재연결 메커니즘을 구현하고, 각 로봇 모듈별 고유 식별 프로토콜을 설계하여 다중 디바이스 환경에서 안정적인 1:1 통신을 보장했습니다.</p><h3>B. Scratch 스타일 비주얼 블록 코딩 엔진</h3><p><strong>Problem:</strong> 초등학생 수준의 학습자가 텍스트 기반 코딩 없이도 핵심 프로그래밍 개념을 이해해야 합니다.</p><p><strong>Solution:</strong> 커스텀 블록 코딩 인터프리터를 개발하여 드래그 앤 드롭으로 조립한 블록 시퀀스를 실시간으로 파싱하고 로봇 제어 명령으로 변환합니다.</p><h3>C. 모듈형 센서 확장 체계</h3><p><strong>Problem:</strong> 단순 주행만으로는 학습 깊이가 제한됩니다.</p><p><strong>Solution:</strong> 온도·습도 센서 모듈을 플러그 앤 플레이 방식으로 연결할 수 있도록 하드웨어 추상화 계층을 설계했습니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>교육 접근성 향상:</strong> 코딩 경험이 없는 초등학생도 10분 내에 첫 로봇 제어 프로그램을 완성할 수 있는 직관적 UX 달성</li><li><strong>커리큘럼 확장성:</strong> 모듈형 설계로 새로운 센서 추가 시 앱 업데이트만으로 대응 가능</li><li><strong>크로스 플랫폼:</strong> iOS 및 Android 동시 지원</li></ul><h2>04. Technical Identity</h2><p>하들소프트는 BLE 통신 프로토콜 설계, 실시간 블록 코드 인터프리터 엔진, 하드웨어-소프트웨어 통합 아키텍처 등 임베디드-모바일 융합 기술력을 본 프로젝트를 통해 증명했습니다.</p>`,
    "%모듈형 로봇 코딩%",
  ],
  // 2. 코리아 사이언스
  [
    "Korea Science Official Website",
    "과학 교육 콘텐츠 및 체험 프로그램 소개와 온라인 예약 기능을 갖춘 반응형 웹사이트",
    `<h2>01. Strategic Overview</h2><p>코리아사이언스는 과학 교육 콘텐츠와 다양한 체험 프로그램을 운영하는 기관으로, 학생·학부모·교사가 프로그램 정보를 쉽게 탐색하고 온라인으로 예약·접수할 수 있는 공식 웹사이트가 필요했습니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 온라인 예약·접수 시스템</h3><p><strong>Problem:</strong> 체험 프로그램별 정원 관리, 중복 신청 방지 등이 수작업으로 이루어져 오류가 빈번했습니다.</p><p><strong>Solution:</strong> 프로그램별 실시간 잔여석 표시, 자동 정원 마감 처리, 대기 등록 기능을 포함한 온라인 예약 시스템을 구축했습니다.</p><h3>B. 교육 콘텐츠 관리 시스템(CMS)</h3><p><strong>Problem:</strong> 수시로 변경되는 프로그램 일정을 개발자 도움 없이 직접 관리해야 했습니다.</p><p><strong>Solution:</strong> 비개발 직원도 쉽게 사용할 수 있는 맞춤형 CMS를 구현했습니다.</p><h3>C. 반응형 웹 디자인 및 접근성</h3><p><strong>Problem:</strong> 학부모 대부분이 모바일 환경에서 접속하지만, 기존 사이트는 데스크톱 전용이었습니다.</p><p><strong>Solution:</strong> 모바일 퍼스트 반응형 설계를 적용하여 모든 환경에서 최적화된 UI를 제공합니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>업무 효율화:</strong> 전화·이메일 접수 업무량 대폭 감소</li><li><strong>사용자 만족도:</strong> 24시간 온라인 예약 가능</li><li><strong>SEO 최적화:</strong> 과학 체험 프로그램 관련 키워드 유입량 증가</li></ul><h2>04. Technical Identity</h2><p>하들소프트는 교육 기관 특화 웹사이트 구축 경험을 바탕으로, 예약 시스템과 콘텐츠 관리의 유기적 통합, 모바일 최적화 설계 역량을 입증했습니다.</p>`,
    "%코리아 사이언스%",
  ],
  // 3. 우리아이동동
  [
    "Dongdong — Interactive Read-Aloud Storybook",
    "부모가 직접 목소리로 동화를 녹음하여 아이에게 들려주는 인터랙티브 동화책 앱",
    `<h2>01. Strategic Overview</h2><p>'우리아이동동'은 부모가 자신의 목소리로 동화를 녹음하면, 아이가 언제든 그림과 함께 부모의 목소리로 동화를 들을 수 있는 인터랙티브 동화책 앱입니다. 기계음 TTS가 아닌 부모의 실제 목소리가 주는 정서적 안정감에 집중했습니다.</p><img src="/uploads/portfolio/dongdong-storybook-2.png" alt="동화 녹음 및 재생 화면" /><h2>02. System Architecture & Key Functions</h2><h3>A. 페이지별 음성 녹음 및 동기화 엔진</h3><p><strong>Problem:</strong> 동화의 각 페이지마다 녹음해야 하며, 재생 시 그림 전환과 음성이 정확히 동기화되어야 합니다.</p><p><strong>Solution:</strong> 페이지 단위 녹음 시스템을 설계하여 삽화를 보면서 녹음할 수 있도록 했습니다. 노이즈 감소 처리와 페이지 전환 동기화를 구현했습니다.</p><h3>B. 인터랙티브 그림책 렌더링</h3><p><strong>Problem:</strong> 아이들의 집중력을 유지하기 위해 터치에 반응하는 인터랙티브 요소가 필요합니다.</p><p><strong>Solution:</strong> 각 페이지의 삽화에 터치 반응 애니메이션을 적용하여 캐릭터를 터치하면 움직이거나 효과음이 재생됩니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>정서적 가치:</strong> 부모의 실제 목소리로 동화를 들려줌으로써 TTS 대비 높은 정서적 안정감과 유대감 형성</li><li><strong>오프라인 지원:</strong> 녹음 완료된 동화책은 디바이스에 로컬 저장되어 오프라인에서도 완벽하게 재생</li><li><strong>자체 IP 확보:</strong> 하들소프트 자체 퍼블리싱으로 에듀테크 분야 브랜드 포트폴리오 구축</li></ul><h2>04. Technical Identity</h2><p>하들소프트는 오디오 녹음·재생 엔진, 페이지-음성 동기화 시스템, 인터랙티브 애니메이션 렌더링, 오프라인 우선 아키텍처 등 멀티미디어 모바일 앱 개발의 종합적 기술력을 입증했습니다.</p>`,
    "%우리아이동동%",
  ],
  // 4. 날씨 음악 추천
  [
    "Weather-Based Music Recommendation & Streaming",
    "현재 날씨와 위치를 분석하여 맞춤형 음악을 추천하고 스트리밍하는 컨텍스트 인식 음악 서비스",
    `<h2>01. Strategic Overview</h2><p>음악 추천 서비스는 대부분 사용자의 청취 이력이나 장르 선호도에 의존합니다. 본 프로젝트는 여기에 '날씨'와 '위치'라는 환경 컨텍스트를 결합하여 완전히 새로운 음악 발견 경험을 제공합니다.</p><img src="/uploads/portfolio/weather-music-streaming-2.png" alt="날씨 기반 음악 추천 인터페이스" /><h2>02. System Architecture & Key Functions</h2><h3>A. 날씨-음악 매핑 추천 엔진</h3><p><strong>Problem:</strong> 날씨 상태와 기온, 습도, 시간대 등 다차원 환경 변수를 음악의 분위기와 어떻게 매핑할 것인지가 핵심 과제였습니다.</p><p><strong>Solution:</strong> 날씨 조건을 다차원 벡터로 변환하고, 음악 메타데이터(BPM, 에너지, 분위기 태그)와의 유사도를 계산하는 추천 알고리즘을 개발했습니다.</p><h3>B. 적응형 스트리밍 인프라</h3><p><strong>Problem:</strong> 야외 이동 중 네트워크 환경이 수시로 변하며, 끊김 없는 품질을 유지해야 합니다.</p><p><strong>Solution:</strong> HLS 기반 적응형 비트레이트 스트리밍과 프리페칭 전략으로 트랙 전환 시 지연을 제거했습니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>차별화된 경험:</strong> 환경 컨텍스트 기반 추천으로 기존 음악 서비스 대비 독보적인 사용자 경험 제공</li><li><strong>높은 인게이지먼트:</strong> 날씨 변화 시 자동 플레이리스트 갱신으로 앱 재방문율 향상</li><li><strong>API 안정성:</strong> 기상청 API 장애 시 캐시 기반 폴백으로 서비스 연속성 보장</li></ul><h2>04. Technical Identity</h2><p>하들소프트는 이기종 외부 API 실시간 연동, 컨텍스트 인식 추천 알고리즘 설계, 적응형 미디어 스트리밍 인프라 구축 등 데이터 기반 서비스와 미디어 기술의 융합 역량을 입증했습니다.</p>`,
    "%날씨%음악 추천%",
  ],
  // 5. 영상·음성 스트리밍 라이브러리
  [
    "Low-Latency Video & Audio Streaming Library",
    "축구 경기 중계 및 분석을 위한 저지연 고품질 영상·음성 스트리밍 라이브러리",
    `<h2>01. Strategic Overview</h2><p>대한축구협회는 전국 각지에서 진행되는 경기의 실시간 영상 중계와 경기 후 분석 영상 배포를 위한 전문 스트리밍 솔루션이 필요했습니다. 하들소프트는 H.264/AAC 코덱 기반의 적응형 비트레이트 스트리밍 라이브러리를 자체 개발하여 전문 요구사항을 해결했습니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 1초 미만 초저지연 전송 엔진</h3><p><strong>Problem:</strong> 일반 HLS/DASH 방식은 3~10초의 지연이 발생하며, 스포츠 실시간 중계에서 이 지연은 시청 경험을 심각하게 저해합니다.</p><p><strong>Solution:</strong> WebRTC 기반 전송 프로토콜과 최적화된 H.264 인코딩 파이프라인을 결합하여 글라스-투-글라스 지연을 800ms 이하로 달성했습니다.</p><h3>B. 다중 카메라 동시 스트리밍 및 전환</h3><p><strong>Problem:</strong> 축구 경기 분석을 위해 최소 3~4대의 카메라 앵글을 동시에 수신하고, 실시간으로 전환할 수 있어야 합니다.</p><p><strong>Solution:</strong> 다중 스트림 동기화 프로토콜을 설계하여 모든 카메라의 타임스탬프를 밀리초 단위로 정렬합니다.</p><h3>C. 적응형 비트레이트(ABR) 및 코덱 최적화</h3><p><strong>Problem:</strong> 다양한 네트워크 환경에서 끊김 없이 최적 화질을 제공해야 합니다.</p><p><strong>Solution:</strong> H.264 High Profile 인코딩과 AAC 오디오 코덱을 기반으로 360p부터 1080p까지 다단계 품질 레이어를 제공합니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>초저지연 달성:</strong> 글라스-투-글라스 800ms 이하 지연으로 실시간 스포츠 중계 품질 기준 충족</li><li><strong>라이브러리 재사용:</strong> SDK 형태로 제공되어 다양한 클라이언트에 통합 가능</li><li><strong>비용 절감:</strong> 자체 스트리밍 인프라 구축으로 외부 CDN 의존도 감소</li></ul><h2>04. Technical Identity</h2><p>하들소프트는 저수준 미디어 코덱 최적화, 초저지연 전송 프로토콜 설계, 다중 스트림 동기화, 적응형 비트레이트 알고리즘 등 미디어 스트리밍 핵심 기술 전 영역에 걸친 깊은 전문성을 입증했습니다.</p>`,
    "%영상·음성 스트리밍 라이브러리%",
  ],
  // 6. GPS HUD 속도계
  [
    "GPS HUD Speedometer",
    "GPS 기반 실시간 속도 측정과 HUD 유리 반사 모드를 지원하는 디지털 속도계 앱",
    `<h2>01. Strategic Overview</h2><p>차량 운행 중 속도 확인은 안전 운전의 기본이지만, 시선을 계기판으로 이동하는 것은 전방 주시를 방해합니다. GPS HUD 속도계는 스마트폰을 대시보드에 올려놓고 HUD 모드를 활성화하면 속도 정보가 앞 유리에 반사되어 전방을 주시하면서도 속도를 확인할 수 있는 앱입니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. GPS 기반 고정밀 속도 측정 엔진</h3><p><strong>Problem:</strong> GPS 신호는 터널, 고층 빌딩 밀집 지역에서 정확도가 떨어지며, 원시 GPS 데이터의 노이즈로 속도 표시가 불안정해질 수 있습니다.</p><p><strong>Solution:</strong> 칼만 필터를 적용하여 GPS 신호 노이즈를 실시간 보정하고, 안정적인 속도 표시를 구현했습니다.</p><h3>B. HUD 유리 반사 모드</h3><p><strong>Problem:</strong> 일반 화면을 앞 유리에 반사시키면 좌우가 뒤집혀 보이며, 야간에 눈부심이 발생합니다.</p><p><strong>Solution:</strong> 화면을 좌우 반전하고 검정 배경에 고대비 색상으로 표시하는 HUD 전용 렌더링 모드를 구현했습니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>안전 운전 기여:</strong> HUD 모드를 통해 전방 주시를 유지하면서 속도를 확인 가능</li><li><strong>범용 호환성:</strong> 별도 하드웨어 없이 스마트폰만으로 HUD 기능 구현</li><li><strong>배터리 최적화:</strong> GPS 폴링 주기 최적화와 AMOLED 친화적 검정 배경 디자인</li></ul><h2>04. Technical Identity</h2><p>하들소프트는 GPS 신호 처리 및 칼만 필터 적용, 센서 기반 자동 밝기 제어, 저전력 고효율 백그라운드 처리 등 모바일 센서 활용 기술력을 입증했습니다.</p>`,
    "%GPS HUD 속도계%",
  ],
  // 7. 세무그룹 명성
  [
    "Tax Group Myungsung Corporate Website",
    "세무·회계 법인의 서비스 소개와 온라인 상담 예약 기능을 갖춘 기업 반응형 웹사이트",
    `<h2>01. Strategic Overview</h2><p>세무그룹 명성은 다수의 세무사와 회계사가 소속된 종합 세무·회계 법인으로, 디지털 채널을 통한 신규 고객 확보와 기존 고객 관리의 필요성이 대두되었습니다. 하들소프트는 법인의 전문성과 신뢰를 전달하는 기업 웹사이트를 구축하고, 온라인 상담 예약 기능을 통합했습니다.</p><img src="/uploads/portfolio/tax-group-myungsung-2.png" alt="세무그룹 명성 웹사이트 주요 페이지" /><h2>02. System Architecture & Key Functions</h2><h3>A. 온라인 상담 예약 시스템</h3><p><strong>Problem:</strong> 세무 상담은 분야별 전문 세무사 배정이 필요하며, 전화 예약 시 업무 시간 외에는 접수가 불가능했습니다.</p><p><strong>Solution:</strong> 상담 분야 선택 → 희망 일시 선택 → 기본 정보 입력의 3단계 예약 프로세스를 구현하고 분야별 담당 세무사를 자동 배정합니다.</p><h3>B. 세무 뉴스 및 자료실</h3><p><strong>Problem:</strong> 유용한 세무 정보를 고객에게 지속적으로 제공하여 전문성을 어필해야 합니다.</p><p><strong>Solution:</strong> 카테고리별 뉴스·칼럼 관리 시스템과 세무 서식·가이드 다운로드 자료실을 구축했습니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>신규 고객 유입:</strong> 온라인 채널을 통한 상담 문의 증가로 디지털 기반 고객 확보 경로 확립</li><li><strong>업무 효율화:</strong> 온라인 예약 시스템으로 전화 응대 업무 감소</li><li><strong>관리 자율성:</strong> CMS 기반 운영으로 콘텐츠 업데이트 시 개발 의존도 제거</li></ul><h2>04. Technical Identity</h2><p>하들소프트는 전문 서비스 법인의 디지털 전환에 필요한 브랜드 중심 웹 디자인, 예약·CRM 연동 시스템, 콘텐츠 마케팅 인프라 구축 역량을 입증했습니다.</p>`,
    "%세무그룹 명성%",
  ],
  // 8. 금단비가
  [
    "Geumdan Biga Consultation & Internal ERP System",
    "피부관리 전문업체의 상담 예약부터 매장 관리, 정산, CRM까지 통합하는 전사적 자원 관리 시스템",
    `<h2>01. Strategic Overview</h2><p>금단비가는 다수의 매장을 운영하는 피부관리 전문 프랜차이즈로, 고객 상담 예약, 매장별 매출 관리, 상품 재고, 직원 인센티브 정산, CRM 등 전사적 업무가 엑셀과 수기 장부에 의존하고 있었습니다. 하들소프트는 전 업무 프로세스를 분석하여 맞춤형 ERP 시스템을 구축했습니다.</p><img src="/uploads/portfolio/geumdan-erp-2.png" alt="금단비가 ERP 대시보드 및 관리 화면" /><h2>02. System Architecture & Key Functions</h2><h3>A. 통합 상담 예약 및 CRM</h3><p><strong>Problem:</strong> 고객의 피부 상태 이력, 과거 시술 내역이 체계적으로 관리되지 않아 재방문 고객에게 맞춤형 서비스를 제공하기 어려웠습니다.</p><p><strong>Solution:</strong> 고객별 통합 프로필에 피부 타입, 시술 이력, 알레르기 정보, 상담 노트를 누적 관리하는 CRM을 구축했습니다.</p><h3>B. 다매장 매출 관리 및 정산 시스템</h3><p><strong>Problem:</strong> 매장별 매출 집계, 본사-매장 간 정산, 직원별 인센티브 계산이 수작업으로 이루어져 오류가 빈번했습니다.</p><p><strong>Solution:</strong> 시술 완료 시 자동으로 매출이 기록되고, 매장별·직원별·서비스별 매출을 실시간 집계하는 대시보드를 구현했습니다.</p><h3>C. 상품 재고 및 경영 리포트</h3><p><strong>Problem:</strong> 시술에 사용되는 화장품, 소모품 등의 재고 파악이 실시간으로 이루어지지 않았습니다.</p><p><strong>Solution:</strong> 시술 시 소모품 자동 재고 차감, 안전 재고 알림, 경영 리포트 시각화를 구현했습니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>정산 효율화:</strong> 월말 정산 소요 시간 대폭 단축 및 정산 오류 제거</li><li><strong>고객 만족도:</strong> CRM 기반 맞춤형 서비스로 재방문율 향상</li><li><strong>확장성:</strong> 신규 매장 오픈 시 즉시 통합 운영 가능한 멀티테넌트 아키텍처</li></ul><h2>04. Technical Identity</h2><p>하들소프트는 복잡한 비즈니스 프로세스 분석 및 시스템 설계, 다매장 멀티테넌트 ERP 아키텍처, CRM-정산-재고 간 유기적 데이터 흐름 설계 역량을 입증했습니다.</p>`,
    "%금단비가%",
  ],
];

let count = 0;
for (const [title, desc, detail, pattern] of entries) {
  const result = update.run(title, desc, detail, pattern);
  if (result.changes > 0) count++;
  else console.log("⚠️ No match for:", pattern);
}
console.log(`✅ Updated ${count} entries`);
db.close();
