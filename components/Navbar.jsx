import React from 'react'
import { auth } from '@/auth'
import Link from 'next/link'

const userLinks = [
    {
        id: 1,
        title: 'Profile',
        link: '/profile'
    },
    {
        id: 2,
        title: 'Races',
        link: '/races'
    },
]

const directorLinks = [
    {
        id: 1,
        title: 'Dashboard',
        link: '/dashboard'
    },
    {
        id: 2,
        title: 'Races',
        link: '/races'
    },
    {
        id: 3,
        title: 'Create Race',
        link: '/races/create-race'
    }
]

const Navbar = async () => {
    const session = await auth();
    return (

        <div className={`${!session?.user || session?.user.role === 'user' ? 'bg-green-500' : 'bg-blue-500'} w-full h-[80px]`}>
            <ul>
                {!session?.user || session?.user.role === 'user' ?
                    userLinks.map(item => (
                        <Link href={item.link} key={item.id}>{item.title}</Link>
                    ))
                    :
                    directorLinks.map(item => (
                        <Link href={item.link} key={item.id}>{item.title}</Link>
                    ))
                }
            </ul>
        </div>
    )
}

export default Navbar