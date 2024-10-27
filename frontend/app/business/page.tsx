"use client"

import React, { useEffect } from 'react';
import { useAuth } from "@/components/authProvider";
import { useRouter } from 'next/navigation';
import BusinessPage from './ShowEntry'
import BusinessNavbar from './components/BusinessNavbar'

const Business = () => {
  const router = useRouter()
  const auth = useAuth();
  // Redirect if the user is already authenticated
  useEffect(() => {
    if (!auth.isAuthenticated) {
        console.log('this user is not logged in')
        router.replace('/business/login');
    }
  }, [auth, router]);

  return (
    <main>
        <BusinessNavbar/>
        <div className='pt-20 bg-[#FEF9F2]'>
          <BusinessPage/>
        </div>
    </main>
  )
}

export default Business