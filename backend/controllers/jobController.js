
const Job = require("../models/Job");

const createJob = async (req, res, next) => {
  try {
    const {
      title,
      company,
      description,
      skills,
      salary,
      location,
      jobType,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !company ||
      !description ||
      !Array.isArray(skills) ||
      skills.length === 0 ||
      !location ||
      !jobType
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required job details",
      });
    }

    // Validate salary
    if (
      salary &&
      (
        (salary.min != null && salary.min < 0) ||
        (salary.max != null && salary.max < 0) ||
        (salary.min != null &&
          salary.max != null &&
          salary.min > salary.max)
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid salary range",
      });
    }

    // Create job
    const job = await Job.create({
      title,
      company,
      description,
      skills,
      salary,
      location,
      jobType,
      recruiter: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createJob };
