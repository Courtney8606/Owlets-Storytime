import { useState } from "react";

const MainViewButton = ({ text, style, onClick }) => {

  const [isHovered, setIsHovered] = useState(false);

  const defaultStyles = {
    backgroundColor: '#8a2952',
    borderColor: '#8a2952',
    color: '#ffd9c0',
    height: '55px',
    width: '140px',
    fontSize: '16px',
    border: '2px solid',
    borderRadius: '10px',
    cursor: 'pointer',
    ...style,
  };

  const hoverStyles = {
    backgroundColor: '#00215e',
    borderColor: '#00215e',
    color: '#ffd9c0',
    ...style,
  };

  return (
    <div className="parent-view">
      <button
              role="submit-button"
              onClick={onClick || (() => {})}
              id="submit"
              type="submit"
              style={isHovered ? { ...defaultStyles, ...hoverStyles } : defaultStyles}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {text}
            </button>
    </div>
  );
};

export default MainViewButton;
