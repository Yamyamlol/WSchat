import React from "react";
import User from "./User";
import useContacts from "../../context/contactsContext/ContactsContext";

const Users = () => {
  const { allUsers, loading } = useContacts();
  console.log(allUsers);

  return (
    <div
      style={{ maxHeight: "calc(92vh" }}
      className="overflow-y-auto   cursor-pointer [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-gray-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-400"
    >
      {allUsers.map((u, index) => {
        return <User key={index} user={u} />;
      })}
    </div>
  );
};

export default Users;
