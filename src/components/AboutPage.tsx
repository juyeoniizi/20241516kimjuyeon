/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, Copy, Check, GraduationCap, Award, Hash, ArrowUpRight, Camera, RotateCcw, Plus, Trash2 } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import Editable from "./Editable";
import { safeStorage } from "../utils/storage";

import portraitImg from "../assets/images/juyeon_profile_1781543537437.jpg";
const PORTRAIT_PATH = portraitImg;

export default function AboutPage() {
  const { aboutMe, setAboutMe, isEditMode, profileImage, setProfileImage, showImages } = usePortfolio();
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleImageFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          setProfileImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleResetImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileImage(aboutMe.portrait);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // State modification helpers
  const updateEducation = (index: number, key: "institution" | "major" | "period", value: string) => {
    setAboutMe((prev) => {
      const updatedEdu = [...prev.education];
      updatedEdu[index] = { ...updatedEdu[index], [key]: value };
      return { ...prev, education: updatedEdu };
    });
  };

  const addEducation = () => {
    setAboutMe((prev) => ({
      ...prev,
      education: [...prev.education, { institution: "새로운 학교명", major: "학부 및 전공", period: "202X - 202X" }],
    }));
  };

  const deleteEducation = (index: number) => {
    setAboutMe((prev) => ({
      ...prev,
      education: prev.education.filter((_, idx) => idx !== index),
    }));
  };

  const updateCertificate = (index: number, value: string) => {
    setAboutMe((prev) => {
      const updatedCerts = [...prev.certificates];
      updatedCerts[index] = value;
      return { ...prev, certificates: updatedCerts };
    });
  };

  const addCertificate = () => {
    setAboutMe((prev) => ({
      ...prev,
      certificates: [...prev.certificates, "새로운 자격증 또는 수상 실적 입력"],
    }));
  };

  const deleteCertificate = (index: number) => {
    setAboutMe((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((_, idx) => idx !== index),
    }));
  };

  const updateKeyword = (index: number, value: string) => {
    setAboutMe((prev) => {
      const updatedKeywords = [...prev.keywords];
      updatedKeywords[index] = value;
      return { ...prev, keywords: updatedKeywords };
    });
  };

  const addKeyword = () => {
    setAboutMe((prev) => ({
      ...prev,
      keywords: [...prev.keywords, "에너지"],
    }));
  };

  const deleteKeyword = (index: number) => {
    setAboutMe((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((_, idx) => idx !== index),
    }));
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 p-2 sm:p-4 text-neutral-800">
      {/* LEFT COLUMN: VISUAL PROFILE & SUMMARY */}
      <div className="flex flex-col justify-start">
        {/* Editorial Layout Header */}
        <div className="mb-6 space-y-1">
          <p className="text-xs font-mono tracking-widest text-pink-600/90 font-bold">CHAPTER 01 / PROFILE</p>
          <div className="flex items-center gap-1.5 flex-wrap">
            <Editable
              value={aboutMe.name}
              onChange={(val) => setAboutMe((prev) => ({ ...prev, name: val }))}
              className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 tracking-tight"
              inputClassName="text-xl max-w-[200px]"
            />
            <span className="text-lg font-sans font-medium text-neutral-400">Kim Juyeon</span>
          </div>
          <div className="pt-1">
            <Editable
              value={aboutMe.role}
              onChange={(val) => setAboutMe((prev) => ({ ...prev, role: val }))}
              className="text-sm font-sans font-medium text-pink-600 tracking-wide"
              inputClassName="text-xs max-w-sm"
            />
          </div>
        </div>

        {/* Profile Portrait Card with Upload Interaction */}
        <div className="relative group flex flex-col mb-6">
          <div 
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => document.getElementById("profile-image-upload")?.click()}
            className="relative cursor-pointer overflow-hidden rounded-2xl aspect-[3/4] max-w-[280px] sm:max-w-[320px] shadow-lg border-2 border-dashed border-pink-200 hover:border-pink-500 bg-neutral-50 transition-all duration-300 group"
          >
            {showImages ? (
              <img
                src={profileImage}
                alt={aboutMe.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = PORTRAIT_PATH;
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-pink-100 via-rose-50 to-amber-50/60 p-6 flex flex-col justify-between select-none">
                <div className="border border-pink-200/50 p-4 rounded-xl flex-1 flex flex-col justify-between items-center text-center">
                  <div className="text-[10px] font-mono tracking-widest text-pink-600 font-bold uppercase">BRAND MARKETER</div>
                  <div className="my-auto space-y-1">
                    <div className="text-4xl font-serif font-black tracking-widest text-neutral-800">
                      {aboutMe.name?.[0] || "김"}{aboutMe.name?.[1] || "주"}{aboutMe.name?.[2] || "연"}
                    </div>
                    <div className="text-[11px] font-mono text-neutral-400 tracking-wider">KIM JU YEON</div>
                  </div>
                  <div className="w-6 h-[1px] bg-pink-300 my-2" />
                  <div className="text-[9px] font-sans text-neutral-500 leading-relaxed font-semibold">
                    Creative Strategy & Ideation
                  </div>
                </div>
              </div>
            )}
            
            {/* Glassmorphic Edit Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2 select-none">
              <Camera className="w-8 h-8 text-pink-300 drop-shadow" />
              <span className="text-xs font-sans font-semibold tracking-wider">사진 직접 업로드</span>
              <span className="text-[10px] text-neutral-200 font-sans px-4 text-center">클릭하거나 사진 파일을 드래그앤드롭 하세요</span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-pink-950/20 via-transparent to-transparent opacity-80 pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
              <span className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-xs font-semibold text-rose-950 tracking-wider shadow-sm border border-pink-100/30">
                Creative Strategy & Marketing
              </span>
            </div>
          </div>

          <div className="mt-2 text-neutral-400 max-w-[280px] sm:max-w-[320px] flex items-center justify-between px-1 text-[10px]">
            <span>💡 실제 증명사진 업로드 가능 (드래그/클릭)</span>
            {profileImage !== aboutMe.portrait && (
              <button
                onClick={handleResetImage}
                className="text-pink-600 hover:text-pink-800 font-sans font-medium flex items-center gap-1 transition-colors pointer-events-auto"
                title="기본 이미지로 복원"
              >
                <RotateCcw className="w-3 h-3" /> 복원
              </button>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="profile-image-upload"
            onChange={handleImageUpload}
          />
        </div>

        {/* Core Philosophy Quote */}
        <div className="relative border-l-4 border-pink-500 pl-4 py-1.5 mb-2 space-y-1">
          <div className="text-base sm:text-lg font-serif font-semibold text-neutral-800 italic leading-snug">
            "<Editable
              value={aboutMe.quote}
              onChange={(val) => setAboutMe((prev) => ({ ...prev, quote: val }))}
              type="textarea"
              inputClassName="font-serif italic"
            />"
          </div>
          <div className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans mt-2">
            <Editable
              value={aboutMe.subQuote}
              onChange={(val) => setAboutMe((prev) => ({ ...prev, subQuote: val }))}
              type="textarea"
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: EDUCATION, CAREER & SKILLS */}
      <div className="flex flex-col justify-between space-y-6">
        {/* Contact Info (Compact & Copyable) */}
        <div className="bg-gradient-to-br from-pink-50/70 to-rose-200/20 rounded-2xl p-4 border border-pink-100/80">
          <h3 className="text-xs font-mono tracking-wider text-pink-700 font-bold mb-3 uppercase flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" /> Contact Information
          </h3>
          <div className="space-y-2.5 text-xs sm:text-sm">
            {/* Phone Row */}
            <div className="flex items-center justify-between p-2 bg-white/80 rounded-xl hover:bg-white transition-colors">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-neutral-400 font-sans">TEL.</span>
                <span className="font-mono text-neutral-800 font-medium flex-1">
                  <Editable
                    value={aboutMe.phone}
                    onChange={(val) => setAboutMe((prev) => ({ ...prev, phone: val }))}
                    inputClassName="font-mono text-xs max-w-[150px] py-0.5 px-1 bg-white/50"
                  />
                </span>
              </div>
              <button
                onClick={() => handleCopy(aboutMe.phone, "phone")}
                className="p-1.5 text-neutral-400 hover:text-pink-600 rounded-lg transition-colors ml-2"
                title="연락처 복사하기"
                id="btn-copy-phone"
              >
                {copiedText === "phone" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            {/* Email Row */}
            <div className="flex items-center justify-between p-2 bg-white/80 rounded-xl hover:bg-white transition-colors">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-neutral-400 font-sans">EMAIL.</span>
                <span className="font-mono text-neutral-800 font-medium flex-1">
                  <Editable
                    value={aboutMe.email}
                    onChange={(val) => setAboutMe((prev) => ({ ...prev, email: val }))}
                    inputClassName="font-mono text-xs max-w-[200px] py-0.5 px-1 bg-white/50"
                  />
                </span>
              </div>
              <div className="flex items-center gap-1">
                <a
                  href={`mailto:${aboutMe.email}`}
                  className="p-1.5 text-neutral-400 hover:text-pink-600 rounded-lg transition-colors"
                  title="이메일 보내기"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <button
                  onClick={() => handleCopy(aboutMe.email, "email")}
                  className="p-1.5 text-neutral-400 hover:text-pink-600 rounded-lg transition-colors"
                  title="이메일 복사하기"
                  id="btn-copy-email"
                >
                  {copiedText === "email" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
          {copiedText && (
            <p className="text-xs text-emerald-600 font-sans mt-2 text-right">
              복사되었습니다!
            </p>
          )}
        </div>

        {/* Education & Certificates */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
          {/* Education list with editing capabilities */}
          <div className="p-4 bg-stone-50/60 rounded-xl border border-stone-200/40 relative">
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-mono tracking-wider text-neutral-500 font-bold flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-pink-600" /> EDUCATION
              </h4>
              {isEditMode && (
                <button
                  onClick={addEducation}
                  className="p-1 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg transition-colors"
                  title="학력 추가"
                >
                  <Plus className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="space-y-3">
              {aboutMe.education.map((edu, idx) => (
                <div key={idx} className="space-y-1 relative group/edu pr-4">
                  <div className="absolute right-0 top-0 hidden group-hover/edu:flex">
                    {isEditMode && (
                      <button
                        onClick={() => deleteEducation(idx)}
                        className="text-red-500 hover:text-red-700 p-0.5"
                        title="삭제"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-neutral-800">
                    <Editable
                      value={edu.institution}
                      onChange={(val) => updateEducation(idx, "institution", val)}
                      inputClassName="text-[11px] py-0.5"
                    />
                  </p>
                  <p className="text-[11px] text-neutral-600 leading-tight">
                    <Editable
                      value={edu.major}
                      onChange={(val) => updateEducation(idx, "major", val)}
                      inputClassName="text-[10px] py-0.5"
                    />
                  </p>
                  <p className="text-[10px] font-mono text-neutral-400">
                    <Editable
                      value={edu.period}
                      onChange={(val) => updateEducation(idx, "period", val)}
                      inputClassName="text-[9px] py-0.5 font-mono"
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate list with editing capabilities */}
          <div className="p-4 bg-stone-50/60 rounded-xl border border-stone-200/40">
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="text-xs font-mono tracking-wider text-neutral-500 font-bold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-pink-600" /> CERTIFICATE
              </h4>
              {isEditMode && (
                <button
                  onClick={addCertificate}
                  className="p-1 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg transition-colors"
                  title="자격증/수상 추가"
                >
                  <Plus className="w-3 h-3" />
                </button>
              )}
            </div>
            <ul className="space-y-2 text-xs">
              {aboutMe.certificates.map((cert, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-neutral-700 leading-normal relative group/cert pr-4">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <Editable
                      value={cert}
                      onChange={(val) => updateCertificate(idx, val)}
                      inputClassName="text-[10px] py-0.5"
                    />
                  </div>
                  {isEditMode && (
                    <button
                      onClick={() => deleteCertificate(idx)}
                      className="absolute right-0 top-1 text-red-500 hover:text-red-700 p-0.5"
                      title="삭제"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Beautiful Keywords Display as tags */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-mono tracking-wider text-neutral-400 font-bold flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-pink-600" /> CORE KEYWORDS
            </h4>
            {isEditMode && (
              <button
                onClick={addKeyword}
                className="p-1 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg transition-colors text-[10px] flex items-center gap-0.5"
              >
                <Plus className="w-3 h-3" /> 태그 추가
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {aboutMe.keywords.map((keyword, idx) => (
              <div key={idx} className="relative group/kw flex items-center">
                <motion.span
                  whileHover={!isEditMode ? { scale: 1.05, backgroundColor: "#fbcfe8" } : undefined}
                  className="px-3 py-1.5 bg-pink-50 rounded-full text-xs font-sans font-medium text-pink-700 border border-pink-100/80 cursor-default transition-colors flex items-center gap-1"
                >
                  <span>#</span>
                  <Editable
                    value={keyword}
                    onChange={(val) => updateKeyword(idx, val)}
                    inputClassName="text-[10px] py-0 px-1 bg-white max-w-[80px]"
                  />
                </motion.span>
                {isEditMode && (
                  <button
                    onClick={() => deleteKeyword(idx)}
                    className="ml-1 text-red-500 hover:text-red-700"
                    title="태그 삭제"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
