import { Link ,useNavigate} from "react-router-dom";
import { useState } from "react";
import {registerUser} from "../services/authService"
export default function Register() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");       
        setLoading(true);   
        try {
            const userData = { name, email, password };
            await registerUser(userData);
            navigate("/login");
        } catch (err) {
            if (err.response?.data?.errors) {
            setError(err.response.data.errors[0].msg);
            } else if (err.response?.data?.message) {
            setError(err.response.data.message);
            } else {
            setError("Something went wrong");
            }
        } finally {
            setLoading(false); 
        }
        };

  return (
    <div className="rounded-xl lg:min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl flex flex-col lg:flex-row-reverse overflow-hidden">

        {/* FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 lg:py-20">
          <div className="w-full max-w-md">

            <h2 className="text-3xl lg:text-5xl font-bold mb-4">
              Create Account
            </h2>
            <p className="text-gray-600 mb-6 font-semibold">
              Fill the details to get started
            </p>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6">
                <p className="font-medium">Error</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                value={name}
                onChange={(e)=>{setName(e.target.value);setError("");}}
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
              <input
                value={email}
                onChange={(e)=>{setEmail(e.target.value);setError("");}}
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
              <input
                value={password}
                onChange={(e)=>{setPassword(e.target.value);setError("");}}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold"
                >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>


        {/* LEFT – BANNER */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-500 text-white flex-col items-center justify-center text-center px-10">
          <h2 className="text-4xl font-bold mb-4">Join Us 🚀</h2>
          <p className="text-lg mb-6">
            Create your account and explore features
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100"
          >
            Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
