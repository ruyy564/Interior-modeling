import React from 'react';

export default function Input({ type, placeholder, icon, name }) {
  return (
    <div className={'input-wrapper'}>
      <input
        className={'auth-input'}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      <label htmlFor={name}>{placeholder}</label>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
  );
}
