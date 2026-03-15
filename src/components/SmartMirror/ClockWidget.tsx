import { useState, useEffect } from 'react';

export function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateString = time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  const ampm = time.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div className="animate-in fade-in slide-in-from-top-8 duration-1000 delay-100 fill-mode-both">
      <h2 className="text-3xl font-light text-gray-300 mb-2">{dateString}</h2>
      <div className="flex items-baseline gap-4">
        <h1 className="text-9xl font-light tracking-tight text-white m-0 leading-none">
          {timeString.replace(/ AM| PM/, '')}
        </h1>
        <span className="text-4xl font-light text-gray-400">{ampm}</span>
      </div>
    </div>
  );
}
