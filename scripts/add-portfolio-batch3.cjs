/**
 * Portfolio Batch 3 – 2015~2018 Web/Factory/ETC 포트폴리오 추가
 */
const Database = require("better-sqlite3");
const path = require("path");
const crypto = require("crypto");

const DB_PATH = path.join(__dirname, "..", "data", "hadeul.db");
const db = new Database(DB_PATH);

const insert = db.prepare(
  `INSERT INTO portfolio (id, category_id, client, title, description, detail, image, year, month, is_featured, sort_order)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
);

/* ================================================================
   Detail HTML Builder Helpers
   ================================================================ */

function badge(text, color = "59,130,246") {
  return `<span style="background: rgba(${color},0.2); color: #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 13px;">${text}</span>`;
}

function badgeRow(tags) {
  return `<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0;">${tags.map(t => badge(t)).join("")}</div>`;
}

function arrow() {
  return `<div style="color: rgba(255,255,255,0.3); font-size: 20px;">→</div>`;
}

function archBox(layer, name, color = "59,130,246") {
  return `<div style="background: rgba(${color},0.2); border: 1px solid rgba(${color},0.4); padding: 12px 16px; border-radius: 8px; text-align: center; min-width: 120px;">
      <div style="font-size: 12px; color: rgba(255,255,255,0.4);">${layer}</div>
      <div style="color: white; font-weight: 600;">${name}</div>
    </div>`;
}

function archDiagram(title, boxes) {
  const items = boxes.map((b, i) => {
    const box = archBox(b[0], b[1], b[2] || "59,130,246");
    return i < boxes.length - 1 ? box + arrow() : box;
  }).join("\n    ");
  return `<div style="background: rgba(255,255,255,0.05); border-radius: 12px; padding: 24px; margin: 24px 0;">
  <h3 style="color: #a78bfa; margin-bottom: 16px; text-align: center;">${title}</h3>
  <div style="display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap;">
    ${items}
  </div>
</div>`;
}

/* ================================================================
   Entry Details
   ================================================================ */

const detail1 = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>대둔산 자연휴양림은 충남 논산에 위치한 국가 지정 자연휴양림으로, 기존 홈페이지의 노후화와 모바일 미대응 문제를 해결하기 위해 전면 리뉴얼을 진행하였습니다. 드론 항공 촬영을 활용하여 휴양림의 광활한 자연경관을 시각적으로 전달하고, 온라인 예약 시스템을 구축하여 방문객의 접근성과 편의성을 대폭 향상시켰습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture & Key Functions</h2>
  <p><strong style="color: #f87171;">Problem:</strong> 기존 사이트는 PC 전용 레이아웃으로 모바일 접속 시 사용성이 극히 저하되었으며, 예약은 전화로만 가능해 비수기에도 관리 인력이 상시 배치되어야 했습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> 반응형 웹 설계와 드론 촬영 콘텐츠를 결합한 몰입형 메인 페이지, 실시간 객실 잔여 현황 조회 및 온라인 예약·결제 시스템을 구축하여 운영 효율을 극대화했습니다.</p>

  ${archDiagram("사이트 리뉴얼 아키텍처", [
    ["콘텐츠", "드론 촬영 영상", "168,85,247"],
    ["프론트엔드", "반응형 웹", "59,130,246"],
    ["백엔드", "PHP 서버", "234,179,8"],
    ["기능", "예약 시스템", "52,211,153"],
    ["DB", "MySQL", "239,68,68"]
  ])}

  ${badgeRow(["PHP", "MySQL", "jQuery", "반응형 웹", "드론 항공촬영", "온라인 예약"])}

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact & Scalability</h2>
  <p>드론 촬영 영상을 메인 비주얼에 활용함으로써 방문 전 휴양림의 실제 모습을 생생하게 전달할 수 있었고, 온라인 예약 시스템 도입 후 전화 문의 건수가 현저히 감소하여 관리 인력의 업무 부담이 경감되었습니다. 모바일 트래픽 비중이 60% 이상으로 증가하면서 반응형 설계의 효과가 입증되었습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>PHP 기반 서버 사이드 렌더링과 jQuery 프론트엔드로 구성되었으며, 드론 촬영 원본 4K 영상을 웹 최적화하여 빠른 로딩 속도를 유지하면서도 고화질 비주얼을 제공합니다. 예약 데이터는 MySQL에 저장되며, 관리자 패널에서 객실별 예약 현황을 캘린더 형태로 관리할 수 있습니다.</p>

