import React from "react";
import QuoteMockup from "./QuoteMockup";
import QuoteMockup2 from "./QuoteMockup2";
import QuoteMockup3 from "./QuoteMockup3";

interface IpadMockupProps {
  children: React.ReactNode;
}

const IpadMockup: React.FC<IpadMockupProps> = ({ children }) => {
  return (
    <div className="relative mx-auto mt-16 border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[454px] max-w-[341px] md:h-[682px] md:max-w-[512px]">
      {/* Side buttons */}
      <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg" />
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg" />
      <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg" />
      <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg" />

      {/* Screen area */}
      <div className="rounded-[2rem] overflow-hidden h-[426px] md:h-[654px] bg-white dark:bg-gray-800">
        {children}
        <QuoteMockup/>
        <QuoteMockup2 />
        <QuoteMockup3 />

      </div>
    </div>
  );
};

export default IpadMockup;

