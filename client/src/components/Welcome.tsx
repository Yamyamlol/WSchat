import React from "react";

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-300 px-6">
      <div className="max-w-lg text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
          Welcome to <span className="text-gray-300">ChatApp</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-400 mb-6">
          Connect instantly, share freely, and stay in touch with the people who
          matter most. Whether you’re chatting with friends or collaborating
          with your team, ChatApp keeps conversations simple and fun.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="rounded-2xl px-6 py-3 bg-gray-800 text-gray-100 font-medium shadow hover:bg-gray-700 transition"
          >
            Create a New Account
          </a>
          <a
            href="/login"
            className="rounded-2xl px-6 py-3 border border-gray-600 text-gray-300 font-medium hover:bg-gray-800 transition"
          >
            Login to Existing Account
          </a>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-500 mt-6">
          By continuing, you agree to our{" "}
          <a href="/#" className="underline hover:text-gray-400">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/#" className="underline hover:text-gray-400">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Welcome;
