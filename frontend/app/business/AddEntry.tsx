'use client'
import React, { useState, useEffect } from 'react'

const AddEntry = ({ business_data }) => {
  const [selectedQueue, setSelectedQueue] = useState('');
  const [trackingCode, setTrackingCode] = useState(null);

  useEffect(() => {
    if (trackingCode !== null) {
      console.log("Updated tracking code:", trackingCode);
    }
  }, [trackingCode]);

  const handleSelectedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQueue(event.target.value);
  }

  const handleAddClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (selectedQueue) {
      console.log('Selected Queue id:', selectedQueue)
      await handleSubmit(parseInt(selectedQueue, 10))
    } else {
      console.log('No selected')
    }
  }

  const handleSubmit = async (queueId: number) => {
    try {
      const response = await fetch(`/api/queue/${queueId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        console.log("Failed to add entry")
        return
      }

      const data = await response.json()
      console.log("Response:", data)
      setTrackingCode(data.tracking_code)
    } catch (error) {
      console.log("Error adding entry:", error)
    }
  };

  return (
    <>
        {trackingCode && (
          <div role="alert" className="alert shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <div className='flex space-x-6'>
            <h3 className="font-bold">Tracking Code</h3>
            <h3 className="font-bold text-red-500">{trackingCode}</h3>
          </div>
        </div>
        )}
      <div className='flex justify-between py-6'>
        <select className="select select-bordered w-100 h-26" onChange={handleSelectedChange}>
          {business_data.map(business => (
            <option key={business.id} value={business.id}>{business.name}</option>
          ))}
        </select>
        <div className="card-actions justify-end">
          <button className='btn h-26' onClick={handleAddClick}>
            Add
          </button>
        </div>
      </div>
    </>
  )
}

export default AddEntry;
