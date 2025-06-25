import jwt from 'jsonwebtoken';
import {User} from '../models/User.js';
import dotenv from 'dotenv';

export const getCurrentUser = async (req,_,next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if(!token){
        return res.status(401).json({message: "Unauthorized, No token provided"});
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password')
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        req.user = user
        next();
    } catch (error) {
        res.status(401).json({message: "Unauthorized, Invalid token"});
    }
}