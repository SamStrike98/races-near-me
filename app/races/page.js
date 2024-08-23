import React from 'react'
import Link from 'next/link';
import RaceList from '@/components/RaceList';

const page = async () => {
    const res = await fetch(`http://localhost:3001/api/races`, { cache: 'no-store' })
    const data = await res.json();



    return (
        <div>
            {data &&

                <div>
                    <RaceList data={data} />
                </div>
            }
        </div>
    )
}

export default page