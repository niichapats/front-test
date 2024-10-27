'use client'

import React from 'react'
import { useState } from 'react'

const AddQueue = () => {
  const [newQueue, setnewQueue] = useState('');
  const [newAlphabet, setnewAlphabet] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      closeModal();
    }
    else {
      console.log('No queue added');
    }
  }
  const openModal = () => {
    setIsModalOpen(true);
    const modal = document.getElementById('my_modal_3');
    if (modal) {
        modal.showModal();
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setnewQueue('');
    setnewAlphabet('');
  }
  return (
    <>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
            <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" >
              ✕
            </button>
            </form>
            <h3 className="font-bold text-lg">Add Queue</h3>
            <br></br>
            <label className="input input-bordered flex items-center gap-2">
            Queue Name
            <input type="text" 
                  className="grow font-light" 
                  placeholder="Dining" 
                  value={newQueue} onChange={handleQueueChange} />
            </label>
            <br></br>
            <label className="input input-bordered flex items-center gap-2">
            Alphabet
            <input type="text" 
                  className="grow font-light" 
                  placeholder="A" 
                  value={newAlphabet} onChange={handleAlphabetChange}/>
            </label>
            <br></br>
            <form method="dialog">
              <button className='btn btn-primary' onClick={handleAddClick}>Add</button>
            </form>
        </div>
        </dialog>
        <button className="btn" onClick={openModal}>
        <svg xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="size-6">
          <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        </svg>
          Add Queue
        </button>
    </>
  )
}

export default AddQueue