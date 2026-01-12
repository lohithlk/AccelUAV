import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { DashboardOverview } from './components/DashboardOverview';
import { TowerDetail } from './components/TowerDetail';
import { MapView } from './components/MapView';
import { GeometryView, ComponentHealthView, ThermalView } from './components/ModuleViews';
import { MOCK_TOWERS } from './constants';
import { Tower, Status, InsulatorData } from './types';
import { Loader2 } from 'lucide-react';

// Helper to parse DMS coordinates (e.g. 17°38'10.87"N)
const parseDMS = (dms: string) => {
  const match = dms.match(/(\d+)°(\d+)'([\d.]+)"([NSWE])/);
  if (!match) return 0;
  const deg = parseFloat(match[1]);
  const min = parseFloat(match[2]);
  const sec = parseFloat(match[3]);
  const dir = match[4];
  let val = deg + min / 60 + sec / 3600;
  if (dir === 'S' || dir === 'W') val = -val;
  return val;
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTower, setSelectedTower] = useState<Tower | null>(null);
  // Upload state retained but unused in UI for dashboard mode
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState<Tower[]>([]);

  useEffect(() => {
    setData(MOCK_TOWERS);
  }, []);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Upload logic preserved in code if needed later, but disconnected from UI
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    // ... PDF processing logic would go here
    setIsUploading(false);
  };

  const handleSelectTower = (tower: Tower) => {
    setSelectedTower(tower);
  };

  const renderContent = () => {
    if (selectedTower) {
        return <TowerDetail tower={selectedTower} onBack={() => setSelectedTower(null)} />;
    }

    switch (activeTab) {
        case 'dashboard':
            return <DashboardOverview towers={data} onSelectTower={handleSelectTower} />;
        case 'map':
            return <MapView towers={data} onSelectTower={handleSelectTower} />;
        case 'geometry':
            return <GeometryView towers={data} onSelectTower={handleSelectTower} />;
        case 'components':
            return <ComponentHealthView towers={data} onSelectTower={handleSelectTower} />;
        case 'thermal':
            return <ThermalView towers={data} onSelectTower={handleSelectTower} />;
        default:
            return <DashboardOverview towers={data} onSelectTower={handleSelectTower} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSelectedTower(null); }}>
      {isUploading ? (
          <div className="flex flex-col items-center justify-center h-full animate-fadeIn">
              <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
              <h2 className="text-xl font-bold text-slate-800">Processing Inspection Report...</h2>
              <p className="text-slate-500 mt-2">Extracting Thermal Images, Coordinates, and Telemetry.</p>
          </div>
      ) : (
          renderContent()
      )}
    </Layout>
  );
};

export default App;