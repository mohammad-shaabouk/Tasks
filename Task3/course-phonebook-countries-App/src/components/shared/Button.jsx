const Button = ({
  children,
  className = '',
  icon,
  variant = 'primary',
  type = 'button',
  ...props
}) => (
  <button className={`button button--${variant} ${className}`} type={type} {...props}>
    {icon && <span className="button__icon" aria-hidden="true">{icon}</span>}
    <span>{children}</span>
  </button>
)

export default Button
