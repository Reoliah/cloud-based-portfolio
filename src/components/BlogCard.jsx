import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const formatBlogDate = (dateValue) => {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return dateValue;

  const month = new Intl.DateTimeFormat("en-US", { month: "short" })
    .format(date)
    .toUpperCase();
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};

export default function BlogCard({ start, end }) {
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/blogs`)
      .then((file) => file.json())
      .then((data) => {
        const sorted = data
          .sort(
            (oldBlog, newBlog) => new Date(newBlog.date) - new Date(oldBlog.date),
          )
          .slice(start, end);
        setRecentBlogs(sorted);
      })
      .catch(() => setRecentBlogs([]));
  }, [start, end]);

  return (
    <div >
      {recentBlogs.map((blog) => {
        
        const category = blog.category || "PERSONAL GROWTH";

        return (
          <Link
            key={blog.id}
            to={blog.link}
            className="group flex flex-col md:flex-row md:items-center gap-5 md:gap-8 py-8 border-b border-gray-400/50 dark:border-gray-600/80 transition-colors duration-300"
            aria-label={blog.title}
          >
            <div className="flex items-start gap-0 md:w-[40%]">
              <span className="mt-3 h-[7px] w-0 shrink-0 bg-primary-light dark:bg-primary-dark opacity-0 mr-0 transition-all duration-300 ease-out group-hover:w-[7px] group-hover:mr-4 group-hover:opacity-100"></span>

              <div>
                <h3 className="font-display text-[16px] md:text-[20px] leading-tight font-semibold text-copy-light dark:text-copy-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-300">
                  {blog.title}
                </h3>
              </div>
            </div>

            <div className="hidden md:block flex-1 text-center">
              <p className="font-body text-base text-gray-500 dark:text-gray-400">
                {formatBlogDate(blog.date)}
              </p>
            </div>

            <div className="flex items-center md:justify-end md:w-[22%]">
              <p className="font-body text-sm md:text-base font-medium uppercase tracking-wide text-primary-light dark:text-primary-dark">
                {category}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
