import { useState } from "react";
import { Link } from "react-router-dom";
import {Mail,Lock, Eye,EyeOff, Link } from "lucide-react";



const Login = () => {
    const [showPassword, setShowPasswaord] = useState(false);
    const [formData, setFormData] = useState({email: "", password: "",});


    const handleChange  = (e) => {
        const { name, value} = e.target;

        setFormData({...formData, [name]: value, });

    };

    const handleSubmit = (e) => {
        e.prevantDefault();

        console.log("Login Data:", formData);
    }

   

    return(
       <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

           <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden ">

             {/* Left Side */}
             <div className="hidden md:flex flex-col justify-center bg-blue-600 text-white p-12">

                <h1 className="text-4xl font-bold mb-4">HireSprint</h1>

                <h2 className="text-2xl font-semibold mb-4">Find Your Dream Job</h2>

                <p className="text-blue-100 leading-relaxed">
                   Discover opportunities, connect with recruiters,
                   and take the next step in your career journey.

                </p>
             </div>

              {/* Right Side */}
              <div className="p-8 md:p-12">

                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
                <p className="text-gray-500 mb-8">Login To Continue Your Journey.</p>

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <div className="flex items-center borderr rounded-lg px-3">
                            <Mail size={19} className="text-gray-400" />

                            <input 
                               type="email"
                               name="email"
                               value={formData.email}
                               onChange={handleChange}
                               placeholder="Enter you email"
                               className="w-full p-3 outline-none"
                               required
                            />

                           
                        </div>
                    </div>

                      {/* Password */}
                      <div className="mb-6">

                        <label className="block text-sm font-medium mb-2">Password</label>

                        <div className="flex items-center border rounded-lg px-3">
                            <Lock size={19} className="text-gray-400"/>

                            <input
                             type={showPassword ? "text" : "password "}
                             name="password"
                             value={formData.password}
                             onChange={handleChange}
                             placeholder="Enter your password"
                             className="w-full p-3 outline-none"
                             required
                            
                            />

                            <button type="button" onClick={() => setShowPasswaord(!showPassword)}
                                className="text-gray-400">

                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                            </button>
                        </div>

                      </div>

                       {/* Login Button */}
                       <button
                       type="submit"
                       className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                       
                       >
                        Login

                       </button>
                </form>

                <p className="text-center text-gray-500 mt-6">Don't have an account?{" "}
                   <Link to="/register"
                   className="text-blue-600 font-semibold hover:underline"
                   
                   >
                   Register
                   </Link>

                </p>
              </div>
           </div>

       </div>
    )

};

export default Login;