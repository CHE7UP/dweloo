'use client'

import React, { useEffect, useState } from 'react';
import { Ruler } from 'lucide-react';

const QuoteMockup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set a 2-second timeout before triggering the animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    
    // Clean up the timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
    className={`w-[150px] h-[70px] rounded-[20px] shadow-lg p-3 bg-white flex flex-col justify-between border border-gray-200 absolute top-1/8 left-4 right-4 z-10 -translate-y-1/2 transition-all duration-1000 ease-in-out ${
      isVisible 
        ? 'opacity-100 translate-x-0' 
        : 'opacity-0 -translate-x-12 w-0'
    }`}
  >
    {/* Header */}
    <div className="flex items-center justify-between mb-1">
      <div>
        <p className="text-[#1976D2] font-semibold text-[7px]">Total Estimated Cost</p>
        <p className="text-[10px] font-bold text-gray-800">$7,250</p>
      </div>
    </div>
    
    {/* Content */}
    <div className="space-y-1 flex-grow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Ruler className="text-[#1976D2] w-3 h-3 mr-1" />
          <span className="text-gray-700 font-bold text-[6.5px]">Area Coverage</span>
        </div>
        <span className="text-gray-700 font-bold text-[6.5px]">1500 sq ft</span>
      </div>
    </div>
  </div>
);
};

export default QuoteMockup;