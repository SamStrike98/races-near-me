import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await auth()
    console.log(session)

    if (!session?.user) {
        redirect('/');
    } else if (session?.user.role === 'director') {
        redirect('/dashboard')
    }

    return (
        <div>{`${session.user.displayName}'s Profile`}</div>
    )
}

export default page