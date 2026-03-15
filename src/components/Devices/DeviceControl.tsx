import { useDeviceStatus } from '../../hooks/useDeviceStatus';
import { DeviceCard } from './DeviceCard';

export default function DeviceControl() {
  const { devices, toggleDevice } = useDeviceStatus();

  return (
    <div className="space-y-8 animate-in fade-in duration-700 h-full">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Appliance Control</h2>
        <p className="text-gray-400">Manage smart devices</p>
      </header>
      
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {devices.map(device => (
          <DeviceCard key={device.id} device={device} onToggleState={toggleDevice} />
        ))}
      </div>
    </div>
  );
}
