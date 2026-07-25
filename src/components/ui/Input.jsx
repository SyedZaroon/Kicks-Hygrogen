import React, { useId } from "react";

const Input = ({
  type = "text",
  label,
  helperText,
  placholder,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  helperIcon: HelperIcon,
  leftIconProps,
  rightIconProps,
  helperIconProps,
  className,
  placholderClasses
}) => {
  const id = useId();

  return (
    <>
      <div className="flex flex-col w-full">
        {label && (
          <label className="mb-2 text-(--color-neutrals-gray-10)" htmlFor={id}>
            {label}
          </label>
        )}

        <div className={`border border-(--color-darkgray) rounded-lg py-2.5 px-4 flex justify-between items-center ${className}`}>
          
          <div className="flex items-center gap-2 flex-1">
            {LeftIcon && <LeftIcon {...leftIconProps} />}
            <input
              className={`appearance-none outline-none border-none bg-transparent focus:ring-0 flex-1 w-full ${placholderClasses}`}
              id={id}
              type={type}
              placeholder={placholder}
            />
          </div>

          <div className="flex items-center gap-2">
            {RightIcon && <RightIcon {...rightIconProps} />}
            {HelperIcon && <HelperIcon {...helperIconProps} />}
          </div>

        </div>

        {helperText && (
          <p className="mt-1 text-(--color-neutrals-gray-9)">
            {helperText}
          </p>
        )}
      </div>
    </>
  );
};

export default Input;