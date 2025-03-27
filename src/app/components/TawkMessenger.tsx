// components/TawkMessenger.tsx
'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the component with no SSR
const TawkMessengerReact = dynamic(
  () => import('@tawk.to/tawk-messenger-react'),
  { ssr: false }
);

const TawkMessenger = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return null;
  }

  return (
    <TawkMessengerReact
      propertyId={process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || ''}
      widgetId={process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || ''}
    />
  );
};

export default TawkMessenger;