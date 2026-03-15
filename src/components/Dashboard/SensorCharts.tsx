import { useSensorData } from '../../hooks/useSensorData';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { useState, useEffect } from 'react';

// Help component for Temperature Trend
export function TemperatureChart() {
  const { sensors } = useSensorData();
  const [history, setHistory] = useState<{ time: string, temp: number }[]>([]);

  useEffect(() => {
    setHistory(prev => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      return [...prev, { time: timeStr, temp: sensors.temperature }].slice(-30);
    });
  }, [sensors.temperature]);

  return (
    <div className="h-64 w-full glass-panel p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-300">Temperature Trend</h3>
        <div className="flex gap-2 text-xs">
          <button className="px-2 py-1 bg-neon-blue/20 text-neon-blue rounded">1H</button>
          <button className="px-2 py-1 text-gray-400 hover:text-white">6H</button>
          <button className="px-2 py-1 text-gray-400 hover:text-white">24H</button>
        </div>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="#4b5563" fontSize={10} tick={{fill: '#6b7280'}} tickLine={false} axisLine={false} />
            <YAxis stroke="#4b5563" fontSize={10} tick={{fill: '#6b7280'}} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(10, 10, 15, 0.9)', borderColor: 'rgba(239, 68, 68, 0.3)', borderRadius: '8px' }}
              itemStyle={{ color: '#ef4444' }}
            />
            <Area type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Help component for Light Intensity
export function LightIntensityChart() {
  const { sensors } = useSensorData();
  const data = [
    { name: 'Living Room', lux: sensors.lightIntensity.livingRoom },
    { name: 'Bedroom', lux: sensors.lightIntensity.bedroom },
    { name: 'Kitchen', lux: sensors.lightIntensity.kitchen },
    { name: 'Hallway', lux: sensors.lightIntensity.hallway },
  ];

  return (
    <div className="h-64 w-full glass-panel p-4">
      <h3 className="text-lg font-medium text-gray-300 mb-4">Light Intensity</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 20, bottom: 0 }}>
            <XAxis type="number" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
              contentStyle={{ backgroundColor: 'rgba(10, 10, 15, 0.9)', borderColor: 'rgba(0, 243, 255, 0.3)', borderRadius: '8px' }}
            />
            <Bar dataKey="lux" radius={[0, 4, 4, 0]} isAnimationActive={true}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill="#00f3ff" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function SensorCharts() {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
      <TemperatureChart />
      <LightIntensityChart />
    </div>
  );
}
