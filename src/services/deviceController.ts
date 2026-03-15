export const togglePhysicalAppliance = (deviceId: string, turnOn: boolean) => {
  console.log(`[deviceController] Sending command to MQTT: Turn ${turnOn ? 'ON' : 'OFF'} device ${deviceId}`);
  // In a real app: mqttClient.publish(`devices/${deviceId}/command`, { state: turnOn ? 'ON' : 'OFF' });
};
