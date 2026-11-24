
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  FileText,
  Bookmark,
  Search,
  LogOut,
  User
} from "lucide-react";

const JobseekerDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-blue-600">
          HireSprint
        </h1>

        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2 text-gray-700">
            <User size={20} />
            <span>{user?.name}</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">

        {/* Welcome Section */}
        <div className="bg-blue-600 text-white p-8 rounded-2xl mb-8">

          <h2 className="text-3xl font-bold">
            Welcome back, {user?.name}!
          </h2>

          <p className="mt-3 text-blue-100">
            Find your dream job and take the next step in your career.
          </p>

          <button
            onClick={() => navigate("/jobs")}
            className="mt-5 bg-white text-blue-600 px-5 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <Search size={18} />
              Explore Jobs
            </span>
          </button>

        </div>

        {/* Statistics */}
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          My Dashboard
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Applied Jobs</p>
                <h3 className="text-3xl font-bold mt-2">0</h3>
              </div>
              <FileText className="text-blue-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Saved Jobs</p>
                <h3 className="text-3xl font-bold mt-2">0</h3>
              </div>
              <Bookmark className="text-green-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Available Jobs</p>
                <h3 className="text-3xl font-bold mt-2">Explore</h3>
              </div>
              <Briefcase className="text-purple-600" size={32} />
            </div>
          </div>

        </div>

        {/* Applications Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm mt-8">

         <Link
  to="/my-applications"
  className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
>
  My Applications
</Link>

          <p className="text-gray-500 mt-3">
            Your job application history will appear here.
          </p>

        </div>

      </div>
    </div>
  );
};

export default JobseekerDashboard;
