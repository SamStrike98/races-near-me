'use client'

import RaceCard from "./RaceCard"
import { useState } from "react"
import SelectFilter from "./SelectFilter"
import CheckBoxGroupFilter from "./CheckBoxGroupFilter"


//ADD NEW FILTERS HERE
const filtersArr = [
    {
        id: 'chipTimed',
        name: 'Chip Timed',
        type: 'select',
        options: [
            { id: 1, name: 'All', value: 'All' },
            { id: 2, name: 'Yes', value: true },
            { id: 3, name: 'No', value: false },
        ]
    },

    {
        id: 'parking',
        name: 'Parking',
        type: 'select',
        options: [
            { id: 1, name: 'All', value: 'All' },
            { id: 2, name: 'Yes', value: true },
            { id: 3, name: 'No', value: false },
        ]
    },

    {
        id: 'terrain',
        name: 'Terrain',
        type: 'checkboxGroup',
        items: [
            { id: 'Road', name: 'Road', value: 'Road' },
            { id: 'Track', name: 'Track', value: 'Track' },
            { id: 'Trail', name: 'Trail', value: 'Trail' },
            { id: 'Grass', name: 'Grass', value: 'Grass' },
            { id: 'Sand', name: 'Sand', value: 'Sand' }
        ]
    },

    {
        id: 'distance',
        name: 'Distance',
        type: 'checkboxGroup',
        items: [
            { id: '5km', name: '5km', value: 5 },
            { id: '10km', name: '10km', value: 10 },
            { id: 'halfMarathon', name: 'Half Marathon', value: 21.1 },
            { id: 'marathon', name: 'Marathon', value: 42.2 }
        ]
    },

]



const RaceList = ({ data }) => {
    const [raceData, setRaceData] = useState(data)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const formData = new FormData(e.currentTarget)

            // FUNCTIONS HANDLES THE CREATION OF THE FILTERS URL
            function createFilterURL(filtersArr) {
                let arr = ['/api/races/filtered?'];
                filtersArr.map(filter => {
                    if (filter.type === 'select') {
                        arr.push(`${filter.id}=${formData.get(filter.id)}&`)
                    }
                    else if (filter.type === 'checkboxGroup') {
                        arr.push(`${filter.id}=${filter.items.map(item => (formData.get(item.id) ? item.value : ''))}&`)
                    }
                })
                return arr.join('');
            }


            const response = await fetch(createFilterURL(filtersArr))
            const filteredData = await response.json()

            setRaceData(filteredData)


            // response.status === 201 && router.push("/login")


            if (response.error) {
                setError(response.error.message)
            } else {
                // router.push('/')

            }
        } catch (error) {
            console.error(e)
            // setError("Check your details")
        }
    }

    return (
        <div>

            <div>

                {/* REFACTORED FILTER FORM */}
                <form method='GET' onSubmit={handleSubmit} className="flex flex-row">
                    {filtersArr.map(filter => {
                        if (filter.type === 'select') {
                            return (
                                <SelectFilter key={filter.id} filterItem={filter} />
                            )
                        } else if (filter.type === "checkboxGroup") {
                            return (
                                <CheckBoxGroupFilter key={filter.id} filterItem={filter} />
                            )
                        }
                    })}
                    <button className="btn btn-primary" type="submit">Find Races</button>
                </form>
            </div>
            {raceData &&
                <ul className='flex flex-row flex-wrap gap-4'>
                    {raceData.map(race => (
                        <RaceCard key={race._id} race={race} />
                    ))}
                </ul>
            }
        </div>
    )
}

export default RaceList