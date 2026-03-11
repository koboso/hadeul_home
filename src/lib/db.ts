import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "data", "hadeul.db");

let db: Database.Database;

function getDb() {
  if (!db) {
    const fs = require("fs");
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.pragma("foreign_keys = ON");
    initTables();
  }
  return db;
}

function initTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS portfolio (
      id TEXT PRIMARY KEY,
      category_id TEXT NOT NULL,
      client TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      detail TEXT DEFAULT '',
      image TEXT DEFAULT '',
      year INTEGER DEFAULT 0,
      month INTEGER DEFAULT 0,
      is_featured INTEGER DEFAULT 0,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      referrer TEXT DEFAULT '',
      user_agent TEXT DEFAULT '',
      ip TEXT DEFAULT '',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_page_views_path ON page_views(path);
    CREATE INDEX IF NOT EXISTS idx_page_views_created ON page_views(created_at);

    CREATE TABLE IF NOT EXISTS news (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      content TEXT DEFAULT '',
      category TEXT DEFAULT '',
      image TEXT DEFAULT '',
      is_published INTEGER DEFAULT 1,
      published_at TEXT DEFAULT (datetime('now')),
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS job_postings (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      department TEXT DEFAULT '',
      job_type TEXT DEFAULT '',
      location TEXT DEFAULT '',
      description TEXT DEFAULT '',
      requirements TEXT DEFAULT '',
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );
  `);

  // Migrate: add columns if missing (for existing DBs)
  const cols = db.prepare("PRAGMA table_info(portfolio)").all() as { name: string }[];
  const colNames = cols.map((c) => c.name);
  if (!colNames.includes("detail")) db.exec("ALTER TABLE portfolio ADD COLUMN detail TEXT DEFAULT ''");
  if (!colNames.includes("year")) db.exec("ALTER TABLE portfolio ADD COLUMN year INTEGER DEFAULT 0");
  if (!colNames.includes("month")) db.exec("ALTER TABLE portfolio ADD COLUMN month INTEGER DEFAULT 0");
  if (!colNames.includes("tech_stack")) db.exec("ALTER TABLE portfolio ADD COLUMN tech_stack TEXT DEFAULT ''");

  // Seed default categories if empty
  const count = db.prepare("SELECT COUNT(*) as cnt FROM categories").get() as { cnt: number };
  if (count.cnt === 0) {
    const insert = db.prepare("INSERT INTO categories (id, name, slug, sort_order) VALUES (?, ?, ?, ?)");
    const defaults = [
      ["cat-ai-ml", "AI · Machine Learning", "ai-ml", 1],
      ["cat-llm", "LLM · Generative AI", "llm", 2],
      ["cat-ai-agent", "AI Agent", "ai-agent", 3],
      ["cat-game", "Game", "game", 4],
      ["cat-edutech", "Edutech", "edutech", 5],
      ["cat-fintech", "Fintech", "fintech", 6],
      ["cat-smart-factory", "Smart Factory", "smart-factory", 7],
      ["cat-mobility", "Mobility", "mobility", 8],
      ["cat-healthcare", "Healthcare", "healthcare", 9],
      ["cat-eco", "Eco · ESG", "eco-esg", 10],
      ["cat-maritime", "Maritime · 해양", "maritime", 11],
      ["cat-defense", "Defense · 국방", "defense", 12],
      ["cat-security", "Security · 보안", "security", 13],
      ["cat-iot", "IoT · 사물인터넷", "iot", 14],
      ["cat-robotics", "Robotics · 로보틱스", "robotics", 15],
      ["cat-web", "Web · Platform", "web-platform", 16],
      ["cat-media", "Media · Streaming", "media-streaming", 17],
      ["cat-etc", "ETC", "etc", 18],
    ];
    const tx = db.transaction(() => {
      for (const [id, name, slug, order] of defaults) {
        insert.run(id, name, slug, order);
      }
    });
    tx();
  }

  // Seed default settings
  const settingsCount = db.prepare("SELECT COUNT(*) as cnt FROM settings").get() as { cnt: number };
  if (settingsCount.cnt === 0) {
    db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run("maintenance_mode", "off");
  }
}

export default getDb;
