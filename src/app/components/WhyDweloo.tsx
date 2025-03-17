import React from 'react';

const WhyDweloo = () => {
  const comparisonData = [
    {
      others: "Unpredictable pricing with frequent changes",
      dweloo: "Guaranteed transparent pricing with no surprises",
    },
    {
      others: "One-size-fits-all standard solutions",
      dweloo: "Customized designs tailored to your exact needs",
    },
    {
      others: "Extended timelines of 4-6 weeks",
      dweloo: "Fast 10-day completion guarantee",
    },
    {
      others: "Disorganized project management",
      dweloo: "Dedicated Project Manager for seamless experience",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">Why Choose Dweloo?</h2>
      
      <div className="space-y-4">
        {comparisonData.map((item, index) => (
          <div key={index} className="flex flex-col md:flex-row border-b pb-4">
            <div className="flex-1 mb-2 md:mb-0">
              <div className="flex items-start">
                <div className="text-red-500 font-bold mr-2">✗</div>
                <div>
                  <span className="font-bold text-gray-700">Competitors:</span>
                  <span className="ml-2 text-gray-800">{item.others}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start">
                <div className="text-green-500 font-bold mr-2">✓</div>
                <div>
                  <span className="font-bold text-[#1976D2]">Dweloo:</span>
                  <span className="ml-2 text-gray-800">{item.dweloo}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyDweloo;