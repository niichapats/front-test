'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function NavLinks() {
    const pathname = usePathname()
    return (
        <div className='navbar'>
            <div className='flex-1'>
                <Image src="/logo.png" width={50} height={50} alt='logo'></Image>
                <Link href="/" className='btn btn-ghost text-xl text-[#212A3E]'>Queue Management</Link>
            </div>
            <div className='flex-none'>
                <ul className='menu menu-horizontal px-1'>
                    <li>
                        <Link className={`link ${pathname === '/users' ? 'active': ''}`} href="/users">Users</Link>
                    </li>
                    <li>
                        <details>
                            <summary>Account</summary>
                            <ul className='bg-base-100 rounded-t-none p-2'>
                                <li><a>Profile</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    )
}