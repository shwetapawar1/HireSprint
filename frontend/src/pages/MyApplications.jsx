
import { useEffect, useState } from "react";
import { MapPin, Briefcase } from "lucide-react";
import API from "../services/api";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch logged-in user's applications
  const fetchMyApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        "/application/my-applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
// console.log("My Applications API Response:", response.data);
setApplications(response.data.application || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to fetch applications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyApplications();
  }, []);

  // Status colors
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "reviewed":
        return "bg-blue-100 text-blue-700";

      case "shortlisted":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "accepted":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-gray-800">
        My Applications
      </h1>

      <p className="text-gray-600 mt-2">
        Track all your job applications in one place.
      </p>

      {loading ? (
        <p className="mt-8">Loading applications...</p>
      ) : error ? (
        <p className="text-red-500 mt-8">{error}</p>
      ) : applications.length === 0 ? (
        <div className="bg-white p-8 rounded-xl mt-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No Applications Yet
          </h2>

          <p className="text-gray-500 mt-2">
            You haven't applied for any jobs yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-xl font-bold text-gray-800">
                {app.job?.title || "Job no longer available"}
              </h2>

              <p className="text-blue-600 font-medium mt-1">
                {app.job?.company}
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-gray-600 text-sm">

                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {app.job?.location || "Location not available"}
                </span>

                <span className="flex items-center gap-1">
                  <Briefcase size={16} />
                  {app.job?.jobType || "Not specified"}
                </span>

              </div>

              <div className="mt-5">
                <span className="text-gray-600 font-medium">
                  Application Status:
                </span>

                <span
                  className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(app.status)}`}
                >
                  {app.status}
                </span>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default MyApplications;
