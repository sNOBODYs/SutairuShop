import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
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
        
        //making a token
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res.cookie('accessToken', token, { httpOnly: true , maxAge: 86400000 /* for 24 hours*/ }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};