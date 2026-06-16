/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Increase payload limit to handle base64 image uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// API to sync local changes permanently to repository files
app.post("/api/save-portfolio", (req, res) => {
  try {
    const { aboutMe, projects, archiveItems, skillsList, profileImage } = req.body;
    console.log("Start synching browser edits to the repository files...");

    const dir = path.join(process.cwd(), "src", "assets", "images");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Helper to save base64 to file
    const saveBase64Image = (base64Str: string, filename: string) => {
      if (!base64Str || !base64Str.startsWith("data:image/")) return false;
      const matches = base64Str.match(/^data:image\/([A-Za-z\-+]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) return false;
      const buffer = Buffer.from(matches[2], "base64");
      const filePath = path.join(dir, filename);
      fs.writeFileSync(filePath, buffer);
      console.log(`Successfully saved physical image file: ${filename}`);
      return true;
    };

    // Save profile image
    if (profileImage) {
      saveBase64Image(profileImage, "20251208_024929031.png");
    }

    // Save project images from base64 if present
    if (projects && Array.isArray(projects)) {
      projects.forEach((proj: any) => {
        if (proj.image && proj.image.startsWith("data:image/")) {
          let filename = "";
          if (proj.id === "act01") filename = "20260616_025041219.png";
          if (proj.id === "act02") filename = "20260616_025041219_02.png";
          if (proj.id === "act03") filename = "2026-06-16.png";
          if (proj.id === "act04") filename = "20260616_025041219_03.png";
          if (proj.id === "act05") filename = "20260616_025041219_01.png";
          
          if (filename) {
            saveBase64Image(proj.image, filename);
          }
        }
      });
    }

    // Save archive images if present
    if (archiveItems && Array.isArray(archiveItems)) {
      archiveItems.forEach((item: any, idx: number) => {
        if (item.image && item.image.startsWith("data:image/")) {
          let filename = "";
          if (idx === 0) filename = "20260616_025041219_02.png";
          if (idx === 1) filename = "20260616_025041219.png";
          if (idx === 2) filename = "2026-06-16.png";
          if (idx === 3) filename = "20260616_025041219_03.png";
          if (idx === 4) filename = "20260616_025041219_01.png";
          
          if (filename) {
            saveBase64Image(item.image, filename);
          }
        }
      });
    }

    // Rewrite src/data.ts back to the filesystem with synchronized values
    const dataFilePath = path.join(process.cwd(), "src", "data.ts");
    
    const generateNewDataContent = () => {
      return `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, CareerExperience } from "./types";

import bifanDisplay from "./assets/images/2026-06-16.png";
import cosrxAppMockup from "./assets/images/20260616_025041219.png";
import cosrxCharacterIp from "./assets/images/20260616_025041219_03.png";
import creativeMoodboard from "./assets/images/creative_moodboard_1781543674062.jpg";
import drBandPackaging from "./assets/images/20260616_025041219_01.png";
import teapotExhibition from "./assets/images/20260616_025041219_02.png";
import juyeonProfile from "./assets/images/20251208_024929031.png";

export const PORTFOLIO_NAME_KR = ${JSON.stringify(aboutMe.name || "김주연")};
export const PORTFOLIO_TITLE_KR = ${JSON.stringify(aboutMe.role || "크리에이티브 기획 & 브랜드 마케터 포트폴리오")};

export const ABOUT_ME = {
  name: ${JSON.stringify(aboutMe.name || "김주연")},
  englishName: ${JSON.stringify(aboutMe.englishName || "Kim Juyeon")},
  role: ${JSON.stringify(aboutMe.role || "Brand Marketer & Creative Planner")},
  quote: ${JSON.stringify(aboutMe.quote || "")},
  subQuote: ${JSON.stringify(aboutMe.subQuote || "")},
  phone: ${JSON.stringify(aboutMe.phone || "010-9110-1431")},
  email: ${JSON.stringify(aboutMe.email || "h20241516@glab.hallym.ac.kr")},
  portrait: juyeonProfile,
  education: ${JSON.stringify(aboutMe.education || [])},
  certificates: ${JSON.stringify(aboutMe.certificates || [])},
  careers: ${JSON.stringify(aboutMe.careers || [])},
  keywords: ${JSON.stringify(aboutMe.keywords || [])}
};

export const PROJECTS: Project[] = [
  {
    id: "act01",
    actNumber: "ACT 01",
    title: ${JSON.stringify(projects[0]?.title || "코스알엑스 브랜드 전략 수립")},
    duration: ${JSON.stringify(projects[0]?.duration || "2026.03 - 2026.08")},
    role: ${JSON.stringify(projects[0]?.role || "마케팅 전략 기획자")},
    summary: ${JSON.stringify(projects[0]?.summary || "")},
    keyInsight: ${JSON.stringify(projects[0]?.keyInsight || "")},
    problem: ${JSON.stringify(projects[0]?.problem || "")},
    rolesDetail: ${JSON.stringify(projects[0]?.rolesDetail || "")},
    process: ${JSON.stringify(projects[0]?.process || "")},
    implementation: ${JSON.stringify(projects[0]?.implementation || "")},
    result: ${JSON.stringify(projects[0]?.result || "")},
    bgColor: "bg-gradient-to-br from-rose-50/70 to-pink-100/50",
    textColor: "text-rose-950",
    image: cosrxAppMockup,
  },
  {
    id: "act02",
    actNumber: "ACT 02",
    title: ${JSON.stringify(projects[1]?.title || "'418: I\\'m a teapot' 오프라인 전시회 기획 및 홍보")},
    duration: ${JSON.stringify(projects[1]?.duration || "2026.03 - 2026.06")},
    role: ${JSON.stringify(projects[1]?.role || "크리에이티브 전시 기획 감독")},
    summary: ${JSON.stringify(projects[1]?.summary || "")},
    keyInsight: ${JSON.stringify(projects[1]?.keyInsight || "")},
    problem: ${JSON.stringify(projects[1]?.problem || "")},
    rolesDetail: ${JSON.stringify(projects[1]?.rolesDetail || "")},
    process: ${JSON.stringify(projects[1]?.process || "")},
    implementation: ${JSON.stringify(projects[1]?.implementation || "")},
    result: ${JSON.stringify(projects[1]?.result || "")},
    bgColor: "bg-gradient-to-br from-slate-900 via-zinc-900 to-rose-950/40",
    textColor: "text-rose-100",
    image: teapotExhibition,
  },
  {
    id: "act03",
    actNumber: "ACT 03",
    title: ${JSON.stringify(projects[2]?.title || "부천국제판타스틱영화제(BIFAN) 협찬 파트너십 부스 총괄 및 메링 매니저")},
    duration: ${JSON.stringify(projects[2]?.duration || "2025.06 - 2025.07")},
    role: ${JSON.stringify(projects[2]?.role || "협찬 운영 및 현장 머천다이저 책임")},
    summary: ${JSON.stringify(projects[2]?.summary || "")},
    keyInsight: ${JSON.stringify(projects[2]?.keyInsight || "")},
    problem: ${JSON.stringify(projects[2]?.problem || "")},
    rolesDetail: ${JSON.stringify(projects[2]?.rolesDetail || "")},
    process: ${JSON.stringify(projects[2]?.process || "")},
    implementation: ${JSON.stringify(projects[2]?.implementation || "")},
    result: ${JSON.stringify(projects[2]?.result || "")},
    bgColor: "bg-gradient-to-br from-amber-50 to-amber-100/40",
    textColor: "text-amber-950",
    image: bifanDisplay,
  },
  {
    id: "act04",
    actNumber: "ACT 04",
    title: ${JSON.stringify(projects[3]?.title || "코스알엑스 신규 캐릭터 IP 캐릭터 가이드라인 및 용기 디자인 개발")},
    duration: ${JSON.stringify(projects[3]?.duration || "2026.03 - 2026.06")},
    role: ${JSON.stringify(projects[3]?.role || "리드 브랜드 디자이너 & 콘셉트 메이커")},
    summary: ${JSON.stringify(projects[3]?.summary || "")},
    keyInsight: ${JSON.stringify(projects[3]?.keyInsight || "")},
    problem: ${JSON.stringify(projects[3]?.problem || "")},
    rolesDetail: ${JSON.stringify(projects[3]?.rolesDetail || "")},
    process: ${JSON.stringify(projects[3]?.process || "")},
    implementation: ${JSON.stringify(projects[3]?.implementation || "")},
    result: ${JSON.stringify(projects[3]?.result || "")},
    bgColor: "bg-gradient-to-br from-pink-50 to-pink-100/50",
    textColor: "text-pink-950",
    image: cosrxCharacterIp,
  },
  {
    id: "act05",
    actNumber: "ACT 05",
    title: ${JSON.stringify(projects[4]?.title || "'닥터밴드(Dr. Band)' 타깃 세일즈 강화를 위한 마케팅 및 패키지 개발")},
    duration: ${JSON.stringify(projects[4]?.duration || "2025.03 - 2025.06")},
    role: ${JSON.stringify(projects[4]?.role || "핵심 상품 마케팅 전략 PM")},
    summary: ${JSON.stringify(projects[4]?.summary || "")},
    keyInsight: ${JSON.stringify(projects[4]?.keyInsight || "")},
    problem: ${JSON.stringify(projects[4]?.problem || "")},
    rolesDetail: ${JSON.stringify(projects[4]?.rolesDetail || "")},
    process: ${JSON.stringify(projects[4]?.process || "")},
    implementation: ${JSON.stringify(projects[4]?.implementation || "")},
    result: ${JSON.stringify(projects[4]?.result || "")},
    bgColor: "bg-gradient-to-br from-teal-55/10 to-teal-100/30",
    textColor: "text-teal-950",
    image: drBandPackaging,
  },
  {
    id: "act06",
    actNumber: "ACT 06",
    title: ${JSON.stringify(projects[5]?.title || "코스알엑스 글로벌 매스 타겟 정체성 및 일상 유행 패턴 분석")},
    duration: ${JSON.stringify(projects[5]?.duration || "2026.03 - 2026.06")},
    role: ${JSON.stringify(projects[5]?.role || "빅데이터 기반 마케팅 분석가")},
    summary: ${JSON.stringify(projects[5]?.summary || "")},
    keyInsight: ${JSON.stringify(projects[5]?.keyInsight || "")},
    problem: ${JSON.stringify(projects[5]?.problem || "")},
    rolesDetail: ${JSON.stringify(projects[5]?.rolesDetail || "")},
    process: ${JSON.stringify(projects[5]?.process || "")},
    implementation: ${JSON.stringify(projects[5]?.implementation || "")},
    result: ${JSON.stringify(projects[5]?.result || "")},
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

export const DEFAULT_SKILL_ITEMS = ${JSON.stringify(skillsList || [], null, 2)};
`;
    };

    fs.writeFileSync(dataFilePath, generateNewDataContent());
    console.log("data.ts has been updated on the files");

    res.json({ 
      status: "success", 
      message: "🎉 브라우저 임시 편집 내용과 고용량 원본 파일들이 로컬 개발 서버 및 깃허브 코드 저장소에 영구히 저장 및 업데이트되었습니다!" 
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

// Setup dev and prod servers
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on http://0.0.0.0:${PORT}`);
  });
}

startServer();
