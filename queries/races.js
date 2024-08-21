import Race from "@/models/race-model";

// GET ALL RACES
export async function getAllRaces() {
    try {
        const races = await Race.find({}).select('_id name distance latitude longitude cost chipTimed parking terrain raceDate').sort({ raceDate: -1 }).lean();
        return races;
    } catch (error) {
        throw new Error(error)
    }
}

// CREATE RACE
export async function createRace(race) {
    try {
        await Race.create(race);
        return race;
    } catch (error) {
        throw new Error(error)
    }
}

// GET RACE BY ID
export async function getRaceById(id) {
    try {
        const race = await Race.findById(id);
        return race;
    } catch (error) {
        throw new Error(error)
    }
}