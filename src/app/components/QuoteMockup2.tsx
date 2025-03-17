import React from 'react';
import AnimatedContainer from  './AnimationContainer'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const QuoteMockup2: React.FC = () => {
  return (
<AnimatedContainer 
  delay={3000}
  duration={1000}
  direction="top"
  distance="12"
  easing="ease-in-out"
  className="w-[150px] h-[90px] rounded-[20px] shadow-lg p-3 bg-white flex flex-col justify-between border border-gray-200 absolute top-4/8 left-37 right-1 z-10 -translate-y-1/2" 
>
  {/* Header */}
  <div className="flex items-center justify-between mb-1">
    <Avatar className="w-6 h-6">
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <span className="text-[8px] text-gray-500">Booking #1234</span>
  </div>
  
  {/* Content */}
  <div className="space-y-1 flex-grow">
    <div className="flex items-center justify-between">
      <span className="font-semibold text-gray-700 text-[9px]">Installation Confirmed</span>
      <span className="text-[8px] text-green-500">✓</span> {/* Icon effect */}
    </div>
    <div className="text-[7px] text-gray-600">
      <p>98115, Seattle, WA</p>
      <p>Mar 18, 2025, 10:00 AM</p>
      <p>Technician: Alex</p>
    </div>
  </div>
</AnimatedContainer>
  );
};

export default QuoteMockup2;