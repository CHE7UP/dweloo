// components/ChatButton.tsx
'use client';
import { useState, useEffect, ReactNode } from 'react';

interface ChatButtonProps {
  buttonText: ReactNode;
  className?: string;
}

// Define a more specific type for the Tawk API
interface TawkApiType {
  onLoad?: () => void;
  maximize?: () => void;
  minimize?: () => void;
  toggle?: () => void;
  showWidget?: () => void;
  hideWidget?: () => void;
}

// Extend Window interface
declare global {
  interface Window {
    Tawk_API?: TawkApiType;
    Tawk_LoadStart?: Date;
  }
}

const ChatButton = ({ buttonText, className = '' }: ChatButtonProps) => {
  const [isChatLoaded, setIsChatLoaded] = useState(false);
  
  const handleClick = () => {
    if (!isChatLoaded) {
      setIsChatLoaded(true);
    } else {
      // Use optional chaining for type safety
      window.Tawk_API?.maximize?.();
    }
  };

  useEffect(() => {
    if (isChatLoaded) {
      // Initialize safely
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();
      
      // Set the onLoad callback
      window.Tawk_API.onLoad = function() {
        window.Tawk_API?.maximize?.();
      };
      
      // Load the script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://embed.tawk.to/${process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}/${process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}`;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.head.appendChild(script);
      
      return () => {
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