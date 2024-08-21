import UserLoginForm from '@/components/UserLoginForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await auth();

    if (session?.user) {
        redirect('/')
    }

    return (
        <div>
            <h2>User Login</h2>
            <UserLoginForm />
        </div>
    )
}

export default page