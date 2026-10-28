const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String, 
            required: [true,"name is required"],
            trim: true,
            minlength:2,
            maxlength:50,
        },

        email:{
               type: String,
               required: [true,"email is required"],
               unique: true,
               lowercase: true,
               trim: true,
                match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
        },

        password:{
               type:String,
               required: [true,'password is required'],
               minlength:8,
               select: false,

        },

        role:{
            type: String,
            enum: ["jobseeker", "recruiter", "admin"],
            default: jobseeker
        },
    },
     { timestamps: true }
)

module.exports = mongoose.model("User", userSchema);