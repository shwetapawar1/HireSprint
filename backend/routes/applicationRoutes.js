const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");


const { getMyApplications , getRecruiterApplications } = require("../controllers/applicationController");


router.get(
  "/my-applications",
  protect,
  authorizeRoles("jobseeker"),
  getMyApplications
);

router.get("/recruiter", protect, authorizeRoles("recruiter", "admin"), getRecruiterApplications);

module.exports = router;