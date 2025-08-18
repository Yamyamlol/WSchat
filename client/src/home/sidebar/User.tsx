import React from "react";
import useConversation from "../../states/useConversation";

interface UserProps {
  user: {
    _id: string;
    name: string;
    email: string;
    // createdAt?: string;
    // updatedAt?: string;
  };
}

const User: React.FC<UserProps> = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;

  const handleClick = () => {
    if (isSelected) {
      setSelectedConversation(null); // deselect
    } else {
      setSelectedConversation(user); // select
    }
  };
  return (
    <div
      className={`hover:bg-gray-600 duration-300 ${
        isSelected ? "bg-gray-700" : ""
      }`}
      onClick={() => handleClick()}
    >
      <div className="p-4 flex gap-4 cursor-pointer hover:bg-gray-600 duration-200">
        <div className="relative inline-block">
          <div className="w-16 h-16 rounded-full bg-gray-400"></div>
          <span className="absolute top-0 right-0 block w-4 h-4 rounded-full bg-green-500 border-2 border-white"></span>
        </div>
        <div className="info text-white flex justify-center flex-col">
          <h1 className="text-xl font-semibold">{user.name}</h1>
          <span className="text-gray-400 italic">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
