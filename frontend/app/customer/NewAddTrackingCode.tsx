'use client';
import React, { useState } from 'react';

const NewAddTrackingCode: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState('');

  const handleTrackingCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTrackingCode(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (trackingCode) {
      // Redirect to the new page with tracking code in the URL
      window.location.href = `/customer/${trackingCode}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-center mt-20">
      <h1 className="text-3xl font-semibold mt-30" style={{ color: '#ae9ce6' }}>Enter Tracking Code</h1>
      <div className="mt-10">
        <input
          type="text"
          placeholder="Tracking Code"
          value={trackingCode}
          onChange={handleTrackingCodeChange}
          className="input input-bordered border-stone-300 w-96"
        />
        <button type="submit" className="btn text-white ml-3" style={{ background: '#dbb8ed' }}>
          Enter
        </button>
      </div>
    </form>
  );
};

export default NewAddTrackingCode;
