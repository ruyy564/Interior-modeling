import React from 'react';

export default function Input({ type, placeholder, icon, name, formHandler }) {
  return (
    <div className={'input-wrapper'}>
      {
        <input
          className={'auth-input'}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={formHandler}
        />
      }
      <label htmlFor={name}>{placeholder}</label>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
  );
}
