import React from "react";
import Tick from "../../assets/icons/outline/Tick.jsx";

const sizeClasses = {
  small: "w-6 h-6",
  medium: "",
  large: ""
};

const CheckBox = ({ size = "small", label }) => {
  return (
    <>
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input type="checkbox" className="peer group sr-only" />
        
        <div
          className={`
            ${sizeClasses[size]} rounded-xs border border-(--color-darkgray)
            flex items-center justify-center
            transition-all duration-200
            peer-checked:bg-(--color-darkgray)
            peer-checked:border-(--color-darkgray)
            peer-focus:ring-2 peer-focus:ring-(--color-graymain)
          `}
        >
          <div className="text-white w-5 h-5 flex items-center justify-center">
            <Tick color="#fff" />
          </div>
        </div>

        <span className="text-gray-700 font-medium">{label}</span>
      </label>
    </>
  );
};

export default CheckBox;