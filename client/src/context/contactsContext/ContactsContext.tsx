import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface User {
  _id: string;
  name: string;
  email: string;
}

const useContacts = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getContacts = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get<{ allUsers: User[] }>(
          "/api/user/getUserProfile",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAllUsers(response.data.allUsers); // ✅ grab the array
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getContacts();
  }, []);

  return { allUsers, loading };
};

export default useContacts;
