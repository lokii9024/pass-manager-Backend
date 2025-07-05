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

        res.status(201).json({newPass,message: "Pass entry added successfully"});
    } catch (error) {
        res.status(500).json({message: "Something went wrong while adding pass entry", error: error.message});
    }
}

//update pass entry
export const updatePass = async (req, res) => {
    try {
        const {url,username,pass,IV} = req.body
        const userId = req.user._id
        const passId = req.params.id
        //if userId is not present in the request, return an error
        if (!userId) {  
            return res.status(400).json({message: "User ID is required"});
        }
        // find the pass entry by url and userId
        const existingPass = await Pass.findOne({_id:passId, userId});
        if(!existingPass){
            return res.status(404).json({message: "Pass entry not found"});
        }
        // update the pass entry
        if(username === existingPass.username && pass === existingPass.pass) {
            return res.status(400).json({message: "No changes made to the pass entry"});
        }
        // update the pass entry with new values
        const updatedPass = await Pass.findOneAndUpdate(
            {_id: passId,userId},
            {$set:{username,pass,IV}},
            {new: true} // return the updated document
        );

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
        const passId = req.params?.id
        const userId = req.user._id

        if(!passId){
            return res.status(400).json({message: "pass id is required"});
        }
        // find the pass entry by url and userId
        const existingPass = await Pass.findOne({_id:id,userId});
        if(!existingPass) return res.status(404).json({message: "Pass entry not found"});

        // delete the pass entry
        const deletedPass = await Pass.findOneAndDelete({_id:passId,userId}).select('-pass -IV');
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

        res
        .status(200)
        .json({passes, message: "Pass entries fetched successfully"});

    } catch (error) {
        res.status(500).json({message: "Something went wrong while fetching pass entries", error: error.message});
    }
}