import React from 'react';

export default function Button({ value, className }) {
  return <button className={`auth-btn ${className}`}>{value}</button>;
}
