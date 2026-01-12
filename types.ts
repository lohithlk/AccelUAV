
export enum Status {
  NORMAL = 'Normal',
  WARNING = 'Warning',
  CRITICAL = 'Critical',
  ATTENTION = 'Need Attention'
}

export interface Coordinates {
  lat: number;
  lng: number;
  latStr: string;
  lngStr: string;
}

export interface InsulatorData {
  id: string; // e.g., "L1", "L2"
  name: string; // e.g., "Insulator 1"
  minTemp: number;
  avgTemp: number;
  maxTemp: number;
  status: Status;
  image: string;
}

export interface GeometryData {
  inclinationX: number; // degrees
  inclinationY: number; // degrees
  sag: number; // meters
  structuralIntegrity: number; // percentage 0-100
}

export interface Tower {
  id: string;
  name: string;
  coordinates: Coordinates;
  timestamp: string;
  overallImage: string;
  stringImage: string; // New field for Tension Insulator String assembly
  thermalImage: string;
  insulators: InsulatorData[];
  geometry: GeometryData;
  vegetationRisk: 'Low' | 'Medium' | 'High';
}

export interface DashboardStats {
  totalTowers: number;
  issuesFound: number;
  avgTemp: number;
  criticalAlerts: number;
}
