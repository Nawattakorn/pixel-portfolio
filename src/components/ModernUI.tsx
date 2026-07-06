import React from "react";
import { motion } from "motion/react";
import { ExternalLink, Github, Calendar, Briefcase, GraduationCap } from "lucide-react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const ModernCard: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`modern-card rounded-2xl p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const ModernBadge: React.FC<{
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ children, icon }) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20 dark:border-indigo-400/20 transition-colors hover:bg-indigo-500/15">
      {icon && <span className="w-3.5 h-3.5 flex items-center justify-center">{icon}</span>}
      {children}
    </span>
  );
};

interface TimelineProps {
  role: string;
  company: string;
  period: string;
  description: string;
  isEducation?: boolean;
}

export const ModernTimelineItem: React.FC<TimelineProps> = ({
  role,
  company,
  period,
  description,
  isEducation = false,
}) => {
  return (
    <div className="relative pl-8 pb-8 last:pb-0 group">
      {/* Connector line */}
      <div className="absolute left-[11px] top-2 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 group-last:hidden" />
      
      {/* Icon node */}
      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-indigo-500 bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm text-indigo-500 z-10">
        {isEducation ? <GraduationCap size={12} /> : <Briefcase size={12} />}
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-1.5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
          {role}
        </h3>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md w-max">
          <Calendar size={12} />
          {period}
        </span>
      </div>
      <div className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
        {company}
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed">
        {description}
      </p>
    </div>
  );
};

interface ProjectCardProps {
  title: string;
  category: string;
  description: string;
  tech: string[];
  thumbnail: string;
  onClick: () => void;
}

export const ModernProjectCard: React.FC<ProjectCardProps> = ({
  title,
  category,
  description,
  tech,
  thumbnail,
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      className="modern-card rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full border border-slate-100 dark:border-slate-800/50"
    >
      <div className="h-48 overflow-hidden relative group/img bg-slate-100 dark:bg-slate-800/20">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent z-10" />
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
          onError={(e) => {
            // fallback if thumbnail doesn't exist
            e.currentTarget.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10 uppercase tracking-wider">
          {category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-indigo-500 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-grow line-clamp-3">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-1.5">
          {tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 rounded-md"
            >
              {t}
            </span>
          ))}
          {tech.length > 4 && (
            <span className="text-[11px] font-semibold text-indigo-500 bg-indigo-500/5 dark:bg-indigo-400/5 px-2 py-0.5 rounded-md">
              +{tech.length - 4} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
