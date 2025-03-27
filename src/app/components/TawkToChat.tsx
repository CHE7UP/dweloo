// components/TawkToChat.tsx
import { useEffect } from 'react';

interface TawkToChatProps {
  propertyId: string;
  widgetId: string;
  hideWidget?: boolean;
  
}

declare global {
  interface Window {
    Tawk_API?: unknown;
    Tawk_LoadStart?: Date;
  }
}

const TawkToChat = ({ propertyId, widgetId }: TawkToChatProps) => {
  useEffect(() => {
    // Initialize Tawk_API
    window.Tawk_API = window.Tawk_API || {};
    
    // Optional: Configure visitor information if available
    // window.Tawk_API.visitor = {
    //   name: 'Visitor Name',
    //   email: 'visitor@example.com'
    // };

    // Load the tawk.to script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    document.head.appendChild(script);
    
    // Cleanup on unmount
    return () => {
      if (window.Tawk_API && window.Tawk_API.hideWidget) {
        window.Tawk_API.hideWidget();
      }
      document.head.removeChild(script);
    };
  }, [propertyId, widgetId]);

  return null; // This component doesn't render anything visible
};

export default TawkToChat;