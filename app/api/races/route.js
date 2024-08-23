import { NextResponse } from "next/server";
import { createRace, getAllRaces } from "@/queries/races";
import dbConnect from "@/lib/mongo";
import mongoose from "mongoose";
import { auth } from "@/auth";
import { createStripeProduct } from "@/utils/createStripeProduct";
import { getCoordinatesFromPostcode } from "@/utils/getCoordinatesFromPostcode";


export const POST = auth(async function (request) {
    if (request.auth?.user.role === 'director') {
        try {
            const { name, address, postcode, distance, description, cost, raceDate, places, chipTimed, parking, terrain } = await request.json();

            // Create a DB Connection
            await dbConnect();
            console.log("Database connected");

            const dateCreated = new Date();

            const stripeRes = await createStripeProduct(name, cost);
            // const stripeProduct = await stripeRes.json();
            const stripeId = stripeRes.id

            const coordinates = await getCoordinatesFromPostcode(postcode);

            console.log("coordinate", coordinates)

            // Form a DB Payload
            const newRace = {
                name, distance, address, postcode, latitude: coordinates.lat, longitude: coordinates.lon, cost, raceDate, dateCreated, places, chipTimed, parking, terrain, description, stripeId: stripeId
            };

            // Update the DB
            await createRace(newRace);
            console.log("Race created:", newRace);


            return new NextResponse("Race has been created", {
                status: 201
            });
        } catch (error) {
            console.error("Error creating Race:", error);
            return new NextResponse(error.message, {
                status: 500
            });
        }
    }
    else {
        return NextResponse.json({ message: "Not Authorised" }, { status: 401 })
    }
}
);


export const GET = async (request, { params }) => {
    // console.log(params)
    // console.log(request.nextUrl.searchParams.get('firstName'))
    try {
        await dbConnect();
        console.log("Database connected");

        const races = await getAllRaces();
        // console.log("Fetched products:", products);

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


