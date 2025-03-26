'use client';

import React, { useState, useRef } from 'react';

interface AnimatedHamburgerButtonProps {
  /**
   * The ID for the button (required for hs-collapse)
   */
  id?: string;
  /**
   * The ID of the element to collapse/expand
   */
  targetId?: string;
  /**
   * The color of the hamburger lines (hex or Tailwind color)
   */
  color?: string;
  /**
   * Additional classes to apply to the button
   */
  className?: string;
}

/**
 * AnimatedHamburgerButton - A clean animated hamburger menu button that transforms to X when clicked
 * 
 * @returns {JSX.Element} - The hamburger button component
 */
const AnimatedHamburgerButton: React.FC<AnimatedHamburgerButtonProps> = ({ 
  id = "hs-navbar-collapse",
  targetId = "hs-navbar-menu",
  color = "#1976D2",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Base styles for the hamburger lines
  const baseLineStyle = "h-1 transition-all duration-300";

  return (
    <button 
      ref={buttonRef}
      type="button" 
      className={`hs-collapse-toggle cursor-pointer relative w-10 h-10 rounded-lg focus:outline-none group ${className}`}
      id={id}
      aria-expanded={isOpen}
      aria-controls={targetId}
      aria-label="Toggle navigation"
      data-hs-collapse={`#${targetId}`}
      onClick={toggleMenu}
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-15 flex flex-col justify-between cursor-pointer">
        {/* Top line */}
        <span 
          className={`${baseLineStyle} w-full bg-[#1976D2] transform origin-center ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
        ></span>
        
        {/* Middle line */}
        <span 
          className={`${baseLineStyle} w-full bg-[#1976D2] mx-auto transform ${
            isOpen 
              ? 'opacity-0 translate-x-6' 
              : 'group-hover:translate-x-1 group-hover:w-4/5'
          }`}
        ></span>
        
        {/* Bottom line */}
        <span 
          className={`${baseLineStyle} w-full bg-[#1976D2] transform origin-center ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
        ></span>
      </div>
    </button>
  );
};

export default AnimatedHamburgerButton;