import React from "react";
import Search from "./Search";
import Users from "./Users";
import Sidemenu from "./Sidemenu";

const Sidebar = () => {
  return (
    <div className="flex w-[25%]  bg-gray-800 ">
      <Sidemenu />
      <div className="w-[90%] flex flex-col">
        <Search />
        <Users />
      </div>
    </div>
  );
};

export default Sidebar;
