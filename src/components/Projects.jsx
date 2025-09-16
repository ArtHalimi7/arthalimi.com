import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Code, Users, Zap, Award, X } from "lucide-react";
import illyonImg from "../assets/illyon.png";
import zahlxImg from "../assets/zahlx.png";
import andiImg from "../assets/andi.png";
import arsaImg from "../assets/arsa.png";

// InlineButton component
const InlineButton = ({ children, className = "", ...props }) => (
	<button
		type="button"
		className={
			"bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-[#B71C1C] hover:to-[#B71C1C] text-white transition-all duration-300 w-full flex items-center justify-center " +
			className
		}
		style={{ borderRadius: 0, padding: "0.75rem 0" }}
		{...props}
	>
		{children}
	</button>
);

// Modal component
const ProjectModal = ({ project, open, onClose }) => {
	if (!project) return null;
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
				>
					<motion.div
						initial={{ scale: 0.95, y: 40 }}
						animate={{ scale: 1, y: 0 }}
						exit={{ scale: 0.95, y: 40 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="bg-[#18191A] max-w-2xl w-full mx-4 rounded-none border border-zinc-700 relative"
					>
						<button
							onClick={onClose}
							className="absolute top-4 right-4 text-zinc-400 hover:text-[#B71C1C] transition"
							aria-label="Close"
						>
							<X className="w-6 h-6" />
						</button>
						<div className="p-8">
							<div className="flex items-center mb-4 gap-4">
								<img
									src={project.image}
									alt={project.title}
									className="w-20 h-20 object-cover border border-zinc-700"
									style={{ borderRadius: 0 }}
								/>
								<div>
									<h3 className="text-2xl font-bold text-[#e7e6e3]">
										{project.title}
									</h3>
									<p className="text-zinc-400 font-medium">
										{project.role}
									</p>
									<span className="text-xs text-zinc-500">
										{project.year} &middot;{" "}
										<span className="text-[#B71C1C]">{project.category}</span>
									</span>
								</div>
							</div>
							<p className="text-zinc-300 mb-4">{project.description}</p>
							<div className="mb-4">
								<h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-1">
									<span className="text-[#B71C1C]">Technologies</span>
								</h4>
								<div className="flex flex-wrap gap-2">
									{project.tech.map((tech, i) => (
										<span
											key={i}
											className="px-3 py-1 border border-zinc-700 text-[#B71C1C] bg-zinc-800 text-sm font-mono"
											style={{ borderRadius: 0 }}
										>
											{tech}
										</span>
									))}
								</div>
							</div>
							<div className="mb-4">
								<h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-1">
									<span className="text-[#B71C1C]">Key Features</span>
								</h4>
								<ul className="list-disc pl-5 text-zinc-200 text-sm space-y-1">
									{project.features.map((feature, i) => (
										<li key={i}>{feature}</li>
									))}
								</ul>
							</div>
							<div className="mb-4">
								<h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-1 flex items-center gap-2">
									<Award className="w-4 h-4 text-[#B71C1C]" />{" "}
									<span className="text-[#B71C1C]">Impact</span>
								</h4>
								<p className="text-zinc-300 text-sm font-mono">
									{project.impact}
								</p>
							</div>
							<div className="flex items-center gap-4 mt-6">
								<a
									href={project.link}
									target="_blank"
									rel="noopener noreferrer"
									className="flex-1"
								>
									<InlineButton>
										<ExternalLink className="w-4 h-4 mr-2" />
										View Project
									</InlineButton>
								</a>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

const Projects = () => {
	const projects = [
		{
			id: 1,
			title: "Illyon",
			category: "Ecommerce Platform",
			image: illyonImg,
			role: "Full-Stack Developer",
			year: "2025",
			status: "Production",
			description:
				"Illyon is a robust ecommerce platform designed for seamless online shopping experiences. It features advanced product catalog management, secure user authentication, shopping cart, order tracking, and integrated payment gateways. The platform supports promotional campaigns, product reviews, and real-time inventory updates, making it ideal for businesses looking to scale online sales.",
			tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "TailwindCSS"],
			features: [
				"Product Catalog & Search",
				"User Authentication & Profiles",
				"Shopping Cart & Checkout",
				"Order Tracking",
				"Integrated Payments",
				"Promotions & Reviews",
				"Admin Dashboard",
			],
			impact:
				"Enabled hundreds of businesses to launch online stores and increased sales conversion rates.",
			link: "https://illyon.com",
		},
		{
			id: 2,
			title: "ZahlX",
			category: "AI Business Platform",
			image: zahlxImg,
			role: "Lead Developer",
			year: "2025",
			status: "Production",
			description:
				"ZahlX is an AI-powered business management platform that streamlines operations for SMEs. It offers intelligent analytics, automated invoicing, expense tracking, and predictive insights. ZahlX integrates with popular accounting tools and provides a dashboard for monitoring KPIs, employee performance, and financial health. The AI assistant helps with decision-making and workflow automation.",
			tech: [
				"React",
				"Node.js",
				"Express",
				"MongoDB",
				"OpenAI API",
				"TailwindCSS",
			],
			features: [
				"AI Analytics & Insights",
				"Automated Invoicing",
				"Expense Tracking",
				"KPI Dashboard",
				"Employee Performance Monitoring",
				"Workflow Automation",
				"Accounting Integrations",
			],
			impact:
				"Helped businesses save time and money by automating management tasks and providing actionable insights.",
			link: "https://zahlx.com",
		},
		{
			id: 3,
			title: "Andi Shkodra",
			category: "Political Campaign Website",
			image: andiImg,
			role: "Frontend Developer",
			year: "2025",
			status: "Production",
			description:
				"A modern campaign website for a municipal assembly candidate, Andi. The site features candidate biography, campaign goals, news updates, event calendar, and volunteer sign-up forms. It integrates social media feeds and donation processing, providing a central hub for supporters and constituents to engage with the campaign.",
			tech: ["React", "TailwindCSS", "Vite", "Framer Motion"],
			features: [
				"Candidate Profile",
				"Campaign Goals",
				"News & Events",
				"Volunteer Sign-Up",
				"Donation Integration",
				"Social Media Feeds",
			],
			impact:
				"Boosted campaign engagement and donations through a user-friendly, informative platform.",
			link: "https://andi.com",
		},
		{
			id: 4,
			title: "Arsa Construction Switzerland",
			category: "Construction Company Website",
			image: arsaImg,
			role: "Frontend Developer",
			year: "2025",
			status: "Production",
			description:
				"Arsa is a professional website for a construction company based in Switzerland, specializing in drywall installation and other construction services. The site showcases completed projects, service offerings, client testimonials, and contact forms. It features a gallery, service request forms, and multilingual support for Swiss and international clients.",
			tech: ["React", "TailwindCSS", "Vite", "Framer Motion"],
			features: [
				"Project Gallery",
				"Service Offerings",
				"Client Testimonials",
				"Contact & Service Request Forms",
			],
			impact:
				"Helped Arsa reach new clients and showcase their expertise in Swiss construction.",
			link: "https://arsa.com",
		},
	];

	const [modalProject, setModalProject] = useState(null);

	const handleCardClick = (project) => setModalProject(project);
	const handleModalClose = () => setModalProject(null);

	const getStatusColor = (status) => {
		switch (status.toLowerCase()) {
			case "production":
				return "from-[#B71C1C] to-[#B71C1C]";
			case "development":
				return "from-zinc-600 to-zinc-700";
			case "showcase":
				return "from-zinc-500 to-zinc-700";
			default:
				return "from-zinc-700 to-zinc-800";
		}
	};

	const getCategoryIcon = (category) => {
		switch (category.toLowerCase()) {
			case "full-stack application":
				return Code;
			case "frontend development":
				return Zap;
			case "creative development":
				return Award;
			case "data visualization":
				return Users;
			default:
				return Code;
		}
	};

	return (
		<section id="projects" className="py-20 bg-[#18191A]">
			<div className="max-w-6xl mx-auto px-6">
				<div className="bg-[#18191A] p-8 md:p-12">
					{/* Professional snapshot label and line */}
					<div className="flex items-center space-x-4 mb-8">
						<span className="text-meta text-[#B6862C]">★ WORK</span>
						<div className="flex-1 h-px bg-white/10" />
					</div>
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.8 }}
						className="mb-16"
					>
						<h2
							className="font-extrabold uppercase leading-[0.85] tracking-tight text-[clamp(2.75rem,6vw,4.5rem)] text-[#e7e6e3] text-center"
							style={{ fontFamily: 'Space Grotesk, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Cantarell, Noto Sans, sans-serif' }}
						>
							<span className="block">FEATURED</span>
							<span className="block"><span className="text-[#B71C1C]">PROJECTS</span></span>
						</h2>
						<p className="text-lg md:text-xl font-medium text-zinc-300 text-center tracking-wide mt-4">
							Showcasing innovative solutions and creative development work
						</p>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
						{projects.map((project, index) => {
							const CategoryIcon = getCategoryIcon(project.category);

							return (
								<motion.div
									key={project.id}
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.8, delay: index * 0.2 }}
									whileHover={{ y: -10 }}
									className="group bg-[#18191A] overflow-hidden border border-white/10 hover:border-zinc-700 hover:shadow-xl transition-all duration-500 flex flex-col h-full relative cursor-pointer"
									style={{ borderRadius: 0 }}
									onClick={() => handleCardClick(project)}
								>
									{/* Project Image */}
									<div
										className="relative h-64 overflow-hidden"
										style={{ borderRadius: 0 }}
									>
										<img
											src={project.image}
											alt={project.title}
											className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
											style={{ borderRadius: 0 }}
										/>

										{/* Overlay on hover */}
										<motion.div
											initial={{ opacity: 0 }}
											whileHover={{ opacity: 1 }}
											transition={{ duration: 0.3 }}
											className="absolute inset-0 flex items-center justify-center bg-zinc-900/70 opacity-0 group-hover:opacity-100 transition-opacity"
										>
											<span className="text-[#B71C1C] text-lg font-semibold bg-zinc-800 px-4 py-2 border border-[#B71C1C]" style={{ borderRadius: 0 }}>
												Click for details
											</span>
										</motion.div>

										{/* Category */}
										<div
											className="absolute top-4 left-4 flex items-center space-x-2 bg-zinc-900/90 backdrop-blur-sm px-3 py-1 border border-zinc-700"
											style={{ borderRadius: 0 }}
										>
											<CategoryIcon className="w-4 h-4 text-[#B71C1C]" />
											<span className="text-zinc-900 text-sm bg-[#e7e6e3] px-2">
												{project.category}
											</span>
										</div>
									</div>

									{/* Minimal Content for Card */}
									<div className="p-8 flex flex-col flex-1">
										<div className="flex items-center justify-between mb-2">
											<h3 className="text-2xl font-bold text-[#e7e6e3] group-hover:text-[#B71C1C] transition-colors">
												{project.title}
											</h3>
											<span className="text-zinc-400 font-mono text-sm">
												{project.year}
											</span>
										</div>
										<p className="text-zinc-400 font-medium mb-2">
											{project.role}
										</p>
										<div className="flex flex-wrap gap-2 mb-2">
											{project.tech.slice(0, 3).map((tech, techIndex) => (
												<span
													key={techIndex}
													className="px-3 py-1 border border-zinc-700 text-[#B71C1C] bg-zinc-800 text-xs font-mono"
													style={{ borderRadius: 0 }}
												>
													{tech}
												</span>
											))}
											{project.tech.length > 3 && (
												<span className="text-xs text-zinc-400">
													+{project.tech.length - 3} more
												</span>
											)}
										</div>
										<p className="text-zinc-300 text-sm line-clamp-3">
											{project.description}
										</p>
										<div className="flex-1" />
										{/* Remove action button from card, now in modal */}
									</div>
								</motion.div>
							);
						})}
					</div>
					{/* Modal */}
					<ProjectModal
						project={modalProject}
						open={!!modalProject}
						onClose={handleModalClose}
					/>
				</div>
			</div>
		</section>
	);
};

export default Projects;
