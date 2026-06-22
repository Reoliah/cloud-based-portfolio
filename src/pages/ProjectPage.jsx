import PageHero from "../components/PageHero";
import ProjectCard from "../components/Projectcard";
import ContactForm from "../components/Contactform";


export default function ProjectPage() {
    return (
        <section className="w-full flex flex-col mt-50 mx-auto px-6 md:px-20 md:gap-24">
            <PageHero title="PROJECTS" />
            <ProjectCard start={0} end={100} />
            <ContactForm />
            {/* Extra space just to prove the scrolling/sticky effect works */}
      <div className="h-1/2 duration-300"></div>
        </section>
    )
}