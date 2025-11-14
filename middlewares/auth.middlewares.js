const userModel = require('../models/user_model');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    // console.log("Auth Middleware Token:", token);

    if(!token){
        return res.status(401).json({message: "Unauthorized User"});
    }

    // *** FIXED LINE ***
    const isBlacklisted = await userModel.findOne({ token: token });

    // console.log("Is Blacklisted:", isBlacklisted);

    if(isBlacklisted){
        return res.status(401).json({message: "Logged out user - Unauthorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({message: "Unauthorized User"});
    }
}
