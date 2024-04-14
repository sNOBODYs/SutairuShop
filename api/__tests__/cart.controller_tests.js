import { addCart, getCart, getCartHistory, updateCart, updateDeliveryInfo } from '../controllers/cart.controller';
import * as cartController from '../controllers/cart.controller';
import Cart from '../models/cart.model';
import { createNewCart } from '../controllers/cart.controller';

// Mocking the Cart model
jest.mock('../models/cart.model');

describe('Cart Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addCart', () => {  
    it('should return an error message when trying to add a cart with existing data', async () => {
      // Mock request and response objects
      const req = {
        body: {
          products: [],
          userId: 'user123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();
  
      // Mock Cart.findOne to return an existing cart
      Cart.findOne.mockResolvedValue({ userId: 'user123', state: 1 });
  
      // Calling the addCart function
      await cartController.addCart(req, res, next);
  
      // Assertions
      expect(Cart.findOne).toHaveBeenCalledWith({ userId: 'user123', state: 1 });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Already existing cart.' });
    });

  });

  describe('getCart', () => {
    it('should return an empty cart when no cart exists for the given user', async () => {
      // Mock request and response objects
      const req = {
        params: {
          userId: 'user123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();
  
      // Mock Cart.findOne to return null (no existing cart)
      Cart.findOne.mockResolvedValue(null);
  
      // Calling the getCart function
      await getCart(req, res, next);
  
      // Assertions
      expect(Cart.findOne).toHaveBeenCalledWith({ userId: 'user123', state: 0 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, cart: { products: [] } });
    });
  });
});