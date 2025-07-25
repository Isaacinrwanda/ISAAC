
import React from 'react';

interface IconProps {
  className?: string;
}

export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export const RobotIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M19 6h-2V4c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7 0h-2V4h2v2zm7 12H5V8h14v10z" />
    <path d="M8.5 15c.83 0 1.5-.67 1.5-1.5S9.33 12 8.5 12 7 12.67 7 13.5 7.67 15 8.5 15zM15.5 15c.83 0 1.5-.67 1.5-1.5S16.33 12 15.5 12 14 12.67 14 13.5 14.67 15 15.5 15z" />
  </svg>
);

export const SendIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);
