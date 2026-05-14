// src/components/CourseCard.jsx
// Glass-morphism card wrapper that groups Header, Content, and Total.
// All visual card styling (blur, border, shadow) lives on this element.

import Header from './Header';
import Content from './Content';
import Total from './Total';

const CourseCard = ({ course }) => (
  <article className="course-card" aria-label={`Course: ${course.name}`}>
    <Header courseName={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </article>
);

export default CourseCard;
