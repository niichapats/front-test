'use client'

import React from 'react'

const RunQueue = ({business_data}) => {
  return (
    <>
        {business_data.map(business => (
            <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box mx-10">
              <li>{business.name}</li>
              <li>{business.name}</li>
              <li>
                <button className='btn btn-primary'>done</button>
              </li>
            </ul>
        ))}
    </>
  )
}

export default RunQueue