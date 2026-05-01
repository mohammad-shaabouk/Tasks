import React from 'react';
import './GlowButton.css';

const GlowButton = ({ children, onClick, variant = 'primary' }) => {
  return (
    <button
      className={`glow-button ${variant}`}
      onClick={onClick}
    >
      <span className="button-content">{children}</span>
      <div className="button-glow"></div>
    </button>
  );
};

export default GlowButton;