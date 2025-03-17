import React from 'react';
import Logo from './Logo'; // Ensure the Logo component is correctly imported




interface LogoWithTextProps {
  width?: string;
  height?: string;
  color?: string;
  fillColor?: string;
  className?: string;
}
const LogoWithText: React.FC<LogoWithTextProps> = ({
    color = 'text-gray-600',
    className = '',
  }) => {
    return (
      <div className={`inline-flex relative ${className}`}>
        <Logo 

          color={color} 
          className="inline-block align-middle"
        />
        <span 
          className="absolute text-2xl font-bold text-gray-700 top-1/7 left-12 right-1 z-10 text-[30px]">
          dweloo
        </span>
      </div>
    );
  };
  
  export default LogoWithText;