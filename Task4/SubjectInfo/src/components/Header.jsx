// src/components/Header.jsx
// Displays the course name in a large display-serif typeface with an
// animated gradient underline and an eyebrow label above.

const Header = ({ courseName }) => (
  <header className="course-header">
    <p className="header-eyebrow">Course Overview</p>
    <h1 className="course-title header-title">
      <span className="title-icon">📘</span>
      {courseName}
    </h1>
    <span className="header-underline" aria-hidden="true" />
  </header>
);

export default Header;
