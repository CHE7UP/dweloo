'use client'

import React, { useEffect, useState, ReactNode } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  delay?: number; // Delay in ms before animation starts
  duration?: number; // Animation duration in ms
  direction?: 'left' | 'right' | 'top' | 'bottom'; // Direction to animate from
  distance?: string; // Distance to animate from (Tailwind value)
  className?: string; // Additional classes
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'; // Animation easing function
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  delay = 0,
  duration = 500,
  direction = 'left',
  distance = '12',
  className = '',
  easing = 'ease-out',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  // Convert duration to Tailwind class
  const getDurationClass = () => {
    if (duration <= 300) return 'duration-300';
    if (duration <= 500) return 'duration-500';
    if (duration <= 700) return 'duration-700';
    if (duration <= 1000) return 'duration-1000';
    return 'duration-1000'; // Max supported by default Tailwind
  };

  // Set initial translation based on direction
  const getInitialTransform = () => {
    switch (direction) {
      case 'left': return `-translate-x-${distance}`;
      case 'right': return `translate-x-${distance}`;
      case 'top': return `-translate-y-${distance}`;
      case 'bottom': return `translate-y-${distance}`;
      default: return `-translate-x-${distance}`;
    }
  };

  // Combine all classes
  const animationClasses = `transition-all ${getDurationClass()} ${easing}`;
  const visibilityClasses = isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${getInitialTransform()} w-0`;

  return (
    <div className={`${animationClasses} ${visibilityClasses} ${className}`}>
      {children}
    </div>
  );
};

export default AnimatedContainer;