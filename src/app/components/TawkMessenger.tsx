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
    <div className='fixed bottom-26 left-0'
    >
    <TawkMessengerReact
      propertyId={process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || ''}
      widgetId={process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || ''}
    />
    </div>
  );
};

export default TawkMessenger;

// // components/TawkMessenger.tsx
// 'use client';
// import { useEffect, useState, useRef } from 'react';
// import { usePathname } from 'next/navigation';
// import dynamic from 'next/dynamic';

// // Dynamically import the component with no SSR
// const TawkMessengerReact = dynamic(
//   () => import('@tawk.to/tawk-messenger-react'),
//   { ssr: false }
// );

// // Pages where the chat should not appear
// const EXCLUDED_PAGES = [
//   '/quote',
//   '/instant-quote',
//   // Add other form pages here
// ];

// const TawkMessenger = () => {
//   const tawkMessengerRef = useRef(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [shouldRender, setShouldRender] = useState(false);
//   const pathname = usePathname();
  
//   // Check if current page is excluded
//   const isExcludedPage = EXCLUDED_PAGES.some(page => pathname?.includes(page));
  
//   useEffect(() => {
//     if (isExcludedPage) {
//       return;
//     }
    
//     setIsMounted(true);
    
//     // First timer: Show chat widget after 20 seconds
//     const showTimer = setTimeout(() => {
//       setShouldRender(true);
//       setTimeout(() => {
//         setIsVisible(true);
//       }, 100); // Small delay to ensure component renders before animation
//     }, 20000);
    
//     // Second timer: Hide chat widget after some time (e.g., 60 seconds after showing)
//     const hideTimer = setTimeout(() => {
//       setIsVisible(false);
//       // Wait for animation to complete before unmounting
//       setTimeout(() => {
//         setShouldRender(false);
//       }, 500);
//     }, 80000); // 20s delay + 60s visible = 80s total
    
//     return () => {
//       clearTimeout(showTimer);
//       clearTimeout(hideTimer);
//     };
//   }, [isExcludedPage, pathname]);
  
//   if (!isMounted || isExcludedPage || !shouldRender) {
//     return null;
//   }

//   return (
//     <div 
//       className={`fixed bottom-16 left-0 z-50 transition-transform duration-500 ease-in-out ${
//         isVisible ? 'translate-x-0' : '-translate-x-full'
//       }`}
//     >
//       <TawkMessengerReact
//         ref={tawkMessengerRef}
//         propertyId={process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || ''}
//         widgetId={process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || ''}
//       />
//     </div>
//   );
// };

// export default TawkMessenger;