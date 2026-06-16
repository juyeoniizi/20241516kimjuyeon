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
  showImages: boolean;
  setShowImages: (val: boolean) => void;
  aboutMe: typeof ABOUT_ME;
  setAboutMe: React.Dispatch<React.SetStateAction<typeof ABOUT_ME>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  archiveItems: typeof ARCHIVE_ITEMS;
  setArchiveItems: React.Dispatch<React.SetStateAction<typeof ARCHIVE_ITEMS>>;
  skillsList: SkillItem[];
  setSkillsList: React.Dispatch<React.SetStateAction<SkillItem[]>>;
  profileImage: string;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
  resetToDefault: () => void;
  updateProjectImage: (projectId: string, base64Image: string) => void;
  updateArchiveImage: (index: number, base64Image: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showImages, setShowImages] = useState<boolean>(true);
  const [aboutMe, setAboutMe] = useState<typeof ABOUT_ME>(ABOUT_ME);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [archiveItems, setArchiveItems] = useState<typeof ARCHIVE_ITEMS>(ARCHIVE_ITEMS);
  const [skillsList, setSkillsList] = useState<SkillItem[]>(DEFAULT_SKILL_ITEMS);
  const [profileImage, setProfileImage] = useState<string>(ABOUT_ME.portrait);

  // Load from local storage on mount
  useEffect(() => {
    const savedAbout = safeStorage.getItem("juyeon_about_me");
    const savedProjects = safeStorage.getItem("juyeon_projects");
    const savedArchive = safeStorage.getItem("juyeon_archive_items");
    const savedSkills = safeStorage.getItem("juyeon_skills_list");
    const savedProfile = safeStorage.getItem("juyeon_profile_image");

    if (savedAbout) {
      try { 
        const parsed = JSON.parse(savedAbout);
        // Discard development source paths in local storage or empty portrait values
        if (!parsed.portrait || parsed.portrait.startsWith("/src/") || parsed.portrait.includes("src/assets/images")) {
          parsed.portrait = ABOUT_ME.portrait;
        }
        setAboutMe(parsed); 
      } catch (e) { console.error(e); }
    }
    if (savedProfile && savedProfile.startsWith("data:image/")) {
      setProfileImage(savedProfile);
    } else {
      setProfileImage(ABOUT_ME.portrait);
    }
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        if (Array.isArray(parsed)) {
          const merged = parsed.map((item: any) => {
            const defaultProj = PROJECTS.find((p) => p.id === item.id);
            if (defaultProj) {
              const hasCustomImage = item.image && item.image.startsWith("data:image/");
              const isSourcePath = item.image && (item.image.startsWith("/src/") || item.image.includes("src/assets/images"));
              return {
                ...item,
                image: (hasCustomImage && !isSourcePath) ? item.image : defaultProj.image,
              };
            }
            return item;
          });
          setProjects(merged);
        }
      } catch (e) { console.error(e); }
    }
    if (savedArchive) {
      try {
        const parsed = JSON.parse(savedArchive);
        if (Array.isArray(parsed)) {
          const merged = parsed.map((item: any, idx: number) => {
            const defaultItem = ARCHIVE_ITEMS[idx];
            if (defaultItem) {
              const hasCustomImage = item.image && item.image.startsWith("data:image/");
              const isSourcePath = item.image && (item.image.startsWith("/src/") || item.image.includes("src/assets/images"));
              return {
                ...item,
                image: (hasCustomImage && !isSourcePath) ? item.image : defaultItem.image,
              };
            }
            return item;
          });
          setArchiveItems(merged);
        }
      } catch (e) { console.error(e); }
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

  useEffect(() => {
    if (profileImage && profileImage.startsWith("data:image/")) {
      safeStorage.setItem("juyeon_profile_image", profileImage);
    } else {
      safeStorage.removeItem("juyeon_profile_image");
    }
  }, [profileImage]);

  const resetToDefault = () => {
    safeStorage.removeItem("juyeon_about_me");
    safeStorage.removeItem("juyeon_projects");
    safeStorage.removeItem("juyeon_archive_items");
    safeStorage.removeItem("juyeon_skills_list");
    safeStorage.removeItem("juyeon_profile_image");
    
    setAboutMe(ABOUT_ME);
    setProjects(PROJECTS);
    setArchiveItems(ARCHIVE_ITEMS);
    setSkillsList(DEFAULT_SKILL_ITEMS);
    setProfileImage(ABOUT_ME.portrait);
    setShowImages(true);
    setIsEditMode(false);
    window.location.reload();
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
        showImages,
        setShowImages,
        aboutMe,
        setAboutMe,
        projects,
        setProjects,
        archiveItems,
        setArchiveItems,
        skillsList,
        setSkillsList,
        profileImage,
        setProfileImage,
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
