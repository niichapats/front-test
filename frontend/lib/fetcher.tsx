interface FetchError extends Error {
  info?: any;
  status?: number;
}

const fetcher = async (url: string): Promise<any> => {
  const res = await fetch(url);
  
  if (!res.ok) {
      const error: FetchError = new Error('An error occurred while fetching the data.');
      error.info = await res.json();
      error.status = res.status;
      throw error;
  }
  
  return res.json();
};

export default fetcher;
