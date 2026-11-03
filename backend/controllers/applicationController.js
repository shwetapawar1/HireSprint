const mongoose = require("mongoose");
const Job = require("../models/Job");
const Application = require("../models/Application");

// POST /api/jobs/:id/apply
const applyForJob = async (req, res, next) => {
    try{
           const { id: jobId } = req.params;

           if(!mongoose.Types.ObjectId.isValid(jobId)){
            return res.status(400).json({
                success: false,
                message: "Invalid Job ID",
            })
           }

           const job = await Job.findById(jobId);

           if(!job){
            return res.status(400).json({
                success: false,
                message: "Job not found",
            })
           }

           // Prevent applying to the same job more than once
           const existingApplication = await Application.findOne({
            job: jobId,
            application: req.user._id,
           })

           if(existingApplication){
            return res.status(409).json({
                success: false,
                message: "You have already applied for this job",
            });
           }

            const application = await Application.create({
      job: jobId,
      application: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });

    }
    catch(error){
        next(error);
    }
};

// GET /api/applications/my-applications
const getMyApplications = async (req, res, next) => {
    try{
         const application = await Application.find({
             application: req.user._id,
         })
         .populate("job", "title company location salary jobType")
         .sort({createdAt: -1});

         res.status(200).json({
            success: true,
            totalApplication: application.length,
            application,
         })
    }
    catch(error){
        next(error);
    }
}

// GET /api/applications/recruiter
const getRecruiterApplications = async (req, res, next ) => {
    try{
        // Find all jobs posted by logged-in recruiter
        const jobs = await Job.find({
            recruiter: req.user._id,
        }).select("_id");

         const jobIds = jobs.map((job) => job._id);

          // Find applications for those jobs
    const application = await Application.find({
      job: { $in: jobIds },
    })
      .populate("job", "title company location")
      .populate("application", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalApplications: application.length,
      application,
    });
    }
    catch(error){
        next (error);
    }
}

module.exports = { applyForJob, getMyApplications , getRecruiterApplications}