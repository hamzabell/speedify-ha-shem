import React from 'react';

export const SpeedifyLogo = ({ className = "h-8 w-auto" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="45" fill="var(--speedify-green)" />
      <path 
        d="M30 50L45 65L70 35" 
        stroke="var(--speedify-lime)" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};
