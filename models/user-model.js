import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    createdAt: {
        required: true,
        type: Date,
    },
    role: {
        required: true,
        type: String,
    },
    displayName: {
        required: true,
        type: String
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String
    },
    races: {
        type: Array
    },
    results: {
        type: Array
    }

});

// Check if the model exists before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;