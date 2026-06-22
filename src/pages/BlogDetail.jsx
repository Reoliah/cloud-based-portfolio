import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => {
        const sortedBlogs = data.sort(
          (oldBlog, newBlog) => new Date(newBlog.date) - new Date(oldBlog.date),
        );
        setBlogs(sortedBlogs);
        setBlog(sortedBlogs.find((item) => item.id === id) || null);
      })
      .catch(() => {
        setBlogs([]);
        setBlog(null);
      });
  }, [id]);

  if (!blog) return <div className="p-8">Loading...</div>;

  const currentIndex = blogs.findIndex((item) => item.id === blog.id);
  const previousBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;
  const nextBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;

  return (
    <section className="px-6 md:px-20 mt-40 mb-40 w-full mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full mx-auto mb-16 flex flex-col gap-[10px] justify-center cursor-pointer"
      >
        <h2 className="text-center text-primary-light dark:text-primary-dark font-display font-semibold text-2xl md:text-4xl tracking-normal">
          {blog.title}
        </h2>
        <h3 className="text-center text-primary-light dark:text-primary-dark font-body font-medium text-base md:text-lg uppercase tracking-wide">{blog.category}</h3>
      </motion.div>

      <div className="mt-8">
        <div className="flex flex-col gap-8">
          <div>
            {blog.images && blog.images.length > 0 ? (
              <img
                src={blog.images[0]}
                alt={blog.title}
                className="w-full rounded-lg object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            )}
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">{blog.title}</h3>
            <p className="font-body text-sm text-gray-500 mb-4">
              Published: {blog.date}
            </p>
            <div className="prose prose-neutral font-body text-lg leading-relaxed tracking-wide max-w-none text-copy-light dark:prose-invert dark:text-copy-dark">
              <ReactMarkdown>{blog.description || "No content provided."}</ReactMarkdown>
            </div>
          </div>
        </div>

        {blog.images && blog.images.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {blog.images.slice(1).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${blog.title}-${i}`}
                className="w-full rounded-lg object-cover"
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-16 flex flex-col gap-6">
        <div className="flex justify-between">
          <Link
            to="/home"
            className="font-body font-semibold uppercase text-sm md:text-md hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/blogs"
            className="font-body font-semibold uppercase text-sm md:text-md hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300"
          >
            View all blogs
          </Link>
        </div>
        <div className="w-full h-[1px] bg-background-dark dark:bg-background-light"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {previousBlog ? (
            <Link
              to={previousBlog.link}
              className="group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={previousBlog.image}
                alt={previousBlog.title}
                className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <p className="font-display text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                  Previous blog
                </p>
                <h4 className="text-lg font-body font-semibold text-primary-light dark:text-primary-dark">
                  {previousBlog.title}
                </h4>
              </div>
            </Link>
          ) : (
            <div className="font-display rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-4 text-sm text-gray-500">
              No previous blog.
            </div>
          )}

          {nextBlog ? (
            <Link
              to={nextBlog.link}
              className="group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={nextBlog.image}
                alt={nextBlog.title}
                className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <p className="font-display text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">
                  Next blog
                </p>
                <h4 className="text-lg font-body font-semibold text-primary-light dark:text-primary-dark">
                  {nextBlog.title}
                </h4>
              </div>
            </Link>
          ) : (
            <div className="font-display rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-4 text-sm text-gray-500">
              No next blog.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
