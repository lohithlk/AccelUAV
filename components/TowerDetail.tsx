
import React, { useState, useEffect } from 'react';
import { Tower, Status } from '../types';
import { 
  Thermometer, 
  Ruler, 
  ImageIcon, 
  MapPin, 
  AlertTriangle,
  ChevronRight,
  Maximize2,
  Upload,
  RefreshCw,
  Trash2,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface TowerDetailProps {
  tower: Tower;
  onBack: () => void;
}

export const TowerDetail: React.FC<TowerDetailProps> = ({ tower, onBack }) => {
  const [view, setView] = useState<'thermal' | 'visual' | 'geometry'>('thermal');
  const [customThermal, setCustomThermal] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Load saved image from local storage on mount or tower change
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`thermal_img_${tower.id}`);
      if (saved) {
        setCustomThermal(saved);
      } else {
        setCustomThermal(null);
      }
    } catch (e) {
      console.error("Error loading from local storage", e);
    }
  }, [tower.id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCustomThermal(base64String);
        // Persist to localStorage so it survives refresh/reloads
        try {
          localStorage.setItem(`thermal_img_${tower.id}`, base64String);
        } catch (error) {
          console.error("Failed to save image to local storage", error);
          alert("Image is too large to save permanently in browser storage, but it will be displayed for this session.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    localStorage.removeItem(`thermal_img_${tower.id}`);
    setCustomThermal(null);
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.ATTENTION: return 'text-amber-600 bg-amber-50 border-amber-200';
      case Status.CRITICAL: return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Breadcrumb & Header */}
      <div className="flex items-center space-x-2 text-sm text-slate-500 mb-2">
        <button onClick={onBack} className="hover:text-slate-800">Dashboard</button>
        <ChevronRight size={16} />
        <span className="font-semibold text-slate-800">{tower.name}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{tower.name}</h2>
            <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1"><MapPin size={14} /> {tower.coordinates.latStr}, {tower.coordinates.lngStr}</span>
                <span className="flex items-center gap-1">Captured: {tower.timestamp}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setView('thermal')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${view === 'thermal' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <Thermometer size={18} /> Thermal
            </button>
             <button 
              onClick={() => setView('visual')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${view === 'visual' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <ImageIcon size={18} /> Components
            </button>
             <button 
              onClick={() => setView('geometry')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${view === 'geometry' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <Ruler size={18} /> Geometry
            </button>
          </div>
        </div>
      </div>

      {view === 'thermal' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                     <h3 className="text-lg font-bold text-slate-800">Thermal Signature</h3>
                     <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded">Max: {Math.max(...tower.insulators.map(i => i.maxTemp))}°C</span>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-slate-200 group bg-slate-900">
                    <button
                      onClick={() => setZoomedImage(customThermal || tower.thermalImage)}
                      className="absolute top-4 left-4 z-20 p-2 bg-white/90 hover:bg-white text-slate-700 rounded shadow transition-all backdrop-blur-sm"
                      title="Click to zoom"
                    >
                      <Maximize2 size={16} />
                    </button>
                    <img 
                      src={customThermal || tower.thermalImage} 
                      alt="Thermal" 
                      className="w-full h-96 object-contain cursor-zoom-in" 
                      onClick={() => setZoomedImage(customThermal || tower.thermalImage)}
                    />
                    
                    {/* Upload Controls Overlay */}
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                        {customThermal && (
                           <button 
                             onClick={handleResetImage}
                             className="bg-red-500/90 hover:bg-red-600 text-white p-2 rounded shadow transition-all backdrop-blur-sm"
                             title="Reset to default image"
                           >
                             <Trash2 size={14} />
                           </button>
                        )}
                        <label className="cursor-pointer bg-white/90 hover:bg-white text-slate-700 text-xs font-bold py-2 px-3 rounded shadow flex items-center gap-2 transition-all backdrop-blur-sm">
                            <Upload size={14} />
                            <span>{customThermal ? 'Change Image' : 'Upload Image'}</span>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*" 
                              onChange={handleImageUpload} 
                            />
                        </label>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs p-2 rounded backdrop-blur-sm pointer-events-none">
                        Spectrum: IronBow
                        <br/>
                        Emissivity: 0.95
                    </div>
                </div>
                <p className="text-xs text-slate-400 mt-2 italic text-center">
                  * Images uploaded here are saved to your browser's local storage and will persist after refresh.
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Insulator Temperature Analysis</h3>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 uppercase">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">Min</th>
                                    <th className="px-4 py-3">Avg</th>
                                    <th className="px-4 py-3">Max</th>
                                    <th className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {tower.insulators.map((ins) => (
                                    <tr key={ins.id} className="hover:bg-slate-50">
                                        <td className="px-4 py-3 font-medium">{ins.id}</td>
                                        <td className="px-4 py-3 text-slate-500">{ins.minTemp.toFixed(1)}°C</td>
                                        <td className="px-4 py-3 font-semibold text-slate-700">{ins.avgTemp.toFixed(1)}°C</td>
                                        <td className="px-4 py-3 text-slate-500">{ins.maxTemp.toFixed(1)}°C</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(ins.status)}`}>
                                                {ins.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-64">
                    <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase">Delta T Comparison</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={tower.insulators}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="id" />
                            <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="avgTemp" stroke="#3b82f6" strokeWidth={2} name="Avg Temp" />
                            <Line type="monotone" dataKey="maxTemp" stroke="#ef4444" strokeWidth={2} name="Max Temp" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
      )}

      {view === 'visual' && (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Overall Structural View</h3>
                    <div className="relative h-64 w-full bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center group cursor-zoom-in">
                        <img 
                          src={tower.overallImage} 
                          className="h-full w-full object-contain bg-slate-900" 
                          alt="Overall"
                          onClick={() => setZoomedImage(tower.overallImage)}
                        />
                        <button 
                          onClick={() => setZoomedImage(tower.overallImage)}
                          className="absolute top-4 right-4 p-2 bg-white/90 rounded-lg shadow hover:bg-white transition-all"
                        >
                          <Maximize2 size={16}/>
                        </button>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">220KV Tension String Assembly</h3>
                    <div className="relative h-64 w-full bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center group cursor-zoom-in">
                        <img 
                          src={tower.stringImage} 
                          className="h-full w-full object-contain bg-slate-900" 
                          alt="String Assembly"
                          onClick={() => setZoomedImage(tower.stringImage)}
                        />
                        <button 
                          onClick={() => setZoomedImage(tower.stringImage)}
                          className="absolute top-4 right-4 p-2 bg-white/90 rounded-lg shadow hover:bg-white transition-all"
                        >
                          <Maximize2 size={16}/>
                        </button>
                    </div>
                </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-4 px-1">Insulator Inspection Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tower.allInsulatorImages && tower.allInsulatorImages.length > 0 ? (
                    tower.allInsulatorImages.map((imgPath, idx) => {
                        const insulatorNum = idx + 1;
                        const insulatorData = tower.insulators.find(ins => ins.id === `i${insulatorNum}`);
                        return (
                            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                                <div className="aspect-square bg-slate-100 rounded-lg mb-3 overflow-hidden group cursor-zoom-in" onClick={() => setZoomedImage(imgPath)}>
                                    <img 
                                    src={imgPath} 
                                    alt={`Insulator ${insulatorNum}`} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-slate-700">Insulator {insulatorNum}</span>
                                    {insulatorData && insulatorData.status !== Status.NORMAL && <AlertTriangle size={18} className="text-amber-500"/>}
                                </div>
                                {insulatorData ? (
                                    <div className="text-xs text-slate-500 mt-1 flex justify-between">
                                        <span>Status: <span className={insulatorData.status === Status.NORMAL ? 'text-green-600' : 'text-amber-600'}>{insulatorData.status}</span></span>
                                    </div>
                                ) : (
                                    <div className="text-xs text-slate-400 mt-1">Image reference only</div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    tower.insulators.map((ins, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                            <div className="aspect-square bg-slate-100 rounded-lg mb-3 overflow-hidden group cursor-zoom-in" onClick={() => setZoomedImage(ins.image || `https://picsum.photos/400/400?random=${idx + 10}`)}>
                                <img 
                                src={ins.image || `https://picsum.photos/400/400?random=${idx + 10}`} 
                                alt={ins.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-slate-700">{ins.name}</span>
                                {ins.status !== Status.NORMAL && <AlertTriangle size={18} className="text-amber-500"/>}
                            </div>
                            <div className="text-xs text-slate-500 mt-1 flex justify-between">
                                <span>Status: <span className={ins.status === Status.NORMAL ? 'text-green-600' : 'text-amber-600'}>{ins.status}</span></span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
      )}

      {view === 'geometry' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
                  <h3 className="text-lg font-bold text-slate-800 mb-6">Structural Deformation Analysis</h3>
                  <div className="grid grid-cols-2 gap-8">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                            <h4 className="text-slate-500 text-sm font-medium mb-2">Inclination (X-Axis)</h4>
                            <div className="text-4xl font-bold text-slate-300">--</div>
                            <div className="text-xs text-slate-400 mt-2 font-medium">Normal</div>
                        </div>
                         <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                            <h4 className="text-slate-500 text-sm font-medium mb-2">Inclination (Y-Axis)</h4>
                            <div className="text-4xl font-bold text-slate-300">--</div>
                            <div className="text-xs text-slate-400 mt-2 font-medium">Normal</div>
                        </div>
                         <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                            <h4 className="text-slate-500 text-sm font-medium mb-2">Conductor Sag</h4>
                            <div className="text-4xl font-bold text-slate-300">--</div>
                            <div className="text-xs text-slate-400 mt-2">No deviation detected</div>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 text-center">
                            <h4 className="text-slate-500 text-sm font-medium mb-2">Vegetation Clearance</h4>
                            <div className={`text-4xl font-bold ${tower.vegetationRisk === 'High' ? 'text-red-600' : tower.vegetationRisk === 'Medium' ? 'text-amber-600' : 'text-green-600'}`}>
                                {tower.vegetationRisk}
                            </div>
                            <div className="text-xs text-slate-500 mt-2">RoW Encroachment Scan</div>
                        </div>
                  </div>
              </div>

               <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Structural Health</h3>
                    <div className="flex flex-col items-center justify-center h-64">
                        <div className="relative h-40 w-40 flex items-center justify-center bg-blue-50 rounded-full border-4 border-white shadow-sm ring-4 ring-blue-50">
                             <CheckCircle2 size={80} className="text-blue-500" />
                        </div>
                        <p className="text-center font-bold text-xl text-slate-800 mt-6">
                            Status: Normal
                        </p>
                        <p className="text-center text-sm text-slate-500 mt-2 px-4">
                            No significant structural deformations detected.
                        </p>
                    </div>
               </div>
          </div>
      )}

      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/40 text-white rounded-lg transition-all"
            title="Close"
          >
            <X size={24} />
          </button>
          
          <TransformWrapper
            initialScale={1}
            initialPositionX={0}
            initialPositionY={0}
            wheel={{ step: 0.1 }}
            pinch={{ step: 5 }}
            doubleClick={{ step: 3, animation: true, animationSpeed: 200 }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <TransformComponent>
                  <img
                    src={zoomedImage}
                    alt="Zoomed"
                    className="max-w-4xl max-h-[85vh] object-contain"
                  />
                </TransformComponent>
                
                {/* Zoom Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-lg backdrop-blur-sm">
                  <button
                    onClick={() => zoomOut()}
                    className="p-2 bg-white/20 hover:bg-white/40 text-white rounded transition-all"
                    title="Zoom Out"
                  >
                    <ZoomOut size={20} />
                  </button>
                  <button
                    onClick={() => resetTransform()}
                    className="px-4 py-2 bg-white/20 hover:bg-white/40 text-white rounded transition-all text-sm font-medium"
                    title="Reset View"
                  >
                    Reset
                  </button>
                  <button
                    onClick={() => zoomIn()}
                    className="p-2 bg-white/20 hover:bg-white/40 text-white rounded transition-all"
                    title="Zoom In"
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>
              </>
            )}
          </TransformWrapper>
        </div>
      )}
    </div>
  );
};
