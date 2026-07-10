import React from "react";

const SearchFill = ({ 
  size = 20, 
  className = "" 
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor" 
      width={size}
      height={size}
      className={className}
    >
      <path d="M10 2a8 8 0 1 0 5.29 14.12l4.29 4.3a1 1 0 0 0 1.42-1.42l-4.3-4.29A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z" />
    </svg>
  );
}; 
export default SearchFill;