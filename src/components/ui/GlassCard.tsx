import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'red' | 'green' | 'none';
  isActive?: boolean;
}

export function GlassCard({ 
  children, 
  className = '', 
  glowColor = 'none', 
  isActive = false,
  ...props 
}: GlassCardProps) {
  
  const glowClasses = {
    blue: 'shadow-glow-blue border-neon-blue/30',
    red: 'shadow-glow-red border-red-500/30',
    green: 'shadow-glow-green border-green-500/30',
    none: 'shadow-glass border-glass-border'
  };

  return (
    <motion.div 
      className={`glass-panel overflow-hidden relative transition-all duration-300 ${isActive ? glowClasses[glowColor] : 'border-glass-border'} ${className}`}
      whileHover={!isActive && glowColor !== 'none' ? { 
        boxShadow: glowColor === 'blue' ? '0 0 20px rgba(0, 243, 255, 0.3)' : 
                    glowColor === 'red' ? '0 0 20px rgba(255, 50, 50, 0.3)' : 
                    glowColor === 'green' ? '0 0 20px rgba(50, 255, 50, 0.3)' : undefined,
        borderColor: glowColor === 'blue' ? 'rgba(0, 243, 255, 0.3)' :
                      glowColor === 'red' ? 'rgba(255, 50, 50, 0.3)' :
                      glowColor === 'green' ? 'rgba(50, 255, 50, 0.3)' : undefined,
        y: -4
      } : undefined}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}
