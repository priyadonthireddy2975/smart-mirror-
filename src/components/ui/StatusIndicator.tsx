interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'critical';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export function StatusIndicator({ status, size = 'sm', animate = true }: StatusIndicatorProps) {
  const colors = {
    online: 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]',
    offline: 'bg-gray-500 shadow-none',
    warning: 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]',
    critical: 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]'
  };

  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const baseClasses = `rounded-full ${colors[status]} ${sizes[size]}`;

  if (!animate || status === 'offline') {
    return <div className={baseClasses} />;
  }

  return (
    <div className="relative flex items-center justify-center">
      <div className={baseClasses} />
      <div className={`absolute inset-0 rounded-full ${colors[status].split(' ')[0]} animate-ping opacity-75`} style={{ animationDuration: '2s' }} />
    </div>
  );
}
