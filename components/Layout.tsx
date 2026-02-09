
import React from 'react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeRole, setActiveRole }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFEFE]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-[100] px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200">
              <span className="text-white text-xl font-black">H</span>
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-800 tracking-tighter leading-none">Hearthands</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Compassion Hub</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
             <button 
                onClick={() => setActiveRole(activeRole === UserRole.VOLUNTEER ? UserRole.DONOR : UserRole.VOLUNTEER)}
                className="text-[9px] font-black px-3 py-2 bg-slate-900 rounded-xl text-white hover:bg-slate-800 uppercase tracking-tighter shadow-sm"
             >
                {activeRole === UserRole.VOLUNTEER ? 'Giver Mode' : 'Helper Mode'}
             </button>
             <div className="w-10 h-10 bg-slate-100 rounded-2xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                <img src="https://picsum.photos/id/64/100" alt="Profile" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-md mx-auto w-full pb-32">
        {children}
      </main>

      {/* Floating Bottom Nav */}
      <nav className="fixed bottom-6 left-6 right-6 max-w-sm mx-auto z-[150]">
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-[2.5rem] px-8 py-4 flex justify-between items-center ring-4 ring-white/50">
          <NavItem icon="🏠" label="Feed" active />
          <NavItem icon="🗺️" label="Map" />
          <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/40 -mt-12 mb-2">
            <span className="text-white text-2xl font-bold">+</span>
          </div>
          <NavItem icon="📊" label="Stats" />
          <NavItem icon="👤" label="Me" />
        </div>
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ icon: string; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <button className={`flex flex-col items-center gap-1 transition-all ${active ? 'scale-110' : 'opacity-40 grayscale'}`}>
    <span className="text-2xl">{icon}</span>
    <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

export default Layout;
