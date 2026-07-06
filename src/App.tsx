import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mail,
  Github,
  Linkedin,
  Download,
  ExternalLink,
  X
} from "lucide-react";
import { ModernCard, ModernBadge, ModernTimelineItem, ModernProjectCard } from "./components/ModernUI";
import { MOCK_PROJECTS, MOCK_TECH_STACK, MOCK_EXPERIENCE, MOCK_CONTACT, MOCK_CERTIFICATIONS, MOCK_ACTIVITIES } from "./data";

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
  const [expandedImg, setExpandedImg] = useState<string | null>(null);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden mode-modern modern-gradient-bg py-6 px-4 sm:py-10 sm:px-6 md:px-12 lg:px-24 flex flex-col gap-8">
      {/* MODERN PROFESSIONAL LAYOUT */}
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-8 z-10">
        
        {/* Header Navigation */}
        <motion.nav
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={FAST_TRANSITION}
          className="modern-card px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md"
        >
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span className="modern-text-gradient">Nawattakorn.dev</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-950/40 p-1 rounded-xl w-full md:w-auto">
            <button
              onClick={() => handleTabChange("info")}
              className={`flex-1 md:flex-none text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "info"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              About & Experience
            </button>
            <button
              onClick={() => handleTabChange("work")}
              className={`flex-1 md:flex-none text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "work"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => handleTabChange("achievements")}
              className={`flex-1 md:flex-none text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg transition-all cursor-pointer ${
                activeTab === "achievements"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Achievements
            </button>
          </div>
        </motion.nav>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === "info" && <ModernInfoScreen key="modern-info" />}
          {activeTab === "work" && <ModernWorkScreen key="modern-work" setExpandedImg={setExpandedImg} />}
          {activeTab === "achievements" && <ModernAchievementsScreen key="modern-achievements" setExpandedImg={setExpandedImg} />}
        </AnimatePresence>
      </div>

      {/* Full-Screen Image Lightbox Overlay */}
      <AnimatePresence>
        {expandedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedImg(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 cursor-zoom-out"
          >
            {/* Close button */}
            <button
              onClick={() => setExpandedImg(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-50 cursor-pointer"
            >
              <X size={24} />
            </button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={FAST_TRANSITION}
              className="relative max-w-full max-h-[90vh] flex items-center justify-center"
            >
              <img
                src={toAssetUrl(expandedImg)}
                alt="Expanded view"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ==========================================
   MODERN PROFESSIONAL COMPONENTS (NEW)
   ========================================== */

const ModernInfoScreen: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.995 }}
      transition={FAST_TRANSITION}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left font-sans"
    >
      {/* Left Column: Profile Card */}
      <div className="flex flex-col gap-6">
        <ModernCard className="flex flex-col items-center text-center p-6 bg-white/70 dark:bg-slate-900/65 backdrop-blur-md">
          <div className="w-40 h-40 rounded-full overflow-hidden mb-6 border-4 border-indigo-500/20 dark:border-indigo-400/20 shadow-xl relative group bg-slate-100 dark:bg-slate-800">
            <img
              src={toAssetUrl("/project/Me.jpg")}
              alt="Nawattakorn Profile"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 mb-1 tracking-tight">
            Nawattakorn
          </h1>
          <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-6">
            AI & Software Engineer
          </p>

          {/* Social Links */}
          <div className="flex flex-col gap-2 w-full mb-6 text-left">
            <a
              href={`mailto:${MOCK_CONTACT.email}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-350 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-500/5 transition-all w-full overflow-hidden"
            >
              <Mail size={16} className="text-indigo-500 shrink-0" />
              <span className="truncate">{MOCK_CONTACT.email}</span>
            </a>
            <a
              href={`https://${MOCK_CONTACT.github}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-350 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-500/5 transition-all w-full overflow-hidden"
            >
              <Github size={16} className="text-slate-950 dark:text-white shrink-0" />
              <span className="truncate">{MOCK_CONTACT.github}</span>
            </a>
            <a
              href={`https://${MOCK_CONTACT.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-350 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-500/5 transition-all w-full overflow-hidden"
            >
              <Linkedin size={16} className="text-blue-500 shrink-0" />
              <span className="truncate">{MOCK_CONTACT.linkedin}</span>
            </a>
          </div>

          <a
            href={toAssetUrl("/Nawattakorn_Resume.pdf")}
            download="Nawattakorn_Resume.pdf"
            className="flex items-center justify-center gap-2 py-3 px-6 w-full text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 hover:-translate-y-0.5 cursor-pointer"
            target="_blank"
            rel="noreferrer"
          >
            <Download size={16} /> Download Resume
          </a>
        </ModernCard>
      </div>

      {/* Right Column: About, Tech Stack & Experience */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        
        {/* Profile Overview */}
        <ModernCard className="bg-white/70 dark:bg-slate-900/65 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Profile Overview
          </h2>
          <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-semibold mb-4 text-base">
            Current Focus: As a recent Computer Engineering graduate, I focus on building practical solutions for real-world problems.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
            I enjoy designing and implementing meaningful products by combining software development and AI. My goal is to turn complex challenges into useful systems that improve everyday life.
          </p>
        </ModernCard>

        {/* Technical Stack */}
        <ModernCard className="bg-white/70 dark:bg-slate-900/65 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Technical Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MOCK_TECH_STACK.map((group, idx) => (
              <div key={idx} className="flex flex-col">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800/80">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <ModernBadge key={skill} icon={<TechLogo name={skill} sizeClassName="w-3.5 h-3.5" />}>
                      {skill}
                    </ModernBadge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ModernCard>

        {/* Experience Log */}
        <ModernCard className="bg-white/70 dark:bg-slate-900/65 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Experience Log
          </h2>
          <div className="flex flex-col">
            {MOCK_EXPERIENCE.map((exp) => (
              <ModernTimelineItem
                key={exp.id}
                role={exp.role}
                company={exp.company}
                period={exp.period}
                description={exp.description}
                isEducation={exp.role.toLowerCase().includes("b.eng.")}
              />
            ))}
          </div>
        </ModernCard>

      </div>
    </motion.div>
  );
};

const ModernWorkScreen: React.FC<{ setExpandedImg: (img: string) => void }> = ({ setExpandedImg }) => {
  const [selectedProject, setSelectedProject] = useState<typeof MOCK_PROJECTS[0] | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.995 }}
      transition={FAST_TRANSITION}
      className="font-sans"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {MOCK_PROJECTS.map((project) => (
          <ModernProjectCard
            key={project.id}
            title={project.title}
            category={project.category}
            description={project.description}
            tech={project.tech}
            thumbnail={toAssetUrl(project.thumbnail)}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ModernProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            setExpandedImg={setExpandedImg}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ModernAchievementsScreen: React.FC<{ setExpandedImg: (img: string) => void }> = ({ setExpandedImg }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.995 }}
      transition={FAST_TRANSITION}
      className="flex flex-col gap-6 text-left font-sans"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...MOCK_CERTIFICATIONS, ...MOCK_ACTIVITIES].map((item) => (
          <ModernCard key={item.id} className="flex flex-col h-full bg-white/70 dark:bg-slate-900/65 backdrop-blur-md group">
            <div 
              onClick={() => {
                if (item.badgeUrl) {
                  setExpandedImg(item.badgeUrl);
                }
              }}
              className={`w-full h-44 rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-950/40 relative ${item.badgeUrl ? 'cursor-zoom-in group/badge' : ''}`}
            >
              {item.badgeUrl ? (
                <>
                  <img
                    src={toAssetUrl(item.badgeUrl)}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const iconFallback = e.currentTarget.nextElementSibling as HTMLElement | null;
                      if (iconFallback) iconFallback.style.display = "flex";
                    }}
                  />
                  <div className="absolute inset-0 bg-slate-950/0 group-hover/badge:bg-slate-950/10 transition-all flex items-center justify-center">
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover/badge:opacity-100 transition-opacity scale-95 group-hover/badge:scale-100 shadow-lg">
                      Click to expand
                    </span>
                  </div>
                </>
              ) : null}
              <div 
                className="absolute inset-0 flex items-center justify-center text-5xl bg-slate-100 dark:bg-slate-800"
                style={{ display: item.badgeUrl ? "none" : "flex" }}
              >
                {item.icon}
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1 leading-tight group-hover:text-indigo-600 transition-colors">
              {item.name}
            </h3>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
              {item.issuer || "—"}
            </p>

            <div className="mt-auto pt-4 flex items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800/85">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md">
                {item.date}
              </span>
              
              {item.proofUrl && (
                <a
                  href={toAssetUrl(item.proofUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <ExternalLink size={14} /> View Link
                </a>
              )}
            </div>
          </ModernCard>
        ))}
      </div>
    </motion.div>
  );
};