</div>`;

const detail2 = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>젠틀글램핑은 대둔산 자연휴양림 내에 위치한 프리미엄 글램핑 시설로, 자연 속 럭셔리 캠핑 경험을 온라인에서 효과적으로 전달하기 위한 전용 웹사이트를 개발하였습니다. 드론 항공 촬영으로 글램핑장의 전경과 주변 자연환경을 파노라마 형태로 담아내어 예비 고객에게 강렬한 첫인상을 제공합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture & Key Functions</h2>
  <p><strong style="color: #f87171;">Problem:</strong> 글램핑장 특성상 시설 사진만으로는 현장의 분위기와 규모감을 전달하기 어렵고, 예약 과정이 복잡하여 이탈률이 높았습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> 드론 촬영 영상과 360도 파노라마 뷰를 활용한 몰입형 갤러리와 3단계 간소화 예약 프로세스를 구축하여 전환율을 개선했습니다.</p>

  ${archDiagram("글램핑 사이트 구조", [
    ["촬영", "드론 항공촬영", "168,85,247"],
    ["프론트", "반응형 UI", "59,130,246"],
    ["서버", "PHP", "234,179,8"],
    ["예약", "온라인 예약", "52,211,153"]
  ])}

  ${badgeRow(["PHP", "MySQL", "jQuery", "드론 촬영", "반응형 웹", "온라인 예약"])}

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact & Scalability</h2>
  <p>드론 촬영 기반의 몰입형 콘텐츠 도입 후 사이트 체류 시간이 평균 2배 이상 증가하였으며, 간소화된 예약 프로세스를 통해 모바일 환경에서의 예약 완료율이 크게 향상되었습니다. 계절별 테마 콘텐츠 교체가 용이한 CMS 구조로 설계하여 운영 편의성을 확보하였습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>PHP 기반 CMS와 jQuery 프론트엔드로 구성되며, 드론 촬영 영상의 웹 최적화 인코딩, 반응형 이미지 처리, 예약 캘린더 위젯 등을 자체 개발하여 외부 플러그인 의존도를 최소화했습니다.</p>

</div>`;

const detail3 = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>전국 초등학교 및 중학교를 대상으로 대규모 설문 조사를 웹 기반으로 수행할 수 있는 통합 설문 시스템을 개발하였습니다. 기존 종이 설문의 비효율성을 해소하고, 수천 개 학교에서 동시 접속하여 설문에 응답할 수 있는 대용량 트래픽 처리와 실시간 통계 분석 기능을 제공합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture & Key Functions</h2>
  <p><strong style="color: #f87171;">Problem:</strong> 종이 기반 설문은 배포·회수·집계에 수개월이 소요되었고, 데이터 입력 과정에서 오류가 빈번히 발생하여 통계 신뢰도가 낮았습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> 웹 기반 설문 시스템으로 전환하여 설문 배포부터 응답 수집, 실시간 통계 집계까지 전 과정을 자동화하고, 학교별·지역별·학년별 다차원 분석 리포트를 즉시 생성할 수 있도록 구현하였습니다.</p>

  ${archDiagram("설문 시스템 아키텍처", [
    ["접속", "학교별 인증", "168,85,247"],
    ["설문", "웹 설문 엔진", "59,130,246"],
    ["수집", "응답 데이터 수집", "234,179,8"],
    ["분석", "실시간 통계", "52,211,153"],
    ["리포트", "다차원 분석", "239,68,68"]
  ])}

  ${badgeRow(["웹 설문", "대용량 트래픽", "실시간 통계", "다차원 분석", "학교 인증"])}

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact & Scalability</h2>
  <p>전국 단위 설문 조사의 소요 기간을 기존 3개월에서 2주 이내로 단축하였으며, 데이터 입력 오류율을 사실상 제로에 가깝게 낮추었습니다. 동시 접속 수천 명 환경에서도 안정적인 응답 처리가 가능하도록 세션 관리와 DB 최적화를 적용하였습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>웹 기반 설문 엔진은 다양한 문항 유형(객관식, 주관식, 리커트 척도, 매트릭스 등)을 지원하며, 학교 코드 기반 인증 시스템으로 응답의 무결성을 보장합니다. 집계 데이터는 실시간으로 차트와 표 형태로 시각화되어 교육 기관 담당자가 즉시 활용할 수 있습니다.</p>

