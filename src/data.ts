/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, CareerExperience } from "./types";

import bifanDisplay from "./assets/images/bifan_display_1781543608335.jpg";
import cosrxAppMockup from "./assets/images/cosrx_app_mockup_1781543557154.jpg";
import cosrxCharacterIp from "./assets/images/cosrx_character_ip_1781543574219.jpg";
import creativeMoodboard from "./assets/images/creative_moodboard_1781543674062.jpg";
import drBandPackaging from "./assets/images/dr_band_packaging_1781543627035.jpg";
import teapotExhibition from "./assets/images/teapot_exhibition_1781543591256.jpg";
import juyeonProfile from "./assets/images/juyeon_profile_1781543537437.jpg";

export const PORTFOLIO_NAME_KR = "김주연";
export const PORTFOLIO_TITLE_KR = "크리에이티브 기획 & 브랜드 마케터 포트폴리오";

export const ABOUT_ME = {
  name: "김주연",
  englishName: "Kim Juyeon",
  role: "Brand Marketer & Creative Planner",
  quote: "창의적인 전략과 데이터 분석을 통해 브랜드 가치를 높이고, 고객의 신뢰를 디자인합니다.",
  subQuote: "데이터 분석과 고객 중심 사고를 바탕으로 브랜드 인지도를 높이고, 시장을 사로잡는 마크를 남깁니다. 단순한 홍보를 넘어 사람들의 일상에 스며드는 진정성 있는 에디토리얼 브랜드 기획을 추구합니다.",
  phone: "010-9110-1431",
  email: "juyeoun104@gmail.com",
  portrait: juyeonProfile, // Will be wired to the generated image path
  education: [
    {
      institution: "한림대학교",
      major: "디지털미디어콘텐츠 / 디지털인문예술 전공",
      period: "2024 - 2028 (재학)",
    },
    {
      institution: "동두천외국어고등학교",
      major: "중국어과",
      period: "2021 - 2024 (졸업)",
    },
  ],
  certificates: [
    "MOS Excel 2016 Expert 취득",
    "MOS Word 2016 Expert 취득",
  ],
  careers: [
    {
      company: "올리브영 메이트",
      role: "고객 커뮤니케이션 및 트렌드 데이터 리포트 지원",
      period: "2026.03 - 현재",
    },
    {
      company: "메가커피 파트타임",
      role: "매장 서비스 운영 및 고객 경험 서포트",
      period: "2025.07 - 현재",
    },
    {
      company: "투썸플레이스 직원",
      role: "매니지먼트 보조 및 매장 머천다이징 진열 담당",
      period: "2024.11 - 2025.06",
    },
  ],
  keywords: [
    "브랜드 전략",
    "마케팅 기획",
    "데이터 분석",
    "스토리텔링",
    "콘텐츠 기획",
    "비주얼 브랜딩",
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "act01",
    actNumber: "ACT 01",
    title: "코스알엑스 브랜드 전략 수립",
    duration: "2026.03 - 2026.08",
    role: "마케팅 전략 기획자",
    summary: "코스알엑스 브랜드의 정체성 강화를 위해 대학생 대상 서비스 기획과 온오프라인 마케팅 프로모션을 매니지드하였습니다. 유니크한 타깃 고객 세그먼테이션과 정밀 분석으로 브랜드 선호 지수 및 인지도를 획기적으로 향상시켰습니다.",
    keyInsight: "타겟 고객이 향유하는 고유 라이프스타일을 세심하게 이해하고, 일상의 터치포인트(일상 공유, 세안 후 시간대)에 녹여내는 마케팅 설계의 효용성을 깊이 체득했습니다. 또한 체계적 가이드북 제작을 통한 협업 혁신을 완수했습니다.",
    problem: "당시 코스알엑스는 뛰어난 제품력에 비해 젊은 세대의 일상 속 '감성 터치포인트' 브랜딩이 다소 미흡했습니다. 대학생 고객층의 습관으로 깊이 파고드는 신비롭고 친근한 루틴 공유 플랫폼이 필요했습니다.",
    rolesDetail: "주도적인 타깃 분석 및 플랫폼 UX 브랜딩 기획을 수립하였습니다. 일상 속 '휴식/학습/운동' 시간대 별 화장품 적용 시나리오를 구성하고, 타깃 맞춤 마케팅 메시지를 주도적으로 고도화했습니다.",
    process: "소셜 미디어와 스마트 루틴 트래커 애플리케이션을 유기적으로 연결했습니다. 한 달간의 파일럿 프로모션을 기획·설계하여, 참가자들의 데일리 스킨케어 인증을 통한 자연스러운 인바운드 오가닉 바이럴 루프를 디자인했습니다.",
    implementation: "자체 제작 가이드라인 문서화 완료. 프로젝트에서 입증된 상세 가이드 30페이지 분량을 완성하여, 후속 프로모션 실행 방향성을 명확히 확립하고 온보딩 시간을 비약적으로 축축하는 프로세스 표준을 수립했습니다.",
    result: "파일럿 기간 동안 브랜드 인지도 인덱스 약 30% 증가라는 정량적 쾌거를 기록했습니다. SNS 상의 자발적 후기가 늘어나고 대학생 스킨케어 커뮤니티 전반에서 가치 공유 트래픽을 대거 확보하였습니다.",
    bgColor: "bg-gradient-to-br from-rose-50/70 to-pink-100/50",
    textColor: "text-rose-950",
    image: cosrxAppMockup,
  },
  {
    id: "act02",
    actNumber: "ACT 02",
    title: "'418: I'm a teapot' 오프라인 전시회 기획 및 홍보",
    duration: "2026.03 - 2026.06",
    role: "크리에이티브 전시 기획 감독",
    summary: "한림대학교 CONNECT 메이커 동아리의 야심작인 디자인 미디어 테마 '418: I'm a teapot' 오프라인 전시회의 콘셉트를 주도적으로 수립하고 인터랙티브 홍보 웹사이트 및 티저 콘텐츠 가치를 최대화했습니다.",
    keyInsight: "단방향 감상을 넘은 상호작용적 디자인 공간에서, 전시의 고유 철학과 컨셉(HTTP 418 에러코드의 재해석)을 위트있고 파워풀하게 관객에게 인지시키는 비주얼 큐레이팅 역량이 핵심임을 절감했습니다.",
    problem: "컴퓨터공학과 그래픽 디자인 예술의 융합이라는 다소 낯설고 전문적인 테마를, 일반 대중과 대학 구성원이 호기심을 갖고 즐겁게 참여하도록 흥미로운 스토리텔링 벽면을 구성해 내는 것이 화두였습니다.",
    rolesDetail: "메인 컨셉인 '찻잔이 된 주전자(HTTP 418)'를 위트 있는 감성으로 치환해 인스타그램 티저 영상, 찻잔을 본뜬 반응형 캐릭터 홍보 웹 UI를 기획했으며 포스터 디자인 심사에도 기여했습니다.",
    process: "다양한 영상 콘텐트 및 3D 스캔 스톱모션을 인바운드 소셜 미디어 플랫폼에 활성화해 오프라인 관람객 사전 예매를 획기적으로 이끌었으며 메인 포토존의 도슨트 시나리오를 매니징했습니다.",
    implementation: "사전 소통 플랫폼 설계 및 굿즈 쿠폰 이벤트 기획. 기획단 15명 간의 원활한 업무 공조를 지원하기 위해 시각화 대시보드로 단계별 추진 현황을 투명하게 정렬시켰습니다.",
    result: "온라인 반응형 웹 티저와 인스타그램 숏폼 연출을 유기적으로 연동하여 전시회의 메인 컨셉을 훌륭히 매개했고, 방문 관객들의 적극적 참여와 피드백을 통해 동아리 전시 사상 최고의 찬사와 긍정적인 평점을 기록했습니다.",
    bgColor: "bg-gradient-to-br from-slate-900 via-zinc-900 to-rose-950/40",
    textColor: "text-rose-100",
    image: teapotExhibition,
  },
  {
    id: "act03",
    actNumber: "ACT 03",
    title: "부천국제판타스틱영화제(BIFAN) 협찬 파트너십 부스 총괄 및 메링 매니저",
    duration: "2025.06 - 2025.07",
    role: "협찬 운영 및 현장 머천다이저 책임",
    summary: "세계적인 영화 페스티벌 BIFAN에서 글로벌 브랜드 파트너사 협찬 물품의 입체적 쇼케이스 연출과 실시간 SNS 바이럴 인터랙션 가동을 총괄 모니터링하여 파트너 브랜드의 가치를 수억대 트래픽에 각인시켰습니다.",
    keyInsight: "초 단위로 군중이 드나드는 대형 영화제 현장에서, 협찬 상품의 미적 정렬(MD)과 실시간 고객 반응 데이터가 파트너사 재구매 및 충성도 유치에 지대한 공헌을 함을 정성·정량적으로 증명했습니다.",
    problem: "매일 수천 명의 다국적 관람객이 분주하게 유입되는 과정에서 오프라인 굿즈 진열의 흐트러짐을 상시 바로잡고, 스페셜 시계 및 기념품 오차율을 0.0%의 완벽한 템포로 케어해야 했습니다.",
    rolesDetail: "협찬사들의 메인 로고 및 시그니처 굿즈 스탠딩 정밀 연출, SNS 언급 추이 체크, 포토 이벤트 방문객에게 맞춤 굿즈를 신속히 가인드하는 현장 올라운드 허브 역할을 담당했습니다.",
    process: "현장의 복잡한 유동 인구를 고려하여 최상의 동선을 연구, 리플렛 배치 각도까지 15도 틀어 대기열 가시성을 보장했으며, 부스 마감 후 일일 판매·배분 전수 카운팅 정밀 검수 리포트를 발행했습니다.",
    implementation: "엑셀 데이터 정밀 정밀화 및 SNS 멘션 매트릭 전수 정리. 협찬사별 노출 점수 일일 자동화 산식 시트를 직접 빌딩해 영화 파트너십 사무국에 실시간 발송 완료했습니다.",
    result: "단 1개의 굿즈 및 정산 금액 분실 사고도 없는 '현금 및 물품 오차 제로(0%)' 기록을 장식했고, 협찬사 만족도가 상향되어 브랜드 노출 지수 및 온라인 소셜 멘션이 전년 영화제 대비 50%나 급증하는 성과를 안겼습니다.",
    bgColor: "bg-gradient-to-br from-amber-50 to-amber-100/40",
    textColor: "text-amber-950",
    image: bifanDisplay,
  },
  {
    id: "act04",
    actNumber: "ACT 04",
    title: "코스알엑스 신규 캐릭터 IP 캐릭터 가이드라인 및 용기 디자인 개발",
    duration: "2026.03 - 2026.06",
    role: "리드 브랜드 디자이너 & 콘셉트 메이커",
    summary: "메디큐브의 유명 성공 프레임인 '핑크 테라피' 인식 강점에 도전하는 독자 캐릭터 IP 브랜드 에셋 가치 극대화를 추진, 친근하고 과학적인 마스코트 캐릭터 3종 세트와 아이코닉한 패키지 가이드북을 제정했습니다.",
    keyInsight: "단순히 예쁜 그래픽을 그리는 것을 넘어서 브랜드의 기능적 강점(피부 진정, 밀착 수분)을 대변하고 스토리텔링의 중심이 되어줄 수 있는 메신저형 3D 캐릭터가 소비자 신뢰 장벽을 허문다는 점을 포착했습니다.",
    problem: "더마 코스메틱 특유의 약간은 딱딱하고 전문적인 치료적 분위기에 젊은 층이 쉽게 친근함을 느끼고 굿즈 소장 욕구를 불태울 수 있는 '큐트-미니멀 스마트 비주얼 에센스'가 갈구되었습니다.",
    rolesDetail: "코스알엑스 패키지를 장식할 귀여운 물방울 모양의 분홍색 캐릭터(실험 복을 입은 스마트 큐트 크리에이추어) 디자인 가이딩 및 RGB/CMYK 전용 팔레트를 구축하였습니다.",
    process: "사내 디자인 품평회 및 타깃 대학생 FGI(포커스 그룹 인터뷰)를 시행하여 3D 일러스트 렌더링에 가까운 용기 샘플 가이드를 구조화하고, 친환경 용지 질감 조율 피드백을 가이드북에 통합 기술했습니다.",
    implementation: "30페이지 분량의 디자인 파트너십 가이드 완성. 서체 배치 규칙, 캐릭터의 감정별 자세 프로포션, 오프라인 인형 키링 기획서 등 다용도 미디어 소스를 단일 압축본으로 매핑했습니다.",
    result: "수업 공모 내 최우수 종합 그랑프리 평가를 안는 기염을 토했으며, 타사 코크리에이트 프로모션 제휴 논의에서 제안 수락 피드백을 받으며 디자인 경쟁력을 프로덕트 수준으로 인정받았습니다.",
    bgColor: "bg-gradient-to-br from-pink-50 to-pink-100/50",
    textColor: "text-pink-950",
    image: cosrxCharacterIp,
  },
  {
    id: "act05",
    actNumber: "ACT 05",
    title: "'닥터밴드(Dr. Band)' 타깃 세일즈 강화를 위한 마케팅 및 패키지 개발",
    duration: "2025.03 - 2025.06",
    role: "핵심 상품 마케팅 전략 PM",
    summary: "신개념 하이드로콜로이드 패치 밴드 '닥터밴드' 런칭에 앞서 타깃 분석을 실시, 브랜드 룩북 및 저자극 어필 마케팅 매뉴얼을 수립하여 차별적 슬로건과 최적화 마케팅 제안서로 높은 우수 찬사를 안았습니다.",
    keyInsight: "기존의 상처 밴드 시장에서 '가정용 필수품' 이미지에 갇혀 있던 밴드를, 들고 다니고 싶고 자랑하려는 '파우치 속 스킨케어 패션 아이템'으로 리포지셔닝하는 역발상이 구매율을 견인한다는 사실을 배웠습니다.",
    problem: "치열한 상처 밴드 시장에서 대기업 경쟁 브랜드에 밀리지 않는 강렬한 친근성과 '안전하고 저자극인 의학적 기술력'을 동시적으로 호소하기 위한 마크업 브랜딩 장치가 고갈되어 있었습니다.",
    rolesDetail: "수업 프로젝트 리더로서 타깃의 피부 민감도 분류 시트를 도출하고, 요정 같은 마스코트 스티커를 부착해 마음의 상처까지 치료하는 '스마일 마인드 닥팅' 패키지 카피라이팅 및 구조 설계를 기획했습니다.",
    process: "저자극 거즈 수액 밀착 구조 스케치, 1일 1회 교체 루틴 달력 증정 기획, 방수와 통기 기능을 세밀하게 부각한 카드뉴스 8피드를 구성해 타깃 맞춤 바이럴을 촉진했습니다.",
    implementation: "인클루시브 포장 용기 패키지 설계안 구축. 손가락용, 관절용 등 각 규격별 패킹 템플릿과 로고 인장 배치 크기를 기획해 최종 연출 피치북을 완성했습니다.",
    result: "종합 실무 마케팅 경연에서 '최우수 마케팅 크레이티브 제안상'을 입상 수여받았고, 뷰티 크리에이터 블로그 및 커뮤니티 품평단에게서 사전 구매 의사율 92% 이상의 역대급 유의미 신뢰 지표를 회신했습니다.",
    bgColor: "bg-gradient-to-br from-teal-55/10 to-teal-100/30",
    textColor: "text-teal-950",
    image: drBandPackaging,
  },
  {
    id: "act06",
    actNumber: "ACT 06",
    title: "코스알엑스 글로벌 매스 타겟 정체성 및 일상 유행 패턴 분석",
    duration: "2026.03 - 2026.06",
    role: "빅데이터 기반 마케팅 분석가",
    summary: "글로벌 무대에서 코스알엑스가 확보해 나가야 할 잠재 고객의 데일리 루틴 데이터를 집계·분류하여 여론 점유 지표를 분석했고, 스몰 럭셔리 화장품 트렌드와 결합시킨 타깃형 타임 마케팅 플랜을 수집 시켰습니다.",
    keyInsight: "마케터의 감에 의존하는 아이디어 전개를 보완하는 '정교한 사용자 행동 데이터(공부, 운동, 수면 비율)'의 도출과 과학적인 시그널 분광 분석이 타사와의 확실한 차이를 가른다는 수리적 강점을 깨달았습니다.",
    problem: "다양해진 글로벌 청년 소비자들은 일률적인 광고 메시지에 심드렁해합니다. 이들의 진짜 숨겨진 하루 소모 시퀀스 데이터를 토대로, 각 삶의 빈틈에 적용되는 제품 시기를 적재적소에 도출해야 하는 난제였습니다.",
    rolesDetail: "일상 행동 패턴 통계 리포트 분석, 2030 영타겟 활동 스펙트럼 세밀 매핑, 각 행동 빈도(학습 45%, 애슬레저 20%, 충전식 휴식 15%)에 적합한 수분 밀착 세럼 침투 전략을 모델링했습니다.",
    process: "동아시아 3개 도시 세대별 뷰티 로그 연구와 키워드 빈도 추출을 진행하였으며, 마케팅 예산 대비 전환 ROI를 예측하는 가상의 재무 마일스톤 설계에 협업 기여했습니다.",
    implementation: "사용자 활동 비율 데이터 시각화 대시보드 기획. Recharts 및 SVG 기법을 활용한 인터랙티브 도넛 차트를 시트 레포트에 내장시켜 의사결정의 직관성을 비약적으로 제고했습니다.",
    result: "협약 기업 멘토 심사역들로부터 '즉각 현업 배포 가능한 우수 데이터 분석 피치 레포트'라는 전폭적 평점을 받았으며, 마케팅 타게팅 정밀화를 통해 예상 인벤토리 회전율 18% 추가 증대가 입증되었습니다.",
    bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100/30",
    textColor: "text-indigo-950",
    image: creativeMoodboard,
  }
];

