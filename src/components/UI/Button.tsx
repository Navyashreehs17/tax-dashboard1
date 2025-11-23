import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles = 'px-6 py-3 rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';
  
  const variantStyles = {
    primary: 'text-white focus:ring-purple-200 shadow-lg transition-all duration-300',
    secondary: 'bg-white text-slate-700 border-2 border-slate-200 hover:bg-slate-50 focus:ring-slate-200 hover:border-slate-300',
  };

  const primaryStyle = variant === 'primary' ? {
    background: '#C6AFFF',
    boxShadow: '0 4px 14px rgba(198, 175, 255, 0.4)',
  } : {};

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      style={primaryStyle}
      onMouseEnter={(e) => {
        if (variant === 'primary' && !disabled && !isLoading) {
          e.currentTarget.style.background = '#B89FEE';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(198, 175, 255, 0.5)';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary' && !disabled && !isLoading) {
          e.currentTarget.style.background = '#C6AFFF';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(198, 175, 255, 0.4)';
        }
      }}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};
