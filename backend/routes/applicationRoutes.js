const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");


const { getMyApplications , getRecruiterApplications, updateApplicationStatus } = require("../controllers/applicationController");


router.get(
  "/my-applications",
  protect,
  authorizeRoles("jobseeker"),
  getMyApplications
);

router.get("/recruiter", protect, authorizeRoles("recruiter", "admin"), getRecruiterApplications);

router.patch("/:id/status", protect, authorizeRoles("recruiter"), updateApplicationStatus);

module.exports = router;