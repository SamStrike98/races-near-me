import mongoose from 'mongoose';

const raceSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    distance: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String,
    },
    postcode: {
        required: true,
        type: String
    },
    latitude: {
        required: true,
        type: Number
    },
    longitude: {
        required: true,
        type: Number
    },
    cost: {
        required: true,
        type: Number
    },
    raceDate: {
        required: true,
        type: Date
    },
    dateCreated: {
        required: true,
        type: Date
    },
    places: {
        required: true,
        type: Number
    },
    chipTimed: {
        required: true,
        type: Boolean
    },
    parking: {
        required: true,
        type: Boolean
    },
    terrain: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    stripeId: {
        required: true,
        type: String
    },
    location: {
        required: true,
        type: Object
    }
});

// Check if the model exists before defining it
const Race = mongoose.models.Race || mongoose.model('Race', raceSchema);

export default Race;