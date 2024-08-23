import Link from "next/link"
import { daysUntil } from "@/utils/daysUntil"

const RaceCard = ({ race }) => {
    return (
        <div className="bg-neutral w-[250px] h-[150px] rounded-md p-[4px] bg-gradient-to-r hover:bg-gradient-to-b transition-all from-green-800 to-green-400">
            <div className="rounded-[calc(0.375rem-4px)] bg-base-100 w-full h-full">
                <Link href={`/races/${race._id}`}>
                    <h3 className="font-bold text-2xl text-center">{race.name}</h3>
                    <p>Days Until {daysUntil(race.raceDate)}</p>
                    <p>{race.distance}km</p>
                </Link>
            </div>
        </div>
    )
}

export default RaceCard