import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, 
  Terminal, 
  Database,
  Sword,
  Mail,
  Github,
  Linkedin,
  ArrowLeft,
  Cpu,
  Code,
  Download,
  ExternalLink
} from "lucide-react";
import { PixelBox, PixelPanel, InventorySlot, GlobalTooltip } from "./components/UI";
import { MOCK_PROJECTS, MOCK_TECH_STACK, MOCK_EXPERIENCE, MOCK_CONTACT, MOCK_CERTIFICATIONS, MOCK_ACTIVITIES } from "./data";
import { playClickSound, playSelectSound } from "./utils/audio";

type Tab = "info" | "work" | "achievements";
const FAST_TRANSITION = { duration: 0.12 };

const SIMPLE_ICON_SLUG: Record<string, string> = {
  React: "react",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  "Next.js": "nextdotjs",
  "Node.js": "nodedotjs",
  NestJS: "nestjs",
  Python: "python",
  Flask: "flask",
  FastAPI: "fastapi",
  TensorFlow: "tensorflow",
  Keras: "keras",
  OpenCV: "opencv",
  MediaPipe: "mediapipe",
  Docker: "docker",
  "Google Sheets": "googlesheets",
  Git: "git",
  "Google Cloud": "googlecloud",
  n8n: "n8n",
  Streamlit: "streamlit",
  YOLO: "yolo",
  "LINE API": "line",
};

function TechLogo({
  name,
  sizeClassName = "w-6 h-6 sm:w-8 sm:h-8",
}: {
  name: string;
  sizeClassName?: string;
}) {
  const slug = SIMPLE_ICON_SLUG[name];
  if (!slug) return null;

  // Using Simple Icons CDN gives us real brand logos without adding assets to the repo.
  // If the CDN doesn't have an icon, <img> will fail silently and we fall back to a default icon.
  const src = `https://cdn.simpleicons.org/${slug}`;
  return (
    <img
      src={src}
      alt={`${name} logo`}
      className={`${sizeClassName} object-contain`}
      loading="lazy"
      draggable={false}
    />
  );
}

function isImageUrl(url: string) {
  const clean = url.split("?")[0].toLowerCase();
  return clean.endsWith(".png") || clean.endsWith(".jpg") || clean.endsWith(".jpeg") || clean.endsWith(".webp") || clean.endsWith(".gif") || clean.endsWith(".svg");
}

function toAssetUrl(url: string) {
  if (/^(?:[a-z]+:)?\/\//i.test(url) || url.startsWith("mailto:")) {
    return url;
  }
  return `${import.meta.env.BASE_URL}${url.replace(/^\/+/, "")}`;
}

function ProofBadge({
  name,
  url,
  className = "",
}: {
  name: string;
  url?: string;
  className?: string;
}) {
  if (!url) return null;
  if (!isImageUrl(url)) return null;
  return (
    <img
      src={toAssetUrl(url)}
      alt={`${name} certificate`}
      className={`w-full h-full object-cover ${className}`}
      loading="lazy"
      draggable={false}
    />
  );
}

