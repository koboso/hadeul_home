const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "images", "partners");

const partners = [
  { file: "samsung-heavy", name: "삼성중공업", size: 16 },
  { file: "etri", name: "ETRI", size: 28 },
  { file: "kriso", name: "KRISO", size: 24 },
  { file: "cnu", name: "충남대학교", size: 16 },
  { file: "kaist", name: "KAIST", size: 28 },
  { file: "msv", name: "중소벤처기업부", size: 13 },
  { file: "daejeon", name: "대전광역시", size: 16 },
  { file: "lg-chem", name: "LG화학", size: 20 },
  { file: "kari", name: "항공우주연구원", size: 13 },
  { file: "dicia", name: "대전정보문화산업진흥원", size: 9 },
  { file: "kcca", name: "KCCA", size: 28 },
  { file: "korail", name: "코레일네트웍스", size: 13 },
  { file: "onestore", name: "원스토어", size: 18 },
  { file: "unity", name: "Unity", size: 26 },
  { file: "cocos", name: "Cocos", size: 26 },
  { file: "godo", name: "Godo", size: 26 },
  { file: "nias", name: "국립축산연구원", size: 13 },
  { file: "korea-science", name: "코리아사이언스", size: 13 },
  { file: "hyomun", name: "효문화진흥원", size: 14 },
  { file: "tmd", name: "TMD", size: 28 },
  { file: "mod", name: "국방부", size: 20 },
  { file: "tax-ms", name: "세무그룹명성", size: 14 },
  { file: "jiranjigy", name: "지란지교", size: 18 },
  { file: "gdb", name: "금단비가", size: 18 },
  { file: "tdia", name: "티디아", size: 20 },
  { file: "kssa", name: "표면분석학회", size: 14 },
  { file: "mtech", name: "엠텍", size: 22 },
];

partners.forEach((p) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60" fill="none">
  <text x="100" y="33" text-anchor="middle" dominant-baseline="central" fill="#ffffff" opacity="0.5" font-family="system-ui, -apple-system, sans-serif" font-size="${p.size}" font-weight="800" letter-spacing="1">${p.name}</text>
</svg>`;
  fs.writeFileSync(path.join(dir, p.file + ".svg"), svg, "utf-8");
});

console.log(`Regenerated ${partners.length} SVG logos (single-line, no English sub-text)`);
