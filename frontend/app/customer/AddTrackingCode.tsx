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
    const [postedData, setPostedData] = useState<QueueInfo[]>([]); // Change to an array
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

            const data: QueueInfo[] = await response.json(); // Expecting an array
            setPostedData(data);  // Set posted data when successfully fetched
            setError(''); // Clear any previous errors
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while adding the tracking code');
        }
    };

    return (
        <>
            {/* Input Section */}
            <div className="join">
                <h1 className="text-3xl text-amber-700 font-semibold mt-10 ml-20 mr-10">Enter Tracking Code</h1>
                <input 
                    className="input input-bordered join-item border-stone-300 w-96 mt-10"
                    placeholder="Tracking Code" 
                    value={trackingCode}
                    onChange={handleTrackingCodeChange}
                />
                <button className="btn bg-amber-700 text-white join-item mt-10" onClick={() => handleEnterClick(trackingCode)}>Enter</button>
            </div>

            {/* Error Message */}
            {error && 
                <div className="text-red-500 text-lg font-semibold mt-5 mb-5 ml-20 mr-20 flex items-center justify-center bg-red-100 p-4 rounded-lg">
                    <p>{error}</p>
                </div>
            }

            {/* Display Queue Info after Button Click */}
            {postedData.length > 0 && ( // Check if postedData has items
                <div className="mt-10 ml-20 mr-20">
                    {postedData.map(item => ( // Use map to display each item
                        <div key={item.id} className="mb-5 card bg-orange-50 p-6 rounded-lg shadow-lg w-full">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-xl text-orange-900 font-semibold">
                                        {item.business} ({item.name})
                                    </h3>
                                    <p className="text-sm text-orange-700 font-semibold">
                                        Time In: {item.time_in}, Time Out: {item.time_out || 'N/A'}
                                    </p>
                                    <p className="text-sm text-orange-500 font-semibold">
                                        Status: {item.status}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default AddTrackingCode;
