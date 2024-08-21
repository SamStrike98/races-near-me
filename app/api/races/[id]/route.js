import { NextResponse } from "next/server";
import { getRaceById } from "@/queries/races";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";

export const GET = async (request, { params }) => {
    try {
        await dbConnect();
        console.log("Database connected");
        console.log(params.id)
        const raceId = params.id

        const race = await getRaceById(raceId);
        console.log("Fetched race:", race);

        return new NextResponse(JSON.stringify(race), {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching reace:", error);
        return new NextResponse(error.message, {
            status: 500
        });
    }
};