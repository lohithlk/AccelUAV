
import { Tower, Status } from './types';

// Helper to generate clear placeholder images
const getImg = (text: string, color = '2563eb', bg = 'e2e8f0') => 
  `https://placehold.co/800x600/${bg}/${color}?text=${encodeURIComponent(text)}`;

// Helper to get 8 insulator images for a tower (returns all 8 image paths)
const getInsulatorImages = (towerFolder: string) => [
  new URL(`./${towerFolder}/I1.jpg`, import.meta.url).href,
  new URL(`./${towerFolder}/I2.jpg`, import.meta.url).href,
  new URL(`./${towerFolder}/I3.jpg`, import.meta.url).href,
  new URL(`./${towerFolder}/I4.jpg`, import.meta.url).href,
  new URL(`./${towerFolder}/I5.jpg`, import.meta.url).href,
  new URL(`./${towerFolder}/I6.jpg`, import.meta.url).href,
  new URL(`./${towerFolder}/I7.jpg`, import.meta.url).href,
  new URL(`./${towerFolder}/I8.jpg`, import.meta.url).href,
];

export const MOCK_TOWERS: Tower[] = [
  {
    id: "T1_461",
    name: "Tower 1_461",
    coordinates: {
      lat: 17.636353,
      lng: 83.117969,
      latStr: "17°38'10.87\"N",
      lngStr: "83° 7'4.69\"E"
    },
    timestamp: "2025/12/30 10:33:36",
    overallImage: new URL("./1/Overall view.jpg", import.meta.url).href,
    stringImage: new URL("./1/220KV Tension Insulator String assembly.jpg", import.meta.url).href,
    thermalImage: new URL("./1/Thermal inspection.png", import.meta.url).href,
    vegetationRisk: 'Low',
    geometry: {
      inclinationX: 0.2,
      inclinationY: 0.1,
      sag: 4.5,
      structuralIntegrity: 98
    },
    insulators: [
      { id: "i1", name: "Insulator 1", minTemp: 30.6, avgTemp: 31.4, maxTemp: 32.1, status: Status.NORMAL, image: new URL("./1/I1.jpg", import.meta.url).href },
      { id: "i2", name: "Insulator 2", minTemp: 30.6, avgTemp: 31.4, maxTemp: 32.2, status: Status.NORMAL, image: new URL("./1/I2.jpg", import.meta.url).href },
      { id: "i3", name: "Insulator 3", minTemp: 29.7, avgTemp: 30.6, maxTemp: 31.5, status: Status.NORMAL, image: new URL("./1/I3.jpg", import.meta.url).href },
      { id: "i4", name: "Insulator 4", minTemp: 30.2, avgTemp: 31.1, maxTemp: 32.0, status: Status.NORMAL, image: new URL("./1/I4.jpg", import.meta.url).href },
      { id: "i5", name: "Insulator 5", minTemp: 30.5, avgTemp: 31.4, maxTemp: 32.2, status: Status.NORMAL, image: new URL("./1/I5.jpg", import.meta.url).href },
      { id: "i6", name: "Insulator 6", minTemp: 31.2, avgTemp: 32.0, maxTemp: 32.9, status: Status.NORMAL, image: new URL("./1/I6.jpg", import.meta.url).href },
    ],
    allInsulatorImages: getInsulatorImages("1")
  },
  {
    id: "T2_462",
    name: "Tower 2_462",
    coordinates: {
      lat: 17.635567,
      lng: 83.118867,
      latStr: "17°38'8.04\"N",
      lngStr: "83° 7'7.92\"E"
    },
    timestamp: "2025/12/30 10:42:20",
    overallImage: new URL("./2/Overall view.jpg", import.meta.url).href,
    stringImage: new URL("./2/220KV Tension Insulator String assembly.jpg", import.meta.url).href,
    thermalImage: new URL("./2/Thermal inspection.png", import.meta.url).href,
    vegetationRisk: 'Medium',
    geometry: {
      inclinationX: 0.5,
      inclinationY: 0.2,
      sag: 4.8,
      structuralIntegrity: 95
    },
    insulators: [
      { id: "i1", name: "Insulator 1", minTemp: 29.4, avgTemp: 31.1, maxTemp: 32.7, status: Status.NORMAL, image: new URL("./2/I (1).jpg", import.meta.url).href },
      { id: "i2", name: "Insulator 2", minTemp: 28.8, avgTemp: 30.6, maxTemp: 32.4, status: Status.NORMAL, image: new URL("./2/I (2).jpg", import.meta.url).href },
      { id: "i3", name: "Insulator 3", minTemp: 33.1, avgTemp: 33.9, maxTemp: 34.6, status: Status.NORMAL, image: new URL("./2/I (3).jpg", import.meta.url).href },
      { id: "i4", name: "Insulator 4", minTemp: 30.5, avgTemp: 31.9, maxTemp: 33.4, status: Status.NORMAL, image: new URL("./2/I (4).jpg", import.meta.url).href },
      { id: "i5", name: "Insulator 5", minTemp: 29.8, avgTemp: 31.0, maxTemp: 32.2, status: Status.NORMAL, image: new URL("./2/I (5).jpg", import.meta.url).href },
      { id: "i6", name: "Insulator 6", minTemp: 26.7, avgTemp: 29.2, maxTemp: 31.7, status: Status.NORMAL, image: new URL("./2/I (6).jpg", import.meta.url).href },
    ],
    allInsulatorImages: getInsulatorImages("2")
  },
  {
    id: "T3_463",
    name: "Tower 3_463",
    coordinates: {
      lat: 17.634806,
      lng: 83.122861,
      latStr: "17°38'5.30\"N",
      lngStr: "83° 7'22.30\"E"
    },
    timestamp: "2025/12/30 11:19:17",
    overallImage: new URL("./3/Overall view.jpg", import.meta.url).href,
    stringImage: new URL("./3/220KV Tension Insulator String assembly.jpg", import.meta.url).href,
    thermalImage: new URL("./3/Thermal inspection.jpg", import.meta.url).href,
    vegetationRisk: 'Low',
    geometry: {
      inclinationX: 0.1,
      inclinationY: 0.1,
      sag: 4.4,
      structuralIntegrity: 99
    },
    insulators: [
      { id: "i1", name: "Insulator 1", minTemp: 30.0, avgTemp: 31.4, maxTemp: 32.9, status: Status.NORMAL, image: new URL("./3/I (1).jpg", import.meta.url).href },
      { id: "i2", name: "Insulator 2", minTemp: 34.1, avgTemp: 37.1, maxTemp: 40.2, status: Status.ATTENTION, image: new URL("./3/I (2).jpg", import.meta.url).href },
      { id: "i3", name: "Insulator 3", minTemp: 30.7, avgTemp: 35.2, maxTemp: 39.7, status: Status.ATTENTION, image: new URL("./3/I (3).jpg", import.meta.url).href },
      { id: "i4", name: "Insulator 4", minTemp: 30.3, avgTemp: 31.7, maxTemp: 33.1, status: Status.NORMAL, image: new URL("./3/I (4).jpg", import.meta.url).href },
      { id: "i5", name: "Insulator 5", minTemp: 30.5, avgTemp: 32.0, maxTemp: 33.6, status: Status.NORMAL, image: new URL("./3/I (5).jpg", import.meta.url).href },
      { id: "i6", name: "Insulator 6", minTemp: 31.2, avgTemp: 32.7, maxTemp: 34.2, status: Status.NORMAL, image: new URL("./3/I (6).jpg", import.meta.url).href },
    ],
    allInsulatorImages: getInsulatorImages("3")
  },
  {
    id: "T4_464",
    name: "Tower 4_464",
    coordinates: {
      lat: 17.633908,
      lng: 83.126517,
      latStr: "17°38'2.07\"N",
      lngStr: "83° 7'35.46\"E"
    },
    timestamp: "2025/12/30 11:29:02",
    overallImage: new URL("./4/Overall view.jpg", import.meta.url).href,
    stringImage: new URL("./4/220KV Tension Insulator String assembly.jpg", import.meta.url).href,
    thermalImage: new URL("./4/Thermal inspection.jpg", import.meta.url).href,
    vegetationRisk: 'High',
    geometry: {
      inclinationX: 0.2,
      inclinationY: 0.1,
      sag: 5.1,
      structuralIntegrity: 96
    },
    insulators: [
      { id: "i1", name: "Insulator 1", minTemp: 29.1, avgTemp: 29.9, maxTemp: 30.7, status: Status.NORMAL, image: new URL("./4/I (1).jpg", import.meta.url).href },
      { id: "i2", name: "Insulator 2", minTemp: 28.9, avgTemp: 29.6, maxTemp: 30.2, status: Status.NORMAL, image: new URL("./4/I (2).jpg", import.meta.url).href },
      { id: "i3", name: "Insulator 3", minTemp: 29.3, avgTemp: 29.8, maxTemp: 30.2, status: Status.NORMAL, image: new URL("./4/I (3).jpg", import.meta.url).href },
      { id: "i4", name: "Insulator 4", minTemp: 28.2, avgTemp: 29.1, maxTemp: 30.1, status: Status.NORMAL, image: new URL("./4/I (4).jpg", import.meta.url).href },
      { id: "i5", name: "Insulator 5", minTemp: 29.1, avgTemp: 30.2, maxTemp: 31.3, status: Status.NORMAL, image: new URL("./4/I (5).jpg", import.meta.url).href },
      { id: "i6", name: "Insulator 6", minTemp: 28.2, avgTemp: 29.1, maxTemp: 30.1, status: Status.NORMAL, image: new URL("./4/I (6).jpg", import.meta.url).href },
    ],
    allInsulatorImages: getInsulatorImages("4")
  },
  {
    id: "T5_464A",
    name: "Tower 5_464 A",
    coordinates: {
      lat: 17.633456,
      lng: 83.128250,
      latStr: "17°38'0.44\"N",
      lngStr: "83° 7'41.70\"E"
    },
    timestamp: "2025/12/30 12:01:45",
    overallImage: new URL("./5/Overall view.jpg", import.meta.url).href,
    stringImage: new URL("./5/220KV Tension Insulator String assembly.jpg", import.meta.url).href,
    thermalImage: new URL("./5/Thermal inspection.jpg", import.meta.url).href,
    vegetationRisk: 'Low',
    geometry: {
      inclinationX: 0.1,
      inclinationY: 0.1,
      sag: 5.2,
      structuralIntegrity: 97
    },
    insulators: [
      { id: "i1", name: "Insulator 1", minTemp: 26.8, avgTemp: 27.4, maxTemp: 28.0, status: Status.NORMAL, image: new URL("./5/I (1).jpg", import.meta.url).href },
      { id: "i2", name: "Insulator 2", minTemp: 26.7, avgTemp: 27.7, maxTemp: 28.7, status: Status.NORMAL, image: new URL("./5/I (2).jpg", import.meta.url).href },
      { id: "i3", name: "Insulator 3", minTemp: 26.5, avgTemp: 27.3, maxTemp: 28.0, status: Status.NORMAL, image: new URL("./5/I (3).jpg", import.meta.url).href },
      { id: "i4", name: "Insulator 4", minTemp: 28.0, avgTemp: 28.6, maxTemp: 29.1, status: Status.NORMAL, image: new URL("./5/I (4).jpg", import.meta.url).href },
      { id: "i5", name: "Insulator 5", minTemp: 26.5, avgTemp: 27.4, maxTemp: 28.2, status: Status.NORMAL, image: new URL("./5/I (5).jpg", import.meta.url).href },
      { id: "i6", name: "Insulator 6", minTemp: 25.9, avgTemp: 26.8, maxTemp: 27.6, status: Status.NORMAL, image: new URL("./5/I (6).jpg", import.meta.url).href },
    ],
    allInsulatorImages: getInsulatorImages("5")
  },
  {
    id: "T6_465",
    name: "Tower 6_465",
    coordinates: {
      lat: 17.633403,
      lng: 83.129683,
      latStr: "17°38'0.25\"N",
      lngStr: "83° 7'46.86\"E"
    },
    timestamp: "2025/12/30 12:08:32",
    overallImage: new URL("./6/Overall view.jpg", import.meta.url).href,
    stringImage: new URL("./6/220KV Tension Insulator String assembly.jpg", import.meta.url).href,
    thermalImage: new URL("./6/Thermal inspection.jpg", import.meta.url).href,
    vegetationRisk: 'Medium',
    geometry: {
      inclinationX: 0.3,
      inclinationY: 0.2,
      sag: 4.7,
      structuralIntegrity: 94
    },
    insulators: [
      { id: "i1", name: "Insulator 1", minTemp: 29.1, avgTemp: 29.9, maxTemp: 30.7, status: Status.NORMAL, image: new URL("./6/I (1).jpg", import.meta.url).href },
      { id: "i2", name: "Insulator 2", minTemp: 28.9, avgTemp: 29.6, maxTemp: 30.2, status: Status.NORMAL, image: new URL("./6/I (2).jpg", import.meta.url).href },
      { id: "i3", name: "Insulator 3", minTemp: 29.3, avgTemp: 29.8, maxTemp: 30.2, status: Status.NORMAL, image: new URL("./6/I (3).jpg", import.meta.url).href },
      { id: "i4", name: "Insulator 4", minTemp: 28.2, avgTemp: 29.1, maxTemp: 30.1, status: Status.NORMAL, image: new URL("./6/I (4).jpg", import.meta.url).href },
      { id: "i5", name: "Insulator 5", minTemp: 29.1, avgTemp: 30.2, maxTemp: 31.3, status: Status.NORMAL, image: new URL("./6/I (5).jpg", import.meta.url).href },
      { id: "i6", name: "Insulator 6", minTemp: 28.2, avgTemp: 29.1, maxTemp: 30.1, status: Status.NORMAL, image: new URL("./6/I (6).jpg", import.meta.url).href },
    ],
    allInsulatorImages: getInsulatorImages("6")
  },
  {
    id: "T7_466",
    name: "Tower 7_466",
    coordinates: {
      lat: 17.633783,
      lng: 83.131919,
      latStr: "17°38'1.62\"N",
      lngStr: "83° 7'54.91\"E"
    },
    timestamp: "2025/12/30 12:18:17",
    overallImage: new URL("./7/Overall view.jpg", import.meta.url).href,
    stringImage: new URL("./7/220KV Tension Insulator String assembly.jpg", import.meta.url).href,
    thermalImage: new URL("./7/Thermal inspection.jpg", import.meta.url).href,
    vegetationRisk: 'Low',
    geometry: {
      inclinationX: 0.1,
      inclinationY: 0.0,
      sag: 4.3,
      structuralIntegrity: 99
    },
    insulators: [
      { id: "i1", name: "Insulator 1", minTemp: 31.4, avgTemp: 33.0, maxTemp: 34.6, status: Status.NORMAL, image: new URL("./7/I (1).jpg", import.meta.url).href },
      { id: "i2", name: "Insulator 2", minTemp: 33.4, avgTemp: 34.2, maxTemp: 35.0, status: Status.NORMAL, image: new URL("./7/I (2).jpg", import.meta.url).href },
      { id: "i3", name: "Insulator 3", minTemp: 33.4, avgTemp: 34.3, maxTemp: 35.1, status: Status.NORMAL, image: new URL("./7/I (3).jpg", import.meta.url).href },
      { id: "i4", name: "Insulator 4", minTemp: 31.1, avgTemp: 32.3, maxTemp: 33.5, status: Status.NORMAL, image: new URL("./7/I (4).jpg", import.meta.url).href },
      { id: "i5", name: "Insulator 5", minTemp: 31.1, avgTemp: 32.5, maxTemp: 33.8, status: Status.NORMAL, image: new URL("./7/I (5).jpg", import.meta.url).href },
      { id: "i6", name: "Insulator 6", minTemp: 30.9, avgTemp: 31.9, maxTemp: 32.8, status: Status.NORMAL, image: new URL("./7/I (6).jpg", import.meta.url).href },
    ],
    allInsulatorImages: getInsulatorImages("7")
  }
];