function ModernProjectModal({ project, onClose, setExpandedImg }: { project: typeof MOCK_PROJECTS[0], onClose: () => void, setExpandedImg: (img: string) => void }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={FAST_TRANSITION}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col modern-scrollbar text-left font-sans"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors z-20 cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col gap-6">
            
            {/* Header */}
            <div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-500/10 dark:bg-indigo-400/10 px-3 py-1 rounded-full">
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-3 leading-tight">
                {project.title}
              </h2>
            </div>

            {/* Gallery / Image Slider */}
            {project.images && project.images.length > 0 && (
              <div className="flex flex-col gap-3">
                <div 
                  onClick={() => setExpandedImg(project.images[activeImgIdx])}
                  className="w-full h-64 sm:h-[450px] rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950/40 relative border border-slate-100 dark:border-slate-800/40 flex items-center justify-center p-2 cursor-zoom-in group/mainimg"
                  title="Click to expand image"
                >
                  <img
                    src={toAssetUrl(project.images[activeImgIdx])}
                    alt={`${project.title} screenshot ${activeImgIdx + 1}`}
                    className="w-full h-full object-contain rounded-xl transition-all duration-300 group-hover/mainimg:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-slate-950/0 group-hover/mainimg:bg-slate-950/5 transition-all duration-300 flex items-center justify-center">
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover/mainimg:opacity-100 transition-all duration-300 scale-95 group-hover/mainimg:scale-100 shadow-lg">
                      Click to expand
                    </span>
                  </div>
                </div>
                {project.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto py-1.5 modern-scrollbar">
                    {project.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImgIdx(idx)}
                        className={`w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                          activeImgIdx === idx 
                            ? "border-indigo-500 scale-95" 
                            : "border-slate-200 dark:border-slate-800 hover:border-slate-400"
                        }`}
                      >
                        <img
                          src={toAssetUrl(img)}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overview & Features */}
              <div className="md:col-span-2 flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-2">
                    About Project
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                    {project.fullDescription}
                  </p>
                </div>

                {project.features && project.features.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar: Tech & Links */}
              <div className="flex flex-col gap-6 bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-850">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-semibold text-slate-700 dark:text-slate-350 bg-white dark:bg-slate-850 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {project.links && project.links.length > 0 && (
                  <div className="flex flex-col gap-2 mt-auto">
                    {project.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold transition-all shadow-sm cursor-pointer ${
                          link.label.toLowerCase().includes("github")
                            ? "bg-slate-900 hover:bg-slate-800 text-white rounded-xl"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                        }`}
                      >
                        {link.label.toLowerCase().includes("github") ? <Github size={14} /> : <ExternalLink size={14} />}
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}