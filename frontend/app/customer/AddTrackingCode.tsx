'use client';

import React, { useState } from 'react';

interface QueueEntry {
    business: string;
    queueName: string;
    date: string;
    time: string;
    status: string;
    numberOfEntriesBefore: number;
}

const AddTrackingCode: React.FC = () => {
    const [trackingCode, setTrackingCode] = useState<string>('');
    const [queueEntries, setQueueEntries] = useState<QueueEntry[]>([]);
    const [error, setError] = useState<string>('');

    const handleTrackingCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrackingCode(event.target.value);
    }

    const handleEnterClick = async () => {
        if (trackingCode) {
            const mockData: Record<string, QueueEntry> = {
                "abc123": {
                    business: "Mim & Friends",
                    queueName: "B7-Medium",
                    date: "Oct. 21, 2024",
                    time: "4:00 PM",
                    status: "waiting",
                    numberOfEntriesBefore: 5
                },
                "def456": {
                    business: "Chompoo & Friends",
                    queueName: "C4-Big",
                    date: "Oct. 21, 2024",
                    time: "4:35 PM",
                    status: "waiting",
                    numberOfEntriesBefore: 3
                },
                "xyz123": {
                    business: "Sushiro",
                    queueName: "A12-Counter",
                    date: "Oct. 21, 2024",
                    time: "4:44 PM",
                    status: "waiting",
                    numberOfEntriesBefore: 7
                }
            };

            const queueDetails = mockData[trackingCode];

            if (queueDetails) {
                const entryExists = queueEntries.some(entry => entry.queueName === queueDetails.queueName);

                if (!entryExists) {
                    setQueueEntries([...queueEntries, queueDetails]);
                    setError('');
                    setTrackingCode('');
                } else {
                    setError('This queue entry already exists.');
                }
            } else {
                setError('Invalid Tracking Code');
            }
        } else {
            setError('Please enter a Tracking Code');
        }
    };

    const handleCancelClick = (index: number) => {
        const updatedQueueEntries = queueEntries.filter((_, i) => i !== index);
        setQueueEntries(updatedQueueEntries);
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
                <div className="mt-10">
                    {queueEntries.map((queueInfo, index) => (
                        <div key={index} className="mb-5 ml-20 mr-20 bg-orange-50 p-6 rounded-lg shadow-lg flex items-center justify-between">
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
                    ))}
                </div>
            )}
        </>
    );
};

export default AddTrackingCode;
