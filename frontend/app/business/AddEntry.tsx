'use client'
import React from 'react'
import { useState } from 'react'

const AddEntry = ({business_data}) => {
  const [selectedQueue, setselectedQueue] = useState('');

  const handleSelectedChange = (event) => {
    setselectedQueue(event.target.value);
  }

  const handleAddClick = async (e) => {
    e.preventDefault();
    if (selectedQueue) {
      console.log('Selected Queue id:', selectedQueue);
      await handleSubmit();
    }
    else {
      console.log('No selected');
    }
  }

  const handleSubmit = async (e) => {
    const formData = {
      queue_id: selectedQueue
    }

    const response = await fetch('http://127.0.0.1:8000/api/business/add_customer/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json();

    if(response.ok) {
      console.log('Success: ', data)
    }
    else {
      console.error('Error:', data)
    }
  }
    return (
    <div className=' flex justify-between'>
      <select className="select select-bordered w-100" onChange={handleSelectedChange}>
        {business_data.map(business => <option key={business.id} value={business.id}>{business.name}</option>)}
      </select>
      <div className="card-actions justify-end">
        <button className='btn btn-primary' onClick={handleAddClick}>
          Add
        </button>
      </div>
    </div>
  )
}

export default AddEntry