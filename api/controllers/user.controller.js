import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

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
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
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
      from: process.env.EMAIL_USER ,
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
  const existingUser = await User.findOne(email);
  if (!existingUser) {
    return res.status(400).json({ success: false, message: "If user exists, an email was sent" });
  }

  const token = await generateCode(5);
  existingUser.resetToken = token;
  existingUser.resetTokenExparation = Date.now() + 3600000; // 1 hour
  await existingUser.save();
  await sendEmail(email, `Here is your Reset Token ${token}`);
  res.status(200).json('Email sent');
}

async function generateCode(passlength){
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < passlength) {
    result += characters.charAt(Math.floor(Math.random()* charactersLength));
    counter += 1;
  } 
  return result;
}