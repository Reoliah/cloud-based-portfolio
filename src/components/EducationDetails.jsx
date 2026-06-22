export default function EducationDetails() {
  const educationData = [
    {
      title: "AWS Solutions Architect",
      institution: "Amazon Web Services (AWS)",
      year: "2025",
      description: "Acquired skills in designing secure, scalable, and cost-efficient cloud solutions while aligning technology with business needs being proficient in AWS services, architectural best practices, and cloud migration strategies.",
    },
    {
      title: "AWS Cloud Practitioner",
      institution: "Amazon Web Services (AWS)",
      year: "2025",
      description: "Skilled in cloud fundamentals, AWS core services, pricing models, security, and basic deployment/operations on AWS, enabling effective communication with technical teams and informed decision-making regarding cloud adoption.",
    },
    {
      title: "BSc. Industrial Engineering",
      institution: "University of Ibadan, Nigeria",
      year: "2026",
      description: "Trained to optimize processes, manage production systems, ensure quality and improve productivity. Developed strong analytical and problem-solving skills, with a focus on efficiency and effectiveness in various industries.",
    },
    {
      title: "High School Certificate",
      institution: "St. Graags College, Lagos",
      year: "2019",
      description: "Acquired fundamental mathematical, analytical and operational skills. Developed writing and speaking skills in English language, and a strong foundation in sciences, including physics and chemistry. This education provided a solid base for my further studies in engineering and cloud technologies.",
    },
  ];
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {educationData.map((edu, index) => (
          <div className="flex flex-col gap-3" key={index}>
            <h3 className="font-body font-bold text-[16px] md:text-[20px]">
              {edu.title}
            </h3>
            <span className="flex flex-col gap-1">
              <p className="font-display font-medium text-[12px] md:text-[14px] uppercase text-gray-500">
                {edu.institution}
              </p>
              <p className="font-display font-medium text-[14px] text-gray-500">
                {edu.year}
              </p>
            </span>
            <span>
                <p className="prose font-body font-medium text-[14px] md:text-[16px] text-copy-light/90 dark:text-copy-dark/90">
                  {edu.description}
                </p>
            </span>
          </div>
        ))}
      </div>
  );
}
