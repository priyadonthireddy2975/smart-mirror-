import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export default function Layout() {
  return (
    <div className="flex bg-[#050508] min-h-screen text-white overflow-hidden relative selection:bg-neon-blue/30">
      {/* Background Glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-cyan/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative z-10 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
