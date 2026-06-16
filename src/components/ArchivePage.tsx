/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search, ZoomIn, Film, Image as ImageIcon, Sparkles, Camera, Plus, Trash2 } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import Editable from "./Editable";

interface ArchiveItem {
  title: string;
  category: string;
  image: string;
  desc: string;
}

export default function ArchivePage() {
  const { isEditMode, archiveItems, setArchiveItems, updateArchiveImage, showImages } = usePortfolio();
  const [activeItem, setActiveItem] = useState<ArchiveItem | null>(null);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const handleTextChange = (index: number, key: keyof ArchiveItem, val: string) => {
    setArchiveItems((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [key]: val } : item))
    );
  };

  const handleAddArchiveItem = () => {
    setArchiveItems((prev) => [
      ...prev,
      {
        title: "새로운 아카이브 프로젝트",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
        desc: "작품의 감각적인 기획 컨셉과 실행 상세에 대한 핵심 소구점을 서술해 주세요."
      }
    ]);
  };

  const handleDeleteArchiveItem = (index: number) => {
    setArchiveItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const triggerImageUpload = (index: number) => {
    document.getElementById(`archive-img-upload-${index}`)?.click();
  };

  return (
    <div className="w-full flex flex-col p-2 sm:p-4 text-neutral-800 space-y-6 select-none relative">
      {/* Chapter 10 Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-mono tracking-widest text-pink-600/90 font-bold mb-1">CHAPTER 10 / MINI GALLERY</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            Creative Archive <span className="text-lg font-sans font-medium text-neutral-400">아카이브 갤러리</span>
          </h2>
          <p className="text-sm font-sans text-neutral-500 mt-2 max-w-xl">
            포스터 디자인, 브랜드 캐릭터 IP 시뮬레이션, 실제 오프라인 영화제 전람대 정렬까지 창작 발상과 비주얼 실증의 성과물 아카이브입니다.
          </p>
        </div>

        {isEditMode && (
          <button
            onClick={handleAddArchiveItem}
            className="self-start sm:self-end px-3.5 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 font-sans font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-xs border border-pink-200/40"
          >
            <Plus className="w-4 h-4" /> 아카이브 추가
          </button>
        )}
      </div>

      <p className="text-xs text-neutral-400 mb-2">이미지를 탭하거나 클릭하시면 정교한 고해상도 에디토리얼 무드로 확장됩니다.</p>

      {/* Gallery Wall Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {archiveItems.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={!isEditMode ? { y: -8 } : undefined}
            onClick={() => {
              if (!isEditMode) {
                setActiveItem(item);
              }
            }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200/50 bg-white p-2 shadow-sm hover:shadow-lg transition-all duration-300"
            id={`gallery-item-${idx}`}
          >
            {/* Aspect image frame */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-50">
              {!showImages || failedImages[idx] ? (
                <div className={`w-full h-full p-4 flex flex-col justify-between select-none text-left bg-gradient-to-tr ${
                  item.category.toLowerCase().includes("poster")
                    ? "from-purple-100 via-pink-50 to-rose-50"
                    : item.category.toLowerCase().includes("ui")
                    ? "from-indigo-100 via-sky-50 to-blue-50"
                    : item.category.toLowerCase().includes("vmd")
                    ? "from-amber-100 via-yellow-50 to-orange-50"
                    : item.category.toLowerCase().includes("character")
                    ? "from-pink-100 via-rose-50 to-purple-50"
                    : item.category.toLowerCase().includes("packaging")
                    ? "from-teal-100 via-emerald-50 to-cyan-50"
                    : "from-stone-100 via-zinc-50 to-neutral-50"
                }`}>
                  <div className="flex justify-between items-center text-[7px] font-mono tracking-widest text-[#5c4a4a] opacity-80 border-b border-[#5c4a4a]/10 pb-1">
                    <span>EDIT. GALLERY</span>
                    <span>No.{(idx + 1).toString().padStart(2, '0')}</span>
                  </div>
                  <div className="my-auto py-2">
                    <h5 className="text-[10px] sm:text-xs font-serif font-bold tracking-tight text-neutral-800 line-clamp-2 leading-snug">
                      {item.title}
                    </h5>
                  </div>
                  <div className="text-[7px] font-mono tracking-wider opacity-65 text-right">
                    TEXT ART MODE
                  </div>
                </div>
              ) : (
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  onError={() => setFailedImages(prev => ({ ...prev, [idx]: true }))}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}
              
              {/* Blur color layer */}
              {!isEditMode ? (
                <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white scale-90 group-hover:scale-100 transition-transform duration-300" />
                </div>
              ) : (
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerImageUpload(idx);
                  }}
                  className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-white gap-2"
                >
                  <Camera className="w-6 h-6 text-pink-300" />
                  <span className="text-[11px] font-sans font-medium">아카이브 사진 변경 (클릭)</span>
                </div>
              )}
              
              <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest text-pink-700 font-bold shadow-xs z-10">
                <Editable
                  value={item.category}
                  onChange={(val) => handleTextChange(idx, "category", val)}
                  inputClassName="text-[8px] py-0 px-1 font-mono max-w-[70px] bg-white text-pink-700"
                />
              </div>

              {isEditMode && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteArchiveItem(idx);
                  }}
                  className="absolute top-2.5 right-2.5 bg-red-600/90 hover:bg-red-700 text-white p-1.5 rounded-full z-10 transition-colors shadow-xs"
                  title="아카이브 삭제"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Information panel with hover animation */}
            <div className="p-3">
              <h4 className="text-xs sm:text-sm font-sans font-bold text-neutral-800 group-hover:text-pink-700 transition-colors">
                <Editable
                  value={item.title}
                  onChange={(val) => handleTextChange(idx, "title", val)}
                  inputClassName="text-xs font-bold leading-tight"
                />
              </h4>
              <div className="text-[11px] text-neutral-400 font-sans mt-1">
                <Editable
                  value={item.desc}
                  onChange={(val) => handleTextChange(idx, "desc", val)}
                  type="textarea"
                  inputClassName="text-[10px] bg-white"
                />
              </div>
            </div>

            {/* Hidden Input File Receiver for each card item */}
            <input
              type="file"
              id={`archive-img-upload-${idx}`}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const res = event.target?.result as string;
                    if (res) {
                      updateArchiveImage(idx, res);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Immersive Modal Zoom In */}
      <AnimatePresence>
        {activeItem && !isEditMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-2xl border border-white/10 shadow-2xl relative"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2.5 bg-neutral-900/80 hover:bg-neutral-800 text-white rounded-full transition-colors z-10"
                id="btn-close-gallery-modal"
              >
                <X className="w-5 h-5" />
              </button>

              {(() => {
                const idx = archiveItems.findIndex(i => i.title === activeItem.title);
                return !showImages || (idx !== -1 && failedImages[idx]) ? (
                  <div className={`relative aspect-[16/10] p-8 flex flex-col justify-between bg-gradient-to-tr ${
                    activeItem.category.toLowerCase().includes("poster")
                      ? "from-purple-100 via-pink-50 to-rose-50"
                      : activeItem.category.toLowerCase().includes("ui")
                      ? "from-indigo-100 via-sky-50 to-blue-50"
                      : activeItem.category.toLowerCase().includes("vmd")
                      ? "from-amber-100 via-yellow-50 to-orange-50"
                      : activeItem.category.toLowerCase().includes("character")
                      ? "from-pink-100 via-rose-50 to-purple-50"
                      : activeItem.category.toLowerCase().includes("packaging")
                      ? "from-teal-100 via-emerald-50 to-cyan-50"
                      : "from-stone-100 via-zinc-50 to-neutral-50"
                  }`}>
                    <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-[#5c4a4a] opacity-80 border-b border-[#5c4a4a]/10 pb-1.5">
                      <span>EDIT. GALLERY DETAIL</span>
                      <span>No.{idx !== -1 ? (idx + 1).toString().padStart(2, '0') : "00"}</span>
                    </div>
                    <div className="my-auto py-6">
                      <h5 className="text-base sm:text-lg font-serif font-bold tracking-tight text-neutral-800 leading-snug">
                        {activeItem.title}
                      </h5>
                    </div>
                    <div className="text-[9px] font-mono tracking-wider opacity-65 text-right">
                      TEXT ART MODE
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-[16/10] bg-neutral-100">
                    <img
                      src={activeItem.image}
                      alt={activeItem.title}
                      referrerPolicy="no-referrer"
                      onError={() => {
                        if (idx !== -1) {
                          setFailedImages(prev => ({ ...prev, [idx]: true }));
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })()}

              <div className="p-6 md:p-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-pink-50 text-pink-700 text-[10px] font-mono font-bold tracking-widest rounded-full border border-pink-100">
                    {activeItem.category}
                  </span>
                  <span className="text-xs text-neutral-400 font-sans">에디토리얼 수집본</span>
                </div>
                
                <h3 className="text-lg md:text-xl font-serif font-bold text-neutral-900">
                  {activeItem.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans">
                  {activeItem.desc}
                </p>

                <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-[11px] text-pink-600 font-sans font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>김주연 크레이이터 전략과 연계 수립된 실제 포트폴리오 에셋</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
