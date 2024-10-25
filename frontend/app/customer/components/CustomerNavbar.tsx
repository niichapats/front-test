'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function CustomerNavBar() {
    const pathname = usePathname()
    return (
        <div className='navbar fixed z-50'>
            <div className='flex-1'>
                <Image src="/logo.png" width={50} height={50} alt='logo'></Image>
                <Link href="/">Queue Management</Link>
            </div>
            <div className='flex-none'>
                <ul className='menu menu-horizontal px-1'>
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
                                <Link href="/customer/login">
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