export interface SensorData {
  temperature: number;
  humidity: number;
  motionDetected: boolean;
  lightIntensity: { livingRoom: number; bedroom: number; kitchen: number; hallway: number };
  airQuality: number;
  energyConsumption: number;
}

export interface DeviceStatus {
  id: string;
  name: string;
  type: 'light' | 'fan' | 'plug' | 'ac' | 'camera';
  isOn: boolean;
  powerDraw: number;
}

export interface SystemHealth {
  esp32Status: 'online' | 'offline' | 'warning';
  mqttBroker: 'connected' | 'disconnected' | 'reconnecting';
  networkStrength: number;
  batteryLevel: number;
}

export interface Alert {
  id: string;
  type: 'motion' | 'temperature' | 'smoke' | 'offline' | 'power';
  message: string;
  timestamp: Date;
  severity: 'warning' | 'critical' | 'info';
  isRead: boolean;
}
