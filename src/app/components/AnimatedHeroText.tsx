import React, { useState, useEffect } from 'react';

const AnimatedHeroText = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const animatedTexts = [
    'home',
    'kitchen',
    'bath',
    'floors',
    'walls'
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentTextIndex((prevIndex) => 
          (prevIndex + 1) % animatedTexts.length
        );
        
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 500); // Wait for exit animation to complete
      
    }, 3000); // Change text every 3 seconds
    
    return () => clearInterval(interval);
  }, [animatedTexts.length]);
  
  return (
    <div className="w-full max-w-4xl mx-auto text-center py-1">      
    <h1 className="text-4xl md:text-6xl font-bold text-center flex flex-wrap justify-center">
        <span className="text-gray-700 mr-2">Finally, an easy way to renovate your</span>
        <div className="relative h-12 sm:h-14 md:h-16 lg:h-20 overflow-hidden min-w-46 sm:min-w-50 md:min-w-58 lg:min-w-66">
          <span 
            key={currentTextIndex}
            className={`absolute left-0 w-full text-[#1273EB] transition-transform duration-500 ease-in-out
              ${isAnimating ? 'transform translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}
          >
            {animatedTexts[currentTextIndex]}
          </span>
        </div>
      </h1>
      <p className="text-xl text-gray-700 px-4 py-3">
          The home improvements you want, minus the headaches you expect
        </p>
    </div>
  );
};

export default AnimatedHeroText;

//   return (
//     <div className="w-full max-w-4xl mx-auto text-center py-1">
//         <div className="h-55 flex flex-col items-center justify-center overflow-hidden">
//         {/* Animated hero text with typing effect */}
//         <h1 className="text-3xl md:text-4xl font-bold mb-6 px-4 h-16 flex items-center justify-center">
//         <span className="text-gray-800">{textParts.firstPart}</span>
//           <span className={`transition-all duration-500 ${
//             highlightActive 
//               ? 'text-[#1273EB] font-extrabold scale-105' 
//               : 'text-gray-800'
//           }`}>
//             {textParts.secondPart}
//           </span>
//           <span className="cursor-animation ml-0.5 opacity-75 ">|</span>
//         </h1>
        
//         {/* Static subtext */}

        
//         {/* Add the cursor animation style in a style tag */}
//         <style jsx>{`
//           @keyframes blink {
//             0%, 100% { opacity: 1; }
//             50% { opacity: 0; }
//           }
//           .cursor-animation {
//             animation: blink 1s infinite;
//           }
//         `}</style>
//       </div>
//       <p className="text-xl text-gray-700 px-4 py-3">
//           The home improvements you want, minus the headaches you expect
//         </p>
//     </div>
//   );
// };

// export default AnimatedHeroText;