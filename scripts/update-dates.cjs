const Database = require('better-sqlite3');
const db = new Database('data/hadeul.db');

// User's chronological project list with years
// Format: { keyword(s) to match DB title: year }
const projectYears = [
  // 2026
  { match: 'AI 코랩샵 에이전트', year: 2026 },
  { match: '똑똑한 부등호', year: 2026 },
  { match: 'HITORI', year: 2026 },
  { match: 'Akari', year: 2026 },
  { match: 'Star Placement', year: 2026 },
  { match: 'Brick Breaker', year: 2026 },

  // 2024
  { match: 'Merge Merge Defense', year: 2024 },
  { match: 'TMD 미션 코드이썬', year: 2024 },
  { match: '무인기 지상통제', year: 2024 },
  { match: '축산악취 수집', year: 2024 },
  { match: '전산유체역학', year: 2024 },
  { match: '신재생에너지', year: 2024 },

  // 2023
  { match: 'Gunblade Girl', year: 2023 },

  // 2021
  { match: '삼성중공업 선형설계', year: 2021 },
  { match: '엠텍 인공지능', year: 2021 },
  { match: '무인 태닝', year: 2021 },
  { match: '한국효문화진흥원 본청', year: 2021 },
  { match: '한국효문화진흥원 자료', year: 2021 },
  { match: '대둔산 자연휴양림', year: 2021 },
  { match: '젠틀글램핑', year: 2021 },
  { match: 'Tax Group Myungsung', year: 2021 },
  { match: 'ICT 스마트 예비군', year: 2021 },
  { match: '하얀 마녀의 노래', year: 2021 },  // 메이지키우기 = 하얀 마녀?

  // 2020
  { match: '고양이 회사 키우기', year: 2020 },

  // 2019
  { match: 'Tear Tower', year: 2019 },
  { match: 'More Fast', year: 2019 },
  { match: '충남대 음성인식', year: 2019 },
  { match: 'S-100 수로정보 실해역', year: 2019 },
  { match: '전국 초등학교', year: 2019 },
  { match: '동양전기산업', year: 2019 },
  { match: '시온냉동', year: 2019 },
  { match: '자전거 무인대여', year: 2019 },
  { match: 'cocos2d-x 게임엔진', year: 2019 },

  // 2017
  { match: '선박운항 시뮬레이터', year: 2017 },
  { match: 'Dongdong', year: 2017 },  // 읽어주는 동화책
  { match: 'Bluelight LED', year: 2017 },
  { match: 'Vehicle Blackbox', year: 2017 },  // 전원블랙박스
  { match: '자재관리 유통', year: 2017 },
  { match: 'KOREA SCIENCE', year: 2017 },
  { match: '한국스토리텔링', year: 2017 },
  { match: 'Aerospace Research', year: 2017 },  // 항공우주력연구원
  { match: 'Railroad Vehicle', year: 2017 },  // 코레일
  { match: '딥러닝 기반 비정형', year: 2017 },  // DICTO

  // 2015
  { match: 'NFC-Based Security', year: 2015 },
  { match: 'Online Mass Registration', year: 2015 },  // 베이비페어
  { match: 'S-100 Registry', year: 2015 },
  { match: '참진국제특허', year: 2015 },
  { match: '코미텍 O2O', year: 2015 },

  // 2014-2010
  { match: 'Open Account App', year: 2014 },
  { match: 'Spherical Waterproof', year: 2014 },
  { match: 'Barista Certification', year: 2013 },
  { match: 'Unizine', year: 2013 },
  { match: 'Geumdan Biga', year: 2013 },
  { match: 'Weather-Based Music', year: 2013 },
  { match: 'Tashu Racing', year: 2013 },
  { match: 'Modular Robot Coding', year: 2012 },
  { match: 'Low-Latency Video', year: 2012 },
  { match: 'DIRECTREADER', year: 2012 },
  { match: 'Vehicle Alcohol', year: 2012 },
  { match: 'PC Security Vulnerability', year: 2012 },
  { match: 'Remote Robot Control', year: 2014 },
  { match: 'Sooju Industry', year: 2013 },  // 수주산업
  { match: 'Microsoft Azure 빅데이터', year: 2017 },  // Azure 얼굴인식
  { match: 'FIBERPRO', year: 2017 },

  // Games (self-published utilities/games - estimate ~2013-2016 based on context)
  { match: 'GPS HUD Speedometer', year: 2015 },
  { match: 'SPL Noise Meter', year: 2015 },
  { match: 'RAIN SOUNDS', year: 2015 },
  { match: 'English Word Puzzle', year: 2014 },
  { match: 'Block Battle 3D', year: 2014 },
  { match: 'OTHER FINGERS', year: 2014 },
  { match: 'MAKE JUMPER', year: 2014 },
  { match: 'TINT', year: 2014 },
  { match: 'Korean Alphabet Puzzle', year: 2014 },
  { match: 'GET Z', year: 2014 },
  { match: 'COLORIS MATRIX', year: 2014 },
  { match: '2048 X PLUS', year: 2014 },
  { match: 'Ultimate Sudoku', year: 2014 },
  { match: 'STAY ON THE PIANO', year: 2014 },
  { match: '2048 NUMBER PUZZLE', year: 2014 },
  { match: 'Classic 2048', year: 2014 },
  { match: '전파·전자파 금속', year: 2013 },
  { match: 'FLASH LIGHT FREE', year: 2013 },
  { match: 'SMART RULER', year: 2013 },
  { match: 'LED 디지털 탁상', year: 2013 },
  { match: 'EASY 전광판', year: 2013 },
  { match: '안드로이드 수평계', year: 2013 },
  { match: '손전등 + 돋보기', year: 2012 },
  { match: '안드로이드 돋보기', year: 2012 },
  { match: '거울 어플', year: 2012 },
  { match: '메트로놈', year: 2012 },
  { match: '안드로이드 LED 전광판', year: 2012 },
  { match: '손전등 + 시계', year: 2012 },
  { match: '여행 스케줄', year: 2017 },

  // Semugroup 세무그룹명성 - user listed it in 2017 AND 2021
  // DB has Tax Group Myungsung - already matched above to 2021
];

