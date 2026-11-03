const mongoose = require("mongoose");
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

// GET /api/jobs?keyword=react&location=Pune&jobType=full-time&page=1&limit=10
const getAllJobs = async (req, res, next) => {

  try{
          const {keyword, location, jobType}  = req.query;

            // Pagination values
            const page = Math.max(Number(req.query.page) || 1 , 1);
            const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1 ),50);
            const skip = (page - 1)* limit;


            //Build filters
          const filters = {}

          if(keyword){
            filters.$or = [
              {title: { $regex: keyword, $options: "i"}},
              {company: { $regex: keyword, $options: "i"}},
              {skills: { $regex: keyword, $options: "i"}},
            ];
          }
          
          if (location) {
            filters.location = { $regex: location, $options: "i"};
          }

           if (jobType) {
      filters.jobType = jobType;
    }


      // Get matching jobs and total count

       const [jobs,totalJobs] = await Promise.all([
          Job.find(filters)
          .populate("recruiter", "name email")
       .sort({createdAt: -1})
       .skip(skip)
       .limit(limit),


       Job.countDocuments(filters),

       ])    
       

       res.status(200).json({
        success: true,
        totalJobs,
        currentPage: page,
        totalJobs: Math.ceil(totalJobs / limit),
        jobs,
       });
  }
  catch(error){
    next(error);
  }
}

// GET /api/jobs/:id
const getJobById = async(req, res, next) => {
  try{
       const { id } = req.params;

       // Check whether ID is valid
       if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findById(id)
    .populate("recruiter", "name email");

      // Check whether job exists
      if(!job){
        return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }
      res.status(200).json({
      success: true,
      job,
    });

  }
  catch(error){
    next(error);
  }

}

// PATCH /api/jobs/:id
const updateJob = async(req, res, next) => {
  try{
      const {id} = req.params;

       // Check valid job ID
       if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
          success: false,
          message: "Invalid job Id"
        })
       }
         // Find job
         const job = await Job.findById(id);
         if(!job){
          return res.status(404).json({
            success: false,
            message: "Job not found",
          });
         }

           // Check job ownership
           if(
             job.recruiter.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
           ){
            return res.status(403).json({
              success: false,
              message: "You can only update your own jobs",
            })
           }

           // Allowed fields
           const allwedFields = [
            "title","company","description","skills","salary","location","jobType",
           ];

// Update only allowed fields

      allwedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        job[field] = req.body[field];
      }
    });

    // Save updated job
const updatedJob = await job.save();
res.status(200).json({
  success: true,
  message: "Job updated successfully",
})

  }
  catch(error){
    next(error);
  }
}

// DELETE /api/jobs/:id
const deleteJob = async (req,res,next) => {
  try{
      const {id} = req.params;

    // Check valid job ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }
//find job
const job = await Job.findById(id);

 if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

     // Check job ownership
    if (
      job.recruiter.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own jobs",
      });
    }

    //Delete job
    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    })
  }
  catch(error){
    next(error)
  }
}



module.exports = { createJob, getAllJobs, getJobById , updateJob, deleteJob};
