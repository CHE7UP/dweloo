import React from 'react';

interface CTAButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  onClick, 
  className, 
  children, 
  disabled = false 
}) => {
  return (
    <button
      className={`
        py-3 px-4 
        inline-flex justify-center items-center gap-x-2 
        text-md font-bold rounded-lg 
        bg-[#1273EB] text-white 
        hover:bg-[#0F5ED6] 
        active:bg-[#0D47A1] active:scale-95 
        transition-all duration-200 
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
        disabled:opacity-50 disabled:pointer-events-none 
        cursor-pointer
        w-full sm:w-auto max-w-[360px]
        ${className || ''}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CTAButton;