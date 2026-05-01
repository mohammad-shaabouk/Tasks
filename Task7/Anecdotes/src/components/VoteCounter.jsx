import React, { useEffect, useState } from 'react';
import './VoteCounter.css';

const VoteCounter = ({ votes }) => {
  const [displayCount, setDisplayCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const duration = 500;
    const steps = 20;
    const increment = (votes - displayCount) / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      if (currentStep < steps) {
        setDisplayCount(prev => Math.round(prev + increment));
        currentStep++;
      } else {
        setDisplayCount(votes);
        clearInterval(timer);
        setTimeout(() => setIsAnimating(false), 200);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [votes]);

  return (
    <div className="vote-counter">
      <span className="vote-label">عدد الأصوات</span>
      <span className={`vote-number ${isAnimating ? 'pulse' : ''}`}>
        {displayCount}
      </span>
    </div>
  );
};

export default VoteCounter;