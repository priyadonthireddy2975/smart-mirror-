import { useNavigate } from 'react-router-dom';
import { ClockWidget } from './ClockWidget';
import { WeatherWidget } from './WeatherWidget';
import { NotificationWidget } from './NotificationWidget';

export default function SmartMirrorUI() {
  const navigate = useNavigate();

  return (
    <div 
      className="absolute inset-0 bg-black text-white h-screen w-screen z-50 overflow-hidden font-sans group cursor-none"
      onDoubleClick={() => navigate('/')}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>

      <div className="p-16 h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <ClockWidget />
          <WeatherWidget />
        </div>
        
        <NotificationWidget />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-600 text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        DOUBLE CLICK TO EXIT
      </div>
    </div>
  );
}
