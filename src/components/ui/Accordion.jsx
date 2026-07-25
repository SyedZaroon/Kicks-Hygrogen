import React, { useState, useRef } from 'react';

export default function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left font-semibold text-lg py-2 focus:outline-none group bg-white rounded-lg p-3 "
      >
        <span className="  text-gray-900 group-hover:text-black transition-colors">
          {title}
        </span>
        <span className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px',
        }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div className="p-3 text-gray-600 text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}