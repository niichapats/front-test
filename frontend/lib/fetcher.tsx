interface FetchError extends Error {
  info?: any;
  status?: number;
}

const fetcher = async (url: string): Promise<any> => {
  // const res = await fetch(url);
  const token = localStorage.getItem('token'); // Adjust according to where you're storing the token
  console.log('token:', token)
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // Ensure this is set correctly
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
      const error: FetchError = new Error('An error occurred while fetching the data.');
      error.info = await res.json();
      error.status = res.status;
      throw error;
  }
  
  return res.json();
};

export default fetcher;
