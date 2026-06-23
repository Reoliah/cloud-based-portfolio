import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((r) => r.json())
      .then((data) => {
        const sortedProjects = data.sort(
          (oldProject, newProject) =>
            new Date(newProject.date) - new Date(oldProject.date),
        );
        setProjects(sortedProjects);
        setProject(sortedProjects.find((item) => item.id === id) || null);
      })
      .catch(() => {
        setProjects([]);
        setProject(null);
      });
  }, [id]);

  if (!project) return <div className="p-8">Loading...</div>;

  const currentIndex = projects.findIndex((item) => item.id === project.id);
  const previousProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  const nextProject = currentIndex > 0 ? projects[currentIndex - 1] : null;

  return (
    <section className="px-6 md:px-20 mt-40 mb-40 w-full mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full mx-auto mb-16 flex justify-center cursor-pointer"
      >
        <h2 className="text-center text-primary-light dark:text-primary-dark font-display font-semibold text-2xl md:text-3xl tracking-normal">
          {project.title}
        </h2>
      </motion.div>

      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {project.images && project.images.length > 0 ? (
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full rounded-lg object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-lg" />
            )}
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">{project.title}</h3>
            <p className="font-body text-sm text-gray-500 mb-4">
              Published: {project.date}
            </p>
            {project.externalUrl && (
              <p className="mb-4">
                <Link
                  to={project.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-body text-blue-600 dark:text-blue-400 underline"
                >
                  Visit project link
                </Link>
              </p>
            )}
            {project.techStack && project.techStack.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-surface-light dark:bg-surface-dark px-3 py-1 text-sm text-primary-light/80 dark:text-primary-dark/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <div className="prose prose-neutral font-body text-lg leading-relaxed tracking-wide max-w-none text-copy-light dark:prose-invert dark:text-copy-dark">
              <ReactMarkdown>{project.description || "No description provided."}</ReactMarkdown>
            </div>
          </div>
        </div>

        {project.images && project.images.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {project.images.slice(1).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${project.title}-${i}`}
                className="w-full rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        {/* this section below contains the navigation to the previous and next projects, as well as links back to the home and projects page. It also handles edge cases where there may not be a previous or next project. */}
      </div>
      <div className="mt-16 flex flex-col gap-6">
        <div className="flex justify-between">
          <Link to="/" className="font-body font-semibold uppercase text-sm md:text-md hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300 ">
            Home
          </Link>
          <Link to="/projects" className="font-body font-semibold uppercase text-sm md:text-md hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300 ">
            View all projects
          </Link>
        </div>
        <div className="w-full h-[1px] bg-background-dark dark:bg-background-light"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {previousProject ? (
            <Link
              to={previousProject.link}
              className="group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={previousProject.image}
                alt={previousProject.title}
                className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <p className="font-display text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Previous project</p>
                <h4 className="text-lg font-body font-semibold text-primary-light dark:text-primary-dark">
                  {previousProject.title}
                </h4>
              </div>
            </Link>
          ) : (
            <div className="font-display rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-4 text-sm text-gray-500">
              No previous project.
            </div>
          )}

          {nextProject ? (
            <Link
              to={nextProject.link}
              className="group rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-transform duration-300 hover:-translate-y-1"
            >
              <img
                src={nextProject.image}
                alt={nextProject.title}
                className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <p className="font-display text-xs uppercase tracking-[0.2em] text-gray-500 mb-2">Next project</p>
                <h4 className="text-lg font-body font-semibold text-primary-light dark:text-primary-dark">
                  {nextProject.title}
                </h4>
              </div>
            </Link>
          ) : (
            <div className="font-display rounded-lg border border-dashed border-gray-300 dark:border-gray-700 p-4 text-sm text-gray-500">
              No new project.
            </div>
          )}
        </div>
      </div>
      {/* Extra space just to prove the scrolling/sticky effect works */}
      <div className="h-1/2 duration-300"></div>
    </section>
  );
}
