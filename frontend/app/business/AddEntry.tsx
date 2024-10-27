'use client'
import React, { useState } from 'react'

const AddEntry = ({ business_data }) => {
  const [selectedQueue, setSelectedQueue] = useState('');

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
    } catch (error) {
      console.log("Error adding entry:", error)
    }
  };

  return (
    <div className='flex justify-between'>
      <select className="select select-bordered w-100" onChange={handleSelectedChange}>
        {business_data.map(business => (
          <option key={business.id} value={business.id}>{business.name}</option>
        ))}
      </select>
      <div className="card-actions justify-end">
        <button className='btn btn-primary' onClick={handleAddClick}>
          Add
        </button>
      </div>
    </div>
  )
}

export default AddEntry;
