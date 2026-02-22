import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className, size = 40 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Abstract Nature/Professional Blend Logo */}
        {/* A circle representing wholeness and the community */}
        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-primary/20" />
        
        {/* Leaf shape representing health and nature */}
        <path
          d="M50 20C50 20 20 35 20 60C20 85 50 80 50 80C50 80 80 85 80 60C80 35 50 20 50 20Z"
          fill="currentColor"
          className="text-primary/10"
        />
        
        {/* Briefcase base representing work */}
        <rect x="30" y="45" width="40" height="30" rx="4" fill="currentColor" className="text-primary shadow-lg" />
        
        {/* Briefcase handle */}
        <path
          d="M40 45V41C40 38.2386 42.2386 36 45 36H55C57.7614 36 60 38.2386 60 41V45"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary"
        />
        
        {/* A small leaf growing out of the briefcase handle or corner */}
        <path
          d="M60 30C60 30 65 25 75 25C75 25 72 35 62 35"
          fill="currentColor"
          className="text-accent"
        />
        <path
          d="M60 35L65 25"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-accent"
        />
        
        {/* Center line of the briefcase */}
        <line x1="30" y1="60" x2="70" y2="60" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
      </svg>
    </div>
  );
};
