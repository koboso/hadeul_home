/**
 * Restore 4 deleted logic puzzle game entries + remove visual chart HTML from ALL game entries.
 *
 * Usage: node scripts/restore-logic-puzzles.cjs
 */
const Database = require("better-sqlite3");
const path = require("path");
const crypto = require("crypto");

const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);

/* ================================================================
   Part 1: Re-insert 4 deleted logic puzzle game entries
   ================================================================ */

const insert = db.prepare(
  `INSERT INTO portfolio (id, category_id, client, title, description, detail, image, year, month, is_featured, sort_order)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
);

/* ── Detail HTML ─────────────────────────────────────────────── */

const detailHitori = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>HITORI는 일본 전통 논리 퍼즐을 모바일 환경에 최적화하여 구현한 숫자 기반 퍼즐 게임입니다. 격자판 위에 배치된 숫자들 중 중복되는 숫자를 논리적으로 추론하여 음영 처리하는 방식으로, 각 행과 열에 같은 숫자가 반복되지 않도록 완성하는 것이 목표입니다. 직관적인 터치 인터페이스와 단계별 난이도 시스템을 통해 퍼즐 입문자부터 상급자까지 폭넓은 사용자층을 확보하고자 기획되었습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture</h2>
  <p><strong style="color: #f87171;">Problem:</strong> Hitori 퍼즐은 음영 처리된 셀이 서로 인접하지 않아야 하고, 음영 처리되지 않은 셀이 하나의 연결된 그룹을 형성해야 하는 복합적인 제약 조건을 동시에 만족시켜야 합니다. 이러한 다중 제약 조건의 실시간 검증과 유일해 보장이 기술적 난제였습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> 백트래킹 기반 유일해 검증 알고리즘을 구현하여 퍼즐 생성 시 반드시 단 하나의 해답만 존재하도록 보장하였습니다. 연결성 검사는 Union-Find 자료구조를 활용하여 O(α(n)) 시간 복잡도로 효율적으로 처리하며, 5×5부터 12×12까지 다양한 격자 크기를 지원합니다. 힌트 시스템은 제약 전파(Constraint Propagation) 기법을 적용하여 사용자에게 논리적 추론 단서를 단계적으로 제공합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact</h2>
  <p>Hitori 퍼즐의 핵심인 '중복 제거'와 '연결성 유지'라는 이중 제약 구조를 정확히 구현함으로써, 종이 퍼즐 수준의 정교한 논리적 도전을 모바일에서 재현하였습니다. 유일해 검증 시스템은 사용자가 풀이 과정에서 모호함 없이 논리적 추론만으로 해답에 도달할 수 있도록 보장하며, 자동 난이도 조절 알고리즘은 사용자의 풀이 패턴을 분석하여 적절한 수준의 퍼즐을 지속적으로 제공합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>퍼즐 생성 엔진은 제약 충족 문제(CSP) 솔버를 기반으로 설계되었으며, 난이도별 제약 조건의 복잡도를 매개변수로 제어합니다. 실시간 유효성 검증 모듈은 사용자의 각 입력에 대해 행·열 중복 검사와 인접 음영 검사를 병렬로 수행하여 즉각적인 피드백을 제공합니다. 게임 상태 직렬화를 통해 풀이 중단 시 정확한 지점에서 재개할 수 있으며, 풀이 이력 추적 기능으로 실행 취소/다시 실행을 무제한으로 지원합니다.</p>

</div>`;

const detailAkari = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>Akari(Light Up)는 격자판 위에 전구를 배치하여 모든 빈 칸을 빛으로 채우는 논리 퍼즐 게임입니다. 검은 벽 블록에 표시된 숫자는 해당 블록에 인접한 전구의 개수를 나타내며, 두 전구가 서로를 비추지 않도록 배치해야 하는 제약 조건이 핵심입니다. 빛의 확산이라는 직관적인 시각적 메타포를 통해 높은 몰입감과 논리적 사고력 훈련을 동시에 제공합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture</h2>
  <p><strong style="color: #f87171;">Problem:</strong> Akari 퍼즐 생성에서 가장 어려운 부분은 모든 빈 칸이 조명되면서도 두 전구가 같은 행 또는 열에서 장애물 없이 마주보지 않는 유일한 배치를 생성하는 것입니다. 검은 벽 블록의 위치와 숫자 힌트의 조합이 퍼즐의 난이도와 풀이 가능성을 동시에 결정하므로, 이를 체계적으로 제어하는 생성 알고리즘이 필요했습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> 제약 충족 기반 퍼즐 생성기를 구현하여 벽 블록 배치 → 전구 위치 결정 → 숫자 힌트 산출 → 유일해 검증의 파이프라인을 구축하였습니다. 빛의 확산은 행·열 단위 레이캐스팅으로 처리하며, 실시간 조명 시각화를 통해 사용자가 배치 결과를 즉시 확인할 수 있습니다. Arc Consistency 알고리즘을 적용하여 논리적으로 풀 수 있는 퍼즐만 출제되도록 보장합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact</h2>
  <p>빛의 확산과 그림자라는 시각적 요소를 논리 퍼즐에 결합하여, 추상적인 제약 조건을 직관적으로 이해할 수 있는 게임 경험을 구현하였습니다. 전구 배치 시 실시간으로 조명 영역이 표시되어 사용자의 의사결정을 시각적으로 보조하며, 충돌하는 전구 쌍은 경고 표시로 즉각 피드백을 제공합니다. 7×7부터 14×14까지의 격자 크기와 4단계 난이도를 지원하여 다양한 수준의 플레이어에게 적절한 도전을 제공합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>조명 시뮬레이션 엔진은 각 전구의 빛을 상하좌우 4방향으로 벽 블록을 만날 때까지 확산시키는 레이캐스팅 방식으로 구현되었으며, 격자 전체의 조명 상태를 비트맵으로 관리하여 O(1) 시간에 특정 셀의 조명 여부를 판별합니다. 퍼즐 생성기는 난이도 매개변수에 따라 벽 블록 밀도, 숫자 힌트 비율, 필요한 추론 깊이를 조절하며, 생성된 퍼즐의 유일해 여부를 DFS 기반 솔버로 검증합니다.</p>

</div>`;

const detailStar = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>Star Placement는 격자판을 여러 영역으로 나누고, 각 행·열·영역에 정확히 N개의 별을 배치하는 규칙 기반 논리 퍼즐 게임입니다. 별은 대각선을 포함하여 서로 인접할 수 없다는 제약 조건이 핵심이며, 영역 분할 패턴과 별의 개수에 따라 무한한 조합의 퍼즐을 생성할 수 있습니다. 간결한 규칙 속에 깊은 논리적 추론을 요구하는 퍼즐 설계로, 고급 퍼즐 애호가들에게 높은 만족도를 제공합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture</h2>
  <p><strong style="color: #f87171;">Problem:</strong> Star Placement 퍼즐의 핵심 과제는 유효한 영역 분할 생성과 유일해 보장입니다. 영역의 형태와 크기가 퍼즐의 난이도에 직접적인 영향을 미치며, 별 N개 조건과 비인접 제약을 동시에 만족하는 영역 분할을 알고리즘적으로 생성하는 것이 기술적 핵심이었습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> 제약 전파(Constraint Propagation) 기반의 퍼즐 솔버와 역방향 퍼즐 생성기를 결합하여 구현하였습니다. 먼저 유효한 별 배치를 생성한 후 이를 만족하는 영역 분할을 역으로 구축하는 방식으로, 반드시 풀 수 있는 퍼즐을 효율적으로 생성합니다. 제약 전파 깊이를 제어하여 Naked Single, Hidden Single, Region Intersection 등 다양한 난이도의 논리 기법이 필요한 퍼즐을 단계적으로 출제합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact</h2>
  <p>영역 기반 제약과 위치 기반 제약이 결합된 독특한 퍼즐 메커니즘을 통해, 스도쿠와는 차별화된 공간 추론 경험을 제공합니다. 각 영역을 고유한 색상으로 시각화하여 복잡한 영역 경계를 직관적으로 파악할 수 있으며, 별 배치 시 자동으로 비인접 영역이 하이라이트되어 유효한 배치 위치를 시각적으로 안내합니다. 8×8 격자에 별 1개부터 10×10 격자에 별 2개까지의 난이도 범위를 지원합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>영역 분할 생성기는 Voronoi 다이어그램 기반 시드 알고리즘과 랜덤 셀 병합 알고리즘을 하이브리드로 적용하여 자연스러운 영역 형태를 생성합니다. 솔버는 제약 전파와 백트래킹을 조합하여 퍼즐의 난이도를 정량적으로 측정하며, 풀이에 필요한 최소 추론 기법 집합을 분석하여 난이도 등급을 자동 산정합니다. 게임 내 힌트 시스템은 현재 상태에서 적용 가능한 가장 단순한 논리 기법을 탐색하여 단계별 풀이 가이드를 제공합니다.</p>

</div>`;

const detailFutoshiki = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>똑똑한 부등호 스도쿠 퍼즐은 전통 스도쿠에 인접 셀 간 부등호 조건을 추가한 변형 논리 퍼즐입니다. 각 행과 열에 1부터 N까지의 숫자를 중복 없이 배치하되, 셀 사이에 표시된 부등호(<, >) 관계를 모두 만족시켜야 합니다. 숫자 배치와 크기 비교라는 이중 제약 구조가 기존 스도쿠 대비 한 차원 높은 논리적 추론을 요구하며, 수학적 사고력 향상에 효과적인 교육용 퍼즐로도 활용됩니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture</h2>
  <p><strong style="color: #f87171;">Problem:</strong> 부등호 스도쿠는 숫자 중복 불가 제약과 부등호 순서 제약이 동시에 적용되므로, 퍼즐 생성 시 두 제약 조건의 상호작용을 고려한 유일해 보장이 일반 스도쿠 대비 훨씬 복잡합니다. 또한 부등호 힌트의 수와 위치가 난이도에 직접 영향을 미치므로, 이를 정밀하게 제어하는 생성 로직이 필요했습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> 고급 제약 기반 퍼즐 생성 엔진을 개발하여, 완전한 유효 격자 생성 → 부등호 배치 → 초기 숫자 제거 → 유일해 검증의 4단계 파이프라인을 구축하였습니다. Arc Consistency(AC-3) 알고리즘으로 부등호 제약을 전파하고, 난이도별로 제공되는 부등호 힌트의 비율과 초기 노출 숫자의 수를 매개변수로 조절합니다. 4×4부터 9×9까지의 격자 크기를 지원하며, 각 크기별로 4단계 난이도를 제공합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact</h2>
  <p>부등호 조건의 추가를 통해 단순 숫자 배치를 넘어 순서 관계 추론이라는 새로운 사고 과정을 요구함으로써, 기존 스도쿠 사용자에게 신선한 도전을 제공합니다. 부등호 방향이 시각적으로 명확하게 표시되어 제약 조건을 즉시 파악할 수 있으며, 부등호 체인을 따라가며 가능한 숫자 범위를 좁혀가는 추론 과정이 높은 몰입감을 유발합니다. 교육 현장에서는 부등식 개념과 논리적 사고력 훈련 도구로 활용되고 있습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>제약 솔버는 AC-3 기반 아크 일관성 유지와 Naked/Hidden Subset 탐지를 결합하여 인간이 풀 수 있는 수준의 퍼즐만 생성합니다. 부등호 체인 분석 모듈은 연속된 부등호 관계를 그래프로 모델링하여 숫자 범위를 자동으로 추론하며, 이를 힌트 시스템에 활용합니다. 입력 인터페이스는 숫자 후보 메모 기능, 부등호 만족 여부 실시간 표시, 연쇄 추론 하이라이트 등 풀이 보조 기능을 제공하여 사용자의 논리적 사고 과정을 효과적으로 지원합니다.</p>

</div>`;

/* ── Entries to insert ───────────────────────────────────────── */

const entries = [
  [
    crypto.randomUUID(), "cat-game", "하들소프트",
    "HITORI - Number Logic Puzzle",
    "일본 전통 퍼즐 히토리를 모바일로 구현한 숫자 논리 퍼즐 게임",
    detailHitori,
    "/images/portfolio/default-game.jpg",
    2026, 1, 0, 0
  ],
  [
    crypto.randomUUID(), "cat-game", "하들소프트",
    "Akari : Light Up Puzzle Game",
    "빛을 배치하여 모든 칸을 밝히는 논리 퍼즐 게임",
    detailAkari,
    "/images/portfolio/default-game.jpg",
    2026, 1, 0, 0
  ],
  [
    crypto.randomUUID(), "cat-game", "하들소프트",
    "Star Placement: Logic Puzzle",
    "각 영역에 별을 배치하는 규칙 기반 논리 퍼즐 게임",
    detailStar,
    "/images/portfolio/default-game.jpg",
    2026, 1, 0, 0
  ],
  [
    crypto.randomUUID(), "cat-game", "하들소프트",
    "똑똑한 부등호 스도쿠 퍼즐",
    "부등호 조건이 추가된 변형 스도쿠 논리 퍼즐",
    detailFutoshiki,
    "/images/portfolio/default-game.jpg",
    2026, 1, 0, 0
  ],
];

console.log("=== Part 1: Inserting 4 logic puzzle game entries ===\n");

let insertCount = 0;
for (const entry of entries) {
  try {
    insert.run(...entry);
    insertCount++;
    console.log(`  Added: ${entry[3]}`);
  } catch (e) {
    console.log(`  Skip: ${entry[3]} - ${e.message}`);
  }
}

console.log(`\n  Total inserted: ${insertCount}\n`);

/* ================================================================
   Part 2: Remove visual chart HTML from ALL game entries
   ================================================================ */

console.log("=== Part 2: Removing visual chart HTML from all game entries ===\n");

function removeCharts(detail) {
  const marker = '<div style="background: rgba(255,255,255,0.0';
  const idx = detail.indexOf(marker);
  if (idx === -1) return detail;
  return detail.substring(0, idx).trim();
}

const gameRows = db.prepare(
  `SELECT id, title, detail FROM portfolio WHERE category_id = 'cat-game'`
).all();

const updateStmt = db.prepare(
  `UPDATE portfolio SET detail = ? WHERE id = ?`
);

let cleanCount = 0;
for (const row of gameRows) {
  const cleaned = removeCharts(row.detail);
  if (cleaned !== row.detail) {
    updateStmt.run(cleaned, row.id);
    cleanCount++;
    console.log(`  Cleaned chart from: ${row.title}`);
  } else {
    console.log(`  No chart found in: ${row.title}`);
  }
}

console.log(`\n  Total cleaned: ${cleanCount} / ${gameRows.length} game entries\n`);

db.close();
console.log("Done.");
