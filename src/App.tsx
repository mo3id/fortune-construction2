import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  Building2,
  Route,
  Construction,
  Users,
  CheckCircle2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Camera,
  Video,
  Mic,
  Send
} from 'lucide-react';
import { cn } from './lib/utils';
import { geminiService } from './services/geminiService';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-brand-dark/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-gold rounded-lg flex items-center justify-center">
            <Building2 className="text-brand-dark" size={24} />
          </div>
          <span className="text-xl font-serif font-bold tracking-wider">FORTUNE</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          {['About', 'Services', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="hover:text-brand-gold transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <motion.button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0px 0px 0px 0px rgba(197, 160, 89, 0)",
              "0px 0px 20px 5px rgba(197, 160, 89, 0.4)",
              "0px 0px 0px 0px rgba(197, 160, 89, 0)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 25px 8px rgba(197, 160, 89, 0.6)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand-gold text-brand-dark px-6 py-2 rounded-full text-sm font-bold hover:bg-white transition-colors cursor-pointer"
        >
          GET A QUOTE
        </motion.button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const videos = [
    "/videos/vedio1.mp4",
    "/videos/vedio2.mp4",
    "/videos/vedio3.mp4"
  ];

  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 8000); // Change video every 8 seconds
    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-brand-dark">
      {/* Video Background Slider */}
      <div className="absolute inset-0 z-0">
        {videos.map((video, index) => (
          <video
            key={video}
            autoPlay
            muted
            loop
            playsInline
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out",
              index === currentVideo ? "opacity-50" : "opacity-0"
            )}
          >
            <source src={video} type="video/mp4" />
          </video>
        ))}
        {/* Consistent Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/40 to-brand-dark" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-8xl font-serif mb-6 leading-tight">
            Building Walls, <br />
            <span className="text-brand-gold italic">Shaping Malawi's Future</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            From monumental infrastructure to sustainable housing, we deliver excellence that stands the test of time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="bg-brand-gold text-brand-dark px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
              EXPLORE OUR MILESTONES <ArrowRight size={20} />
            </button>
            <button className="border border-white/30 hover:bg-white/10 px-8 py-4 rounded-full font-bold transition-all">
              OUR SERVICES
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center gap-6">
        {/* Indicators */}
        <div className="flex gap-3">
          {videos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentVideo(idx)}
              className={cn(
                "w-12 h-1 rounded-full transition-all duration-300",
                currentVideo === idx ? "bg-brand-gold scale-y-150" : "bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator (Optional) */}
        <div className="animate-bounce mt-4 hidden md:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 bg-brand-gold rounded-full h-2" />
          </div>
        </div>
      </div>
    </section>
  );
};

