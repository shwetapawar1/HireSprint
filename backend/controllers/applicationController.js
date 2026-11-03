const mongoose = require("mongoose");
const application = require("../models/Application");
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

module.exports = { applyForJob }