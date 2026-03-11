const Database = require('better-sqlite3');
const db = new Database('data/hadeul.db');

// Styled flowchart HTML builder
function makeFlow(steps, color = 'purple') {
  const colors = {
    purple: { bg: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.4)', text: 'rgba(168,85,247,0.9)' },
    blue: { bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)', text: 'rgba(59,130,246,0.9)' },
    cyan: { bg: 'rgba(6,182,212,0.15)', border: 'rgba(6,182,212,0.4)', text: 'rgba(6,182,212,0.9)' },
    green: { bg: 'rgba(34,197,94,0.15)', border: 'rgba(34,197,94,0.4)', text: 'rgba(34,197,94,0.9)' },
    amber: { bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)', text: 'rgba(245,158,11,0.9)' },
    pink: { bg: 'rgba(236,72,153,0.15)', border: 'rgba(236,72,153,0.4)', text: 'rgba(236,72,153,0.9)' },
    red: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.4)', text: 'rgba(239,68,68,0.9)' },
  };
  const colorList = ['blue', 'purple', 'cyan', 'green', 'amber', 'pink'];

  let html = '<div style="display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;">';
  steps.forEach((step, i) => {
    const c = colors[colorList[i % colorList.length]];
    if (i > 0) html += '<div style="color:rgba(255,255,255,0.2);font-size:20px;">→</div>';
    html += `<div style="background:${c.bg};border:1px solid ${c.border};padding:12px 16px;border-radius:8px;text-align:center;min-width:110px;">`;
    html += `<div style="font-size:11px;color:rgba(255,255,255,0.4);">${step.label}</div>`;
    html += `<div style="color:white;font-weight:600;font-size:13px;">${step.value}</div>`;
    html += '</div>';
  });
  html += '</div>';
  return html;
}

// Two-row flow for more complex architectures
function makeTwoRowFlow(title1, steps1, title2, steps2) {
  return `<div style="display:flex;flex-direction:column;gap:16px;">` +
    (title1 ? `<div style="color:rgba(255,255,255,0.3);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">${title1}</div>` : '') +
    makeFlow(steps1) +
    (title2 ? `<div style="color:rgba(255,255,255,0.3);font-size:11px;text-transform:uppercase;letter-spacing:0.1em;margin-top:8px;">${title2}</div>` : '') +
    makeFlow(steps2) +
    '</div>';
}

