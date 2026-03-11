import getDb from "../src/lib/db";
const db = getDb();

const articles = [
  {
    id: "news-001",
    title: '하들소프트, 신작 모바일 게임 "컬러팝(Color POP)" 글로벌 출시',
    summary:
      "하들소프트(대표 김재식)가 신작 모바일 퍼즐 게임 컬러팝(Color POP: Match 3 Puzzle Breaker)을 구글 플레이와 애플 앱스토어에 글로벌 출시했다.",
    content: `<h2>쓰리 매치 퍼즐 게임 컬러팝, 글로벌 출시</h2>
<p>하들소프트(대표 김재식)가 신작 모바일 게임 <strong>'컬러팝'(Color POP: Match 3 Puzzle Breaker)</strong>을 구글 플레이와 애플 앱스토어에 글로벌 출시했다.</p>
<p>컬러팝은 가운데 블록을 좌·우로 보내 색을 합치는 <strong>3-Match 퍼즐 게임</strong>이다. 50개의 스테이지별 도전 과제를 제시하며, 제한된 이동횟수 내에 해당 과제를 해결해야 하는 등 고도의 지능적인 플레이가 요구되는 것이 특징이다.</p>
<p>컬러팝은 지난해 <strong>지스타(G-STAR)</strong>에서 처음 공개된 후 국내·외 업체들과 지속적인 비즈니스 미팅을 통해 글로벌 게임 시장 진출을 함께 모색해오며 그 가능성을 인정받았다.</p>
<p>오프라인에서도 플레이가 가능하며, 출퇴근길이나 틈나는 시간에 가볍게 즐길 수 있는 캐주얼 게임이다.</p>
<h3>다운로드</h3>
<ul>
<li><strong>Google Play:</strong> <a href="https://play.google.com/store/apps/details?id=com.hadeul.koboso.colorpop" target="_blank">다운로드</a></li>
<li><strong>App Store:</strong> <a href="https://apps.apple.com/app/id1485573790" target="_blank">다운로드</a></li>
</ul>
<p><em>출처: 디스이즈게임, 게임와이, 인디터 | 원문: <a href="https://m.thisisgame.com/webzine/news/nboard/225/?n=101321" target="_blank">디스이즈게임</a></em></p>`,
    category: "보도자료",
    image: "",
    published_at: "2020-01-20 09:00:00",
  },
  {
    id: "news-002",
    title: '하들소프트, 모바일 게임 "고양이 주식회사" 출시',
    summary:
      "하들소프트(대표 김재식)가 모바일 게임 신작 고양이 주식회사를 구글플레이와 애플 앱스토어에 출시했다. 다양한 직업의 고양이를 채용하고 회사를 성장시키는 방치형 시뮬레이션 게임이다.",
    content: `<h2>방치형 시뮬레이션 게임 '고양이 주식회사' 출시</h2>
<p>하들소프트(대표 김재식)가 모바일 게임 신작 <strong>'고양이 주식회사'</strong>를 구글플레이와 애플 앱스토어에 출시했다.</p>
<p>고양이 주식회사는 플레이어가 다양한 직업을 가진 고양이를 채용하고 회사를 성장시키는 <strong>타이쿤 요소를 가미한 방치형 시뮬레이션 게임</strong>이다.</p>
<h3>주요 특징</h3>
<ul>
<li><strong>100종 이상의 고양이 캐릭터</strong>를 수집·성장시킬 수 있으며, 직업별로 의인화된 캐릭터들이 특징</li>
<li>게임 내 <strong>메신저</strong>를 통해 고양이와 대화하고 직원들의 마음을 알 수 있는 라이트 노벨 요소</li>
<li><strong>도둑 잡기</strong> 등 다양한 미니게임 포함</li>
<li>게임 내 재화로 <strong>사장님 방을 꾸밀 수 있는 인테리어 시스템</strong> 제공</li>
</ul>
<p>김재식 대표는 "이용자들이 게임을 통해 회사를 열어 운영해보는 간접 체험 기회가 될 수 있을 것"이라며, <strong>미국, 일본, 대만 등으로 글로벌 서비스를 순차적으로 진행할 예정</strong>이라고 밝혔다.</p>
<p><em>출처: 전자신문 | 기자: 강우성 | 원문: <a href="https://www.etnews.com/20201112000048" target="_blank">전자신문 기사 보기</a></em></p>`,
    category: "보도자료",
    image:
      "https://img.etnews.com/photonews/2011/1354973_20201112124729_444_0001.jpg",
    published_at: "2020-11-12 12:47:00",
  },
];

const stmt = db.prepare(`
  INSERT OR REPLACE INTO news (id, title, summary, content, category, image, is_published, published_at, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
`);

for (const a of articles) {
  stmt.run(
    a.id,
    a.title,
    a.summary,
    a.content,
    a.category,
    a.image,
    a.published_at,
    a.published_at,
    a.published_at
  );
  console.log(`Inserted: ${a.title}`);
}

const rows = db.prepare(
  "SELECT id, title, published_at FROM news ORDER BY published_at DESC"
).all();
console.log("\n현재 뉴스 목록:");
console.log(JSON.stringify(rows, null, 2));
