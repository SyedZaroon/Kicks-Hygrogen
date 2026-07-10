import React from "react";

const variantClasses = {
  primary: "bg-(--color-neutrals-gray-1) text-(--color-neutrals-gray-9)",
  secondary: "bg-(--color-neutrals-gray-9) text-(--color-neutrals-gray-1)"
};

const Badge = ({ variant = "primary", text = "Badge" }) => {
  return (
    <div
      data-variant={variant}
      className={`w-fit px-3 py-1 text-sm rounded-full ${variantClasses[variant]}`}
    >
      <p>{text}</p>
    </div>
  );
};

export default Badge;