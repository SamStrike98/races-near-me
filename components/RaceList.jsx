'use client'

import RaceCard from "./RaceCard"
import { useState } from "react"
import SelectFilter from "./SelectFilter"
import CheckBoxGroupFilter from "./CheckBoxGroupFilter"
import { filtersArr, createFilterURL } from "@/utils/filtersArr"
import SearchFilter from "./SearchFilter"




const RaceList = ({ data }) => {
    const [raceData, setRaceData] = useState(data)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const formData = new FormData(e.currentTarget)


            //CREATE FILTER URL
            const filterUrl = createFilterURL(filtersArr, formData)

            const response = await fetch(filterUrl, { cache: 'no-store' })
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
                        } else if (filter.type === "search") {
                            return (
                                <SearchFilter key={filter.id} filterItem={filter} />
                            )
                        }
                    })}
                    <button className="btn btn-primary" type="submit">Find Races</button>
                </form>
            </div>
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
    )
}

export default RaceList