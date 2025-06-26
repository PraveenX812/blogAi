import React, { useState, useEffect } from "react";
//import { blog_data } from "../../assets/assets";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ListBlog = () => {
  const [blog, setBlog] = useState([]);
  const {axios} = useAppContext();

  const fetchblog = async () => {
    try {
      const {data} = await axios.get('/api/admin/blogs')
      if(data.success) {
        setBlog(data.blog)
      } else{
        toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
      }
  };

  useEffect(() => {
    fetchblog();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50">
      <h1>All blog</h1>

      <div className="relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-1g scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                {" "}
                #{" "}
              </th>
              <th scope="col" className="px-2 py-4">
                {" "}
                blog title{" "}
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                {" "}
                date{" "}
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                {" "}
                status{" "}
              </th>
              <th scope="col" className="px-2 py-4">
                {" "}
                action{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {blog.map((blog, index) => {
              return (
                <BlogTableItem
                  key={blog._id}
                  blog={blog}
                  fetchblog={fetchblog}
                  index={index + 1}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListBlog;
