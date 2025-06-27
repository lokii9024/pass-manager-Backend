import {User} from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const signUp = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        const existingUser = await User.findOne({
            email: email
        })

        if(existingUser) return res.status(400).json({message: "user already exists with this email"});

        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save()

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        const options = {
            httpOnly: true,
            secure: true
        }

        res
        .status(201)
        .cookie('token', token,options)
        .json({message:"user created successfully"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong, While creating user"})
    }
}

// login
    export const signIn = async (req,res) => {
        const {email,password} = req.body;
        try {
            const user = await User.findOne({email})
            if(!user) return res.status(404).json({message :"User not found"});

            const isCorrectPass = await bcrypt.compare(password, user.password)

            if(!isCorrectPass) return res.status(400).json({message: "Invalid credentials"});

            // Generate JWT token
            const token =  jwt.sign({id: user._id},process.env.JWT_SECRET, {expiresIn: '1h'});

            const options = {
                httpOnly: true,
                secure: true
            }

            res
            .status(200)
            .cookie('token', token, options)
            .json({token,message: "User logged in successfully"})
        } catch (error) {
            res.status(500).json({message: "Something went wrong, while logging in"})
        }
    }
// logout

export const logOut = async (req, res) => {
    try {
        // Invalidate the token on the client side
        res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        res.status(500).json({message: "Something went wrong, while logging out"});
    }
}