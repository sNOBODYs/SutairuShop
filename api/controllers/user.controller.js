import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

export const test = (req, res) => {
  res.json({
    message: 'API is working!',
  });
};

// update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can update only your account!'));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const tokenExpiration = Math.floor(Date.now() / 1000) + (48 * 60 * 60);
    const token = jwt.sign({ id: req.params.id, exp: tokenExpiration}, process.env.JWT_SECRET);
    const { password, ...rest } = updatedUser._doc;
    const result = { token, ...rest }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//delete user

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, 'You can delete only your account!'));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (error) {
    next(error);
  }

};


// reset password logic
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send email
async function sendEmail(email, message) {
  try {
    // Send mail with defined transport object
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      text: message
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export const resetPass = async (req, res, next) => {
  const email = req.body.email;
  const existingUser = await User.findOne({ email: email });
  if (!existingUser) {
    return res.status(400).json({ success: false, message: "If user exists, an email was sent" });
  }

  const token = await generateCode(5);
  existingUser.resetToken = token;
  existingUser.resetTokenExparation = Date.now() + 3600000; // 1 hour
  await existingUser.save();
  await sendEmail(email, `Here is your Reset Token: ${token}`);
  res.status(200).json('Email sent');
}

export const resetPassConfirm = async (req, res, next) => {
  try {
    const email = req.body.email;
    const verificationCode = req.body.verificationCode;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user || user.resetToken !== verificationCode) {
      return res.status(400).json({ success: false, message: "Verification token is wrong" });
    }
    if (user.resetTokenExparation < new Date()) {
      return res.status(400).json({ success: false, message: "Token has expired." });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = '';
    user.resetTokenExparation = null;
    await user.save();
    res.status(200).json('Password has been reset.');
  } catch (error) {
    next(error);
  }
}

async function generateCode(passlength) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < passlength) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}