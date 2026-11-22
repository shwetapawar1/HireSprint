import React from "react";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, {user?.name}!
      </h1>

      <p className="text-gray-600 mt-2">
        Welcome to your Admin Dashboard.
      </p>

    </div>
  );
};

export default AdminDashboard;