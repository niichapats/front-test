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
              <div key={item.id} className="mb-10 text-center">
                <h3 className="text-2xl font-semibold mb-5 text-blue-950">
                  {item.business}
                </h3>

                <div className="flex justify-center mt-10">
                  <div className="flex flex-row space-x-4 w-full max-w-4xl">
                    {/* First box */}
                    <div className="flex-auto bg-cyan-100 p-4 rounded-lg shadow-lg">
                      <h3 className="text-center text-xl font-semibold">{item.name}</h3>
                    </div>

                    {/* Second box */}
                    <div className="flex-auto bg-teal-100 p-4 rounded-lg shadow-lg">
                      <h3 className="text-center text-xl font-semibold">{item.status}</h3>
                    </div>
                  </div>
                </div>

                <div className="card-auto p-6 rounded-lg shadow-lg mt-10 bg-lightPurple2 ">
                  <div className="text-center">
                    <h1 className="text-9xl text-darkPurple">
                      {item.queue_ahead}
                    </h1>
                    <p className="text-l font-semibold text-darkPurple">
                      Ahead of you
                    </p>
                  </div>
                </div>
                <div className="flex-auto-48 p-6 rounded-lg shadow-lg bg-lightPurple1 mt-10">
                      <p className="text-l text-pink-900 font-semibold">
                        Time In: {item.time_in}
                      </p>
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
}  

export default CustomerPage;
