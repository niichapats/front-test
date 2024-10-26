"use client";

import { useAuth } from "@/components/authProvider";
import fetcher from "@/lib/fetcher";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import useSWR from "swr";

const QUEUE_API_URL = "/api/queue/";

export default function Home() {
  const router = useRouter()
  const auth = useAuth();
  const [queueDetails, setQueueDetails] = useState([]);
  const [loadingDetails, setLoadingDetails] = useState(true);

  // Initial fetch to get the list of queue IDs
  const { data: queueData, error: queueError, isLoading: isLoadingQueues } = useSWR(QUEUE_API_URL, fetcher);

  useEffect(() => {
      if (queueError?.status === 401) {
          router.replace('/business/login')
      }
  }, [auth, queueError]);

//   Fetch detailed data for each queue when queueData is available
  useEffect(() => {
      if (queueData && queueData.length > 0) {
          setLoadingDetails(true);
          Promise.all(
              queueData.map(queue =>
                  fetcher(`/api/queue/${queue.id}`).then(data => ({ ...queue, detail: data }))
              )
          )
          .then(details => {
              setQueueDetails(details);
              setLoadingDetails(false);
          })
          .catch(() => setLoadingDetails(false));
      }
  }, [queueData]);

  if (queueError) return <div>Failed to load queues</div>;
  if (isLoadingQueues || loadingDetails) return <div>Loading queues...</div>;

  return (
      <div>
          <h1>Queues</h1>
          <h2> { JSON.stringify(queueData) } </h2>
          {queueDetails.map((queue) => (
              <div key={queue.id}>
                  <h2>Queue ID: {queue.id}</h2>
                  {!queue.detail ? (
                      <p>Loading details...</p>
                  ) : (
                      <pre>{JSON.stringify(queue.detail, null, 2)}</pre>
                  )}
              </div>
          ))}
      </div>
  );
}