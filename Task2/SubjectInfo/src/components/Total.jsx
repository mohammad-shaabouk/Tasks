// src/components/Total.jsx
// Displays the sum of all exercises in a large gradient numeral.
// Separated from the parts list by the card's bottom border stripe.

const Total = ({ parts }) => {
  const total = parts.reduce((sum, p) => sum + p.exercises, 0);

  return (
    <footer className="total-section">
      <span className="total-label">Total exercises</span>
      <div className="total-divider" aria-hidden="true" />
      <div className="total-number-wrap">
        <span className="total-number">{total}</span>
        <span className="total-unit">ex.</span>
      </div>
    </footer>
  );
};

export default Total;
