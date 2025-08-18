import {  Settings } from "lucide-react";
import React from "react";
import Logout from "./Logout";

const Sidemenu = () => {
  return (
    <div className="w-[10%] gap-6 justify-end flex flex-col items-center py-6">
      <Settings
        size={28}
        className="text-white cursor-pointer hover:scale-110 hover:rotate-6 transition-transform duration-200"
      />
    <Logout/>
    </div>
  );
};

export default Sidemenu;
