import { Mail, Github, Linkedin, Globe } from 'lucide-react';

export default function Footer() {
  return (
  <footer className="bg-[#dadadb] border-t border-white/10 py-10">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left: Logo & Copyright */}
        <div className="flex flex-col items-center md:flex-row gap-1 md:gap-3">
          <span className="font-bold tracking-wider text-zinc-900 text-lg md:text-lg">&lt;Art.dev/&gt;</span>
          <span className="hidden md:inline text-zinc-700 text-xl font-bold">|</span>
          <span className="text-xs text-zinc-700 font-semibold">&copy; {new Date().getFullYear()} Art Halimi</span>
        </div>
        {/* Center: Navigation */}
  <nav className="flex flex-col items-center md:flex-row flex-wrap gap-2 md:gap-6 text-xs uppercase tracking-[0.2em] text-zinc-700 font-bold">
          <a href="#about" className="hover:text-[#B71C1C] transition font-bold">About</a>
          <a href="#work" className="hover:text-[#B71C1C] transition font-bold">Work</a>
          <a href="#education" className="hover:text-[#B71C1C] transition font-bold">Education</a>
          <a href="#projects" className="hover:text-[#B71C1C] transition font-bold">Projects</a>
          <a href="#services" className="hover:text-[#B71C1C] transition font-bold">Services</a>
          <a href="#contact" className="hover:text-[#B71C1C] transition font-bold">Contact</a>
        </nav>
        {/* Right: Socials */}
  <div className="flex flex-row md:flex-row gap-4 justify-center md:justify-end">
          <a href="mailto:arthalimi989@gmail.com" className="text-zinc-700 hover:text-[#B71C1C] transition" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://github.com/ArtHalimi7" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-[#B71C1C] transition" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://linkedin.com/in/arthalimi" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-[#B71C1C] transition" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://arthalimi.netlify.app" target="_blank" rel="noopener noreferrer" className="text-zinc-700 hover:text-[#B71C1C] transition" aria-label="Portfolio">
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}