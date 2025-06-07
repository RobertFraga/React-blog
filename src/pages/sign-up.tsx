import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase-client";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigation = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setMessage(error.message);
    } else {
      navigation("/dashboard");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center sm:h-screen p-4">
        <div className="max-w-md w-full mx-auto border border-slate-300 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">
              Sign Up
            </h1>
          </div>

          <form onSubmit={handleSignup}>
            <div className="space-y-6">
              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">
                  Email Id
                </label>
                <input
                  name="email"
                  type="email"
                  className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
              >
                Create an account
              </button>
            </div>
            {message && (
              <div className="text-center text-red-600 mt-4">{message}</div>
            )}
            <p className="text-slate-800 text-sm mt-6 text-center">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="text-blue-600 font-medium hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
