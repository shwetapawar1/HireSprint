const express = require("express");
const router = express.Router();


const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const { createJob,getAllJobs, getJobById, updateJob, deleteJob } = require("../controllers/jobController");
const { applyForJob } = require("../controllers/applicationController");

// Get all jobs (Public route)
router.get("/",getAllJobs);

router.post("/:id/apply",protect, authorizeRoles("jobseeker"), applyForJob)
 
router.get("/:id", getJobById);

router.patch("/:id", protect, authorizeRoles("recruiter", "admin"), updateJob)

router.delete("/:id",protect,authorizeRoles("recruiter", "admin"),deleteJob)



// Create a new job (Recruiter/Admin only)
router.post( "/", protect,authorizeRoles("recruiter","admin"), createJob);

module.exports = router;