function ProjectThumbnail({ thumbnail, title, sizeClassName = "w-full h-full" }: { thumbnail: string; title: string; sizeClassName?: string }) {
  const isImage = thumbnail.startsWith("/");
  if (!isImage) {
    return <span>{thumbnail}</span>;
  }

  return (
    <img
      src={toAssetUrl(thumbnail)}
      alt={`${title} icon`}
      className={`${sizeClassName} object-cover`}
      loading="lazy"
      draggable={false}
    />
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [theme, setTheme] = useState<"day" | "night">("day");

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    playClickSound();
  };

  return (
    <div className={`mc-bg-stone min-h-screen font-sans text-black relative flex flex-col items-center justify-start py-8 px-4 sm:p-8 overflow-hidden ${theme === 'night' ? 'theme-night' : ''}`}>
      <GlobalTooltip />
      
      <div className="w-full max-w-6xl z-10 flex flex-col gap-6">
        
        {/* Navigation / HUD Bar */}
        <motion.nav 
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={FAST_TRANSITION}
          className="mc-panel p-2 flex flex-col sm:flex-row items-center justify-between"
        >
          <div className="flex items-center gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
            <div className="font-pixel text-4xl mc-text-title px-4 py-2 font-bold hidden sm:block">
               Nawattakorn's Inventory
            </div>
            <button
               onClick={() => { playClickSound(); setTheme(t => t === "day" ? "night" : "day"); }}
               className="mc-button px-3 py-2 font-pixel text-xl uppercase self-start sm:self-center ml-auto sm:ml-0"
               data-tooltip={theme === "day" ? "Switch to Night Mode (Deepslate)" : "Switch to Day Mode (Stone)"}
            >
               {theme === "day" ? "🌙" : "☀️"}
            </button>
          </div>
          
          <div className="flex gap-4 w-full sm:w-auto justify-center flex-wrap">
            <button 
              onClick={() => handleTabChange("info")}
              data-tooltip="View character stats"
              className={`font-pixel text-xl sm:text-2xl uppercase px-4 sm:px-6 py-2 mc-button ${activeTab === "info" ? "mc-button-active" : ""}`}
            >
              Info [Q]
            </button>
            <button 
              onClick={() => handleTabChange("work")}
              data-tooltip="View collected resource packs"
              className={`font-pixel text-xl sm:text-2xl uppercase px-4 sm:px-6 py-2 mc-button ${activeTab === "work" ? "mc-button-active" : ""}`}
            >
              Work [E]
            </button>
            <button 
              onClick={() => handleTabChange("achievements")}
              data-tooltip="View achivements"
              className={`font-pixel text-xl sm:text-2xl uppercase px-4 sm:px-6 py-2 mc-button ${activeTab === "achievements" ? "mc-button-active" : ""}`}
            >
              Achivements [R]
            </button>
          </div>
        </motion.nav>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "info" && <InfoScreen key="info" setActiveTab={setActiveTab} />}
          {activeTab === "work" && <WorkScreen key="work" />}
          {activeTab === "achievements" && <AchievementsScreen key="achievements" />}
        </AnimatePresence>

      </div>
    </div>
  );
}

