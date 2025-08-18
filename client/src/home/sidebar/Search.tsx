import { SearchIcon } from "lucide-react";
import React from "react";

const Search = () => {
  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-center w-full">
        <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-full shadow-sm w-full max-w-md bg-white">
          <SearchIcon className="text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none bg-transparent text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
