import React from 'react'
import CustomerNavBar from './components/CustomerNavbar'
import NewAddTrackingCode from './NewAddTrackingCode'

const CustomerPage = () => {
  return (
    <main>
      <CustomerNavBar />
      <div className='pt-16'>
        <NewAddTrackingCode />
      </div>
    </main>
  )
}

export default CustomerPage