import UserRegisterForm from '@/components/UserRegisterForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await auth();

    if (session?.user) {
        redirect('/')
    }

    return (
        <div>
            <h2>User Register</h2>
            <UserRegisterForm />
        </div>
    )
}

export default page