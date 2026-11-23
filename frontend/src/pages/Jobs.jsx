
import { useEffect, useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import API from "../services/api";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [applyingJobId, setApplyingJobId] = useState(null);
  const [message, setMessage] = useState("");
  const [applyError, setApplyError] = useState("");


  const [appliedJob, setAppliedJob] = useState([]);
  const [checkingApplications, setCheckingApplications] = useState(true);

  // Fetch all jobs from backend
  const fetchJobs = async () => {
    try {
      const response = await API.get("/jobs");
      setJobs(response.data.jobs || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  // showing job is applied
  const fetchMyApplications = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.get("/application/my-applications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const applications = response.data.applications || [];

    const appliedJobIds = applications.map((app) => {
      return app.job?._id;
    }).filter(Boolean);

   setAppliedJob(appliedJobIds);

  } catch (err) {
    console.log("Failed to fetch applications", err);
  } finally {
    setCheckingApplications(false);
  }
};

  useEffect(() => {
    fetchJobs();
     fetchMyApplications();
  }, []);

  // Apply for a job
  const handleApply = async (jobId) => {
    try {
      setApplyingJobId(jobId);
      setMessage("");
      setApplyError("");

      const token = localStorage.getItem("token");

      const response = await API.post(
        `/jobs/${jobId}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppliedJob((prev) => [...prev, jobId]);

      setMessage(
        response.data.message || "Application submitted successfully!"
      );

    } catch (err) {
      setApplyError(
        err.response?.data?.message || "Failed to apply for this job"
      );
    } finally {
      setApplyingJobId(null);
    }
  };

  // Search jobs by title or company
  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.company}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-gray-800">
        Explore Jobs
      </h1>

      <p className="text-gray-600 mt-2">
        Find the right opportunity for your career.
      </p>

      {/* Search Bar */}
      <div className="mt-6 mb-8 relative">
        <Search
          className="absolute left-4 top-3.5 text-gray-400"
          size={22}
        />

        <input
          type="text"
          placeholder="Search by job title or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Application Messages */}
      {message && (
        <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
          {message}
        </p>
      )}

      {applyError && (
        <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {applyError}
        </p>
      )}

      {/* Job List */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-gray-600">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-xl font-bold text-gray-800">
                {job.title}
              </h2>

              <p className="text-blue-600 font-medium mt-1">
                {job.company}
              </p>

              <div className="flex flex-wrap gap-4 mt-4 text-gray-600 text-sm">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {job.location}
                </span>

                <span className="flex items-center gap-1">
                  <Briefcase size={16} />
                  {job.jobType}
                </span>
              </div>

              <p className="text-gray-600 mt-4">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                {job.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <p className="font-semibold mt-4">
                Salary: ₹{job.salary?.min} - ₹{job.salary?.max}
              </p>

              {/* Apply Button */}
             {appliedJob.includes(job._id) ? (
  <button
    disabled
    className="mt-5 w-full bg-green-100 text-green-700 py-3 rounded-lg cursor-not-allowed"
  >
    ✓ Applied
  </button>
) : (
  <button
    onClick={() => handleApply(job._id)}
    disabled={
      applyingJobId === job._id || checkingApplications
    }
    className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60"
  >
    {applyingJobId === job._id
      ? "Applying..."
      : "Apply Now"}
  </button>
)}

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Jobs;
