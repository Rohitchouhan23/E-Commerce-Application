import {validationResult} from 'express-validator'
import {User} from '../models/User.js'
import {generateToken} from '../utils/geneteraTokens.js'

export const registerUser=async (req,res)=>{
    const error= validationResult(req)
    if(!error.isEmpty())
        return res.status(400).json({errors: error.array()});

    const {name,email,password}=req.body;
    try {
        const existing= await User.findOne({email});
        if(existing) return res.status(400).json({message:"Email already exists"});
        const user= await User.create({name,email,password});
        res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}



//login
export const loginUser= async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await User.findOne({email});
        if (!user) return res.status(401).json({message:'Invalid User'});
        const isMatch=await user.matchPassword(password);
        if(!isMatch) 
            return res.status(401).json({message:"Invalid Credentails"})
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}