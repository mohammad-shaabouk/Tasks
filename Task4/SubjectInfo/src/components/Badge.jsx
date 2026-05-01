// src/components/Badge.jsx
// Pill-shaped label for exercise counts and "Most Exercises" tags.
// `variant` prop switches between default (blue) and "top" (cyan) styles.

const Badge = ({ children, variant = 'default' }) => {
  const className = variant === 'top' ? 'badge badge-top' : 'badge';
  return <span className={className}>{children}</span>;
};

export default Badge;