</div>`;

const detail4 = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>동양전기산업의 제품 카탈로그, 기술 문서, 인증서 등 다양한 산업용 문서를 체계적으로 관리하고 고객에게 안전하게 배포할 수 있는 파일 다운로드 관리 시스템을 구축하였습니다. 권한 기반 접근 제어와 다운로드 이력 추적 기능을 통해 문서 보안과 활용 현황을 동시에 관리합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture & Key Functions</h2>
  <p><strong style="color: #f87171;">Problem:</strong> 제품별 기술 문서와 인증서가 이메일이나 개별 요청으로만 전달되어 최신 버전 관리가 불가능했고, 고객 대응에 과도한 시간이 소요되었습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> 카테고리별 파일 분류 체계와 버전 관리 기능을 갖춘 웹 기반 다운로드 센터를 구축하여 고객이 셀프서비스로 필요한 문서를 즉시 다운로드할 수 있도록 하였습니다.</p>

  ${archDiagram("다운로드 시스템 구조", [
    ["인증", "사용자 권한", "168,85,247"],
    ["분류", "카테고리 관리", "59,130,246"],
    ["저장", "파일 서버", "234,179,8"],
    ["이력", "다운로드 추적", "52,211,153"]
  ])}

  ${badgeRow(["파일 관리", "권한 제어", "버전 관리", "다운로드 추적", "카테고리 분류"])}

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact & Scalability</h2>
  <p>고객 문서 요청 대응 시간을 즉시 처리 수준으로 단축하였으며, 다운로드 이력 분석을 통해 어떤 제품의 기술 자료가 가장 많이 조회되는지 파악하여 마케팅 전략 수립에 활용할 수 있게 되었습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>파일 업로드 시 자동 바이러스 스캔과 파일 무결성 검증을 수행하며, 대용량 파일의 안정적 전송을 위한 청크 다운로드 방식을 적용하였습니다. 관리자 패널에서 파일별 다운로드 통계와 사용자별 접근 이력을 확인할 수 있습니다.</p>

</div>`;

const detail5 = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>시온냉동은 산업용 냉동·냉장 설비 전문 기업으로, 회사의 기술력과 주요 시공 실적을 효과적으로 전달할 수 있는 기업 홈페이지를 구축하였습니다. 제품 라인업별 상세 스펙 정보와 시공 사례 갤러리를 통해 잠재 고객의 신뢰를 확보하는 데 초점을 맞추었습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture & Key Functions</h2>
  <p><strong style="color: #f87171;">Problem:</strong> 냉동 설비 업종 특성상 제품 스펙과 시공 실적을 상세히 보여주는 것이 영업에 핵심적이나, 기존에는 종이 카탈로그에만 의존하고 있었습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> 제품별 상세 스펙 페이지, 시공 사례 포트폴리오 갤러리, 견적 문의 폼을 갖춘 기업 웹사이트를 구축하여 온라인 영업 채널을 확보했습니다.</p>

  ${archDiagram("기업 홈페이지 구조", [
    ["메인", "기업 소개", "59,130,246"],
    ["제품", "스펙 카탈로그", "234,179,8"],
    ["실적", "시공 갤러리", "168,85,247"],
    ["문의", "견적 요청", "52,211,153"]
  ])}

  ${badgeRow(["기업 홈페이지", "제품 카탈로그", "시공 사례", "견적 문의", "반응형 웹"])}

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact & Scalability</h2>
  <p>온라인 견적 문의 채널 확보를 통해 신규 고객 유입 경로가 다변화되었으며, 시공 사례 갤러리를 통해 잠재 고객에게 기술력과 실적을 시각적으로 증명할 수 있게 되었습니다. CMS 기반 구조로 시공 사례 추가가 손쉬워 지속적인 콘텐츠 업데이트가 가능합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>반응형 웹 디자인으로 모바일 환경에서도 제품 스펙표가 가독성 있게 표시되며, 이미지 최적화를 통해 다수의 시공 사진이 포함된 갤러리에서도 빠른 로딩 속도를 유지합니다. 견적 문의 폼은 이메일 알림과 연동되어 빠른 고객 응대가 가능합니다.</p>

