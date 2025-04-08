
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`${sizeClasses[size]} bg-sheild-purple rounded-full flex items-center justify-center`}>
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3/4 h-3/4 border-2 border-white rounded-md"></div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
            <path
              d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {showText && (
        <div className="mt-1 text-center">
          <div className="text-white font-bold text-xl tracking-wider">SHEILD</div>
          <div className="text-white text-xs tracking-widest">SAFETY APP</div>
        </div>
      )}
    </div>
  );
};

export default Logo;
