const user = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createToken = (userId) => {
    return jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }

    );
};

// POST /api/auth/register
const register = async(req, res, next) => {
    try{
        
        const {name,email,password} = req.body;
        
        if(
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !password
){
    return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
    });
}
if(name.trim().length < 2 || name.trim().length > 60){
    return res.status(400).json({
        success: false,
        message:"Name must be between 2 and 60 characters",
    });
}
if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())){
    return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
    });
}
if(password.length <8 || password.length > 72){
    return res.status(400).json({
        success: false,
        message:"Password must be 8 to 72 characters long",
    });

}
const normalizedEmail = email.trim().toLowerCase();

const existingUser = await User.findOne({
    email: normalizedEmail,
});
if(existingUser){
    return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
    });
}
const hashedPassword = await bcrypt.hash(password,12);

  // Public registration always creates a job seeker.
    // Never accept role from the request body.
    const user = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        role: "jobseeker",
        });

    const token = createToken(user._id.toString());

    return res.status(201).json({
        success: true,
        message: "Registration successful",
        token,
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });

    }
    catch(error){
         // Handles a duplicate email race condition.
         if(error.code === 11000){
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists",
            });
         }

         next(error);
    }
};


// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if(password.length > 72){
        return res.status(401).json({
            success: false,
            message: "Invalid email or password",
        });

    }

    const user = await User.findOne({
        email:email.trim().toLowerCase(),
        //password hash ko login query mein include karta hai.
    }).select("+password");

    if(!user){
        return res.status(401).json({
            success:false,
            message:"Invalid email or password",
        });
    }

    const isMatch = await bcrypt.compare(     //entered password ko stored hash se verify karta hai.
        password,
        user.password
    );
    if(!isMatch){
        return res.status(401).json({
            success: false,
            message:"Invalid email or password",
        });
    }

    const token = createToken(user._id.toString());

    return res.status(200).json({
        success:true,
        message: "Login successful",
        token,
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });

  } catch (error) {
    next(error);
  }
};
module.exports = {register,login};