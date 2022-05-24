import React from 'react';

export default function Button({ value, className, onClick }) {
  return (
    <button onClick={onClick} className={`auth-btn ${className}`}>
      {value}
    </button>
  );
}
