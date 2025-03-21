import React from 'react';
import AnimatedContainer from  './AnimationContainer'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle } from 'lucide-react';

const QuoteMockup2: React.FC = () => {
  return (
        <AnimatedContainer 
        delay={3000}
        duration={1000}
        direction="top"
        distance="12"
        easing="ease-in-out"
        className="w-[150px] h-[85px] rounded-[20px] shadow-lg p-3 bg-white flex flex-col justify-between border border-gray-200 absolute top-4/8 left-37 right-1 z-10 -translate-y-1/2" 
        >
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
            <Avatar className="w-5 h-5">
            <AvatarImage src="/assets/img/landing-page-assets/avatar-head-dweloo.png" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-[7px] text-[#1976D2] font-medium">Booking #420-69</span>
        </div>
        
        {/* Content */}
        <div className="space-y-0.5 flex-grow">
            <div className="flex items-center justify-between">
            <span className="font-semibold text-[#1976D2] text-[9px]">Installation Confirmed</span>
            <CheckCircle className="w-3 h-3 text-[#1976D2]" /> {/* Lucide React icon */}
            </div>
            <div className="text-[6.5px] text-gray-700 leading-tight">
            <p>98115, Seattle, WA, USA</p>
            <p>
            {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            })}, 10:00 AM
            </p>            
            <p>Craftsman: Alex Carter</p>
            </div>
        </div>
        </AnimatedContainer>
  );
};

export default QuoteMockup2;