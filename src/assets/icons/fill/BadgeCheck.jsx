import React from 'react'

const BadgeCheck = ({
    iconColor = "",
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
          d="M21 12C21 7.03125 16.9688 3 12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12Z"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M16.5 8.25L10.2 15.75L7.5 12.75"
          stroke={iconColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
}

export default BadgeCheck