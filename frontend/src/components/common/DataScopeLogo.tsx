import React from "react";

interface DataScopeLogoProps {
  className?: string;
  size?: number | string;
  fill?: string;
}

/**
 * DataScope Enterprise Geometric "D" Monogram Logo
 * Perfectly vectorised from brand specifications
 */
export default function DataScopeLogo({
  className = "w-5 h-5",
  size,
  fill = "currentColor",
}: DataScopeLogoProps) {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      fill="none"
      className={className}
      style={style}
      aria-label="DataScope Logo"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0 H300 L400 100 V300 L300 400 H100 V300 H0 V0 Z M100 100 H300 V200 L200 300 H100 V100 Z"
        fill={fill}
      />
    </svg>
  );
}