</div>`;

const detail6 = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>한국스토리텔링연구원은 문화 콘텐츠와 스토리텔링 분야의 학술 연구 및 교육을 수행하는 전문 기관으로, 연구 성과 발표, 학술 행사 안내, 회원 커뮤니티 기능을 갖춘 기관 홈페이지를 구축하였습니다. 연구 자료의 체계적 아카이빙과 학술 네트워크 활성화를 핵심 목표로 설정하였습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture & Key Functions</h2>
  <p><strong style="color: #f87171;">Problem:</strong> 연구 성과물과 학술 행사 정보가 분산 관리되어 회원 및 외부 연구자의 접근성이 낮았고, 기관의 전문성을 대외적으로 홍보할 채널이 부족했습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> 연구 논문·보고서 아카이브, 학술 행사 캘린더, 회원 전용 커뮤니티 게시판을 통합한 원스톱 플랫폼을 구축하여 기관의 디지털 허브 역할을 수행하도록 설계하였습니다.</p>

  ${archDiagram("연구원 홈페이지 구조", [
    ["소개", "기관 안내", "59,130,246"],
    ["아카이브", "연구 자료", "168,85,247"],
    ["행사", "학술 캘린더", "234,179,8"],
    ["커뮤니티", "회원 게시판", "52,211,153"]
  ])}

  ${badgeRow(["기관 홈페이지", "연구 아카이브", "학술 캘린더", "회원 커뮤니티", "CMS"])}

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact & Scalability</h2>
  <p>연구 성과물의 온라인 아카이빙을 통해 외부 연구자와 학생들의 자료 접근성이 크게 향상되었으며, 학술 행사 온라인 안내 및 참가 신청 기능으로 행사 참여율이 증가하였습니다. 기관의 온라인 가시성이 높아져 협력 기관 및 연구 네트워크 확장에 기여하였습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>CMS 기반으로 관리자가 직접 연구 자료 업로드와 행사 정보 등록을 수행할 수 있으며, 회원 등급별 접근 권한 관리 기능을 통해 비공개 자료의 보안을 유지합니다. 검색 엔진 최적화(SEO)를 적용하여 학술 검색 포털에서의 노출도를 높였습니다.</p>

</div>`;

const detail7 = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>참진국제특허법률사무소는 국내외 특허, 상표, 디자인 출원 및 지적재산권 분쟁 해결을 전문으로 하는 법률사무소로, 전문성과 신뢰감을 전달하는 기업 홈페이지를 구축하였습니다. 특허 출원 절차 안내, 변리사 프로필, 주요 성공 사례 등을 체계적으로 구성하여 잠재 의뢰인의 신뢰를 확보합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture & Key Functions</h2>
  <p><strong style="color: #f87171;">Problem:</strong> 특허 법률 서비스의 전문성을 온라인에서 효과적으로 전달하기 어려웠고, 의뢰인이 출원 절차와 비용 구조를 사전에 파악하기 힘들어 초기 상담 시간이 과도하게 소요되었습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> 특허·상표·디자인 출원 절차를 시각적 플로우차트로 안내하고, 분야별 전문 변리사 프로필과 주요 성공 사례를 체계적으로 제공하여 의뢰 전 충분한 정보를 습득할 수 있도록 설계하였습니다.</p>

  ${archDiagram("법률사무소 홈페이지 구조", [
    ["소개", "사무소 안내", "59,130,246"],
    ["서비스", "출원 절차 안내", "168,85,247"],
    ["전문가", "변리사 프로필", "234,179,8"],
    ["상담", "온라인 상담", "52,211,153"]
  ])}

  ${badgeRow(["법률사무소", "특허 출원", "온라인 상담", "변리사 소개", "반응형 웹"])}

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact & Scalability</h2>
  <p>출원 절차 및 비용 구조를 사전 공개함으로써 초기 상담 시간이 단축되었고, 온라인 상담 신청 기능을 통해 신규 의뢰 건수가 증가하였습니다. 변리사별 전문 분야와 성공 사례 공개로 사무소의 전문성에 대한 신뢰도가 향상되었습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>법률사무소의 전문적 이미지에 부합하는 절제된 디자인과 직관적 네비게이션을 적용하였으며, 온라인 상담 신청 시 분야 선택과 첨부파일 업로드 기능을 제공하여 의뢰 내용의 사전 파악을 용이하게 하였습니다.</p>

