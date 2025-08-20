import { SearchIcon } from "lucide-react";
import React, { useState } from "react";
import useContacts from "../../context/contactsContext/ContactsContext.tsx";
import useConversation from "../../states/useConversation";

const Search = () => {
  const [search, setSearch] = useState("");
  const { allUsers } = useContacts(); // call the hook
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search) return;

    const conversation = allUsers.find((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      alert("user not found");
      setSelectedConversation(null); // or handle "not found" case
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-center w-full">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-full shadow-sm w-full max-w-md bg-white">
            <SearchIcon className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 outline-none bg-transparent text-gray-700"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
