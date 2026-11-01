const express = require("express");
const router = express.Router();


const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { createJob } = require("../controllers/jobController");

// Create a new job (Recruiter/Admin only)
router.post( "/", protect,authorizeRoles("recruiter","admin"), createJob);

module.exports = router;