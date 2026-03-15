import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Cpu, 
  Zap, 
  ShieldAlert, 
  MonitorPlay, 
  Activity, 
  Settings 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Devices', path: '/devices', icon: Cpu },
  { name: 'Energy', path: '/energy', icon: Zap },
  { name: 'Alerts & Security', path: '/security', icon: ShieldAlert },
  { name: 'System Health', path: '/health', icon: Activity },
  { name: 'Smart Mirror', path: '/mirror', icon: MonitorPlay },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-dark-bg border-r border-glass-border glass-panel rounded-none shadow-glow-blue/10 shrink-0 hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-cyan drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
          JARVIS<span className="text-white">_OS</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Smart Home Hub</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-neon-blue/10 text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.2)] border border-neon-blue/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]' : ''}`} />
              <span className="font-medium tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-glass-border">
        <div className="flex items-center gap-3 px-4 py-3 glass-panel">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></div>
          </div>
          <span className="text-sm text-gray-300 font-medium">System Online</span>
        </div>
      </div>
    </aside>
  );
}
