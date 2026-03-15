import { useState, useEffect } from 'react';
import { mqttClient } from '../services/mqttClient';
import { startSensorSimulation, stopSensorSimulation } from '../services/sensorSimulator';
import type { SensorData, Alert } from '../types';

export function useSensorData() {
  const [sensors, setSensors] = useState<SensorData>({
    temperature: 24.5,
    humidity: 45,
    motionDetected: false,
    lightIntensity: { livingRoom: 320, bedroom: 150, kitchen: 400, hallway: 100 },
    airQuality: 42,
    energyConsumption: 1343
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

  useEffect(() => {
    startSensorSimulation();
    
    const handleTelemetry = (data: SensorData) => setSensors(data);
    
    const handlePowerSpike = (data: any) => {
      setAlerts(prev => [{
        id: `spike-${Date.now()}`,
        type: 'power',
        message: `Power spike detected: ${Math.round(data.value)}W`,
        timestamp: new Date(),
        severity: 'critical',
        isRead: false
      }, ...prev]);
    };

    mqttClient.subscribe('sensors/telemetry', handleTelemetry);
    mqttClient.subscribe('sensors/power_spike', handlePowerSpike);

    return () => {
      mqttClient.unsubscribe('sensors/telemetry', handleTelemetry);
      mqttClient.unsubscribe('sensors/power_spike', handlePowerSpike);
      stopSensorSimulation();
    };
  }, []);

  const markAlertRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, isRead: true } : a));
  };

  return { sensors, alerts, markAlertRead };
}
