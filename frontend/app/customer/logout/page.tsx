"use client";

import { useAuth } from "@/components/authProvider";
import { useRouter } from 'next/navigation';
import { MouseEvent } from "react";

const LOGOUT_URL = "/api/logout/";

export default function Page() {
    const router = useRouter()
    const auth = useAuth();

    async function handleClick(event: MouseEvent<HTMLButtonElement>): Promise<void> {
        event.preventDefault();
        const requestOptions: RequestInit = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}), // You can add any required payload here
        };
        
        const response = await fetch(LOGOUT_URL, requestOptions);
        
        if (response.ok) {
            console.log("Logged out");
            auth.logout();
            router.replace('/customer/login')
        }
    }

    return (
        <div className="h-[95vh]">
            <div className='max-w-md mx-auto py-5'>
                <h1>Are you sure you want to logout?</h1>
                <button className='bg-red-500 text-white hover:bg-red-300 px-3 py-2' onClick={handleClick}>
                    Yes, logout
                </button>
            </div>
        </div>
    );
}
