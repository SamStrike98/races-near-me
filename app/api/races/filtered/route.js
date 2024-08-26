import { NextResponse } from "next/server";
import { getAllFilteredRaces } from "@/queries/races";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { filtersArr, createFiltersMatch } from "@/utils/filtersArr";


export const GET = async (request) => {

    try {
        await dbConnect();
        console.log("Database connected");

        const searchParams = request.nextUrl.searchParams


        const chipTimed = searchParams.get('chipTimed')
        const parking = searchParams.get('parking')
        const terrain = searchParams.get('terrain').split(",").filter(n => n !== '0')
        const distance = searchParams.get('distance').split(",").filter(n => n !== '0')
        const location = searchParams.get('location')
        const maxDistance = searchParams.get('maxDistance') === 'All' ? 10000000 : parseInt(searchParams.get('maxDistance')) * 1000

        console.log('chipTimed', chipTimed, 'parking', parking, 'terrain', terrain, 'distance', distance, 'location', location, 'maxDistance', maxDistance)

        // const { filtersObj, postcode, maxDistance } = await createFiltersMatch(filtersArr, searchParams)


        const match = { 'chipTimed': chipTimed === 'All' ? { $exists: true } : chipTimed === 'true', 'parking': parking === 'All' ? { $exists: true } : parking === 'true', terrain: terrain.length > 0 ? { $in: terrain } : { $exists: true }, distance: distance.length > 0 ? { $in: distance } : { $exists: true } }


        console.log(match)
        const races = await getAllFilteredRaces(match, location, maxDistance);


        return new NextResponse(JSON.stringify(races), {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching races:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
};