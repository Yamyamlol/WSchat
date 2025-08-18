import React from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/authContext/useAuth";

type Inputs = {
  name: string;
  mail: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const auth = useAuth();

  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { authUser, setAuthUser } = auth;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.mail,
      password: data.password,
    };
    console.log("user info: ", userInfo);
    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          alert("Signup successful! You can log in now");
        }
        localStorage.setItem("token", JSON.stringify(response.data));
        setAuthUser(response.data);
        console.log("auth user: ", authUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const password = watch("password");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      {/* Glass Tile */}
      <div className="w-full max-w-md bg-gray-800/40 backdrop-blur-md text-gray-100 rounded-2xl shadow-2xl border border-gray-700 p-8">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">
          Create a New Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <div className="flex items-center border border-gray-600 bg-gray-700/60 rounded-lg px-3 py-2 focus-within:border-gray-400 transition-all">
              <User className="text-gray-400 w-5 h-5 mr-2" />
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "At least 3 characters" },
                  maxLength: { value: 20, message: "Max 20 characters" },
                })}
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

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

          {/* Confirm Password Field */}
          <div>
            <div className="flex items-center border border-gray-600 bg-gray-700/60 rounded-lg px-3 py-2 focus-within:border-gray-400 transition-all">
              <Lock className="text-gray-400 w-5 h-5 mr-2" />
              <input
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-all duration-200 shadow-md"
          >
            Sign Up
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-gray-300 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
