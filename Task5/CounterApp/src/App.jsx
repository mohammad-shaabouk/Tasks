import { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import CounterDisplay from './components/CounterDisplay';
import Controls from './components/Controls';
import StepController from './components/StepController';
import StatsPanel from './components/StatsPanel';
import History from './components/History';
import './styles/global.css';

function App() {
  // Core counter state
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [autoDirection, setAutoDirection] = useState('up'); // 'up' or 'down'
  const [autoSpeed, setAutoSpeed] = useState(1000); // ms
  const [minLimit, setMinLimit] = useState(-1000);
  const [maxLimit, setMaxLimit] = useState(1000);
  const [targetAlert, setTargetAlert] = useState(100);

  // Statistics
  const [stats, setStats] = useState({
    max: 0,
    min: 0,
    totalClicks: 0,
    increments: 0,
    decrements: 0
  });

  const intervalRef = useRef(null);

  // Add to history
  const addToHistory = useCallback((action) => {
    setHistory(prev => [action, ...prev.slice(0, 9)]); // Keep last 10
  }, []);

  // Update stats
  const updateStats = useCallback((newCount, action) => {
    setStats(prev => ({
      max: Math.max(prev.max, newCount),
      min: Math.min(prev.min, newCount),
      totalClicks: prev.totalClicks + 1,
      increments: action === '+' ? prev.increments + 1 : prev.increments,
      decrements: action === '-' ? prev.decrements + 1 : prev.decrements
    }));
  }, []);

  // Smart step adjustment
  const getSmartStep = useCallback((currentCount) => {
    if (Math.abs(currentCount) >= 1000) return step * 10;
    if (Math.abs(currentCount) >= 100) return step * 5;
    return step;
  }, [step]);

  // Safe increment/decrement with limits
  const safeIncrement = useCallback(() => {
    const smartStep = getSmartStep(count);
    const newCount = Math.min(count + smartStep, maxLimit);
    if (newCount !== count) {
      setCount(newCount);
      addToHistory(`+${smartStep}`);
      updateStats(newCount, '+');
    }
  }, [count, maxLimit, getSmartStep, addToHistory, updateStats]);

  const safeDecrement = useCallback(() => {
    const smartStep = getSmartStep(count);
    const newCount = Math.max(count - smartStep, minLimit);
    if (newCount !== count) {
      setCount(newCount);
      addToHistory(`-${smartStep}`);
      updateStats(newCount, '-');
    }
  }, [count, minLimit, getSmartStep, addToHistory, updateStats]);

  const reset = useCallback(() => {
    setCount(0);
    addToHistory('Reset');
    setStats({
      max: 0,
      min: 0,
      totalClicks: 0,
      increments: 0,
      decrements: 0
    });
    setHistory([]);
  }, [addToHistory]);

  // Auto counter logic
  useEffect(() => {
    if (isRunning && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        if (autoDirection === 'up') safeIncrement();
        else safeDecrement();
      }, autoSpeed);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, autoDirection, autoSpeed, safeIncrement, safeDecrement]);

  // Alert system
  useEffect(() => {
    if (count === targetAlert) {
      // Trigger notification (handled in CounterDisplay)
      console.log('🎉 Target reached:', targetAlert);
    }
  }, [count, targetAlert]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        safeIncrement();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        safeDecrement();
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeIncrement, safeDecrement, reset]);

  return (
    <div className="container">
      <Header />
      <div className="dashboard">
        {/* Main Counter Section */}
        <div className="card main-card">
          <CounterDisplay
            count={count}
            minLimit={minLimit}
            maxLimit={maxLimit}
            isRunning={isRunning}
          />
          <Controls
            onIncrement={safeIncrement}
            onDecrement={safeDecrement}
            onReset={reset}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            autoDirection={autoDirection}
            setAutoDirection={setAutoDirection}
          />
        </div>

        {/* Step & Limits Control */}
        <div className="card settings-card">
          <StepController
            step={step}
            onStepChange={setStep}
            autoSpeed={autoSpeed}
            onAutoSpeedChange={setAutoSpeed}
            minLimit={minLimit}
            maxLimit={maxLimit}
            onMinLimitChange={setMinLimit}
            onMaxLimitChange={setMaxLimit}
            targetAlert={targetAlert}
            onTargetAlertChange={setTargetAlert}
          />
        </div>

        {/* Stats Panel */}
        <StatsPanel stats={stats} />

        {/* History */}
        <History history={history} />
      </div>
    </div>
  );
}

export default App;
