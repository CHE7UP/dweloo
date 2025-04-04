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
  className="w-[170px] lg:w-[250px] h-[115px] lg:h-[145px] rounded-[20px] shadow-lg p-3 bg-white flex flex-col justify-between border border-gray-200 absolute top-5/7 right-1 z-10 -translate-y-1/2"
>
  {/* Header */}
  <div className="flex items-center justify-between mb-1">
    <Avatar className="w-5 h-5">
      <AvatarImage 
      alt='avatar dweloo logo'
      className="w-4 h-4 lg:w-6 lg:h-6 object-contain"
      src="/favicons/favicon-96x96.png" />
      <AvatarFallback>DW</AvatarFallback>
    </Avatar>
    <span className="text-[7px] lg:text-[10px] text-[#1273EB] font-medium">Invoice #420-69</span>
  </div>
  
  {/* Content */}
  <div className="space-y-1 flex-grow">
    <div className="flex items-center justify-between">
      <span className="font-semibold text-[#1273EB] text-[9px] lg:text-[13px]">Job Completed</span>
      <CheckCircle className="w-5 h-5 text-[#1273EB]" />
    </div>

    <div className="flex items-center space-x-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-2 h-2 lg:w-3 lg:h-3 text-yellow-400 fill-yellow-400" />
      ))}
      <span className="text-[6px] lg:text-[9px] text-gray-600 ml-1">5/5</span>
    </div>
    <div className="text-[6.5px] lg:text-[11px] text-gray-700 leading-tight">
      <p>Thanks for the review!</p>
    </div>
    <button className="w-full bg-[#1273EB] text-white text-[9px] lg:text-[13px] py-1 lg:mt-3 rounded-md hover:bg-[#1565c0]">
      View Invoice
    </button>
  </div>
</AnimatedContainer>
  );
};

export default QuoteMockup3;