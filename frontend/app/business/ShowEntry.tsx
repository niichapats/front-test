'use client'

import AddEntry from "./AddEntry";
import AddQueue from "./AddQueue";
import RunQueue from "./RunQueue";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const QUEUE_API_URL = "/api/queue/";


const BusinessPage = () => {
  // Initial fetch to get the list of queue IDs
  const { data: queue, error: queueError } = useSWR(QUEUE_API_URL, fetcher);
  if (queueError) return <div>Failed to load queues</div>;
  if (!queue) return <div>Loading queues...</div>;

  // Ensure business_data is an array
  console.log(queue);
  console.log(Array.isArray(queue));

    // const res = await fetch('http://127.0.0.1:8000/api/business/queue/');
    // const business_data = await res.json();
    // console.log(business_data);
    // console.log(Array.isArray(business_data));
  return (
    <>
      <div className="px-4 md:px-8 lg:px-12 bg-[#FEF9F2] min-h-screen">
        <div className="grid grid-cols-5 gap-4 w-full">
          <div className="card bg-base-100 shadow-xl col-span-3 h-76 overflow-hidden w-full bg-[#D1E9F6]">
            <div className="card-body">
            <h1 className="card-title text-xl">Add Entry</h1>
            <AddEntry business_data={queue}/>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl col-span-2 h-76 overflow-hidden w-full bg-[#D2E0FB]">
            <div className="card-body">
            <h1 className="card-title text-xl">Estimate Time</h1>
            </div>
          </div>
        </div>
        <div className="pt-6"/>
         <div className="card bg-base-100 w-full shadow-xl bg-[#BFECFF]">
          <div className="card-body">
            <div className="card-title justify-between">
              <h2>All Queue</h2>
              <AddQueue/>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {queue.map(q => (
                <div className="card bg-base-100 max-w-md h-100 shadow-xl" key={q.id}>
                  <div className="card-body">
                    <h2 className="card-title">{q.name}</h2>
                    {/* <h4 className="card-body">{q.name}</h4> */}
                    <RunQueue queue={q}/>
                  </div>
                </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessPage