'use client'

import RaceCard from "./RaceCard"
import { useState } from "react"
import SelectFilter from "./SelectFilter"
import CheckBoxGroupFilter from "./CheckBoxGroupFilter"
import { filtersArr, createFilterURL } from "@/utils/filtersArr"
import SearchFilter from "./SearchFilter"
import NewSearchFilter from "./NewSearchFilter"
import NewSelectFilter from "./NewSelectFilter"
import NewCheckBoxGroupFilter from "./NewCheckBoxGroup"




const RaceList = ({ data }) => {
    const [raceData, setRaceData] = useState(data)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const formData = new FormData(e.currentTarget)

            const location = formData.get('location')

            const chipTimed = formData.get('chipTimed');

            const parking = formData.get('parking');

            const maxDistance = formData.get('maxDistance');

            const terrain = `${formData.get('Road') === 'on' ? 'Road' : 0},${formData.get('Track') === 'on' ? 'Track' : 0},${formData.get('Trail') === 'on' ? 'Trail' : 0}`

            const distance = `${formData.get('5km') === 'on' ? 5 : 0},${formData.get('10km') === 'on' ? 10 : 0},${formData.get('halfMarathon') === 'on' ? 21.1 : 0},${formData.get('marathon') === 'on' ? 42.2 : 0}`

            const filterURL = `/api/races/filtered?chipTimed=${chipTimed}&parking=${parking}&terrain=${terrain}&distance=${distance}&location=${location}&maxDistance=${maxDistance}`

            console.log(filterURL)


            //CREATE FILTER URL
            // const filterUrl = createFilterURL(filtersArr, formData)



            const response = await fetch(filterURL, { cache: 'no-store' })
            const filteredData = await response.json()

            setRaceData(filteredData)


            // response.status === 201 && router.push("/login")


            if (response.error) {
                setError(response.error.message)
            } else {
                // router.push('/')

            }
        } catch (error) {
            console.error(error)
            // setError("Check your details")
        }
    }

    return (
        <div>

            <div className="flex flex-col justify-between">

                <form method='GET' onSubmit={handleSubmit} className="flex flex-col gap-6 p-5 rounded-md border-2 border-neutral w-[25%] fixed right-5 top-[85px] shadow-lg">
                    <div className="flex flex-col">
                        <NewSearchFilter placeholder='Search by Town/City or Postcode' id='location' />
                        <NewSelectFilter name='Max Distance' id='maxDistance' options={[{ id: 1, name: 'All', value: 'All' },
                        { id: 2, name: 'Within 5km', value: 5 },
                        { id: 3, name: 'Within 10km', value: 10 },
                        { id: 4, name: 'Within 15km', value: 15 },
                        { id: 5, name: 'Within 25km', value: 25 },
                        { id: 6, name: 'Within 35km', value: 35 },
                        { id: 7, name: 'Within 50km', value: 50 },
                        { id: 8, name: 'Within 100km', value: 100 }]} />

                        <NewSelectFilter name="Chip Timed" id="chipTimed" options={[
                            { id: 1, name: 'All', value: 'All' },
                            { id: 2, name: 'Yes', value: true },
                            { id: 3, name: 'No', value: false },
                        ]} />

                        <NewSelectFilter name="Parking" id="parking" options={[
                            { id: 1, name: 'All', value: 'All' },
                            { id: 2, name: 'Yes', value: true },
                            { id: 3, name: 'No', value: false },]} />
                    </div>

                    <div className="flex flex-row justify-between">
                        <NewCheckBoxGroupFilter name="Terrain" items={[
                            { id: 'Road', name: 'Road' },
                            { id: 'Track', name: 'Track' },
                            { id: 'Trail', name: 'Trail' }]} />

                        <NewCheckBoxGroupFilter name="Distance" items={[
                            { id: '5km', name: '5km' },
                            { id: '10km', name: '10km' },
                            { id: 'halfMarathon', name: 'Half Marathon' },
                            { id: 'marathon', name: 'Marathon' }]} />
                    </div>


                    <button className="btn btn-primary text-white" type="submit">Find Races</button>
                </form>

                <div className=" w-[70%] p-5 h-[150vh] ">
                    {raceData && raceData.length > 0 ?
                        <ul className='flex flex-row flex-wrap gap-4'>
                            {raceData.map(race => (
                                <RaceCard key={race._id} race={race} />
                            ))}
                        </ul>
                        :
                        <div>No Races Found</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default RaceList