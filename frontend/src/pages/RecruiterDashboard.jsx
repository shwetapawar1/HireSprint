
import React from "react";
import { Link } from "react-router-dom";
import { BriefcaseBusiness, Users } from "lucide-react";

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* Post a Job */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <BriefcaseBusiness size={35} className="text-blue-600" />

          <h2 className="text-xl font-bold mt-4">
            Post a Job
          </h2>

          <p className="text-gray-600 mt-2">
            Create and publish new job opportunities.
          </p>

          <Link
            to="/post-job"
            className="inline-block mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            + Post a Job
          </Link>
        </div>

        {/* View Applications */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Users size={35} className="text-green-600" />

          <h2 className="text-xl font-bold mt-4">
            Manage Applications
          </h2>

          <p className="text-gray-600 mt-2">
            View candidates who applied for your jobs.
          </p>

          <Link
            to="/recruiter-applications"
            className="inline-block mt-5 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            View Applications
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RecruiterDashboard;
