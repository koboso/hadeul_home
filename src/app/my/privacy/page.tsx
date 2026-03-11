import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 - 주식회사 하들소프트",
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <a href="/" className="text-white/20 text-sm hover:text-purple-400 transition-colors inline-block mb-10">
          &larr; 홈으로
        </a>

        <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">개인정보 처리방침</h1>
        <p className="text-white/30 text-sm mb-16">주식회사 하들소프트</p>

        <div className="space-y-12 text-[14px] leading-[1.9]">
          <p className="text-white/40">
            주식회사 하들소프트(이하 &quot;회사&quot;)는 「개인정보 보호법」 등 관련 법령을 준수하며, 이용자의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같은 개인정보 처리방침을 수립·공개합니다.
          </p>

          {/* 1 */}
          <section>
            <h2 className="text-white/90 text-lg font-bold mb-4 pb-2 border-b border-white/[0.06]">1. 개인정보의 처리 목적</h2>
            <p className="text-white/40 mb-3">회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 관련 법령에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
            <ol className="list-decimal list-inside text-white/40 space-y-2 pl-1">
              <li><strong className="text-white/60">홈페이지 문의 및 고객 응대:</strong> 문의 사항 확인, 사실조사를 위한 연락·통지, 처리 결과 통보 등</li>
              <li><strong className="text-white/60">채용 절차 진행:</strong> 입사지원자 본인 확인, 채용 전형 진행 및 결과 안내, 향후 채용 가능 인재 데이터 관리 등</li>
              <li><strong className="text-white/60">서비스 운영 및 관리:</strong> 접속 빈도 파악 또는 서비스 이용에 대한 통계 분석을 통한 서비스 개선 및 보안 강화</li>
            </ol>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-white/90 text-lg font-bold mb-4 pb-2 border-b border-white/[0.06]">2. 처리하는 개인정보 항목</h2>
            <p className="text-white/40 mb-3">회사는 서비스 제공을 위해 최소한의 개인정보만을 수집하고 있습니다.</p>
            <ol className="list-decimal list-inside text-white/40 space-y-3 pl-1">
              <li><strong className="text-white/60">홈페이지 문의 (필수):</strong> 성명, 이메일 주소, 연락처, 문의내용</li>
              <li>
                <strong className="text-white/60">채용 지원:</strong>
                <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                  <li><strong className="text-white/50">필수항목:</strong> 성명, 생년월일, 이메일, 연락처, 주소, 학력사항, 경력사항, 자격사항, 병역사항(해당 시), 이력서 및 자기소개서</li>
                  <li><strong className="text-white/50">선택항목:</strong> 포트폴리오, SNS 주소, 수상경력 등 지원자가 추가로 제출한 정보</li>
                </ul>
              </li>
              <li>
                <strong className="text-white/60">서비스 이용 과정에서 자동으로 수집되는 정보:</strong>
                <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                  <li>IP주소, 쿠키, 서비스 이용 기록, 방문 기록, 기기 정보 등</li>
                </ul>
              </li>
            </ol>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-white/90 text-lg font-bold mb-4 pb-2 border-b border-white/[0.06]">3. 개인정보의 처리 및 보유기간</h2>
            <p className="text-white/40 mb-3">회사는 법령에 따른 개인정보 보유·이용기간 또는 이용자로부터 수집 시에 동의받은 기간 내에서 개인정보를 처리하고 보유합니다.</p>
            <ol className="list-decimal list-inside text-white/40 space-y-2 pl-1">
              <li><strong className="text-white/60">홈페이지 문의:</strong> 문의 처리 완료 후 <strong className="text-white/60">3년</strong> (전자상거래 등에서의 소비자보호에 관한 법률에 따른 소비자의 불만 또는 분쟁처리에 관한 기록 준용)</li>
              <li><strong className="text-white/60">채용 관련 정보:</strong> 채용 절차 종료 후 <strong className="text-white/60">1년</strong> (단, 지원자가 파기를 요청할 경우 지체 없이 파기)</li>
              <li><strong className="text-white/60">통신사실확인자료:</strong> 웹사이트 방문 기록(로그)은 통신비밀보호법에 따라 <strong className="text-white/60">3개월</strong>간 보관</li>
            </ol>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-white/90 text-lg font-bold mb-4 pb-2 border-b border-white/[0.06]">4. 개인정보 처리의 위탁</h2>
            <p className="text-white/40 mb-4">회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리 업무를 외부 업체에 위탁하고 있습니다.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px] border-collapse">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-3 bg-white/[0.03] border border-white/[0.06] text-white/50 font-semibold">수탁업체</th>
                    <th className="text-left px-4 py-3 bg-white/[0.03] border border-white/[0.06] text-white/50 font-semibold">위탁업무 내용</th>
                  </tr>
                </thead>
                <tbody className="text-white/35">
                  <tr>
                    <td className="px-4 py-3 border border-white/[0.06] font-medium text-white/50">카페24(주)</td>
                    <td className="px-4 py-3 border border-white/[0.06]">웹호스팅 서비스 인프라 제공 및 데이터 보관</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 border border-white/[0.06] font-medium text-white/50">가비아(주)</td>
                    <td className="px-4 py-3 border border-white/[0.06]">웹호스팅 서비스 인프라 제공 및 데이터 보관</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-white/90 text-lg font-bold mb-4 pb-2 border-b border-white/[0.06]">5. 개인정보의 제3자 제공</h2>
            <p className="text-white/40">회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 이용자의 동의가 있거나 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-white/90 text-lg font-bold mb-4 pb-2 border-b border-white/[0.06]">6. 개인정보의 파기 절차 및 방법</h2>
            <p className="text-white/40">회사는 개인정보 보유기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 파기하며, 종이 문서에 출력된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-white/90 text-lg font-bold mb-4 pb-2 border-b border-white/[0.06]">7. 정보주체의 권리·의무 및 그 행사 방법</h2>
            <p className="text-white/40">이용자는 언제든지 회사에 대해 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다. 권리 행사는 회사에 대해 서면, 전자우편 등을 통하여 하실 수 있으며 회사는 이에 대해 지체 없이 조치하겠습니다.</p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-white/90 text-lg font-bold mb-4 pb-2 border-b border-white/[0.06]">8. 개인정보의 안전성 확보 조치</h2>
            <p className="text-white/40 mb-3">회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
            <ul className="list-disc list-inside text-white/40 space-y-2 pl-1">
              <li><strong className="text-white/60">관리적 조치:</strong> 내부관리계획 수립 및 시행, 정기적 직원 교육 등</li>
              <li><strong className="text-white/60">기술적 조치:</strong> 개인정보처리시스템 등의 접근권한 관리, 접속기록 보관 및 위변조 방지, 개인정보 암호화, 보안프로그램 설치 등</li>
              <li><strong className="text-white/60">물리적 조치:</strong> 비인가자에 대한 출입 통제 등</li>
            </ul>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-white/90 text-lg font-bold mb-4 pb-2 border-b border-white/[0.06]">9. 개인정보 보호책임자</h2>
            <p className="text-white/40 mb-4">회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
            <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 space-y-2 text-[13px]">
              <p className="text-white/40"><span className="text-white/25 inline-block w-16">성명</span> <strong className="text-white/70">김재식</strong></p>
              <p className="text-white/40"><span className="text-white/25 inline-block w-16">직책</span> 대표이사 / 개인정보 보호책임자</p>
              <p className="text-white/40"><span className="text-white/25 inline-block w-16">이메일</span> <a href="mailto:hadeulsoft@hadeul.com" className="text-purple-400/70 hover:text-purple-400">hadeulsoft@hadeul.com</a></p>
              <p className="text-white/40"><span className="text-white/25 inline-block w-16">연락처</span> <strong className="text-white/70">1577-3905</strong></p>
            </div>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-white/90 text-lg font-bold mb-4 pb-2 border-b border-white/[0.06]">10. 개인정보 처리방침의 변경</h2>
            <p className="text-white/40">이 개인정보 처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 교정이 있는 경우에는 공지사항을 통해 고지할 것입니다.</p>
            <p className="text-white/50 mt-3 font-semibold">시행일자: 2026년 3월 01일</p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-6 border-t border-white/[0.04] text-[11px] text-white/15 space-y-1">
          <p>주식회사 하들소프트 | 대전시 유성구 대학로 31, 2118호(봉명동, 한진리조트)</p>
          <p>사업자등록번호: 244-81-01030 | 대표: 김재식</p>
          <p>Copyright 2017. HADEUL SOFT CO. LTD. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </div>
  );
}