export const ARCHIVE_ITEMS = [
  {
    title: "전시 포스터 '418: I'm a teapot' 메인 키 비주얼",
    category: "Poster & Graphic",
    image: teapotExhibition,
    desc: "기술적 에러 코드와 서정적 시각 예술의 결합을 알리는 메인 프로모션 키 포스터"
  },
  {
    title: "코스알엑스 대학생 맞춤형 루틴 공유 모바일 인터페이스 사양",
    category: "UI/UX Design",
    image: cosrxAppMockup,
    desc: "직관적이고 사랑스러운 파스텔 핑크 테마의 데일리 스킨 트래킹 대시보드"
  },
  {
    title: "한정판 머천다이징 악세사리 쇼케이스 진열 디자인 사양",
    category: "VMD & Merchandising",
    image: bifanDisplay,
    desc: "부천영화제 현장 파트너쉽을 위한 미니멀 스타일의 프리미엄 기프트 박스 및 어글리 시안 정렬"
  },
  {
    title: "코스알엑스 IP 캐릭터 피규어 및 제형 키트 콘셉트",
    category: "Character IP & Package",
    image: cosrxCharacterIp,
    desc: "귀여운 물방울 마스코트를 투사한 친환경 스킨케어 패키지 디자인 렌더"
  },
  {
    title: "닥터밴드 마이크로 오가닉 스킨 밴드 디자인 플랫레이 스터디",
    category: "Branding & Packaging",
    image: drBandPackaging,
    desc: "천연 식용 소재 추출 천과 귀여운 상처 낫기 치료 요정 라벨 일러스트를 함입한 패키지 기획"
  },
  {
    title: "브레인스토밍 무드보드 및 포스트잇 아카이브 벽면",
    category: "Creative Ideation",
    image: creativeMoodboard,
    desc: "모든 프로젝트가 시작하는 원천, 끊임없는 일상 질문들과 영감 스케치가 가득한 연구 보드"
  }
];

