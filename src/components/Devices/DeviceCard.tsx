import { Power, Lightbulb, Fan, Speaker, Video } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';
import type { DeviceStatus } from '../../types';
import { togglePhysicalAppliance } from '../../services/deviceController';

interface DeviceCardProps {
  device: DeviceStatus;
  onToggleState: (id: string) => void;
}

export function DeviceCard({ device, onToggleState }: DeviceCardProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'light': return <Lightbulb />;
      case 'fan': return <Fan />;
      case 'plug': return <Power />;
      case 'ac': return <Speaker />; // Custom AC icon proxy
      case 'camera': return <Video />;
      default: return <Power />;
    }
  };

  const handleToggle = () => {
    onToggleState(device.id);
    togglePhysicalAppliance(device.id, !device.isOn);
  };

  return (
    <div className={`glass-panel p-6 transition-all duration-300 transform hover:scale-[1.02] border border-glass-border ${device.isOn ? 'bg-neon-blue/5 shadow-glow-blue border-neon-blue/30' : ''}`}>
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 rounded-xl transition-colors ${device.isOn ? 'bg-neon-blue/20 text-neon-blue shadow-glow-blue' : 'bg-white/5 text-gray-500'}`}>
          {getIcon(device.type)}
        </div>
        
        <div className="flex flex-col items-end">
          <ToggleSwitch isOn={device.isOn} onToggle={handleToggle} />
          {device.isOn && (
            <span className="text-xs font-mono mt-2 text-neon-blue tracking-widest">{device.powerDraw}W</span>
          )}
        </div>
      </div>
      
      <h3 className={`text-lg font-bold transition-colors ${device.isOn ? 'text-white' : 'text-gray-400'}`}>{device.name}</h3>
      <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">{device.type}</p>
    </div>
  );
}
