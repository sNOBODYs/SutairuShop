import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { signup, login, google, signout } from '../controllers/auth.controller';
import User from '../models/user.model';
import supertest from 'supertest';

// Mocking dependencies
jest.mock('../models/user.model', () => ({
  findOne: jest.fn(),
  save: jest.fn(),
}));

jest.mock('bcryptjs', () => ({
  hashSync: jest.fn(),
  compareSync: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('Auth Controller', () => {
  describe('signup', () => {
    it('should create a new user', async () => {
      const req = {
        body: {
          username: 'testuser',
          email: 'test@example.com',
          password: 'testpassword',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValueOnce(null);
      User.prototype.save.mockResolvedValueOnce();

      await signup(req, res, jest.fn());

      expect(User.findOne).toHaveBeenCalledWith({ username: 'testuser' });
      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
    });

    it('should return error if username already exists', async () => {
      const req = {
        body: {
          username: 'existinguser',
          email: 'test@example.com',
          password: 'testpassword',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValueOnce({ username: 'existinguser' });

      await signup(req, res, jest.fn());

      expect(User.findOne).toHaveBeenCalledWith({ username: 'existinguser' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Username is already taken' });
    });
  });

  describe('login', () => {
    it('should log in a user with valid credentials', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'testpassword',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn(),
      };

      User.findOne.mockResolvedValueOnce({ password: 'hashedpassword', _doc: { email: 'test@example.com' } });
      bcryptjs.compareSync.mockReturnValueOnce(true);
      jwt.sign.mockReturnValueOnce('token');

      await login(req, res, jest.fn());

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcryptjs.compareSync).toHaveBeenCalledWith('testpassword', 'hashedpassword');
      expect(jwt.sign).toHaveBeenCalledWith({ id: undefined }, process.env.JWT_SECRET);
      expect(res.cookie).toHaveBeenCalledWith('accessToken', 'token', expect.any(Object));
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    it('should return error for invalid credentials', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'wrongpassword',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValueOnce({ password: 'hashedpassword' });
      bcryptjs.compareSync.mockReturnValueOnce(false);

      await login(req, res, jest.fn());

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(bcryptjs.compareSync).toHaveBeenCalledWith('wrongpassword', 'hashedpassword');
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Wrong credentials' });
    });

    it('should return error if user not found', async () => {
      const req = {
        body: {
          email: 'nonexistent@example.com',
          password: 'testpassword',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValueOnce(null);

      await login(req, res, jest.fn());

      expect(User.findOne).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'User not found' });
    });
  });

});
