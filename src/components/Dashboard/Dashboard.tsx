import SensorCards from './SensorCards';
import SensorCharts from './SensorCharts';
import { MotionHeatmap } from './MotionHeatmap';

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <header className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">System Overview</h2>
          <p className="text-gray-400">Real-time IoT sensor telemetry & Analytics</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-neon-blue/10 border border-neon-blue/20 rounded-full px-4 py-2 shadow-glow-blue cursor-pointer transition-all hover:bg-neon-blue/20">
          <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
          <span className="text-sm font-medium text-neon-blue">Live Data Feed</span>
        </div>
      </header>
      
      <SensorCards />
      <SensorCharts />
      <MotionHeatmap />
    </div>
  );
}
