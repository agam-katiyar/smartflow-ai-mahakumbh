// Mock data for Simhastha Mahakumbh 2028 - Ujjain, Madhya Pradesh
// Shipra (Kshipra) River · Mahakaleshwar Jyotirlinga · 18 zones

export const MAHAKUMBH_ZONES = [
  { id: 'Z1', name: 'Ram Ghat', lat: 23.1845, lng: 75.7685, density: 92, capacity: 50000, status: 'critical', sector: 'Shipra Tatt' },
  { id: 'Z2', name: 'Triveni Ghat', lat: 23.1920, lng: 75.7650, density: 67, capacity: 35000, status: 'moderate', sector: 'Triveni' },
  { id: 'Z3', name: 'Mahakaleshwar Temple', lat: 23.1828, lng: 75.7682, density: 95, capacity: 30000, status: 'critical', sector: 'Mahakal' },
  { id: 'Z4', name: 'Harsiddhi Temple', lat: 23.1815, lng: 75.7710, density: 78, capacity: 25000, status: 'high', sector: 'Old City' },
  { id: 'Z5', name: 'Mangalnath Area', lat: 23.1750, lng: 75.7580, density: 85, capacity: 20000, status: 'critical', sector: 'South Ujjain' },
  { id: 'Z6', name: 'Siddhawar Ghat', lat: 23.1960, lng: 75.7640, density: 38, capacity: 22000, status: 'normal', sector: 'North Shipra' },
  { id: 'Z7', name: 'Bhairavgarh', lat: 23.2050, lng: 75.7700, density: 55, capacity: 35000, status: 'moderate', sector: 'Bhairavgarh' },
  { id: 'Z8', name: 'Tower Chowk', lat: 23.1790, lng: 75.7850, density: 72, capacity: 18000, status: 'high', sector: 'Central' },
  { id: 'Z9', name: 'Freeganj Area', lat: 23.1710, lng: 75.7900, density: 45, capacity: 20000, status: 'normal', sector: 'Market Zone' },
  { id: 'Z10', name: 'Mela Ground North', lat: 23.2000, lng: 75.7600, density: 88, capacity: 60000, status: 'critical', sector: 'Mela Ground' },
  { id: 'Z11', name: 'Mela Ground South', lat: 23.1880, lng: 75.7620, density: 76, capacity: 55000, status: 'high', sector: 'Mela Ground' },
  { id: 'Z12', name: 'Main Entry Gate 1', lat: 23.1900, lng: 75.7750, density: 82, capacity: 15000, status: 'high', sector: 'Entry Zone' },
  { id: 'Z13', name: 'Main Entry Gate 2', lat: 23.1760, lng: 75.7780, density: 41, capacity: 15000, status: 'normal', sector: 'Entry Zone' },
  { id: 'Z14', name: 'Nanakheda Bus Stand', lat: 23.1680, lng: 75.7820, density: 63, capacity: 25000, status: 'moderate', sector: 'Transport Hub' },
  { id: 'Z15', name: 'Parking Zone A', lat: 23.2100, lng: 75.7750, density: 82, capacity: 8000, status: 'high', sector: 'Parking' },
  { id: 'Z16', name: 'Parking Zone B', lat: 23.1600, lng: 75.7650, density: 35, capacity: 10000, status: 'normal', sector: 'Parking' },
  { id: 'Z17', name: 'Parking Zone C', lat: 23.2080, lng: 75.8000, density: 58, capacity: 12000, status: 'moderate', sector: 'Parking' },
  { id: 'Z18', name: 'Ujjain Railway Station', lat: 23.1767, lng: 75.7885, density: 70, capacity: 20000, status: 'high', sector: 'Transport Hub' },
]

