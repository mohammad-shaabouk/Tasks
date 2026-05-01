// src/components/Content.jsx
// Renders the list of Part components separated by Divider lines.
// Computes the maximum exercise count to pass down for progress bars.

import Part from './Part';
import Divider from './Divider';

const Content = ({ parts }) => {
  const maxExercises = Math.max(...parts.map(p => p.exercises));

  return (
    <div className="course-content">
      {parts.map((part, i) => (
        <div key={part.name}>
          <Part
            part={part}
            index={i}
            maxExercises={maxExercises}
            isTop={part.exercises === maxExercises}
          />
          {i < parts.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
};

export default Content;
