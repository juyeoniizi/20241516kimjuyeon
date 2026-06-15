/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { BookOpen } from "lucide-react";

interface CoverPageProps {
  onOpen: () => void;
}

export default function CoverPage({ onOpen }: CoverPageProps) {
  return (
    <div className="relative w-full h-full min-h-[580px] flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-100/40 to-rose-200/30 overflow-hidden px-6 py-12 select-none">
      {/* Decorative Floating Circles imitating the design mock and a luxury brand look */}
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full border border-pink-200/50 -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full border border-pink-300/40 -mr-40 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full border border-pink-200/40 -ml-20 pointer-events-none" />

      {/* Subtle paper grid overlay for editorial luxury texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(#e11d48 0.5px, transparent 0.5px), radial-gradient(#e11d48 0.5px, #fbcfe8 0.5px)`,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-md rounded-3xl p-10 md:p-14 shadow-2xl border border-white/60 flex flex-col items-center text-center"
      >
        {/* Soft Pink glow behind */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-100 to-pink-200 opacity-20 blur-xl -z-10 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
        
        <p className="text-sm font-semibold tracking-[0.25em] text-pink-600 mb-6 uppercase">
          CREATIVE PLANNERS & BRAND MARKETERS
        </p>

        {/* Header Rules representing the PDF screenshots */}
        <div className="w-full border-t-2 border-pink-900/30 my-4" />
        
        <div className="py-6 flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-sans font-bold tracking-[0.15em] text-neutral-900 leading-none">
            KIM JUYEON
          </h1>
          <p className="text-xl md:text-2xl font-serif italic text-pink-700/80 tracking-[0.08em] mt-4">
            Creative Portfolio
          </p>
        </div>

        <div className="w-full border-b-2 border-pink-900/30 my-4" />

        <p className="text-sm md:text-base text-neutral-500 font-sans tracking-wide max-w-md mt-6 leading-relaxed">
          브랜드 가치를 발견하고, 일상에 스며드는 스토리를 정교하게 기획하는 크리에이티브 파트너 김주연입니다.
        </p>

        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 flex items-center gap-3 px-8 py-4 bg-pink-700 hover:bg-pink-800 text-white font-sans text-base font-semibold rounded-full shadow-lg hover:shadow-pink-400/20 transition-all duration-300"
          id="btn-open-portfolio-book"
        >
          <BookOpen className="w-5 h-5 animate-pulse" />
          <span>포트폴리오 열어보기</span>
        </motion.button>

        <p className="text-xs text-neutral-400 font-mono tracking-widest mt-12">
          KIM JUYEON &copy; 2026
        </p>
      </motion.div>
    </div>
  );
}
