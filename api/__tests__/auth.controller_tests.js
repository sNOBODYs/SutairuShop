import User from "../models/user.model";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import { signup, login, google, signout } from '../controllers/auth.controller';
import dotenv from 'dotenv';
dotenv.config();

describe('Signup functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
// Signup with valid credentials creates a new user and returns a success message
it('should create a new user and return a success message when signing up with valid credentials', async () => {
  // Mocking dependencies
  const req = {
    body: {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  const next = jest.fn();

  // Mocking User.findOne to return null (no existing user)
  User.findOne = jest.fn().mockResolvedValue(null);

  // Mocking bcryptjs.hashSync to return the hashed password
  bcryptjs.hashSync = jest.fn().mockReturnValue('hashedPassword');

  // Mocking User.save to resolve successfully
  User.prototype.save = jest.fn().mockResolvedValue();

  // Calling the signup function
  await signup(req, res, next);

  // Assertions
  expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
  expect(bcryptjs.hashSync).toHaveBeenCalledWith('password123', 10);
  expect(User.prototype.save).toHaveBeenCalled();
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
});

it('should return an error message when signing up with an existing email', async () => {
  // Mock request and response objects
  const req = {
    body: {
      username: 'testuser',
      email: 'existingemail@example.com', // Using an existing email
      password: 'password123'
    }
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  const next = jest.fn();

  // Mock User.findOne to return an existing user
  User.findOne = jest.fn().mockResolvedValue({ email: 'existingemail@example.com' });

  // Call the signup function
  await signup(req, res, next);

  // Assertions
  expect(User.findOne).toHaveBeenCalledWith({ email: 'existingemail@example.com' });
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Email is already taken' });
});

});

describe('Log in functionality', () => {
  it('should return an error message when logging in with invalid credentials', async () => {
    // Mocking dependencies
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
  
    // Mocking User.findOne to return null (user not found)
    User.findOne = jest.fn().mockResolvedValue(null);
  
    // Calling the login function
    await login(req, res, next);
  
    // Assertions
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(next).toHaveBeenCalledWith(errorHandler(404, 'User not found'));
  });
  
  it('should return an error message when logging in with incorrect password', async () => {
    // Mocking dependencies
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
  
    // Mocking User.findOne to return a valid user
    User.findOne = jest.fn().mockResolvedValue({
      _id: 'user_id',
      password: 'hashedPassword',
      username: 'testuser',
      email: 'test@example.com'
    });
  
    // Mocking bcryptjs.compareSync to return false (incorrect password)
    bcryptjs.compareSync = jest.fn().mockReturnValue(false);
  
    // Calling the login function
    await login(req, res, next);
  
    // Assertions
    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcryptjs.compareSync).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(next).toHaveBeenCalledWith(errorHandler(401, 'Wrong credentials'));
  });
  
});
describe('Sign out functionality', () => {
  it('should clear the access token cookie and return a success message when signing out', () => {
    // Mocking dependencies
    const req = {};
    const res = {
      clearCookie: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    // Calling the signout function
    signout(req, res);
  
    // Assertions
    expect(res.clearCookie).toHaveBeenCalledWith('accessToken');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('Signout success!');
  });
  
});
describe('Google functionality', () => {
  it('should create a new user and return the user information and set a cookie with the access token when logging in with Google with a new user', async () => {
    // Mocking dependencies
    const req = {
      body: {
        email: 'newuser@example.com',
        name: 'New User',
        photo: 'newuser.jpg'
      }
    };
    const res = {
      cookie: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();
  
    // Mocking User.findOne to return null, indicating a new user
    User.findOne = jest.fn().mockResolvedValue(null);
  
    // Mocking bcryptjs.hashSync to return a fixed value for easier comparison
    bcryptjs.hashSync = jest.fn().mockReturnValue('hashedPassword');
  
    // Mocking jwt.sign to return a token
    jwt.sign = jest.fn().mockReturnValue('token');
  
    // Mocking Date constructor to return a fixed date (24 hours from now)
    const now = new Date();
    const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    global.Date = jest.fn(() => twentyFourHoursFromNow);
    global.Date.now = jest.fn(() => twentyFourHoursFromNow.getTime());
  
    // Calling the google function
    await google(req, res, next);
  
    // Assertions
    expect(User.findOne).toHaveBeenCalledWith({ email: 'newuser@example.com' });
    expect(bcryptjs.hashSync).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.cookie).toHaveBeenCalledWith('accessToken', 'token', { httpOnly: true, expires: twentyFourHoursFromNow });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ email: 'newuser@example.com' }));
  });
});


it('should return an ok message for empty username during signup', async () => {
  const req = { body: { username: '', email: 'test@example.com', password: 'password123' } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();

  await signup(req, res, next);

  expect(res.status).toHaveBeenCalledWith(201);
});
