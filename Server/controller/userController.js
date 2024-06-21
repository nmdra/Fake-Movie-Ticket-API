import User from '../model/userModel.js';
import CustomError from '../utils/customError.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res, next) => {

    const { name, email, password } = req.body;

    try {
        // Validate required fields
        if (!name || !email || !password) {
            throw new CustomError('Name, email, and password are required', 400);
        }

        // Check if the email is unique
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new CustomError('Email already exists', 400);
        }

        // Create a new user
        const user = await User.create({ name, email, password });

        if (user) {
            generateToken(res, user._id);
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email
            });
        } else {
            throw new CustomError('User creation failed', 500);
        }
    } catch (error) {
        return next(error);
    }
};

export const getUserProfile = async (req, res) => {
  res.send('get profile');
};

export const authUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
    if (!email ||!password) {
        throw new CustomError('Email and password are required', 400);
    }
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            throw new CustomError('Invalid email or password', 401);
        }
    } catch (error) {
        return next(error);
    }
};

export const logoutUser = (_req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

