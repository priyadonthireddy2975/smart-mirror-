import { useSensorData } from '../../hooks/useSensorData';
import { motion } from 'framer-motion';

// Mocking some heatmap data based on hours of the day (0-23)
export function MotionHeatmap() {
  const { sensors } = useSensorData();
  
  // Create an array of 24 blocks
  const blocks = Array.from({ length: 24 }).map((_, i) => {
    // Make recent blocks active if motion detected
    const currentHour = new Date().getHours();
    if (i === currentHour && sensors.motionDetected) {
      return 100; 
    }
    // Random previous activity pattern (more active in evening)
    return Math.random() * (i > 16 ? 80 : 20);
  });

  return (
    <div className="glass-panel p-6 mt-6">
      <h3 className="text-lg font-medium text-gray-300 mb-4">Motion Detection Map (24H)</h3>
      <div className="grid grid-cols-12 md:grid-cols-24 gap-1 h-16">
        {blocks.map((val, i) => {
          // Color intensity from transparent blue to bright neon blue
          const intensity = val / 100;
          return (
             <motion.div 
                key={i} 
                className="w-full h-full rounded-sm ring-1 ring-white/5 relative group cursor-pointer"
                style={{ backgroundColor: `rgba(0, 243, 255, ${intensity})` }}
                whileHover={{ scale: 1.1, zIndex: 10, boxShadow: '0 0 10px rgba(0, 243, 255, 0.8)' }}
             >
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-black/90 text-xs px-2 py-1 rounded border border-neon-blue/30 whitespace-nowrap z-50">
                   {i}:00 - Intensity: {Math.round(val)}%
                </div>
             </motion.div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>12 AM</span>
        <span>12 PM</span>
        <span>11 PM</span>
      </div>
    </div>
  );
}
