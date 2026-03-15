import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import DeviceControl from './components/Devices/DeviceControl';
import EnergyDashboard from './components/Energy/EnergyDashboard';
import AlertsPanel from './components/Alerts/AlertsPanel';
import SystemHealth from './components/SystemHealth/SystemHealth';
import SmartMirrorUI from './components/SmartMirror/SmartMirrorUI';

export default function App() {
  console.log('App: rendering full structure');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="devices" element={<DeviceControl />} />
          <Route path="energy" element={<EnergyDashboard />} />
          <Route path="security" element={<AlertsPanel />} />
          <Route path="health" element={<SystemHealth />} />
          <Route path="settings" element={<Dashboard />} />
        </Route>
        <Route path="/mirror" element={<SmartMirrorUI />} />
      </Routes>
    </BrowserRouter>
  );
}
