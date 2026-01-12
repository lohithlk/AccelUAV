import React from 'react';
import { Tower, Status } from '../types';
import { AlertTriangle, CheckCircle, Thermometer, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  towers: Tower[];
  onSelectTower: (tower: Tower) => void;
}

export const DashboardOverview: React.FC<DashboardProps> = ({ towers, onSelectTower }) => {
  const issues = towers.reduce((acc, t) => acc + t.insulators.filter(i => i.status !== Status.NORMAL).length, 0);
  const critical = towers.reduce((acc, t) => acc + t.insulators.filter(i => i.status === Status.CRITICAL || i.status === Status.ATTENTION).length, 0);
  const avgTemp = towers.reduce((acc, t) => acc + t.insulators.reduce((sum, i) => sum + i.avgTemp, 0) / t.insulators.length, 0) / towers.length;

  const chartData = towers.map(t => ({
    name: t.id,
    maxTemp: Math.max(...t.insulators.map(i => i.maxTemp)),
    issues: t.insulators.filter(i => i.status !== Status.NORMAL).length
  }));

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Assets Scanned</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{towers.length}</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Zap size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Anomalies Detected</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{issues}</h3>
            </div>
            <div className={`p-3 rounded-lg ${issues > 0 ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
              <AlertTriangle size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Avg. Temperature</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{avgTemp.toFixed(1)}°C</h3>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-lg">
              <Thermometer size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-slate-500">Critical Alerts</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-2">{critical}</h3>
            </div>
            <div className={`p-3 rounded-lg ${critical > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              <ActivityIcon active={critical > 0} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h4 className="text-lg font-bold text-slate-800 mb-6">Thermal Peak Analysis</h4>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis unit="°C" />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="maxTemp" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.maxTemp > 38 ? '#ef4444' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Alerts List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
          <h4 className="text-lg font-bold text-slate-800 mb-4">Inspection Feed</h4>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {towers.map(tower => {
                const towerIssues = tower.insulators.filter(i => i.status !== Status.NORMAL);
                return (
                    <div 
                        key={tower.id}
                        onClick={() => onSelectTower(tower)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${towerIssues.length > 0 ? 'border-amber-200 bg-amber-50' : 'border-slate-100 hover:bg-slate-50'}`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-slate-800">{tower.name}</span>
                            <span className="text-xs text-slate-500">{tower.timestamp.split(' ')[0]}</span>
                        </div>
                        {towerIssues.length > 0 ? (
                            <div className="text-sm text-amber-700 flex items-start gap-2">
                                <AlertTriangle size={16} className="mt-0.5" />
                                <span>{towerIssues.length} Insulators need attention ({towerIssues.map(i => i.id).join(', ')})</span>
                            </div>
                        ) : (
                             <div className="text-sm text-green-700 flex items-center gap-2">
                                <CheckCircle size={16} />
                                <span>All systems normal</span>
                            </div>
                        )}
                    </div>
                )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ActivityIcon = ({ active }: { active: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" viewBox="0 0 24 24" 
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={`${active ? 'animate-pulse' : ''}`}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);