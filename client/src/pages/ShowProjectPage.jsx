import React from 'react';
import { useParams } from 'react-router-dom';
export default function ShowProjectPage() {
  const { id } = useParams();

  return (
    <div>
      <h2>ShowProjectPage</h2>
    </div>
  );
}
