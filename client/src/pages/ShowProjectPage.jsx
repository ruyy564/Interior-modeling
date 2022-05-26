import React, { useSearchParams } from 'react';

export default function ShowProjectPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get('id'));
  return (
    <div>
      <h2>ShowProjectPage</h2>
    </div>
  );
}
