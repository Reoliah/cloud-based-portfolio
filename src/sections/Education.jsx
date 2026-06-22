import SectionHeader from "../components/SectionHeader";
import EducationDetails from "../components/EducationDetails";

export default function Education() {
  
  return (
    <section className="px-6 md:px-20 mb-40 w-full mx-auto" id="education">
      <SectionHeader title="EDUCATION" to="/education" />
      <EducationDetails />
    </section>
  );
}
