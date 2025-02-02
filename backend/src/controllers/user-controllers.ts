import { create } from "domain";
import User from "../models/User.js"
import { hash, compare } from "bcrypt";//compare to check password
import createToken from "../utils/token-manager.js";
import path from "path";
import { signedCookie } from "cookie-parser";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    // get all users
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};

export const userSignup = async (req, res, next) => {

    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        //if user already exists
        if (existingUser) {
            res.status(401).send("user already exists");
        }
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // create token and store cookie
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain: "localhost",
            signed:true,
            path:"/",
        });
        
                const token = createToken(user._id.toString(), user.email, "7d");
                const expires = new Date();
                expires.setDate(expires.getDate() + 7);
                res.cookie(COOKIE_NAME, token, 
                    { path: "/", 
                    domain: "localhost", expires: expires,
                    httpOnly:true,
                    signed:true,
                    secure:false,
                    sameSite: 'None',
                 });


        return res.status(201).json({ message: "OK", name:user.name,email:user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
}

export const userLogin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        //verify if the user is present
        if (!user) {
            return res.status(401).send("user does not exist");
        }
        //verify password
        //compare the entered password with the password stored with the user
        const isPasswordCorrect = await compare(password, user.password);
        //if password is incorrect return status code 403 i.e. forbidden
        if (!isPasswordCorrect) {
            return res.status(403).send("incorrect password");
        }
res.clearCookie(COOKIE_NAME,{
    httpOnly:true,
    domain: "localhost",
    signed:true,
    path:"/",
});

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, 
            { path: "/", 
            domain: "localhost", expires:expires,
            httpOnly:true,
            signed:true,
            secure: false,  // Set to false for HTTP (only true for HTTPS)
    sameSite: 'None',
         });
         console.log(res.getHeaders());
        return res.status(200).json({ message: "OK",name:user.name,email:user.email});
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
}