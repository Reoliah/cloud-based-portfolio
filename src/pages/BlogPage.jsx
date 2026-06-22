import PageHero from "../components/PageHero";
import BlogCard from "../components/BlogCard";
import ContactForm from "../components/Contactform";

export default function BlogPage() {
  return (
    <section className="w-full flex flex-col mt-50 mx-auto px-6 md:px-20 md:gap-24">
      <PageHero title="BLOGS" />
      <div>
        <p className="font-body text-sm uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-6">
          Latest writing
        </p>
        <BlogCard start={0} end={100} />
      </div>
      <ContactForm />
      <div className="h-1/2 duration-300"></div>
    </section>
  );
}
