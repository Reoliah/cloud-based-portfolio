import SectionHeader from "../components/SectionHeader";
import Contactform from "../components/Contactform";


export default function Contact() {
    return (
        <section className="px-6 md:px-20 w-full mx-auto" id="contact">
              {/* HEADER GROUP (Clickable link to the full About page)
                The 'group' class allows us to trigger animations on children when hovering the parent.
              */}
              <SectionHeader title="Contact" to="/contact" />
              <Contactform />
        </section>
    )
}