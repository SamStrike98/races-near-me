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

// GET ALL FILTERED RACES
export async function getAllFilteredRaces(chipTimed, terrain, parking, distance) {
    console.log(chipTimed, terrain, parking, distance)
    // chipTimed === '' ? {$exists: true} : chipTimed;
    // terrain.length === 0 ? {$exists: true} : {$in: terrain}
    // parking === '' ? { $exists: true } : parking;
    // distance.length === 0 ? {$exists: true} : {$in: distance}
    try {

        // const races = await Race.aggregate([{ $match: { chipTimed: chipTimed === '' ? { $exists: true } : chipTimed, terrain: terrain.length === 0 ? { $exists: true } : { $in: terrain }, parking: parking === '' ? { $exists: true } : parking, distance: distance.length === 0 ? { $exists: true } : { $in: distance } } }]).select('_id name distance latitude longitude cost chipTimed parking terrain raceDate').sort({ raceDate: -1 }).lean();

        //Will need to refactor this using chipTimed==='true' to convert string to boolean **Not ideal**
        const races = await Race.aggregate([{ $match: { chipTimed: chipTimed === 'All' ? { $exists: true } : chipTimed === 'true', terrain: terrain.length === 0 ? { $exists: true } : { $in: terrain }, parking: parking === 'All' ? { $exists: true } : parking === 'true', distance: distance.length === 0 ? { $exists: true } : { $in: distance } } }, { $sort: { 'raceDate': -1 } }]);
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