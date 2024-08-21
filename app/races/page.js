import React from 'react'
import Link from 'next/link';

const page = async () => {
    const res = await fetch(`http://localhost:3001/api/races`, { cache: 'no-store' })
    const data = await res.json();

    return (
        <div>
            {data &&

                <ul>
                    {data.map(race => (
                        <Link key={race._id} href={`/races/${race._id}`}>{race.name}</Link>
                    ))}
                </ul>
            }
        </div>
    )
}

export default page