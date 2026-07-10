import React from "react";

const UserFill = ({ 
  size = 20, 
  className = "" 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor" // Taake parent component ki text-color class ko auto-pick kar sake
      width={size}
      height={size}
      className={className}
    >
      {/* Head / Circle */}
      <circle cx="12" cy="8" r="4" />
      {/* Body / Torso */}
      <path d="M20 19v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1a7 7 0 0 1 7-7h2a7 7 0 0 1 7 7Z" />
    </svg>
  );
};

export default UserFill;