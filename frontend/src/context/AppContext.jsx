import { createContext, useContext, useEffect, useState  } from "react";
import { useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, settoken] = useState(null);
  const [blog, setblog] = useState([]);
  const [input, setinput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");
      data.success ? setblog(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");
    if (token) {
      settoken(token);
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);

  const value = {
    axios,
    navigate,
    token,
    settoken,
    blog,
    setblog,
    input,
    setinput,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
