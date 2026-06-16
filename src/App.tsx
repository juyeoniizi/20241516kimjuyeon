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
import { safeStorage } from "./utils/storage";

function AppContent() {
  const { 
    isEditMode, 
    setIsEditMode, 
    resetToDefault, 
    aboutMe, 
    projects, 
    archiveItems, 
    skillsList, 
    profileImage, 
    setProfileImage, 
    setProjects, 
    setArchiveItems 
  } = usePortfolio();

  // Custom dialog states to bypass standard browser alert/confirms in iframe sandbox
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
  } | null>(null);

  const [alertDialog, setAlertDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    isSuccess?: boolean;
    isSaving?: boolean;
  } | null>(null);

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
            <>
              {/* Sync edits to server */}
              <button
                onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: "영구 데이터 동기화",
                    message: "현재 브라우저에 임시 반영된 모든 텍스트와 고용량 첨부 이미지를 프로젝트 코드 파일(src/data.ts와 src/assets/images/)에 영구적으로 동기화하시겠습니까? 이 작업을 마치면 깃허브 배포 및 다운로드 시 완벽하게 저장됩니다.",
                    confirmText: "동기화 및 저장",
                    cancelText: "취소",
                    onConfirm: async () => {
                      setAlertDialog({
                        isOpen: true,
                        title: "영구 저장 중...",
                        message: "이미지와 데이터를 로컬 서버 소스코드에 적용하고 수정된 세션을 정리하고 있습니다. 잠시만 기다려 주세요.",
                        isSaving: true,
                      });
                      try {
                        const body = {
                          aboutMe,
                          projects,
                          archiveItems,
                          skillsList,
                          profileImage: profileImage.startsWith("data:image/") ? profileImage : null,
                        };
                        
                        const response = await fetch("/api/save-portfolio", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(body),
                        });
                        
                        const data = await response.json();
                        if (data.status === "success") {
                          safeStorage.removeItem("juyeon_profile_image");
                          localStorage.removeItem("juyeon_profile_image");
                          setProfileImage(aboutMe.portrait);
                          
                          try {
                            const savedProjs = safeStorage.getItem("juyeon_projects");
                            if (savedProjs) {
                              const parsed = JSON.parse(savedProjs);
                              if (Array.isArray(parsed)) {
                                const cleaned = parsed.map((item: any) => {
                                  if (item.image && item.image.startsWith("data:image/")) {
                                    const { image, ...rest } = item;
                                    return rest;
                                  }
                                  return item;
                                });
                                safeStorage.setItem("juyeon_projects", JSON.stringify(cleaned));
                                localStorage.setItem("juyeon_projects", JSON.stringify(cleaned));
                                setProjects((prev) => 
                                  prev.map((p) => {
                                    const target = cleaned.find((c: any) => c.id === p.id);
                                    if (target) {
                                      const { image, ...rest } = target;
                                      return { ...p, ...rest };
                                    }
                                    return p;
                                  })
                                );
                              }
                            }
                          } catch (e) {
                            console.error("Error cleaning saved projects safeStorage:", e);
                          }

                          try {
                            const savedArchive = safeStorage.getItem("juyeon_archive_items");
                            if (savedArchive) {
                              const parsed = JSON.parse(savedArchive);
                              if (Array.isArray(parsed)) {
                                const cleaned = parsed.map((item: any) => {
                                  if (item.image && item.image.startsWith("data:image/")) {
                                    const { image, ...rest } = item;
                                    return rest;
                                  }
                                  return item;
                                });
                                safeStorage.setItem("juyeon_archive_items", JSON.stringify(cleaned));
                                localStorage.setItem("juyeon_archive_items", JSON.stringify(cleaned));
                                setArchiveItems((prev) => 
                                  prev.map((item, idx) => {
                                    const target = cleaned[idx];
                                    if (target) {
                                      const { image, ...rest } = target;
                                      return { ...item, ...rest };
                                    }
                                    return item;
                                  })
                                );
                              }
                            }
                          } catch (e) {
                            console.error("Error cleaning saved archive safeStorage:", e);
                          }

                          setAlertDialog({
                            isOpen: true,
                            title: "영구 동기화 성공",
                            message: data.message,
                            isSuccess: true,
                          });
                        } else {
                          setAlertDialog({
                            isOpen: true,
                            title: "저장 실패",
                            message: data.message,
                            isSuccess: false,
                          });
                        }
                      } catch (err: any) {
                        setAlertDialog({
                          isOpen: true,
                          title: "통신 오류",
                          message: "서버 통신 중 오류가 발생했습니다: " + err.message,
                          isSuccess: false,
                        });
                      }
                    }
                  });
                }}
                className="flex items-center gap-1 py-1.5 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-semibold shadow-xs transition-all duration-300 pointer-events-auto"
                title="브라우저 임시 편집 데이터를 영구히 서버 코드로 내보내기합니다"
              >
                <Settings className="w-3 h-3" />
                <span>영구 코드 저장</span>
              </button>

              <button
                onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title: "전체 데이터 초기화",
                    message: "정말로 모든 수정된 텍스트와 이미지를 기본값으로 초기화하시겠습니까? (이 작업은 되돌릴 수 없습니다)",
                    confirmText: "초기화 진행",
                    cancelText: "취소",
                    onConfirm: () => {
                      resetToDefault();
                    }
                  });
                }}
                className="flex items-center gap-1 py-1.5 px-3 bg-white hover:bg-red-50 text-red-600 rounded-full text-xs font-medium border border-red-100 shadow-2xs transition-all duration-300 pointer-events-auto"
                title="모든 글과 이미지를 전시장 기본값으로 되돌립니다"
              >
                <RefreshCw className="w-3 h-3" />
                <span>초기화</span>
              </button>
            </>
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

      {/* Custom Confirmation Modal */}
      {confirmDialog && confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]">
          <div className="bg-[#fcfaf9] border border-pink-100 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl select-none">
            <h3 className="text-lg font-serif font-black tracking-wide text-neutral-800 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-600" />
              {confirmDialog.title}
            </h3>
            <p className="text-sm text-[#4c3a3a] leading-relaxed font-sans mb-6 whitespace-pre-line">
              {confirmDialog.message}
            </p>
            <div className="flex items-center justify-end gap-3 font-sans">
              <button
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold rounded-full transition-colors cursor-pointer"
              >
                {confirmDialog.cancelText || "취소"}
              </button>
              <button
                onClick={() => {
                  const onConfirmCb = confirmDialog.onConfirm;
                  setConfirmDialog(null);
                  onConfirmCb();
                }}
                className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
              >
                {confirmDialog.confirmText || "확인"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Alert/Progress Modal */}
      {alertDialog && alertDialog.isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-[9999]">
          <div className="bg-[#fcfaf9] border border-pink-100 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl text-center select-none">
            {alertDialog.isSaving ? (
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-10 h-10 border-4 border-pink-600 border-t-transparent rounded-full animate-spin" />
                <h3 className="text-lg font-serif font-black tracking-wide text-neutral-800">
                  {alertDialog.title}
                </h3>
                <p className="text-xs text-neutral-500 font-sans">
                  {alertDialog.message}
                </p>
              </div>
            ) : (
              <div>
                <div className="inline-flex p-3 bg-pink-100 text-pink-600 rounded-full mb-4">
                  {alertDialog.isSuccess ? (
                    <Sparkles className="w-6 h-6" />
                  ) : (
                    <HelpCircle className="w-6 h-6" />
                  )}
                </div>
                <h3 className="text-lg font-serif font-black tracking-wide text-neutral-800 mb-2">
                  {alertDialog.title}
                </h3>
                <p className="text-xs text-[#4c3a3a] font-sans leading-relaxed mb-6 whitespace-pre-line">
                  {alertDialog.message}
                </p>
                <button
                  onClick={() => {
                    const reloadNeeded = alertDialog.isSuccess;
                    setAlertDialog(null);
                    if (reloadNeeded) {
                      window.location.reload();
                    }
                  }}
                  className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-semibold rounded-full shadow-xs transition-colors w-full font-sans cursor-pointer"
                >
                  확인
                </button>
              </div>
            )}
          </div>
        </div>
      )}
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

