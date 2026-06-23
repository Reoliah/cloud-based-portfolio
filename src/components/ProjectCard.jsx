import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProjectCard({ start, end }) {
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects`)
      .then((file) => file.json())
      .then((data) => {
        const sorted = data
          .sort(
            (oldProject, newProject) =>
              new Date(newProject.date) - new Date(oldProject.date),
          )
          .slice(start, end);
        setRecentProjects(sorted);
      })
      .catch(() => setRecentProjects([]));
  }, [start, end]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {recentProjects.map((project) => (
        <Link
          key={project.id}
          to={project.link}
          className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 shadow-sm block"
          aria-label={project.title}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-56 md:h-48 lg:h-56 object-cover transform transition-transform duration-500 ease-out group-hover:scale-105"
          />

          <div className="absolute inset-x-0 bottom-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="bg-primary-light dark:bg-primary-dark text-white px-4 py-3 text-center font-semibold">
              {project.title}
            </div>
          </div>

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none"></div>
        </Link>
      ))}
    </div>
  );
}
