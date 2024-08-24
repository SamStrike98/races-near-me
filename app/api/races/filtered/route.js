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

        console.log('route', request.nextUrl.searchParams.get('chipTimed'))
        // const chipTimed = request.nextUrl.searchParams.get('chipTimed')
        // const parking = request.nextUrl.searchParams.get('parking')
        // const terrain = request.nextUrl.searchParams.get('terrain').split(",").filter(n => n)
        // const distance = request.nextUrl.searchParams.get('distance').split(",").map(Number).filter(n => n !== 0)
        const searchParams = request.nextUrl.searchParams

        const { filtersObj, postcode, maxDistance } = await createFiltersMatch(filtersArr, searchParams)


        const races = await getAllFilteredRaces(filtersObj, postcode, maxDistance);


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