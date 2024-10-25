import React from 'react'
import CustomerNavBar from './components/CustomerNavbar'
import AddTrackingCode from './AddTrackingCode'

const CustomerPage = () => {
  return (
    <main>
      <CustomerNavBar />
      <div className='pt-16'>
        <AddTrackingCode />
      </div>
    </main>
  )
}

export default CustomerPage