export const PARKING_ZONES = [
  { id: 'P1', name: 'Sector A Parking', location: 'Near Ram Ghat', capacity: 8000, occupied: 6560, walking: '8 min', shuttleFreq: '5 min', lat: 23.2100, lng: 75.7750, status: 'high' },
  { id: 'P2', name: 'Sector B Parking', location: 'Dewas Naka Road', capacity: 10000, occupied: 3500, walking: '12 min', shuttleFreq: '3 min', lat: 23.1600, lng: 75.7650, status: 'normal' },
  { id: 'P3', name: 'Sector C Parking', location: 'Indore Road Entry', capacity: 12000, occupied: 6960, walking: '15 min', shuttleFreq: '7 min', lat: 23.2080, lng: 75.8000, status: 'moderate' },
  { id: 'P4', name: 'Station Parking', location: 'Ujjain Railway Station', capacity: 5000, occupied: 1500, walking: '20 min', shuttleFreq: '10 min', lat: 23.1767, lng: 75.7885, status: 'normal' },
]

export const SHUTTLE_ROUTES = [
  { id: 'S1', name: 'Saffron Line', from: 'Railway Station', to: 'Ram Ghat', frequency: '5 min', capacity: 80, active: 12, color: '#FF6B00' },
  { id: 'S2', name: 'Gold Line', from: 'Parking Zone B', to: 'Triveni Ghat', frequency: '3 min', capacity: 60, active: 18, color: '#E8A937' },
  { id: 'S3', name: 'Green Line', from: 'Nanakheda Bus Stand', to: 'Mahakaleshwar', frequency: '7 min', capacity: 80, active: 8, color: '#05C77E' },
  { id: 'S4', name: 'Blue Line', from: 'Bhairavgarh', to: 'Mela Ground', frequency: '10 min', capacity: 100, active: 6, color: '#3B82F6' },
]

export const ROUTES_GRAPH = {
  'Railway Station': { 'Tower Chowk': { time: 8, congestion: 72, via: 'Station Road' }, 'Bhairavgarh': { time: 15, congestion: 55, via: 'NH-52' }, 'Parking Zone A': { time: 20, congestion: 70, via: 'Ring Road' } },
  'Tower Chowk': { 'Freeganj Area': { time: 6, congestion: 45, via: 'Freeganj Road' }, 'Mahakaleshwar Temple': { time: 10, congestion: 95, via: 'Mahakal Marg' }, 'Gate 2': { time: 12, congestion: 41, via: 'Dewas Road' } },
  'Bhairavgarh': { 'Mela Ground North': { time: 18, congestion: 88, via: 'Shipra Bridge' }, 'Triveni Ghat': { time: 22, congestion: 67, via: 'River Road' } },
  'Nanakheda Bus Stand': { 'Gate 1': { time: 10, congestion: 82, via: 'Main Road' }, 'Mahakaleshwar Temple': { time: 15, congestion: 95, via: 'Mahakal Road' } },
  'Parking Zone B': { 'Triveni Ghat': { time: 12, congestion: 67, via: 'Shipra Road' }, 'Ram Ghat': { time: 20, congestion: 92, via: 'Mela Road' } },
  'Freeganj Area': { 'Ram Ghat': { time: 14, congestion: 92, via: 'Ghat Road' }, 'Triveni Ghat': { time: 10, congestion: 67, via: 'River Walk' } },
  'Parking Zone A': { 'Ram Ghat': { time: 8, congestion: 92, via: 'Ghat Path' }, 'Triveni Ghat': { time: 12, congestion: 67, via: 'Riverside Road' } },
}

