import { useState } from 'react';

function StepController({
  step,
  onStepChange,
  autoSpeed,
  onAutoSpeedChange,
  minLimit,
  maxLimit,
  onMinLimitChange,
  onMaxLimitChange,
  targetAlert,
  onTargetAlertChange
}) {
  const [tempStep, setTempStep] = useState(step);

  const handleStepPresets = (preset) => {
    onStepChange(preset);
    setTempStep(preset);
  };

  return (
    <div className="settings-panel">
      <div className="section-heading">
        <p className="eyebrow">Controls</p>
        <h2>Tune the counter</h2>
      </div>

      <div className="field-group">
        <div className="field-label-row">
          <label htmlFor="step-size">Step size</label>
          <span>{step}</span>
        </div>
        <div className="preset-grid">
          {[1, 5, 10, 100].map(preset => (
            <button
              key={preset}
              className={`preset-btn ${step === preset ? 'active' : ''}`}
              onClick={() => handleStepPresets(preset)}
            >
              {preset}
            </button>
          ))}
        </div>
        <input
          id="step-size"
          type="range"
          min="1"
          max="100"
          value={tempStep}
          onChange={(e) => {
            setTempStep(Number(e.target.value));
            onStepChange(Number(e.target.value));
          }}
          className="slider"
        />
      </div>

      <div className="field-group">
        <div className="field-label-row">
          <label htmlFor="auto-speed">Auto speed</label>
          <span>{autoSpeed}ms</span>
        </div>
        <input
          id="auto-speed"
          type="range"
          min="100"
          max="3000"
          value={autoSpeed}
          onChange={(e) => onAutoSpeedChange(Number(e.target.value))}
          className="slider"
        />
      </div>

      <div className="limit-grid">
        <div className="field-group">
          <label htmlFor="min-limit">Min limit</label>
          <input
            id="min-limit"
            type="number"
            value={minLimit}
            onChange={(e) => onMinLimitChange(Number(e.target.value))}
            className="input"
          />
        </div>
        <div className="field-group">
          <label htmlFor="max-limit">Max limit</label>
          <input
            id="max-limit"
            type="number"
            value={maxLimit}
            onChange={(e) => onMaxLimitChange(Number(e.target.value))}
            className="input"
          />
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="alert-target">Alert target</label>
        <input
          id="alert-target"
          type="number"
          value={targetAlert}
          onChange={(e) => onTargetAlertChange(Number(e.target.value))}
          className="input"
        />
      </div>
    </div>
  );
}

export default StepController;
