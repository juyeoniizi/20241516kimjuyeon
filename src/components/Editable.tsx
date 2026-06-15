/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React from "react";
import { usePortfolio } from "../context/PortfolioContext";

interface EditableProps {
  value: string;
  onChange: (val: string) => void;
  type?: "text" | "textarea";
  className?: string;
  inputClassName?: string;
  placeholder?: string;
}

export default function Editable({
  value,
  onChange,
  type = "text",
  className = "",
  inputClassName = "",
  placeholder = "",
}: EditableProps) {
  const { isEditMode } = usePortfolio();

  if (!isEditMode) {
    // Render the styled normal text
    return <span className={className}>{value || placeholder}</span>;
  }

  if (type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-pink-50/80 border border-pink-300 rounded-md px-2.5 py-1.5 duration-200 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-pink-400 font-sans resize-y ${inputClassName}`}
        rows={3}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-pink-50/80 border border-pink-300 rounded-md px-2.5 py-1.5 duration-200 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-pink-400 font-sans ${inputClassName}`}
    />
  );
}
