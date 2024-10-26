'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import AddQueue from '../AddQueue'

export default function BusinessNavbar() {
    const pathname = usePathname()

    return (
        <div className='navbar fixed z-50 bg-[#FEF9F2]'>
            <div className='flex-1'>
                <Image src="/logo.png" width={50} height={50} alt='logo'></Image>
                <Link href="/" className='btn btn-ghost text-2xl'>Queue Management</Link>
            </div>
            <div className='flex-none'>
                <ul className='menu menu-horizontal px-1'>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <details>
                            <summary>Account</summary>
                            <ul className='bg-base-100 rounded-t-none p-2'>
                            <li>
                                <Link href="/profile">
                                    Profile
                                </Link>
                            </li>
                            <li>
                                <Link href="/business/login">
                                    Logout
                                </Link>
                            </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}