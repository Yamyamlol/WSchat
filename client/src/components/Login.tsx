import React from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/authContext/useAuth";

type Inputs = {
  mail: string;
  password: string;
};

const Login = () => {
  const auth = useAuth();

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { authUser, setAuthUser } = auth;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Form submitted ✅", data);
    const userInfo = {
      email: data.mail,
      password: data.password,
    };

    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          alert("Login successful!");
        }
        localStorage.setItem("token", JSON.stringify(response.data));
        setAuthUser(response.data);
        console.log("auth user: ", authUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      {/* Glass Tile Wrapper */}
      <div className="w-full max-w-md bg-gray-800/40 backdrop-blur-md text-gray-100 rounded-2xl shadow-2xl border border-gray-600 p-8">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <div className="flex items-center border border-gray-600 bg-gray-700/60 rounded-lg px-3 py-2 focus-within:border-gray-400 transition-all">
              <Mail className="text-gray-400 w-5 h-5 mr-2" />
              <input
                {...register("mail", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
              />
            </div>
            {errors.mail && (
              <p className="text-red-400 text-sm mt-1">{errors.mail.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center border border-gray-600 bg-gray-700/60 rounded-lg px-3 py-2 focus-within:border-gray-400 transition-all">
              <Lock className="text-gray-400 w-5 h-5 mr-2" />
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                type="password"
                placeholder="Password"
                className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-all duration-200 shadow-md"
          >
            Log In
            <LogIn className="ml-2 w-5 h-5" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-gray-400 space-y-2">
          <p>
            Don’t have an account?{" "}
            <a href="/signup" className="text-gray-300 hover:underline">
              Sign up
            </a>
          </p>
          <p>
            <a
              href="/forgot-password"
              className="text-gray-300 hover:underline"
            >
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
