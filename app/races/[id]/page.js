import React from 'react'

const page = async ({ params }) => {
    const id = params.id

    const res = await fetch(`http://localhost:3001/api/races/${id}`);
    const { name, distance, address, description, cost, chipTimed, parking, terrain, raceDate, places } = await res.json();
    return (
        <div>

            {name &&
                <div>
                    <h2>{name}</h2>
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <div className='bg-yellow-500 h-[100px] w-[100px] '></div>
                            <p>{raceDate}</p>
                            <p>{distance}km</p>
                            <p>Start Time</p>
                            <p>{address}</p>
                            <p>£{(cost / 100).toFixed(2)}</p>
                            <p>{places}</p>
                            <p>Chip Timed: {chipTimed}</p>
                            <p>Parking: {parking}</p>
                            <p>Terrain: {terrain}</p>


                        </div>

                        <div className='flex flex-col'>
                            <p>{description}</p>
                        </div>


                    </div>

                </div>
            }
        </div>
    )
}

export default page