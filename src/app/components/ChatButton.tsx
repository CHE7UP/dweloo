// components/ChatButton.tsx
'use client';
import { useState, useEffect, ReactNode } from 'react';

// Define TypeScript types
declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      maximize?: () => void;
      minimize?: () => void;
      toggle?: () => void;
      showWidget?: () => void;
      hideWidget?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

interface ChatButtonProps {
  buttonText: ReactNode;
  className?: string;
}

const ChatButton = ({ buttonText, className = '' }: ChatButtonProps) => {
  const [isChatLoaded, setIsChatLoaded] = useState(false);
  
  const handleClick = () => {
    // If not already loaded, load it
    if (!isChatLoaded) {
      setIsChatLoaded(true);
    } else {
      // If already loaded, use the global API to maximize it
      if (window.Tawk_API && window.Tawk_API.maximize) {
        window.Tawk_API.maximize();
      }
    }
  };

  // Use the Tawk_API when the component loads
  useEffect(() => {
    if (isChatLoaded) {
      // Initialize Tawk_API if not already initialized
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      
      // Define onLoad callback before the script loads
      window.Tawk_API.onLoad = function() {
        if (window.Tawk_API && window.Tawk_API.maximize) {
          window.Tawk_API.maximize();
        }
      };
      
      // Load the tawk.to script directly
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://embed.tawk.to/${process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}/${process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}`;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.head.appendChild(script);
      
      return () => {
        // Cleanup on unmount if needed
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [isChatLoaded]);

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {buttonText}
    </button>
  );
};

export default ChatButton;