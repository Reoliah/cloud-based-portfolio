import PageHero from "../components/PageHero";
import EducationDetails from "../components/EducationDetails";
import ContactForm from "../components/Contactform";

export default function EducationPage() {
  return (
    <section className="w-full flex flex-col mt-50 mx-auto px-6 md:px-20 md:gap-24">
      <PageHero title="EDUCATION" />
      <EducationDetails />
      <ContactForm />
      {/* Extra space just to prove the scrolling/sticky effect works */}
      <div className="h-1/2 duration-300"></div>
    </section>
  );
}