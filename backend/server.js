const connectDB = require("./config/db")
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Frontend access
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

// Parse incoming JSON
app.use(express.json({ limit: "1mb" }));

// Health-check API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HireSprint API is running",
  });
});

// Handle unknown routes
app.use((req,res) => {
    res.status(404).json({
       success: false,
       message: "Api route not found",
       statusCode: 404,
    });
});

const PORT = process.env.PORT || 5000;

//funcion call which we created inside config/db
const startServer = async () => {
    await connectDB();
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

startServer();