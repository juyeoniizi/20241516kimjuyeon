/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Book, CornerDownRight, Bookmark, ArrowUpRight } from "lucide-react";
import { BookPageId, Project } from "../types";
import { usePortfolio } from "../context/PortfolioContext";

// Import components
import CoverPage from "./CoverPage";
import AboutPage from "./AboutPage";
import CareerNotePage from "./CareerNotePage";
import ProjectPage from "./ProjectPage";
import SkillsPage from "./SkillsPage";
import ArchivePage from "./ArchivePage";
import EpiloguePage from "./EpiloguePage";

interface BookShellProps {
  onNotifyPageChange?: (pageId: BookPageId) => void;
}

export default function BookShell({ onNotifyPageChange }: BookShellProps) {
  const { projects } = usePortfolio();
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [isBookOpened, setIsBookOpened] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  // Flat sequence of pages
  const PAGES: { id: BookPageId; label: string; chapter: string }[] = [
    { id: "cover", label: "커버", chapter: "INTRO" },
    { id: "about", label: "자기소개", chapter: "CH.01" },
    { id: "career", label: "경력", chapter: "CH.02" },
    { id: "act01", label: "브랜드 전략", chapter: "CH.03" },
    { id: "act02", label: "전시 기획", chapter: "CH.04" },
    { id: "act03", label: "BIFAN 운영", chapter: "CH.05" },
    { id: "act04", label: "캐릭터 개발", chapter: "CH.06" },
    { id: "act05", label: "닥터밴드", chapter: "CH.07" },
    { id: "act06", label: "글로벌 마케팅", chapter: "CH.08" },
    { id: "skills", label: "보유 역량", chapter: "CH.09" },
    { id: "archive", label: "아카이브", chapter: "CH.10" },
    { id: "epilogue", label: "에필로그", chapter: "END" },
  ];

  const handleNextPage = () => {
    if (currentPageIndex < PAGES.length - 1) {
      setFlipDirection("next");
      const nextIndex = currentPageIndex + 1;
      setCurrentPageIndex(nextIndex);
      if (onNotifyPageChange) onNotifyPageChange(PAGES[nextIndex].id);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setFlipDirection("prev");
      const prevIndex = currentPageIndex - 1;
      setCurrentPageIndex(prevIndex);
      if (onNotifyPageChange) onNotifyPageChange(PAGES[prevIndex].id);
    }
  };

  const handleJumpToPage = (id: BookPageId) => {
    const targetIdx = PAGES.findIndex((p) => p.id === id);
    if (targetIdx !== -1) {
      setFlipDirection(targetIdx > currentPageIndex ? "next" : "prev");
      setCurrentPageIndex(targetIdx);
      setIsBookOpened(targetIdx > 0);
      if (onNotifyPageChange) onNotifyPageChange(id);
    }
  };

  const handleOpenBook = () => {
    setIsBookOpened(true);
    setFlipDirection("next");
    setCurrentPageIndex(1); // Jump to About page
    if (onNotifyPageChange) onNotifyPageChange("about");
  };

  const activePage = PAGES[currentPageIndex];

  // Render content according to page id
  const renderPageContent = () => {
    switch (activePage.id) {
      case "cover":
        return <CoverPage onOpen={handleOpenBook} />;
      case "about":
        return <AboutPage />;
      case "career":
        return <CareerNotePage onNavigateToPage={(id) => handleJumpToPage(id as BookPageId)} />;
      case "act01":
      case "act02":
      case "act03":
      case "act04":
      case "act05":
      case "act06":
        const proj = projects.find((p) => p.id === activePage.id);
        return proj ? <ProjectPage project={proj} /> : null;
      case "skills":
        return <SkillsPage />;
      case "archive":
        return <ArchivePage />;
      case "epilogue":
        return <EpiloguePage />;
      default:
        return null;
    }
  };

  // Custom motion transitions mimicking paper pages folding/turning
  const pageTransitionVariants = {
    initial: (dir: "next" | "prev") => ({
      opacity: 0,
      rotateY: dir === "next" ? 45 : -45,
      scale: 0.98,
      transformOrigin: dir === "next" ? "right center" : "left center",
    }),
    animate: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
    exit: (dir: "next" | "prev") => ({
      opacity: 0,
      rotateY: dir === "next" ? -45 : 45,
      scale: 0.98,
      transformOrigin: dir === "next" ? "left center" : "right center",
      transition: {
        duration: 0.45,
        ease: "easeIn",
      },
    }),
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Dynamic Header Badge Bar indicating current chapter when open */}
      {isBookOpened && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl flex items-center justify-between px-6 py-3 mb-4 bg-white/70 border border-pink-100 rounded-2xl shadow-xs text-xs sm:text-sm font-sans"
        >
          <div className="flex items-center gap-2 text-pink-600 font-bold">
            <Book className="w-4 h-4" />
            <span className="tracking-widest uppercase">{activePage.chapter}</span>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-700">{activePage.label}</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-400">
            <span>BOOK SPREAD PROGRESS</span>
            <span className="font-bold text-pink-700">{currentPageIndex}</span>
            <span>/</span>
            <span>{PAGES.length - 1}</span>
          </div>
        </motion.div>
      )}

      {/* Main Binder stage wrapper */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 relative items-stretch">
        
        {/* SIDE BAR SECTIONS (Bookmark index tabs for Desktop Navigation) */}
        {isBookOpened && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-48 bg-white/50 backdrop-blur-md rounded-2xl p-4 border border-pink-150 shadow-sm flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible items-stretch shrink-0 scrollbar-none scroll-smooth"
          >
            <div className="text-[10px] font-mono tracking-widest text-neutral-400 font-bold mb-2 hidden lg:flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-pink-600" />
              <span>BOOK INDEX</span>
            </div>
            
            {PAGES.map((page, idx) => {
              const isActive = currentPageIndex === idx;
              return (
                <button
                  key={page.id}
                  onClick={() => handleJumpToPage(page.id)}
                  className={`flex flex-col lg:flex-row items-center gap-2 lg:gap-3 px-3 py-2 rounded-xl text-left transition-all font-sans text-xs shrink-0 ${
                    isActive
                      ? "bg-pink-700 text-white font-semibold shadow-sm scale-[1.02]"
                      : "text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100/60"
                  }`}
                  id={`btn-index-tab-${page.id}`}
                >
                  <span className="text-[9px] font-mono opacity-80 lg:w-6">{page.chapter}</span>
                  <span className="truncate max-w-[85px] lg:max-w-none">{page.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}

        {/* CENTER BOOK PAPER CONTAINER */}
        <div className="flex-1 bg-white rounded-3xl shadow-xl border border-neutral-200/50 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
          
          {/* Subtle paper fold crease gradient representation in open book view */}
          {isBookOpened && (
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-r from-neutral-200/50 to-transparent pointer-events-none z-10" />
          )}

          {/* Core Animating Canvas */}
          <div className="p-6 md:p-10 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait" custom={flipDirection}>
              <motion.div
                key={currentPageIndex}
                custom={flipDirection}
                variants={pageTransitionVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full h-full"
              >
                {renderPageContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PAGE FLIPPING FOOTER OVERLAYS */}
          {activePage.id !== "cover" && (
            <div className="border-t border-neutral-100 bg-neutral-50/50 px-6 py-4 flex items-center justify-between text-xs font-sans">
              
              {/* Prev Button */}
              <button
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors border ${
                  currentPageIndex === 0
                    ? "text-neutral-300 border-neutral-100 cursor-not-allowed"
                    : "text-neutral-600 border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
                id="btn-prev-page"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>이전 장</span>
              </button>

              {/* Progress dots tracker */}
              <div className="flex items-center gap-1.5 hidden sm:flex">
                {PAGES.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => handleJumpToPage(p.id)}
                    className={`h-2 rounded-full transition-all ${
                      currentPageIndex === idx
                        ? "w-5 bg-pink-700"
                        : "w-2 bg-neutral-200 hover:bg-neutral-350"
                    }`}
                    title={p.label}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextPage}
                disabled={currentPageIndex === PAGES.length - 1}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors border ${
                  currentPageIndex === PAGES.length - 1
                    ? "text-neutral-300 border-neutral-100 cursor-not-allowed"
                    : "text-neutral-600 border-neutral-200 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
                id="btn-next-page"
              >
                <span>다음 장</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
