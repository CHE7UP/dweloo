// components/ChatButton.tsx
'use client';
import { useState, ReactNode } from 'react';

interface ChatButtonProps {
  buttonText: ReactNode;  // Changed from string to ReactNode
  className?: string;
}

const ChatButton = ({ buttonText, className = '' }: ChatButtonProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeTawkTo = () => {
    if (isInitialized) {
      // If already initialized, just maximize the chat
      if (window.Tawk_API && window.Tawk_API.maximize) {
        window.Tawk_API.maximize();
      }
      return;
    }

    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    
    // Configure any custom settings
    window.Tawk_API.onLoad = function() {
      if (window.Tawk_API?.maximize) {
        window.Tawk_API.maximize();
      }
    };
    
    // Create and load the script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}/${process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.head.appendChild(script);
    
    setIsInitialized(true);
  };

  return (
    <button
      onClick={initializeTawkTo}
      className={className}
    >
      {buttonText}
    </button>
  );
};

export default ChatButton;