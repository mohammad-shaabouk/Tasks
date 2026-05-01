function Controls({
  onIncrement,
  onDecrement,
  onReset,
  isRunning,
  setIsRunning,
  autoDirection,
  setAutoDirection
}) {
  const toggleAuto = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="controls" aria-label="Counter controls">
      <button className="btn btn-success btn-primary-action" onClick={onIncrement}>
        <span className="btn-symbol">+</span>
        Increment
      </button>
      <button className="btn btn-danger btn-primary-action" onClick={onDecrement}>
        <span className="btn-symbol">-</span>
        Decrement
      </button>

      <div className="control-strip">
        <button
          className={`btn ${isRunning ? 'btn-danger' : 'btn-success'}`}
          onClick={toggleAuto}
        >
          {isRunning ? 'Stop Auto' : 'Start Auto'}
        </button>

        <select
          value={autoDirection}
          onChange={(e) => setAutoDirection(e.target.value)}
          className="input"
          disabled={!isRunning}
          aria-label="Auto count direction"
        >
          <option value="up">Up</option>
          <option value="down">Down</option>
        </select>
      </div>

      <button className="btn btn-warning" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default Controls;
