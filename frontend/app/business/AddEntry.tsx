'use client'
import React from 'react'
import { useState } from 'react'

const AddEntry = ({business_data}) => {
  const [selectedQueue, setselectedQueue] = useState('');

  const handleSelectedChange = (event) => {
    setselectedQueue(event.target.value);
  }

  const handleAddClick = async () => {
    if (selectedQueue) {
      console.log('Selected Queue id:', selectedQueue);
    }
    else {
      console.log('No selected');
    }
  }
    return (
    <div>
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