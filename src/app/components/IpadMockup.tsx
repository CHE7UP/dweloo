import React from "react";
import { Ruler } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface IpadMockupProps {
  children: React.ReactNode;
}

const IpadMockup: React.FC<IpadMockupProps> = ({ children }) => {
  return (
    <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px]">
      {/* Side buttons */}
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg" />
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg" />
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg" />
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg" />

      {/* Screen area */}
      <div className="rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800">
        {children}
        <FinalQuoteMockup/>
        <FinalQuoteMockup2/>
      </div>
    </div>
  );
};

export default IpadMockup;

const FinalQuoteMockup: React.FC = () => {
  return (
    <div className="w-[150px] h-[80px] rounded-[20px] shadow-lg p-4 bg-white flex flex-col justify-between border border-[#B4D330] absolute top-2/3 left-37 right-1 z-10 -translate-y-1/2">
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
              {/* <div className="bg-gray-500 p-0.5 rounded-full mr-1">
                < className="text-white w-3 h-3" />
              </div> */}
              <span className="font-bold text-gray-600 text-[7px]">Installation confirmed at 98115</span>
            </div>
        </div> 
 
        </div>
    </div>
  );
};
const FinalQuoteMockup2: React.FC = () => {
  return (
    <div className="w-[150px] h-[80px] rounded-[20px] shadow-lg p-4 bg-white flex flex-col justify-between border border-[#B4D330] absolute top-5/6 left-37 right-1 z-10 -translate-y-1/2">
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
              {/* <div className="bg-gray-500 p-0.5 rounded-full mr-1">
                < className="text-white w-3 h-3" />
              </div> */}
              <span className="font-bold text-gray-600 text-[7px]">Installation confirmed at 98115</span>
            </div>
        </div> 
 
        </div>
    </div>
  );
};
