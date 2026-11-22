import { useNavigate } from "react-router-dom";
import API from "../services/api";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "jobseeker",
  });


   const navigate = useNavigate();
   const [loading,setLoading] = useState(false);
   const [message, setMessage] = useState("");
   const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try{
      setLoading(true);

      const response = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      setMessage(response.data.message || "Account created successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "jobseeker",
      });

    } catch (err){
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }finally {
      setLoading(false);
    }

    // console.log("Registration Data:", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center bg-blue-600 text-white p-12">

          <h1 className="text-4xl font-bold mb-4">
            HireSprint
          </h1>

          <h2 className="text-2xl font-semibold mb-4">
            Start Your Career Journey
          </h2>

          <p className="text-blue-100 leading-relaxed">
            Create your account, explore exciting job
            opportunities and connect with top recruiters.
          </p>

        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">

          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-6">
            Join HireSprint and get started today.
          </p>

          <form onSubmit={handleSubmit}>

          { message && (
            <p className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
              {message}
              </p>
          )

          }
          {error && (
  <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
    {error}
  </p>
)}

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>

              <div className="flex items-center border rounded-lg px-3">
                <User size={19} className="text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full p-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>

              <div className="flex items-center border rounded-lg px-3">
                <Mail size={19} className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full p-3 outline-none"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <div className="flex items-center border rounded-lg px-3">
                <Lock size={19} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="w-full p-3 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>

              <div className="flex items-center border rounded-lg px-3">
                <Lock size={19} className="text-gray-400" />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full p-3 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="text-gray-400 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Role */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Register As
              </label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 outline-none bg-white"
              >
                <option value="jobseeker">Jobseeker</option>
                <option value="recruiter">Recruiter</option>
              </select>
            </div>

            {/* Register Button */}
            <button
  type="submit"
  disabled={loading}
  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition"
>
  {loading ? "Creating Account..." : "Create Account"}
</button>

          </form>

          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;
