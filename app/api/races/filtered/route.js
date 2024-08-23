import { NextResponse } from "next/server";
import { getAllFilteredRaces } from "@/queries/races";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";
import { auth } from "@/auth";


export const GET = async (request, { searchParams }) => {
    console.log(searchParams)
    try {
        await dbConnect();
        console.log("Database connected");
        console.log(request.nextUrl.searchParams.get('terrain'))

        const chipTimed = request.nextUrl.searchParams.get('chipTimed')
        const parking = request.nextUrl.searchParams.get('parking')
        const terrain = request.nextUrl.searchParams.get('terrain').split(",").filter(n => n)
        const distance = request.nextUrl.searchParams.get('distance').split(",").map(Number).filter(n => n !== 0)

        console.log('terrain', terrain)

        const races = await getAllFilteredRaces(chipTimed, terrain, parking, distance);


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