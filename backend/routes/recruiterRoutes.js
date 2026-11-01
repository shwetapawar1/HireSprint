const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles, } = require("../middleware/roleMiddleware");

router.get('/dashboard', protect, authorizeRoles("recruiter", "admin"), (req,res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the recruiter dashboard",
        
    });
    console.log("Recruiter routes loaded");
})


module.exports = router;
