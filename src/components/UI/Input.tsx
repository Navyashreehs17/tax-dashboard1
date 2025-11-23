import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-bold text-slate-800 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-5 py-3.5 border ${
          error ? 'border-red-400' : 'border-slate-200'
        } rounded-xl focus:outline-none transition-all duration-200 text-slate-900 font-normal placeholder:text-slate-400 ${className}`}
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#C6AFFF';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(198, 175, 255, 0.15)';
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = '#E5E7EB';
          e.currentTarget.style.boxShadow = 'none';
        }}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};
