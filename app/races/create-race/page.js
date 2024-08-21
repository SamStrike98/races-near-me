import React from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import CreateRaceForm from '@/components/CreateRaceForm'

const page = async () => {
    const session = await auth()

    if (!session?.user) {
        redirect('/');
    } else if (session?.user.role !== 'director') {
        redirect('/')
    }

    return (
        <div>
            <h2>{`${session.user.displayName}'s`} Create Race</h2>
            <CreateRaceForm />
        </div>
    )
}

export default page