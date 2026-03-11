/**
 * Add Visual Architecture Diagrams & Tech Stack Badges
 * to the 39 portfolio entries that are missing them.
 *
 * Usage: node scripts/add-visual-charts-2.cjs
 */
const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);

// ── Color palette (rgba values + text colors) ───────────────
const C = {
  blue:   { color: "59,130,246",  textColor: "#93c5fd" },
  purple: { color: "139,92,246",  textColor: "#c4b5fd" },
  green:  { color: "16,185,129",  textColor: "#6ee7b7" },
  amber:  { color: "245,158,11",  textColor: "#fcd34d" },
  rose:   { color: "244,63,94",   textColor: "#fda4af" },
  cyan:   { color: "6,182,212",   textColor: "#67e8f9" },
};

// Shorthand accessors
const BLUE   = C.blue;
const PURPLE = C.purple;
const GREEN  = C.green;
const AMBER  = C.amber;
const ROSE   = C.rose;
const CYAN   = C.cyan;

// ── Chart definitions for all 39 entries ────────────────────

const chartMap = {
  "Aerospace Research Institute Website": {
    archTitle: "System Architecture",
    components: [
      { layer: "Admin", name: "CMS Admin", ...BLUE },
      { layer: "Server", name: "PHP Server", ...PURPLE },
      { layer: "Database", name: "MySQL DB", ...GREEN },
      { layer: "Frontend", name: "Responsive Web", ...AMBER },
    ],
    techStack: [
      { name: "PHP", ...BLUE },
      { name: "MySQL", ...GREEN },
      { name: "HTML5", ...AMBER },
      { name: "CSS3", ...ROSE },
      { name: "JavaScript", ...CYAN },
    ],
  },

  "Barista Certification Registration Platform": {
    archTitle: "Registration Flow",
    components: [
      { layer: "Step 1", name: "Exam Selection", ...GREEN },
      { layer: "Step 2", name: "Registration", ...BLUE },
      { layer: "Step 3", name: "Payment PG", ...AMBER },
      { layer: "Step 4", name: "Receipt Printer", ...PURPLE },
    ],
    techStack: [
      { name: "PHP", ...BLUE },
      { name: "MySQL", ...GREEN },
      { name: "Payment API", ...AMBER },
      { name: "JavaScript", ...CYAN },
    ],
  },

  "Block Battle 3D : Multiplayer": {
    archTitle: "Game Pipeline",
    components: [
      { layer: "Input", name: "Touch Input", ...CYAN },
      { layer: "Engine", name: "Physics Engine", ...PURPLE },
      { layer: "Render", name: "3D Renderer", ...BLUE },
      { layer: "Network", name: "Network Sync", ...GREEN },
      { layer: "Output", name: "Opponent", ...AMBER },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "3D Physics", ...PURPLE },
      { name: "Bluetooth", ...CYAN },
    ],
  },

  "Dongdong — Interactive Read-Aloud Storybook": {
    archTitle: "Storybook Flow",
    components: [
      { layer: "Entry", name: "Story Select", ...AMBER },
      { layer: "Voice", name: "TTS/Recording", ...PURPLE },
      { layer: "Playback", name: "Audio Player", ...BLUE },
      { layer: "Visual", name: "Page Animation", ...GREEN },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "TTS API", ...PURPLE },
      { name: "MediaPlayer", ...AMBER },
    ],
  },

  "English Word Puzzle — Visual Edition with Picture Hints": {
    archTitle: "Puzzle Flow",
    components: [
      { layer: "Grid", name: "Word Grid", ...BLUE },
      { layer: "Input", name: "Touch Detect", ...CYAN },
      { layer: "Data", name: "Image Database", ...GREEN },
      { layer: "Output", name: "Visual Hint Display", ...AMBER },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "Custom View", ...PURPLE },
      { name: "SQLite", ...AMBER },
    ],
  },

  "Geumdan Biga Consultation & Internal ERP System": {
    archTitle: "ERP Flow",
    components: [
      { layer: "CRM", name: "Customer CRM", ...BLUE },
      { layer: "Log", name: "Consultation Log", ...GREEN },
      { layer: "Finance", name: "Billing", ...AMBER },
      { layer: "Insight", name: "Report Dashboard", ...PURPLE },
    ],
    techStack: [
      { name: "PHP", ...BLUE },
      { name: "MySQL", ...GREEN },
      { name: "jQuery", ...CYAN },
      { name: "Bootstrap", ...PURPLE },
    ],
  },

  "Gunblade Girl Idle AFK RPG": {
    archTitle: "Game Loop",
    components: [
      { layer: "Core", name: "Idle Engine", ...PURPLE },
      { layer: "Combat", name: "Auto Combat", ...ROSE },
      { layer: "Reward", name: "Loot System", ...AMBER },
      { layer: "Progress", name: "Character Growth", ...GREEN },
      { layer: "Monetize", name: "Gacha", ...CYAN },
    ],
    techStack: [
      { name: "Unity", ...PURPLE },
      { name: "C#", ...BLUE },
      { name: "Firebase", ...AMBER },
      { name: "Google Play", ...GREEN },
    ],
  },

  "KOREA SCIENCE Corporate Identity & Digital Platform": {
    archTitle: "Platform Flow",
    components: [
      { layer: "Design", name: "Brand Guide", ...ROSE },
      { layer: "System", name: "Design System", ...PURPLE },
      { layer: "Web", name: "Web Platform", ...BLUE },
      { layer: "Commerce", name: "E-commerce", ...GREEN },
    ],
    techStack: [
      { name: "Next.js", ...CYAN },
      { name: "React", ...BLUE },
      { name: "TypeScript", ...PURPLE },
      { name: "PostgreSQL", ...GREEN },
    ],
  },

  "Korea Science Official Website": {
    archTitle: "E-commerce Flow",
    components: [
      { layer: "Catalog", name: "Product Catalog", ...BLUE },
      { layer: "Cart", name: "Shopping Cart", ...AMBER },
      { layer: "API", name: "Order API", ...PURPLE },
      { layer: "Fulfill", name: "Shipping", ...GREEN },
    ],
    techStack: [
      { name: "PHP", ...BLUE },
      { name: "MySQL", ...GREEN },
      { name: "JavaScript", ...AMBER },
      { name: "E-commerce", ...ROSE },
    ],
  },

  "Korean Alphabet Puzzle — ㄱ to ㅎ": {
    archTitle: "Puzzle Engine",
    components: [
      { layer: "Board", name: "Game Board", ...CYAN },
      { layer: "Logic", name: "Merge Logic", ...PURPLE },
      { layer: "Data", name: "Korean Char Table", ...AMBER },
      { layer: "Score", name: "Score Manager", ...GREEN },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "Custom View", ...PURPLE },
      { name: "SQLite", ...AMBER },
    ],
  },

  "Low-Latency Video & Audio Streaming Library": {
    archTitle: "Streaming Pipeline",
    components: [
      { layer: "Source", name: "Encrypted Video", ...ROSE },
      { layer: "Transport", name: "HTTP Download", ...BLUE },
      { layer: "Decrypt", name: "Decrypt Engine", ...AMBER },
      { layer: "Player", name: "DirectShow Player", ...PURPLE },
    ],
    techStack: [
      { name: "C#", ...BLUE },
      { name: ".NET", ...PURPLE },
      { name: "DirectShow", ...AMBER },
      { name: "Windows Media SDK", ...CYAN },
    ],
  },

  "Merge Merge Defense : Survival": {
    archTitle: "Defense Game Loop",
    components: [
      { layer: "Place", name: "Tower Place", ...BLUE },
      { layer: "Merge", name: "Merge System", ...PURPLE },
      { layer: "Spawn", name: "Wave Spawner", ...ROSE },
      { layer: "AI", name: "Defense AI", ...GREEN },
      { layer: "Loot", name: "Reward", ...AMBER },
    ],
    techStack: [
      { name: "Unity", ...PURPLE },
      { name: "C#", ...BLUE },
      { name: "Firebase", ...AMBER },
      { name: "AdMob", ...GREEN },
    ],
  },

  "Modular Robot Coding Education App": {
    archTitle: "Coding Education Flow",
    components: [
      { layer: "Editor", name: "Block Code Editor", ...CYAN },
      { layer: "Command", name: "BT Command", ...BLUE },
      { layer: "Hardware", name: "Robot MCU", ...AMBER },
      { layer: "Feedback", name: "Motor/LED Feedback", ...GREEN },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "Bluetooth", ...CYAN },
      { name: "Education", ...PURPLE },
    ],
  },

  "NFC-Based Security Patrol System": {
    archTitle: "Patrol System Flow",
    components: [
      { layer: "Scan", name: "NFC Tag Scan", ...CYAN },
      { layer: "Mobile", name: "iOS App", ...BLUE },
      { layer: "Backend", name: "Server API", ...PURPLE },
      { layer: "Admin", name: "Admin Dashboard", ...AMBER },
      { layer: "Output", name: "Report", ...GREEN },
    ],
    techStack: [
      { name: "iOS", ...BLUE },
      { name: "Objective-C", ...PURPLE },
      { name: "NFC", ...CYAN },
      { name: "PHP", ...AMBER },
      { name: "MySQL", ...GREEN },
    ],
  },

  "Online Mass Registration System": {
    archTitle: "Registration Pipeline",
    components: [
      { layer: "Input", name: "Applicant Form", ...BLUE },
      { layer: "Queue", name: "Queue Server", ...PURPLE },
      { layer: "Payment", name: "Payment PG", ...AMBER },
      { layer: "Storage", name: "Ticket DB", ...GREEN },
      { layer: "Manage", name: "Admin", ...ROSE },
    ],
    techStack: [
      { name: "PHP", ...BLUE },
      { name: "MySQL", ...GREEN },
      { name: "Payment API", ...AMBER },
      { name: "Load Balancer", ...PURPLE },
    ],
  },

  "Open Account App Protection System": {
    archTitle: "Security Architecture",
    components: [
      { layer: "User", name: "User Account", ...BLUE },
      { layer: "Auth", name: "Auth Gate", ...ROSE },
      { layer: "Sandbox", name: "App Sandbox", ...PURPLE },
      { layer: "Monitor", name: "Process Monitor", ...AMBER },
      { layer: "Alert", name: "Alert", ...GREEN },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "Linux Kernel", ...PURPLE },
      { name: "SQLite", ...AMBER },
    ],
  },

  "PC Security Vulnerability Scanner Module": {
    archTitle: "Scan Pipeline",
    components: [
      { layer: "Scan", name: "System Scan", ...BLUE },
      { layer: "Registry", name: "Registry Check", ...PURPLE },
      { layer: "Files", name: "File Audit", ...AMBER },
      { layer: "Match", name: "Vuln DB Match", ...ROSE },
      { layer: "Output", name: "Report", ...GREEN },
    ],
    techStack: [
      { name: "C#", ...BLUE },
      { name: ".NET", ...PURPLE },
      { name: "Windows API", ...AMBER },
      { name: "Registry", ...CYAN },
    ],
  },

  "Remote Robot Control & Audio-Video Telepresence": {
    archTitle: "Telepresence Flow",
    components: [
      { layer: "Control", name: "Smartphone", ...BLUE },
      { layer: "Server", name: "Matching Server", ...PURPLE },
      { layer: "Link", name: "WiFi/BT", ...CYAN },
      { layer: "Hardware", name: "Robot MCU", ...AMBER },
      { layer: "Sensor", name: "Camera", ...GREEN },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "RS232", ...AMBER },
      { name: "WiFi", ...CYAN },
      { name: "Bluetooth", ...PURPLE },
    ],
  },

  "SPL Noise Meter — Real-Time Sound Level Measurement": {
    archTitle: "Audio Analysis Pipeline",
    components: [
      { layer: "Input", name: "Microphone", ...CYAN },
      { layer: "DSP", name: "FFT Analysis", ...PURPLE },
      { layer: "Calc", name: "dB Calculator", ...BLUE },
      { layer: "UI", name: "Meter UI", ...AMBER },
      { layer: "Storage", name: "History", ...GREEN },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "Audio API", ...PURPLE },
      { name: "FFT", ...CYAN },
    ],
  },

  "Sooju Industry Corporate Website": {
    archTitle: "System Architecture",
    components: [
      { layer: "Admin", name: "CMS Admin", ...BLUE },
      { layer: "Server", name: "Web Server", ...PURPLE },
      { layer: "Frontend", name: "Responsive Frontend", ...GREEN },
    ],
    techStack: [
      { name: "PHP", ...BLUE },
      { name: "MySQL", ...GREEN },
      { name: "HTML5", ...AMBER },
      { name: "CSS3", ...ROSE },
    ],
  },

  "Spherical Waterproof Telepresence Robot": {
    archTitle: "Robot Control Flow",
    components: [
      { layer: "Control", name: "Controller App", ...BLUE },
      { layer: "Link", name: "WiFi/BT", ...CYAN },
      { layer: "Core", name: "Robot MCU", ...AMBER },
      { layer: "Hardware", name: "Camera/Motor/Gyro", ...GREEN },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "Arduino", ...AMBER },
      { name: "Bluetooth", ...CYAN },
      { name: "IP Camera", ...PURPLE },
    ],
  },

  "TINT  RGB Color Block Puzzle": {
    archTitle: "Color Puzzle Engine",
    components: [
      { layer: "Palette", name: "Color Palette", ...ROSE },
      { layer: "Grid", name: "Block Grid", ...BLUE },
      { layer: "Engine", name: "RGB Mix Engine", ...PURPLE },
      { layer: "Match", name: "Target Matcher", ...AMBER },
      { layer: "Score", name: "Score", ...GREEN },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "Custom View", ...PURPLE },
      { name: "Color Science", ...ROSE },
    ],
  },

  "Tashu Racing — O2O Coupon-Linked Mobile Game": {
    archTitle: "O2O Game Flow",
    components: [
      { layer: "Game", name: "Race Engine", ...BLUE },
      { layer: "Collect", name: "Item Collection", ...AMBER },
      { layer: "Server", name: "Coupon Server", ...PURPLE },
      { layer: "Store", name: "O2O Store", ...GREEN },
      { layer: "Redeem", name: "Redemption", ...ROSE },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "Game Engine", ...PURPLE },
      { name: "REST API", ...CYAN },
    ],
  },

  "Tax Group Myungsung Corporate Website": {
    archTitle: "System Architecture",
    components: [
      { layer: "Admin", name: "CMS Admin", ...BLUE },
      { layer: "Server", name: "PHP Server", ...PURPLE },
      { layer: "Database", name: "MySQL", ...GREEN },
      { layer: "Frontend", name: "Responsive Web", ...AMBER },
    ],
    techStack: [
      { name: "PHP", ...BLUE },
      { name: "MySQL", ...GREEN },
      { name: "HTML5", ...AMBER },
      { name: "CSS3", ...ROSE },
      { name: "JavaScript", ...CYAN },
    ],
  },

  "Tear Tower: Infinite Jump": {
    archTitle: "Game Flow",
    components: [
      { layer: "Input", name: "Touch Input", ...CYAN },
      { layer: "Physics", name: "Jump Physics", ...PURPLE },
      { layer: "Level", name: "Procedural Levels", ...BLUE },
      { layer: "Score", name: "Score", ...AMBER },
      { layer: "Online", name: "Leaderboard", ...GREEN },
    ],
    techStack: [
      { name: "Unity", ...PURPLE },
      { name: "C#", ...BLUE },
      { name: "Firebase", ...AMBER },
      { name: "Google Play", ...GREEN },
    ],
  },

  "Ultimate Sudoku": {
    archTitle: "Sudoku Engine",
    components: [
      { layer: "Generate", name: "Puzzle Generator", ...BLUE },
      { layer: "Solve", name: "Backtracking Solver", ...PURPLE },
      { layer: "Validate", name: "Unique Solution Validator", ...ROSE },
      { layer: "UI", name: "Grid UI", ...GREEN },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "Algorithm", ...PURPLE },
      { name: "Custom View", ...AMBER },
    ],
  },

  "Unizine Corporate Portfolio Website": {
    archTitle: "System Architecture",
    components: [
      { layer: "Admin", name: "CMS", ...BLUE },
      { layer: "Gallery", name: "Portfolio Gallery", ...PURPLE },
      { layer: "Frontend", name: "Responsive Frontend", ...GREEN },
    ],
    techStack: [
      { name: "PHP", ...BLUE },
      { name: "MySQL", ...GREEN },
      { name: "JavaScript", ...AMBER },
      { name: "CSS3", ...ROSE },
    ],
  },

  "Vehicle Alcohol Detection & Logging System": {
    archTitle: "Detection Flow",
    components: [
      { layer: "Sensor", name: "BT Alcohol Sensor", ...ROSE },
      { layer: "Link", name: "BT SPP", ...CYAN },
      { layer: "App", name: "Android Logger", ...BLUE },
      { layer: "Storage", name: "CSV/Log Storage", ...GREEN },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "Bluetooth SPP", ...CYAN },
      { name: "File I/O", ...AMBER },
    ],
  },

  "Vehicle Blackbox Remote Monitoring IoT Platform": {
    archTitle: "IoT Platform Flow",
    components: [
      { layer: "Device", name: "Vehicle Blackbox", ...ROSE },
      { layer: "Modem", name: "LTE Modem", ...CYAN },
      { layer: "Cloud", name: "Cloud Server", ...PURPLE },
      { layer: "Web", name: "Web Dashboard", ...BLUE },
      { layer: "Mobile", name: "Mobile App", ...GREEN },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "PHP", ...PURPLE },
      { name: "MySQL", ...AMBER },
      { name: "LTE", ...CYAN },
    ],
  },

  "Weather-Based Music Recommendation & Streaming": {
    archTitle: "Recommendation Flow",
    components: [
      { layer: "Location", name: "GPS Location", ...CYAN },
      { layer: "API", name: "Weather API", ...BLUE },
      { layer: "DB", name: "Music DB", ...PURPLE },
      { layer: "Stream", name: "Streaming Engine", ...AMBER },
      { layer: "UI", name: "Player UI", ...GREEN },
    ],
    techStack: [
      { name: "Android", ...GREEN },
      { name: "Java", ...BLUE },
      { name: "PHP", ...PURPLE },
      { name: "GIS API", ...CYAN },
      { name: "Weather API", ...AMBER },
    ],
  },

  "선박운항 시뮬레이터 시작품 제작": {
    archTitle: "Simulator Architecture",
    components: [
      { layer: "Input", name: "Ship Parameters", ...BLUE },
      { layer: "Physics", name: "MMG Dynamics", ...PURPLE },
      { layer: "Render", name: "3D Renderer", ...CYAN },
      { layer: "Network", name: "WebSocket", ...AMBER },
      { layer: "Display", name: "Browser Cockpit", ...GREEN },
    ],
    techStack: [
      { name: "WebGL", ...CYAN },
      { name: "Three.js", ...BLUE },
      { name: "Node.js", ...GREEN },
      { name: "WebSocket", ...AMBER },
    ],
  },

  "Brick Breaker: Legendary": {
    archTitle: "Game Flow",
    components: [
      { layer: "Input", name: "Touch Aim", ...CYAN },
      { layer: "Physics", name: "Ball Physics", ...PURPLE },
      { layer: "Grid", name: "Brick Grid", ...BLUE },
      { layer: "Items", name: "Power-ups", ...AMBER },
      { layer: "Clear", name: "Stage Clear", ...GREEN },
    ],
    techStack: [
      { name: "Unity", ...PURPLE },
      { name: "C#", ...BLUE },
      { name: "Firebase", ...AMBER },
      { name: "AdMob", ...GREEN },
    ],
  },

  "하얀 마녀의 노래 : 방치형 RPG 마법사 키우기": {
    archTitle: "Idle RPG Loop",
    components: [
      { layer: "Timer", name: "Idle Timer", ...AMBER },
      { layer: "Combat", name: "Auto Battle", ...ROSE },
      { layer: "Growth", name: "Skill Tree", ...PURPLE },
      { layer: "Gear", name: "Equipment", ...BLUE },
      { layer: "Monetize", name: "Gacha System", ...GREEN },
    ],
    techStack: [
      { name: "Unity", ...PURPLE },
      { name: "C#", ...BLUE },
      { name: "Firebase", ...AMBER },
      { name: "Google Play", ...GREEN },
    ],
  },

  " More Fast : Stack Breaker - CROSS WORLDS": {
    archTitle: "Stack Game Flow",
    components: [
      { layer: "Input", name: "Tap Input", ...CYAN },
      { layer: "Align", name: "Stack Alignment", ...BLUE },
      { layer: "Speed", name: "Speed Ramp", ...AMBER },
      { layer: "Combo", name: "Combo System", ...ROSE },
      { layer: "Score", name: "Score", ...GREEN },
    ],
    techStack: [
      { name: "Unity", ...PURPLE },
      { name: "C#", ...BLUE },
      { name: "Firebase", ...AMBER },
    ],
  },

  "고양이 회사 키우기 ": {
    archTitle: "Business Sim Loop",
    components: [
      { layer: "Core", name: "Business Sim", ...BLUE },
      { layer: "HR", name: "Cat Hiring", ...AMBER },
      { layer: "Economy", name: "Revenue Loop", ...GREEN },
      { layer: "Shop", name: "Upgrade Shop", ...PURPLE },
      { layer: "Events", name: "Events", ...ROSE },
    ],
    techStack: [
      { name: "Unity", ...PURPLE },
      { name: "C#", ...BLUE },
      { name: "Firebase", ...AMBER },
      { name: "Google Play", ...GREEN },
    ],
  },

  "HITORI - Number Logic Puzzle": {
    archTitle: "Puzzle Engine",
    components: [
      { layer: "Generate", name: "Grid Generate", ...BLUE },
      { layer: "Solve", name: "Constraint Solver", ...PURPLE },
      { layer: "Validate", name: "Unique Solution", ...ROSE },
      { layer: "Input", name: "Player Input", ...CYAN },
      { layer: "Check", name: "Validation", ...GREEN },
    ],
    techStack: [
      { name: "Unity", ...PURPLE },
      { name: "C#", ...BLUE },
      { name: "Algorithm", ...AMBER },
      { name: "Google Play", ...GREEN },
    ],
  },

  "Classic 2048–Puzzle Game": {
    archTitle: "2048 Game Flow",
    components: [
      { layer: "Input", name: "Swipe Input", ...CYAN },
      { layer: "Logic", name: "Tile Merge", ...PURPLE },
      { layer: "Score", name: "Score Counter", ...AMBER },
      { layer: "Save", name: "Best Score Storage", ...GREEN },
      { layer: "End", name: "Game Over Check", ...ROSE },
    ],
    techStack: [
      { name: "Unity", ...PURPLE },
      { name: "C#", ...BLUE },
      { name: "PlayerPrefs", ...AMBER },
      { name: "Google Play", ...GREEN },
    ],
  },

  "Akari : Light Up Puzzle Game": {
    archTitle: "Light Up Engine",
    components: [
      { layer: "Generate", name: "Grid Generate", ...BLUE },
      { layer: "Light", name: "Light Propagation", ...AMBER },
      { layer: "Rules", name: "Constraint Check", ...PURPLE },
      { layer: "Input", name: "Player Place", ...CYAN },
      { layer: "Win", name: "Win Validate", ...GREEN },
    ],
    techStack: [
      { name: "Unity", ...PURPLE },
      { name: "C#", ...BLUE },
      { name: "Algorithm", ...AMBER },
      { name: "Google Play", ...GREEN },
    ],
  },

  "Star Placement: Logic Puzzle": {
    archTitle: "Logic Puzzle Engine",
    components: [
      { layer: "Generate", name: "Grid Generate", ...BLUE },
      { layer: "Rules", name: "Star Rules Engine", ...ROSE },
      { layer: "Validate", name: "Constraint Validator", ...PURPLE },
      { layer: "Input", name: "Player Input", ...CYAN },
      { layer: "Check", name: "Solution Check", ...GREEN },
    ],
    techStack: [
      { name: "Unity", ...PURPLE },
      { name: "C#", ...BLUE },
      { name: "Algorithm", ...AMBER },
      { name: "Google Play", ...GREEN },
    ],
  },
};

