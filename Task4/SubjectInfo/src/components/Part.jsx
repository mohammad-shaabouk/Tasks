// src/components/Part.jsx
// Displays a single course part with its name, exercise count badge,
// a progress bar relative to the maximum exercises, and a "Most Exercises"
// badge if this part has the highest count.

import Badge from './Badge';

const Part = ({ part, index, maxExercises, isTop }) => {
  const pct = maxExercises > 0 ? part.exercises / maxExercises : 0;

  return (
    <div className={`part-item${isTop ? ' highlight' : ''}`}>
      <div className="part-left">
        <span className="part-index">{String(index + 1).padStart(2, '0')}</span>
        <span className="part-name">{part.name}</span>
        {isTop && <Badge variant="top">Peak</Badge>}
      </div>

      <div className="part-right">
        <div className="progress-wrap" title={`${part.exercises} exercises`}>
          <div
            className="progress-fill"
            style={{ width: `${Math.round(pct * 100)}%` }}
          />
        </div>
        <Badge>{part.exercises} ex.</Badge>
      </div>
    </div>
  );
};

export default Part;
