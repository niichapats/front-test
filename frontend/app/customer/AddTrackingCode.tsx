'use client'

import React, { useState } from 'react';

interface QueueInfo {
    business: string;
    id: number;
    name: string;
    queue: {
        id: number;
        name: string;
        estimated_time: number;
    };
    queue_ahead: number;
    status: string;
    time_in: string;
    time_out: string | null;
    tracking_code: string;
}

const AddTrackingCode: React.FC = () => {
    const [trackingCode, setTrackingCode] = useState<string>('');
    const [postedData, setPostedData] = useState<QueueInfo[]>([]);
    const [error, setError] = useState<string>('');

    const handleTrackingCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrackingCode(event.target.value);
    };

    const handleEnterClick = async (trackingCode: string) => {
        if (!trackingCode) {
            setError('Please enter a Tracking Code');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/customer/add-trackcode/${trackingCode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to add tracking code');
            }

            const data: QueueInfo[] = await response.json();
            setPostedData(data);
            setError('');
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while adding the tracking code');
        }
    };

    return (
        <>
            {/* Input Section */}
            <div className='mt-10 text-center'>
                <h1 className="text-3xl text-amber-700 font-semibold mt-10 ml-20 mr-10 ">Enter Tracking Code</h1>
            </div>
            <div className="text-center">
                <div className="join">
                    <input 
                        className="input input-bordered join-item border-stone-300 w-96 mt-10"
                        placeholder="Tracking Code" 
                        value={trackingCode}
                        onChange={handleTrackingCodeChange}
                    />
                    <button className="btn bg-amber-700 text-white join-item mt-10" onClick={() => handleEnterClick(trackingCode)}>Enter</button>
                </div>
            </div>

            {/* Error Message */}
            {error && 
                <div className="flex justify-center mt-5">
                <div className="text-red-500 text-lg font-semibold mb-5 ml-20 mr-20 bg-red-100 p-4 rounded-lg w-96">
                    <p>{error}</p>
                </div>
            </div>
            
            }

            {/* Display Queue Info after Button Click */}
            {postedData.length > 0 && (
                <div className='flex justify-center'>
                <div className="mt-10 ml-20 mr-20">
                    {postedData.map(item => (
                        <div key={item.id} className="mb-5 card bg-orange-50 p-6 rounded-lg shadow-lg w-96 h-96">
                            <div className="text-center">
                                <div>
                                    <h3 className="text-2xl text-orange-900 font-semibold">
                                        {item.business} ({item.name})
                                        <br />
                                        <br />
                                    </h3>
                                    <h1 className="text-9xl text-orange-900">
                                        {item.queue_ahead}
                                    </h1>
                                    <p className="text-base text-orange-900 font-semibold">
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
            )}
        </>
    );
};

export default AddTrackingCode;
