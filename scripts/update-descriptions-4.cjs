const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);

const update = db.prepare(
  "UPDATE portfolio SET title=?, description=?, detail=? WHERE title LIKE ?"
);

const entries = [
  [
    "Tashu Racing — O2O Coupon-Linked Mobile Game",
    "대전 공공자전거 타슈 테마의 O2O 쿠폰 연동 레이싱 게임 (대전테크노파크 장려상)",
    `<h2>01. Strategic Overview</h2><p>타슈 레이싱은 대전광역시의 공공자전거 '타슈'를 테마로 한 모바일 레이싱 게임으로, 게임 내 아이템을 실제 오프라인 매장에서 사용할 수 있는 쿠폰으로 전환하는 O2O 비즈니스 모델을 구현했습니다. 대전테크노파크 장려상을 수상하며 기술적·사업적 가치를 인정받았습니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 타슈 테마 레이싱 게임 엔진</h3><p><strong>Problem:</strong> 공공자전거라는 공익적 소재를 몰입도 높은 게임으로 구현해야 했습니다.</p><p><strong>Solution:</strong> 대전 시내 실제 코스를 모티브로 한 트랙과 물리 엔진 기반 주행 시뮬레이션을 구현했습니다.</p><h3>B. O2O 쿠폰 전환 시스템</h3><p><strong>Problem:</strong> 게임 내 보상과 실제 오프라인 경제 활동을 연결하는 신뢰성 있는 시스템이 필요했습니다.</p><p><strong>Solution:</strong> 게임 내 아이템·포인트를 제휴 매장 할인 쿠폰으로 전환할 수 있는 O2O 플랫폼을 구축했습니다.</p><h2>03. Project Impact</h2><ul><li><strong>대전테크노파크 장려상 수상:</strong> O2O 비즈니스 모델의 혁신성과 기술력을 공식 인정</li><li><strong>지역 상권 활성화:</strong> 게임 사용자를 오프라인 매장으로 유도하는 선순환 구조 구축</li></ul><h2>04. Technical Identity</h2><p>게임 개발 역량과 O2O 비즈니스 플랫폼 구축 능력을 동시에 보유함을 증명하는 대표 프로젝트입니다.</p>`,
    "%타슈 레이싱%",
  ],
  [
    "English Word Puzzle — Visual Edition with Picture Hints",
    "단어 터치 시 그림 힌트를 제공하는 비주얼 영어 단어 퍼즐 게임",
    `<h2>01. Strategic Overview</h2><p>기존 Word Search에 비주얼 힌트 시스템을 접목하여, 단어를 터치하면 해당 단어의 그림이 표시되는 직관적인 학습 경험을 제공합니다.</p><img src="/uploads/portfolio/english-word-puzzle-2.png" alt="영어 단어 퍼즐 상세" /><h2>02. Core Game Design & Engineering</h2><h3>A. 그림 힌트 연동 퍼즐</h3><p><strong>Problem:</strong> 기존 Word Search는 단어의 의미를 학습하는 효과가 부족했습니다.</p><p><strong>Solution:</strong> 단어 터치 시 일러스트 이미지를 표시하는 비주얼 피드백 시스템을 구현했습니다.</p><h3>B. 난이도·카테고리별 단어 세트</h3><p><strong>Problem:</strong> 단일 난이도와 무작위 단어로는 다양한 학습자를 만족시키기 어렵습니다.</p><p><strong>Solution:</strong> 초급·중급·고급 난이도와 동물, 음식, 직업 등 카테고리별 단어 세트를 제공합니다.</p><h2>03. Project Impact</h2><ul><li><strong>학습 효과:</strong> 비주얼 힌트를 통한 시각적 연상 학습법으로 기억 효과 향상</li><li><strong>리더보드:</strong> Google Play Games 연동으로 지속적 참여 유도</li></ul><h2>04. Technical Identity</h2><p>교육과 게임을 결합한 에듀테크 분야에서 창의적 제품을 기획·개발할 수 있는 역량을 보여줍니다.</p>`,
    "%영어 단어 낱말 퍼즐%",
  ],
  [
    "Block Battle 3D : Multiplayer",
    "지우개 싸움을 3D 물리 엔진으로 구현한 실시간 멀티플레이 대전 게임",
    `<h2>01. Strategic Overview</h2><p>어린 시절 누구나 해본 지우개 싸움을 모바일 3D 물리 엔진 기반 실시간 대전 게임으로 재해석했습니다.</p><img src="/uploads/portfolio/block-battle-3d-2.png" alt="Block Battle 3D 게임 플레이 화면" /><h2>02. Core Game Design & Engineering</h2><h3>A. 3D 물리 엔진 튜닝</h3><p><strong>Problem:</strong> 지우개 싸움 특유의 손맛을 3D 환경에서 재현하려면 물리 파라미터 정밀 조정이 필요했습니다.</p><p><strong>Solution:</strong> 수백 회 반복 테스트로 발사력과 충돌 반응을 최적화하고, 블럭별 밸런스 테이블을 설계했습니다.</p><h3>B. 실시간 멀티플레이 동기화</h3><p><strong>Problem:</strong> 모바일 네트워크에서 물리 연산 결과의 동기화 지연이 게임 경험을 저해했습니다.</p><p><strong>Solution:</strong> 호스트 기반 물리 연산 + 클라이언트 보간 방식과 경량 프로토콜로 데이터 트래픽을 절감했습니다.</p><h2>03. Project Impact</h2><ul><li><strong>유저 반응:</strong> "진짜 지우개 싸움 느낌" 등 물리 엔진 완성도에 대한 긍정적 피드백</li><li><strong>리텐션:</strong> 블럭 커스터마이징으로 재방문율 확보</li></ul><h2>04. Technical Identity</h2><p>3D 물리 시뮬레이션과 실시간 네트워크 동기화를 결합한 기술적 도전이 담긴 프로젝트입니다.</p>`,
    "%블럭배틀 3D%",
  ],
  [
    "OTHER FINGERS — Multitouch Party Game",
    "여러 명이 동시에 손가락을 올려놓고 공을 피하는 멀티터치 파티 게임",
    `<h2>01. Strategic Overview</h2><p>하나의 디바이스에 최대 10명이 동시에 손가락을 올려놓고, 날아오는 공을 피하는 오프라인 파티 게임입니다.</p><img src="/uploads/portfolio/other-fingers-2.png" alt="Other Fingers 멀티터치 파티 게임 화면" /><h2>02. Core Game Design & Engineering</h2><h3>A. 대규모 멀티터치 인식</h3><p><strong>Problem:</strong> 모바일 OS의 멀티터치 포인트 제한과 근접 터치 간 오인식 문제가 있었습니다.</p><p><strong>Solution:</strong> 터치 포인트별 고유 ID 추적과 최소 터치 간격 임계값을 설정하여 인접 손가락 간 충돌 판정을 정확히 분리했습니다.</p><h2>03. Project Impact</h2><ul><li><strong>파티 게임:</strong> 별도 하드웨어 없이 최대 10명 동시 플레이</li><li><strong>접근성:</strong> 규칙 설명 30초 이내, 연령 불문 즉시 플레이 가능</li></ul><h2>04. Technical Identity</h2><p>디바이스 하드웨어의 멀티터치 한계를 소프트웨어로 극복한 기술적 실험입니다.</p>`,
    "%OTHER FINGERS%",
  ],
  [
    "MAKE JUMPER — Multi-Character Jump Action",
    "최대 5명 캐릭터 동시 조작 극강 난이도 점프 액션 게임",
    `<h2>01. Strategic Overview</h2><p>최대 5명의 캐릭터를 동시에 조작하여 10초 이상 생존시키는 극강 난이도 점프 액션 게임입니다. "No One Dies" 장르의 모바일 최적화 사례입니다.</p><h2>02. Core Game Design & Engineering</h2><h3>A. 멀티 캐릭터 동시 조작</h3><p><strong>Problem:</strong> 5개 캐릭터의 개별 점프 타이밍을 하나의 터치 인터페이스로 제어해야 했습니다.</p><p><strong>Solution:</strong> 화면 영역 분할 터치 매핑과 시각적 캐릭터 구분 체계를 설계했습니다.</p><h2>03. Project Impact</h2><ul><li><strong>도전 욕구:</strong> "10초 생존" 명확한 목표가 반복 플레이와 SNS 공유를 유발</li></ul><h2>04. Technical Identity</h2><p>멀티 캐릭터 동시 제어의 UX 설계와 절묘한 난이도 밸런싱이 결합된 프로젝트입니다.</p>`,
    "%MAKE JUMPER%",
  ],
  [
    "TINT — RGB Color Block Puzzle",
    "빛의 3원색(RGB) 조합으로 블록을 색칠하는 독창적 퍼즐 게임",
    `<h2>01. Strategic Overview</h2><p>빛의 3원색 조합 원리를 퍼즐 메커니즘으로 구현한 블록 색칠 퍼즐 게임입니다. 앱스토리 2016년 4월호에 '독창적 인디게임'으로 소개되었습니다.</p><h2>02. Core Game Design & Engineering</h2><h3>A. RGB 색상 조합 시스템</h3><p><strong>Problem:</strong> 빛의 혼합(가산 혼합)은 물감 혼합과 반대여서 직관적 이해가 어려웠습니다.</p><p><strong>Solution:</strong> 단계적 튜토리얼과 실시간 색상 미리보기를 제공하여 시행착오를 줄였습니다.</p><h2>03. Project Impact</h2><ul><li><strong>미디어 인정:</strong> 앱스토리 2016년 4월호 '독창적 인디게임' 선정</li><li><strong>교육적 가치:</strong> 빛의 3원색 원리를 게임으로 자연스럽게 학습</li></ul><h2>04. Technical Identity</h2><p>과학 원리를 게임 메커니즘으로 변환하는 설계 능력과, 미디어가 주목한 독창적 컨셉 기획력을 입증했습니다.</p>`,
    "%TINT%빛의 3원색%",
  ],
  [
    "Korean Alphabet Puzzle — ㄱ to ㅎ",
    "한글 자음을 조합하여 ㄱ에서 ㅎ까지 완성하는 퍼즐 게임",
    `<h2>01. Strategic Overview</h2><p>Letters Mania의 한글 버전으로, 같은 한글 자음을 연결하여 다음 자음으로 진화시키는 조합 퍼즐 게임입니다.</p><h2>02. Core Game Design & Engineering</h2><h3>A. 한글 자음 순서 체계 적용</h3><p><strong>Problem:</strong> 한글 자음 14자는 진화 단계가 짧아 게임 깊이가 부족할 수 있었습니다.</p><p><strong>Solution:</strong> 보드 크기를 축소하고 쌍자음을 보너스 요소로 활용하여 전략성을 추가했습니다.</p><h2>03. Project Impact</h2><ul><li><strong>로컬라이징:</strong> 글로벌 퍼즐 포맷을 한국어 문화에 맞게 재해석</li></ul><h2>04. Technical Identity</h2><p>검증된 글로벌 게임 메커니즘을 한국어 문자 체계에 최적화한 문화 맞춤형 게임 개발 역량을 보여줍니다.</p>`,
    "%한글퍼즐%ㄱ에서%",
  ],
  [
    "GET Z — Alphabet Chain Puzzle",
    "같은 알파벳 3개를 연결하여 최종 목표 Z를 만드는 극강 난이도 퍼즐",
    `<h2>01. Strategic Overview</h2><p>같은 알파벳 3개 이상을 연결하면 다음 알파벳이 생성되는 조합 퍼즐 게임입니다. 최종 목표는 Z를 만드는 것입니다.</p><h2>02. Core Game Design & Engineering</h2><h3>A. 26단계 진화 밸런싱</h3><p><strong>Problem:</strong> 26단계 진화는 기하급수적 블록 수를 요구하여 달성 불가능한 난이도가 될 위험이 있었습니다.</p><p><strong>Solution:</strong> 4개 이상 연결 시 보너스 점프 메커니즘과 특수 아이템으로 전략적 돌파구를 제공합니다.</p><h2>03. Project Impact</h2><ul><li><strong>도전 설계:</strong> Z 달성이라는 최종 목표로 장기 몰입 유도</li></ul><h2>04. Technical Identity</h2><p>극강 난이도와 플레이어 동기 부여 사이의 균형을 정밀하게 설계한 퍼즐 게임 밸런싱 역량을 보여줍니다.</p>`,
    "%GET Z%알파벳 조합%",
  ],
  [
    "COLORIS MATRIX — Block Color Puzzle",
    "제한된 공간에 블록을 배치하여 최고 점수를 달성하는 색상 퍼즐",
    `<h2>01. Strategic Overview</h2><p>제한된 매트릭스 공간에 다양한 색상의 블록을 전략적으로 배치하여 최고 점수를 달성하는 퍼즐 게임입니다.</p><h2>02. Core Game Design & Engineering</h2><h3>A. 터치 제스처 분리</h3><p><strong>Problem:</strong> 회전(탭)과 이동(롱프레스)을 하나의 터치 입력에서 정확히 구분해야 했습니다.</p><p><strong>Solution:</strong> 터치 지속 시간 임계값과 이동 거리 기반 제스처 판정 로직과 햅틱 피드백을 구현했습니다.</p><h2>03. Project Impact</h2><ul><li><strong>전략 다양성:</strong> 색상+공간 복합 전략 요소로 리플레이 가치 확보</li></ul><h2>04. Technical Identity</h2><p>모바일 터치 입력의 정밀한 제스처 구분과 다층적 퍼즐 스코어링 시스템 설계 역량을 보여줍니다.</p>`,
    "%COLORIS MATRIX%",
  ],
  [
    "2048 X PLUS — Extreme Difficulty 2048",
    "4단계 난이도와 커스텀 테마를 지원하는 업그레이드 2048 퍼즐",
    `<h2>01. Strategic Overview</h2><p>클래식 2048을 4단계 난이도(Easy, Normal, Hard, Expert)와 커스텀 테마 시스템으로 확장한 업그레이드 버전입니다.</p><h2>02. Core Game Design & Engineering</h2><h3>A. 4단계 난이도 시스템</h3><p><strong>Problem:</strong> 기존 2048은 단일 난이도로 초보자에겐 어렵고 고수에겐 반복적이었습니다.</p><p><strong>Solution:</strong> 보드 크기, 새 타일 생성 규칙, 목표 숫자를 변수화하여 4단계 난이도를 구성했습니다.</p><h2>03. Project Impact</h2><ul><li><strong>접근성 확대:</strong> Easy 모드로 입문 장벽을 낮추고 Expert로 도전 욕구 충족</li></ul><h2>04. Technical Identity</h2><p>검증된 게임 포맷에 난이도 세분화와 비주얼 커스터마이징을 체계적으로 확장한 설계 역량을 보여줍니다.</p>`,
    "%2048 X PLUS%",
  ],
  [
    "Ultimate Sudoku",
    "4단계 난이도와 심플 인터페이스를 갖춘 정통 스도쿠 퍼즐",
    `<h2>01. Strategic Overview</h2><p>4단계 난이도(Easy, Normal, Hard, Expert)를 지원하는 정통 스도쿠 퍼즐 게임입니다.</p><h2>02. Core Game Design & Engineering</h2><h3>A. 스도쿠 퍼즐 생성 알고리즘</h3><p><strong>Problem:</strong> 난이도별로 유일해를 보장하면서도 풀이 과정이 흥미로운 퍼즐을 자동 생성해야 했습니다.</p><p><strong>Solution:</strong> 역추적 알고리즘으로 숫자를 제거하되, 매 단계마다 유일해 검증을 수행하는 생성 엔진을 구현했습니다.</p><h2>03. Project Impact</h2><ul><li><strong>퍼즐 품질:</strong> 유일해 보장 알고리즘으로 공정한 풀이 경험 제공</li></ul><h2>04. Technical Identity</h2><p>수학적 알고리즘 기반 퍼즐 생성과 미니멀 UX 설계의 조화를 보여주는 프로젝트입니다.</p>`,
    "%최강 스도쿠%",
  ],
  [
    "STAY ON THE PIANO LINE — Maze Escape",
    "흰색 선을 따라 미로를 탈출하는 집중력 게임",
    `<h2>01. Strategic Overview</h2><p>피아노 건반 위의 흰색 선을 따라 미로를 탈출하는 집중력 게임입니다. 무한으로 생성되는 미로와 점진적 속도 증가가 긴장감을 높입니다.</p><h2>02. Core Game Design & Engineering</h2><h3>A. 무한 미로 절차적 생성</h3><p><strong>Problem:</strong> 매번 새로운 미로를 제공하면서도 항상 탈출 가능한 경로를 보장해야 했습니다.</p><p><strong>Solution:</strong> 실시간으로 미로 세그먼트를 절차적 생성하고 경로 연결성을 검증하는 알고리즘을 구현했습니다.</p><h2>03. Project Impact</h2><ul><li><strong>무한 콘텐츠:</strong> 절차적 생성으로 매번 새로운 미로 경험 제공</li></ul><h2>04. Technical Identity</h2><p>절차적 콘텐츠 생성과 정밀한 난이도 곡선 설계가 결합된 프로젝트입니다.</p>`,
    "%STAY ON THE PIANO%",
  ],
  [
    "2048 NUMBER PUZZLE",
    "기본+극강 난이도와 다크/라이트 테마를 지원하는 2048 퍼즐",
    `<h2>01. Strategic Overview</h2><p>클래식 2048에 극강 난이도 모드와 다크/라이트 테마 전환을 추가한 넘버 퍼즐 게임입니다.</p><h2>02. Core Game Design & Engineering</h2><h3>A. 듀얼 난이도 모드</h3><p><strong>Problem:</strong> 기본 2048의 단일 규칙만으로는 숙련 플레이어의 장기 이탈을 막기 어려웠습니다.</p><p><strong>Solution:</strong> 극강 모드(축소 보드, 높은 4타일 확률, 제한 시간)를 추가했습니다.</p><h2>03. Project Impact</h2><ul><li><strong>사용자 편의:</strong> 다크 모드로 야간 플레이 환경 개선</li></ul><h2>04. Technical Identity</h2><p>사용자 환경 적응형 UI와 난이도 확장 설계를 통해 클래식 게임의 완성도를 높인 프로젝트입니다.</p>`,
    "%2048 NUMBER PUZZLE%",
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
