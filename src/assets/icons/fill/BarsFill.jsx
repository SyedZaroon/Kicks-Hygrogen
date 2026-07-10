import React from "react";

const BarsFill = ({ 
  size = 20, 
  className = "" 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor" // Taake wrapper ke text color class ko automatic pick kar sake
      width={size}
      height={size}
      className={className}
    >
      {/* 3 Solid Rounded Bars */}
      <rect x="3" y="4" width="18" height="3" rx="1.5" />
      <rect x="3" y="11" width="18" height="3" rx="1.5" />
      <rect x="3" y="18" width="18" height="3" rx="1.5" />
    </svg>
  );
};

export default BarsFill;