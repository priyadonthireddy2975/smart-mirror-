import { useState } from 'react';
import type { DeviceStatus, SystemHealth } from '../types';

const initialDevices: DeviceStatus[] = [
  { id: 'd1', name: 'Living Room Temp', type: 'light', isOn: true, powerDraw: 15 },
  { id: 'd2', name: 'Kitchen Ceiling Fan', type: 'fan', isOn: false, powerDraw: 0 },
  { id: 'd3', name: 'Smart Plug 1', type: 'plug', isOn: true, powerDraw: 120 },
  { id: 'd4', name: 'Master AC', type: 'ac', isOn: true, powerDraw: 1200 },
  { id: 'd5', name: 'Front Door Camera', type: 'camera', isOn: true, powerDraw: 8 },
];

export function useDeviceStatus() {
  const [devices, setDevices] = useState<DeviceStatus[]>(initialDevices);
  const [health] = useState<SystemHealth>({
    esp32Status: 'online',
    mqttBroker: 'connected',
    networkStrength: 92,
    batteryLevel: 100
  });

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

  return { devices, health, toggleDevice };
}
