/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { Project, SkillItem } from "../types";
import { ABOUT_ME, PROJECTS, ARCHIVE_ITEMS, DEFAULT_SKILL_ITEMS } from "../data";
import { safeStorage } from "../utils/storage";

interface PortfolioContextType {
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  aboutMe: typeof ABOUT_ME;
  setAboutMe: React.Dispatch<React.SetStateAction<typeof ABOUT_ME>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  archiveItems: typeof ARCHIVE_ITEMS;
  setArchiveItems: React.Dispatch<React.SetStateAction<typeof ARCHIVE_ITEMS>>;
  skillsList: SkillItem[];
  setSkillsList: React.Dispatch<React.SetStateAction<SkillItem[]>>;
  resetToDefault: () => void;
  updateProjectImage: (projectId: string, base64Image: string) => void;
  updateArchiveImage: (index: number, base64Image: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [aboutMe, setAboutMe] = useState<typeof ABOUT_ME>(ABOUT_ME);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [archiveItems, setArchiveItems] = useState<typeof ARCHIVE_ITEMS>(ARCHIVE_ITEMS);
  const [skillsList, setSkillsList] = useState<SkillItem[]>(DEFAULT_SKILL_ITEMS);

  // Load from local storage on mount
  useEffect(() => {
    const savedAbout = safeStorage.getItem("juyeon_about_me");
    const savedProjects = safeStorage.getItem("juyeon_projects");
    const savedArchive = safeStorage.getItem("juyeon_archive_items");
    const savedSkills = safeStorage.getItem("juyeon_skills_list");

    if (savedAbout) {
      try { setAboutMe(JSON.parse(savedAbout)); } catch (e) { console.error(e); }
    }
    if (savedProjects) {
      try { setProjects(JSON.parse(savedProjects)); } catch (e) { console.error(e); }
    }
    if (savedArchive) {
      try { setArchiveItems(JSON.parse(savedArchive)); } catch (e) { console.error(e); }
    }
    if (savedSkills) {
      try { setSkillsList(JSON.parse(savedSkills)); } catch (e) { console.error(e); }
    }
  }, []);

  // Save to local storage on edits
  useEffect(() => {
    safeStorage.setItem("juyeon_about_me", JSON.stringify(aboutMe));
  }, [aboutMe]);

  useEffect(() => {
    safeStorage.setItem("juyeon_projects", JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    safeStorage.setItem("juyeon_archive_items", JSON.stringify(archiveItems));
  }, [archiveItems]);

  useEffect(() => {
    safeStorage.setItem("juyeon_skills_list", JSON.stringify(skillsList));
  }, [skillsList]);

  const resetToDefault = () => {
    if (window.confirm("정말로 모든 수정된 텍스트와 이미지를 기본값으로 초기화하시겠습니까? (이 작업은 되돌릴 수 없습니다)")) {
      safeStorage.removeItem("juyeon_about_me");
      safeStorage.removeItem("juyeon_projects");
      safeStorage.removeItem("juyeon_archive_items");
      safeStorage.removeItem("juyeon_skills_list");
      safeStorage.removeItem("juyeon_profile_image");
      
      setAboutMe(ABOUT_ME);
      setProjects(PROJECTS);
      setArchiveItems(ARCHIVE_ITEMS);
      setSkillsList(DEFAULT_SKILL_ITEMS);
      setIsEditMode(false);
      window.location.reload();
    }
  };

  const updateProjectImage = (projectId: string, base64Image: string) => {
    setProjects((prev) =>
      prev.map((proj) => (proj.id === projectId ? { ...proj, image: base64Image } : proj))
    );
  };

  const updateArchiveImage = (index: number, base64Image: string) => {
    setArchiveItems((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, image: base64Image } : item))
    );
  };

  return (
    <PortfolioContext.Provider
      value={{
        isEditMode,
        setIsEditMode,
        aboutMe,
        setAboutMe,
        projects,
        setProjects,
        archiveItems,
        setArchiveItems,
        skillsList,
        setSkillsList,
        resetToDefault,
        updateProjectImage,
        updateArchiveImage,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
