/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { motion } from "motion/react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { 
  Calendar, 
  Sparkles, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  User, 
  Target, 
  Compass, 
  Palette, 
  PieChart as ChartIcon, 
  ExternalLink,
  Camera
} from "lucide-react";
import { Project } from "../types";
import { usePortfolio } from "../context/PortfolioContext";
import Editable from "./Editable";

interface ProjectPageProps {
  project: Project;
}

export default function ProjectPage({ project }: ProjectPageProps) {
  const { isEditMode, setProjects, updateProjectImage } = usePortfolio();

  const handleTextChange = (key: keyof Project, val: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? { ...p, [key]: val } : p))
    );
  };

  const triggerImageUpload = () => {
    if (isEditMode) {
      document.getElementById(`proj-img-upload-${project.id}`)?.click();
    }
  };

  return (
    <div className="w-full text-neutral-800 p-1 sm:p-3">
      {/* Act Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between border-b border-pink-100 pb-4">
        <div className="space-y-1 w-full">
          <span className="text-xs font-mono font-extrabold tracking-widest text-pink-600 uppercase bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100/60 inline-block mb-1">
            {project.actNumber}
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 tracking-tight leading-tight w-full">
            <Editable
              value={project.title}
              onChange={(val) => handleTextChange("title", val)}
              className="font-serif font-bold text-2xl md:text-3xl text-neutral-900 tracking-tight leading-tight block w-full"
            />
          </h2>
          <div className="text-xs sm:text-sm font-sans text-neutral-400 mt-2 flex items-center gap-1.5 flex-wrap">
            <span className="flex items-center gap-1 text-pink-700/80 font-semibold">
              <User className="w-3.5 h-3.5" /> 
              <Editable
                value={project.role}
                onChange={(val) => handleTextChange("role", val)}
                className="font-semibold text-pink-700/80"
              />
            </span>
            <span className="text-neutral-300">|</span>
            <span className="flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5" /> 
              <Editable
                value={project.duration}
                onChange={(val) => handleTextChange("duration", val)}
                className="font-mono text-neutral-400"
              />
            </span>
          </div>
        </div>
      </div>

      {/* CORE ALTERNATING STORYTELLING LAYOUTS */}
      {project.id === "act01" && (
        /* ===== ACT 01: BEAUTY EDITORIAL LAYOUT ===== */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6">
            {project.image && (
              <div 
                onClick={triggerImageUpload}
                className={`rounded-2xl overflow-hidden aspect-video sm:aspect-square bg-stone-100 shadow-md border relative group ${
                  isEditMode ? "cursor-pointer border-dashed border-2 border-pink-400 hover:border-pink-600 hover:shadow-lg transition-all duration-300" : "border-pink-100"
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {isEditMode && (
                  <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-white text-xs select-none gap-2">
                    <Camera className="w-7 h-7 text-pink-300" />
                    <span className="font-sans font-semibold tracking-wider">프로젝트 사진 업로드</span>
                    <span className="text-[10px] text-neutral-200">클릭하여 새 이미지 선택</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-950/20 via-transparent to-transparent pointer-events-none" />
              </div>
            )}
            
            <div className="bg-rose-50/60 p-5 rounded-2xl border border-rose-200/50 space-y-2">
              <h4 className="text-sm font-sans font-extrabold text-rose-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> 핵심 기획 포인트 (Core Summary)
              </h4>
              <div className="text-xs text-rose-950/80 leading-relaxed font-sans font-medium">
                <Editable
                  value={project.summary}
                  onChange={(val) => handleTextChange("summary", val)}
                  type="textarea"
                  inputClassName="bg-white/80"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7 space-y-6">
            <div className="prose prose-pink max-w-none space-y-4">
              <div className="bg-white p-4.5 rounded-xl border border-neutral-100 shadow-xs space-y-1">
                <h4 className="text-xs font-sans font-bold text-neutral-400 tracking-wider uppercase">THE PROBLEM (과제 및 배경)</h4>
                <div className="text-xs sm:text-sm text-neutral-700 leading-normal font-sans">
                  <Editable
                    value={project.problem}
                    onChange={(val) => handleTextChange("problem", val)}
                    type="textarea"
                  />
                </div>
              </div>

              <div className="bg-white p-4.5 rounded-xl border border-neutral-100 shadow-xs space-y-1">
                <h4 className="text-xs font-sans font-bold text-neutral-400 tracking-wider uppercase">MY CONTRIBUTION (담당 역할)</h4>
                <div className="text-xs sm:text-sm text-neutral-700 leading-normal font-sans">
                  <Editable
                    value={project.rolesDetail}
                    onChange={(val) => handleTextChange("rolesDetail", val)}
                    type="textarea"
                  />
                </div>
              </div>

              <div className="bg-white p-4.5 rounded-xl border border-neutral-100 shadow-xs space-y-1">
                <h4 className="text-xs font-sans font-bold text-neutral-400 tracking-wider uppercase">THE PROCESS (추진 과정)</h4>
                <div className="text-xs sm:text-sm text-neutral-700 leading-normal font-sans">
                  <Editable
                    value={project.process}
                    onChange={(val) => handleTextChange("process", val)}
                    type="textarea"
                  />
                </div>
              </div>

              <div className="bg-rose-900 text-rose-50 p-5 rounded-xl space-y-3 shadow-sm">
                <h4 className="text-xs font-sans font-bold text-rose-300 tracking-wider uppercase flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-rose-300" /> DELIVERED RESULTS (도출 성과)
                </h4>
                <div className="text-xs sm:text-sm leading-relaxed text-rose-50 font-sans">
                  <Editable
                    value={project.implementation}
                    onChange={(val) => handleTextChange("implementation", val)}
                    type="textarea"
                    inputClassName="bg-white/10 text-white border-rose-600 focus:ring-rose-400 placeholder-rose-300"
                  />
                </div>
                <div className="pt-3.5 border-t border-rose-800 mt-2">
                  <div className="text-xs text-rose-100 font-sans">
                    <Editable
                      value={project.result}
                      onChange={(val) => handleTextChange("result", val)}
                      type="textarea"
                      inputClassName="bg-white/10 text-white border-rose-600 focus:ring-rose-400 placeholder-rose-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/40 space-y-1">
              <h4 className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">KEY INSIGHT (인사이트)</h4>
              <div className="text-xs leading-relaxed text-neutral-600 font-sans italic">
                "<Editable
                  value={project.keyInsight}
                  onChange={(val) => handleTextChange("keyInsight", val)}
                  type="textarea"
                  inputClassName="italic"
                />"
              </div>
            </div>
          </div>
        </div>
      )}

      {project.id === "act02" && (
        /* ===== ACT 02: INDIE CYBER GALLERY ART WALL ===== */
        <div className="bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-3xl p-5 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-12 xl:col-span-7 space-y-5">
              <div className="border-l-2 border-pink-500 pl-4 space-y-1">
                <p className="text-xs font-mono text-pink-400 tracking-wider uppercase">EXHIBITION PROJECT CASE</p>
                <h3 className="text-lg font-bold font-serif text-white">"HTTP 에러코드 418, 찻잔으로 환생하다"</h3>
              </div>
              
              <div className="text-xs text-neutral-300 leading-relaxed font-sans">
                <Editable
                  value={project.summary}
                  onChange={(val) => handleTextChange("summary", val)}
                  type="textarea"
                  inputClassName="bg-neutral-850 text-neutral-100 border-neutral-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-pink-400 uppercase">PROBLEM & IDEATION</span>
                  <div className="text-xs text-neutral-300 leading-relaxed">
                    <Editable
                      value={project.problem}
                      onChange={(val) => handleTextChange("problem", val)}
                      type="textarea"
                      inputClassName="bg-neutral-900 text-white border-neutral-750"
                    />
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-pink-400 uppercase">CREATIVE PROCESS</span>
                  <div className="text-xs text-neutral-300 leading-relaxed">
                    <Editable
                      value={project.process}
                      onChange={(val) => handleTextChange("process", val)}
                      type="textarea"
                      inputClassName="bg-neutral-900 text-white border-neutral-750"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-pink-950/20 border border-pink-900/45 space-y-1">
                <span className="text-[10px] font-mono font-bold text-pink-400 tracking-wider block uppercase font-sans">KEY STATS & IMPACT</span>
                <div className="text-xs text-neutral-200 leading-normal font-sans">
                  <Editable
                    value={project.result}
                    onChange={(val) => handleTextChange("result", val)}
                    type="textarea"
                    inputClassName="bg-neutral-850 text-neutral-100 border-neutral-750"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-12 xl:col-span-5 space-y-5">
              {project.image && (
                <div 
                  onClick={triggerImageUpload}
                  className={`rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-950 border relative group shadow-lg ${
                    isEditMode ? "cursor-pointer border-dashed border-2 border-pink-500 hover:border-pink-300" : "border-pink-900/60"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {isEditMode && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-xs select-none gap-2">
                      <Camera className="w-7 h-7 text-pink-450 animate-pulse" />
                      <span className="font-sans font-bold tracking-wider text-pink-300">포스터 사진 업로드</span>
                      <span className="text-[10px] text-neutral-300">클릭하여 전시 이미지 변경</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-pink-500/10 pointer-events-none mix-blend-overlay" />
                </div>
              )}

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 space-y-2 font-mono">
                <p className="font-bold text-neutral-200">PROJECT METADATA</p>
                <p>• 전시작: 418 I'm a teapot 오프라인 전시회</p>
                <p>• 동아리: 한림대 CONNECT 메이커스</p>
                <p>• 성과: 교내 디자인 페스타 최우수관객상 수상</p>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-1">
                <h4 className="text-[10px] font-mono font-bold text-pink-400 tracking-wider">LEARNED INSIGHT</h4>
                <div className="text-xs text-neutral-300 italic font-sans leading-normal">
                  "<Editable
                    value={project.keyInsight}
                    onChange={(val) => handleTextChange("keyInsight", val)}
                    type="textarea"
                    inputClassName="bg-neutral-850 text-neutral-100 border-neutral-750"
                  />"
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {project.id === "act03" && (
        /* ===== ACT 03: LUXURY LOOKBOOK LAYOUT ===== */
        <div className="space-y-6">
          <div className="bg-amber-50/50 rounded-2xl p-4 sm:p-6 border border-amber-200/50">
            <p className="text-[10px] font-mono font-bold text-amber-700 tracking-wider mb-2 uppercase">BIFAN PARTNERSHIP / MERCHANDISE & EXPERIENCE DESIGN</p>
            <div className="text-xs sm:text-sm text-amber-950/80 leading-relaxed font-sans">
              <Editable
                value={project.summary}
                onChange={(val) => handleTextChange("summary", val)}
                type="textarea"
                inputClassName="bg-white/80"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-12 lg:col-span-5">
              {project.image && (
                <div 
                  onClick={triggerImageUpload}
                  className={`rounded-2xl overflow-hidden aspect-square md:aspect-[4/5] bg-stone-100 shadow-md border relative group ${
                    isEditMode ? "cursor-pointer border-dashed border-2 border-amber-500 hover:border-amber-700" : "border-amber-200/40"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {isEditMode && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-xs select-none gap-2">
                      <Camera className="w-7 h-7 text-amber-300" />
                      <span className="font-sans font-bold tracking-wider">굿즈 이미지 업로드</span>
                      <span className="text-[10px] text-neutral-200">클릭하여 기획 소스 교체</span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-amber-900 text-white px-2.5 py-1 text-[10px] font-mono tracking-wider rounded-md z-12">
                    BIFAN 2025 MD SHOWCASE
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-12 lg:col-span-7 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 border border-stone-200/60 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-amber-700/80 font-bold block">진열 오차 관리</span>
                  <h4 className="text-xl font-bold font-sans text-amber-950">정산율 100%</h4>
                  <p className="text-[11px] text-neutral-500 leading-tight">행사 전과 동일한 전수 사양 검정 유지</p>
                </div>
                <div className="bg-white p-4 border border-stone-200/60 rounded-xl space-y-1">
                  <span className="text-[10px] font-mono text-amber-700/80 font-bold block">소셜 미디어 멘션</span>
                  <h4 className="text-xl font-bold font-sans text-neutral-900">50% 이상 급증</h4>
                  <p className="text-[11px] text-neutral-500 leading-tight">참여 유도 포토존 유저 바이럴 전파</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-sans font-bold flex items-center justify-center flex-shrink-0 mt-0.5">01</span>
                  <div className="flex-1 space-y-0.5">
                    <h5 className="font-bold text-neutral-800">현장 동선 정교화 및 머천다이징 스탠딩</h5>
                    <div className="text-neutral-500 leading-normal font-sans">
                      <Editable
                        value={project.problem}
                        onChange={(val) => handleTextChange("problem", val)}
                        type="textarea"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-sans font-bold flex items-center justify-center flex-shrink-0 mt-0.5">02</span>
                  <div className="flex-1 space-y-0.5">
                    <h5 className="font-bold text-neutral-800">엑셀 데이터 정합 데이터 확보 및 소통</h5>
                    <div className="text-neutral-500 leading-normal font-sans">
                      <Editable
                        value={project.process}
                        onChange={(val) => handleTextChange("process", val)}
                        type="textarea"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-sans font-bold flex items-center justify-center flex-shrink-0 mt-0.5">03</span>
                  <div className="flex-1 space-y-0.5">
                    <h5 className="font-bold text-neutral-800">파트너십 보상 프로그램 및 정산 수행</h5>
                    <div className="text-neutral-500 leading-normal font-sans">
                      <Editable
                        value={project.result}
                        onChange={(val) => handleTextChange("result", val)}
                        type="textarea"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-900/10 mt-4 space-y-1">
                <span className="text-[10px] font-bold text-amber-800 tracking-wider block uppercase">INSIGHT REPORT</span>
                <div className="text-xs text-amber-950 font-serif italic leading-relaxed">
                  "<Editable
                    value={project.keyInsight}
                    onChange={(val) => handleTextChange("keyInsight", val)}
                    type="textarea"
                    inputClassName="font-serif italic bg-white/70"
                  />"
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {project.id === "act04" && (
        /* ===== ACT 04: DESIGN STYLE REFERENCE MANUAL ===== */
        <div className="space-y-6">
          <div className="bg-pink-50/50 rounded-2xl p-4 border border-pink-100 text-xs sm:text-sm text-pink-950 flex flex-col sm:flex-row items-center gap-4">
            <div className="p-3 bg-white rounded-xl shadow-xs border border-pink-100 flex-shrink-0">
              <Palette className="w-6 h-6 text-pink-600" />
            </div>
            <div className="leading-relaxed flex-1 w-full text-pink-950 font-sans">
              <Editable
                value={project.summary}
                onChange={(val) => handleTextChange("summary", val)}
                type="textarea"
                inputClassName="bg-white/80"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-12 xl:col-span-5 space-y-4">
              {project.image && (
                <div 
                  onClick={triggerImageUpload}
                  className={`rounded-2xl overflow-hidden aspect-square bg-white shadow-md border p-3 relative group ${
                    isEditMode ? "cursor-pointer border-dashed border-2 border-pink-400 hover:border-pink-600" : "border-pink-200/50"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-500"
                  />
                  {isEditMode && (
                    <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-white text-xs select-none gap-2 rounded-2xl">
                      <Camera className="w-7 h-7 text-pink-300" />
                      <span className="font-sans font-semibold tracking-wider">캐릭터 매뉴얼 업로드</span>
                      <span className="text-[10px] text-neutral-200">클릭하여 이미지 파일 선택</span>
                    </div>
                  )}
                </div>
              )}

              {/* Design Palette System Representation */}
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200/60 space-y-2">
                <span className="text-[10px] font-mono text-neutral-400 font-extrabold block">COSRX PINK SYSTEM</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <div className="h-8 rounded bg-[#e21c4f]" />
                    <p className="text-[9px] font-mono text-neutral-600 text-center">Pink Solid<br/>#E21C4F</p>
                  </div>
                  <div className="space-y-1">
                    <div className="h-8 rounded bg-[#ffd3dd] border border-neutral-200" />
                    <p className="text-[9px] font-mono text-neutral-600 text-center">Soft Skin<br/>#FFD3DD</p>
                  </div>
                  <div className="space-y-1">
                    <div className="h-8 rounded bg-[#312e81]" />
                    <p className="text-[9px] font-mono text-neutral-600 text-center">Tech Indigo<br/>#312E81</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 border-l border-neutral-100 hidden lg:block h-80 self-center justify-self-center" />

            <div className="lg:col-span-12 xl:col-span-6 space-y-4">
              <div className="bg-white p-4.5 rounded-xl border border-neutral-150 shadow-xs space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-pink-600 uppercase">RESEARCH & CASE STUDY</span>
                <h4 className="text-sm font-bold text-neutral-800">에스테틱 대형 성공 사례인 '메디큐브 핑크' 전략 분석</h4>
                <div className="text-xs text-neutral-500 leading-normal font-sans">
                  <Editable
                    value={project.problem}
                    onChange={(val) => handleTextChange("problem", val)}
                    type="textarea"
                  />
                </div>
              </div>

              <div className="bg-white p-4.5 rounded-xl border border-neutral-150 shadow-xs space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-pink-600 uppercase">CREATIVE MASCOT BLUEPRINT</span>
                <h4 className="text-sm font-bold text-neutral-800">과학적 신뢰를 더마 친근한 비주얼로 표현</h4>
                <div className="text-xs text-neutral-500 leading-normal font-sans">
                  <Editable
                    value={project.rolesDetail}
                    onChange={(val) => handleTextChange("rolesDetail", val)}
                    type="textarea"
                  />
                </div>
              </div>

              <div className="bg-white p-4.5 rounded-xl border border-neutral-150 shadow-xs space-y-1.5">
                <span className="text-[10px] font-mono font-bold text-pink-600 uppercase">BRAND DESIGN SYSTEM</span>
                <h4 className="text-sm font-bold text-neutral-800">30페이지 분량의 디자인 파트십 리소스 가이드</h4>
                <div className="text-xs text-neutral-500 leading-normal font-sans">
                  <Editable
                    value={project.result}
                    onChange={(val) => handleTextChange("result", val)}
                    type="textarea"
                  />
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/40 space-y-1">
                <span className="text-[10px] font-mono font-bold text-neutral-400 block tracking-widest">DESIGN INSIGHT</span>
                <div className="text-xs text-neutral-600 italic leading-relaxed">
                  "<Editable
                    value={project.keyInsight}
                    onChange={(val) => handleTextChange("keyInsight", val)}
                    type="textarea"
                    inputClassName="italic"
                  />"
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {project.id === "act05" && (
        /* ===== ACT 05: BROCHURE PRODUCT SPECIFICATION ===== */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-12 xl:col-span-7 space-y-5">
              <div className="bg-teal-50/40 p-5 rounded-2xl border border-teal-100 space-y-2">
                <span className="text-[10px] font-mono text-teal-800 font-extrabold tracking-widest block uppercase">DR. BAND / BRANDING CASE DETAIL</span>
                <div className="text-xs text-normal leading-relaxed text-teal-950/80 font-sans">
                  <Editable
                    value={project.summary}
                    onChange={(val) => handleTextChange("summary", val)}
                    type="textarea"
                    inputClassName="bg-white/80"
                  />
                </div>
              </div>

              {/* Product specifications tables recreating the hand-drawn-style sketch specs of the PDF page 13 */}
              <div className="bg-white p-5 rounded-2xl border border-neutral-200/60 space-y-3 shadow-xs">
                <h4 className="text-xs font-sans font-bold text-neutral-800 uppercase tracking-widest border-b border-neutral-100 pb-2">
                  제품 설계 및 타깃 스펙 시트
                </h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs">
                  <div className="space-y-1">
                    <span className="text-neutral-400 font-medium">1. 제품 형태</span>
                    <p className="text-neutral-800 font-bold">밀착식 하이드로콜로이드 밴드</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-neutral-400 font-medium">2. 칼라 / 재질</span>
                    <p className="text-neutral-800 font-bold">안전한 반투명 살구색 실리콘 성분</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-neutral-400 font-medium">3. 사이즈 규격</span>
                    <p className="text-neutral-800 font-bold">어린이용 / 어른용 선택 구분 사양</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-neutral-400 font-medium">4. 서포트 부가요소</span>
                    <p className="text-neutral-800 font-bold">저자극 안감 설계 및 방수/통기성</p>
                  </div>
                </div>
                <div className="p-3 bg-neutral-50 rounded-xl mt-2">
                  <p className="text-[11px] text-neutral-500 leading-normal">
                    * 가이드 요약: 약물이 상처에 직접 접촉하여 밀폐 소독하지 않도록 정교하게 살균한 중앙 거즈 가둠 설계 적용.
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-neutral-600">
                <div className="leading-relaxed font-sans">
                  <strong>진입 동향 및 대조군 분석: </strong>
                  <Editable
                    value={project.problem}
                    onChange={(val) => handleTextChange("problem", val)}
                    type="textarea"
                  />
                </div>
                <div className="leading-relaxed font-sans">
                  <strong>핵심 설계 기여: </strong>
                  <Editable
                    value={project.rolesDetail}
                    onChange={(val) => handleTextChange("rolesDetail", val)}
                    type="textarea"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-12 xl:col-span-5 space-y-4">
              {project.image && (
                <div 
                  onClick={triggerImageUpload}
                  className={`rounded-2xl overflow-hidden aspect-square sm:aspect-[4/3] bg-stone-100 shadow-md border relative group ${
                    isEditMode ? "cursor-pointer border-dashed border-2 border-teal-500 hover:border-teal-700" : "border-teal-200/40"
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {isEditMode && (
                    <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center text-white text-xs select-none gap-2">
                      <Camera className="w-7 h-7 text-teal-300 animate-pulse" />
                      <span className="font-sans font-bold tracking-wider">패키지 디자인 업로드</span>
                      <span className="text-[10px] text-neutral-200">클릭하여 이미지 파일 교체</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/20 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-200/30 text-xs space-y-1">
                <span className="font-bold text-teal-950 block">마케팅 제안상 수상 성과</span>
                <div className="text-teal-900 leading-normal font-sans">
                  <Editable
                    value={project.result}
                    onChange={(val) => handleTextChange("result", val)}
                    type="textarea"
                    inputClassName="bg-white/80"
                  />
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/40 space-y-1">
                <span className="text-[10px] font-mono font-bold text-neutral-400 block tracking-widest">PRODUCT INSIGHT</span>
                <div className="text-xs text-neutral-600 italic leading-relaxed">
                  "<Editable
                    value={project.keyInsight}
                    onChange={(val) => handleTextChange("keyInsight", val)}
                    type="textarea"
                    inputClassName="italic"
                  />"
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {project.id === "act06" && (
        /* ===== ACT 06: TECHNICAL DATA DASHBOARD WITH RECHARTS ===== */
        <div className="space-y-6">
          <div className="bg-indigo-50/50 rounded-3xl p-5 border border-indigo-100 flex flex-col md:flex-row gap-6 items-center">
            <div className="p-3 bg-white hover:bg-indigo-50 rounded-2xl shadow-sm border border-indigo-100 flex-shrink-0 animate-pulse">
              <ChartIcon className="w-8 h-8 text-indigo-750" />
            </div>
            <div className="text-xs sm:text-sm text-indigo-950 leading-relaxed flex-1 w-full font-sans">
              <span className="font-bold text-indigo-800 tracking-wider block uppercase mb-1">DATA-DRIVEN GLOBAL CONSUMER LANDSCAPE</span>
              <Editable
                value={project.summary}
                onChange={(val) => handleTextChange("summary", val)}
                type="textarea"
                inputClassName="bg-white/80"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Pie Chart display on the left (lg:span-6) */}
            <div className="lg:col-span-12 xl:col-span-6 bg-white rounded-2xl border border-neutral-200/60 p-5 shadow-xs flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-4">
                <h4 className="text-xs font-sans font-bold text-neutral-800 uppercase tracking-widest">
                  잠재 대학생 고객 일상 점유 비율 (%)
                </h4>
                <span className="text-[9px] font-mono text-neutral-400 bg-neutral-100 px-2.5 py-0.5 rounded-full">
                  N=1,200 (20-25세)
                </span>
              </div>
              
              <div className="w-full h-64 md:h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "학습/공부", value: 45, color: "#ec4899" },
                        { name: "피트니스/운동", value: 20, color: "#312e81" },
                        { name: "충전/휴식 및 케어", value: 15, color: "#f87171" },
                        { name: "기타 수면/통학 등", value: 20, color: "#fca5a5" },
                      ]}
                      cx="55%"
                      cy="48%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {[
                        { color: "#ec4899" },
                        { color: "#312e81" },
                        { color: "#f87171" },
                        { color: "#fca5a5" },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`${value}%`, "점유 비율"]}
                      contentStyle={{ backgroundColor: "#1e293b", color: "#f8fafc", borderRadius: "12px", border: "none" }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      align="center"
                      iconSize={10}
                      wrapperStyle={{ fontSize: "11px", fontFamily: "sans-serif", paddingTop: "14px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-full text-center mt-2 p-2.5 bg-neutral-50 rounded-xl">
                <p className="text-[10px] text-neutral-500 font-sans">
                  * 정밀 분석 결과: 하루 중 <strong>45%를 차지하는 '학습/공부' 시간</strong>에 가치를 두는 고객의 가방에 침투할 플랜 수립.
                </p>
              </div>
            </div>

            {/* Analysis details on the right (lg:span-6) */}
            <div className="lg:col-span-12 xl:col-span-6 space-y-4">
              <div className="bg-neutral-50 p-4.5 rounded-xl border border-neutral-100 space-y-1">
                <h5 className="font-bold text-xs text-indigo-900 uppercase tracking-wider">PROBLEM SPECTRUM</h5>
                <div className="text-xs text-neutral-600 leading-relaxed font-sans w-full">
                  <Editable
                    value={project.problem}
                    onChange={(val) => handleTextChange("problem", val)}
                    type="textarea"
                  />
                </div>
              </div>

              <div className="bg-neutral-50 p-4.5 rounded-xl border border-neutral-100 space-y-1">
                <h5 className="font-bold text-xs text-indigo-900 uppercase tracking-wider">METHODOLOGY & BRAND ALIGNMENT</h5>
                <div className="text-xs text-neutral-600 leading-relaxed font-sans w-full">
                  <Editable
                    value={project.rolesDetail}
                    onChange={(val) => handleTextChange("rolesDetail", val)}
                    type="textarea"
                  />
                </div>
              </div>

              <div className="bg-indigo-900 text-indigo-50 p-4.5 rounded-xl space-y-1.5 shadow-sm">
                <span className="text-[10px] font-mono text-indigo-300 font-bold block uppercase">VERIFIED RESULTS</span>
                <div className="text-xs leading-normal font-sans text-indigo-50 w-full">
                  <Editable
                    value={project.result}
                    onChange={(val) => handleTextChange("result", val)}
                    type="textarea"
                    inputClassName="bg-white/10 text-white border-indigo-750 focus:ring-indigo-400 placeholder-indigo-300"
                  />
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/40 space-y-1">
                <span className="text-[10px] font-mono font-bold text-neutral-400 block tracking-widest text-indigo-700/80">MARKETING INSIGHT</span>
                <div className="text-xs text-neutral-600 italic leading-relaxed">
                  "<Editable
                    value={project.keyInsight}
                    onChange={(val) => handleTextChange("keyInsight", val)}
                    type="textarea"
                    inputClassName="italic"
                  />"
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file selector for corresponding project image clicks */}
      <input
        type="file"
        id={`proj-img-upload-${project.id}`}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const res = event.target?.result as string;
              if (res) {
                updateProjectImage(project.id, res);
              }
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
  );
}
