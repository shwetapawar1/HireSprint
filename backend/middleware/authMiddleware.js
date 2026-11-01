// const jwt = require("jsonwebtoken");
// const user = require("../models/user");

// const protect = async (req,res,next) => {
//     try{
//         const authHeader = req.headers.authorization;

//         if(!authHeader || !authHeader.startsWith("Bearer ")) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Authentication required",
//             });
//         }
//         const token = authHeader.split(" ")[1];

//         if(!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Authentication required",
//             });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         const user = await user.findById(decoded.userId);

//         if(!user){
//             return res.status(401).json({
//                 success: false,
//                 message: "User no longer exists",
//             });
//         }

//         req.user = user;
//         next();

//     }
//     catch(error){
//            if(
//             error.name === "JsonWebTokenError" ||
//             error.name === "TokenExpiredError"
//            ){
//             return res.status(401).json({
//                 success:false,
//                 message: "Invalid or expired token",
//             });
//            }

//            next(error);
//     }
// }

// module.exports = {protect};


const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        // Extract JWT token
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Find user in database
        const loggedInUser = await User.findById(decoded.userId);

        if (!loggedInUser) {
            return res.status(401).json({
                success: false,
                message: "User no longer exists",
            });
        }

        req.user = loggedInUser;

        next();

    } catch (error) {
        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        next(error);
    }
};

module.exports = { protect };