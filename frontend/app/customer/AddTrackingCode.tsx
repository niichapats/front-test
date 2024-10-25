'use client'

import React from 'react'
import { useState } from 'react'

const AddTrackingCode = () => {
    const [TrackingCode, setTrackingCode] = useState('');

    const handleTrackingCodeChange = (event) => {
        setTrackingCode(event.target.value);
    }

    const handleEnterClick = async () => {
        if (TrackingCode) {
            console.log('Tracking Code:', TrackingCode);
        }
        else {
            console.log('Not have Tracking Code');
        }
    }
  return (
    <>
        <div className="join">
            <input className="input input-bordered join-item w-96" 
            placeholder="Tracking Code" 
            value={TrackingCode} onChange={handleTrackingCodeChange}/>
            <button className="btn join-item" onClick={handleEnterClick}>Enter</button>
        </div>
    </>
  )
}

export default AddTrackingCode