import Race from "@/models/race-model";
import { getCoordinatesFromPostcode } from "@/utils/getCoordinatesFromPostcode";

// GET ALL RACES
export async function getAllRaces() {
    try {
        const races = await Race.find({}).select('_id name distance latitude longitude cost chipTimed parking terrain raceDate').sort({ raceDate: 1 }).lean();
        return races;
    } catch (error) {
        throw new Error(error)
    }
}

// GET ALL FILTERED RACES
export async function getAllFilteredRaces(match, location, maxDistance) {

    try {
        if (location !== '') {
            const { lat, lon } = await getCoordinatesFromPostcode(location)
            const obj = { near: { type: "Point", coordinates: [lon, lat] }, distanceField: "dist.calculated", maxDistance: maxDistance, includeLocs: "dist.location", spherical: true }
            const races = await Race.aggregate([{ $geoNear: obj }, { $match: match }, { $sort: { 'raceDate': 1 } }]);
            return races;
        } else {
            const races = await Race.aggregate([{ $match: match }, { $sort: { 'raceDate': 1 } }]);
            return races;
        }

        //Will need to refactor this using chipTimed==='true' to convert string to boolean **Not ideal**
        // const races = await Race.aggregate([{ $match: { chipTimed: chipTimed === 'All' ? { $exists: true } : chipTimed === 'true', terrain: terrain.length === 0 ? { $exists: true } : { $in: terrain }, parking: parking === 'All' ? { $exists: true } : parking === 'true', distance: distance.length === 0 ? { $exists: true } : { $in: distance } } }, { $sort: { 'raceDate': -1 } }]);


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