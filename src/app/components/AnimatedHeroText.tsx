import React, { useState, useEffect, useRef } from 'react';

const AnimatedHeroText: React.FC = () => {
  const heroTexts = [
    "That paint job you've been putting off? Done by Friday.",
    "The kitchen of your dreams isn't just for TV shows anymore.",
    "Those gorgeous floors you want? We handle everything—you just say 'wow'.",
    "Your bathroom can go from embarrassing to impressive this month.",
    "Cracked bricks or wobbly steps? Fixed before your in-laws visit."
  ];

  const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [highlightActive, setHighlightActive] = useState<boolean>(false);
  const [isErasing, setIsErasing] = useState<boolean>(false);
  
  // Track if component is mounted
  const isMounted = useRef<boolean>(true);
  const currentPhaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear any existing timeouts
  const clearTimeouts = () => {
    if (currentPhaseTimeoutRef.current) {
      clearTimeout(currentPhaseTimeoutRef.current);
      currentPhaseTimeoutRef.current = null;
    }
  };
  
  // Typing effect function
  useEffect(() => {
    if (!isTyping || isErasing) return;
    
    const currentFullText = heroTexts[currentTextIndex];
    
    if (displayText.length < currentFullText.length) {
      clearTimeouts();
      currentPhaseTimeoutRef.current = setTimeout(() => {
        if (isMounted.current) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }
      }, 40); // Speed of typing
    } else {
      // Text is fully typed, wait before activating highlight
      clearTimeouts();
      currentPhaseTimeoutRef.current = setTimeout(() => {
        if (isMounted.current) {
          setHighlightActive(true);
          
          // After highlight, prepare for next text
          clearTimeouts();
          currentPhaseTimeoutRef.current = setTimeout(() => {
            if (isMounted.current) {
              setHighlightActive(false);
              setIsTyping(false);
              setIsErasing(true);
            }
          }, 1500);
        }
      }, 1000);
    }
  }, [displayText, isTyping, currentTextIndex, isErasing, heroTexts]);
  
  // Erasing effect
  useEffect(() => {
    if (!isErasing) return;
    
    if (displayText.length > 0) {
      clearTimeouts();
      currentPhaseTimeoutRef.current = setTimeout(() => {
        if (isMounted.current) {
          setDisplayText(prev => prev.slice(0, -1));
        }
      }, 20); // Speed of erasing
    } else {
      // Move to next text once erased
      clearTimeouts();
      currentPhaseTimeoutRef.current = setTimeout(() => {
        if (isMounted.current) {
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
          setIsErasing(false);
          setIsTyping(true);
        }
      }, 500);
    }
  }, [displayText, heroTexts, isErasing]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMounted.current = false;
      clearTimeouts();
    };
  }, []);

  // Split text into two parts for highlighting effect
  const textParts = (() => {
    const fullText = heroTexts[currentTextIndex];
    const questionMarkIndex = fullText.indexOf('?');
    
    if (questionMarkIndex !== -1 && questionMarkIndex < displayText.length) {
      return {
        firstPart: displayText.slice(0, questionMarkIndex + 1),
        secondPart: displayText.slice(questionMarkIndex + 1)
      };
    }
    
    return {
      firstPart: displayText,
      secondPart: ''
    };
  })();

  return (
    <div className="w-full max-w-4xl mx-auto text-center py-1">
        <div className="h-55 flex flex-col items-center justify-center overflow-hidden">
        {/* Animated hero text with typing effect */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 px-4 h-16 flex items-center justify-center">
        <span className="text-gray-800">{textParts.firstPart}</span>
          <span className={`transition-all duration-500 ${
            highlightActive 
              ? 'text-[#1976D2] font-extrabold scale-105' 
              : 'text-gray-800'
          }`}>
            {textParts.secondPart}
          </span>
          <span className="cursor-animation ml-0.5 opacity-75 ">|</span>
        </h1>
        
        {/* Static subtext */}

        
        {/* Add the cursor animation style in a style tag */}
        <style jsx>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .cursor-animation {
            animation: blink 1s infinite;
          }
        `}</style>
      </div>
      <p className="text-xl text-gray-700 px-4 py-3">
          The home improvements you want, minus the headaches you expect
        </p>
    </div>
  );
};

export default AnimatedHeroText;