const rows = db.prepare('SELECT id, title, created_at, year FROM portfolio').all();

let updated = 0;
let notMatched = [];
const matchedIds = new Set();

for (const proj of projectYears) {
  const match = rows.find(r => r.title.includes(proj.match));
  if (match) {
    // Set created_at to year-06-01 for ordering (mid-year)
    const newDate = `${proj.year}-06-01 00:00:00`;
    db.prepare('UPDATE portfolio SET created_at = ?, year = ? WHERE id = ?').run(newDate, proj.year, match.id);
    matchedIds.add(match.id);
    updated++;
    console.log(`  [OK] ${match.title} → ${proj.year}`);
  } else {
    console.log(`  [MISS] "${proj.match}" not found in DB`);
  }
}

// Check for DB entries that weren't matched
const unmatched = rows.filter(r => !matchedIds.has(r.id));
if (unmatched.length > 0) {
  console.log('\n--- DB entries NOT matched to year list ---');
  for (const r of unmatched) {
    console.log(`  ${r.title} (current: ${r.created_at})`);
  }
}

console.log(`\nDone! Updated: ${updated}, DB unmatched: ${unmatched.length}`);

// Now identify projects from user's list that are NOT in the DB
console.log('\n=== MISSING FROM DATABASE (적용안한것들) ===');
const missingProjects = [
  // 2021 - 메이지키우기 (might not be in DB)
  '메이지키우기',
  // 2019 - ColorPop
  'ColorPop',
  // 2017 - (주)삼양 바이오팜 바코드 System
  '(주)삼양 바이오팜 바코드',
  // 2017 - 앱스토리 매거진 인터뷰
  '앱스토리 매거진 인터뷰',
  // 2010-2009
  '청주 화제신문',
  '넥스트키 Web',
  '이츠미 ERP',
  'EbroadCast matching System',
  // 2014-2010
  '모터그래프 Web',
  'Vistion Tech Web',
];

for (const name of missingProjects) {
  const found = rows.find(r => r.title.includes(name.replace(' Web', '').replace(' ERP', '')));
  if (found) {
    console.log(`  [EXISTS] ${name} → ${found.title}`);
  } else {
    console.log(`  [MISSING] ${name}`);
  }
}

db.close();
