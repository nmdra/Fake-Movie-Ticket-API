import jwt from 'jsonwebtoken';
import CustomError from '../utils/customError.js';
import User from '../model/userModel.js';

const protect = async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    try {
        if (token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);

                req.user = await User.findById(decoded.userId).select('-password');

                next();

            } catch (error) {
                next(error)
            }
        } else {
            throw new CustomError('Not authorized. No token provided', 400);
        }
    } catch (error) {
        next(error);
    }
}

export default protect;