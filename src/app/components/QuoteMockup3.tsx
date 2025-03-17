import React from 'react';
import AnimatedContainer from  './AnimationContainer'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CheckCircle, Star } from 'lucide-react';

const QuoteMockup3: React.FC = () => {
  return (
    <AnimatedContainer 
  delay={4000}
  duration={1000}
  direction="top"
  distance="12"
  easing="ease-in-out"
  className="w-[150px] h-[110px] rounded-[20px] shadow-lg p-3 bg-white flex flex-col justify-between border border-gray-200 absolute top-5/7 left-37 right-1 z-10 -translate-y-1/2"
>
  {/* Header */}
  <div className="flex items-center justify-between mb-1">
    <Avatar className="w-5 h-5">
      <AvatarImage 
      className="w-4 h-4 object-contain"
      src="/favicons/favicon-96x96.png" /> Replace with Dweloo logo
      <AvatarFallback>DW</AvatarFallback>
    </Avatar>
    <span className="text-[7px] text-[#1976D2] font-medium">Invoice #420-69</span>
  </div>
  
  {/* Content */}
  <div className="space-y-1 flex-grow">
    <div className="flex items-center justify-between">
      <span className="font-semibold text-[#1976D2] text-[9px]">Job Completed</span>
      <CheckCircle className="w-3 h-3 text-[#1976D2]" />
    </div>

    <div className="flex items-center space-x-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-2 h-2 text-yellow-400 fill-yellow-400" />
      ))}
      <span className="text-[6px] text-gray-600 ml-1">5/5</span>
    </div>
    <div className="text-[6.5px] text-gray-700 leading-tight">
      <p>Thanks for the review!</p>
    </div>
    <button className="w-full bg-[#1976D2] text-white text-[6px] py-1 rounded-md hover:bg-[#1565c0]">
      View Invoice
    </button>
  </div>
</AnimatedContainer>
  );
};

export default QuoteMockup3;