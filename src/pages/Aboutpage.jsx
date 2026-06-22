import { motion } from "framer-motion";
import Contactform from "../components/Contactform";
import PageHero from "../components/PageHero";
import portrait from "../assets/portrait.png";
import { PiStarFourFill, PiLineVerticalThin, PiLinkedinLogoLight,  PiGithubLogo  } from "react-icons/pi";


export default function Aboutpage() {
  const skills = [
    {
      title: "AWS",
      desc: "On-demand cloud computing platform",
      percent: "69%",
    },
    {
      title: "VS Code",
      desc: "Development IDE",
      percent: "64%",
    },
    {
      title: "Monitoring",
      desc: "Open-source monitoring service",
      percent: "51%",
    },
    {
      title: "Linux",
      desc: "Open-source operating system kernel",
      percent: "61%",
    },
    {
      title: "Kubernetes",
      desc: "Pod & Container orchestration and management platform",
      percent: "60%",
    },
    {
      title: "Iac",
      desc: "Terraform, AWS CloudFormation",
      percent: "58%",
    },
  ];


  return (
    <section className="w-full flex flex-col mt-50 mx-auto px-6 md:px-20 md:gap-24">
      <PageHero title="ABOUT" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* left column image */}
        <div>
          <div className="relative w-[320px] md:w-[380px] h-[421px] md:h-[500px] top-1/7 md:top-1/3 mb-24 md:mb-0">
            {/* card */}
            <div className="absolute top-1/4 md:top-1/3 h-[78%] w-[88%] md:h-[85%] md:w-[80%] translate-x-1/9 rounded-lg bg-primary-light dark:bg-primary-dark transition-colours duration-300 "></div>
            <img
              src={portrait}
              alt="Isaiah Omoboriowo"
              className="absolute md:top-16 w-[82%] md:w-[85%] rounded-lg object-cover z-10"
            />
            <div className="absolute flex top-[92%] md:top-[108%] gap-4 translate-x-28 md:translate-x-36 ">
              <a href="https://github.com/reoliah" target="_blank" rel="noopener noreferrer">
                <PiGithubLogo className="text-4xl text-copy-dark dark:text-copy-light hover:scale-120 transition-transform duration-300 z-50 cursor-pointer" />
              </a>
              <a href="https://www.linkedin.com/in/thedevisaiah" target="_blank" rel="noopener noreferrer">
                <PiLinkedinLogoLight className="text-4xl text-copy-dark dark:text-copy-light hover:scale-120 transition-transform duration-300 z-50 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
        {/* right column text */}
        <div>
          <div className="text-copy-light/50 dark:text-copy-dark/80 font-display font-normal text-[18px] lg:text-[21px] tracking-[0.6px] leading-[1.8] space-y-6">
            <p>
              I am a meticulous individual with a background in cloud computing,
              industrial engineering, and front-end development. and growing
              DevOps knowledge. I enjoy integrating cloud technology and
              optimizing systems to increase productivity. With a proactive
              attitude and a cool, collected approach, I tackle challenges with
              confidence and clarity. I possess strong communication abilities
              and a talent for solving problems; hence, I excel at breaking down
              complex technological solutions, anticipating challenges,
              analysing solutions, and carrying them out accurately. I am
              developing my knowledge of AWS and cloud technologies through the
              ALX Foundation with the goal of integrating them with my area of
              expertise to create impactful solutions. I value flexibility and
              problem-solving as a strategic leader, making sure that every
              choice is informed by insight, vision, and a dedication to
              excellence.
            </p>
            <p className="mt-6 text-copy-light font-normal dark:text-copy-dark/100 font-body leading-[1.6] lg:text-[17px]">
              I am driven to growth and improvement. I am just about wrapping up
              my studies as an Industrial and Production Engineer, in which I
              have developed a keen desire to optimise systems to enhance
              efficiency and effectiveness while preserving productivity. I plan
              to attain mastery of my craft, that include cloud engineering and
              DevOps. I aim to merge the knowledge in my professional field with
              cloud engineering by integrating cloud technologies to improve
              operational efficiency. Among my achievements, I have successfully
              executed high-impact initiatives that showcase my leadership and
              strategic thinking, my ability to include and adapt also sets me
              apart.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="sticky top-24 bg-primary-light dark:bg-primary-dark rounded-md p-6 flex items-center transition-colors duration-300 shadow-md hover:shadow-lg"
            style={{ zIndex: index }}
          >
            <div className="flex items-center gap-1">
              <div className="flex flex-col">
                <h3 className="font-body font-bold text-[25px] text-white/80">
                  {skill.title}
                </h3>
                <p className="font-display text-[18px] text-white/90 leading-6 line-spacing-2 mt-1">
                  {skill.desc}
                </p>
              </div>
              <div>
                <PiLineVerticalThin className="text-gray-200/40 text-5xl opacity-50" />
              </div>
            </div>
            <div>
              <span className="font-display font-semibold text-[56px] pl-3 pr-9 text-white opacity-30">
                {skill.percent}
              </span>
            </div>
          </div>
        ))}
      </div>
      <Contactform />
      {/* Extra space just to prove the scrolling/sticky effect works */}
      <div className="h-1/2 duration-300"></div>
    </section>
  );
}