// Define architectures for each project
const architectures = {
  // === BROKEN CHARTS (extract from detail, replace with styled) ===
  'ICT 스마트 예비군 훈련체계 태블릿': makeFlow([
    { label: 'INPUT', value: '출결 관리' },
    { label: 'PROCESS', value: '훈련 평가' },
    { label: 'TABLET', value: 'Android App' },
    { label: 'SERVER', value: 'REST API' },
    { label: 'DATABASE', value: 'MySQL' },
  ]),

  '축산악취 수집 및 통합 모니터링 통계 시스템': makeTwoRowFlow(
    'Data Collection',
    [
      { label: 'SENSOR', value: 'IoT 센서' },
      { label: 'GATEWAY', value: '데이터 수집기' },
      { label: 'SERVER', value: 'API 서버' },
      { label: 'DATABASE', value: '시계열 DB' },
    ],
    'Monitoring',
    [
      { label: 'DASHBOARD', value: '실시간 모니터링' },
      { label: 'STATISTICS', value: '통계 분석' },
      { label: 'ALERT', value: '기준치 알림' },
      { label: 'REPORT', value: '보고서 생성' },
    ]
  ),

  '딥러닝 기반 비정형 데이터(음성) 전사 시스템': makeTwoRowFlow(
    'Speech Pipeline',
    [
      { label: 'INPUT', value: '음성 파일' },
      { label: 'ASR ENGINE', value: 'Deep Learning' },
      { label: 'GCP STT', value: 'Google API' },
      { label: 'OUTPUT', value: '텍스트 변환' },
    ],
    'Web Platform',
    [
      { label: 'FRONTEND', value: 'PHP Web UI' },
      { label: 'BACKEND', value: 'Python API' },
      { label: 'REVIEW', value: '검수·교정' },
      { label: 'DATABASE', value: 'MySQL' },
    ]
  ),

  "충남대 음성인식 한글 교육 App '넙죽이와 졸렁이'": makeFlow([
    { label: 'SPEECH', value: '음성 인식' },
    { label: 'ANALYSIS', value: '발음 평가' },
    { label: 'GAME', value: '캐릭터 학습' },
    { label: 'CLIENT', value: 'Android App' },
    { label: 'SERVER', value: 'REST API' },
  ]),

  '한국효문화진흥원 자료관리 시스템': makeFlow([
    { label: 'INPUT', value: '자료 수집' },
    { label: 'CLASSIFY', value: '메타데이터 분류' },
    { label: 'STORAGE', value: '파일 저장소' },
    { label: 'SEARCH', value: '통합 검색' },
    { label: 'WEB', value: 'k-hyodb.kr' },
  ]),

  '여행 스케줄 작성 및 추천 웹 시스템': makeFlow([
    { label: 'USER INPUT', value: '여행 조건' },
    { label: 'RECOMMEND', value: '추천 엔진' },
    { label: 'SCHEDULE', value: '일정 생성' },
    { label: 'MAP', value: '지도 연동' },
    { label: 'WEB', value: '반응형 UI' },
  ]),

  'FIBERPRO 다국어 홈페이지': makeFlow([
    { label: 'FRONTEND', value: 'Multi-Lang UI' },
    { label: 'CMS', value: '콘텐츠 관리' },
    { label: 'IR', value: '투자 정보' },
    { label: 'CATALOG', value: '제품 카탈로그' },
    { label: 'SERVER', value: 'Web Server' },
  ]),

  // === NO_CHART entries — generate new architectures ===

  '선박운항 시뮬레이터 시작품 제작': makeTwoRowFlow(
    'Simulation Engine',
    [
      { label: 'SENSOR', value: '항해 데이터' },
      { label: '3D ENGINE', value: '시뮬레이션' },
      { label: 'PHYSICS', value: '물리 엔진' },
      { label: 'RENDER', value: '실시간 렌더' },
    ],
    'Control System',
    [
      { label: 'HMI', value: '조작 인터페이스' },
      { label: 'SCENARIO', value: '훈련 시나리오' },
      { label: 'LOG', value: '항적 기록' },
      { label: 'EVAL', value: '평가 시스템' },
    ]
  ),

  'Railroad Vehicle Factory Automation & RFID Inventory Management System': makeTwoRowFlow(
    'Factory Automation',
    [
      { label: 'RFID', value: 'Tag Scanner' },
      { label: 'MIDDLEWARE', value: 'Data Collector' },
      { label: 'SERVER', value: 'API Server' },
      { label: 'DATABASE', value: 'Inventory DB' },
    ],
    'Management',
    [
      { label: 'DASHBOARD', value: 'Monitoring' },
      { label: 'TRACKING', value: 'Asset Track' },
      { label: 'REPORT', value: 'Analytics' },
      { label: 'ALERT', value: 'Notification' },
    ]
  ),

  'Bluelight LED Business Operations Management System': makeFlow([
    { label: 'FRONTEND', value: 'Web UI' },
    { label: 'BACKEND', value: 'API Server' },
    { label: 'ERP', value: '사업관리' },
    { label: 'INVENTORY', value: '재고 관리' },
    { label: 'DATABASE', value: 'MySQL' },
  ]),

  'Vehicle Blackbox Remote Monitoring IoT Platform': makeTwoRowFlow(
    'IoT Layer',
    [
      { label: 'DEVICE', value: '블랙박스' },
      { label: 'GATEWAY', value: 'IoT 전송' },
      { label: 'SERVER', value: '수신 서버' },
      { label: 'STORAGE', value: '영상 저장소' },
    ],
    'Monitoring',
    [
      { label: 'WEB', value: '관제 화면' },
      { label: 'REALTIME', value: '실시간 스트림' },
      { label: 'GPS', value: '위치 추적' },
      { label: 'ALERT', value: '이벤트 알림' },
    ]
  ),

  'Vehicle Alcohol Detection & Logging System': makeFlow([
    { label: 'SENSOR', value: '알콜 감지기' },
    { label: 'MCU', value: '임베디드' },
    { label: 'APP', value: 'Android' },
    { label: 'SERVER', value: 'API' },
    { label: 'LOG', value: '기록 DB' },
  ]),

  'NFC-Based Security Patrol System': makeFlow([
    { label: 'NFC TAG', value: '순찰 포인트' },
    { label: 'MOBILE', value: 'iOS App' },
    { label: 'SERVER', value: 'REST API' },
    { label: 'DASHBOARD', value: '관제 화면' },
    { label: 'REPORT', value: '순찰 리포트' },
  ]),

  'PC Security Vulnerability Scanner Module': makeFlow([
    { label: 'SCAN', value: '취약점 탐지' },
    { label: 'ANALYSIS', value: '위험도 분석' },
    { label: 'ENGINE', value: '검색 엔진' },
    { label: 'REPORT', value: '진단 보고서' },
    { label: 'PATCH', value: '조치 가이드' },
  ]),

  'Open Account App Protection System': makeFlow([
    { label: 'APP', value: '대상 앱' },
    { label: 'WRAP', value: '앱 래핑' },
    { label: 'AUTH', value: '인증 모듈' },
    { label: 'ENCRYPT', value: '데이터 암호화' },
    { label: 'MONITOR', value: '보안 모니터링' },
  ]),

  'Spherical Waterproof Telepresence Robot': makeTwoRowFlow(
    'Robot Hardware',
    [
      { label: 'BODY', value: '구체 방수 하우징' },
      { label: 'CAMERA', value: '360° 카메라' },
      { label: 'MOTOR', value: '수중 추진' },
      { label: 'SENSOR', value: '수심·온도' },
    ],
    'Control Software',
    [
      { label: 'CONTROL', value: '원격 제어' },
      { label: 'STREAM', value: '영상 전송' },
      { label: 'UI', value: '조종 인터페이스' },
      { label: 'LOG', value: '탐사 기록' },
    ]
  ),

  'Remote Robot Control & Audio-Video Telepresence': makeFlow([
    { label: 'ROBOT', value: '로봇 단말' },
    { label: 'STREAM', value: 'A/V 전송' },
    { label: 'NETWORK', value: 'WebRTC' },
    { label: 'CONTROL', value: '원격 제어' },
    { label: 'UI', value: '조종 화면' },
  ]),

  'Modular Robot Coding Education App': makeFlow([
    { label: 'ROBOT', value: '모듈형 로봇' },
    { label: 'BLE', value: 'Bluetooth' },
    { label: 'APP', value: '코딩 교육 앱' },
    { label: 'BLOCKLY', value: '블록 코딩' },
    { label: 'EXECUTE', value: '로봇 실행' },
  ]),

  'Dongdong — Interactive Read-Aloud Storybook': makeFlow([
    { label: 'CONTENT', value: '동화 콘텐츠' },
    { label: 'TTS', value: '음성 합성' },
    { label: 'ANIMATION', value: '인터랙션' },
    { label: 'APP', value: 'Mobile App' },
    { label: 'ANALYTICS', value: '학습 분석' },
  ]),

  'Weather-Based Music Recommendation & Streaming': makeTwoRowFlow(
    'Data Pipeline',
    [
      { label: 'WEATHER API', value: '기상 데이터' },
      { label: 'GPS', value: '위치 정보' },
      { label: 'ENGINE', value: '추천 엔진' },
      { label: 'PLAYLIST', value: '플레이리스트' },
    ],
    'Streaming',
    [
      { label: 'CDN', value: '음원 스트리밍' },
      { label: 'APP', value: 'Mobile Player' },
      { label: 'SOCIAL', value: '공유 기능' },
      { label: 'DATABASE', value: '사용자 DB' },
    ]
  ),

  'Low-Latency Video & Audio Streaming Library': makeFlow([
    { label: 'CAPTURE', value: '영상·음성 캡처' },
    { label: 'ENCODE', value: '실시간 인코딩' },
    { label: 'PROTOCOL', value: 'Low-Latency' },
    { label: 'CDN', value: '스트리밍 전송' },
    { label: 'PLAYER', value: '저지연 재생' },
  ]),

  'GPS HUD Speedometer': makeFlow([
    { label: 'GPS', value: '위치 센서' },
    { label: 'CALC', value: '속도 계산' },
    { label: 'HUD', value: '헤드업 표시' },
    { label: 'UI', value: 'Android App' },
  ]),

  'Geumdan Biga Consultation & Internal ERP System': makeTwoRowFlow(
    'Customer',
    [
      { label: 'WEB', value: '상담 예약' },
      { label: 'CONSULT', value: '체질 분석' },
      { label: 'CHART', value: '관리 차트' },
      { label: 'CRM', value: '고객 관리' },
    ],
    'Internal',
    [
      { label: 'ERP', value: '매출 관리' },
      { label: 'INVENTORY', value: '재고 관리' },
      { label: 'STAFF', value: '직원 관리' },
      { label: 'REPORT', value: '통계 리포트' },
    ]
  ),

  'Online Mass Registration System': makeFlow([
    { label: 'WEB FORM', value: '접수 폼' },
    { label: 'VALIDATE', value: '데이터 검증' },
    { label: 'QUEUE', value: '대기열 관리' },
    { label: 'SERVER', value: 'API Server' },
    { label: 'DATABASE', value: '접수 DB' },
  ]),

  'Barista Certification Registration Platform': makeFlow([
    { label: 'WEB', value: '접수 페이지' },
    { label: 'AUTH', value: '본인 인증' },
    { label: 'PAYMENT', value: '결제 연동' },
    { label: 'ADMIN', value: '관리 시스템' },
    { label: 'CERT', value: '자격증 발급' },
  ]),

  'DIRECTREADER — Cross-Platform Remote File Viewer': makeFlow([
    { label: 'CLIENT', value: '뷰어 앱' },
    { label: 'PROTOCOL', value: '원격 접속' },
    { label: 'SERVER', value: '파일 서버' },
    { label: 'RENDER', value: '문서 렌더링' },
    { label: 'CROSS', value: 'Multi-OS' },
  ]),

  'SPL Noise Meter — Real-Time Sound Level Measurement': makeFlow([
    { label: 'MIC', value: '마이크 입력' },
    { label: 'DSP', value: '신호 처리' },
    { label: 'CALC', value: 'dB 계산' },
    { label: 'UI', value: '실시간 표시' },
  ]),

  'RAIN SOUNDS — Sleep & Meditation Ambient App': makeFlow([
    { label: 'LIBRARY', value: '사운드 라이브러리' },
    { label: 'MIXER', value: '오디오 믹싱' },
    { label: 'TIMER', value: '슬립 타이머' },
    { label: 'UI', value: 'Ambient Player' },
  ]),

  '전파·전자파 금속 탐지기': makeFlow([
    { label: 'SENSOR', value: '자기장 센서' },
    { label: 'DSP', value: '신호 분석' },
    { label: 'DETECT', value: '금속 감지' },
    { label: 'UI', value: '탐지 결과' },
  ]),

  'FLASH LIGHT FREE — 플래시라이트 LED': makeFlow([
    { label: 'HARDWARE', value: 'LED 제어' },
    { label: 'MODE', value: '밝기·SOS' },
    { label: 'UI', value: 'Android App' },
  ]),

  'SMART RULER — 스마트폰 자/줄자': makeFlow([
    { label: 'SCREEN', value: '화면 캘리브레이션' },
    { label: 'CALC', value: '치수 계산' },
    { label: 'UI', value: '눈금 표시' },
    { label: 'SAVE', value: '측정 기록' },
  ]),

  'LED 디지털 탁상 시계': makeFlow([
    { label: 'CLOCK', value: '시간 동기화' },
    { label: 'DISPLAY', value: 'LED 렌더링' },
    { label: 'THEME', value: '테마 설정' },
    { label: 'ALARM', value: '알람 기능' },
  ]),

  'EASY 전광판 SCROLLER': makeFlow([
    { label: 'INPUT', value: '텍스트 입력' },
    { label: 'RENDER', value: 'LED 렌더링' },
    { label: 'SCROLL', value: '스크롤 애니메이션' },
    { label: 'CONFIG', value: '색상·속도 설정' },
  ]),

  '안드로이드 수평계': makeFlow([
    { label: 'ACCEL', value: '가속도 센서' },
    { label: 'CALC', value: '기울기 계산' },
    { label: 'UI', value: '수평 표시' },
    { label: 'CALIB', value: '캘리브레이션' },
  ]),

  '손전등 + 돋보기': makeFlow([
    { label: 'LED', value: '플래시 제어' },
    { label: 'CAMERA', value: '카메라 확대' },
    { label: 'UI', value: '통합 인터페이스' },
  ]),

  '안드로이드 돋보기': makeFlow([
    { label: 'CAMERA', value: '카메라 입력' },
    { label: 'ZOOM', value: '디지털 확대' },
    { label: 'UI', value: '확대 뷰어' },
  ]),

  '거울 어플': makeFlow([
    { label: 'CAMERA', value: '전면 카메라' },
    { label: 'FILTER', value: '밝기 조절' },
    { label: 'UI', value: '거울 뷰' },
  ]),

  '메트로놈': makeFlow([
    { label: 'BPM', value: '템포 설정' },
    { label: 'AUDIO', value: '비트 생성' },
    { label: 'VISUAL', value: '시각 인디케이터' },
    { label: 'UI', value: '메트로놈 UI' },
  ]),

  '안드로이드 LED 전광판': makeFlow([
    { label: 'INPUT', value: '메시지 입력' },
    { label: 'RENDER', value: 'LED 매트릭스' },
    { label: 'EFFECT', value: '스크롤·깜박임' },
    { label: 'CONFIG', value: '색상·폰트' },
  ]),

  '손전등 + 시계': makeFlow([
    { label: 'LED', value: '플래시 제어' },
    { label: 'CLOCK', value: '시계 표시' },
    { label: 'UI', value: '통합 화면' },
  ]),

  'KOREA SCIENCE Corporate Identity & Digital Platform': makeFlow([
    { label: 'DESIGN', value: 'CI/BI 디자인' },
    { label: 'FRONTEND', value: '반응형 웹' },
    { label: 'CMS', value: '콘텐츠 관리' },
    { label: 'CATALOG', value: '제품 카탈로그' },
    { label: 'SERVER', value: 'Web Server' },
  ]),

  '무인 태닝 서비스 지능형 매장 관리 시스템': makeTwoRowFlow(
    'Access Control',
    [
      { label: 'KIOSK', value: '무인 키오스크' },
      { label: 'AUTH', value: '본인 인증' },
      { label: 'PAYMENT', value: '결제 처리' },
      { label: 'DOOR', value: '출입 제어' },
    ],
    'Management',
    [
      { label: 'IOT', value: '기기 제어' },
      { label: 'DASHBOARD', value: '매장 모니터링' },
      { label: 'MEMBER', value: '회원 관리' },
      { label: 'ANALYTICS', value: '매출 통계' },
    ]
  ),

  '전산유체역학 기반 악취 확산 모델링': makeFlow([
    { label: 'INPUT', value: '기상·지형 데이터' },
    { label: 'CFD', value: '유체역학 시뮬레이션' },
    { label: 'MODEL', value: '확산 모델링' },
    { label: 'VISUAL', value: '3D 시각화' },
    { label: 'REPORT', value: '분석 보고서' },
  ]),

  '신재생에너지 온라인 VR전시관': makeFlow([
    { label: '3D MODEL', value: 'VR 모델링' },
    { label: 'VR ENGINE', value: '렌더링 엔진' },
    { label: 'WEB', value: 'WebGL 뷰어' },
    { label: 'CONTENT', value: '에너지 정보' },
    { label: 'CMS', value: '전시 관리' },
  ]),

  '엠텍 인공지능 플랫폼 연동 System': makeTwoRowFlow(
    'AI Platform',
    [
      { label: 'DATA', value: '데이터 수집' },
      { label: 'AI ENGINE', value: 'ML 모델' },
      { label: 'API', value: '플랫폼 API' },
      { label: 'INTEGRATE', value: '시스템 연동' },
    ],
    'Management',
    [
      { label: 'DASHBOARD', value: '모니터링' },
      { label: 'CONFIG', value: '모델 설정' },
      { label: 'LOG', value: '추론 이력' },
      { label: 'REPORT', value: '성능 리포트' },
    ]
  ),

  'Microsoft Azure 빅데이터 얼굴인식 로봇 제어 플랫폼': makeTwoRowFlow(
    'Recognition',
    [
      { label: 'CAMERA', value: '영상 캡처' },
      { label: 'AZURE', value: 'Face API' },
      { label: 'ML', value: '빅데이터 분석' },
      { label: 'RESULT', value: '인식 결과' },
    ],
    'Robot Control',
    [
      { label: 'COMMAND', value: '제어 명령' },
      { label: 'ROBOT', value: '로봇 구동' },
      { label: 'FEEDBACK', value: '센서 피드백' },
      { label: 'CLOUD', value: 'Azure Cloud' },
    ]
  ),

  '자전거 무인대여 시스템 Demo App': makeFlow([
    { label: 'APP', value: '대여 앱' },
    { label: 'BLE/NFC', value: '잠금 해제' },
    { label: 'GPS', value: '위치 추적' },
    { label: 'PAYMENT', value: '결제' },
    { label: 'SERVER', value: '관리 서버' },
  ]),

  'S-100 수로정보 실해역 실험 홍보 동영상 제작': makeFlow([
    { label: 'PLANNING', value: '기획·콘티' },
    { label: 'SHOOT', value: '실해역 촬영' },
    { label: 'EDIT', value: '편집·CG' },
    { label: 'RENDER', value: '렌더링' },
    { label: 'DELIVER', value: '최종 납품' },
  ]),

  '한국효문화진흥원 본청 시스템 개발': makeTwoRowFlow(
    'Public Web',
    [
      { label: 'FRONTEND', value: '홈페이지 UI' },
      { label: 'CMS', value: '콘텐츠 관리' },
      { label: 'BOARD', value: '게시판' },
      { label: 'GALLERY', value: '미디어 갤러리' },
    ],
    'Admin',
    [
      { label: 'AUTH', value: '관리자 인증' },
      { label: 'MEMBER', value: '회원 관리' },
      { label: 'STATS', value: '방문 통계' },
      { label: 'SERVER', value: 'Web Server' },
    ]
  ),

  '대둔산 자연휴양림 사이트 리뉴얼': makeFlow([
    { label: 'DESIGN', value: 'UI/UX 리뉴얼' },
    { label: 'FRONTEND', value: '반응형 웹' },
    { label: 'BOOKING', value: '예약 시스템' },
    { label: 'CMS', value: '콘텐츠 관리' },
    { label: 'PHOTO', value: '드론·사진 촬영' },
  ]),

  '젠틀글램핑 웹사이트 개발': makeFlow([
    { label: 'DESIGN', value: 'UI/UX 디자인' },
    { label: 'FRONTEND', value: '반응형 웹' },
    { label: 'BOOKING', value: '예약 시스템' },
    { label: 'GALLERY', value: '미디어 갤러리' },
    { label: 'PHOTO', value: '드론·사진 촬영' },
  ]),

  '동양전기산업 다운로드 System': makeFlow([
    { label: 'WEB', value: '다운로드 포털' },
    { label: 'AUTH', value: '회원 인증' },
    { label: 'FILE', value: '파일 관리' },
    { label: 'CDN', value: '다운로드 서버' },
    { label: 'LOG', value: '이력 관리' },
  ]),

  '시온냉동 기업 홈페이지': makeFlow([
    { label: 'DESIGN', value: 'UI/UX 디자인' },
    { label: 'FRONTEND', value: '반응형 웹' },
    { label: 'CATALOG', value: '제품 소개' },
    { label: 'CMS', value: '콘텐츠 관리' },
    { label: 'SERVER', value: 'Web Server' },
  ]),

  '한국스토리텔링연구원 홈페이지': makeFlow([
    { label: 'DESIGN', value: 'UI/UX 디자인' },
    { label: 'FRONTEND', value: '반응형 웹' },
    { label: 'BOARD', value: '게시판' },
    { label: 'CMS', value: '콘텐츠 관리' },
    { label: 'SERVER', value: 'Web Server' },
  ]),

  '참진국제특허법률사무소 홈페이지': makeFlow([
    { label: 'DESIGN', value: 'UI/UX 디자인' },
    { label: 'FRONTEND', value: '반응형 웹' },
    { label: 'CONSULT', value: '상담 신청' },
    { label: 'CMS', value: '콘텐츠 관리' },
    { label: 'SERVER', value: 'Web Server' },
  ]),

  '코미텍 O2O 자재 유통 System': makeTwoRowFlow(
    'Online',
    [
      { label: 'WEB', value: '주문 플랫폼' },
      { label: 'CATALOG', value: '자재 카탈로그' },
      { label: 'ORDER', value: '발주 관리' },
      { label: 'PAYMENT', value: '결제 처리' },
    ],
    'Offline',
    [
      { label: 'WAREHOUSE', value: '창고 관리' },
      { label: 'DELIVERY', value: '배송 추적' },
      { label: 'ERP', value: '재고 연동' },
      { label: 'REPORT', value: '매출 통계' },
    ]
  ),

  '자재관리 유통 시스템': makeFlow([
    { label: 'INPUT', value: '자재 등록' },
    { label: 'INVENTORY', value: '재고 관리' },
    { label: 'ORDER', value: '발주·입출고' },
    { label: 'TRACKING', value: '유통 추적' },
    { label: 'REPORT', value: '통계 리포트' },
  ]),

  'cocos2d-x 게임엔진 활용 Netty Socket I/O 서버': makeTwoRowFlow(
    'Game Client',
    [
      { label: 'ENGINE', value: 'Cocos2d-x' },
      { label: 'RENDER', value: '게임 렌더링' },
      { label: 'NETWORK', value: 'Socket I/O' },
    ],
    'Server',
    [
      { label: 'NETTY', value: 'NIO Server' },
      { label: 'LOGIC', value: '게임 로직' },
      { label: 'SESSION', value: '세션 관리' },
      { label: 'DATABASE', value: 'DB' },
    ]
  ),
};

