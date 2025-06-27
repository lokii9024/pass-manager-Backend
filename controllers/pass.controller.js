import { Pass } from "../models/Passes.js";

// add pass entry
export const addPass = async (req,res) => {
    try {
        if(!req.body) {
            return res.status(400).json({message: "req.body is undefined"});
        }
        const {url,username,pass,IV} = req.body
        const userId = req.user._id
        //if userId is not present in the request, return an error
        if (!userId) {
            return res.status(400).json({message: "User ID is required"});
        }
        // if pass entry for this url and user already exists, return an error
        const existingPass = await Pass.findOne({url,userId})
        if(existingPass) {
            return res.status(400).json({message: "Pass entry for this URL already exists"});
        }
        const newPass = new Pass({url,username,pass,IV,userId});
        await newPass.save()
        res.status(201).json({url,username,message: "Pass entry added successfully", pass: newPass});
    } catch (error) {
        res.status(500).json({message: "Something went wrong while adding pass entry", error: error.message});
    }
}

//update pass entry
export const updatePass = async (req, res) => {
    try {
        const {url,username,pass,IV} = req.body
        const userId = req.user._id
        //if userId is not present in the request, return an error
        if (!userId) {  
            return res.status(400).json({message: "User ID is required"});
        }
        // find the pass entry by url and userId
        const existingPass = await Pass.findOne({url, userId});
        if(!existingPass){
            return res.status(404).json({message: "Pass entry not found"});
        }
        // update the pass entry
        if(username === existingPass.username && pass === existingPass.pass) {
            return res.status(400).json({message: "No changes made to the pass entry"});
        }
        // update the pass entry with new values
        const updatedPass = await Pass.findOneAndUpdate(
            {url,userId},
            {$set:{username,pass,IV}},
            {new: true} // return the updated document
        ).select('-pass -userId -IV'); // exclude sensitive fields like pass and userId from the response

        if(!updatedPass) {
            return res.status(404).json({message: "Pass entry not found"});
        }

        res.status(200).json({updatedPass, message: "Pass entry updated successfully"});
    } catch (error) {
        return res.status(500).json({message: "Something went wrong while updating pass entry", error: error.message});
    }
}

// delete pass entry
export const deletePass = async (req,res) => {
    try {
        const {url} = req.body;
        const userId = req.user._id;

        if(!url || !userId){
            return res.status(400).json({message: "URL and User ID are required"});
        }
        // find the pass entry by url and userId
        const existingPass = await Pass.findOne({url, userId});
        if(!existingPass) return res.status(404).json({message: "Pass entry not found"});

        // delete the pass entry
        const deletedPass = await Pass.findOneAndDelete({url, userId}).select('-pass -userId');
        if(!deletedPass) return res.status(404).json({message: "Pass entry not found"});

        res.status(200).json({deletedPass,message: "Pass entry deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "error while deleting pass entry"})
    }
}

// get all pass entries for a user
export const getAllPasses = async (req, res) => {
    try {
        const userId = req.user._id
        if(!userId) {
            return res.status(400).json({message: "User ID is required"});
        }
        // find all pass entries for the user
        const passes = await Pass.find({userId}).sort({createdAt: -1})

        if(passes.length === 0) {
            return res.status(404).json({message: "No pass entries found for this user"});
        }

        res
        .status(200)
        

    } catch (error) {
        res.status(500).json({message: "Something went wrong while fetching pass entries", error: error.message});
    }
}