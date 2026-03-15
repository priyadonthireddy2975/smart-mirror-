import { useSensorData } from '../../hooks/useSensorData';
import { useDeviceStatus } from '../../hooks/useDeviceStatus';
import { AlertCard } from './AlertCard';
import { ShieldCheck, Video, ShieldAlert } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function AlertsPanel() {
  const { alerts, markAlertRead } = useSensorData();
  const { devices } = useDeviceStatus();
  
  const cameras = devices.filter(d => d.type === 'camera');
  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 h-full">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Security & Alerts</h2>
          <p className="text-gray-400">Monitoring system status and camera feeds</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-green-400">System Armed</span>
        </div>
      </header>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Camera Feeds */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-medium text-gray-300 flex items-center gap-2">
            <Video className="w-5 h-5 text-neon-blue" />
            Live Camera Feeds
          </h3>
          
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {cameras.length > 0 ? cameras.map(cam => (
              <div key={cam.id} className="glass-panel overflow-hidden aspect-video relative group">
                {cam.isOn ? (
                  <>
                    <div className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center">
                      <span className="text-gray-600 font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                        <Video className="w-4 h-4" /> Signal Active
                      </span>
                    </div>
                    {/* Simulated static noise */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 px-2 py-1 rounded backdrop-blur-md">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                      <span className="text-xs font-mono text-white tracking-widest">LIVE</span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-mono text-white bg-black/60 px-2 py-1 rounded backdrop-blur-md border border-white/10">{cam.name}</span>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gray-950 flex flex-col items-center justify-center text-gray-700">
                    <Video className="w-8 h-8 mb-2 opacity-50" />
                    <span className="font-mono text-sm uppercase">Camera Offline</span>
                  </div>
                )}
              </div>
            )) : (
              <div className="col-span-2 p-8 text-center text-gray-500 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                <Video className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p>No active cameras found on the network</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Alert Log */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-300 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            System Activities
          </h3>
          
          <div className="glass-panel h-[500px] flex flex-col overflow-hidden border-glass-border">
            <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center backdrop-blur-md">
              <span className="text-sm font-medium text-gray-300">Activity Log</span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">
                  {unreadCount} unread
                </span>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {alerts.length > 0 ? alerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} onRead={markAlertRead} />
                )) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
                    <ShieldCheck className="w-12 h-12 mb-3" />
                    <p>No recent alerts</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
