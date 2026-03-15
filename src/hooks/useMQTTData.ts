import { useState, useEffect } from 'react';

// Types for our simulated data
export interface SensorData {
  temperature: number; // Celsius
  humidity: number;    // Percentage
  motionDetected: boolean;
  lightIntensity: number; // Lux
  airQuality: number;     // AQI
  energyConsumption: number; // Watts current
}

export interface DeviceStatus {
  id: string;
  name: string;
  type: 'light' | 'fan' | 'plug' | 'ac' | 'camera';
  isOn: boolean;
  powerDraw: number; // Watts
}

export interface SystemHealth {
  esp32Status: 'online' | 'offline' | 'warning';
  mqttBroker: 'connected' | 'disconnected' | 'reconnecting';
  networkStrength: number; // 0-100%
  batteryLevel: number; // 0-100%
}

export interface Alert {
  id: string;
  type: 'motion' | 'temperature' | 'smoke' | 'offline' | 'power';
  message: string;
  timestamp: Date;
  severity: 'warning' | 'critical' | 'info';
  isRead: boolean;
}

// Initial mock data
const initialDevices: DeviceStatus[] = [
  { id: 'd1', name: 'Living Room Temp', type: 'light', isOn: true, powerDraw: 15 },
  { id: 'd2', name: 'Kitchen Ceiling Fan', type: 'fan', isOn: false, powerDraw: 0 },
  { id: 'd3', name: 'Smart Plug 1', type: 'plug', isOn: true, powerDraw: 120 },
  { id: 'd4', name: 'Master AC', type: 'ac', isOn: true, powerDraw: 1200 },
  { id: 'd5', name: 'Front Door Camera', type: 'camera', isOn: true, powerDraw: 8 },
];

export function useMQTTData() {
  const [sensors, setSensors] = useState<SensorData>({
    temperature: 24.5,
    humidity: 45,
    motionDetected: false,
    lightIntensity: 320,
    airQuality: 42,
    energyConsumption: 1343
  });

  const [devices, setDevices] = useState<DeviceStatus[]>(initialDevices);

  const [health] = useState<SystemHealth>({
    esp32Status: 'online',
    mqttBroker: 'connected',
    networkStrength: 92,
    batteryLevel: 100
  });

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'a1',
      type: 'motion',
      message: 'Motion detected at Front Door',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      severity: 'info',
      isRead: false
    }
  ]);

  // Simulate incoming MQTT data
  useEffect(() => {
    const interval = setInterval(() => {
      // Fluctuate sensors slightly
      setSensors(prev => {
        // Randomly trigger motion sometimes
        const motion = Math.random() > 0.8 ? !prev.motionDetected : prev.motionDetected;
        
        return {
          temperature: +(prev.temperature + (Math.random() - 0.5) * 0.5).toFixed(1),
          humidity: Math.max(0, Math.min(100, Math.round(prev.humidity + (Math.random() - 0.5) * 2))),
          motionDetected: motion,
          lightIntensity: Math.max(0, Math.round(prev.lightIntensity + (Math.random() - 0.5) * 20)),
          airQuality: Math.max(0, Math.round(prev.airQuality + (Math.random() - 0.5) * 3)),
          energyConsumption: prev.energyConsumption + (Math.random() - 0.5) * 50
        };
      });

      // Maybe add random alert if motion changed to true or temp goes too high
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleDevice = (id: string) => {
    setDevices(prev => prev.map(d => {
      if (d.id === id) {
        const nextState = !d.isOn;
        return { 
          ...d, 
          isOn: nextState,
          powerDraw: nextState ? (d.type === 'ac' ? 1200 : d.type === 'light' ? 15 : d.type === 'fan' ? 60 : 100) : 0
        };
      }
      return d;
    }));
  };

  const markAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  return {
    sensors,
    devices,
    health,
    alerts,
    toggleDevice,
    markAlertRead
  };
}
