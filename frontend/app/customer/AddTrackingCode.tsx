'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import fetcher from "@/lib/fetcher";

interface QueueEntry {
    model: string;
    id: number;
    fields: {
        name: string;
        queue: number;
        business: number;
        tracking_code: string;
        time_in: string;
        time_out: string | null;
        status: string;
    };
}


const AddTrackingCode: React.FC = () => {
    const [trackingCode, setTrackingCode] = useState<string>('');
    const [postedData, setPostedData] = useState<QueueEntry | null>(null);
    const [error, setError] = useState<string>('');

    const { data: queueEntries, error: fetchError } = useSWR('http://127.0.0.1:8000/api/customer/all-my-entries/', fetcher);
    if (fetchError) return <div>Failed to load queues</div>;
    if (!queueEntries) return <div>Loading queues...</div>;

    const handleTrackingCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrackingCode(event.target.value);
    };

    const handleEnterClick = async () => {
        console.log("Token:", localStorage.getItem("token")); 
        if (!trackingCode) {
            setError('Please enter a Tracking Code');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/customer/add-trackcode/${trackingCode}/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tracking_code: trackingCode }),
            });

            if (!response.ok) {
                throw new Error('Failed to add tracking code');
            }

            const data = await response.json();
            setPostedData(data);
            setTrackingCode('');
            setError('');

        } catch (error) {
            setError('An error occurred while adding the tracking code');
        }
    };

    const handleCancelClick = async () => {
        try {
            const response = await fetch(`/api/customer/cancel/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tracking_code: trackingCode }),
            });

            if (!response.ok) {
                throw new Error('Failed to add tracking code');
            }

        } catch (error) {
            setError('An error occurred while canceling the queue entry.');
        }
    };

    return (
        <>
            <div className="join">
                <h1 className="text-3xl text-amber-700 font-semibold mt-10 ml-20 mr-10">Enter Tracking Code</h1>
                <input 
                    className="input input-bordered join-item border-stone-300 w-96 mt-10"
                    placeholder="Tracking Code" 
                    value={trackingCode}
                    onChange={handleTrackingCodeChange}
                />
                <button className="btn bg-amber-700 text-white join-item mt-10" onClick={handleEnterClick}>Enter</button>
            </div>

            {/* Display error message */}
            {error && 
                <div className="text-red-500 text-lg font-semibold mt-5 mb-5 ml-20 mr-20 flex items-center justify-center bg-red-100 p-4 rounded-lg">
                    <p>{error}</p>
                </div>
            }

            {/* Display posted data */}
            {postedData && (
                <div className="mt-5 ml-20 mr-20">
                    <h2 className="text-xl font-semibold">Tracking Code Submitted:</h2>
                    <p>Business: {postedData.fields.business}</p>
                    <p>Name: {postedData.fields.name}</p>
                    <p>Status: {postedData.fields.status}</p>
                    <p>Time In: {postedData.fields.time_in}</p>
                </div>
            )}

            {/* Display Queue Entries */}
            {queueEntries && queueEntries.length > 0 && (
                <div className="mt-10 ml-20 mr-20">
                    {queueEntries.map((queueInfo: QueueEntry) => (
                        <div key={queueInfo.id} className="mb-5 card bg-orange-50 p-6 rounded-lg shadow-lg w-full">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-xl text-orange-900 font-semibold">
                                        {queueInfo.business} ({queueInfo.name})
                                    </h3>
                                    <p className="text-sm text-orange-700 font-semibold">
                                        Time In: {queueInfo.time_in}, Time Out: {queueInfo.time_out || 'N/A'}
                                    </p>
                                    <p className="text-sm text-orange-500 font-semibold">
                                        Status: {queueInfo.status}
                                    </p>
                                </div>

                                <div className="flex items-center">
                                    {/* Cancel button */}
                                    <button className="btn bg-red-600 text-white" onClick={() => handleCancelClick(queueInfo.id)}>
                                        Cancel
                                    </button>
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
