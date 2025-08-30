import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  required = false,
  disabled = false,
  error,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          block w-full px-3 py-2 
          border rounded-lg 
          shadow-sm 
          placeholder-gray-400 
          focus:outline-none 
          focus:ring-2 
          focus:ring-primary-500 
          focus:border-primary-500
          disabled:opacity-50 
          disabled:cursor-not-allowed
          dark:bg-gray-800 
          dark:border-gray-600 
          dark:text-gray-100
          ${error ? 'border-error-500 focus:ring-error-500 focus:border-error-500' : 'border-gray-300 dark:border-gray-600'}
        `}
      />
      {error && (
        <p className="text-sm text-error-500">{error}</p>
      )}
    </div>
  );
};