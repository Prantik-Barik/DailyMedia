import React from 'react';

const HoverUnderline = ({ children, className = 'bg-green-500' }) => {
  return (
    <div className="group">
      {children}
      <div
        className={`h-1 w-0 group-hover:w-full transition-all ${className} mt-2`}
      ></div>
    </div>
  );
};

export default HoverUnderline;