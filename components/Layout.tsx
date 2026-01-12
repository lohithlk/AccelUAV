import React from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  Thermometer, 
  Activity, 
  Menu, 
  FileText
} from 'lucide-react';
import logo from '../logo for dashboard.png';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'geometry', label: 'Tower Geometry', icon: Activity },
    { id: 'components', label: 'Component Health', icon: FileText },
    { id: 'thermal', label: 'Thermal Analysis', icon: Thermometer },
    { id: 'map', label: 'Geo Location', icon: MapIcon },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} 
        bg-slate-900 text-white transition-all duration-300 flex flex-col shadow-xl z-20`}
      >
        <div className="p-4 flex items-center justify-between border-b border-slate-700 h-16">
          {sidebarOpen && (
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="w-8 h-8 rounded-lg object-cover" />
              <span className="font-bold text-lg tracking-tight">AccelUAV</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 px-2 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors
                ${activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
            >
              <item.icon size={22} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
        
        {/* Import functionality removed for dashboard mode */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
          <h1 className="text-xl font-semibold text-slate-800">
            {navItems.find(i => i.id === activeTab)?.label}
          </h1>
          <div className="flex items-center space-x-4">
             <div className="text-sm text-slate-500">
               Project: VSS-Parwada Transmission Lines
             </div>
             <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs">
               AU
             </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
};