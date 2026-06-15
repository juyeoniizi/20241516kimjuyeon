/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  actNumber: string;
  title: string;
  duration: string;
  role: string;
  summary: string;
  keyInsight: string;
  problem: string;
  rolesDetail: string;
  process: string;
  implementation: string;
  result: string;
  image?: string;
  bgColor?: string;
  textColor?: string;
}

export interface CareerExperience {
  period: string;
  role: string;
  title: string;
  description: string;
  company: string;
}

export interface SkillItem {
  name: string;
  level: string;
  percent: number;
  description: string;
  category: "design" | "office" | "strategy";
}

export type BookPageId =
  | "cover"
  | "about"
  | "career"
  | "act01"
  | "act02"
  | "act03"
  | "act04"
  | "act05"
  | "act06"
  | "skills"
  | "archive"
  | "epilogue";
