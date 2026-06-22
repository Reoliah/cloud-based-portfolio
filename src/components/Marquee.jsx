import { motion } from "framer-motion";
import { PiStarFourFill } from "react-icons/pi";

const defaultItems = [
    "INNOVATIVE",
	"COLLABORATIVE",
	"RESOURCEFUL",
	"DEPENDABLE",
];

export default function Marquee({ items = defaultItems, className = "mb-40", speed = 86 }) {
	const repeatedItems = [...items, ...items];
	const sharedRowClasses = "flex w-max items-center";
	const trackClasses = "flex w-max items-center";

	return (
		<section
			className={`relative left-1/2 w-screen -translate-x-1/2 max-w-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_16%,black_84%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_16%,black_84%,transparent)] ${className}`}
		>
			<div className="flex flex-col gap-6">
				<motion.div
					aria-hidden="true"
					className={sharedRowClasses}
					animate={{ x: ["0%", "-50%"] }}
					transition={{
						duration: speed,
						ease: "linear",
						repeat: Infinity,
						repeatType: "loop",
					}}
				>
					<div className={trackClasses}>
						{repeatedItems.map((item, index) => (
							<span
								key={`row-one-${item}-${index}`}
								className="flex items-center gap-6 px-4 leading-none text-[clamp(76px,9.5vw,400px)] font-header font-black uppercase tracking-tight text-primary-light dark:text-primary-dark"
							>
								<span>{item}</span>
								<PiStarFourFill className="shrink-0 text-[36px] text-gray-300 dark:text-gray-600" />
							</span>
						))}
					</div>
				</motion.div>

				<motion.div
					aria-hidden="true"
					className={`${sharedRowClasses} -mt-3`}
					animate={{ x: ["-50%", "0%"] }}
					transition={{
						duration: speed,
						ease: "linear",
						repeat: Infinity,
						repeatType: "loop",
					}}
				>
					<div className={trackClasses}>
						{repeatedItems.map((item, index) => (
							<span
								key={`row-two-${item}-${index}`}
								className="flex items-center gap-6 px-4 leading-none text-[clamp(76px,9.5vw,400px)] font-header font-black uppercase tracking-tight text-primary-light dark:text-primary-dark"
							>
								<span>{item}</span>
								<PiStarFourFill className="shrink-0 text-[36px] text-gray-300 dark:text-gray-600" />
							</span>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}