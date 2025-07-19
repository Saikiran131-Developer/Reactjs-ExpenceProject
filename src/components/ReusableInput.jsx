import React from 'react';

const ReusableInput = ({ value, onChange, type = 'text', placeholder = '', className = '' }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input ${className}`}
    />
  );
};

export default ReusableInput;
