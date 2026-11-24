
import { useEffect, useState } from "react";
import API from "../services/api";

const RecruiterApplications = () => {
  const [applications, setApplications] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // Fetch recruiter applications
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("/application/recruiter", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data =
        response.data.applications ||
        response.data.application ||
        [];

      setApplications(data);

      const statusData = {};
      data.forEach((app) => {
        statusData[app._id] = app.status;
      });

      setSelectedStatuses(statusData);

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
    fetchApplications();
  }, []);

  // Update application status
  const handleStatusUpdate = async (applicationId) => {
    try {
      setUpdatingId(applicationId);
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      const status = selectedStatuses[applicationId];

      const response = await API.patch(
        `/application/${applicationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? { ...app, status }
            : app
        )
      );

      setMessage(
        response.data.message || "Application status updated successfully!"
      );

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to update application status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-gray-800">
        Manage Applications
      </h1>

      <p className="text-gray-600 mt-2">
        Review candidates who applied for your jobs.
      </p>

      {message && (
        <p className="bg-green-100 text-green-700 p-3 rounded-lg mt-5">
          {message}
        </p>
      )}

      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded-lg mt-5">
          {error}
        </p>
      )}

      {loading ? (
        <p className="mt-8">Loading applications...</p>
      ) : applications.length === 0 ? (
        <div className="bg-white p-8 rounded-xl mt-8 text-center">
          <h2 className="text-xl font-semibold">
            No Applications Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Candidates who apply for your jobs will appear here.
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
                {app.application?.name || "Candidate"}
              </h2>

              <p className="text-gray-600 mt-1">
                {app.application?.email || "Email not available"}
              </p>

              <div className="border-t my-4"></div>

              <p className="font-semibold text-gray-800">
                Job: {app.job?.title || "Job not available"}
              </p>

              <p className="text-blue-600 mt-1">
                {app.job?.company}
              </p>

              <p className="text-gray-600 mt-3">
                Current Status: <span className="font-medium capitalize">
                  {app.status}
                </span>
              </p>

              <label className="block font-medium mt-4 mb-2">
                Update Application Status
              </label>

              <select
                value={selectedStatuses[app._id] || app.status}
                onChange={(e) =>
                  setSelectedStatuses((prev) => ({
                    ...prev,
                    [app._id]: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 rounded-lg p-3"
              >
                <option value="pending">Pending</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="accepted">Accepted</option>
              </select>

              <button
                onClick={() => handleStatusUpdate(app._id)}
                disabled={
                  updatingId === app._id ||
                  selectedStatuses[app._id] === app.status
                }
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {updatingId === app._id
                  ? "Updating..."
                  : "Update Status"}
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default RecruiterApplications;
