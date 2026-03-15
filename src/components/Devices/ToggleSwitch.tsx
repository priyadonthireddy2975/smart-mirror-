import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function ToggleSwitch({ isOn, onToggle, disabled = false }: ToggleSwitchProps) {
  return (
    <div 
      className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${isOn ? 'bg-neon-blue shadow-glow-blue' : 'bg-gray-700'}`}
      onClick={() => !disabled && onToggle()}
    >
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className="w-4 h-4 rounded-full bg-white absolute top-1"
        style={{ left: isOn ? "calc(100% - 20px)" : "4px" }}
      />
    </div>
  );
}
