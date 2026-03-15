import { motion } from 'framer-motion';
import { AlertTriangle, Eye, Thermometer, Zap, WifiOff } from 'lucide-react';
import type { Alert as AlertType } from '../../types';

interface AlertCardProps {
  alert: AlertType;
  onRead: (id: string) => void;
}

export function AlertCard({ alert, onRead }: AlertCardProps) {
  const getAlertIcon = (type: string) => {
    switch(type) {
      case 'motion': return <Eye className="w-5 h-5" />;
      case 'temperature': return <Thermometer className="w-5 h-5" />;
      case 'power': return <Zap className="w-5 h-5" />;
      case 'offline': return <WifiOff className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getSeverityClasses = (severity: string, isRead: boolean) => {
    if (isRead) return 'bg-white/5 border-transparent text-gray-400';
    switch(severity) {
      case 'critical': return 'bg-red-500/10 border-red-500/50 text-red-100 shadow-[0_0_15px_rgba(239,68,68,0.2)]';
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/50 text-yellow-100 shadow-[0_0_15px_rgba(234,179,8,0.1)]';
      default: return 'bg-neon-blue/10 border-neon-blue/50 text-blue-100 shadow-[0_0_15px_rgba(0,243,255,0.1)]';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      className={`p-4 rounded-xl border flex gap-4 cursor-pointer transition-colors ${getSeverityClasses(alert.severity, alert.isRead)}`}
      onClick={() => onRead(alert.id)}
    >
      <div className="pt-0.5 opacity-80">
        {getAlertIcon(alert.type)}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <span className="text-sm font-bold tracking-wide">{alert.type.toUpperCase()}</span>
          <span className="text-xs opacity-60 font-mono">
            {alert.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
        <p className="text-sm mt-1 opacity-90">{alert.message}</p>
      </div>
    </motion.div>
  );
}
