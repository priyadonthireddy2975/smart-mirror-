import { TrendingDown, TrendingUp } from 'lucide-react';
import { useSensorData } from '../../hooks/useSensorData';

export function ConsumptionStats() {
  const { sensors } = useSensorData();

  return (
    <div className="space-y-6 flex flex-col justify-between h-full">
      <div className="glass-panel p-6 shadow-glow-blue border-neon-blue/30">
        <p className="text-sm text-gray-400 tracking-wide font-medium">CURRENT DRAW</p>
        <div className="mt-2 flex items-end gap-2">
          <span className="text-4xl font-bold text-white transition-all">{Math.round(sensors.energyConsumption)}</span>
          <span className="text-2xl text-gray-500 mb-1">W</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">Real-time aggregated power</p>
      </div>
      
      <div className="glass-panel p-6 border-green-500/30">
        <p className="text-sm text-gray-400 tracking-wide font-medium">EFFICIENCY SCORE</p>
        <div className="mt-2 flex items-end gap-2 text-green-400">
          <span className="text-4xl font-bold">94</span>
          <span className="text-2xl mb-1 text-gray-500">/ 100</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-green-500 mt-2">
          <TrendingDown className="w-4 h-4" />
          <span>12% better than average</span>
        </div>
      </div>
      
      <div className="glass-panel p-6 border-red-500/30">
        <p className="text-sm text-gray-400 tracking-wide font-medium">DAILY TOTAL</p>
        <div className="mt-2 flex items-end gap-2 text-white">
          <span className="text-4xl font-bold">14.2</span>
          <span className="text-2xl mb-1 text-gray-500">kWh</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-red-500 mt-2">
          <TrendingUp className="w-4 h-4" />
          <span>5% higher than yesterday</span>
        </div>
      </div>
    </div>
  );
}
