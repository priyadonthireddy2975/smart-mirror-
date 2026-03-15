import { Cpu, Battery } from 'lucide-react';
import { useDeviceStatus } from '../../hooks/useDeviceStatus';
import { StatusIndicator } from '../ui/StatusIndicator';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function DeviceStatus() {
  const { health, devices } = useDeviceStatus();

  // Create donut chart data logic: Online vs Active vs Offline
  const onlineCount = devices.length; // assuming all registered are 'online' to platform
  const activeCount = devices.filter(d => d.isOn).length;
  const offlineCount = 0; // mocked as 0 for simple visual
  
  const statusData = [
    { name: 'Active', value: activeCount },
    { name: 'Standby', value: onlineCount - activeCount },
    { name: 'Offline', value: offlineCount }
  ].filter(d => d.value > 0);

  const COLORS = ['#00f3ff', '#3b82f6', '#ef4444']; // Active(Cyan), Standby(Blue), Offline(Red)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      {/* System Hardware */}
      <div className="glass-panel p-6 relative overflow-hidden" style={{ boxShadow: health.esp32Status === 'online' ? '0 0 15px rgba(50, 255, 50, 0.2)' : 'none' }}>
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white/5 rounded-xl">
            <Cpu className="w-6 h-6 text-gray-300" />
          </div>
          <StatusIndicator status={health.esp32Status === 'online' ? 'online' : 'critical'} size="md" />
        </div>
        <h3 className="text-lg font-medium text-gray-300">ESP32 Core Controller</h3>
        <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide font-mono">STATUS: {health.esp32Status}</p>
        <div className="mt-4 pt-4 border-t border-glass-border flex justify-between text-sm">
          <span className="text-gray-500">Uptime</span>
          <span className="font-mono text-gray-300">14d 08h 22m</span>
        </div>
      </div>

      {/* Backup Battery */}
      <div className="glass-panel p-6 relative overflow-hidden">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-green-500/10 rounded-xl">
            <Battery className="w-6 h-6 text-green-400" />
          </div>
          <span className="font-bold text-xl text-white">{health.batteryLevel}%</span>
        </div>
        <h3 className="text-lg font-medium text-gray-300">Backup Battery</h3>
        <div className="w-full bg-gray-800 rounded-full h-1.5 mt-3 relative overflow-hidden">
          <div className="bg-green-400 h-1.5 rounded-full absolute top-0 left-0" style={{ width: `${health.batteryLevel}%` }}></div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Fully charged. Standing by.</p>
      </div>

      {/* Aggregate Status Donut */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-medium text-gray-300 mb-2">Endpoint Status</h3>
        <div className="h-32 w-full mt-4 flex items-center">
          <div className="w-1/2 h-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={45}
                  paddingAngle={5}
                  dataKey="value"
                  isAnimationActive={true}
                >
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(10, 10, 15, 0.9)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '4px 8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-xl font-bold">{onlineCount}</span>
            </div>
          </div>
          <div className="w-1/2 flex flex-col justify-center gap-2 pl-2 border-l border-white/10">
            {statusData.map((entry, index) => (
               <div key={entry.name} className="flex items-center justify-between text-xs">
                 <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="text-gray-400">{entry.name}</span>
                 </div>
                 <span className="font-mono text-white">{entry.value}</span>
               </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
