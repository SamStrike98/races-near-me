import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await auth()

    if (!session?.user) {
        redirect('/');
    } else if (session?.user.role !== 'director') {
        redirect('/profile')
    }

    return (
        <div>{`${session.user.displayName}'s`} Dashboard</div>
    )
}

export default page