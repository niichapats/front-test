'use client'

import React from 'react'
import { useState } from 'react'

const AddQueue = () => {
  const [newQueue, setnewQueue] = useState('');
  const [newAlphabet, setnewAlphabet] = useState('');

  const handleQueueChange = (event) => {
    setnewQueue(event.target.value);
  }

  const handleAlphabetChange = (event) => {
    setnewAlphabet(event.target.value);
  }

  const handleAddClick = () => {
    if (newQueue && newAlphabet) {
      console.log('New Queue:', newQueue);
      console.log('New Alphabet', newAlphabet);
    }
    else {
      console.log('No queue added');
    }
  }
  return (
    <>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Add Queue</h3>
            <br></br>
            <label className="input input-bordered flex items-center gap-2">
            Queue Name
            <input type="text" 
                  className="grow" 
                  placeholder="Dining" 
                  value={newQueue} onChange={handleQueueChange} />
            </label>
            <br></br>
            <label className="input input-bordered flex items-center gap-2">
            Alphabet
            <input type="text" 
                  className="grow" 
                  placeholder="A" 
                  value={newAlphabet} onChange={handleAlphabetChange}/>
            </label>
            <br></br>
            <button className='btn btn-primary' onClick={handleAddClick}>Add</button>
        </div>
        </dialog>
    </>
  )
}

export default AddQueue