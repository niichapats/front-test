import React from 'react'
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const ENTRY_API_URL = (queueID) => `http://127.0.0.1:8000/api/business/get_entry/${queueID}`;

const RunQueue = ({queue}) => {
  const queueId = queue.id
  console.log('Queue ID: ', queueId);
  const { data: entry, error: entryError } = useSWR(queueId ? ENTRY_API_URL(queueId) : null, fetcher);

  if (entryError) return <div>Failed to load entries</div>;
  if (!entry) return <div>Loading entries...</div>;

  console.log('Entry: ', entry);
  console.log(Array.isArray(entry));
  return (
    <>
      {entry.length > 0 ? (
      entry.map((e) => (
        <h4>{e.name}</h4>
      ))
    ) : (
      <h4 className="card-body">No entries found</h4>
    )}
    </>
  )
}

export default RunQueue