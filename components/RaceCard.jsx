import Link from "next/link"
import { daysUntil } from "@/utils/daysUntil"
import Badge from "./Badge"
import Days from "./Days"

const RaceCard = ({ race }) => {
    return (
        <div className="bg-neutral w-[250px]  rounded-md p-[4px] bg-gradient-to-r hover:bg-gradient-to-b transition-all from-green-800 to-green-400">
            <div className="rounded-[calc(0.375rem-4px)] bg-white w-full h-full p-2">
                <Link href={`/races/${race._id}`}>
                    <h3 className="font-bold text-xl text-center">{race.name}</h3>

                    <div>
                        <p>Days Until</p>
                        <Days days={daysUntil(race.raceDate)} />
                    </div>


                    <ul className="flex flex-row flex-wrap gap-2 mt-2">
                        <Badge text={`${race.distance}km`} />
                        {race.chipTimed ? <Badge text={'Chip Timed'} /> : ''}
                        {race.parking ? <Badge text={'Parking'} /> : ''}
                        <Badge text={`${race.terrain}`} />
                    </ul>

                </Link>
            </div>
        </div>
    )
}

export default RaceCard