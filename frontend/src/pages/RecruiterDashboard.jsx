import { Link } from "react-router-dom";
import React from "react";

const RecruiterDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, {user?.name}!
      </h1>

      <p className="text-gray-600 mt-2">
        Welcome to your Recruiter Dashboard.

            </p>

        <Link 
        to="/post-job"
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        
        >
        + Post a Job
        </Link>
  

    </div>
  );
};

export default RecruiterDashboard;