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
    width = '24',
    height = 'h-auto',
    color = 'text-gray-600',
    fillColor = '#0056B3',
    className = '',
  }) => {
    return (
      <div className={`inline-flex relative ${className}`}>
        <Logo 
          width={width} 
          height={height} 
          color={color} 
          fillColor={fillColor} 
          className="inline-block align-middle"
        />
        <span 
          className="absolute text-2xl font-bold text-gray-600 top-3/14 left-14 right-1 z-10 text-[30px]">
          dweloo
        </span>
      </div>
    );
  };
  
  export default LogoWithText;