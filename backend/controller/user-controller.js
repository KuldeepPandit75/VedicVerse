import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const SignupUser= async(req,res)=>{
    try {
        // const salt=await bcrypt.genSalt();
        const hashedPassword=await bcrypt.hash(req.body.password, 10);  

        const user={username: req.body.username, name: req.body.name, password: hashedPassword, profile:req.body.profile};

        let newUser = new User(user);

        await newUser.save()
        
        return res.status(200).send("User Created!")
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: "Error while signup the user"});
    }
}

export const LoginUser=async(req,res)=>{
    let user=await User.findOne({username:req.body.username});
    if(!user){
        return res.status(400).json({msg: "Username does not match"});
    }

    try{
        let match= await bcrypt.compare(req.body.password, user.password);
        if(match){
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_KEY);

            return res.status(200).json({accessToken: accessToken, name:user.name,username: user.username,profile: user.profile});
        }else{
            return res.status(400).json({msg: "Password does not match"});
        }
    } catch(error){
        return res.status(500).json({msg: "Error while login in user"})
    }
}