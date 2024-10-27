import React from 'react'
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import { useState } from 'react';

const ENTRY_API_URL = (queueID) => `http://127.0.0.1:8000/api/business/get_entry/${queueID}`;

const RunQueue = ({queue}) => {
  const [selectedEntry, setSelectedEntry] = useState('');
  const queueId = queue.id
  console.log('Queue ID: ', queueId);
  const { data: entry, error: entryError } = useSWR(queueId ? ENTRY_API_URL(queueId) : null, fetcher);

  if (entryError) return <div>Failed to load entries</div>;
  if (!entry) return <div>Loading entries...</div>;

  console.log('Entry: ', entry);
  console.log(Array.isArray(entry));

  const handleCompleteClick = async (entryId: number) => {
    console.log('Selected Entry id:', entryId);
    
    try {
      console.log('Mimmmmmmmm')
      const response = await fetch(`/api/entry/${entryId}`, { // Adjusted URL as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('chompoooooooooooo')
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to run queue:", errorData);
        return;
      }
  
      const data = await response.json();
      console.log("Response:", data);
  
    } catch (error) {
      console.error("Error completing entry:", error);
    }
  };


  return (
    <>
    {/* <div className='overflow-y-auto'> */}
      {entry.length > 0 ? (
        entry.map((e, index) => (
          <div className='flex justify-between' key={`${e.id}-${index}`}>
            <h4 className='pt-4'>{e.name}</h4>
            <div className="dropdown dropdown-right" key={e.id}>
              <div tabIndex={0} role="button" className="btn m-1">{e.status}</div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow">
                <li><button onClick={() => handleCompleteClick((parseInt(e.id, 10)))}>complete</button></li>
                <li><button>cancel</button></li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <h4 className="card-body">No entries found</h4>
      )}
    {/* </div> */}
    </>
  )
}

export default RunQueue