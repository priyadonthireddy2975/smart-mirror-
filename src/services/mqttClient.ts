

// Mock MQTT Client that simulates receiving events
class MockMQTTClient {
  private static instance: MockMQTTClient;
  private listeners: Map<string, ((data: any) => void)[]> = new Map();

  private constructor() {}

  public static getInstance(): MockMQTTClient {
    if (!MockMQTTClient.instance) {
      MockMQTTClient.instance = new MockMQTTClient();
    }
    return MockMQTTClient.instance;
  }

  public subscribe(topic: string, callback: (data: any) => void) {
    if (!this.listeners.has(topic)) {
      this.listeners.set(topic, []);
    }
    this.listeners.get(topic)!.push(callback);
  }

  public unsubscribe(topic: string, callback: (data: any) => void) {
    if (this.listeners.has(topic)) {
      this.listeners.set(
        topic,
        this.listeners.get(topic)!.filter(cb => cb !== callback)
      );
    }
  }

  public publish(topic: string, data: any) {
    if (this.listeners.has(topic)) {
      this.listeners.get(topic)!.forEach(cb => cb(data));
    }
  }
}

export const mqttClient = MockMQTTClient.getInstance();
