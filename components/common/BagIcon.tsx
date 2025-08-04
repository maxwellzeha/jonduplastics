
import React from 'react';

interface BagIconProps {
  theme: 'light' | 'dark';
  positionClasses: string;
}

const BagIcon: React.FC<BagIconProps> = ({ theme, positionClasses }) => {
  const bgClass = theme === 'light' ? 'light-bg' : 'dark-bg';
  return (
    <div className={`svg-bag-bg ${bgClass} ${positionClasses}`}>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6H5C3.89543 6 3 6.89543 3 8V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V8C21 6.89543 20.1046 6 19 6ZM19 8V20H5V8H19ZM12 3C10.3431 3 9 4.34315 9 6H7C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6H15C15 4.34315 13.6569 3 12 3Z"/>
      </svg>
    </div>
  );
};

export default BagIcon;
