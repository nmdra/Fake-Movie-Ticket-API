import User from '../model/userModel.js';
import CustomError from '../utils/customError.js';
import generateToken from '../utils/generateToken.js';

export const registerUser = async (req, res, next) => {

    const { name, email, password, role } = req.body;

    try {
        // Validate required fields
        // if (!name || !email ) {
        //     throw new CustomError('Name, email, and password are required', 400);
        // }

        // Check if the email is unique
        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new CustomError('Email already exists', 400);
        }

        // Create a new user
        const user = await User.create({ name, email, password, role });

        if (user) {
            generateToken(res, user._id);
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            throw new CustomError('User creation failed', 500);
        }
    } catch (error) {
        return next(error);
    }
};

export const getUserProfile = async (req, res, next) => {
    try {
        // req.user is populated by the protect middleware
        const user = req.user;

        // Respond with user profile details
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};


export const authUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            throw new CustomError('Email and password are required', 400);
        }
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
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

export const updateUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.status(201).json({
                message: 'User updated successfully',
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
            });
        } else {
            throw new CustomError('User not found', 400);
        }

    } catch (error) {
        return next(error);
    }
};

export const getUserById = async (req, res, next) => {
    // Ensure only admins can fetch user details
    if (req.user.role !== 'admin') {
        throw new CustomError('Unauthorized access', 403);
    }

    const userId = req.params.id; // Assuming the user ID is passed as a parameter

    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new CustomError('User not found', 404);
        }

        // Return user details
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            // password: user.password, // Don't return password in response
        });

    } catch (error) {
        next(error);
    }
};
