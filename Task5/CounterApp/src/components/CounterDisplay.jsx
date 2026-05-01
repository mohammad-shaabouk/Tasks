import { useState, useEffect } from 'react';

function CounterDisplay({ count, minLimit, maxLimit, isRunning }) {
  const [displayCount, setDisplayCount] = useState(count);
  const progress = ((count - minLimit) / (maxLimit - minLimit)) * 100;

  useEffect(() => {
    setDisplayCount(count);
  }, [count]);

  const getCounterClass = () => {
    if (count > 0) return 'counter-display counter-positive pulse';
    if (count < 0) return 'counter-display counter-negative pulse';
    return 'counter-display counter-zero';
  };

  return (
    <section className="counter-panel" aria-label="Counter display">
      <div className="counter-status">
        <span className={`status-dot ${isRunning ? 'status-live' : ''}`} />
        <span>{isRunning ? 'Auto running' : 'Ready'}</span>
      </div>

      <div className={getCounterClass()}>
        {displayCount.toLocaleString()}
      </div>

      <div className="limit-row" aria-hidden="true">
        <span>{minLimit.toLocaleString()}</span>
        <span>{maxLimit.toLocaleString()}</span>
      </div>

      <div className="progress-bar" aria-label="Counter position between limits">
        <div
          className="progress-fill"
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        />
      </div>

      <div className="counter-meta">
        <span>Minimum {minLimit.toLocaleString()}</span>
        <span>Maximum {maxLimit.toLocaleString()}</span>
      </div>
    </section>
  );
}

export default CounterDisplay;
