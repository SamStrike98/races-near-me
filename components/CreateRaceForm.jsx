'use client'

// import { doCredentialLogin } from "@/app/actions"
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateRaceForm = () => {
    const [error, setError] = useState("")

    const router = useRouter()

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const formData = new FormData(e.currentTarget)

            const name = formData.get("name");
            const addressLine1 = formData.get("addressLine1");
            const addressLine2 = formData.get("addressLine2");
            const townCity = formData.get("townCity");
            const county = formData.get("county");
            const postcode = formData.get("postcode");
            const distance = formData.get("distance");
            const description = formData.get("description");
            const cost = formData.get("cost");
            const raceDate = formData.get("raceDate");
            const places = formData.get("places");
            const chipTimed = formData.get("chipTimed");
            const parking = formData.get("parking");
            const terrain = formData.get("terrain");



            const response = await fetch("/api/races", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    address: `${addressLine1}, ${addressLine2}, ${townCity}, ${county}, ${postcode}`,
                    postcode,
                    distance: distance.toString(),
                    description,
                    cost: cost * 100,
                    raceDate,
                    places,
                    chipTimed: chipTimed === 'Yes' ? true : false,
                    parking: parking === 'Yes' ? true : false,
                    terrain
                })
            }
            )

            response.status === 201 && router.push("/")

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
            <div className='text-red-500'>{error}</div>
            <form onSubmit={handleSubmit} method="post">

                {/* RACE NAME */}
                <label className="input input-bordered flex items-center gap-2" htmlFor='name'>
                    <input type="text" className="grow" placeholder="Name" id="name" name="name" />
                </label>

                {/* Address Line 1 */}
                <label className="input input-bordered flex items-center gap-2" htmlFor='addressLine1'>
                    <input type="text" className="grow" placeholder="Address Line 1" id="addressLine1" name="addressLine1" />
                </label>

                {/* Address Line 2 */}
                <label className="input input-bordered flex items-center gap-2" htmlFor='addressLine2'>
                    <input type="text" className="grow" placeholder="Address Line 2" id="addressLine2" name="addressLine2" />
                </label>

                {/* Town / City */}
                <label className="input input-bordered flex items-center gap-2" htmlFor='townCity'>
                    <input type="text" className="grow" placeholder="Town or City" id="townCity" name="townCity" />
                </label>

                {/* County */}
                <label className="input input-bordered flex items-center gap-2" htmlFor='county'>
                    <input type="text" className="grow" placeholder="County" id="county" name="county" />
                </label>

                {/* Postcode */}
                <label className="input input-bordered flex items-center gap-2" htmlFor='postcode'>
                    <input type="text" className="grow" placeholder="Postcode" id="postcode" name="postcode" />
                </label>

                {/* Distance */}
                <label className="input input-bordered flex items-center gap-2" htmlFor='distance'>
                    <input type="number" step=".01" className="grow" placeholder="Distance" id="distance" name="distance" />
                </label>

                {/* Description */}
                <label className="input input-bordered flex items-center gap-2" htmlFor='description'>
                    <input type="text" className="grow" placeholder="Description" id="description" name="description" />
                </label>

                {/* Cost */}
                <label className="input input-bordered flex items-center gap-2" htmlFor='cost'>
                    <input type="number" step=".01" className="grow" placeholder="Cost" id="cost" name="cost" />
                </label>

                {/* Race Date */}
                <label className="input input-bordered flex items-center gap-2" htmlFor='raceDate'>
                    <input type="date" className="grow" placeholder="Race Date" id="raceDate" name="raceDate" />
                </label>

                {/* Places */}
                <label className="input input-bordered flex items-center gap-2" htmlFor='places'>
                    <input type="number" className="grow" placeholder="Places" id="places" name="places" />
                </label>

                {/* Chip Timed */}
                <label className="form-control w-full max-w-xs" htmlFor='chipTimed'>
                    <div className="label">
                        <span className="label-text">Chip Timed</span>
                    </div>
                    <select className="select select-bordered" id="chipTimed" name="chipTimed">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    <div className="label">
                    </div>
                </label>

                {/* Parking */}
                <label className="form-control w-full max-w-xs" htmlFor='parking'>
                    <div className="label">
                        <span className="label-text">Parking</span>
                    </div>
                    <select className="select select-bordered" id="parking" name="parking">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    <div className="label">
                    </div>
                </label>

                {/* Terrain */}
                <label className="input input-bordered flex items-center gap-2" htmlFor='terrain'>
                    <input type="text" className="grow" placeholder="Terrain" id="terrain" name="terrain" />
                </label>


                <button className="btn btn-neutral" type='submit'>Create Race</button>
            </form>
        </div>
    )
}

export default CreateRaceForm