/**
 * Reformat all portfolio descriptions:
 * 1. Remove numbered section prefixes (01., 02., 03., 04.)
 * 2. Replace English section titles with natural Korean
 * 3. Remove Problem/Solution labels, merge into flowing text
 * 4. Remove lettered sub-section prefixes (A., B., C.)
 */
const Database = require("better-sqlite3");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);

function reformat(detail) {
  if (!detail) return detail;

  let d = detail;

  // 1. Remove numbered prefixes and replace English section titles
  // "01. Strategic Overview (전략적 개요)" → "프로젝트 개요"
  // "01. Strategic Overview" → "프로젝트 개요"
  d = d.replace(/<h2>\s*01\.\s*Strategic Overview[^<]*<\/h2>/gi, "<h2>프로젝트 개요</h2>");

  // "02. System Architecture & Key Functions" → "핵심 기능"
  d = d.replace(/<h2>\s*02\.\s*System Architecture[^<]*<\/h2>/gi, "<h2>핵심 기능</h2>");
  // "02. Core Game Design & Engineering" → "핵심 설계"
  d = d.replace(/<h2>\s*02\.\s*Core Game Design[^<]*<\/h2>/gi, "<h2>핵심 설계</h2>");

  // "03. Project Impact & Scalability" → "프로젝트 성과"
  // "03. Project Impact" → "프로젝트 성과"
  d = d.replace(/<h2>\s*03\.\s*Project Impact[^<]*<\/h2>/gi, "<h2>프로젝트 성과</h2>");

  // "04. Technical Identity" → "기술적 의의"
  d = d.replace(/<h2>\s*04\.\s*Technical Identity[^<]*<\/h2>/gi, "<h2>기술적 의의</h2>");

  // Catch any remaining numbered h2 patterns: "01. Something" → "Something"
  d = d.replace(/<h2>\s*0\d\.\s*/gi, "<h2>");

  // 2. Remove lettered sub-section prefixes: "A. ", "B. ", "C. " from h3 tags
  d = d.replace(/<h3>\s*[A-Z]\.\s*/gi, "<h3>");

  // 3. Remove Problem/Solution labels and make text flow naturally
  // Pattern: <p><strong>Problem:</strong> text</p>
  // → <p>text</p>
  d = d.replace(/<p>\s*<strong>\s*Problem:\s*<\/strong>\s*/gi, "<p>");
  d = d.replace(/<p>\s*<strong>\s*Problem\s*<\/strong>\s*:\s*/gi, "<p>");

  // Pattern: <p><strong>Solution:</strong> text</p>
  // → <p>이에 대응하여, text (but we keep it simple and just remove the label)
  d = d.replace(/<p>\s*<strong>\s*Solution:\s*<\/strong>\s*/gi, "<p>");
  d = d.replace(/<p>\s*<strong>\s*Solution\s*<\/strong>\s*:\s*/gi, "<p>");

  return d;
}

// Process all entries
const rows = db.prepare("SELECT id, title, detail FROM portfolio").all();
const update = db.prepare("UPDATE portfolio SET detail = ? WHERE id = ?");

let count = 0;
const tx = db.transaction(() => {
  for (const row of rows) {
    const cleaned = reformat(row.detail);
    if (cleaned !== row.detail) {
      update.run(cleaned, row.id);
      count++;
    }
  }
});
tx();

console.log(`Reformatted ${count} / ${rows.length} entries`);
db.close();
