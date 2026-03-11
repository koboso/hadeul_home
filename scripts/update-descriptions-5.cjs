const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);

const update = db.prepare(
  "UPDATE portfolio SET title=?, description=?, detail=? WHERE title LIKE ?"
);

const entries = [
  [
    "전파·전자파 금속 탐지기",
    "자력계(Magnetometer) 센서를 활용한 실시간 전자기장 감지 및 금속 탐지 유틸리티",
    `<h2>01. Strategic Overview (전략적 개요)</h2><p>전파·전자파 금속 탐지기는 안드로이드 디바이스에 내장된 자력계(Magnetometer) 센서의 원시 데이터를 실시간으로 분석하여 주변 전자기장 변화를 시각적·청각적으로 표현하는 유틸리티 앱입니다. 전문 장비 없이도 일상에서 금속 탐지 및 전자파 측정이 가능하도록 센서 API를 고도화하였으며, 실시간 그래프 렌더링과 사운드 피드백을 결합하여 직관적인 탐지 경험을 제공합니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 자력계 센서 데이터 처리 파이프라인</h3><p><strong>Problem:</strong> 자력계 센서의 원시 데이터는 디바이스 방향, 주변 자기장, 하드웨어 편차에 따라 노이즈가 심하여 정확한 금속 탐지 판정이 어려웠습니다.</p><p><strong>Solution:</strong> Low-pass 필터와 칼만 필터를 조합한 다단계 노이즈 제거 파이프라인을 구현했습니다. SensorManager의 SENSOR_DELAY_FASTEST 모드로 최대 샘플링 레이트를 확보하고, 3축(X, Y, Z) 자기장 벡터의 크기(magnitude)를 실시간 계산하여 기준선 대비 변화량으로 금속 근접도를 판정합니다. 캘리브레이션 단계에서 환경 자기장 기준선을 자동 설정하여 정밀도를 높였습니다.</p><h3>B. 실시간 시각·청각 피드백 시스템</h3><p><strong>Problem:</strong> 수치 데이터만으로는 사용자가 금속의 위치와 거리를 직관적으로 파악하기 어려웠습니다.</p><p><strong>Solution:</strong> 자기장 강도를 실시간 바 그래프와 파형 그래프로 동시에 렌더링하고, 감지 강도에 비례하여 주파수와 간격이 변하는 비프음 피드백을 구현했습니다. Canvas 기반 커스텀 뷰로 60fps 그래프 갱신을 유지하면서도 배터리 소모를 최소화하는 적응형 렌더링 주기를 적용했습니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>센서 API 심화 활용:</strong> 안드로이드 하드웨어 센서의 원시 데이터를 직접 처리하는 파이프라인 설계 능력 입증</li><li><strong>실시간 데이터 시각화:</strong> 고주파 센서 데이터를 지연 없이 그래프로 렌더링하는 성능 최적화 기술 확보</li><li><strong>실용적 가치:</strong> 벽 속 배관이나 배선 탐지, 분실 금속 물체 찾기 등 일상 활용 시나리오 지원</li></ul><h2>04. Technical Identity</h2><p>모바일 디바이스의 하드웨어 센서를 전문 계측 도구 수준으로 활용하는 기술력과, 원시 데이터를 사용자 친화적 인터페이스로 변환하는 UX 설계 역량을 동시에 보여주는 프로젝트입니다.</p>`,
    "%금속 탐지기%",
  ],
  [
    "FLASH LIGHT FREE — 플래시라이트 LED",
    "카메라 Flash LED 및 스크린 라이트를 활용한 고기능 손전등 유틸리티",
    `<h2>01. Strategic Overview (전략적 개요)</h2><p>FLASH LIGHT FREE는 안드로이드 디바이스의 카메라 Flash LED를 제어하여 손전등 기능을 제공하는 유틸리티 앱입니다. 단순 점등을 넘어 SOS 모스 부호, 스트로브 효과, 스크린 라이트 모드 등 다양한 조명 모드를 지원하며, Camera API와 Camera2 API의 호환성 처리를 통해 광범위한 디바이스를 지원합니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. Flash LED 제어 및 디바이스 호환성</h3><p><strong>Problem:</strong> 안드로이드의 Flash LED 제어 방식이 API 레벨과 제조사별로 상이하여 Camera API(deprecated)와 Camera2 API를 모두 대응해야 했습니다. 일부 디바이스에서는 Flash 점등 시 카메라 세션 유지가 필요한 반면, 다른 디바이스에서는 CameraManager.setTorchMode()로 직접 제어가 가능했습니다.</p><p><strong>Solution:</strong> API 레벨 감지 후 Camera2 API(Android 6.0+)와 레거시 Camera API를 분기 처리하는 어댑터 패턴을 구현했습니다. CameraManager.TorchCallback을 등록하여 다른 앱의 플래시 사용 상태를 감지하고 충돌을 방지하며, 세션 관리와 자원 해제를 생명주기에 맞춰 철저히 처리했습니다.</p><h3>B. 다중 조명 모드 타이머 엔진</h3><p><strong>Problem:</strong> SOS 모스 부호(· · · — — — · · ·)와 스트로브 효과는 밀리초 단위의 정밀한 점멸 타이밍이 필요하며, 백그라운드 전환 시에도 패턴이 유지되어야 했습니다.</p><p><strong>Solution:</strong> Handler와 Runnable 기반의 정밀 타이머 엔진을 구현하여 모스 부호 패턴의 단점(dit), 장점(dah), 간격을 국제 표준 비율(1:3:1:3:7)로 재현했습니다. 스트로브 모드에서는 사용자가 주파수(Hz)를 슬라이더로 조절할 수 있으며, WakeLock을 활용하여 화면 꺼짐 시에도 플래시 동작을 보장합니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>하드웨어 제어:</strong> 카메라 하드웨어 직접 제어와 API 버전별 분기 처리 능력 입증</li><li><strong>광범위 호환성:</strong> 다양한 제조사·API 레벨 디바이스에서 안정 동작 보장</li><li><strong>배터리 최적화:</strong> WakeLock과 서비스 생명주기를 적절히 관리하여 불필요한 전력 소모 방지</li></ul><h2>04. Technical Identity</h2><p>안드로이드 카메라 하드웨어 API의 파편화를 체계적으로 해결하고, 정밀 타이밍 제어를 구현한 플랫폼 심화 프로젝트입니다.</p>`,
    "%FLASH LIGHT FREE%",
  ],
  [
    "SMART RULER — 스마트폰 자/줄자",
    "터치 좌표 기반 DPI 보정 정밀 눈금자 및 줄자 측정 유틸리티",
    `<h2>01. Strategic Overview (전략적 개요)</h2><p>SMART RULER는 스마트폰 화면을 실물 크기의 자(Ruler)로 변환하여 물체의 길이를 측정하는 유틸리티 앱입니다. 디바이스별 화면 DPI(Dots Per Inch)를 정밀 보정하여 실제 cm/inch 단위의 정확한 측정을 가능하게 하며, 줄자 모드에서는 화면 길이를 초과하는 물체도 연속 스와이프로 측정할 수 있습니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. DPI 기반 실물 크기 보정 시스템</h3><p><strong>Problem:</strong> DisplayMetrics.xdpi/ydpi 값이 제조사마다 부정확하게 보고되어, API 제공 값만으로는 실물 크기 눈금을 정확히 렌더링할 수 없었습니다.</p><p><strong>Solution:</strong> 기본값으로 시스템 DPI를 사용하되, 사용자가 실물 신용카드나 동전 등 표준 크기 물체로 직접 캘리브레이션할 수 있는 보정 UI를 제공합니다. 보정 계수를 SharedPreferences에 저장하여 재실행 시에도 정밀도를 유지하며, 인기 디바이스 모델별 사전 보정 데이터베이스도 내장하여 초기 정확도를 높였습니다.</p><h3>B. 줄자 모드 — 연속 스와이프 측정</h3><p><strong>Problem:</strong> 화면 크기를 초과하는 물체를 측정하려면 여러 번의 측정값을 정확히 누적해야 했으며, 스와이프 도중 미세한 터치 떨림으로 측정 오차가 발생했습니다.</p><p><strong>Solution:</strong> 터치 이벤트의 ACTION_MOVE 좌표를 Low-pass 필터로 안정화하고, 스와이프 시작/끝 지점의 좌표 차이를 DPI 보정값으로 변환하여 누적합니다. 측정 구간마다 햅틱 피드백과 시각적 마커를 제공하여 연속 측정의 정확성을 보장합니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>정밀 측정:</strong> 캘리브레이션 시스템으로 디바이스별 하드웨어 편차를 소프트웨어로 극복</li><li><strong>UX 혁신:</strong> 줄자 모드로 화면 크기의 물리적 한계를 터치 인터랙션으로 해결</li><li><strong>실용성:</strong> 건축, 인테리어, DIY 현장에서 간이 측정 도구로 즉시 활용 가능</li></ul><h2>04. Technical Identity</h2><p>디바이스 하드웨어 스펙의 부정확성을 소프트웨어 캘리브레이션으로 해결하고, 물리적 한계를 UX 설계로 극복하는 문제 해결 역량을 입증한 프로젝트입니다.</p>`,
    "%SMART RULER%",
  ],
  [
    "LED 디지털 탁상 시계",
    "LED 세그먼트 디스플레이 감성의 커스터마이징 디지털 시계 위젯",
    `<h2>01. Strategic Overview (전략적 개요)</h2><p>LED 디지털 탁상 시계는 스마트폰을 7-segment LED 디스플레이 스타일의 탁상 시계로 변환하는 유틸리티 앱입니다. 다양한 LED 색상과 배경 테마, 12/24시간 표시, 날짜·요일·초 표시 등 풍부한 커스터마이징 옵션을 제공하며, 화면 밝기 자동 조절과 번인(Burn-in) 방지 기능으로 장시간 상시 표시에 최적화되었습니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 7-Segment LED 커스텀 렌더링 엔진</h3><p><strong>Problem:</strong> 시스템 폰트로는 실제 LED 세그먼트의 질감과 발광 효과를 재현할 수 없었으며, 다양한 화면 비율에서 일관된 레이아웃을 유지해야 했습니다.</p><p><strong>Solution:</strong> 각 숫자를 7개 세그먼트 Path로 분해하여 Canvas에 직접 그리는 커스텀 뷰를 구현했습니다. 세그먼트별 그라디언트와 글로우(Glow) 효과로 LED 발광 질감을 재현하고, 비활성 세그먼트에 반투명 잔상을 표시하여 실제 LED 디스플레이의 시각적 특성을 정밀하게 구현했습니다. 화면 비율에 따라 세그먼트 크기와 간격을 동적으로 재계산합니다.</p><h3>B. 상시 표시 최적화 및 번인 방지</h3><p><strong>Problem:</strong> 탁상 시계로 장시간 사용 시 OLED 패널의 번인(Burn-in)과 과도한 배터리 소모가 우려되었습니다.</p><p><strong>Solution:</strong> 일정 주기로 시계 위치를 미세하게 이동시키는 번인 방지 알고리즘을 적용하고, 조도 센서(Light Sensor) 데이터를 기반으로 화면 밝기를 자동 조절합니다. 충전 중 감지 시 자동 상시 표시 모드를 활성화하고, 배터리 구동 시에는 화면 밝기를 최소화하는 전력 관리 로직을 구현했습니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>커스텀 렌더링:</strong> Canvas API를 활용한 정밀한 그래픽 효과 구현 능력 입증</li><li><strong>하드웨어 인식:</strong> 조도 센서, 충전 상태 등 시스템 이벤트를 활용한 적응형 동작 구현</li><li><strong>장시간 안정성:</strong> 상시 표시 환경에서의 메모리 누수 방지와 전력 관리 최적화</li></ul><h2>04. Technical Identity</h2><p>커스텀 Canvas 렌더링과 센서 기반 적응형 시스템을 결합하여, 단순 시계를 넘어선 완성도 높은 상시 표시 앱의 설계 역량을 보여주는 프로젝트입니다.</p>`,
    "%LED 디지털 탁상 시계%",
  ],
  [
    "EASY 전광판 SCROLLER",
    "사용자 입력 텍스트를 LED 전광판 스타일로 스크롤링하는 메시지 디스플레이 앱",
    `<h2>01. Strategic Overview (전략적 개요)</h2><p>EASY 전광판 SCROLLER는 사용자가 입력한 텍스트를 LED 전광판 스타일로 화면에 스크롤링 표시하는 유틸리티 앱입니다. 콘서트, 스포츠 경기장, 매장 홍보 등 다양한 현장에서 간이 전광판으로 활용할 수 있으며, 글꼴 크기·색상·스크롤 속도·배경색 등 풍부한 커스터마이징을 지원합니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 부드러운 텍스트 스크롤링 엔진</h3><p><strong>Problem:</strong> 대형 폰트의 텍스트를 픽셀 단위로 매끄럽게 수평 스크롤하면서 60fps를 유지해야 했으며, 텍스트 길이에 따라 스크롤 속도와 루프 처리가 달라져야 했습니다.</p><p><strong>Solution:</strong> SurfaceView 기반 전용 렌더링 스레드를 구현하여 UI 스레드와 분리된 독립적 그리기 루프를 운영합니다. ValueAnimator로 스크롤 오프셋을 보간하고, 텍스트가 화면 끝에 도달하면 원점으로 심리스 루프를 수행합니다. 사용자가 터치로 스크롤 속도를 실시간 조절할 수 있는 제스처 인터랙션도 지원합니다.</p><h3>B. LED 도트 매트릭스 효과</h3><p><strong>Problem:</strong> 일반 폰트 렌더링으로는 실제 LED 전광판의 도트 매트릭스 질감을 표현할 수 없었습니다.</p><p><strong>Solution:</strong> 텍스트를 오프스크린 비트맵에 먼저 렌더링한 후, 픽셀 단위로 샘플링하여 원형 도트로 재그리는 후처리 파이프라인을 구현했습니다. 도트 간격과 크기를 조절하여 LED 전광판의 시각적 특성을 재현하며, 글로우 효과를 추가하여 발광 느낌을 완성합니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>성능 최적화:</strong> SurfaceView 기반 독립 렌더링으로 복잡한 그래픽 효과에서도 60fps 유지</li><li><strong>현장 활용성:</strong> 콘서트장, 매장 등 실제 현장에서 즉시 전광판 대체 가능</li><li><strong>커스터마이징:</strong> 색상, 속도, 글꼴 등 모든 시각적 요소를 사용자 맞춤 설정 가능</li></ul><h2>04. Technical Identity</h2><p>SurfaceView 기반 고성능 렌더링과 비트맵 후처리 기법을 결합하여, 실시간 그래픽 처리 능력과 시각적 완성도를 동시에 입증한 프로젝트입니다.</p>`,
    "%EASY 전광판 SCROLLER%",
  ],
  [
    "안드로이드 수평계",
    "가속도계·자이로스코프 센서 융합 기반 정밀 디지털 수평계",
    `<h2>01. Strategic Overview (전략적 개요)</h2><p>안드로이드 수평계는 디바이스의 가속도계(Accelerometer)와 자이로스코프(Gyroscope) 센서 데이터를 융합하여 표면의 기울기를 정밀하게 측정하는 유틸리티 앱입니다. 기포식 수평계의 직관적 UI를 디지털로 재현하면서도, 각도 수치 표시와 캘리브레이션 기능으로 전문 도구 수준의 정밀도를 제공합니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 센서 융합(Sensor Fusion) 알고리즘</h3><p><strong>Problem:</strong> 가속도계 단독 사용 시 진동과 순간적 가속에 의한 노이즈가 심하고, 자이로스코프 단독 사용 시 시간 경과에 따른 드리프트(drift)가 누적되어 정확도가 떨어졌습니다.</p><p><strong>Solution:</strong> 상보 필터(Complementary Filter)를 구현하여 가속도계의 장기적 안정성과 자이로스코프의 단기적 정밀성을 결합했습니다. 가속도계 데이터에 Low-pass 필터(α=0.8)를 적용하여 중력 벡터를 추출하고, 자이로스코프의 각속도를 적분하여 단기 회전을 계산한 뒤, 두 값을 가중 합산(95:5 비율)하여 안정적인 기울기 값을 산출합니다.</p><h3>B. 기포식 수평계 물리 시뮬레이션 UI</h3><p><strong>Problem:</strong> 디지털 각도 수치만으로는 사용자가 수평 상태를 직관적으로 판단하기 어려웠으며, 기포의 움직임이 실제 수평계의 유체 역학적 움직임과 달라 어색했습니다.</p><p><strong>Solution:</strong> Canvas 기반 커스텀 뷰에서 기포를 감쇠 스프링(Damped Spring) 물리 모델로 시뮬레이션하여 관성과 저항감이 있는 자연스러운 기포 움직임을 구현했습니다. 수평에 근접할수록 기포 색상이 녹색으로 전환되고 햅틱 진동으로 수평 도달을 알리며, 1축·2축 모드와 360도 전방위 모드를 제공합니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>센서 융합 기술:</strong> 복수 센서의 장단점을 상보적으로 결합하는 고급 신호 처리 역량 입증</li><li><strong>물리 시뮬레이션:</strong> 감쇠 스프링 모델로 실제 도구의 촉감적 경험을 디지털로 재현</li><li><strong>실용성:</strong> 가구 배치, 액자 걸기, 공사 현장 등 일상적 수평 측정 수요 충족</li></ul><h2>04. Technical Identity</h2><p>다중 센서 융합 알고리즘과 물리 기반 UI 시뮬레이션을 결합하여, 모바일 센서 프로그래밍의 전문성과 자연스러운 UX 구현 능력을 동시에 보여주는 프로젝트입니다.</p>`,
    "%수평계%",
  ],
  [
    "손전등 + 돋보기",
    "카메라 Flash LED 손전등과 카메라 줌 기반 돋보기를 결합한 복합 유틸리티",
    `<h2>01. Strategic Overview (전략적 개요)</h2><p>손전등 + 돋보기는 카메라 Flash LED 손전등 기능과 카메라 실시간 프리뷰 기반 디지털 돋보기 기능을 하나의 앱으로 통합한 복합 유틸리티입니다. 어두운 환경에서 작은 글씨를 읽어야 하는 실제 사용 시나리오를 반영하여, 손전등과 돋보기를 동시에 활성화할 수 있는 듀얼 모드를 지원합니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. Flash LED + 카메라 프리뷰 동시 제어</h3><p><strong>Problem:</strong> Flash LED 점등과 카메라 프리뷰를 동시에 운영하려면 단일 카메라 세션에서 두 기능을 충돌 없이 관리해야 했습니다. Camera API에서 Flash LED를 Torch 모드로 설정하면 프리뷰 품질이 저하되는 디바이스가 있었습니다.</p><p><strong>Solution:</strong> Camera2 API의 CaptureRequest.Builder에서 FLASH_MODE_TORCH와 프리뷰 스트림을 동일 세션에 바인딩하여 동시 동작을 보장합니다. 디바이스별 Flash 밝기 제한을 감지하고, 프리뷰 노출(Exposure)을 자동 보정하여 Flash 점등 시에도 과다 노출 없는 선명한 돋보기 화면을 유지합니다.</p><h3>B. 핀치 줌 & 디지털 확대 시스템</h3><p><strong>Problem:</strong> 카메라의 광학 줌 한계를 넘어서는 디지털 확대 시 화질 저하가 심했으며, 핀치 제스처의 확대 비율이 자연스럽지 않았습니다.</p><p><strong>Solution:</strong> ScaleGestureDetector로 핀치 줌 비율을 감지하고, Camera2 API의 SCALER_CROP_REGION을 동적으로 조절하여 하드웨어 수준의 디지털 줌을 구현합니다. 줌 비율에 로그 스케일을 적용하여 저배율에서는 세밀하게, 고배율에서는 빠르게 확대되는 자연스러운 줌 커브를 구현했습니다. 최대 배율에서는 비트맵 업스케일링과 샤프닝 필터를 적용하여 가독성을 유지합니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>카메라 API 심화:</strong> Flash와 프리뷰의 동시 제어라는 고급 카메라 세션 관리 기술 확보</li><li><strong>실용적 통합:</strong> 두 가지 유틸리티를 자연스럽게 결합하여 실제 사용 편의성 극대화</li><li><strong>접근성:</strong> 시력이 약한 사용자를 위한 일상 보조 도구로서의 사회적 가치</li></ul><h2>04. Technical Identity</h2><p>Camera2 API의 고급 세션 관리와 실시간 이미지 처리를 결합하고, 사용자의 실제 니즈를 반영한 기능 통합 설계 역량을 입증한 프로젝트입니다.</p>`,
    "%손전등%돋보기%",
  ],
  [
    "안드로이드 돋보기",
    "카메라 실시간 프리뷰 기반 디지털 확대경 유틸리티",
    `<h2>01. Strategic Overview (전략적 개요)</h2><p>안드로이드 돋보기는 후면 카메라의 실시간 프리뷰를 활용하여 작은 글씨나 물체를 확대해서 볼 수 있는 디지털 확대경 앱입니다. 핀치 줌과 버튼 줌의 이중 조작 방식을 제공하고, 자동 초점(AF)과 수동 초점 전환, 화면 고정(Freeze) 기능 등 세밀한 돋보기 경험을 구현합니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 실시간 카메라 프리뷰 최적화</h3><p><strong>Problem:</strong> 고해상도 카메라 프리뷰를 실시간 확대 표시할 때 프레임 드롭과 발열이 발생하며, 다양한 디바이스의 카메라 해상도와 비율이 상이하여 일관된 프리뷰 품질을 보장하기 어려웠습니다.</p><p><strong>Solution:</strong> 디바이스의 지원 해상도 목록을 조회하여 화면 비율에 최적인 프리뷰 해상도를 자동 선택하는 로직을 구현했습니다. TextureView를 사용하여 하드웨어 가속 렌더링을 활용하고, 프리뷰 콜백의 처리 부하를 최소화하여 안정적인 30fps 이상의 프레임 레이트를 유지합니다.</p><h3>B. 화면 고정 및 밝기·대비 조절</h3><p><strong>Problem:</strong> 확대 상태에서 손 떨림으로 인해 대상을 정확히 관찰하기 어려웠으며, 조명 환경에 따라 가독성이 크게 달라졌습니다.</p><p><strong>Solution:</strong> 터치 한 번으로 현재 프리뷰 프레임을 캡처하여 화면에 고정(Freeze)하는 기능을 구현하고, 고정된 이미지에 밝기·대비·채도 슬라이더를 제공하여 ColorMatrix 기반 실시간 이미지 보정을 지원합니다. 자동 초점 고정(AF Lock)으로 줌 조작 중 초점이 흔들리는 문제도 해결했습니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>카메라 최적화:</strong> 디바이스별 해상도 자동 매칭과 하드웨어 가속 렌더링으로 범용 성능 확보</li><li><strong>사용성:</strong> 화면 고정, AF Lock, 이미지 보정 등 실제 돋보기 사용 패턴을 반영한 기능 설계</li><li><strong>접근성:</strong> 고령자 및 시각 보조가 필요한 사용자를 위한 실용적 도구</li></ul><h2>04. Technical Identity</h2><p>카메라 프리뷰 파이프라인 최적화와 실시간 이미지 처리 기술을 결합하여, 단순 기능에도 깊이 있는 기술적 완성도를 추구하는 개발 철학을 보여주는 프로젝트입니다.</p>`,
    "%안드로이드 돋보기%",
  ],
  [
    "거울 어플",
    "전면 카메라 기반 좌우 반전 디지털 거울 유틸리티",
    `<h2>01. Strategic Overview (전략적 개요)</h2><p>거울 어플은 전면 카메라의 실시간 프리뷰를 활용하여 스마트폰을 디지털 거울로 변환하는 유틸리티 앱입니다. 좌우 반전(미러링) 처리로 실제 거울과 동일한 시각 경험을 제공하며, 확대·축소, 밝기 조절, 화면 고정(캡처), Flash LED 조명 기능을 통해 단순 거울 이상의 활용성을 구현합니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 좌우 반전(미러링) 프리뷰 렌더링</h3><p><strong>Problem:</strong> 전면 카메라 프리뷰는 기본적으로 거울상(미러)으로 표시되지만, 일부 디바이스와 API 레벨에서 반전 동작이 일관되지 않아 사용자 기대와 다른 결과가 나타났습니다. 또한 사진 캡처 시에는 반전이 해제되어 촬영 결과가 프리뷰와 달라지는 문제가 있었습니다.</p><p><strong>Solution:</strong> TextureView의 Matrix 변환을 활용하여 수평 반전을 강제 적용하고, 디바이스별 기본 미러링 상태를 감지하여 이중 반전을 방지합니다. 캡처 시에도 동일한 반전 변환을 비트맵에 적용하여 프리뷰와 일관된 결과물을 저장합니다.</p><h3>B. 거울 확대·밝기 보정 시스템</h3><p><strong>Problem:</strong> 거울 용도에서는 얼굴 특정 부위를 세밀하게 확인하고 싶은 니즈가 있으며, 실내 조명에 따라 카메라 프리뷰가 어둡게 표시되어 거울 기능이 저하되었습니다.</p><p><strong>Solution:</strong> 핀치 줌으로 최대 4배까지 확대할 수 있으며, AE(Auto Exposure) 보정값을 슬라이더로 조절하여 어두운 환경에서도 밝은 프리뷰를 유지합니다. 전면 Flash가 없는 디바이스에서는 화면 밝기를 최대로 올려 스크린 라이트 역할을 수행하는 소프트웨어 조명 기능도 구현했습니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>카메라 제어:</strong> 전면 카메라의 미러링, 노출, 줌을 세밀하게 제어하는 기술 확보</li><li><strong>디바이스 호환:</strong> 디바이스별 상이한 미러링 동작을 소프트웨어로 통일하는 호환성 처리</li><li><strong>일상 활용:</strong> 화장, 외출 준비 등 매일 사용하는 필수 유틸리티로서의 가치</li></ul><h2>04. Technical Identity</h2><p>전면 카메라의 렌더링 파이프라인을 세밀하게 제어하고, 디바이스 간 동작 차이를 소프트웨어로 추상화하는 플랫폼 대응 능력을 보여주는 프로젝트입니다.</p>`,
    "%거울 어플%",
  ],
  [
    "메트로놈",
    "고정밀 오디오 타이밍 엔진 기반 디지털 메트로놈",
    `<h2>01. Strategic Overview (전략적 개요)</h2><p>메트로놈은 음악 연습에 필수적인 박자기를 안드로이드 앱으로 구현한 유틸리티입니다. 정확한 BPM(Beats Per Minute) 타이밍이 핵심인 메트로놈 특성상, AudioTrack API를 활용한 저지연(Low-latency) 오디오 재생 시스템과 나노초 단위 타이밍 보정 알고리즘을 구현하여 전문 음악 연습에도 활용 가능한 정밀도를 달성했습니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 저지연 오디오 타이밍 엔진</h3><p><strong>Problem:</strong> MediaPlayer나 SoundPool 기반 오디오 재생은 수십~수백 밀리초의 지연이 발생하여, 빠른 BPM에서 박자가 밀리는 치명적인 결함이 있었습니다. 안드로이드의 오디오 지연(Audio Latency)은 디바이스마다 다르고, GC(Garbage Collection)에 의한 간헐적 끊김도 문제였습니다.</p><p><strong>Solution:</strong> AudioTrack의 MODE_STREAM으로 PCM 오디오 버퍼를 직접 기록하는 저수준 오디오 엔진을 구현했습니다. 별도의 고우선순위 오디오 스레드(android.os.Process.THREAD_PRIORITY_AUDIO)에서 동작하며, System.nanoTime() 기반 타이밍 보정으로 BPM 정확도를 ±1ms 이내로 유지합니다. 사전 생성된 PCM 클릭 샘플을 메모리에 상주시켜 GC 영향을 최소화했습니다.</p><h3>B. 다양한 박자 및 액센트 패턴</h3><p><strong>Problem:</strong> 실제 음악 연습에서는 4/4, 3/4, 6/8 등 다양한 박자와 강박·약박 구분이 필요하며, 단순 클릭음만으로는 박자 구분이 어려웠습니다.</p><p><strong>Solution:</strong> 박자표(Time Signature) 설정과 비트별 액센트 패턴 편집 기능을 구현하여, 강박에 높은 피치, 약박에 낮은 피치의 클릭음을 배정합니다. 시각적으로도 원형 비트 인디케이터가 현재 박자를 하이라이트하여, 청각·시각 동시 피드백을 제공합니다. BPM 탭 감지(Tap Tempo) 기능으로 원하는 속도를 터치로 직접 입력할 수 있습니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>오디오 정밀도:</strong> 저수준 AudioTrack API로 안드로이드 오디오 지연 문제를 근본적으로 해결</li><li><strong>실시간 처리:</strong> 고우선순위 스레드와 나노초 타이밍으로 실시간 오디오 애플리케이션의 기반 기술 확보</li><li><strong>음악 도구:</strong> 전문 연주자의 연습 도구로 활용 가능한 수준의 정밀도 달성</li></ul><h2>04. Technical Identity</h2><p>안드로이드 오디오 시스템의 저수준 제어와 실시간 타이밍 보정이라는 난제를 해결하여, 플랫폼의 기술적 한계를 극복하는 엔지니어링 역량을 보여주는 프로젝트입니다.</p>`,
    "%메트로놈%",
  ],
  [
    "안드로이드 LED 전광판",
    "대형 LED 도트 매트릭스 전광판 시뮬레이션 디스플레이 앱",
    `<h2>01. Strategic Overview (전략적 개요)</h2><p>안드로이드 LED 전광판은 스마트폰 화면을 대형 LED 전광판처럼 활용할 수 있는 디스플레이 앱입니다. EASY 전광판 SCROLLER의 확장판으로, 세로 스크롤·정지 표시·깜빡임 효과 등 다양한 표시 모드를 추가하고, LED 도트 매트릭스의 시각적 완성도를 한층 높여 실제 전광판에 가까운 표현력을 제공합니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. 다중 디스플레이 모드 아키텍처</h3><p><strong>Problem:</strong> 수평 스크롤, 수직 스크롤, 정지 표시, 깜빡임, 페이드 인/아웃 등 다양한 표시 모드를 하나의 렌더링 엔진에서 효율적으로 전환·관리해야 했습니다.</p><p><strong>Solution:</strong> Strategy 패턴 기반의 디스플레이 모드 아키텍처를 설계하여, 각 표시 모드를 독립된 렌더링 전략으로 캡슐화했습니다. 공통 인터페이스를 통해 모드 간 실시간 전환이 가능하며, 각 전략은 고유의 애니메이션 파라미터(속도, 방향, 반복 횟수)를 독립적으로 관리합니다. 새로운 모드 추가 시 기존 코드 수정 없이 전략 클래스만 추가하면 되는 확장성을 확보했습니다.</p><h3>B. 고해상도 LED 도트 렌더링 최적화</h3><p><strong>Problem:</strong> 수천 개의 LED 도트를 매 프레임 개별적으로 그리면 렌더링 성능이 크게 저하되었으며, 특히 긴 텍스트의 경우 도트 수가 기하급수적으로 증가했습니다.</p><p><strong>Solution:</strong> 화면에 보이는 영역만 선별적으로 렌더링하는 뷰포트 컬링(Viewport Culling)을 적용하고, 동일 색상의 도트를 배치 드로잉(Batch Drawing)으로 묶어 Canvas drawCircle 호출 횟수를 최소화했습니다. 오프스크린 비트맵 캐싱으로 정적 영역의 재렌더링을 방지하여 전체 프레임 레이트를 안정적으로 유지합니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>아키텍처 설계:</strong> Strategy 패턴 기반의 확장 가능한 렌더링 엔진 설계 역량 입증</li><li><strong>렌더링 최적화:</strong> 뷰포트 컬링과 배치 드로잉으로 대량 그래픽 요소의 성능 문제 해결</li><li><strong>시각적 완성도:</strong> LED 도트 매트릭스의 사실적 재현으로 실제 전광판 대체 가능</li></ul><h2>04. Technical Identity</h2><p>소프트웨어 아키텍처 패턴과 그래픽 렌더링 최적화를 결합하여, 확장 가능하고 고성능인 디스플레이 엔진을 설계하는 능력을 보여주는 프로젝트입니다.</p>`,
    "%안드로이드 LED 전광판%",
  ],
  [
    "손전등 + 시계",
    "카메라 Flash LED 손전등과 디지털 시계를 결합한 야간 특화 유틸리티",
    `<h2>01. Strategic Overview (전략적 개요)</h2><p>손전등 + 시계는 야간 환경에서 가장 자주 사용하는 두 기능—손전등과 시계—를 하나의 화면에 통합한 유틸리티 앱입니다. 잠에서 깨어 시간을 확인하면서 동시에 주변을 비춰야 하는 실제 사용 시나리오를 반영하여, Flash LED 제어와 저밝기 시계 표시를 동시에 제공합니다.</p><h2>02. System Architecture & Key Functions</h2><h3>A. Flash LED + 저밝기 시계 동시 운영</h3><p><strong>Problem:</strong> Flash LED 점등 중 시계 화면의 밝기가 높으면 암순응(Dark Adaptation)이 깨져 눈이 부시고, 반대로 화면이 너무 어두우면 시간을 읽기 어려웠습니다. 두 기능의 밝기 밸런스를 맞추는 것이 핵심 과제였습니다.</p><p><strong>Solution:</strong> 시계 표시에 OLED 친화적 순수 검정 배경과 최저 밝기 붉은색 폰트를 기본 적용하여 암순응을 보존합니다. WindowManager.LayoutParams.screenBrightness를 0.01~0.1 범위로 제어하는 미세 밝기 슬라이더를 구현하고, Flash 점등/소등 시 화면 밝기를 자동 조절하여 시인성과 눈부심 방지를 동시에 달성합니다.</p><h3>B. 원터치 조작 UX 설계</h3><p><strong>Problem:</strong> 야간에 잠이 덜 깬 상태에서 복잡한 UI 조작은 불가능하며, 최소한의 터치로 모든 기능이 작동해야 했습니다.</p><p><strong>Solution:</strong> 화면 전체를 하나의 거대한 버튼으로 활용하여 탭 한 번으로 Flash를 토글합니다. 더블 탭으로 시계 모드 전환(디지털/아날로그), 상하 스와이프로 화면 밝기 조절, 좌우 스와이프로 Flash 모드(연속/SOS/스트로브) 전환이 가능합니다. 모든 제스처는 진입 장벽을 최소화하되, 발견 가능성(Discoverability)을 위한 최초 실행 가이드 오버레이를 제공합니다.</p><h2>03. Project Impact & Scalability</h2><ul><li><strong>시나리오 기반 설계:</strong> 실제 사용 맥락(야간 기상)에서 출발한 기능 통합 사례</li><li><strong>인간공학적 UX:</strong> 암순응 보존, 미세 밝기 제어 등 인체 특성을 반영한 설계</li><li><strong>제스처 UX:</strong> 최소 조작으로 전 기능을 제어하는 직관적 제스처 체계 구현</li></ul><h2>04. Technical Identity</h2><p>사용자의 실제 환경과 신체적 조건을 깊이 고려한 UX 설계와, 하드웨어(Flash)·소프트웨어(시계)·시스템(밝기) 제어를 통합하는 시스템 레벨 개발 역량을 보여주는 프로젝트입니다.</p>`,
    "%손전등%시계%",
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
