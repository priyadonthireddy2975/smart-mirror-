import { NetworkStatus } from './NetworkStatus';
import { DeviceStatus } from './DeviceStatus';

export default function SystemHealth() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      <header>
        <h2 className="text-3xl font-bold tracking-tight text-white mb-1">System Health Diagnostics</h2>
        <p className="text-gray-400">Core hardware and network performance analytics</p>
      </header>

      <DeviceStatus />
      <NetworkStatus />
    </div>
  );
}
