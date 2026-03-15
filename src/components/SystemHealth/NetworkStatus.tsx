import { Server, Wifi, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { useDeviceStatus } from '../../hooks/useDeviceStatus';
import { StatusIndicator } from '../ui/StatusIndicator';

const networkData = Array.from({ length: 30 }).map(() => ({
  value: Math.floor(Math.random() * 50) + 10
}));

export function NetworkStatus() {
  const { health } = useDeviceStatus();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 relative overflow-hidden border-glass-border">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-neon-blue/10 rounded-xl">
              <Server className="w-6 h-6 text-neon-blue" />
            </div>
            <StatusIndicator status={health.mqttBroker === 'connected' ? 'online' : 'warning'} size="md" />
          </div>
          <h3 className="text-lg font-medium text-gray-300">MQTT Broker</h3>
          <p className="text-sm text-gray-500 mt-1 uppercase tracking-wide font-mono">STATUS: {health.mqttBroker}</p>
          <div className="mt-4 pt-4 border-t border-glass-border flex justify-between text-sm">
            <span className="text-gray-500">Latency</span>
            <span className="font-mono text-neon-blue">14ms</span>
          </div>
        </div>

        <div className="glass-panel p-6 relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Wifi className="w-6 h-6 text-purple-400" />
            </div>
            <span className="font-bold text-xl text-white">{health.networkStrength}%</span>
          </div>
          <h3 className="text-lg font-medium text-gray-300">Wireless Signal</h3>
          <div className="w-full bg-gray-800 rounded-full h-1.5 mt-3">
            <div className="bg-gradient-to-r from-purple-500 to-neon-blue h-1.5 rounded-full" style={{ width: `${health.networkStrength}%` }}></div>
          </div>
          <div className="mt-4 h-10 w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={networkData}>
                 <Area type="monotone" dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} strokeWidth={1} isAnimationActive={false} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6">
         <h3 className="text-lg font-medium text-gray-300 mb-6">Traffic Analyzer</h3>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                 <ArrowUpRight className="w-4 h-4 text-green-400" /> Packets Sent
              </div>
              <span className="text-2xl font-mono text-white tracking-widest">1.4 <span className="text-sm text-gray-500">MB/s</span></span>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                 <ArrowDownRight className="w-4 h-4 text-blue-400" /> Packets Recv
              </div>
              <span className="text-2xl font-mono text-white tracking-widest">3.2 <span className="text-sm text-gray-500">MB/s</span></span>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="text-sm text-gray-400 mb-2">Error Rate</div>
              <span className="text-2xl font-mono text-white tracking-widest">0.02%</span>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="text-sm text-gray-400 mb-2">Active Topics</div>
              <span className="text-2xl font-mono text-white tracking-widest">24</span>
            </div>
         </div>
      </div>
    </div>
  );
}
