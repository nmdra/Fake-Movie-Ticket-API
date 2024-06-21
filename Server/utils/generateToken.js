import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '12h' });

    // Set the token as a cookie in the response
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV !== 'dev', // Cookie sent only over HTTPS if not in development
        sameSite: 'strict' // Prevents CSRF attacks
    });
};

export default generateToken;
