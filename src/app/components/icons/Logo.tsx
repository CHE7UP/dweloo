// import React from 'react';

// interface LogoProps {
//   width?: string;
//   height?: string;
//   color?: string;
//   fillColor?: string;
//   className?: string;
// }

// const Logo: React.FC<LogoProps> = ({
//   width = 'w-20',
//   height = 'h-auto',
//   color = 'text-black',
//   fillColor = '#B4D330',
//   className = '',
// }) => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 300 180"
//       className={`${width} ${height} fill-current ${color} ${className}`}
//     >
//       {/* Define a mask to cut the smile out of the house */}
//       <mask id="smileMask">
//         {/* Full solid shape to cover the house */}
//         <rect x="0" y="0" width="400" height="180" fill="white" />
//         {/* The smile path will cut out from the white shape */}
//         <path
//           d="M120,125 Q150,160 180,125"
//           fill="none"
//           stroke="black"
//           strokeWidth="8"
//           strokeLinecap="round"
//         />
//       </mask>

//       {/* Apply the mask to the house shape */}
//       <path
//         d="M150,50 C160,50 220,90 220,100 L220,160 C220,165 215,170 210,170 L90,170 C85,170 80,165 80,160 L80,100 C80,90 140,50 150,50 Z"
//         fill={fillColor}
//         mask="url(#smileMask)"
//       />
//     </svg>
//   );
// };

// export default Logo;

import React from 'react';

interface LogoProps {
  width?: string;
  height?: string;
  color?: string;
  fillColor?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  strokeWidth?: number;
}

const Logo: React.FC<LogoProps> = ({
  width,
  height,
  color = 'text-black',
  fillColor = '#B4D330',
  className = '',
  size = 'lg',
  strokeWidth,
}) => {
  // Size presets with corresponding values
  const sizeMap = {
    sm: { width: 'w-16', height: 'h-auto', strokeWidth: 6 },
    md: { width: 'w-24', height: 'h-auto', strokeWidth: 8 },
    lg: { width: 'w-32', height: 'h-auto', strokeWidth: 10 },
  };

  // Use provided values or defaults from size preset
  const widthClass = width || sizeMap[size].width;
  const heightClass = height || sizeMap[size].height;
  const strokeWidthValue = strokeWidth !== undefined ? strokeWidth : sizeMap[size].strokeWidth;
  
  // Create a unique mask ID
  const maskId = `smileMask-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 144"
      className={`${widthClass} ${heightClass} ${color} ${className}`}
    >
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="240" height="144" fill="white" />
          <path
            d="M96,100 Q120,128 144,100"
            fill="none"
            stroke="black"
            strokeWidth={strokeWidthValue}
            strokeLinecap="round"            
          />
        </mask>
      </defs>

      <path
        d="M120,40 C128,40 176,72 176,80 L176,128 C176,132 172,136 168,136 L72,136 C68,136 64,132 64,128 L64,80 C64,72 112,40 120,40 Z"
        fill={fillColor}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
};

export default Logo;