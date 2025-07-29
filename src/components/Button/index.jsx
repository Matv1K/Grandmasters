import React from 'react';
import styles from './style.module.css';

function Button({ 
  children, 
  onClick, 
  type = 'button',
  disabled = false,
  className = '',
  ...props 
}) {
  const buttonClasses = [
    styles.button,
    disabled && styles.disabled,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button; 