// ── HTML generators ─────────────────────────────────────────

function buildChartHtml(chart) {
  const archBoxes = chart.components
    .map(
      (c) =>
        `<div style="background: rgba(${c.color},0.15); border: 1px solid rgba(${c.color},0.3); padding: 14px 18px; border-radius: 10px; text-align: center; min-width: 100px;"><div style="font-size: 11px; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 1px;">${c.layer}</div><div style="color: ${c.textColor}; font-weight: 600; margin-top: 4px;">${c.name}</div></div>`
    )
    .join(
      '<div style="color: rgba(255,255,255,0.2); font-size: 18px;">\u2192</div>'
    );

  const techBadges = chart.techStack
    .map(
      (t) =>
        `<span style="background: rgba(${t.color},0.15); color: ${t.textColor}; padding: 6px 14px; border-radius: 9999px; font-size: 13px; border: 1px solid rgba(${t.color},0.2);">${t.name}</span>`
    )
    .join("");

  return (
    `<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; margin: 32px 0;">` +
    `<h3 style="color: #a78bfa; margin: 0 0 20px 0; text-align: center; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">\u2699\uFE0F ${chart.archTitle}</h3>` +
    `<div style="display: flex; align-items: center; justify-content: center; gap: 8px; flex-wrap: wrap;">${archBoxes}</div></div>` +
    `<div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 28px; margin: 16px 0;">` +
    `<h3 style="color: #a78bfa; margin: 0 0 16px 0; font-size: 14px; letter-spacing: 2px; text-transform: uppercase;">\uD83D\uDEE0 Tech Stack</h3>` +
    `<div style="display: flex; gap: 8px; flex-wrap: wrap;">${techBadges}</div></div>`
  );
}

// ── Main execution ──────────────────────────────────────────

// Get all entries without charts
const rows = db
  .prepare(
    "SELECT id, title, detail FROM portfolio WHERE detail NOT LIKE '%background: rgba%'"
  )
  .all();

console.log(`Found ${rows.length} entries without charts.\n`);

const update = db.prepare("UPDATE portfolio SET detail = ? WHERE id = ?");

let count = 0;
for (const row of rows) {
  const chart = chartMap[row.title];
  if (!chart) {
    console.log("\u26A0\uFE0F  No chart mapping for:", JSON.stringify(row.title));
    continue;
  }

  const chartHtml = buildChartHtml(chart);
  update.run(row.detail + chartHtml, row.id);
  count++;
  console.log("\u2705 Updated:", row.title);
}

console.log(`\nTotal: ${count} entries updated`);
db.close();
