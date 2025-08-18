import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full  bg-gray-800/50 h-full">
      <div className="w-full max-w-2xl p-4 space-y-6 animate-pulse bg-gray-800/50 rounded-2xl shadow-md">
        {/* Incoming message skeleton */}
        <div className="flex items-start space-x-3">
          <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="w-3/4 h-4 bg-gray-600 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-600 rounded"></div>
          </div>
        </div>

        {/* Outgoing message skeleton */}
        <div className="flex items-start justify-end space-x-3">
          <div className="flex-1 space-y-2 text-right">
            <div className="w-2/3 h-4 ml-auto bg-gray-500 rounded"></div>
            <div className="w-1/3 h-4 ml-auto bg-gray-500 rounded"></div>
          </div>
          <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
        </div>

        {/* Another incoming */}
        <div className="flex items-start space-x-3">
          <div className="w-9 h-9 bg-gray-700 rounded-full"></div>
          <div className="flex-1 space-y-2">
            <div className="w-2/3 h-4 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
