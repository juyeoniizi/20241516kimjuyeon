/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { BookOpen, Sparkles, Feather, Settings, HelpCircle, RefreshCw, Eye, Edit3 } from "lucide-react";
import BookShell from "./components/BookShell";
import { PortfolioProvider, usePortfolio } from "./context/PortfolioContext";

function AppContent() {
  const { isEditMode, setIsEditMode, resetToDefault } = usePortfolio();

  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-[#faf6f6] via-[#f7eded] to-[#fcfaf9] text-neutral-800 font-sans relative flex flex-col justify-between py-6 px-4 md:px-8 overflow-x-hidden">
      
      {/* Decorative Warm Backlighting Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-pink-200/20 via-rose-100/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* TOP DESK HEADER */}
      <header className="w-full max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 select-none">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-pink-700/5 text-pink-700 rounded-xl border border-pink-100">
            <Feather className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-serif font-black tracking-widest text-[#241a1a]">
              KIM JUYEON
            </h1>
            <p className="text-[10px] font-sans font-semibold tracking-wider text-neutral-400 uppercase">
              크리에이티브 기획 • 브랜드 마케터 에디토리얼 북
            </p>
          </div>
        </div>

        {/* Action Controls & Info Badge */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Live Portfolio Editor Control Button */}
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`flex items-center gap-1.5 py-1.5 px-4 rounded-full text-xs font-semibold shadow-xs transition-all duration-300 ${
              isEditMode
                ? "bg-pink-600 text-white hover:bg-pink-700"
                : "bg-white text-neutral-700 hover:bg-pink-50 border border-pink-100"
            }`}
          >
            {isEditMode ? (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>미리보기 모드</span>
              </>
            ) : (
              <>
                <Edit3 className="w-3.5 h-3.5 text-pink-600 animate-pulse" />
                <span>실시간 내용 수정</span>
              </>
            )}
          </button>

          {isEditMode && (
            <button
              onClick={resetToDefault}
              className="flex items-center gap-1 py-1.5 px-3 bg-white hover:bg-red-50 text-red-600 rounded-full text-xs font-medium border border-red-100 shadow-2xs transition-all duration-300"
              title="모든 글과 이미지를 전시장 기본값으로 되돌립니다"
            >
              <RefreshCw className="w-3 h-3" />
              <span>초기화</span>
            </button>
          )}

          <div className="flex items-center gap-2 text-xs text-neutral-400 bg-white/60 backdrop-blur-sm border border-pink-50 py-1.5 px-3.5 rounded-full shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>
              {isEditMode 
                ? "글이나 사진을 클릭하면 즉시 편집·업로드됩니다." 
                : "인덱스 탭으로 장을 자유롭게 넘겨 보세요."}
            </span>
          </div>
        </div>
      </header>

      {/* BOOK STAGE AREA */}
      <main className="w-full flex-1 flex items-center justify-center py-4 relative z-10">
        <BookShell />
      </main>

      {/* BOTTOM DESK FOOTER */}
      <footer className="w-full max-w-5xl mx-auto border-t border-pink-100/50 pt-4 mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 select-none gap-2">
        <p className="font-sans font-medium text-center sm:text-left">
          본 아카이브는 김주연의 동아리, 공모전 및 기획 실무 성과를 바탕으로 설계된 에디토리얼 디자인 북 웹앱입니다.
        </p>
        <p className="font-mono text-center sm:text-right text-pink-600/80">
          EDITORIAL BOOK METRIC SYNC &copy; 2026.
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}

