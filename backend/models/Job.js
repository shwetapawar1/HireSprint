const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required:[true,"job title is required"],
            trim: true,
        },
        company: {
            type: String,
            required: [true,"Company name is required"],
            trim: true,
        },
        description:{
                 type: String,
                 required:[true,"description is required"],
                 trim: true,
        },
        skills:{
            type: [String],
            required:true,

        },
        salary:{
           min: {
            type: Number,
            min:0,
           },
           max:{
            type: Number,
            min: 0,
           }
        },
        location:{
            type: String,
            required: [true,"location is required"],
            trim: true,
        },
        jobType:{
            type: String,
            enum: ["full-time", "part-time", "internship", "contract"],
            required: true,
        },
        recruiter:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true}
);

module.exports = mongoose.model("Job",jobSchema);