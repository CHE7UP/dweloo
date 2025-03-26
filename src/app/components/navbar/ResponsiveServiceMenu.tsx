'use client';

import React, { useState, useEffect, ReactElement, cloneElement, Children } from 'react';

interface ResponsiveServiceMenuProps {
  children: React.ReactNode;
  className?: string;
}

// Define a type for the props we expect on child elements
interface ChildProps {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  [key: string]: unknown;
}

const ResponsiveServiceMenu: React.FC<ResponsiveServiceMenuProps> = ({ 
  children,
  className = ''
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if we're on mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobile(window.innerWidth < 768); // 768px is a common breakpoint for mobile
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Toggle menu open/closed
  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Enhance children with click handler for mobile
  const enhancedChildren = Children.map(children, child => {
    // Skip non-element children (like strings, numbers, etc.)
    if (!React.isValidElement(child)) {
      return child;
    }

    // Create a new onClick handler that wraps the original
    const enhancedOnClick = (e: React.MouseEvent<HTMLElement>) => {
      // Close menu on mobile
      if (isMobile) {
        setIsMenuOpen(false);
      }
      
      // Type assertion to access props safely with our interface
      const childProps = (child as ReactElement<ChildProps>).props;
      
      // Call the original onClick if it exists
      if (childProps && typeof childProps.onClick === 'function') {
        childProps.onClick(e);
      }
    };

    // Clone with specific type
    return cloneElement(child as ReactElement<ChildProps>, {
      onClick: enhancedOnClick,
    });
  });

  return (
    <>
      {/* Burger menu button for mobile only */}
      {isMobile && (
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          aria-label="Toggle navigation menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Menu container - shown as dropdown on mobile, absolute menu on desktop */}
      <div 
        className={`
          ${isMobile ? 'transition-all duration-300 w-full' : 'absolute top-full left-0 min-w-48'} 
          ${(isMobile && !isMenuOpen) ? 'hidden' : 'block'} 
          bg-white shadow-md rounded-lg p-2 z-50 ${className}
        `}
      >
        <div className="py-1">
          {enhancedChildren}
        </div>
      </div>
    </>
  );
};

export default ResponsiveServiceMenu;