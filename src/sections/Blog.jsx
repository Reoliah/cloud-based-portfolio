import SectionHeader from "../components/SectionHeader";
import BlogCard from "../components/BlogCard";

export default function Blog() {
	return (
		<section className="px-6 md:px-20 mb-40 w-full mx-auto" id="blogs">
			<SectionHeader title="BLOGS" to="/blogs" />
			<BlogCard start={0} end={2} />
		</section>
	);
}
