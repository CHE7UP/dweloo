import React from 'react';
import { Ruler, Leaf } from "lucide-react";



const QuoteMockup: React.FC = () => {
  return (
    <div className="w-[170px] h-[80px] rounded-[20px] shadow-lg p-4 bg-white flex flex-col justify-between border border-[#B4D330] absolute top-1/8 left-4 right-4 z-10 -translate-y-1/2">
      {/* Header */}
      
      <div className="flex items-center justify-between">
       <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-gray-500 font-bold text-[8px]">Total Estimated Cost</p>
          <p className="text-xs font-bold text-gray-800">$7,250</p>

          </div>
      </div>

      </div>
      <div className="space-y-2 flex-grow">
      
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Ruler className="text-gray-500 w-3 h-3 mr-2" />
            <span className="text-gray-600 text-[8px]">Area Coverage</span>
          </div>
          <span className="text-gray-600 text-[8px]">1500 sq ft</span>
        </div> 
        {/* <div className="flex items-center">
              <div className="bg-gray-500 p-0.5 rounded-full mr-1">
                <Leaf className="text-white w-3 h-3" />
              </div>
              <span className="font-medium text-gray-700 text-[8px]">Hardwood</span>
            </div> */}
        </div>
    </div>
  );
};

export default QuoteMockup;

