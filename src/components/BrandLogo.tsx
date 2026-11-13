import React from 'react';

interface BrandLogoProps {
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => {
  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="1"
          y="1"
          width="26"
          height="26"
          rx="6"
          fill="#12141A"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.25"
        />
        <path
          d="M9 8V20M9 14L18.5 8M13 11.5L19 20"
          stroke="#F59E0B"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-[#F4F4F5]">
        კადენცია
      </span>
    </span>
  );
};
