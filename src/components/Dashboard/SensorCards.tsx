import { Thermometer, Wind } from 'lucide-react';
import { useSensorData } from '../../hooks/useSensorData';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export function HumidityGauge({ value } : { value: number }) {
  // Map value to gauge colors: Green (<50), Yellow (50-70), Red (>70)
  const color = value < 50 ? '#10b981' : value < 75 ? '#eab308' : '#ef4444';
  const data = [
    { name: 'current', value: value },
    { name: 'remaining', value: 100 - value }
  ];

  return (
    <div className="relative w-20 h-20">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius="70%"
            outerRadius="100%"
            dataKey="value"
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill={color} />
            <Cell fill="rgba(255,255,255,0.1)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex items-end pb-2 justify-center">
        <span className="text-xl font-bold" style={{ color }}>{value}%</span>
      </div>
    </div>
  );
}

export default function SensorCards() {
  const { sensors } = useSensorData();

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
      {/* Temperature Card */}
      <div className="glass-panel p-6 shadow-glow-red border-red-500/30">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400 font-medium tracking-wide">TEMPERATURE</p>
            <div className="flex items-baseline gap-1 mt-2">
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={sensors.temperature}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="text-4xl font-bold text-white"
                >
                  {sensors.temperature.toFixed(1)}
                </motion.span>
              </AnimatePresence>
              <span className="text-xl text-gray-500">°C</span>
            </div>
          </div>
          <div className="p-3 bg-red-500/10 rounded-xl">
            <Thermometer className="w-6 h-6 text-red-400" />
          </div>
        </div>
      </div>

      {/* Humidity Gauge Card */}
      <div className="glass-panel p-6 shadow-glow-blue border-neon-blue/30 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 font-medium tracking-wide">HUMIDITY</p>
          <div className="mt-2 text-gray-300 text-sm">Target: 45%</div>
        </div>
        <HumidityGauge value={sensors.humidity} />
      </div>

      {/* Air Quality Card */}
      <div className="glass-panel p-6 shadow-glow-green border-green-500/30">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-400 font-medium tracking-wide">AIR QUALITY</p>
            <div className="flex items-baseline gap-1 mt-2">
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={sensors.airQuality}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="text-4xl font-bold text-white"
                >
                  {sensors.airQuality}
                </motion.span>
              </AnimatePresence>
              <span className="text-xl text-gray-500">AQI</span>
            </div>
          </div>
          <div className="p-3 bg-green-500/10 rounded-xl">
            <Wind className="w-6 h-6 text-green-400" />
          </div>
        </div>
        <div className="mt-5">
           <span className={`text-sm font-medium py-1 px-3 rounded-full ${sensors.airQuality < 50 ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
              {sensors.airQuality < 50 ? 'Excellent' : 'Moderate'}
            </span>
        </div>
      </div>
    </div>
  );
}
