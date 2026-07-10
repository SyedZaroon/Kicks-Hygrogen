import React from 'react'

const ArrowLeft = ({
    size = 24,
    iconColor = "#232321",
}) => {
  return (
    <>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.4375 18.75L4.6875 12L11.4375 5.25M5.625 12H19.3125"
          stroke={iconColor}
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </>
  );
}

export default ArrowLeft
