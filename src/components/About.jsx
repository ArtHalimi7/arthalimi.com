import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

const About = () => {
  const contactInfo = [
    { icon: MapPin, label: "Location", value: "Prishtina, Kosovo" },
    { icon: Phone, label: "Phone", value: "" },
    { icon: Mail, label: "Email", value: "arthalimi989@gmail.com" },
    { icon: Globe, label: "Website", value: "arthalimi.netlify.app" },
  ];

  const languages = [
    { lang: "Albanian", level: "Native proficiency" },
    { lang: "English", level: "Advanced proficiency" },
    { lang: "German", level: "Intermediate proficiency" },
  ];

  const softSkills = [
    "Critical thinking",
    "Attention to detail",
    "Creativity",
    "Time management",
    "Adaptibility",
    "Strong communication",
    "Problem-solving",
    "Quick learner",
  ];

  return (
    <section id="about" className="relative min-h-screen overflow-hidden bg-[#18191A] text-zinc-100">
      {/* Grid/Skeleton Lines Overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Outer frame lines */}
        <div className="absolute left-2 right-2 top-2 bottom-[50px]">
          <span className="absolute left-0 right-0 -bottom-12 h-px bg-white/10" />
        </div>
        {/* Inner gutter lines */}
        <span className="absolute top-0 bottom-0 left-10 w-px bg-white/10" />
        <span className="absolute top-0 bottom-0 right-10 w-px bg-white/10" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 pb-16 pt-12 md:pb-24 md:pt-20">
        {/* Container boundary lines */}
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute left-0 top-0 h-full w-px bg-white/10" />
          <span className="absolute right-0 top-0 h-full w-px bg-white/10" />
        </div>
        {/* Professional snapshot label and line */}
        <div className="flex items-center space-x-4 mb-8">
          <span className="text-meta text-[#B6862C]">★ PROFESSIONAL SNAPSHOT</span>
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
            <span className="block">ABOUT</span>
            <span className="block text-[#B71C1C]">ME</span>
          </h2>
          <p className="text-lg md:text-xl font-medium text-zinc-300 text-center tracking-wide mt-4">
            Get to know the person behind the code
          </p>
        </motion.div>
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2">
          {/* Left column - Story & Contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-mono text-center" style={{ color: "#B71C1C" }}>
                &lt;my-story&gt;
              </h3>
              <p className="text-white/80 leading-relaxed text-center">
                I'm a dedicated Web Developer with experience in managing IT
                operations and developing dynamic web applications. My journey
                started with a passion for technology and has evolved into
                expertise in full-stack development.
              </p>
              <p className="text-white/80 leading-relaxed text-center">
                Proficient in ReactJS, NodeJS, and TailwindCSS, I have a
                strong background in both frontend and backend development.
                I'm known for creating customized technology solutions and
                improving user experiences through innovative approaches.
              </p>
              <p className="text-white/80 leading-relaxed text-center">
                Currently seeking to leverage my skills and knowledge in a
                challenging role where I can continue growing and contributing
                to meaningful projects that make a difference.
              </p>
              <h3 className="text-2xl font-mono text-center" style={{ color: "#B71C1C" }}>
                &lt;/my-story&gt;
              </h3>
            </div>
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-xl font-mono text-white text-center">
                Contact Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-3 bg-[#18191A] rounded-lg border border-white/10 hover:border-[#B71C1C] transition-colors"
                  >
                    <item.icon className="w-5 h-5" style={{ color: "#B71C1C" }} />
                    <div>
                      <p className="text-sm text-white/60">{item.label}</p>
                      <p className="text-white">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          {/* Right column - Languages, Soft Skills, Fun Fact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Languages */}
            <div className="bg-[#18191A] p-6">
              <h4 className="text-xl font-mono mb-4 text-center" style={{ color: "#B71C1C" }}>
                Languages
              </h4>
              <div className="space-y-3">
                {languages.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center p-3 bg-[#232425] rounded-lg border border-white/5 hover:border-[#B71C1C] transition-colors"
                  >
                    <span className="text-white">{item.lang}</span>
                    <span className="text-white/70 text-sm">
                      {item.level}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Soft Skills */}
            <div className="bg-[#18191A] p-6">
              <h4 className="text-xl font-mono mb-4 text-center" style={{ color: "#B71C1C" }}>
                Soft Skills
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#232425] p-3 rounded-lg border border-[#B71C1C] text-center hover:bg-[#8B1515] transition-all"
                  >
                    <span className="text-white text-sm">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Fun fact */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#232425] p-6 rounded-2xl border border-[#B71C1C]"
            >
              <h4 className="text-lg font-mono mb-2 text-center" style={{ color: "#B71C1C" }}>
                💡 Fun Fact
              </h4>
              <p className="text-white/80 text-center">
                I love creating 3D animations with ThreeJS and bringing
                interactive experiences to life. When I'm not coding, you'll
                find me exploring new technologies or working on creative side
                projects!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
