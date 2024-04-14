import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {
  updateUser,
  deleteUser,
  resetPass,
  resetPassConfirm,
} from '../controllers/user.controller';
import User from '../models/user.model';

// Mocking nodemailer to prevent sending actual emails during tests
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

// Mocking bcryptjs hashSync function
jest.mock('bcryptjs', () => ({
  hashSync: jest.fn(password => password), // Mocking hashSync to return the input password
}));

describe('updateUser function', () => {
  it('should update user information', async () => {
    const req = {
      user: { id: 'someUserId' },
      params: { id: 'someUserId' },
      body: {
        username: 'newUsername',
        email: 'new@example.com',
        password: 'newPassword',
        profilePicture: 'newPicture',
      },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Mocking the User model's findByIdAndUpdate method
    User.findByIdAndUpdate = jest.fn(() => ({
      _doc: req.body,
    }));

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      username: 'newUsername',
      email: 'new@example.com',
      profilePicture: 'newPicture',
    });
    expect(bcryptjs.hashSync).toHaveBeenCalledWith('newPassword', 10);
  });

});

describe('deleteUser function', () => {
  it('should delete the user', async () => {
    const req = {
      user: { id: 'someUserId' },
      params: { id: 'someUserId' },
    };
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    User.findByIdAndDelete = jest.fn();

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('User has been deleted...');
  });
});