import { motion } from "motion/react";
import React, { useState, useEffect } from "react";

interface PixelBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
}

export const PixelBox: React.FC<PixelBoxProps> = ({ 
  children, 
  interactive = false, 
  className = "", 
  ...props 
}) => {
  return (
    <div 
      className={`mc-panel ${interactive ? "cursor-pointer hover:brightness-110" : ""} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export const PixelPanel: React.FC<PixelBoxProps> = ({ 
  children, 
  className = "", 
  ...props 
}) => {
  return (
    <div className={`mc-panel-inset ${className}`} {...props}>
      {children}
    </div>
  );
};

export const InventorySlot: React.FC<{
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  title?: string;
} & React.HTMLAttributes<HTMLDivElement>> = ({ icon, active, onClick, className = "", title, ...props }) => {
  return (
    <motion.div 
      whileTap={onClick ? { scale: 0.95 } : undefined}
      className={`mc-slot w-12 h-12 sm:w-16 sm:h-16 ${onClick ? "cursor-pointer" : "cursor-default"} ${active ? "mc-slot-active" : "opacity-50"} ${className}`}
      onClick={onClick}
      data-tooltip={title}
      {...props}
    >
      <div className="text-xl sm:text-3xl drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
        {icon}
      </div>
    </motion.div>
  );
};

export function GlobalTooltip() {
  const [tooltip, setTooltip] = useState<{ text: string, x: number, y: number} | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // find closest element with data-tooltip
      const el = target.closest('[data-tooltip]');
      if (el) {
        const text = el.getAttribute('data-tooltip');
        if (text) {
          setTooltip({ text, x: e.clientX, y: e.clientY });
          return;
        }
      }
      setTooltip(null);
    };
    
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (!tooltip) return null;

  return (
    <div 
      className="fixed z-[9999] pointer-events-none mc-tooltip font-pixel text-xl text-white px-3 py-2"
      style={{ left: tooltip.x + 16, top: tooltip.y + 16 }}
    >
      {tooltip.text}
    </div>
  );
}