</div>`;

const detail8 = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>㈜코미텍의 O2O(Online to Offline) 자재 유통 시스템을 개발하여 건축·인테리어 자재의 온라인 주문부터 오프라인 물류 배송까지 전 과정을 통합 관리할 수 있는 플랫폼을 구축하였습니다. 자재 유통 업계의 디지털 전환을 선도하는 핵심 인프라로 설계되었습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture & Key Functions</h2>
  <p><strong style="color: #f87171;">Problem:</strong> 건축 자재 유통은 전화·팩스 기반 주문이 대부분으로 재고 파악과 배송 추적이 불가능했고, 중간 유통 단계의 비효율로 가격 경쟁력이 저하되어 있었습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> 온라인 자재 카탈로그와 주문 시스템, 실시간 재고 연동, 배송 추적, 거래처별 맞춤 가격 정책을 통합한 O2O 플랫폼을 구축하여 유통 전 과정의 디지털화를 실현하였습니다.</p>

  ${archDiagram("O2O 자재 유통 아키텍처", [
    ["온라인", "자재 카탈로그", "59,130,246"],
    ["주문", "발주 시스템", "168,85,247"],
    ["재고", "실시간 재고", "234,179,8"],
    ["물류", "배송 추적", "52,211,153"],
    ["정산", "거래 관리", "239,68,68"]
  ])}

  ${badgeRow(["O2O", "자재 유통", "재고 관리", "배송 추적", "거래처 관리", "정산"])}

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact & Scalability</h2>
  <p>전화·팩스 주문 대비 주문 처리 시간을 80% 이상 단축하였으며, 실시간 재고 연동으로 재고 부족에 따른 주문 취소율을 대폭 감소시켰습니다. 거래처별 맞춤 가격 정책과 거래 이력 관리를 통해 B2B 고객 관계를 강화하였습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>대량 자재 데이터의 효율적 검색을 위한 다차원 필터링 엔진과, 거래처별 차등 가격 테이블 관리, 실시간 재고 동기화 모듈을 자체 개발하였습니다. 배송 추적은 물류사 API 연동을 통해 실시간 위치 정보를 제공합니다.</p>

</div>`;

