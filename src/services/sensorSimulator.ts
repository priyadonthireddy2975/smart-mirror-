import { mqttClient } from './mqttClient';

let simulationInterval: number | null = null;

let currentSensors = {
  temperature: 24.5,
  humidity: 45,
  motionDetected: false,
  lightIntensity: { livingRoom: 320, bedroom: 150, kitchen: 400, hallway: 100 },
  airQuality: 42,
  energyConsumption: 1343
};

export const startSensorSimulation = () => {
  if (simulationInterval) return;

  simulationInterval = window.setInterval(() => {
    const motion = Math.random() > 0.8 ? !currentSensors.motionDetected : currentSensors.motionDetected;
    
    currentSensors = {
      temperature: +(currentSensors.temperature + (Math.random() - 0.5) * 0.5).toFixed(1),
      humidity: Math.max(0, Math.min(100, Math.round(currentSensors.humidity + (Math.random() - 0.5) * 2))),
      motionDetected: motion,
      lightIntensity: {
        livingRoom: Math.max(0, Math.round(currentSensors.lightIntensity.livingRoom + (Math.random() - 0.5) * 20)),
        bedroom: Math.max(0, Math.round(currentSensors.lightIntensity.bedroom + (Math.random() - 0.5) * 10)),
        kitchen: Math.max(0, Math.round(currentSensors.lightIntensity.kitchen + (Math.random() - 0.5) * 15)),
        hallway: Math.max(0, Math.round(currentSensors.lightIntensity.hallway + (Math.random() - 0.5) * 5)),
      },
      airQuality: Math.max(0, Math.round(currentSensors.airQuality + (Math.random() - 0.5) * 3)),
      energyConsumption: currentSensors.energyConsumption + (Math.random() - 0.5) * 50
    };

    mqttClient.publish('sensors/telemetry', currentSensors);

    // Random power spike
    if (Math.random() > 0.95) {
      mqttClient.publish('sensors/power_spike', { time: Date.now(), value: currentSensors.energyConsumption + 1500 });
    }

  }, 3000);
};

export const stopSensorSimulation = () => {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
  }
};
