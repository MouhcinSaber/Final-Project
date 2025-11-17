//middleware to protect routes
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
module.exports = function (req, res, next) {
    //get token from header
    const token = req.headers.authorization?.split(' ')[1];
    //check if no token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    //verify token
    try {
        const decoded = JWT.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};


