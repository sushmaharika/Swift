import React from 'react';

export const SwiftLogo: React.FC<{ width?: string; height?: string }> = ({ width = '150px', height = '50px' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 400 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 0h100l-25 100H0V0z"
      fill="#00A76F"
    />
    <path
      d="M45 35h30v10H45V35z"
      fill="white"
    />
    <text
      x="120"
      y="70"
      fontFamily="Arial"
      fontSize="60"
      fill="#333333"
    >
      wift
    </text>
  </svg>
);