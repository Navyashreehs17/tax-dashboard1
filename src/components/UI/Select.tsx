import React, { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
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
      <div className="relative">
        <select
          className={`w-full px-5 py-3.5 border ${
            error ? 'border-red-400' : 'border-slate-200'
          } rounded-xl focus:outline-none transition-all duration-200 text-slate-900 font-normal appearance-none cursor-pointer ${className}`}
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
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
};
