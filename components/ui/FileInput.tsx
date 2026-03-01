"use client";

import * as React from "react";

type FileInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
  /** DaisyUI size: xs, sm, md, lg, xl. Default: md */
  inputSize?: "xs" | "sm" | "md" | "lg" | "xl";
  /** DaisyUI variant: ghost, neutral, primary, etc. */
  variant?: "ghost" | "neutral" | "primary" | "secondary" | "accent";
};

/**
 * DaisyUI-styled file input. Use for all file uploads.
 * @see https://daisyui.com/components/file-input/
 */
export function FileInput({
  inputSize = "md",
  variant = "neutral",
  className = "",
  id,
  ...props
}: FileInputProps) {
  const sizeClass = inputSize === "md" ? "" : `file-input-${inputSize}`;
  const variantClass = `file-input-${variant}`;

  return (
    <input
      type="file"
      id={id}
      className={`file-input ${variantClass} ${sizeClass} ${className}`.trim()}
      {...props}
    />
  );
}
