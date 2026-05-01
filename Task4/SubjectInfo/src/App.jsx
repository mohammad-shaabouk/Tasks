// src/App.jsx
// Root component — holds the course data and renders CourseCard.

import CourseCard from './components/CourseCard';

const course = {
  name: 'Half Stack Application Development',
  parts: [
    { name: 'Fundamentals of React',   exercises: 10 },
    { name: 'Using Props to Pass Data', exercises: 7  },
    { name: 'State of a Component',    exercises: 14 },
    { name: 'Deeper State Concepts',   exercises: 11 },
  ],
};

const App = () => (
  <main>
    <CourseCard course={course} />
  </main>
);

export default App;
