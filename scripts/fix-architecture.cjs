const Database = require("better-sqlite3");
const path = require("path");
const db = new Database(path.join(__dirname, "..", "data", "hadeul.db"));

// 1. Fix TMD - replace unstyled architecture with proper visual chart
const tmdId = "27a117dd-ad77-4d1b-8da5-979e5b118a1e";
const tmdRow = db.prepare("SELECT detail FROM portfolio WHERE id = ?").get(tmdId);
if (tmdRow) {
  // Remove the broken architecture section from detail
  let detail = tmdRow.detail;
  detail = detail.replace(/<h3[^>]*>System Architecture<\/h3>.*?<h2>/s, '<h2>');
  
  const arch = `<div style="display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:24px 16px;background:rgba(139,92,246,0.05);border-radius:16px;border:1px solid rgba(139,92,246,0.1);margin:16px 0;">
  <div style="background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);border-radius:12px;padding:12px 20px;text-align:center;min-width:120px;">
    <div style="color:#a78bfa;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Frontend</div>
    <div style="color:#e2e8f0;font-size:13px;font-weight:600;margin-top:4px;">Web IDE Editor</div>
  </div>
  <div style="color:rgba(139,92,246,0.5);font-size:20px;">→</div>
  <div style="background:rgba(236,72,153,0.15);border:1px solid rgba(236,72,153,0.3);border-radius:12px;padding:12px 20px;text-align:center;min-width:120px;">
    <div style="color:#f472b6;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Backend</div>
    <div style="color:#e2e8f0;font-size:13px;font-weight:600;margin-top:4px;">Mission Engine</div>
  </div>
  <div style="color:rgba(236,72,153,0.5);font-size:20px;">→</div>
  <div style="background:rgba(6,182,212,0.15);border:1px solid rgba(6,182,212,0.3);border-radius:12px;padding:12px 20px;text-align:center;min-width:120px;">
    <div style="color:#22d3ee;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Execution</div>
    <div style="color:#e2e8f0;font-size:13px;font-weight:600;margin-top:4px;">Python Sandbox</div>
  </div>
  <div style="color:rgba(6,182,212,0.5);font-size:20px;">→</div>
  <div style="background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.3);border-radius:12px;padding:12px 20px;text-align:center;min-width:120px;">
    <div style="color:#34d399;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Grading</div>
    <div style="color:#e2e8f0;font-size:13px;font-weight:600;margin-top:4px;">Auto Evaluator</div>
  </div>
</div>`;
  
  db.prepare("UPDATE portfolio SET detail = ?, architecture = ? WHERE id = ?").run(detail, arch, tmdId);
  console.log("Fixed TMD");
}

// 2. Fix AI 코랩샵 - extract architecture from detail
const kolabId = "81d01d6c-dba4-4921-bab9-576fd323d9b1";
const kolabRow = db.prepare("SELECT detail FROM portfolio WHERE id = ?").get(kolabId);
if (kolabRow) {
  let detail = kolabRow.detail;
  // Remove broken architecture section
  detail = detail.replace(/<h3><strong>⚙️ System Architecture<\/strong><\/h3><ol>.*?<\/ol>/s, '');
  
  const arch = `<div style="display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;padding:24px 16px;background:rgba(139,92,246,0.05);border-radius:16px;border:1px solid rgba(139,92,246,0.1);margin:16px 0;">
  <div style="background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);border-radius:12px;padding:12px 20px;text-align:center;min-width:140px;">
    <div style="color:#a78bfa;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Data Layer</div>
    <div style="color:#e2e8f0;font-size:12px;font-weight:600;margin-top:4px;">PHP/MySQL DB</div>
  </div>
  <div style="color:rgba(139,92,246,0.5);font-size:20px;">→</div>
  <div style="background:rgba(236,72,153,0.15);border:1px solid rgba(236,72,153,0.3);border-radius:12px;padding:12px 20px;text-align:center;min-width:140px;">
    <div style="color:#f472b6;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Embedding</div>
    <div style="color:#e2e8f0;font-size:12px;font-weight:600;margin-top:4px;">Vector DB</div>
  </div>
  <div style="color:rgba(236,72,153,0.5);font-size:20px;">→</div>
  <div style="background:rgba(6,182,212,0.15);border:1px solid rgba(6,182,212,0.3);border-radius:12px;padding:12px 20px;text-align:center;min-width:140px;">
    <div style="color:#22d3ee;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Orchestration</div>
    <div style="color:#e2e8f0;font-size:12px;font-weight:600;margin-top:4px;">LangChain</div>
  </div>
  <div style="color:rgba(6,182,212,0.5);font-size:20px;">→</div>
  <div style="background:rgba(52,211,153,0.15);border:1px solid rgba(52,211,153,0.3);border-radius:12px;padding:12px 20px;text-align:center;min-width:140px;">
    <div style="color:#34d399;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Interface</div>
    <div style="color:#e2e8f0;font-size:12px;font-weight:600;margin-top:4px;">Streaming Chat UI</div>
  </div>
</div>`;
  
  db.prepare("UPDATE portfolio SET detail = ?, architecture = ? WHERE id = ?").run(detail, arch, kolabId);
  console.log("Fixed AI 코랩샵");
}

// 3. Extract existing styled architecture charts from detail into architecture field
// These entries have visual charts embedded in detail with "System Architecture" h3 headers
const rows = db.prepare(`
  SELECT id, title, detail FROM portfolio 
  WHERE detail LIKE '%System Architecture%' 
  AND detail LIKE '%border-radius%' 
  AND (architecture IS NULL OR architecture = '')
`).all();

let extracted = 0;
for (const row of rows) {
  // Find the architecture chart block (starts with h3 System Architecture, followed by styled div)
  const match = row.detail.match(/<h3[^>]*>[^<]*System Architecture[^<]*<\/h3>\s*(<div style="display:\s*flex[^]*?<\/div>\s*<\/div>)/s);
  if (match) {
    const archHtml = match[1];
    // Remove the h3 + chart from detail
    const cleanDetail = row.detail.replace(/<h3[^>]*>[^<]*System Architecture[^<]*<\/h3>\s*<div style="display:\s*flex[^]*?<\/div>\s*<\/div>/s, '');
    db.prepare("UPDATE portfolio SET detail = ?, architecture = ? WHERE id = ?").run(cleanDetail, archHtml, row.id);
    extracted++;
    console.log("Extracted:", row.title);
  }
}

console.log(`\nExtracted architecture from ${extracted} entries`);
db.close();
