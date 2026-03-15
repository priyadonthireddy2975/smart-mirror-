import { EnergyCharts, PowerSpikeChart } from './EnergyChart';
import { ConsumptionStats } from './ConsumptionStats';

export default function EnergyDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Energy Monitoring</h2>
        <p className="text-gray-400">Real-time power analytics & usage history</p>
      </header>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <EnergyCharts />
          <PowerSpikeChart />
        </div>
        <div className="lg:col-span-1">
          <ConsumptionStats />
        </div>
      </div>
    </div>
  );
}
