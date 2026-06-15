/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { motion } from "motion/react";
import { Briefcase, ChevronRight, Calendar, Star, Compass, Plus, Trash2 } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import Editable from "./Editable";

interface CareerNotePageProps {
  onNavigateToPage: (pageId: string) => void;
}

export default function CareerNotePage({ onNavigateToPage }: CareerNotePageProps) {
  const { isEditMode, aboutMe, setAboutMe, projects } = usePortfolio();

  const handleCareerChange = (index: number, key: "period" | "company" | "role", val: string) => {
    setAboutMe((prev) => {
      const updatedCareers = [...prev.careers];
      updatedCareers[index] = { ...updatedCareers[index], [key]: val };
      return { ...prev, careers: updatedCareers };
    });
  };

  const addCareerEntry = () => {
    setAboutMe((prev) => ({
      ...prev,
      careers: [
        ...prev.careers,
        { period: "2025.01 - 2025.12", company: "새 실무/행사 단체명", role: "담당 역할 및 내용 설명" }
      ]
    }));
  };

  const deleteCareerEntry = (index: number) => {
    setAboutMe((prev) => ({
      ...prev,
      careers: prev.careers.filter((_, idx) => idx !== index)
    }));
  };

  return (
    <div className="w-full flex flex-col p-2 sm:p-4 text-neutral-800 space-y-8 select-none">
      {/* Chapter 02 Header */}
      <div>
        <p className="text-xs font-mono tracking-widest text-pink-600/90 font-bold mb-1">CHAPTER 02 / EXPERIENCES</p>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
          Career Note <span className="text-lg font-sans font-medium text-neutral-400">커리어 노트</span>
        </h2>
        <p className="text-sm font-sans text-neutral-500 mt-2 max-w-xl">
          실제 현장 스탭 업무부터 대학교 융합 프로젝트 기획까지, 사람의 유입을 유도하고 브랜드 가치를 증폭시켰던 주요 발자취입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: RETRO WORK TIME TIMELINE (lg:span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-pink-600" />
              <h3 className="text-sm font-sans font-bold text-neutral-900 uppercase tracking-widest">
                실무 경력 개요 (Work History)
              </h3>
            </div>
            {isEditMode && (
              <button
                onClick={addCareerEntry}
                className="px-2 py-1 bg-pink-100 hover:bg-pink-200 text-pink-700 text-xs rounded-lg transition-colors flex items-center gap-1 font-sans"
              >
                <Plus className="w-3.5 h-3.5" /> 경력 추가
              </button>
            )}
          </div>

          <div className="relative border-l-2 border-pink-100 pl-6 space-y-6 ml-2">
            {aboutMe.careers.map((career, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 1, x: 0 }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-pink-500 group-hover:scale-125 transition-transform" />

                <div className="space-y-1 pr-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold text-pink-600 bg-pink-50 px-2 sm:px-2.5 py-0.5 rounded-full border border-pink-100 block">
                      <Editable
                        value={career.period}
                        onChange={(val) => handleCareerChange(idx, "period", val)}
                        inputClassName="font-mono text-[10px] py-0 px-1 bg-white max-w-[124px]"
                      />
                    </span>
                    {isEditMode && (
                      <button
                        onClick={() => deleteCareerEntry(idx)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        title="경력 항목 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <h4 className="text-sm sm:text-base font-sans font-bold text-neutral-800">
                    <Editable
                      value={career.company}
                      onChange={(val) => handleCareerChange(idx, "company", val)}
                      inputClassName="font-sans text-xs py-0.5 px-1 bg-white"
                    />
                  </h4>
                  <div className="text-xs text-neutral-500 leading-normal font-sans">
                    <Editable
                      value={career.role}
                      onChange={(val) => handleCareerChange(idx, "role", val)}
                      type="textarea"
                      inputClassName="font-sans text-xs py-0.5 px-1 bg-white"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-pink-50/50 rounded-2xl p-4 border border-pink-100/60 mt-4">
            <h4 className="text-xs font-sans font-bold text-pink-800 mb-1 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-pink-600/20 text-pink-600" /> 현장 브랜드 실무 역량
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              올리브영 메이트 및 투썸플레이스에서의 현장 운영 경험은 대중 고객의 스킨케어 구매 패턴과 가치 선호 경향 데이터를 실시간으로 트래킹하는 귀중한 자산이 되었습니다.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: BOOKSHELF OR PROJECT TILES (lg:span-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-pink-600" />
            <h3 className="text-sm font-sans font-bold text-neutral-900 uppercase tracking-widest">
              주요 프로젝트 (Core Acts)
            </h3>
          </div>

          <p className="text-xs text-neutral-400 mb-4 font-sans">
            카드를 클릭하시면 상세 기획 스토리텔링 페이지로 즉시 플립(Flip)합니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <motion.div
                key={proj.id}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => onNavigateToPage(proj.id)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200/60 bg-white p-4 shadow-sm hover:shadow-md hover:border-pink-200 transition-all duration-300 flex flex-col justify-between min-h-[160px]"
                id={`card-career-act-${proj.id}`}
              >
                {/* Horizontal Category badge */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono font-bold text-pink-600 tracking-wider">
                      {proj.actNumber}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {proj.duration.split(" - ")[0] || proj.duration}
                    </span>
                  </div>
                  <h4 className="text-sm font-sans font-bold text-neutral-800 tracking-tight leading-tight group-hover:text-pink-700 transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 font-sans mt-0.5">
                    {proj.role}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-neutral-100 mt-2">
                  <span className="text-[10px] font-sans text-neutral-400 group-hover:text-pink-600 transition-colors">
                    더 보러가기
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