const ImpactTracker = () => {
  const stats = [
    { label: "KM OF ROADS PAVED", value: "1,500+", icon: Route },
    { label: "FAMILIES HOUSED", value: "2,000+", icon: Users },
    { label: "YEARS OF EXPERIENCE", value: "20+", icon: Calendar },
    { label: "SUCCESSFUL PROJECTS", value: "500+", icon: CheckCircle2 },
  ];

  return (
    <section className="py-24 bg-brand-dark border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-5xl mb-16 font-serif">Our Impact Speaks Volumes</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-brand-gold/10 group-hover:bg-brand-gold/20 transition-colors">
                <stat.icon className="text-brand-gold" size={32} />
              </div>
              <div className="text-4xl md:text-5xl font-mono font-bold mb-2 text-brand-gold">
                {stat.value}
              </div>
              <div className="text-xs tracking-widest text-white/50 font-bold uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Expertise = () => {
  const services = [
    {
      title: "Roads & Infrastructure",
      desc: "Connecting communities through high-quality asphalt and concrete paving solutions.",
      image: "https://picsum.photos/seed/road/800/600",
      icon: Route
    },
    {
      title: "Building & Commercial",
      desc: "Creating landmarks and functional spaces that define the Malawian skyline.",
      image: "https://picsum.photos/seed/building/800/600",
      icon: Building2
    },
    {
      title: "Bridges & Structural",
      desc: "Engineering marvels that bridge gaps and withstand the elements for generations.",
      image: "https://picsum.photos/seed/bridge/800/600",
      icon: Construction
    }
  ];

  return (
    <section id="services" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl mb-6 leading-tight">Our Expertise, <br />Your Vision</h2>
            <p className="text-white/60 text-lg">We combine technical precision with innovative design to bring your most ambitious projects to life.</p>
          </div>
          <button className="text-brand-gold font-bold flex items-center gap-2 group">
            VIEW ALL SERVICES <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="relative h-[500px] rounded-3xl overflow-hidden group cursor-pointer"
            >
              <img
                src={service.image}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={service.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute bottom-0 p-8 w-full">
                <div className="mb-4 p-3 bg-brand-gold/20 backdrop-blur-md rounded-xl inline-block">
                  <service.icon className="text-brand-gold" size={24} />
                </div>
                <h3 className="text-2xl font-serif mb-3">{service.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectTimeline = () => {
  const steps = [
    { title: "Concept & Design", desc: "Collaborative brainstorming and architectural planning to align with your vision." },
    { title: "Planning & Permitting", desc: "Navigating regulatory landscapes and ensuring all technical specifications are met." },
    { title: "Execution & Supervision", desc: "On-site management with rigorous adherence to safety and quality standards." },
    { title: "Quality Assurance", desc: "Final inspections and meticulous detailing before the official handover." }
  ];

  return (
    <section className="py-24 bg-brand-gray/30">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-5xl mb-20 font-serif">Our Project Journey</h2>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-white/10 hidden md:block" />

          <div className="space-y-24">
            {steps.map((step, idx) => (
              <div key={idx} className={cn(
                "flex flex-col md:flex-row items-center gap-8 md:gap-0",
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}>
                <div className="flex-1 w-full md:px-12 text-center md:text-left">
                  <div className={cn(
                    "glass-panel p-8 hover:border-brand-gold/50 transition-colors",
                    idx % 2 !== 0 && "md:text-right"
                  )}>
                    <span className="text-brand-gold font-mono text-sm mb-2 block">PHASE 0{idx + 1}</span>
                    <h3 className="text-2xl font-serif mb-4">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-center">
                  <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-dark font-bold shadow-lg shadow-brand-gold/20">
                    {idx + 1}
                  </div>
                </div>

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Milestones = () => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Roads', 'Buildings', 'Bridges'];

  const projects = [
    { title: "Lilongwe Bypass", category: "Roads", image: "https://picsum.photos/seed/p1/800/1000" },
    { title: "Capital Towers", category: "Buildings", image: "https://picsum.photos/seed/p2/800/600" },
    { title: "Shire River Bridge", category: "Bridges", image: "https://picsum.photos/seed/p3/800/800" },
    { title: "Blantyre Mall", category: "Buildings", image: "https://picsum.photos/seed/p4/800/700" },
    { title: "M1 Highway Expansion", category: "Roads", image: "https://picsum.photos/seed/p5/800/900" },
    { title: "Zomba Hospital Wing", category: "Buildings", image: "https://picsum.photos/seed/p6/800/600" },
  ];

  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl mb-8 font-serif">Our Milestones</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all",
                  filter === cat ? "bg-brand-gold text-brand-dark" : "bg-white/5 hover:bg-white/10"
                )}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer break-inside-avoid"
            >
              <img
                src={project.image}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                alt={project.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <span className="text-brand-gold text-xs font-bold tracking-widest mb-1">{project.category}</span>
                <h4 className="text-xl font-serif">{project.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-4xl md:text-6xl mb-8 font-serif">Get in Touch</h2>
            <p className="text-white/60 mb-12 text-lg">Ready to start your next landmark project? Our team is here to help you every step of the way.</p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-brand-gold/10 rounded-2xl">
                  <MapPin className="text-brand-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Our Office</h4>
                  <p className="text-white/50">Plot 12, Area 4, Lilongwe, Malawi</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-4 bg-brand-gold/10 rounded-2xl">
                  <Phone className="text-brand-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Phone</h4>
                  <p className="text-white/50">+265 1 750 000</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="p-4 bg-brand-gold/10 rounded-2xl">
                  <Mail className="text-brand-gold" size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email</h4>
                  <p className="text-white/50">info@fortuneconstruction.mw</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 md:p-10">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Subject</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:border-brand-gold outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Message</label>
                <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-4 h-32 focus:border-brand-gold outline-none" />
              </div>
              <button className="w-full bg-brand-gold text-brand-dark py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white transition-all">
                SEND MESSAGE <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-gold rounded flex items-center justify-center">
              <Building2 className="text-brand-dark" size={18} />
            </div>
            <span className="text-lg font-serif font-bold tracking-wider">FORTUNE</span>
          </div>

          <div className="flex gap-8 text-xs font-bold text-white/40 uppercase tracking-widest">
            <a href="#" className="hover:text-brand-gold">Privacy Policy</a>
            <a href="#" className="hover:text-brand-gold">Terms of Service</a>
            <a href="#" className="hover:text-brand-gold">Careers</a>
          </div>

          <div className="text-xs text-white/30">
            © 2026 FORTUNE CONSTRUCTION. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- API Key Guard ---

const KeyGuard = ({ children }: { children: React.ReactNode }) => {
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore - window.aistudio is global
      if (window.aistudio) {
        // @ts-ignore
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      } else {
        setHasKey(true); // Fallback for dev
      }
    };
    checkKey();
  }, []);

  const handleOpenKey = async () => {
    // @ts-ignore
    if (window.aistudio) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  if (hasKey === false) {
    return (
      <div className="fixed inset-0 z-[100] bg-brand-dark flex items-center justify-center p-6 text-center">
        <div className="max-w-md glass-panel p-8">
          <Sparkles className="text-brand-gold mx-auto mb-6" size={48} />
          <h2 className="text-2xl font-serif mb-4">Unlock AI Visualization</h2>
          <p className="text-white/60 mb-8">
            To use our advanced AI lab (Veo Video & Pro Images), you need to select a paid Google Cloud project API key.
          </p>
          <button
            onClick={handleOpenKey}
            className="w-full bg-brand-gold text-brand-dark py-4 rounded-xl font-bold hover:bg-white transition-all"
          >
            SELECT API KEY
          </button>
          <p className="mt-4 text-xs text-white/30">
            Learn more about <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">Gemini API Billing</a>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const Partners = () => {
  const partners = [
    "Ministry of Public Works",
    "Lilongwe City Council",
    "Malawi Roads Authority",
    "UN-Habitat",
    "Standard Bank",
    "Airtel Malawi"
  ];

  return (
    <section className="py-24 bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-center text-xs font-bold text-white/30 uppercase tracking-[0.3em] mb-12">Our Valued Partners</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center">
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer opacity-40 hover:opacity-100"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Building2 size={20} className="text-white/40" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest leading-tight block">{partner}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  return (
    <KeyGuard>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <ImpactTracker />
        <Expertise />
        <ProjectTimeline />
        <Milestones />
        <Partners />
        <Contact />
        <Footer />
      </div>
    </KeyGuard>
  );
}