// Apply updates
const update = db.prepare('UPDATE portfolio SET architecture = ? WHERE title = ?');
let updated = 0;

for (const [title, arch] of Object.entries(architectures)) {
  const row = db.prepare('SELECT id, title FROM portfolio WHERE title = ?').get(title);
  if (row) {
    update.run(arch, title);
    updated++;
    console.log(`[OK] ${title}`);
  } else {
    // Try partial match
    const partial = db.prepare('SELECT id, title FROM portfolio WHERE title LIKE ?').get(`%${title.substring(0, 20)}%`);
    if (partial) {
      update.run(arch, partial.title);
      updated++;
      console.log(`[OK~] ${partial.title}`);
    } else {
      console.log(`[MISS] ${title}`);
    }
  }
}

// Also fix broken charts in detail - remove the raw text flow from detail
const brokenEntries = [
  'ICT 스마트 예비군 훈련체계 태블릿',
  '축산악취 수집 및 통합 모니터링 통계 시스템',
  '딥러닝 기반 비정형 데이터(음성) 전사 시스템',
  "충남대 음성인식 한글 교육 App '넙죽이와 졸렁이'",
  '한국효문화진흥원 자료관리 시스템',
  '여행 스케줄 작성 및 추천 웹 시스템',
  'FIBERPRO 다국어 홈페이지',
];

for (const title of brokenEntries) {
  const row = db.prepare('SELECT id, detail FROM portfolio WHERE title LIKE ?').get(`%${title.substring(0, 15)}%`);
  if (row && row.detail) {
    // Remove the broken chart section from detail (text between h3 with "Flow/Architecture" and next h2/h3 or end)
    let detail = row.detail;
    // Pattern: <h3...>...Flow/Architecture...</h3> followed by bare <p>TEXT</p><p>→</p> patterns
    const flowPattern = /<h3[^>]*>[^<]*(?:Flow|Architecture|System)[^<]*<\/h3>(?:<p>[^<]{1,30}<\/p>)*(?:<p><strong>[^<]*<\/strong><\/p>(?:<p>→<\/p>)?)*(?:<p>[^<]{1,30}<\/p>)*/gi;
    const cleaned = detail.replace(flowPattern, '');
    if (cleaned !== detail) {
      db.prepare('UPDATE portfolio SET detail = ? WHERE id = ?').run(cleaned, row.id);
      console.log(`[CLEAN] Removed broken chart from detail: ${title}`);
    }
  }
}

console.log(`\nDone! Updated architecture for ${updated} entries.`);
db.close();
