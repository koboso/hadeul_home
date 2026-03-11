/**
 * Add Visual Architecture Diagrams & Tech Stack Badges
 * to existing portfolio entries in the SQLite database.
 *
 * Usage: node scripts/add-visual-charts.cjs
 */
const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);

// ── Color palette ────────────────────────────────────────────
const COLORS = {
  blue:   { bg: "rgba(59,130,246,0.15)",  border: "rgba(59,130,246,0.3)",  text: "#93c5fd" },
  purple: { bg: "rgba(139,92,246,0.15)",  border: "rgba(139,92,246,0.3)",  text: "#c4b5fd" },
  green:  { bg: "rgba(16,185,129,0.15)",  border: "rgba(16,185,129,0.3)",  text: "#6ee7b7" },
  amber:  { bg: "rgba(245,158,11,0.15)",  border: "rgba(245,158,11,0.3)",  text: "#fcd34d" },
  rose:   { bg: "rgba(244,63,94,0.15)",   border: "rgba(244,63,94,0.3)",   text: "#fda4af" },
  cyan:   { bg: "rgba(6,182,212,0.15)",   border: "rgba(6,182,212,0.3)",   text: "#67e8f9" },
  indigo: { bg: "rgba(99,102,241,0.15)",  border: "rgba(99,102,241,0.3)",  text: "#a5b4fc" },
  orange: { bg: "rgba(249,115,22,0.15)",  border: "rgba(249,115,22,0.3)",  text: "#fdba74" },
  pink:   { bg: "rgba(236,72,153,0.15)",  border: "rgba(236,72,153,0.3)",  text: "#f9a8d4" },
  teal:   { bg: "rgba(20,184,166,0.15)",  border: "rgba(20,184,166,0.3)",  text: "#5eead4" },
};

const COLOR_KEYS = Object.keys(COLORS);

function colorAt(i) {
  return COLORS[COLOR_KEYS[i % COLOR_KEYS.length]];
}

// ── HTML generators ──────────────────────────────────────────

function box(label, value, color) {
  return `<div style="background: ${color.bg}; border: 1px solid ${color.border}; padding: 14px 18px; border-radius: 10px; text-align: center; min-width: 100px;">
      <div style="font-size: 11px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 1px;">${label}</div>
      <div style="color: ${color.text}; font-weight: 600; margin-top: 4px;">${value}</div>
    </div>`;
}

const ARROW = `<div style="color: rgba(255,255,255,0.2); font-size: 18px;">\u2192</div>`;
const ARROW_DOWN = `<div style="color: rgba(255,255,255,0.2); font-size: 18px;">\u2193</div>`;

function architectureFlow(title, icon, components) {
  // components: Array<{ label, value, colorKey }>
  const boxes = components.map((c, i) => {
    const color = typeof c.colorKey === "string" ? COLORS[c.colorKey] : colorAt(i);
    return box(c.label, c.value, color);
  });
  const withArrows = boxes.join(`\n    ${ARROW}\n    `);

  return `<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; margin: 32px 0;">
  <h3 style="color: #a78bfa; margin: 0 0 20px 0; text-align: center; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">${icon} ${title}</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">
    ${withArrows}
  </div>
</div>`;
}

function techStackBadges(techs) {
  // techs: Array<{ name, colorKey }>
  const badges = techs.map((t, i) => {
    const color = typeof t.colorKey === "string" ? COLORS[t.colorKey] : colorAt(i);
    return `<span style="background: ${color.bg}; color: ${color.text}; padding: 6px 14px; border-radius: 9999px; font-size: 13px; border: 1px solid ${color.border};">${t.name}</span>`;
  });

  return `<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; margin: 32px 0;">
  <h3 style="color: #a78bfa; margin: 0 0 16px 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">\uD83D\uDEE0 Tech Stack</h3>
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    ${badges.join("\n    ")}
  </div>
</div>`;
}

// ── Chart data per project ───────────────────────────────────

