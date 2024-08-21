import DirectorRegisterForm from '@/components/DirectorRegisterForm'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await auth();

    if (session?.user) {
        redirect('/')
    }

    return (
        <div>
            <h2>Director Register</h2>
            <DirectorRegisterForm />
        </div>
    )
}

export default page