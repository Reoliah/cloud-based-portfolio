import Hero from "../sections/Hero";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Project from "../sections/Project";
import Blog from "../sections/Blog";
import Education from "../sections/Education";
import Marquee from "../components/Marquee";
import Footer from "../components/Footer"

export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <About />
            <Project />
            <Marquee />
            <Education />
            <Blog />
            <Contact />
            <Footer />
        </div>
    )
}