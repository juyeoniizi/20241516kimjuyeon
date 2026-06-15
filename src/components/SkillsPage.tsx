/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Star, Library, Wrench, CheckCircle2, Plus, Trash2 } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { SkillItem } from "../types";
import Editable from "./Editable";

export default function SkillsPage() {
  const { isEditMode, skillsList, setSkillsList } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<"all" | "design" | "office" | "strategy">("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = skillsList.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  const handleUpdateSkill = (index: number, key: keyof SkillItem, val: any) => {
    setSkillsList((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [key]: val } : item))
    );
  };

  const handleDeleteSkill = (index: number) => {
    setSkillsList((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleAddSkill = () => {
    const categoryToAdd: "design" | "office" | "strategy" =
      selectedCategory === "all" ? "design" : selectedCategory;

    setSkillsList((prev) => [
      ...prev,
      {
        name: "새로운 기술 도구",
        level: "Intermediate",
        percent: 80,
        description: "습득한 스킬의 활용 시나리오와 주요 결과물을 자유롭게 서술해 주세요.",
        category: categoryToAdd,
      },
    ]);
  };

  return (
    <div className="w-full flex flex-col p-2 sm:p-4 text-neutral-800 space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono tracking-widest text-pink-600/95 font-bold mb-1">CHAPTER 09 / CAPABILITIES</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            Professional Skills <span className="text-lg font-sans font-medium text-neutral-400">보유 역량</span>
          </h2>
          <p className="text-sm font-sans text-neutral-500 mt-2 max-w-xl">
            에디토리얼 기획서 저술에서부터 모던한 상표 디자인 툴 운용까지, 최상의 성과 도출을 조력하는 핵심 기구들입니다.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={handleAddSkill}
            className="self-start sm:self-end px-3.5 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 font-sans font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs border border-pink-200/40"
          >
            <Plus className="w-4 h-4" /> 기술 카드 추가
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pt-2">
        {[
          { id: "all", label: "전체 도구" },
          { id: "design", label: "디자인 / 시각화" },
          { id: "office", label: "생산성 (Office)" },
          { id: "strategy", label: "AI 및 기획 스마트" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as any)}
            className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-300 border ${
              selectedCategory === tab.id
                ? "bg-pink-700 text-white border-pink-700 shadow-sm"
                : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50 hover:text-neutral-800"
            }`}
            id={`btn-skill-tab-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid of Interactive Tool Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
        {filteredSkills.map((skill) => {
          // Find absolute index in master list to modify correctly
          const masterIndex = skillsList.findIndex((s) => s.name === skill.name && s.description === skill.description);
          const isHovered = hoveredSkill === skill.name;

          return (
            <motion.div
              key={`${skill.name}-${masterIndex}`}
              layout
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              className="group relative bg-white border border-neutral-200/75 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-pink-300 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
              id={`card-skill-${skill.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div>
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h4 className="text-base font-sans font-bold text-neutral-900 group-hover:text-pink-700 transition-colors flex-1">
                    <Editable
                      value={skill.name}
                      onChange={(val) => handleUpdateSkill(masterIndex, "name", val)}
                      inputClassName="text-sm font-bold bg-white"
                    />
                  </h4>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] font-mono font-bold bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full border border-pink-100 uppercase">
                      <Editable
                        value={skill.level}
                        onChange={(val) => handleUpdateSkill(masterIndex, "level", val)}
                        inputClassName="text-[9px] py-0 px-1 font-mono max-w-[65px] bg-white"
                      />
                    </span>
                    {isEditMode && (
                      <button
                        onClick={() => handleDeleteSkill(masterIndex)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        title="스킬 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {isEditMode && (
                  <div className="mb-2 flex items-center gap-2">
                    <span className="text-[10px] text-neutral-400 font-sans">분류:</span>
                    <select
                      value={skill.category}
                      onChange={(e) => handleUpdateSkill(masterIndex, "category", e.target.value)}
                      className="text-[10px] px-1.5 py-0.5 bg-neutral-50 border border-neutral-200 rounded-md font-sans focus:outline-hidden"
                    >
                      <option value="design">디자인</option>
                      <option value="office">생산성</option>
                      <option value="strategy">AI 기획</option>
                    </select>
                  </div>
                )}
                
                <div className="text-xs text-neutral-500 leading-relaxed font-sans min-h-[60px]">
                  <Editable
                    value={skill.description}
                    onChange={(val) => handleUpdateSkill(masterIndex, "description", val)}
                    type="textarea"
                    inputClassName="text-xs leading-relaxed bg-white"
                  />
                </div>
              </div>

              {/* Dynamic matching progress line or rating stars */}
              <div className="mt-4 pt-3 border-t border-neutral-100">
                <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono mb-1">
                  <span>익숙도 & 활용 숙련</span>
                  <span className="font-bold text-pink-600">
                    {isEditMode ? (
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={skill.percent}
                        onChange={(e) => handleUpdateSkill(masterIndex, "percent", Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-10 text-right px-1 border border-neutral-200 rounded-md py-0.5 font-mono text-[10px]"
                      />
                    ) : (
                      `${skill.percent}%`
                    )}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-neutral-150 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-pink-600 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
