import React from "react";

const Button = ({
  variant = "fill",
  size = "small",
  disabled = false,
  className = "",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  onClick,
  iconClass = "",
  iconSize = 16,
  type = "button",
  iconColor = "#232321",
}) => {
  const variantClasses = {
    fill: "bg-(--color-darkgray) text-white border-1 hover:outline hover:outline-(--color-darkgray)",
    outline:
      "border border-(--color-darkgray) text-(--color-darkgray) hover:outline hover:outline-(--color-darkgray)",
    text: "bg-transparent text-(--color-darkgray) hover:text-(--color-neutrals-gray-10)",
  };

  // Size classes
  const sizeClasses = {
    small: "py-2 px-4 text-sm",
    medium: "px-4 py-3 text-base",
    large: "px-4 py-4 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        flex items-center gap-1 rounded-lg 
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabled && variant === "fill" ? "bg-(--color-neutrals-gray-2) cursor-not-allowed text-(--color-neutrals-gray-5) hover:outline-0 border-(--color-neutrals-gray-2)" : ""}
        ${disabled && variant === "outline" ? "cursor-not-allowed text-(--color-neutrals-gray-5) hover:outline-0 border-(--color-neutrals-gray-2)" : ""}
        ${disabled && variant === "text" ? "cursor-not-allowed text-(--color-neutrals-gray-5) hover:text-(--color-neutrals-gray-5)!" : ""}
        ${className}
      `}
    >
      {/* Left Icon if available */}
      {LeftIcon && (
        <LeftIcon iconColor={iconColor} className={iconClass} size={iconSize} />
      )}

      {children}

      {/* Right Icon if available */}
      {RightIcon && (
        <RightIcon
          iconColor={iconColor}
          className={iconClass}
          size={iconSize}
        />
      )}
    </button>
  );
};

export default Button;