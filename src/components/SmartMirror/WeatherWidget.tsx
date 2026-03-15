import { useSensorData } from '../../hooks/useSensorData';
import { Cloud, Droplets, Wind } from 'lucide-react';

export function WeatherWidget() {
  const { sensors } = useSensorData();

  return (
    <div className="text-right animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 fill-mode-both">
      <div className="flex items-center justify-end gap-4">
        <span className="text-7xl font-light text-white">{sensors.temperature.toFixed(0)}°</span>
        <Cloud className="w-16 h-16 text-gray-300" strokeWidth={1} />
      </div>
      <p className="text-2xl font-light text-gray-300 mt-2">Mostly Cloudy</p>
      <p className="text-lg text-gray-500 mb-6">H: 26° L: 18°</p>

      <div className="flex justify-end gap-6 text-right">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-neon-blue" strokeWidth={1} />
          <span className="text-xl font-light text-white">{sensors.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-gray-400" strokeWidth={1} />
          <span className="text-xl font-light text-white">AQI {sensors.airQuality}</span>
        </div>
      </div>
    </div>
  );
}
