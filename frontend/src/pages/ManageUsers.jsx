
import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Users, ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.users);
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user ?"
    )

    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      const response = await API.delete(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setUsers((preUsers) =>
          preUsers.filter((user) => user._id !== userId)
        );

        alert("User deleted successfully!");
      }
    }
    catch (error) {
      alert(
        error.response?.data?.message || " Failed to delete user"
      );
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Users
          </h1>
          <p className="text-gray-600 mt-2">
            View all registered users on HireSprint.
          </p>
        </div>

        <Link
          to="/admin-dashboard"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="flex items-center gap-3">
          <Users size={30} className="text-blue-600" />
          <div>
            <p className="text-gray-500">Total Users</p>
            <h2 className="text-2xl font-bold">
              {users.length}
            </h2>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">

        {loading ? (
          <p className="p-6 text-gray-600">Loading users...</p>
        ) : error ? (
          <p className="p-6 text-red-600">{error}</p>
        ) : users.length === 0 ? (
          <p className="p-6 text-gray-600">No users found.</p>
        ) : (

          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-4 font-medium">
                    {user.name}
                  </td>

                  <td className="p-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                      {user.role}
                    </span>
                  </td>

                  <td className="p-4 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        )}
      </div>
    </div>
  );
};

export default ManageUsers;
