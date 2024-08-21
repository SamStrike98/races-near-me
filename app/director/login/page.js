import DirectorLoginForm from '@/components/DirectorLoginForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await auth();

    if (session?.user) {
        redirect('/')
    }

    return (
        <div>
            <h2>Race Director Login</h2>
            <DirectorLoginForm />
        </div>
    )
}

export default page