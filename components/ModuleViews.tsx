import React from 'react';
import { Tower, Status } from '../types';
import { MapPin, AlertTriangle, CheckCircle, Thermometer, Ruler, Zap } from 'lucide-react';

interface ViewProps {
  towers: Tower[];
  onSelectTower: (t: Tower) => void;
}

export const GeometryView: React.FC<ViewProps> = ({ towers, onSelectTower }) => {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">Tower Geometry Assessment</h2>
            <div className="text-sm text-slate-500">{towers.length} Assets Analyzed</div>
       </div>
       <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                <tr>
                   <th className="px-6 py-4">Tower ID</th>
                   <th className="px-6 py-4">Location</th>
                   <th className="px-6 py-4">Conductor Sag</th>
                   <th className="px-6 py-4">Tilt (X / Y)</th>
                   <th className="px-6 py-4">Structural Integrity</th>
                   <th className="px-6 py-4">Vegetation Risk</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100">
                {towers.map(tower => (
                   <tr key={tower.id} onClick={() => onSelectTower(tower)} className="hover:bg-slate-50 cursor-pointer transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-2">
                        <Ruler size={16} className="text-slate-400" />
                        {tower.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{tower.coordinates.latStr}</td>
                      <td className="px-6 py-4 font-mono text-slate-400">--</td>
                      <td className="px-6 py-4 font-mono text-slate-400">-- / --</td>
                      <td className="px-6 py-4">
                         <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                             Normal
                         </span>
                      </td>
                      <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                             tower.vegetationRisk === 'High' ? 'bg-red-100 text-red-700' : 
                             tower.vegetationRisk === 'Medium' ? 'bg-amber-100 text-amber-700' : 
                             'bg-green-100 text-green-700'
                          }`}>
                             {tower.vegetationRisk}
                          </span>
                      </td>
                   </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );
};

export const ComponentHealthView: React.FC<ViewProps> = ({ towers, onSelectTower }) => {
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">Component Health Inspection</h2>
            <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1 text-slate-500"><div className="w-2 h-2 rounded-full bg-green-500"></div> Normal</span>
                <span className="flex items-center gap-1 text-slate-500"><div className="w-2 h-2 rounded-full bg-amber-500"></div> Attention</span>
            </div>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {towers.map(tower => {
              const issues = tower.insulators.filter(i => i.status !== Status.NORMAL);
              return (
                  <div key={tower.id} onClick={() => onSelectTower(tower)} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 cursor-pointer hover:shadow-md transition-all group">
                      <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2">
                             <Zap className="text-slate-400 group-hover:text-blue-500 transition-colors" size={20} />
                             <h3 className="font-bold text-slate-800">{tower.name}</h3>
                          </div>
                          {issues.length > 0 ? 
                             <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-bold">{issues.length} Issues</span> :
                             <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Healthy</span>
                          }
                      </div>
                      
                      <div className="space-y-3">
                          <div className="text-sm text-slate-500 flex justify-between border-b border-slate-50 pb-2">
                             <span>Insulators Checked</span>
                             <span className="font-medium text-slate-900">{tower.insulators.length}</span>
                          </div>
                          {issues.length > 0 ? (
                              <div className="bg-amber-50 rounded p-2 text-xs space-y-1">
                                  <div className="font-semibold text-amber-800 mb-1">Defects Detected:</div>
                                  {issues.map((i, idx) => (
                                      <div key={idx} className="flex items-center gap-1 text-amber-700">
                                          <AlertTriangle size={10} />
                                          {i.name}: {i.status}
                                      </div>
                                  ))}
                              </div>
                          ) : (
                              <div className="bg-slate-50 rounded p-4 flex flex-col items-center justify-center text-slate-400 gap-2 h-24">
                                  <CheckCircle size={24} />
                                  <span className="text-xs">No visible defects</span>
                              </div>
                          )}
                      </div>
                  </div>
              );
          })}
       </div>
    </div>
  );
};

export const ThermalView: React.FC<ViewProps> = ({ towers, onSelectTower }) => {
  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">Thermal Signatures</h2>
            <div className="text-sm text-slate-500">Hotspot Detection Active</div>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {towers.map(tower => {
               const maxTemp = Math.max(...tower.insulators.map(i => i.maxTemp));
               const isHot = maxTemp > 38;
               return (
                   <div key={tower.id} onClick={() => onSelectTower(tower)} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer hover:shadow-md transition-all">
                       <div className="relative h-48 bg-slate-900">
                           <img src={tower.thermalImage} className="w-full h-full object-cover opacity-90" alt="Thermal" />
                           <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                               <Thermometer size={12} />
                               Max: {maxTemp.toFixed(1)}°C
                           </div>
                           {isHot && (
                               <div className="absolute bottom-2 left-2 bg-red-500/90 text-white text-xs px-2 py-1 rounded font-bold animate-pulse">
                                   HOTSPOT DETECTED
                               </div>
                           )}
                       </div>
                       <div className="p-4">
                           <h3 className="font-bold text-slate-800 mb-1">{tower.name}</h3>
                           <div className="flex justify-between items-center text-sm">
                               <span className="text-slate-500">Avg Temp: <span className="text-slate-700 font-medium">{(tower.insulators.reduce((a,b) => a + b.avgTemp, 0) / tower.insulators.length).toFixed(1)}°C</span></span>
                               <span className="text-slate-400 text-xs">{tower.timestamp.split(' ')[0]}</span>
                           </div>
                       </div>
                   </div>
               )
           })}
       </div>
    </div>
  );
};