
import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  LogOut,
} from "lucide-react";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">
          HireSprint Admin
        </h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>

      {/* Dashboard Content */}
      <div className="p-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name}!
        </h1>

        <p className="text-gray-600 mt-2">
          Manage users, jobs and platform activities.
        </p>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Users size={35} className="text-blue-600" />
            <h2 className="text-lg font-semibold mt-4">
              Total Users
            </h2>
            <p className="text-gray-500 mt-1">
              View all registered users
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <BriefcaseBusiness size={35} className="text-green-600" />
            <h2 className="text-lg font-semibold mt-4">
              Total Jobs
            </h2>
            <p className="text-gray-500 mt-1">
              Manage posted jobs
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <LayoutDashboard size={35} className="text-purple-600" />
            <h2 className="text-lg font-semibold mt-4">
              Admin Panel
            </h2>
            <p className="text-gray-500 mt-1">
              Manage HireSprint platform
            </p>
          </div>

        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Users size={30} className="text-blue-600" />
            <h2 className="text-xl font-bold mt-4">
              Manage Users
            </h2>
            <p className="text-gray-600 mt-2">
              View and manage registered jobseekers and recruiters.
            </p>
             <Link
  to="/manage-users"
  className="inline-block mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
>
  View Users
</Link>

          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <BriefcaseBusiness size={30} className="text-green-600" />
            <h2 className="text-xl font-bold mt-4">
              Manage Jobs
            </h2>
            <p className="text-gray-600 mt-2">
              View and manage all jobs posted on HireSprint.
            </p>
           
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