export const PREDICTION_DATA = {
  '30min': [
    { zone: 'Ram Ghat', current: 92, predicted: 96, trend: 'up' },
    { zone: 'Mahakaleshwar Temple', current: 95, predicted: 88, trend: 'down' },
    { zone: 'Mela Ground North', current: 88, predicted: 93, trend: 'up' },
    { zone: 'Mangalnath Area', current: 85, predicted: 80, trend: 'down' },
    { zone: 'Mela Ground South', current: 76, predicted: 85, trend: 'up' },
  ],
  '1hr': [
    { zone: 'Ram Ghat', current: 92, predicted: 98, trend: 'up' },
    { zone: 'Mahakaleshwar Temple', current: 95, predicted: 75, trend: 'down' },
    { zone: 'Mela Ground North', current: 88, predicted: 91, trend: 'up' },
    { zone: 'Triveni Ghat', current: 67, predicted: 80, trend: 'up' },
    { zone: 'Harsiddhi Temple', current: 78, predicted: 85, trend: 'up' },
  ],
  '3hr': [
    { zone: 'Ram Ghat', current: 92, predicted: 85, trend: 'down' },
    { zone: 'Triveni Ghat', current: 67, predicted: 88, trend: 'up' },
    { zone: 'Siddhawar Ghat', current: 38, predicted: 72, trend: 'up' },
    { zone: 'Mela Ground South', current: 76, predicted: 65, trend: 'down' },
    { zone: 'Gate 2', current: 41, predicted: 70, trend: 'up' },
  ],
}

export const HOURLY_FOOTFALL = [
  { hour: '6 AM', pilgrims: 15000, shuttles: 45 },
  { hour: '7 AM', pilgrims: 35000, shuttles: 80 },
  { hour: '8 AM', pilgrims: 80000, shuttles: 120 },
  { hour: '9 AM', pilgrims: 160000, shuttles: 180 },
  { hour: '10 AM', pilgrims: 300000, shuttles: 220 },
  { hour: '11 AM', pilgrims: 350000, shuttles: 250 },
  { hour: '12 PM', pilgrims: 310000, shuttles: 230 },
  { hour: '1 PM', pilgrims: 260000, shuttles: 200 },
  { hour: '2 PM', pilgrims: 220000, shuttles: 185 },
  { hour: '3 PM', pilgrims: 200000, shuttles: 175 },
  { hour: '4 PM', pilgrims: 240000, shuttles: 195 },
  { hour: '5 PM', pilgrims: 320000, shuttles: 240 },
  { hour: '6 PM', pilgrims: 290000, shuttles: 215 },
  { hour: 'Now', pilgrims: 258000, shuttles: 198 },
]

export const LIVE_STATS = {
  totalPilgrims: 2580000,
  activeSectors: 18,
  activeShuttles: 198,
  resolvedIncidents: 47,
  avgWaitTime: 12,
  criticalZones: 3,
}

export const AI_ADVISOR_PROMPTS = [
  { question: "Why are you routing through Bhairavgarh?", zone: "Bhairavgarh" },
  { question: "Is it safe to go to Ram Ghat now?", zone: "Ram Ghat" },
  { question: "What is the fastest route to Mahakaleshwar Temple?", zone: "Mahakaleshwar Temple" },
  { question: "Which parking lot should I use near Ujjain?", zone: null },
  { question: "When will Mahakaleshwar area congestion ease?", zone: "Mahakaleshwar Temple" },
]

export const INCIDENTS = [
  { id: 'I1', type: 'SOS', location: 'Ram Ghat Main Entrance', time: '2 min ago', severity: 'critical', description: 'Medical emergency near Ram Ghat bathing steps', status: 'active' },
  { id: 'I2', type: 'Crowd Surge', location: 'Mahakaleshwar Temple', time: '8 min ago', severity: 'high', description: 'Crowd density exceeded safe capacity at temple entry', status: 'responding' },
  { id: 'I3', type: 'Traffic Block', location: 'Nanakheda Bus Stand', time: '15 min ago', severity: 'moderate', description: 'Bus breakdown causing pedestrian bottleneck', status: 'resolved' },
  { id: 'I4', type: 'Missing Person', location: 'Triveni Ghat', time: '22 min ago', severity: 'moderate', description: 'Elderly pilgrim separated from group near Triveni', status: 'resolved' },
]