export const SKILL_CATEGORIES = [
  {
    name: "기획 / 브랜드 마케팅 전략",
    skills: ["브랜드 전략 수립", "마케팅 캠페인 총괄", "트렌드 리포트 작성", "데이터 분석 및 지표 도출", "스토리텔링 및 카피라이팅"]
  },
  {
    name: "디자인 & 시각화 도구",
    skills: ["Figma (UI/UX 프로토타입)", "Canva (포스터/홍보)", "Adobe Illustrator", "Adobe Photoshop", "Adobe Premiere Pro (영상 편집)"]
  },
  {
    name: "생산성 & AI 공동작업",
    skills: ["Microsoft Excel (데이터 정제)", "Microsoft Word", "Microsoft PowerPoint", "Gemini / AI 크레이티브 어시스팅", "기획서 시각자료 제작"]
  }
];

export const DEFAULT_SKILL_ITEMS = [
  {
    name: "Figma",
    level: "Expert",
    percent: 90,
    description: "브랜드용 UI/UX 와이어프레임 구축, 귀여운 마스코트 캐릭터 IP 디자인 및 가이드 문서 템플릿화 제작.",
    category: "design" as const,
  },
  {
    name: "Canva",
    level: "Expert",
    percent: 95,
    description: "코스알엑스 지면 보도 홍보 자료, 동아리용 포토 프레임 카드 및 각종 대학생 오가닉 배너 디자인 고도화.",
    category: "design" as const,
  },
  {
    name: "Adobe Illustrator",
    level: "Intermediate",
    percent: 85,
    description: "독창적 스티커 삽화, 닥터밴드 정교포장 용기 스케일 벡터 마크업 정립 및 로고 심볼 드로잉.",
    category: "design" as const,
  },
  {
    name: "Adobe Photoshop",
    level: "Intermediate",
    percent: 80,
    description: "상품 실사 라이브러리 픽셀 보정, 전람회 티저 이미지 마킹 필터링 및 패키지 3D 렌더링 합성.",
    category: "design" as const,
  },
  {
    name: "Adobe Premiere",
    level: "Intermediate",
    percent: 75,
    description: "'418: I'm a teapot' 인터랙티브 소셜 미디어 플랫폼 숏폼 릴스 배포용 일러스트 비디오 컷팅 매칭 조정.",
    category: "design" as const,
  },
  {
    name: "AI Tools",
    level: "Fluent",
    percent: 90,
    description: "Gemini / Midjourney 프롬프팅을 통한 무드 패키지 신속 프로토타이핑 및 글로벌 인포그래픽 데이터 시나리오 어시스트.",
    category: "strategy" as const,
  },
  {
    name: "Microsoft Word",
    level: "Expert (MOS)",
    percent: 95,
    description: "MOS Word Master Expert 취득. 30페이지 분량의 기획 성과 지표 보고서 및 매뉴얼의 양식 규정 완수.",
    category: "office" as const,
  },
  {
    name: "Microsoft Excel",
    level: "Expert (MOS)",
    percent: 95,
    description: "MOS Excel Master Expert 취득. 통계 리포트 1,200개 스팟 로깅 정보 정합, 매크로 정밀 회전율 시프트 구현.",
    category: "office" as const,
  },
  {
    name: "PowerPoint (PPT)",
    level: "Expert",
    percent: 95,
    description: "기업 제안용 핏 프레젠테이션 벤치마킹, 인쇄에 특화된 와이드 비율 수치 정돈 슬라이드 덱 구축 감독.",
    category: "office" as const,
  }
];
