import User from "../models/User.js";
import { hash, compare } from "bcrypt"; //compare to check password
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
        return res.status(201).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
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
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map