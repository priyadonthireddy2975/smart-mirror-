import { useSensorData } from '../../hooks/useSensorData';
import { useDeviceStatus } from '../../hooks/useDeviceStatus';
import { Zap, ShieldAlert, WifiOff } from 'lucide-react';

export function NotificationWidget() {
  const { alerts } = useSensorData();
  const { devices } = useDeviceStatus();
  
  const activeDevices = devices.filter(d => d.isOn).length;
  const recentCritical = alerts.filter(a => a.severity === 'critical' && !a.isRead);

  return (
    <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
      {/* Active Devices Widget */}
      <div className="flex items-center gap-4 border-r border-white/10 pr-8">
        <div className="relative">
          <Zap strokeWidth={1} className="w-8 h-8 opacity-60 text-white" />
          {activeDevices > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-blue rounded-full shadow-[0_0_10px_#00f3ff] animate-pulse"></div>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-widest font-mono">Appliances</p>
          <p className="text-2xl font-light text-white">{activeDevices} Running</p>
        </div>
      </div>

      {/* Security Status */}
      <div className="flex items-center gap-4 border-r border-white/10 pr-8">
        <ShieldAlert strokeWidth={1} className={`w-8 h-8 opacity-60 ${recentCritical.length > 0 ? 'text-red-500 animate-pulse' : 'text-white'}`} />
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-widest font-mono">Security</p>
          <p className="text-2xl font-light text-white">{recentCritical.length > 0 ? `${recentCritical.length} ALERTS` : 'Armed'}</p>
        </div>
      </div>

      {/* Network */}
      <div className="flex items-center gap-4">
         <WifiOff strokeWidth={1} className="w-8 h-8 opacity-60 text-white" />
         <div>
          <p className="text-sm text-gray-400 uppercase tracking-widest font-mono">Network</p>
          <p className="text-2xl font-light text-white">Online</p>
        </div>
      </div>
    </div>
  );
}
