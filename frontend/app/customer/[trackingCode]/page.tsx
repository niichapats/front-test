'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const CustomerPage: React.FC = () => {
  const { trackingCode } = useParams();
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (trackingCode) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/entry/add-tracking-code/${trackingCode}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }

          const result = await response.json();
          setData(Array.isArray(result) ? result : [result]);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('An error occurred while fetching data');
        }
      } else {
        setError('Tracking code is not defined in the URL');
      }
    };

    fetchData();
  }, [trackingCode]);

  if (error) return <div>{error}</div>;

  return (
    <div>
      {data.length > 0 ? (
        <div className="flex justify-center">
          <div className="mt-10 ml-20 mr-20">
            {data.map(item => (
              <div key={item.id} className="mb-5 card p-6 rounded-lg shadow-lg w-96 h-96" style={{ background: '#f9f7d9' }}>
                <div className="text-center">
                  <div>
                    <h3 className="text-2xl font-semibold" style={{ color: '#9c4a05' }}>
                      {item.business} ({item.name})
                      <br />
                      <br />
                    </h3>
                    <h1 className="text-9xl" style={{ color: '#9e7207' }}>
                      {item.queue_ahead}
                    </h1>
                    <p className="text-base text-orange-900 font-semibold" style={{ color: '#9e7207' }}>
                      Ahead of you
                    </p>
                    <p className="text-base text-orange-700 font-semibold">
                      <br />
                      <br />
                      Time In: {item.time_in}
                    </p>
                    <p className="text-base text-orange-500 font-semibold">
                      Status: {item.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CustomerPage;
