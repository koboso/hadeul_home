const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);

const update = db.prepare(
  "UPDATE portfolio SET title=?, description=?, detail=? WHERE title LIKE ?"
);

const entries = [
  [
    "S-100 Registry 수로정보 표준화 시스템",
    "IHO S-100 국제표준 기반 수로정보 Feature·Metadata·Symbol 표준화 항목 제안·심의·승인 및 Product Specification 개발 지원 웹 시스템",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>S-100 Registry 수로정보 표준화 시스템은 국제수로기구(IHO)의 S-100 유니버설 수로 데이터 모델 표준에 기반하여, 해양수산부 국립해양조사원(KHOA)의 수로정보 표준화 업무를 디지털 전환한 웹 기반 통합 관리 플랫폼입니다. Feature Catalogue, Metadata, Portrayal(Symbol) 등 S-100 표준 구성요소의 제안·심의·승인 전 과정을 체계화하고, S-100 기반 Product Specification 개발을 지원하여 대한민국 수로정보의 국제표준 적합성을 보장합니다. 국제 해양 데이터 표준 체계에 부합하는 레지스트리 시스템으로서, 해양 안전과 항해 정보 품질 향상에 기여하는 국가 핵심 해양 인프라입니다.</p>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. Feature·Metadata·Symbol 표준화 워크플로우 엔진</h3>
<p><strong>Problem:</strong> S-100 표준 체계하에서 Feature(해양 지물), Metadata(메타데이터), Portrayal Symbol(심볼) 표준화 항목의 제안부터 심의·승인까지의 프로세스가 수작업 문서 기반으로 운영되어, 이력 추적이 어렵고 버전 관리가 불가능했습니다. 복수 전문가의 심의 의견 취합과 승인 절차가 비효율적이었으며, 국제표준과의 정합성 검증에 많은 시간이 소요되었습니다.</p>
<p><strong>Solution:</strong> 표준화 항목의 제안(Proposal)→검토(Review)→심의(Deliberation)→승인(Approval)→등록(Registration) 전 과정을 디지털 워크플로우로 구현했습니다. 각 단계별 권한 체계와 승인 규칙을 시스템화하여 절차적 정합성을 보장하고, Feature Catalogue의 속성(Attribute)·관계(Association)·제약조건(Constraint) 정의를 구조화된 폼으로 입력받아 IHO S-100 Feature Concept Dictionary(FCD) 규격과의 자동 정합성 검증을 수행합니다. 모든 변경 이력은 감사 로그(Audit Trail)로 기록되어 표준화 과정의 투명성과 추적성을 확보했습니다.</p>

<h3>B. S-100 Product Specification 개발 지원 체계</h3>
<p><strong>Problem:</strong> S-100 기반 Product Specification(예: S-101 ENC, S-102 Bathymetric Surface 등) 개발 시, 등록된 Feature·Metadata 항목을 참조하여 사양서를 작성해야 하나, 레지스트리와 사양서 개발 간 연계가 부재하여 데이터 불일치와 중복 작업이 빈번했습니다.</p>
<p><strong>Solution:</strong> 레지스트리에 등록된 표준화 항목을 Product Specification 편집 환경에서 직접 참조·연결할 수 있는 통합 인터페이스를 구축했습니다. Feature Catalogue Schema에 따른 Application Schema 자동 생성, GML 기반 데이터 인코딩 규칙 정의 지원, Portrayal Catalogue와의 심볼 매핑 관리를 포함하여 Product Specification 개발의 전 과정을 체계적으로 지원합니다. 다국어(한국어·영어) 메타데이터 관리와 IHO GI Registry와의 호환성 검증 기능도 통합했습니다.</p>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>국가 표준 인프라:</strong> 대한민국 수로정보의 국제표준(S-100) 적합성을 체계적으로 관리하는 국가 핵심 시스템 구축</li>
<li><strong>업무 효율화:</strong> 수작업 문서 기반 표준화 프로세스를 디지털 워크플로우로 전환하여 심의·승인 소요 시간 대폭 단축</li>
<li><strong>국제 호환성:</strong> IHO S-100 레지스트리 체계와 호환되는 데이터 구조로 국제 해양 데이터 교환 기반 확보</li>
<li><strong>확장성:</strong> S-101, S-102, S-104 등 신규 Product Specification 추가 시 레지스트리 확장만으로 대응 가능한 유연한 아키텍처</li>
</ul>

<h2>04. Technical Identity</h2>
<p>국제수로기구(IHO)의 차세대 해양 데이터 표준인 S-100 체계를 깊이 이해하고, 복잡한 표준화 거버넌스를 웹 기반 시스템으로 구현한 해양 도메인 특화 프로젝트입니다. Feature Concept Dictionary, Application Schema, Portrayal Catalogue 등 S-100 핵심 구성요소에 대한 전문 지식과 체계적인 워크플로우 설계 역량을 입증하며, 국가 해양기관의 표준화 업무를 디지털로 혁신한 사례입니다.</p>
<img src="/uploads/portfolio/s100-registry-2.png" alt="S-100 Registry 상세 화면" />`,
    "%S-100 Registry%",
  ],
  [
    "선박운항 시뮬레이터 시작품 제작",
    "다양한 선종·기상·해상 조건을 시뮬레이션하는 실시간 3D 선박운항 시뮬레이터 프로토타입",
    `<h2>01. Strategic Overview (전략적 개요)</h2>
<p>선박운항 시뮬레이터 시작품 제작 프로젝트는 해양 교육·훈련 기관을 위한 차세대 선박운항 시뮬레이터의 프로토타입을 개발한 사업입니다. 다양한 선종(상선, 유조선, 컨테이너선 등)의 운항 특성을 정밀하게 모델링하고, 기상 조건(풍향·풍속·시정)과 해상 상태(파고·조류·조석)를 실시간으로 시뮬레이션하여 실제 항해에 근접한 훈련 환경을 제공합니다. 항만 접·이안, 협수로 통과, 비상 상황 대응 등 실전 시나리오를 3D 환경에서 체험할 수 있어 해기사 양성과 운항 역량 강화에 기여하는 해양 교육 핵심 인프라입니다.</p>

<h2>02. System Architecture & Key Functions</h2>
<h3>A. 선박 운동역학 시뮬레이션 엔진</h3>
<p><strong>Problem:</strong> 선박의 운동은 6자유도(Surge, Sway, Heave, Roll, Pitch, Yaw) 운동 방정식으로 기술되며, 선종별 선체 형상·배수량·프로펠러 특성에 따라 조종 응답이 크게 달라집니다. 풍압력, 조류력, 파랑 외력 등 외부 힘의 동시 작용을 실시간으로 계산해야 하므로 높은 연산 성능이 요구되었습니다.</p>
<p><strong>Solution:</strong> MMG(Maneuvering Modeling Group) 수학 모델을 기반으로 선체 유체역학 계수를 선종별로 매개변수화하여, 다양한 선박의 조종 특성을 정밀하게 재현하는 운동역학 엔진을 구현했습니다. 러더(Rudder) 입력에 대한 선회 응답, 프로펠러 추력에 따른 속력 변화, 풍압·조류에 의한 편류를 실시간으로 연산하며, 적분 알고리즘을 최적화하여 60Hz 이상의 물리 시뮬레이션 주기를 유지합니다. 선박 간 상호작용(Bank Effect, Passing Ship Effect)도 근사 모델로 반영했습니다.</p>

<h3>B. 실시간 3D 항만 환경 렌더링 시스템</h3>
<p><strong>Problem:</strong> 항만 접안 훈련에는 부두, 안벽, 방파제, 등대, 항로표지 등 항만 시설물의 정밀한 3D 모델링이 필요하며, 주간·야간·안개 등 다양한 시정 조건에서의 시각적 현실감도 확보해야 했습니다. 수면의 파랑 렌더링과 선박 항적(Wake) 표현도 시뮬레이션 몰입도에 핵심적인 요소였습니다.</p>
<p><strong>Solution:</strong> 실제 항만 측량 데이터를 기반으로 3D 지형과 시설물을 모델링하고, LOD(Level of Detail) 기법으로 거리에 따라 렌더링 품질을 동적으로 조절하여 실시간 성능을 확보했습니다. 해면은 FFT(Fast Fourier Transform) 기반 파랑 시뮬레이션으로 사실적인 해수면 움직임을 구현하고, 반사·굴절 셰이더로 수면의 광학적 특성을 재현합니다. 시간대별 조명 변화(일출·일몰·야간), 안개·강우 등 기상 효과, 항로표지 등화 패턴까지 구현하여 모든 운항 조건에서의 시각적 현실감을 확보했습니다.</p>

<h2>03. Project Impact & Scalability</h2>
<ul>
<li><strong>해양 교육 혁신:</strong> 실선 훈련 대비 안전하고 비용 효율적인 시뮬레이터 기반 교육·훈련 환경 구축</li>
<li><strong>선종 확장성:</strong> 매개변수화된 운동역학 모델로 신규 선종 추가 시 계수 입력만으로 시뮬레이션 가능</li>
<li><strong>시나리오 다양성:</strong> 기상·해상·교통 상황을 자유롭게 조합하여 무한한 훈련 시나리오 생성 가능</li>
<li><strong>기술 기반 확보:</strong> 향후 Full Mission Ship Simulator 개발을 위한 핵심 기술 자산 확보</li>
</ul>

<h2>04. Technical Identity</h2>
<p>선박 운동역학(Ship Maneuvering Dynamics)과 실시간 3D 렌더링이라는 두 가지 고난도 기술 영역을 융합한 해양 시뮬레이션 전문 프로젝트입니다. MMG 수학 모델 기반의 정밀한 물리 시뮬레이션과 항만 환경의 사실적 3D 시각화를 결합하여, 해양 교육·훈련 분야의 기술적 깊이와 도메인 전문성을 동시에 입증합니다.</p>
<img src="/uploads/portfolio/ship-simulator-2.png" alt="선박운항 시뮬레이터 상세 화면" />`,
    "%선박운항 시뮬레이터%",
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
