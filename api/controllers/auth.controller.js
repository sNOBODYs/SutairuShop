import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {

    const { username, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({ success: false, message: "Email is already taken" });
    }

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ success: false, message: "Username is already taken" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {

        // seeing if the user exists
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));

        // seeing if the password match
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, 'Wrong credentials'));

        // separating the password from the information about the user
        const { password: hashedPassword, ...rest } = validUser._doc; // getting only the necessery info with _doc
        const tokenExpiration = Math.floor(Date.now() / 1000) + (48 * 60 * 60);
        //making a token
        const token = jwt.sign({ id: validUser._id, exp: tokenExpiration }, process.env.JWT_SECRET); 
        const result = { token, ...rest }
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};




export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const tokenExpiration = Math.floor(Date.now() / 1000) + (48 * 60 * 60);
            const token = jwt.sign({ id: user._id, exp: tokenExpiration }, process.env.JWT_SECRET); 
            const { password: hashedPassword, ...rest } = user._doc;
            const result = { token, ...rest }
            res.status(200).json(result);
        } else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);   //Generating a default password (0-9)(A-Z)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username:
                    req.body.name.split(' ').join('').toLowerCase() +
                    Math.random().toString(36).slice(-8),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo,
            });
            await newUser.save();
            const tokenExpiration = Math.floor(Date.now() / 1000) + (48 * 60 * 60);
            const token = jwt.sign({ id: newUser._id, exp: tokenExpiration}, process.env.JWT_SECRET);
            const { password: hashedPassword2, ...rest } = newUser._doc;
            const result = { token, ...rest }
            res.status(200).json(result);
        }
    } catch (error) {
        next(error);
    }
};