const detail9 = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>유통 기업의 자재관리 및 유통 과정을 디지털화한 스마트팩토리 자재관리 유통 시스템을 구축하였습니다. 입고·출고·재고 관리부터 물류 배송 현황 추적까지 자재 유통의 전 라이프사이클을 통합 관리하여 운영 효율성과 재고 정확도를 극대화합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture & Key Functions</h2>
  <p><strong style="color: #f87171;">Problem:</strong> 수기 장부 기반의 자재 관리로 실시간 재고 파악이 불가능했고, 과다 재고와 재고 부족이 반복되어 운영 비용이 증가하고 납기 지연이 빈번히 발생하였습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> 바코드/QR 스캔 기반 입출고 관리, 실시간 재고 대시보드, 안전 재고 알림, 거래처별 발주·납품 관리 기능을 통합한 웹 기반 시스템을 구축하여 자재 관리의 전면 디지털화를 실현하였습니다.</p>

  ${archDiagram("자재관리 시스템 아키텍처", [
    ["입고", "바코드 스캔", "59,130,246"],
    ["재고", "실시간 현황", "168,85,247"],
    ["출고", "배송 관리", "234,179,8"],
    ["분석", "재고 분석", "52,211,153"],
    ["알림", "안전재고 경고", "239,68,68"]
  ])}

  ${badgeRow(["Smart Factory", "자재관리", "바코드 스캔", "재고 관리", "유통 추적", "실시간 대시보드"])}

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact & Scalability</h2>
  <p>재고 정확도를 98% 이상으로 향상시켰으며, 안전 재고 자동 알림으로 재고 부족에 의한 납기 지연을 사실상 해소하였습니다. 과다 재고 감소를 통해 창고 운영 비용을 절감하고 자금 회전율을 개선하였습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>웹 기반 시스템으로 PC와 모바일 기기에서 모두 접근 가능하며, 바코드/QR 스캐너와 연동하여 현장에서 즉시 입출고 처리가 가능합니다. 재고 분석 대시보드는 품목별 이동 이력, ABC 분석, 적정 재고 산출 기능을 제공합니다.</p>

</div>`;

const detail10 = `
<div style="max-width: 720px; margin: 0 auto; color: rgba(255,255,255,0.85); line-height: 1.8;">

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">01. Strategic Overview</h2>
  <p>cocos2d-x 게임엔진과 Netty 기반 Socket I/O 서버를 결합한 실시간 멀티플레이어 게임 서버 프레임워크를 자체 R&D로 개발하였습니다. 고성능 비동기 네트워크 통신과 게임 상태 동기화를 핵심으로, 다양한 장르의 실시간 멀티플레이어 게임에 범용적으로 적용할 수 있는 서버 인프라를 구축하였습니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">02. System Architecture & Key Functions</h2>
  <p><strong style="color: #f87171;">Problem:</strong> 실시간 멀티플레이어 게임은 수백 ms 이내의 응답 속도가 요구되나, 기존 HTTP 기반 통신으로는 지연이 심각했고, 동시 접속자 확장에도 한계가 있었습니다.</p>
  <p><strong style="color: #34d399;">Solution:</strong> Netty의 비동기 이벤트 기반 아키텍처로 수천 명 동시 접속을 처리하며, 커스텀 바이너리 프로토콜로 패킷 크기를 최소화하여 네트워크 지연을 극적으로 감소시켰습니다.</p>

  ${archDiagram("게임 서버 아키텍처", [
    ["클라이언트", "cocos2d-x", "59,130,246"],
    ["네트워크", "Socket I/O", "168,85,247"],
    ["서버", "Netty (Java)", "234,179,8"],
    ["상태관리", "Game State", "52,211,153"],
    ["저장", "DB Persistence", "239,68,68"]
  ])}

  ${badgeRow(["cocos2d-x", "Netty", "Java", "Socket I/O", "실시간 동기화", "멀티플레이어", "비동기 서버"])}

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">03. Project Impact & Scalability</h2>
  <p>자체 개발 서버 프레임워크를 통해 다양한 게임 프로젝트에 재사용 가능한 네트워크 인프라를 확보하였습니다. 수천 명 동시 접속 환경에서 평균 응답 시간 50ms 이내를 달성하였으며, 수평 확장이 가능한 구조로 설계하여 사용자 수 증가에 유연하게 대응합니다.</p>

  <h2 style="color: #a78bfa; font-size: 20px; margin-top: 32px;">04. Technical Identity</h2>
  <p>Netty의 Channel Pipeline 구조를 활용하여 패킷 인코딩/디코딩, 인증, 게임 로직 처리를 계층적으로 분리하였습니다. 게임 상태 동기화는 클라이언트 예측(Client Prediction)과 서버 권위(Server Authority) 모델을 적용하여 네트워크 지연에도 부드러운 게임플레이를 보장합니다. cocos2d-x 클라이언트와의 통신은 커스텀 바이너리 프로토콜로 최적화되어 있습니다.</p>

