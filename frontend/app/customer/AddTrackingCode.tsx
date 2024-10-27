'use client';

import React, { useState } from 'react';

interface QueueEntry {
    model: string;
    pk: number;
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
    const [queueEntries, setQueueEntries] = useState<QueueEntry[]>([]);
    const [error, setError] = useState<string>('');

    const handleTrackingCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrackingCode(event.target.value);
    };

    const handleEnterClick = async () => {
        if (trackingCode) {
            try {
                // API: Fetch entries without using trackingCode
                const response = await fetch('http://127.0.0.1:8000/api/customer/all-my-entries');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                console.log(data)

                if (data && Array.isArray(data)) {
                    const entryExists = data.some((entry: QueueEntry) => entry.fields.tracking_code === trackingCode);

                    if (!entryExists) {
                        setError('Invalid Tracking Code');
                    } else {
                        setQueueEntries(data);
                        setError('');
                        setTrackingCode('');
                    }
                } else {
                    setError('No entries found.');
                }
            } catch (error) {
                console.error('Error fetching queue details:', error);
                setError('An error occurred while fetching queue details: ' + error.message)
            }
        } else {
            setError('Please enter a Tracking Code');
        }
    };

    const handleCancelClick = async (index: number) => {
        const queueEntry = queueEntries[index];
    
        try {
            const response = await fetch('/api/customer/cancel/${queueEntry.pk}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to cancel entry');
            }
    
            const updatedQueueEntries = queueEntries.filter((_, i) => i !== index);
            setQueueEntries(updatedQueueEntries);
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

            {/* Display Queue Entries */}
            {queueEntries.length > 0 && (
                <div className="mt-10 ml-20 mr-20">
                    {queueEntries.map((queueInfo, index) => (
                        <div key={index} className="mb-5 card bg-orange-50 p-6 rounded-lg shadow-lg w-full">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-xl text-orange-900 font-semibold">
                                        {queueInfo.business} ({queueInfo.queueName})
                                    </h3>
                                    <p className="text-sm text-orange-700 font-semibold">
                                        Date: {queueInfo.date}, {queueInfo.time}
                                    </p>
                                    <p className="text-sm text-orange-500 font-semibold">
                                        Status: {queueInfo.status}
                                    </p>
                                </div>

                                <div className="flex items-center">
                                    {/* Number of entries ahead */}
                                    <div className="bg-orange-500 text-white font-bold py-2 px-4 rounded-md shadow-md mr-4">
                                        <p>{queueInfo.numberOfEntriesBefore} ahead of you</p>
                                    </div>
                                    
                                    {/* Cancel button */}
                                    <button className="btn bg-red-600 text-white" onClick={() => handleCancelClick(index)}>
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
