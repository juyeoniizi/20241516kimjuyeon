/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, Heart, Check, Copy, ArrowUpRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

import moodboardImg from "../assets/images/creative_moodboard_1781543674062.jpg";
const MOODBOARD_IMAGE = moodboardImg;

export default function EpiloguePage() {
  const { aboutMe } = usePortfolio();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(aboutMe.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-3xl overflow-hidden flex flex-col justify-between text-white p-6 sm:p-10 select-none">
      {/* Background Graphic Collage with dimming overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={MOODBOARD_IMAGE}
          alt="Creative Collage Moodboard"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover scale-102 filter blur-[1px] brightness-50"
        />
        {/* Soft Pink-Violet overlay gradient for editorial depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-950 via-neutral-900/90 to-rose-950/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-950/20 to-neutral-950/90" />
      </div>

      {/* Top Header Row of the final spread */}
      <div className="relative z-10 w-full flex items-center justify-between border-b border-white/10 pb-4">
        <span className="text-xs font-mono tracking-widest text-pink-300 font-bold uppercase">
          EPILOGUE / THE ENDING
        </span>
        <span className="text-xs font-mono text-neutral-300">
          KIM JUYEON PORTFOLIO
        </span>
      </div>

      {/* Main Cinematic Quote centered in the page */}
      <div className="relative z-10 flex flex-col items-center justify-center my-12 text-center max-w-xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="space-y-4"
        >
          {/* Accent decoration line */}
          <div className="w-12 h-1 bg-pink-500 mx-auto rounded-full" />
          
          <h3 className="text-4xl md:text-5xl font-serif font-black tracking-tight leading-tight text-white drop-shadow-md">
            "Every project starts with curiosity."
          </h3>
          
          <p className="text-lg md:text-xl font-sans text-pink-200/90 font-medium tracking-wide">
            "모든 프로젝트는 호기심에서 시작됩니다."
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.5 }}
          className="text-xs md:text-sm text-neutral-300 leading-relaxed font-sans font-medium"
        >
          마케팅의 본질은 고객을 진심으로 궁금해하는 애정어린 관찰입니다.<br/>
          호기심으로 점화된 질문에 단단한 통계 데이터 분석을 축성하여, 브랜드 고유의 진정성 있는 해결안을 기획해 냅니다.
        </motion.p>
      </div>

      {/* Interactive Closing Card / CTA (Hiring connection) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 w-full max-w-xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-4"
      >
        <div className="space-y-1 text-center sm:text-left">
          <p className="text-[10px] tracking-widest text-pink-300 uppercase font-bold">LET'S CO-CREATE SOMETHING VIBRANT</p>
          <h4 className="text-sm font-sans font-extrabold text-white">김주연 기획자와 함께할 프로젝트 파트너를 찾습니다</h4>
          <p className="text-[11px] font-mono text-neutral-300">{aboutMe.email} • {aboutMe.phone}</p>
        </div>

        <div className="flex flex-row gap-2">
          {/* Call to Mail */}
          <a
            href={`mailto:${aboutMe.email}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-pink-700 hover:bg-pink-600 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>메일 접촉</span>
          </a>

          {/* Copy Email */}
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors border border-white/10"
            id="btn-epilogue-copy-email"
          >
            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedEmail ? "복사동작" : "주소 복사"}</span>
          </button>
        </div>
      </motion.div>

      {/* Footer copyright with Heart icon */}
      <div className="relative z-10 w-full text-center text-[10px] text-neutral-400 font-sans mt-8 flex items-center justify-center gap-1">
        <span>Thank you for flipping. Compiled with</span>
        <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
        <span>by {aboutMe.name} &copy; 2026.</span>
      </div>
    </div>
  );
}
