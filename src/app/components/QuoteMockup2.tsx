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
      className="w-[150px] h-[80px] rounded-[20px] shadow-lg p-4 bg-white flex flex-col justify-between border border-gray-200 absolute top-4/8 left-37 right-1 z-10 -translate-y-1/2" 
    >
      {/* Header */}
      <div className="flex items-center justify-between">
       <div className="flex items-center justify-between mb-1">
       <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      </div>
        <div className="space-y-2 flex-grow">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                   <span className="font-bold text-gray-600 text-[7px]">Installation confirmed at 98115</span>
                </div>
            </div> 
        </div>
    </AnimatedContainer>
  );
};

export default QuoteMockup2;