import React from "react";

const variantClasses = {
  fill: "bg-(--color-darkgray) rounded-lg hover:outline hover:outline-(--color-darkgray) hover:outline-offset-1 ",
  outline: "border border-(--color-darkgray) color-(--color-darkgray) rounded-lg hover:outline hover:outline-(--color-darkgray) text-black",
  text: "p-0! text-black"
};

const sizeClasses = {
  small: "p-2",
  medium: "p-3",
  large: "p-4"
};

const Icon = ({
  variant = "fill",
  size = "small",
  onClick,
  children,
  disabled = false,
  className
}) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined} // Disabled hone par click event block karne ke liye
      className={`
        inline-flex items-center justify-center
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${disabled && variant === "fill" ? "bg-(--color-neutrals-gray-2) cursor-not-allowed text-(--color-neutrals-gray-5) hover:outline-0 border-(--color-neutrals-gray-2)" : ""}
        ${disabled && variant === "text" ? "text-(--color-neutrals-gray-5)! cursor-not-allowed" : ""}
        ${disabled && variant === "outline" ? "text-(--color-neutrals-gray-5)! cursor-not-allowed border-(--color-neutrals-gray-5) hover:outline-0" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Icon;