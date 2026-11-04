
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes")
const recruiterRoutes = require("./routes/recruiterRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");


const app = express();

// Security headers
app.use(helmet());

// Frontend access
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

// Parse JSON requests
app.use(express.json({ limit: "1mb" }));

// Auth routes
app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/recruiter", recruiterRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/application", applicationRoutes);


// // /server testing
// app.get("/api/application/test", (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Application route is working"
//     });
// });



// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HireSprint API is running",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    statusCode: 500,
  });
});

// Unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
    statusCode: 404,
  });
});

const PORT = process.env.PORT || 5000;

// Connect database first, then start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
