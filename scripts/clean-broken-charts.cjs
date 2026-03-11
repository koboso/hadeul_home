const Database = require('better-sqlite3');
const db = new Database('data/hadeul.db');

// Find all entries with broken chart text patterns in detail
const rows = db.prepare(`
  SELECT id, title, detail FROM portfolio
  WHERE detail LIKE '%<p>→</p>%'
  OR (detail LIKE '%<h3%' AND (
    detail LIKE '%<p>INPUT</p>%' OR detail LIKE '%<p>FRONTEND</p>%' OR detail LIKE '%<p>BACKEND</p>%' OR
    detail LIKE '%<p>CLIENT</p>%' OR detail LIKE '%<p>SERVER</p>%' OR detail LIKE '%<p>PROCESS</p>%' OR
    detail LIKE '%<p>DATABASE</p>%' OR detail LIKE '%<p>SENSOR</p>%' OR detail LIKE '%<p>Edge</p>%' OR
    detail LIKE '%<p>Auth</p>%' OR detail LIKE '%<p>ROBOT</p>%' OR detail LIKE '%<p>ANDROID APP</p>%' OR
    detail LIKE '%<p>AZURE CLOUD</p>%' OR detail LIKE '%<p>CONTROL</p>%' OR detail LIKE '%<p>SERVICE 1</p>%' OR
    detail LIKE '%<p>콘텐츠</p>%' OR detail LIKE '%<p>촬영</p>%' OR detail LIKE '%<p>클라이언트</p>%' OR
    detail LIKE '%<p>프론트엔드</p>%' OR detail LIKE '%<p>프론트</p>%' OR detail LIKE '%<p>ASR ENGINE</p>%' OR
    detail LIKE '%<p>PRE-PROCESS</p>%' OR detail LIKE '%<p>REVIEW</p>%'
  ))
`).all();

console.log(`Found ${rows.length} entries with broken charts in detail\n`);

const update = db.prepare('UPDATE portfolio SET detail = ? WHERE id = ?');

for (const row of rows) {
  let detail = row.detail;

  // Strategy: Remove chart blocks which are:
  // 1. <h3> with chart-like titles (Flow, Architecture, 아키텍처, 구조, Pipeline, etc.) followed by
  //    bare <p>WORD</p> and <p>→</p> patterns
  // 2. Trailing tech tag text like <p>PHPMySQLjQuery...</p>

  // Remove h3 chart headers + following bare p tags until we hit <h2> or <h3> with real content
  // Pattern: <h3...>...chart title...</h3> then sequence of <p>SHORT_WORD</p><p><strong>...</strong></p><p>→</p>

  const chartTitlePatterns = [
    'Flow', 'Architecture', 'Pipeline', '아키텍처', '구조', 'IoT Service',
    'Edge-Cloud', 'Integrated Service', 'ASR Transcription', '사이트 리뉴얼',
    '글램핑 사이트', '게임 서버'
  ];

  for (const pattern of chartTitlePatterns) {
    // Find h3 containing this pattern
    const regex = new RegExp(
      `<h3[^>]*>[^<]*${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^<]*</h3>` +
      // followed by sequences of <p>...</p> that are chart nodes (short text, arrows, strong tags)
      `(?:<p>[^<]{0,40}</p>|<p><strong>[^<]*</strong></p>|<p>→</p>|\\s)*`,
      'gi'
    );
    detail = detail.replace(regex, '');
  }

  // Also remove any remaining arrow patterns: <p>→</p>
  detail = detail.replace(/<p>→<\/p>/g, '');

  // Remove bare uppercase word paragraphs that are chart nodes (not part of normal text)
  // These are like <p>INPUT</p>, <p>FRONTEND</p>, etc. that appear without h3 context
  const chartNodeWords = [
    'INPUT', 'FRONTEND', 'BACKEND', 'CLIENT', 'SERVER', 'PROCESS', 'DATABASE',
    'SENSOR', 'Edge', 'Auth', 'Lock', 'Admin', 'User', 'ROBOT', 'ANDROID APP',
    'AZURE CLOUD', 'CONTROL', 'SERVICE 1', 'SERVICE 2', 'SERVICE 3', 'PLATFORM',
    'INFRA', 'OUTPUT', 'PRE-PROCESS', 'ASR ENGINE', 'REVIEW', 'CLASSIFY',
    'STORAGE', 'SEARCH', 'WEB', 'RECOMMEND', 'SCHEDULE', 'MAP', 'USER INPUT',
    'SPEECH', 'ANALYSIS', 'GAME', 'STREAM', '콘텐츠', '프론트엔드', '백엔드',
    '프론트', '서버', '기능', 'DB', '촬영', '예약', '클라이언트', '네트워크',
    '상태관리', '저장'
  ];

  for (const word of chartNodeWords) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Remove standalone chart node: <p>WORD</p> (only if it's a standalone line, not inside longer text)
    const nodeRegex = new RegExp(`<p>${escaped}</p>`, 'g');
    detail = detail.replace(nodeRegex, '');
  }

  // Remove orphaned <p><strong>short text</strong></p> that were chart node labels
  // These are typically very short (under 20 chars) and appear between removed nodes
  // Be careful not to remove legitimate strong text
  // Only remove if preceded/followed by empty space from removed nodes

  // Remove trailing concatenated tech tags like <p>PHPMySQLjQuery반응형...</p>
  detail = detail.replace(/<p>(?:PHP|MySQL|jQuery|Java|Netty|cocos2d)[A-Za-z가-힣\s·]*<\/p>/g, '');

  // Clean up multiple empty paragraphs
  detail = detail.replace(/(<p><\/p>\s*){2,}/g, '<p></p>');
  detail = detail.replace(/^(<p><\/p>\s*)+/, '');

  if (detail !== row.detail) {
    update.run(detail, row.id);
    console.log(`[CLEANED] ${row.title}`);
  } else {
    console.log(`[NO CHANGE] ${row.title}`);
  }
}

// Verify: check if any broken patterns remain
const remaining = db.prepare(`
  SELECT title FROM portfolio
  WHERE detail LIKE '%<p>→</p>%'
`).all();

if (remaining.length > 0) {
  console.log('\n⚠ Still have arrows in detail:');
  for (const r of remaining) console.log('  ' + r.title);
} else {
  console.log('\nAll broken chart text removed from detail fields.');
}

db.close();
