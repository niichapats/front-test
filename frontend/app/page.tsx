import React from 'react'
import Link from 'next/link'

const Home = () => {
  const homeBackground = {
    backgroundImage: "url('/home.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  }
  return (
    <main style={homeBackground} className='grid grid-cols-3 gap-4'>
      <div className='items-center col-span-2 px-20 py-40'>
          <br></br>
          {/* <h1 className='text-2xl'>You can choose your role to start using our website</h1> */}
          <br></br>
          <div className='grid grid-cols-2 gap-4'>
            <Link href="/business/login">
              <button className='btn btn-primary w-full mt-60 ml-7 text-xl text-white bg-lightkPurple3 border-none hover:bg-purple-900'>Business Owner</button>
            </Link>
            <Link href="/customer/">
              <button className='btn btn-primary w-full mt-60 ml-10 text-xl text-white bg-lightPink border-none hover:bg-pink-900'>Customer</button>
            </Link>
          </div>
      </div>
    </main>
  )
}

export default Home