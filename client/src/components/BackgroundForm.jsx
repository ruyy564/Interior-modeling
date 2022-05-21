import React from 'react';

export default function BackgroundForm({ type }) {
  return (
    <div className={`shape-form ${type}`}>
      <div className={'shape'}></div>
      <div className={'shape'}></div>
    </div>
  );
}
