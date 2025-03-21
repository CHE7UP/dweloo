
import React from 'react';

interface LogoProps {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

const Logo: React.FC<LogoProps> = ({
  size = 40,
  color = '#0056B3',
  className = '',
  strokeWidth = 14,
}) => {
  // Create a unique mask ID
  const maskId = `smileMask-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
    >
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="120" height="120" fill="white" />
          <path
            d="M32,68 Q56,96 80,68"
            fill="none"
            stroke="black"
            strokeWidth={strokeWidth}
            strokeLinecap="round"            
          />
        </mask>
      </defs>
      <path
        d="M56,8 C64,8 112,40 112,48 L112,96 C112,100 108,104 104,104 L8,104 C4,104 0,100 0,96 L0,48 C0,40 48,8 56,8 Z"
        fill={color}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
};

export default Logo;

