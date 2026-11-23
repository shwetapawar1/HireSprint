
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const PostJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    location: "",
    jobType: "full-time",
    minSalary: "",
    maxSalary: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const jobData = {
        title: formData.title,
        company: formData.company,
        description: formData.description,
        location: formData.location,
        jobType: formData.jobType,
        salary: {
          min: Number(formData.minSalary),
          max: Number(formData.maxSalary),
        },
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const response = await API.post("/jobs", jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message || "Job posted successfully!");

      setTimeout(() => {
        navigate("/recruiter-dashboard");
      }, 1000);

    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to post job"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Post a New Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">Job Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="MERN Stack Developer"
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Company Name</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Tech Solutions"
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Job Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the job role..."
              required
              rows="4"
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Location</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Bangalore"
              required
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">
                Minimum Salary
              </label>
              <input
                type="number"
                name="minSalary"
                value={formData.minSalary}
                onChange={handleChange}
                placeholder="300000"
                required
                min="0"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Maximum Salary
              </label>
              <input
                type="number"
                name="maxSalary"
                value={formData.maxSalary}
                onChange={handleChange}
                placeholder="600000"
                required
                min="0"
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Required Skills
            </label>
            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              required
              className="w-full border rounded-lg p-3"
            />
            <p className="text-sm text-gray-500 mt-1">
              Separate skills using commas.
            </p>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-600">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default PostJob;
