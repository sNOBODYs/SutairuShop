import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';


export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return next(errorHandler(401, 'You are not authenticated!'));

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token has expired!' });
            } else {
                return next(errorHandler(403, 'Token is not valid!'));
            }
        }
        req.user = decoded;
        next();
    });
}