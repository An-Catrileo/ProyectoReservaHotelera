import React from 'react';

export default function Radio({ id, name, value, checked, onChange, className = '' }) {
  return (
    <input
      id={id}
      name={name}
      type="radio"
      value={value}
      checked={checked}
      onChange={onChange}
      className={`h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500 ${className}`}
    />
  );
} 