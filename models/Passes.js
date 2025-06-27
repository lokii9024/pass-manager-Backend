import mongoose from "mongoose";

const passSchema = new mongoose.Schema({
    url : {
        type: String, 
        required: true
    },
    username: {
        type: String, 
        required: true
    },
    pass : { // encrypted pass from frontend
        type: String, 
        required: true
    },
    IV : { // initialization vector(used to ecrypt uniquely)
        type: String,
        required: true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
},{timestamps: true});

export const Pass = mongoose.model('Pass', passSchema);