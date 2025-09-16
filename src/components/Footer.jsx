import { Mail, Github, Linkedin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#18191A] border-t border-white/10 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Logo & Copyright */}
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-wider text-white text-lg">&lt;Art.dev/&gt;</span>
          <span className="hidden md:inline text-zinc-600 text-xl">|</span>
          <span className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} Art Halimi</span>
        </div>
        {/* Center: Navigation */}
        <nav className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.2em] text-zinc-400">
          <a href="#about" className="hover:text-[#B71C1C] transition">About</a>
          <a href="#work" className="hover:text-[#B71C1C] transition">Work</a>
          <a href="#education" className="hover:text-[#B71C1C] transition">Education</a>
          <a href="#projects" className="hover:text-[#B71C1C] transition">Projects</a>
          <a href="#services" className="hover:text-[#B71C1C] transition">Services</a>
          <a href="#contact" className="hover:text-[#B71C1C] transition">Contact</a>
        </nav>
        {/* Right: Socials */}
        <div className="flex gap-4">
          <a href="mailto:arthalimi989@gmail.com" className="text-zinc-400 hover:text-[#B71C1C] transition" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://github.com/ArtHalimi7" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#B71C1C] transition" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/arthalimi" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#B71C1C] transition" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://arthalimi.netlify.app" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#B71C1C] transition" aria-label="Portfolio">
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="mt-8 text-center text-[10px] text-zinc-600 tracking-widest">
        Built with React, TailwindCSS, and ❤️ by Art Halimi
      </div>
    </footer>
  );
}