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
        {/* <span 
          className="absolute text-2xl font-bold text-gray-700 top-1/11 left-10 right-1 z-10 text-[30px]">
          dweloo
        </span> */}
        <svg
        className='hover:[#0F5ED6]'
        xmlns="http://www.w3.org/2000/svg" width="150" height="40">
  <text x="-2" y="34" 
     fontFamily="Futura" 
      fontSize="40" 
      fontWeight="bold"
      letterSpacing="-3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#1273EB"
      >
      dweloo</text>
</svg>
      </div>
    );
  };
  
  export default LogoWithText;