</div>`;

/* ================================================================
   Entries Array
   ================================================================ */

const entries = [
  [
    crypto.randomUUID(), "cat-web", "대둔산 자연휴양림",
    "대둔산 자연휴양림 사이트 리뉴얼",
    "드론 항공촬영과 온라인 예약 시스템을 결합한 자연휴양림 홈페이지 전면 리뉴얼 프로젝트",
    detail1,
    "/images/portfolio/default-web.jpg",
    2018, 1, 0, 300
  ],
  [
    crypto.randomUUID(), "cat-web", "젠틀글램핑 (대둔산 휴양림내)",
    "젠틀글램핑 웹사이트 개발",
    "드론 촬영 기반 몰입형 비주얼과 간소화 예약 프로세스를 갖춘 프리미엄 글램핑 웹사이트",
    detail2,
    "/images/portfolio/default-web.jpg",
    2018, 1, 0, 301
  ],
  [
    crypto.randomUUID(), "cat-web", "교육 기관",
    "전국 초등학교·중학교 설문 System",
    "전국 초·중학교 대상 웹 기반 대규모 설문 수집 및 실시간 다차원 통계 분석 시스템",
    detail3,
    "/images/portfolio/default-web.jpg",
    2017, 1, 0, 302
  ],
  [
    crypto.randomUUID(), "cat-web", "동양전기산업",
    "동양전기산업 다운로드 System",
    "권한 기반 접근 제어와 다운로드 이력 추적 기능을 갖춘 산업용 문서 배포 관리 시스템",
    detail4,
    "/images/portfolio/default-web.jpg",
    2017, 1, 0, 303
  ],
  [
    crypto.randomUUID(), "cat-web", "시온냉동",
    "시온냉동 기업 홈페이지",
    "산업용 냉동·냉장 설비 전문 기업의 제품 카탈로그 및 시공 사례 기반 기업 홈페이지",
    detail5,
    "/images/portfolio/default-web.jpg",
    2017, 1, 0, 304
  ],
  [
    crypto.randomUUID(), "cat-web", "한국스토리텔링연구원",
    "한국스토리텔링연구원 홈페이지",
    "연구 자료 아카이브와 학술 행사 관리 기능을 갖춘 문화콘텐츠 연구 기관 홈페이지",
    detail6,
    "/images/portfolio/default-web.jpg",
    2017, 1, 0, 305
  ],
  [
    crypto.randomUUID(), "cat-web", "참진국제특허법률사무소",
    "참진국제특허법률사무소 홈페이지",
    "특허 출원 절차 안내와 온라인 상담 기능을 갖춘 국제특허법률사무소 홈페이지",
    detail7,
    "/images/portfolio/default-web.jpg",
    2015, 1, 0, 306
  ],
  [
    crypto.randomUUID(), "cat-web", "㈜코미텍",
    "코미텍 O2O 자재 유통 System",
    "건축·인테리어 자재의 온라인 주문부터 오프라인 물류까지 통합 관리하는 O2O 유통 플랫폼",
    detail8,
    "/images/portfolio/default-web.jpg",
    2015, 1, 0, 307
  ],
  [
    crypto.randomUUID(), "cat-smart-factory", "유통 기업",
    "자재관리 유통 시스템",
    "바코드 스캔 기반 입출고 관리와 실시간 재고 대시보드를 갖춘 스마트팩토리 자재관리 시스템",
    detail9,
    "/images/portfolio/default-factory.jpg",
    2017, 1, 0, 308
  ],
  [
    crypto.randomUUID(), "cat-etc", "HADEUL · 자체 R&D",
    "cocos2d-x 게임엔진 활용 Netty Socket I/O 서버",
    "cocos2d-x와 Netty 기반 고성능 비동기 실시간 멀티플레이어 게임 서버 프레임워크",
    detail10,
    "/images/portfolio/default-etc.jpg",
    2017, 1, 0, 309
  ],
];

/* ================================================================
   Execute
   ================================================================ */

let count = 0;
for (const entry of entries) {
  try {
    insert.run(...entry);
    count++;
    console.log(`✅ Added: ${entry[3]}`);
  } catch (e) {
    console.log(`⚠️ Skip: ${entry[3]} - ${e.message}`);
  }
}

console.log(`\nTotal: ${count} entries added`);
db.close();