const InfoScreen: React.FC<{ setActiveTab: (t: Tab) => void }> = ({ setActiveTab }) => {
  const featuredAchivements = [...MOCK_CERTIFICATIONS, ...MOCK_ACTIVITIES].slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.99 }}
      transition={FAST_TRANSITION}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* Left Column: Avatar, Contact & Equipment */}
      <div className="flex flex-col gap-6">
        <PixelBox className="p-4 flex flex-col items-center text-center">
          <div className="w-48 h-48 mc-panel-inset mb-4 p-0 overflow-hidden relative">
            <img
              src={toAssetUrl("/project/pro2.png")}
              alt="Nawattakorn profile"
              className="absolute inset-0 w-full h-full object-cover block"
              loading="eager"
              draggable={false}
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement | null;
                if (fallback) fallback.style.display = "block";
              }}
            />
            <User
              size={80}
              strokeWidth={1}
              className="text-[#3f3f3f] absolute inset-0 m-auto"
              style={{ display: "none" }}
            />
          </div>
          <h1 className="font-pixel text-3xl sm:text-4xl font-bold uppercase mb-1 break-words w-full mc-text-title">Nawattakorn</h1>
          <div className="bg-[#1e1e1e] text-white px-2 py-1 font-pixel text-lg tracking-wider border-2 border-black mc-text-white">
            AI & Software Eng.
          </div>
        </PixelBox>

        <PixelBox className="p-4">
          <h2 className="font-pixel text-2xl mc-text-title uppercase mb-2">
            Contact
          </h2>
          <div className="flex flex-col gap-3 font-pixel text-xl mb-4">
            <a href={`mailto:${MOCK_CONTACT.email}`} data-tooltip="Email" className="mc-button px-3 py-2 flex items-center gap-3">
              <Mail size={18}/> {MOCK_CONTACT.email}
            </a>
            <a href={`https://${MOCK_CONTACT.github}`} data-tooltip="Visit GitHub" target="_blank" rel="noreferrer" className="mc-button px-3 py-2 flex items-center gap-3">
              <Github size={18}/> {MOCK_CONTACT.github}
            </a>
            <a href={`https://${MOCK_CONTACT.linkedin}`} data-tooltip="Visit LinkedIn" target="_blank" rel="noreferrer" className="mc-button px-3 py-2 flex items-center gap-3">
              <Linkedin size={18}/> {MOCK_CONTACT.linkedin}
            </a>
          </div>
          <a 
            href={toAssetUrl("/Nawattakorn_Resume.pdf")}
            download="Nawattakorn_Resume.pdf"
            onClick={() => playClickSound()}
            className="mc-button px-3 py-3 w-full flex items-center justify-center gap-2 text-xl mt-2 font-bold"
            data-tooltip="Save Resume PDF to Disk"
            target="_blank"
            rel="noreferrer"
          >
            <Download size={20} /> Download Resume
          </a>
        </PixelBox>
      </div>

      {/* Right Column: Descriptions, Experience & Skills */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        
        <PixelBox className="p-6">
          <h2 className="font-pixel text-3xl mc-text-title uppercase mb-4 flex items-center gap-2">
             Profile Overview
          </h2>
          <PixelPanel className="shadow-none">
            <div className="font-sans text-[#e0e0e0] leading-relaxed text-lg">
              <p className="font-bold text-white mc-text-white mb-2">
                Current Focus: As a recent Computer Engineering graduate, I focus on building practical solutions for real-world problems.
              </p>
              <p>
                I enjoy designing and implementing meaningful products by combining software development and AI. My goal is to turn complex challenges into useful systems that improve everyday life.
              </p>
            </div>
          </PixelPanel>
        </PixelBox>

        <PixelBox className="p-6 focus:outline-none">
          <h2 className="font-pixel text-3xl mc-text-title uppercase mb-4 flex items-center gap-2">
            Technical Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_TECH_STACK.map((group, idx) => (
              <PixelPanel key={idx} className="flex flex-col">
                <h3 className="font-pixel text-xl text-white mc-text-white mb-3 border-b-4 border-[#373737] pb-2">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(skill => {
                    const iconMap: Record<string, React.ReactNode> = {
                      React: <TechLogo name="React" />,
                      TypeScript: <TechLogo name="TypeScript" />,
                      "Tailwind CSS": <TechLogo name="Tailwind CSS" />,
                      "Next.js": <TechLogo name="Next.js" />,
                      "Node.js": <TechLogo name="Node.js" />,
                      NestJS: <TechLogo name="NestJS" />,
                      Python: <TechLogo name="Python" />,
                      Flask: <TechLogo name="Flask" />,
                      FastAPI: <TechLogo name="FastAPI" />,
                      TensorFlow: <TechLogo name="TensorFlow" />,
                      Keras: <TechLogo name="Keras" />,
                      OpenCV: <TechLogo name="OpenCV" />,
                      MediaPipe: <TechLogo name="MediaPipe" />,
                      Docker: <TechLogo name="Docker" />,
                      Git: <TechLogo name="Git" />,
                      "Google Cloud": <TechLogo name="Google Cloud" />,
                      n8n: <TechLogo name="n8n" />,
                    };
                    return (
                      <InventorySlot 
                        key={skill} 
                        icon={iconMap[skill] || <Code size={24}/>} 
                        title={skill} 
                        active
                      />
                    );
                  })}
                </div>
              </PixelPanel>
            ))}
          </div>
        </PixelBox>

        <PixelBox className="p-6 flex-1">
          <h2 className="font-pixel text-3xl mc-text-title uppercase mb-4 flex items-center gap-2">
             Experience Log
          </h2>
          <PixelPanel className="mb-6">
            <div className="flex flex-col gap-8 font-sans">
              {MOCK_EXPERIENCE.map(exp => (
                <div key={exp.id} className="border-l-4 border-[#c6c6c6] pl-4 relative">
                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-1 gap-2">
                     <h3 className="font-bold text-xl uppercase leading-none text-white mc-text-white">{exp.role}</h3>
                     <span className="text-sm font-pixel text-[#1e1e1e] bg-[#c6c6c6] px-2 border-2 border-black uppercase whitespace-nowrap">{exp.period}</span>
                   </div>
                   <div className="font-medium text-[#c6c6c6] uppercase tracking-wide text-sm mb-3">@ {exp.company}</div>
                   <p className="text-[#e0e0e0] leading-relaxed whitespace-pre-line text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </PixelPanel>

          <h2 className="font-pixel text-3xl mc-text-title uppercase mb-4 flex items-center gap-2">
             Featured Achivements
          </h2>
          <PixelPanel className="flex flex-col gap-3">
            {featuredAchivements.map(item => (
              <div key={item.id} className="bg-[#a0a0a0] border-2 border-[#555555] p-3 flex justify-between items-center gap-3 text-sm sm:text-base">
                 <div className="flex items-center gap-3 min-w-0">
                   <span className="text-2xl drop-shadow-md shrink-0">{item.icon}</span>
                   <div className="flex flex-col text-left min-w-0">
                     <span className="font-bold text-[#1e1e1e] leading-tight truncate">{item.name}</span>
                     {item.issuer && <span className="text-xs text-[#373737] font-sans font-bold truncate">{item.issuer}</span>}
                   </div>
                 </div>
                 <div className="flex items-center gap-2 shrink-0">
                   {item.proofUrl && (
                     <a
                      href={toAssetUrl(item.proofUrl)}
                       target="_blank"
                       rel="noreferrer"
                       onClick={() => playClickSound()}
                       className="mc-button px-2 py-1 font-pixel text-sm uppercase flex items-center gap-1"
                       data-tooltip="Open proof file"
                     >
                       <ExternalLink size={16} /> View
                     </a>
                   )}
                   <span className="text-xs sm:text-sm font-pixel text-white bg-[#1e1e1e] px-2 py-[2px] uppercase whitespace-nowrap border-2 border-black shadow-sm">{item.date}</span>
                 </div>
              </div>
            ))}

            <button
              onClick={() => { playClickSound(); setActiveTab("achievements"); }}
              className="mc-button mt-2 px-6 py-2 font-pixel text-xl uppercase text-[#3f3f3f] w-full"
            >
              View All Achivements
            </button>
          </PixelPanel>
        </PixelBox>

      </div>
    </motion.div>
  );
};

function WorkScreen() {
  const [selectedProject, setSelectedProject] = useState(MOCK_PROJECTS[0]);
  const [viewMode, setViewMode] = useState<"inventory" | "detail">("inventory");

  if (viewMode === "detail") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.995 }}
        transition={FAST_TRANSITION}
      >
        <PixelBox className="p-4 sm:p-8 min-h-[600px] flex flex-col">
          
          {/* Back Button */}
          <div className="mb-6">
            <button 
              onClick={() => { playClickSound(); setViewMode("inventory"); }} 
              className="mc-button px-4 py-2 font-pixel text-2xl uppercase flex items-center gap-2 w-max"
            >
              <ArrowLeft size={24} /> Back
            </button>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 mb-8 border-b-4 border-[#555555] pb-8">
            <div className="w-32 h-32 mc-panel-inset flex items-center justify-center text-6xl shrink-0 p-0 shadow-lg bg-[#555555] overflow-hidden">
              <ProjectThumbnail thumbnail={selectedProject.thumbnail} title={selectedProject.title} />
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-pixel text-5xl sm:text-6xl font-bold uppercase mb-4 leading-none mc-text-title">{selectedProject.title}</h1>
              <div className="text-xl font-bold uppercase tracking-widest text-[#555555] flex items-center justify-center md:justify-start gap-2">
                 Project Type: {selectedProject.category} 
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex flex-col gap-6">
            {/* Overview */}
            <PixelPanel className="p-5 sm:p-8">
              <h2 className="font-pixel text-3xl mc-text-title mb-4">Overview</h2>
              <p className="text-lg text-[#e0e0e0] leading-relaxed">
                {selectedProject.fullDescription}
              </p>
            </PixelPanel>

            <div className="md:col-span-2 grid grid-cols-1 gap-6">
              {/* Features */}
              <PixelPanel className="p-5 sm:p-8 bg-[#8b8b8b]">
                <h2 className="font-pixel text-3xl mc-text-title mb-4">Core Features</h2>
                <ul className="text-lg text-[#e0e0e0] space-y-2 list-none p-0 m-0">
                  {selectedProject.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[#c6c6c6] mt-1 font-pixel text-sm">▶</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </PixelPanel>
              
              {/* External Links */}
              {selectedProject.links && selectedProject.links.length > 0 && (
                <div className="flex flex-wrap gap-4 mt-2">
                  {selectedProject.links.map((link, idx) => (
                     <a 
                       key={idx} 
                       href={link.url}
                       target="_blank"
                       rel="noreferrer"
                       className="mc-button px-6 py-3 flex items-center gap-2 font-pixel text-2xl"
                     >
                       {link.label.includes("GitHub") ? <Github size={24}/> : <ExternalLink size={24}/>}
                       {link.label}
                     </a>
                  ))}
                </div>
              )}
            </div>

            {/* Tech Stack */}
            <div className="md:col-span-1 grid grid-cols-1 gap-6">
              <PixelPanel className="p-5 sm:p-8 flex flex-col bg-[#8b8b8b] h-full">
                <h2 className="font-pixel text-3xl mc-text-title mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-2 mt-auto mb-auto">
                  {selectedProject.tech.map(t => {
                    const iconMap: Record<string, React.ReactNode> = {
                      Flask: <TechLogo name="Flask" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />,
                      OpenCV: <TechLogo name="OpenCV" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />,
                      MediaPipe: <TechLogo name="MediaPipe" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />,
                      TensorFlow: <TechLogo name="TensorFlow" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />,
                      LSTM: <Cpu size={32} />,
                      YOLO: <TechLogo name="YOLO" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />,
                      Streamlit: <TechLogo name="Streamlit" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />,
                      Docker: <TechLogo name="Docker" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />,
                      "Google Sheets": <TechLogo name="Google Sheets" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />,
                      CNN: <Cpu size={32} />,
                      n8n: <TechLogo name="n8n" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />,
                      "OpenRouter LLM": <Cpu size={32} />,
                      "LINE API": <TechLogo name="LINE API" sizeClassName="w-8 h-8 sm:w-10 sm:h-10" />,
                    };
                    return (
                      <InventorySlot 
                        key={t}
                        icon={iconMap[t] || <Code size={32}/>}
                        title={t}
                        active
                      />
                    );
                  })}
                </div>
              </PixelPanel>
            </div>

            {/* Gallery */}
            <PixelPanel className="p-5 sm:p-8">
              <h2 className="font-pixel text-3xl mc-text-title mb-4">Gallery</h2>
              <div className="flex flex-col gap-8">
                {selectedProject.images.map((img, idx) => (
                  <a
                    key={idx}
                    href={toAssetUrl(img)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => playClickSound()}
                    className="block"
                    data-tooltip="View full image"
                  >
                    <div className="bg-[#e6e6e6] border-[6px] border-[#373737] p-3 sm:p-4 flex relative group">
                      <div className="w-full max-w-4xl mx-auto">
                        <div className="bg-white border-4 border-[#1e1e1e] p-2 sm:p-3">
                          <img
                            src={toAssetUrl(img)}
                            alt={`${selectedProject.title} screenshot ${idx + 1}`}
                            className="w-full h-auto max-h-[520px] object-contain"
                          />
                        </div>
                        <div className="mt-3 font-pixel text-xl text-[#1e1e1e] uppercase tracking-wider flex items-center justify-between gap-3">
                          <span>Screenshot {idx + 1}</span>
                          <span className="text-base text-[#373737] font-sans font-bold normal-case opacity-80">
                            Click to view
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </PixelPanel>
          </div>
        </PixelBox>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={FAST_TRANSITION}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
    >
      
      {/* Left Column: Project List (Resource Pack Style) */}
      <div className="lg:col-span-2 flex flex-col gap-4 self-start">
        
        <PixelBox className="flex flex-col p-4 max-h-[600px]">
          <h2 className="font-pixel text-2xl mc-text-title uppercase mb-2 inline-block self-start">
            Available Projects
          </h2>
          <PixelPanel className="flex flex-col gap-2 p-2 overflow-y-auto custom-scrollbar">
             {MOCK_PROJECTS.map((project) => (
                <div 
                  key={project.id}
                  onClick={() => { playSelectSound(); setSelectedProject(project); }}
                  className={`group relative flex items-center p-2 mb-1 mc-button ${
                    selectedProject.id === project.id 
                    ? "mc-button-active" 
                    : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-[#555555] border-4 border-[#373737] flex items-center justify-center text-4xl shrink-0 z-10 overflow-hidden">
                    <ProjectThumbnail thumbnail={project.thumbnail} title={project.title} />
                  </div>

                  {/* Text Details */}
                  <div className="ml-4 pr-8 flex flex-col items-start overflow-hidden w-full text-left z-10">
                    <h3 className={`font-pixel text-3xl uppercase tracking-wide truncate w-full ${selectedProject.id === project.id ? "mc-text-title font-bold" : "text-[#1e1e1e]"}`}>
                      {project.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[color:var(--mc-text-title)] truncate w-full leading-snug font-medium">
                      {project.description}
                    </p>
                  </div>

                  {/* Selection Indicator (Arrow) */}
                  {selectedProject.id === project.id && (
                    <div className="absolute right-4 text-[#1e1e1e] text-3xl z-10 font-pixel animate-pulse">
                      ▶
                    </div>
                  )}
                </div>
              ))}
          </PixelPanel>
        </PixelBox>
      </div>

      {/* Right Column: Item Preview Panel */}
      <div className="h-full">
        <PixelBox className="p-4 h-full flex flex-col min-h-[400px]">
          <h2 className="font-pixel text-2xl mc-text-title uppercase mb-2 self-start opacity-0">Preview</h2>
          <PixelPanel className="h-full flex flex-col items-center text-center p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={FAST_TRANSITION}
                className="flex flex-col h-full items-center w-full"
              >
                <div className="w-24 h-24 bg-[#555555] border-[6px] border-[#373737] flex items-center justify-center text-5xl mb-6 mt-4 overflow-hidden">
                  <ProjectThumbnail thumbnail={selectedProject.thumbnail} title={selectedProject.title} />
                </div>
                
                <h2 className="font-pixel text-4xl font-bold uppercase leading-none mb-2 text-white mc-text-white">
                  {selectedProject.title}
                </h2>
                
                <div className="text-sm font-bold uppercase tracking-widest text-[#c6c6c6] mb-6 flex items-center gap-2">
                  {selectedProject.category} 
                </div>

                <p className="text-base text-[#e0e0e0] leading-relaxed mb-8 flex-1">
                  {selectedProject.description}
                </p>

                <div className="w-full mt-auto">
                  <button 
                    onClick={() => { playClickSound(); setViewMode("detail"); }}
                    data-tooltip={`Open details for ${selectedProject.title}`}
                    className="mc-button w-full py-4 font-pixel text-3xl uppercase text-[#3f3f3f]"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </PixelPanel>
        </PixelBox>
      </div>
      
    </motion.div>
  );
}

function AchievementsScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={FAST_TRANSITION}
      className="flex flex-col gap-6"
    >
      <PixelBox className="p-6">
        <h2 className="font-pixel text-3xl sm:text-4xl mc-text-title uppercase mb-2 flex items-center gap-4">
           Achivements
        </h2>
        <p className="font-sans text-[#4b4b4b] font-medium leading-relaxed">
          A collection of achivements with proof files.
        </p>
      </PixelBox>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...MOCK_CERTIFICATIONS, ...MOCK_ACTIVITIES].map((item) => (
          <PixelBox key={item.id} className="p-4 flex flex-col items-center text-center h-full group hover:-translate-y-1 transition-transform">
            <PixelPanel className="w-full h-40 flex items-center justify-center mb-4 bg-[#8b8b8b] relative overflow-hidden p-0">
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_2px,transparent_2px)] [background-size:16px_16px]"></div>
               {item.badgeUrl ? (
                 <div className="absolute inset-0 z-10">
                   <ProofBadge name={item.name} url={item.badgeUrl} />
                 </div>
               ) : (
                 <div className="text-6xl drop-shadow-[4px_4px_0_rgba(0,0,0,0.3)] z-10 group-hover:scale-110 transition-transform">{item.icon}</div>
               )}
            </PixelPanel>
            
            <h3 className="font-pixel text-2xl mc-text-title uppercase leading-tight mb-2 w-full px-2">
              {item.name}
            </h3>
            
            <div className="mt-auto flex flex-col gap-2 w-full pt-4">
              <div className="text-sm font-sans font-bold text-[#e0e0e0] bg-[#373737] py-1 border-2 border-[#1e1e1e] w-full px-2 break-words">
                {item.issuer || "—"}
              </div>
              <div className="font-pixel text-xl text-white mc-text-white bg-[#1e1e1e] px-2 py-1 uppercase tracking-wider border-2 border-black w-max mx-auto shadow-sm">
                Date: {item.date}
              </div>
              {item.proofUrl && (
                <a
                  href={toAssetUrl(item.proofUrl)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playClickSound()}
                  className="mc-button px-4 py-2 font-pixel text-xl uppercase flex items-center justify-center gap-2"
                  data-tooltip="Open proof file"
                >
                  <ExternalLink size={18} /> View
                </a>
              )}
            </div>
          </PixelBox>
        ))}
      </div>

    </motion.div>
  );
}