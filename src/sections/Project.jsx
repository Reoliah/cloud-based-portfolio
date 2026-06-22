import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/Projectcard";

export default function Project() {
  return (
    <section className="px-6 md:px-20 mb-40 w-full mx-auto" id="projects">
      <SectionHeader title="PROJECTS" to="/projects" />
      <ProjectCard start={0} end={4} />
    </section>
  );
}