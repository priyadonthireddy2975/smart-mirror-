import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDeviceStatus } from '../../hooks/useDeviceStatus';
import { useSensorData } from '../../hooks/useSensorData';

// Mock historical hourly data
const hourlyData = Array.from({ length: 24 }).map((_, i) => ({
  time: `${i}:00`,
  usage: Math.floor(Math.random() * 800) + 200 + (i > 17 && i < 23 ? 1000 : 0)
}));

// Mock daily data
const dailyData = Array.from({ length: 7 }).map((_, i) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return { day: days[i], usage: Math.floor(Math.random() * 15) + 10 };
});

// Power Spike Detection Chart
export function PowerSpikeChart() {
  const { sensors } = useSensorData();
  const [data, setData] = useState<{ time: string, value: number, isSpike: boolean }[]>([]);
  const SPIKE_THRESHOLD = 3000; // Define spike threshold

  useEffect(() => {
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    const value = sensors.energyConsumption;
    const isSpike = value > SPIKE_THRESHOLD;

    setData(prev => [...prev, { time: timeStr, value, isSpike }].slice(-20));
  }, [sensors.energyConsumption]);

  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-medium text-gray-300 mb-6 flex items-center gap-2">
        <Zap className="w-5 h-5 text-red-500" />
        Power Spike Detection
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis dataKey="time" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(10, 10, 15, 0.9)', borderColor: 'rgba(239, 68, 68, 0.2)', borderRadius: '8px' }}
              itemStyle={{ color: '#ef4444' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#ef4444" 
              fillOpacity={0.3} 
              fill="#ef4444" 
              strokeWidth={3}
              isAnimationActive={true} 
              dot={(props: any) => {
                const { cx, cy, payload } = props;
                if (payload.isSpike) {
                  return (
                    <circle cx={cx} cy={cy} r={6} fill="#ef4444" stroke="none" className="animate-pulse" />
                  );
                }
                return null;
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span>Normal Range: {'<'} 3000W</span>
        <span className="text-red-500 font-bold uppercase tracking-widest">Spike Detector Active</span>
      </div>
    </div>
  );
}

export function EnergyCharts() {
  const { devices } = useDeviceStatus();

  const deviceData = devices.map(d => ({
    name: d.name,
    value: d.isOn ? d.powerDraw : 0
  })).filter(d => d.value > 0);

  const PIE_COLORS = ['#00f3ff', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

  return (
    <div className="space-y-6 lg:col-span-2">
      {/* Hourly Line Chart */}
      <div className="glass-panel p-6">
        <h3 className="text-lg font-medium text-gray-300 mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Hourly Power Consumption
        </h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(10, 10, 15, 0.9)', borderColor: 'rgba(0, 243, 255, 0.2)', borderRadius: '8px' }}
                itemStyle={{ color: '#00f3ff' }}
                cursor={{ stroke: 'rgba(0,243,255,0.2)' }}
              />
              <Area type="monotone" dataKey="usage" stroke="#00f3ff" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={2} isAnimationActive={true} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Bar Chart */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-medium text-gray-300 mb-6">Daily Usage (kWh)</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis dataKey="day" stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#4b5563" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: 'rgba(10, 10, 15, 0.9)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px' }}
                />
                <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} isAnimationActive={true}>
                  {dailyData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === dailyData.length - 1 ? '#00f3ff' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Breakdown Pie Chart */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-medium text-gray-300 mb-6">Live Device Load</h3>
          <div className="h-48 w-full">
            {deviceData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive={true}
                  >
                    {deviceData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(10, 10, 15, 0.9)', borderColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                All tracked devices offline
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
