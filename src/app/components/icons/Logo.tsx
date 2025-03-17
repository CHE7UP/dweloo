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
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

const Logo: React.FC<LogoProps> = ({
  size = 40,
  color = '#0056B3',
  className = '',
  strokeWidth = 4,
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