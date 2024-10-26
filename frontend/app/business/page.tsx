import React from 'react'
import BusinessPage from './ShowEntry'
import BusinessNavbar from './components/BusinessNavbar'

const Business = () => {
  return (
    <main>
        <BusinessNavbar/>
        <div className='pt-20'>
          <BusinessPage/>
        </div>
    </main>
  )
}

export default Business