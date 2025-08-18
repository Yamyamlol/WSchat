import axios from "axios";
import { LogOutIcon } from "lucide-react";
import Cookies from "js-cookie";
import { useState } from "react";

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      console.log(res);
      localStorage.removeItem("token");
      Cookies.remove("jwt");
      alert("logout succesfully");
      window.location.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div>
      <LogOutIcon
        size={28}
        onClick={handleLogout}
        className="text-white cursor-pointer hover:scale-110 hover:text-red-500 transition-transform duration-200"
      />
    </div>
  );
};

export default Logout;