const chartData = {
  // 1. S-100 Registry
  "S-100 Registry": {
    arch: {
      title: "System Architecture",
      icon: "\u2699\uFE0F",
      components: [
        { label: "Client", value: "Browser", colorKey: "blue" },
        { label: "Backend", value: "Web Server", colorKey: "purple" },
        { label: "Core", value: "Registry Engine", colorKey: "indigo" },
        { label: "Logic", value: "Validation", colorKey: "amber" },
        { label: "Data", value: "PostgreSQL", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Java", colorKey: "orange" },
      { name: "Spring", colorKey: "green" },
      { name: "PostgreSQL", colorKey: "blue" },
      { name: "HTML5", colorKey: "rose" },
      { name: "REST API", colorKey: "purple" },
    ],
  },

  // 2. 선박운항 시뮬레이터
  "\uC120\uBC15\uC6B4\uD56D \uC2DC\uBBAC\uB808\uC774\uD130": {
    matchKey: "Maritime Navigation Simulator",
    arch: {
      title: "Simulation Pipeline",
      icon: "\uD83D\uDEA2",
      components: [
        { label: "Physics", value: "Ship Dynamics", colorKey: "blue" },
        { label: "Render", value: "3D Engine", colorKey: "purple" },
        { label: "Network", value: "WebSocket", colorKey: "cyan" },
        { label: "Output", value: "Browser", colorKey: "green" },
      ],
    },
    tech: [
      { name: "WebGL", colorKey: "blue" },
      { name: "Three.js", colorKey: "purple" },
      { name: "Node.js", colorKey: "green" },
      { name: "MMG Model", colorKey: "amber" },
    ],
  },

  // 3. 철도차량관리단 RFID
  "Railroad Vehicle Factory": {
    arch: {
      title: "RFID Inventory Flow",
      icon: "\uD83D\uDE84",
      components: [
        { label: "Input", value: "RFID Reader", colorKey: "blue" },
        { label: "Device", value: "Windows CE", colorKey: "purple" },
        { label: "App", value: ".NET App", colorKey: "indigo" },
        { label: "Output", value: "Barcode Printer", colorKey: "amber" },
        { label: "Storage", value: "Server DB", colorKey: "green" },
      ],
    },
    tech: [
      { name: ".NET", colorKey: "purple" },
      { name: "C#", colorKey: "blue" },
      { name: "RFID", colorKey: "cyan" },
      { name: "Windows CE", colorKey: "amber" },
    ],
  },

  // 4. 블루라이트 LED
  "Bluelight LED": {
    arch: {
      title: "Monitoring Architecture",
      icon: "\uD83C\uDFED",
      components: [
        { label: "Source", value: "Factory Floor", colorKey: "blue" },
        { label: "Interface", value: "PLC / Sensor", colorKey: "purple" },
        { label: "Backend", value: "Monitoring Server", colorKey: "indigo" },
        { label: "UI", value: "Dashboard", colorKey: "green" },
      ],
    },
    tech: [
      { name: "C#", colorKey: "blue" },
      { name: ".NET", colorKey: "purple" },
      { name: "SQL Server", colorKey: "green" },
    ],
  },

  // 5. 전원블랙박스 원격 모니터링
  "\uC804\uC6D0\uBE14\uB799\uBC15\uC2A4": {
    arch: {
      title: "IoT Data Flow",
      icon: "\uD83D\uDCE1",
      components: [
        { label: "Device", value: "Vehicle Blackbox", colorKey: "blue" },
        { label: "Network", value: "LTE Modem", colorKey: "purple" },
        { label: "Backend", value: "Cloud Server", colorKey: "indigo" },
        { label: "Web", value: "Dashboard", colorKey: "green" },
        { label: "Mobile", value: "App", colorKey: "amber" },
      ],
    },
    tech: [
      { name: "Java", colorKey: "orange" },
      { name: "Android", colorKey: "green" },
      { name: "PHP", colorKey: "purple" },
      { name: "MySQL", colorKey: "blue" },
    ],
  },

  // 6. 차량 알콜 감지
  "\uCC28\uB7C9 \uC54C\uCF5C \uAC10\uC9C0": {
    arch: {
      title: "Sensor Data Flow",
      icon: "\uD83C\uDF7A",
      components: [
        { label: "Sensor", value: "BT Alcohol", colorKey: "rose" },
        { label: "Link", value: "BT Module", colorKey: "blue" },
        { label: "App", value: "Android Logger", colorKey: "green" },
        { label: "Output", value: "CSV Export", colorKey: "amber" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Bluetooth SPP", colorKey: "blue" },
    ],
  },

  // 7. 항공우주력연구원
  "\uD56D\uACF5\uC6B0\uC8FC\uB825\uC5F0\uAD6C\uC6D0": {
    arch: {
      title: "Web Architecture",
      icon: "\u2708\uFE0F",
      components: [
        { label: "Admin", value: "CMS Admin", colorKey: "blue" },
        { label: "Server", value: "Web Server", colorKey: "purple" },
        { label: "Client", value: "Responsive Frontend", colorKey: "green" },
      ],
    },
    tech: [
      { name: "PHP", colorKey: "purple" },
      { name: "MySQL", colorKey: "blue" },
      { name: "HTML5", colorKey: "rose" },
      { name: "CSS3", colorKey: "cyan" },
    ],
  },

  // 8. NFC 순찰시스템
  "NFC \uC21C\uCC30": {
    arch: {
      title: "Patrol Data Flow",
      icon: "\uD83D\uDD12",
      components: [
        { label: "Tag", value: "NFC Tag", colorKey: "cyan" },
        { label: "Reader", value: "iOS Reader", colorKey: "blue" },
        { label: "Backend", value: "Server API", colorKey: "purple" },
        { label: "Web", value: "Admin Dashboard", colorKey: "green" },
      ],
    },
    tech: [
      { name: "iOS", colorKey: "blue" },
      { name: "Objective-C", colorKey: "indigo" },
      { name: "NFC", colorKey: "cyan" },
      { name: "PHP", colorKey: "purple" },
    ],
  },

  // 9. PC 보안 취약점
  "PC \uBCF4\uC548 \uCDE8\uC57D\uC810": {
    arch: {
      title: "Security Scan Pipeline",
      icon: "\uD83D\uDEE1\uFE0F",
      components: [
        { label: "Agent", value: "PC Scanner", colorKey: "blue" },
        { label: "Inspect", value: "Registry/File Check", colorKey: "purple" },
        { label: "Reference", value: "Vulnerability DB", colorKey: "amber" },
        { label: "Output", value: "Report Generator", colorKey: "green" },
      ],
    },
    tech: [
      { name: "C#", colorKey: "blue" },
      { name: ".NET", colorKey: "purple" },
      { name: "Windows API", colorKey: "amber" },
    ],
  },

  // 10. 개방형 사용자 계정 앱 보호
  "\uAC1C\uBC29\uD615 \uC0AC\uC6A9\uC790 \uACC4\uC815": {
    arch: {
      title: "Protection Architecture",
      icon: "\uD83D\uDD10",
      components: [
        { label: "Entry", value: "User Account", colorKey: "blue" },
        { label: "Gate", value: "Auth Gate", colorKey: "purple" },
        { label: "Isolation", value: "App Sandbox", colorKey: "amber" },
        { label: "Shield", value: "Protection Layer", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "SQLite", colorKey: "blue" },
      { name: "Security", colorKey: "rose" },
    ],
  },

  // 11. 구체 방수 텔레프리전스 로봇
  "\uAD6C\uCCB4 \uD615\uD0DC": {
    matchKey: "\uAD6C\uCCB4",
    arch: {
      title: "Robot Control Flow",
      icon: "\uD83E\uDD16",
      components: [
        { label: "User", value: "Controller App", colorKey: "blue" },
        { label: "Link", value: "WiFi / BT", colorKey: "purple" },
        { label: "Core", value: "Robot MCU", colorKey: "amber" },
        { label: "Output", value: "Camera / Motor", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Arduino", colorKey: "cyan" },
      { name: "Bluetooth", colorKey: "blue" },
    ],
  },

  // 12. 원격지 로봇 컨트롤
  "\uC6D0\uACA9\uC9C0 \uB85C\uBD07 \uCEE8\uD2B8\uB864": {
    arch: {
      title: "Telepresence Architecture",
      icon: "\uD83C\uDFAE",
      components: [
        { label: "User", value: "Smartphone", colorKey: "blue" },
        { label: "Relay", value: "Matching Server", colorKey: "purple" },
        { label: "Robot", value: "RS232 Robot", colorKey: "amber" },
        { label: "Feedback", value: "Camera Feed", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "RS232", colorKey: "amber" },
      { name: "WiFi", colorKey: "cyan" },
    ],
  },

  // 13. 모듈형 로봇 코딩 교육
  "\uBAA8\uB4C8\uD615 \uB85C\uBD07 \uCF54\uB529": {
    arch: {
      title: "Education Flow",
      icon: "\uD83D\uDCDA",
      components: [
        { label: "UI", value: "Coding Interface", colorKey: "blue" },
        { label: "Link", value: "BT Command", colorKey: "purple" },
        { label: "Core", value: "Robot Controller", colorKey: "amber" },
        { label: "Output", value: "Motor / LED", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Bluetooth", colorKey: "blue" },
      { name: "Education", colorKey: "pink" },
    ],
  },

  // 14. 온라인 대규모 접수
  "\uC628\uB77C\uC778 \uB300\uADDC\uBAA8 \uC811\uC218": {
    arch: {
      title: "High-Traffic Architecture",
      icon: "\u26A1",
      components: [
        { label: "User", value: "Applicant", colorKey: "blue" },
        { label: "Infra", value: "Load Balancer", colorKey: "purple" },
        { label: "Engine", value: "Queue Server", colorKey: "indigo" },
        { label: "Pay", value: "Payment Gateway", colorKey: "amber" },
        { label: "Data", value: "Database", colorKey: "green" },
      ],
    },
    tech: [
      { name: "PHP", colorKey: "purple" },
      { name: "MySQL", colorKey: "blue" },
      { name: "PG API", colorKey: "amber" },
    ],
  },

  // 15. 유니자인 기업 홈페이지
  "\uC720\uB2C8\uC790\uC778": {
    arch: {
      title: "Web Architecture",
      icon: "\uD83C\uDFA8",
      components: [
        { label: "Admin", value: "CMS", colorKey: "blue" },
        { label: "Server", value: "Responsive Web", colorKey: "purple" },
        { label: "Client", value: "Portfolio Gallery", colorKey: "green" },
      ],
    },
    tech: [
      { name: "PHP", colorKey: "purple" },
      { name: "JavaScript", colorKey: "amber" },
      { name: "MySQL", colorKey: "blue" },
    ],
  },

  // 16. 바리스타 자격증 접수
  "\uBC14\uB9AC\uC2A4\uD0C0 \uC790\uACA9\uC99D": {
    arch: {
      title: "Registration Flow",
      icon: "\u2615",
      components: [
        { label: "User", value: "Applicant", colorKey: "blue" },
        { label: "Step 1", value: "Exam Select", colorKey: "purple" },
        { label: "Step 2", value: "Registration", colorKey: "indigo" },
        { label: "Pay", value: "Payment", colorKey: "amber" },
        { label: "Output", value: "Receipt Print", colorKey: "green" },
      ],
    },
    tech: [
      { name: "PHP", colorKey: "purple" },
      { name: "MySQL", colorKey: "blue" },
      { name: "PG API", colorKey: "amber" },
    ],
  },

  // 17. 수주산업 기업 홈페이지
  "\uC218\uC8FC\uC0B0\uC5C5": {
    arch: {
      title: "Web Architecture",
      icon: "\uD83C\uDFE2",
      components: [
        { label: "Admin", value: "CMS Admin", colorKey: "blue" },
        { label: "Server", value: "Web Server", colorKey: "purple" },
        { label: "Client", value: "Responsive Frontend", colorKey: "green" },
      ],
    },
    tech: [
      { name: "PHP", colorKey: "purple" },
      { name: "MySQL", colorKey: "blue" },
      { name: "HTML5", colorKey: "rose" },
    ],
  },

  // 18. 세무그룹 명성
  "\uC138\uBB34\uADF8\uB8F9 \uBA85\uC131": {
    arch: {
      title: "Web Architecture",
      icon: "\uD83D\uDCBC",
      components: [
        { label: "Admin", value: "CMS Admin", colorKey: "blue" },
        { label: "Server", value: "Web Server", colorKey: "purple" },
        { label: "Client", value: "Responsive Frontend", colorKey: "green" },
      ],
    },
    tech: [
      { name: "PHP", colorKey: "purple" },
      { name: "MySQL", colorKey: "blue" },
      { name: "HTML5", colorKey: "rose" },
    ],
  },

  // 19. 코리아사이언스
  "\uCF54\uB9AC\uC544 \uC0AC\uC774\uC5B8\uC2A4": {
    matchKey: "\uCF54\uB9AC\uC544\uC0AC\uC774\uC5B8\uC2A4",
    arch: {
      title: "E-commerce Flow",
      icon: "\uD83D\uDED2",
      components: [
        { label: "Catalog", value: "Product Catalog", colorKey: "blue" },
        { label: "Cart", value: "Shopping Cart", colorKey: "purple" },
        { label: "Process", value: "Order Management", colorKey: "amber" },
        { label: "Fulfill", value: "Shipping", colorKey: "green" },
      ],
    },
    tech: [
      { name: "PHP", colorKey: "purple" },
      { name: "MySQL", colorKey: "blue" },
      { name: "E-commerce", colorKey: "amber" },
    ],
  },

  // 20. DIRECTREADER
  "DIRECTREADER": {
    arch: {
      title: "Remote File Flow",
      icon: "\uD83D\uDCC2",
      components: [
        { label: "Source", value: "PC File System", colorKey: "blue" },
        { label: "Server", value: "Remote Server", colorKey: "purple" },
        { label: "Client", value: "Android Viewer", colorKey: "green" },
        { label: "Render", value: "File Renderer", colorKey: "amber" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "SMB/FTP", colorKey: "blue" },
    ],
  },

  // 21. 금단비가 ERP
  "\uAE08\uB2E8\uBE44\uAC00": {
    arch: {
      title: "ERP Data Flow",
      icon: "\uD83D\uDCCA",
      components: [
        { label: "Module", value: "Customer CRM", colorKey: "blue" },
        { label: "Process", value: "Consultation Log", colorKey: "purple" },
        { label: "Finance", value: "Billing", colorKey: "amber" },
        { label: "Output", value: "Report Dashboard", colorKey: "green" },
      ],
    },
    tech: [
      { name: "PHP", colorKey: "purple" },
      { name: "MySQL", colorKey: "blue" },
      { name: "jQuery", colorKey: "cyan" },
    ],
  },

  // 22. 날씨 음악 추천 스트리밍
  "\uB0A0\uC528": {
    matchKey: "\uB0A0\uC528",
    arch: {
      title: "Context-Aware Pipeline",
      icon: "\uD83C\uDF26\uFE0F",
      components: [
        { label: "Input", value: "GPS Location", colorKey: "blue" },
        { label: "API", value: "Weather API", colorKey: "cyan" },
        { label: "Match", value: "Music DB", colorKey: "purple" },
        { label: "Output", value: "Streaming Player", colorKey: "green" },
      ],
    },
    tech: [
      { name: "PHP", colorKey: "purple" },
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "GIS API", colorKey: "cyan" },
    ],
  },

  // 23. 대한축구협회 스트리밍
  "\uB300\uD55C\uCD95\uAD6C\uD611\uD68C": {
    matchKey: "\uC2A4\uD2B8\uB9AC\uBC0D \uB77C\uC774\uBE0C\uB7EC\uB9AC",
    arch: {
      title: "Streaming Pipeline",
      icon: "\uD83C\uDFAC",
      components: [
        { label: "Source", value: "Encrypted Video", colorKey: "blue" },
        { label: "Transport", value: "HTTP Download", colorKey: "purple" },
        { label: "Process", value: "Decrypt Engine", colorKey: "amber" },
        { label: "Output", value: "Media Player", colorKey: "green" },
      ],
    },
    tech: [
      { name: "C#", colorKey: "blue" },
      { name: ".NET", colorKey: "purple" },
      { name: "DirectShow", colorKey: "amber" },
      { name: "Windows Media SDK", colorKey: "cyan" },
    ],
  },

  // 24. GPS HUD 속도계
  "GPS HUD": {
    arch: {
      title: "Speed Display Pipeline",
      icon: "\uD83D\uDE97",
      components: [
        { label: "Sensor", value: "GPS Sensor", colorKey: "blue" },
        { label: "Compute", value: "Speed Calculate", colorKey: "purple" },
        { label: "Render", value: "HUD Renderer", colorKey: "amber" },
        { label: "Output", value: "Mirror Display", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "GPS API", colorKey: "blue" },
    ],
  },

  // 25. 무인 태닝 서비스 (not in seed but handle if present)
  "\uBB34\uC778 \uD0DC\uB2DD": {
    arch: {
      title: "IoT Service Flow",
      icon: "\u2600\uFE0F",
      components: [
        { label: "Edge", value: "Raspberry Pi", colorKey: "blue" },
        { label: "Auth", value: "QR Code", colorKey: "purple" },
        { label: "Lock", value: "Door Lock", colorKey: "amber" },
        { label: "Admin", value: "Admin Web", colorKey: "indigo" },
        { label: "User", value: "Mobile App", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Python", colorKey: "blue" },
      { name: "Java", colorKey: "orange" },
      { name: "PHP", colorKey: "purple" },
      { name: "Raspberry Pi", colorKey: "green" },
    ],
  },

  // 26. 소음측정기
  "\uC18C\uC74C\uCE21\uC815\uAE30": {
    arch: {
      title: "Audio Analysis Flow",
      icon: "\uD83D\uDD0A",
      components: [
        { label: "Input", value: "Microphone", colorKey: "blue" },
        { label: "Process", value: "FFT Analysis", colorKey: "purple" },
        { label: "Output", value: "dB Meter", colorKey: "amber" },
        { label: "Log", value: "History Log", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Audio API", colorKey: "blue" },
    ],
  },

  // 27. RAIN SOUNDS
  "RAIN SOUNDS": {
    arch: {
      title: "Audio Engine",
      icon: "\uD83C\uDF27\uFE0F",
      components: [
        { label: "Library", value: "Sound Library", colorKey: "blue" },
        { label: "Engine", value: "Audio Mixer", colorKey: "purple" },
        { label: "Timer", value: "Timer Engine", colorKey: "amber" },
        { label: "Service", value: "Background Service", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "AudioTrack", colorKey: "blue" },
    ],
  },

  // 28. 우리아이동동
  "\uC6B0\uB9AC\uC544\uC774\uB3D9\uB3D9": {
    arch: {
      title: "Interactive Storybook Flow",
      icon: "\uD83D\uDCD6",
      components: [
        { label: "Record", value: "Voice Recorder", colorKey: "blue" },
        { label: "Sync", value: "Page Sync Engine", colorKey: "purple" },
        { label: "Render", value: "Story Renderer", colorKey: "amber" },
        { label: "Play", value: "Audio Player", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "MediaRecorder", colorKey: "blue" },
      { name: "Custom View", colorKey: "purple" },
    ],
  },

  // ── GAMES ──────────────────────────────────────────────────

  // 29. 타슈 레이싱
  "\uD0C0\uC288 \uB808\uC774\uC2F1": {
    arch: {
      title: "Game Architecture",
      icon: "\uD83C\uDFCE\uFE0F",
      components: [
        { label: "Engine", value: "Game Engine", colorKey: "blue" },
        { label: "Input", value: "Touch Handler", colorKey: "purple" },
        { label: "Logic", value: "Racing Logic", colorKey: "amber" },
        { label: "Render", value: "3D Renderer", colorKey: "indigo" },
        { label: "Service", value: "O2O Coupon API", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "OpenGL ES", colorKey: "blue" },
      { name: "O2O API", colorKey: "amber" },
    ],
  },

  // 30. 영어 단어 낱말 퍼즐
  "\uC601\uC5B4 \uB2E8\uC5B4 \uB0B1\uB9D0 \uD37C\uC990": {
    arch: {
      title: "Game Architecture",
      icon: "\uD83E\uDDE9",
      components: [
        { label: "Engine", value: "Puzzle Engine", colorKey: "blue" },
        { label: "Input", value: "Touch Handler", colorKey: "purple" },
        { label: "Logic", value: "Word Search", colorKey: "amber" },
        { label: "Render", value: "Grid Renderer", colorKey: "indigo" },
        { label: "Score", value: "Leaderboard", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Custom View", colorKey: "blue" },
      { name: "Google Play Games", colorKey: "purple" },
    ],
  },

  // 31. 블럭배틀 3D
  "\uBE14\uB7ED\uBC30\uD2C0 3D": {
    arch: {
      title: "Game Architecture",
      icon: "\uD83C\uDFAE",
      components: [
        { label: "Engine", value: "3D Physics", colorKey: "blue" },
        { label: "Input", value: "Drag Handler", colorKey: "purple" },
        { label: "Logic", value: "Battle Logic", colorKey: "amber" },
        { label: "Render", value: "3D Renderer", colorKey: "indigo" },
        { label: "Online", value: "Multiplayer Server", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "OpenGL ES", colorKey: "blue" },
      { name: "Physics Engine", colorKey: "purple" },
      { name: "Multiplayer", colorKey: "cyan" },
    ],
  },

  // 32. OTHER FINGERS
  "OTHER FINGERS": {
    arch: {
      title: "Game Architecture",
      icon: "\u270B",
      components: [
        { label: "Engine", value: "Game Engine", colorKey: "blue" },
        { label: "Input", value: "Multi-Touch", colorKey: "purple" },
        { label: "Logic", value: "Collision Detect", colorKey: "amber" },
        { label: "Render", value: "2D Renderer", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Multi-Touch API", colorKey: "blue" },
      { name: "Canvas", colorKey: "purple" },
    ],
  },

  // 33. MAKE JUMPER
  "MAKE JUMPER": {
    arch: {
      title: "Game Architecture",
      icon: "\uD83E\uDD98",
      components: [
        { label: "Engine", value: "Game Engine", colorKey: "blue" },
        { label: "Input", value: "Touch Handler", colorKey: "purple" },
        { label: "Logic", value: "Multi-Char Logic", colorKey: "amber" },
        { label: "Render", value: "2D Renderer", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Game Loop", colorKey: "blue" },
      { name: "Canvas", colorKey: "purple" },
    ],
  },

  // 34. TINT
  "TINT": {
    matchKey: "TINT \u2014",
    arch: {
      title: "Game Architecture",
      icon: "\uD83C\uDFA8",
      components: [
        { label: "Engine", value: "Puzzle Engine", colorKey: "blue" },
        { label: "Input", value: "Touch Handler", colorKey: "purple" },
        { label: "Logic", value: "RGB Color Mix", colorKey: "amber" },
        { label: "Render", value: "Block Renderer", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Custom View", colorKey: "blue" },
      { name: "Color Theory", colorKey: "pink" },
    ],
  },

  // 35. 한글퍼즐
  "\uD55C\uAE00\uD37C\uC990": {
    arch: {
      title: "Game Architecture",
      icon: "\u3131",
      components: [
        { label: "Engine", value: "Puzzle Engine", colorKey: "blue" },
        { label: "Input", value: "Touch Handler", colorKey: "purple" },
        { label: "Logic", value: "Hangul Combine", colorKey: "amber" },
        { label: "Render", value: "Grid Renderer", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Custom View", colorKey: "blue" },
      { name: "Hangul Logic", colorKey: "purple" },
    ],
  },

  // 36. GET Z
  "GET Z": {
    arch: {
      title: "Game Architecture",
      icon: "\uD83D\uDD24",
      components: [
        { label: "Engine", value: "Puzzle Engine", colorKey: "blue" },
        { label: "Input", value: "Swipe Handler", colorKey: "purple" },
        { label: "Logic", value: "Letter Combine", colorKey: "amber" },
        { label: "Render", value: "Grid Renderer", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Custom View", colorKey: "blue" },
    ],
  },

  // 37. COLORIS MATRIX
  "COLORIS MATRIX": {
    arch: {
      title: "Game Architecture",
      icon: "\uD83D\uDFE5",
      components: [
        { label: "Engine", value: "Puzzle Engine", colorKey: "blue" },
        { label: "Input", value: "Touch/Long-Press", colorKey: "purple" },
        { label: "Logic", value: "Block Placement", colorKey: "amber" },
        { label: "Render", value: "Board Renderer", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Custom View", colorKey: "blue" },
      { name: "Strategy Logic", colorKey: "purple" },
    ],
  },

  // 38. 2048 X PLUS
  "2048 X PLUS": {
    arch: {
      title: "Game Architecture",
      icon: "\uD83D\uDD22",
      components: [
        { label: "Engine", value: "Puzzle Engine", colorKey: "blue" },
        { label: "Input", value: "Swipe Handler", colorKey: "purple" },
        { label: "Logic", value: "Merge Logic", colorKey: "amber" },
        { label: "Render", value: "Tile Renderer", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Custom View", colorKey: "blue" },
      { name: "Animation", colorKey: "pink" },
    ],
  },

  // 39. 최강 스도쿠
  "\uCD5C\uAC15 \uC2A4\uB3C4\uCFE0": {
    arch: {
      title: "Game Architecture",
      icon: "\uD83E\uDDE0",
      components: [
        { label: "Engine", value: "Sudoku Generator", colorKey: "blue" },
        { label: "Input", value: "Number Pad", colorKey: "purple" },
        { label: "Logic", value: "Validation Engine", colorKey: "amber" },
        { label: "Render", value: "9x9 Grid", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Backtracking", colorKey: "blue" },
      { name: "Custom View", colorKey: "purple" },
    ],
  },

  // 40. STAY ON THE PIANO LINE
  "STAY ON THE PIANO LINE": {
    arch: {
      title: "Game Architecture",
      icon: "\uD83C\uDFB9",
      components: [
        { label: "Engine", value: "Game Engine", colorKey: "blue" },
        { label: "Input", value: "Touch Handler", colorKey: "purple" },
        { label: "Logic", value: "Maze Generator", colorKey: "amber" },
        { label: "Render", value: "Line Renderer", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Canvas", colorKey: "blue" },
      { name: "Procedural Gen", colorKey: "purple" },
    ],
  },

  // 41. 2048 NUMBER PUZZLE
  "2048 NUMBER PUZZLE": {
    arch: {
      title: "Game Architecture",
      icon: "\uD83D\uDD22",
      components: [
        { label: "Engine", value: "Puzzle Engine", colorKey: "blue" },
        { label: "Input", value: "Swipe Handler", colorKey: "purple" },
        { label: "Logic", value: "Merge Logic", colorKey: "amber" },
        { label: "Render", value: "Tile Renderer", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Custom View", colorKey: "blue" },
      { name: "Dark Theme", colorKey: "indigo" },
    ],
  },

  // ── ETC UTILITY APPS ───────────────────────────────────────

  // 42. 전파·전자파 금속 탐지기
  "\uC804\uD30C": {
    matchKey: "\uC804\uD30C",
    arch: {
      title: "Sensor Flow",
      icon: "\uD83E\uDDF2",
      components: [
        { label: "Sensor", value: "Magnetometer", colorKey: "blue" },
        { label: "Process", value: "Signal Analysis", colorKey: "purple" },
        { label: "Output", value: "Gauge Display", colorKey: "amber" },
        { label: "Alert", value: "Threshold Alert", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Sensor API", colorKey: "blue" },
    ],
  },

  // 43. FLASH LIGHT FREE
  "FLASH LIGHT FREE": {
    arch: {
      title: "Hardware Control",
      icon: "\uD83D\uDD26",
      components: [
        { label: "Hardware", value: "Camera Flash", colorKey: "blue" },
        { label: "Control", value: "LED Driver", colorKey: "purple" },
        { label: "Mode", value: "Strobe Engine", colorKey: "amber" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Camera2 API", colorKey: "blue" },
    ],
  },

  // 44. SMART RULER
  "SMART RULER": {
    arch: {
      title: "Measurement Flow",
      icon: "\uD83D\uDCCF",
      components: [
        { label: "Input", value: "Touch Points", colorKey: "blue" },
        { label: "Calibrate", value: "DPI Mapping", colorKey: "purple" },
        { label: "Output", value: "CM/INCH Display", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Display Metrics", colorKey: "blue" },
    ],
  },

  // 45. LED 디지털 탁상 시계
  "LED \uB514\uC9C0\uD138 \uD0C1\uC0C1 \uC2DC\uACC4": {
    arch: {
      title: "Clock Engine",
      icon: "\u23F0",
      components: [
        { label: "Source", value: "System Clock", colorKey: "blue" },
        { label: "Render", value: "LED Font Engine", colorKey: "purple" },
        { label: "Output", value: "Fullscreen Display", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Custom View", colorKey: "blue" },
    ],
  },

  // 46. EASY 전광판 SCROLLER
  "EASY \uC804\uAD11\uD310": {
    arch: {
      title: "Scroller Engine",
      icon: "\uD83D\uDCDD",
      components: [
        { label: "Input", value: "Text Input", colorKey: "blue" },
        { label: "Engine", value: "Scroll Engine", colorKey: "purple" },
        { label: "Render", value: "LED Display", colorKey: "amber" },
        { label: "Effect", value: "Blink/Color", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Canvas Animation", colorKey: "blue" },
    ],
  },

  // 47. 안드로이드 수평계
  "\uC218\uD3C9\uACC4": {
    arch: {
      title: "Sensor Pipeline",
      icon: "\uD83D\uDCD0",
      components: [
        { label: "Sensor", value: "Orientation Sensor", colorKey: "blue" },
        { label: "Process", value: "Angle Compute", colorKey: "purple" },
        { label: "Output", value: "Level Display", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Sensor API", colorKey: "blue" },
    ],
  },

  // 48. 손전등 + 돋보기
  "\uC190\uC804\uB4F1 + \uB3CB\uBCF4\uAE30": {
    arch: {
      title: "Camera + Flash Flow",
      icon: "\uD83D\uDD0D",
      components: [
        { label: "Hardware", value: "LED Flash", colorKey: "blue" },
        { label: "Camera", value: "Zoom Engine", colorKey: "purple" },
        { label: "Output", value: "Preview + Capture", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Camera API", colorKey: "blue" },
    ],
  },

  // 49. 안드로이드 돋보기
  "\uC548\uB4DC\uB85C\uC774\uB4DC \uB3CB\uBCF4\uAE30": {
    arch: {
      title: "Zoom Pipeline",
      icon: "\uD83D\uDD0E",
      components: [
        { label: "Camera", value: "Camera Input", colorKey: "blue" },
        { label: "Zoom", value: "Digital Zoom", colorKey: "purple" },
        { label: "Light", value: "LED Flash", colorKey: "amber" },
        { label: "Output", value: "Display", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Camera API", colorKey: "blue" },
      { name: "Auto Focus", colorKey: "purple" },
    ],
  },

  // 50. 거울 어플
  "\uAC70\uC6B8 \uC5B4\uD50C": {
    arch: {
      title: "Camera Pipeline",
      icon: "\uD83E\uDE9E",
      components: [
        { label: "Input", value: "Front Camera", colorKey: "blue" },
        { label: "Process", value: "Mirror Flip", colorKey: "purple" },
        { label: "Output", value: "Fullscreen Preview", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Camera API", colorKey: "blue" },
    ],
  },

  // 51. 메트로놈
  "\uBA54\uD2B8\uB85C\uB188": {
    arch: {
      title: "Audio Timing Engine",
      icon: "\uD83C\uDFB5",
      components: [
        { label: "Input", value: "BPM Setting", colorKey: "blue" },
        { label: "Engine", value: "Timer Loop", colorKey: "purple" },
        { label: "Output", value: "Audio Tick", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "AudioTrack", colorKey: "blue" },
      { name: "Handler/Timer", colorKey: "purple" },
    ],
  },

  // 52. 안드로이드 LED 전광판
  "\uC548\uB4DC\uB85C\uC774\uB4DC LED \uC804\uAD11\uD310": {
    arch: {
      title: "LED Display Engine",
      icon: "\uD83D\uDCFA",
      components: [
        { label: "Input", value: "Text Editor", colorKey: "blue" },
        { label: "Render", value: "LED Font", colorKey: "purple" },
        { label: "Scroll", value: "Scroll Engine", colorKey: "amber" },
        { label: "Output", value: "Fullscreen LED", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Canvas", colorKey: "blue" },
      { name: "i18n", colorKey: "purple" },
    ],
  },

  // 53. 손전등 + 시계
  "\uC190\uC804\uB4F1 + \uC2DC\uACC4": {
    arch: {
      title: "Dual-Function Engine",
      icon: "\uD83D\uDD26",
      components: [
        { label: "Hardware", value: "LED Flash", colorKey: "blue" },
        { label: "Clock", value: "Digital Clock", colorKey: "purple" },
        { label: "Output", value: "Overlay Display", colorKey: "green" },
      ],
    },
    tech: [
      { name: "Android", colorKey: "green" },
      { name: "Java", colorKey: "orange" },
      { name: "Camera API", colorKey: "blue" },
    ],
  },
};

// ── Matching logic ───────────────────────────────────────────

function findChartForTitle(title) {
  for (const [key, data] of Object.entries(chartData)) {
    const matchTarget = data.matchKey || key;
    if (title.includes(matchTarget)) {
      return data;
    }
  }
  return null;
}

// ── Main ─────────────────────────────────────────────────────

const rows = db.prepare("SELECT id, title, detail FROM portfolio").all();
const updateStmt = db.prepare("UPDATE portfolio SET detail = ? WHERE id = ?");

let updated = 0;
let skipped = 0;
let noMatch = 0;

const tx = db.transaction(() => {
  for (const row of rows) {
    // Skip if already has visual chart
    if (row.detail && row.detail.includes('style="background: rgba')) {
      skipped++;
      continue;
    }

    const data = findChartForTitle(row.title);
    if (!data) {
      noMatch++;
      console.log(`  [NO MATCH] ${row.title}`);
      continue;
    }

    const archHtml = architectureFlow(data.arch.title, data.arch.icon, data.arch.components);
    const techHtml = techStackBadges(data.tech);
    const newDetail = (row.detail || "") + "\n\n" + archHtml + "\n" + techHtml;

    updateStmt.run(newDetail, row.id);
    updated++;
  }
});

tx();

console.log(`\nDone!`);
console.log(`  Updated: ${updated}`);
console.log(`  Skipped (already has chart): ${skipped}`);
console.log(`  No match: ${noMatch}`);
console.log(`  Total rows: ${rows.length}`);

db.close();
