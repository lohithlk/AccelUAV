import React, { useEffect, useRef, useState } from 'react';
import { Tower, Status } from '../types';
import { Loader2 } from 'lucide-react';

interface MapViewProps {
    towers: Tower[];
    onSelectTower: (t: Tower) => void;
}

export const MapView: React.FC<MapViewProps> = ({ towers, onSelectTower }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        let intervalId: any = null;

        const initMap = () => {
            // If already initialized, we assume it's fine unless we want to handle dynamic updates specifically.
            if (mapInstance.current) {
                return true;
            }

            // Check requirements
            if (!mapRef.current) return false;
            const L = (window as any).L;
            if (!L) return false;
            
            // Wait for data to exist to avoid NaN centers
            if (!towers || towers.length === 0) return false;

            try {
                // Calculate center safely
                const latSum = towers.reduce((sum, t) => sum + t.coordinates.lat, 0);
                const lngSum = towers.reduce((sum, t) => sum + t.coordinates.lng, 0);
                const centerLat = latSum / towers.length;
                const centerLng = lngSum / towers.length;

                // Validate coordinates
                if (isNaN(centerLat) || isNaN(centerLng)) return false;

                const map = L.map(mapRef.current).setView([centerLat, centerLng], 16);

                // --- Base Layers ---
                const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                });

                const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'Tiles &copy; Esri'
                });

                const labels = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}');
                const satelliteHybrid = L.layerGroup([satellite, labels]);

                satelliteHybrid.addTo(map);

                const baseMaps = {
                    "Satellite Hybrid": satelliteHybrid,
                    "Street Map": streetMap
                };
                L.control.layers(baseMaps).addTo(map);

                // --- Overlays ---
                const latlngs = towers.map(t => [t.coordinates.lat, t.coordinates.lng]);
                
                if (latlngs.length > 0) {
                    L.polyline(latlngs, {color: 'black', weight: 5, opacity: 0.5}).addTo(map);
                    L.polyline(latlngs, {color: '#f97316', weight: 3, dashArray: '10, 10', opacity: 1}).addTo(map);
                }

                towers.forEach((t: Tower) => {
                    const hasIssue = t.insulators.some(i => i.status !== Status.NORMAL);
                    const color = hasIssue ? '#f59e0b' : '#3b82f6';
                    
                    const markerHtml = `
                        <div style="
                            background-color: ${color};
                            width: 18px;
                            height: 18px;
                            border-radius: 50%;
                            border: 3px solid white;
                            box-shadow: 0 4px 6px rgba(0,0,0,0.5);
                        "></div>
                    `;

                    const icon = L.divIcon({
                        className: 'custom-div-icon',
                        html: markerHtml,
                        iconSize: [18, 18],
                        iconAnchor: [9, 9]
                    });

                    const marker = L.marker([t.coordinates.lat, t.coordinates.lng], { icon: icon }).addTo(map);

                    marker.bindPopup(`
                        <div class="p-1 font-sans">
                            <strong class="text-sm text-slate-900">${t.name}</strong><br/>
                            <span class="text-xs text-slate-500">Lat: ${t.coordinates.lat.toFixed(5)}, Lng: ${t.coordinates.lng.toFixed(5)}</span><br/>
                            <div class="my-1 border-t border-slate-100"></div>
                            <span class="text-xs font-bold ${hasIssue ? 'text-amber-600' : 'text-green-600'}">
                                ${hasIssue ? '⚠ Attention Needed' : '✓ Status Normal'}
                            </span><br/>
                            <button id="view-tower-${t.id}" class="mt-2 text-xs bg-slate-900 text-white px-2 py-1.5 rounded hover:bg-slate-700 w-full font-medium transition-colors">
                                View Inspection Details
                            </button>
                        </div>
                    `);

                    marker.on('popupopen', () => {
                        const btn = document.getElementById(`view-tower-${t.id}`);
                        if (btn) {
                            btn.onclick = () => onSelectTower(t);
                        }
                    });
                });

                mapInstance.current = map;
                setIsMapReady(true);
                
                // Force resize calculation after a moment to ensure tiles load correctly
                setTimeout(() => {
                    map.invalidateSize();
                }, 200);

                return true;
            } catch (err) {
                console.error("Error initializing map:", err);
                return false;
            }
        };

        if (!initMap()) {
            intervalId = setInterval(() => {
                if (initMap()) {
                    clearInterval(intervalId);
                }
            }, 100);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
                setIsMapReady(false);
            }
        }
    }, [towers, onSelectTower]);

    return (
        <div className="flex flex-col space-y-4 h-full min-h-[600px]">
             <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
                 <div>
                    <h2 className="font-bold text-slate-800">Geospatial Distribution</h2>
                    <p className="text-sm text-slate-500">Asset Tracking • Line Corridor 461-466</p>
                 </div>
                 <div className="flex gap-4 text-sm">
                     <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm ring-1 ring-slate-200"></div> <span>Normal</span>
                     </div>
                      <div className="flex items-center gap-2">
                         <div className="w-3 h-3 rounded-full bg-amber-500 border-2 border-white shadow-sm animate-pulse ring-1 ring-slate-200"></div> <span>Attention</span>
                     </div>
                 </div>
             </div>

             <div className="flex-1 bg-slate-200 rounded-xl shadow-inner border border-slate-300 overflow-hidden relative z-0 min-h-[500px]">
                {!isMapReady && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 z-50 text-slate-400">
                        <Loader2 className="animate-spin mb-2" size={32} />
                        <span className="text-sm font-medium">Loading Map Data...</span>
                    </div>
                )}
                {/* Ensure div has explicit minimum height for Leaflet */}
                <div ref={mapRef} className="w-full h-full z-0" style={{ minHeight: '500px' }} />
                
                <div className={`absolute bottom-4 left-4 z-[400] bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg text-xs border border-slate-200 transition-opacity duration-500 ${isMapReady ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="font-bold mb-1">Layer Controls</div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-0.5 bg-orange-500 border border-black"></div>
                        <span>220KV Line Path</span>
                    </div>
                    <div className="text-slate-500 text-[10px] mt-1">Use the layer icon (top-right) to toggle<br/>between Satellite and Street View.</div>
                </div>
             </div>
        </div>
    );
};