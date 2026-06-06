// Mock data for Mahakumbh 2028 - All 18 zones + real Prayagraj locations

export const MAHAKUMBH_ZONES = [
  { id: 'Z1', name: 'Sangam Sector', lat: 25.4358, lng: 81.8862, density: 92, capacity: 50000, status: 'critical', sector: 'Triveni' },
  { id: 'Z2', name: 'Arail Ghat', lat: 25.4220, lng: 81.8950, density: 67, capacity: 35000, status: 'moderate', sector: 'Arail' },
  { id: 'Z3', name: 'Ram Ghat', lat: 25.4480, lng: 81.8720, density: 45, capacity: 30000, status: 'normal', sector: 'Civil Lines' },
  { id: 'Z4', name: 'Jhunsi Sector', lat: 25.4530, lng: 81.9100, density: 78, capacity: 40000, status: 'high', sector: 'Jhunsi' },
  { id: 'Z5', name: 'Naini Bridge', lat: 25.4020, lng: 81.8790, density: 85, capacity: 20000, status: 'critical', sector: 'Naini' },
  { id: 'Z6', name: 'Civil Lines', lat: 25.4680, lng: 81.8420, density: 38, capacity: 25000, status: 'normal', sector: 'Civil Lines' },
  { id: 'Z7', name: 'Phaphamau', lat: 25.5120, lng: 81.8920, density: 55, capacity: 35000, status: 'moderate', sector: 'Phaphamau' },
  { id: 'Z8', name: 'Zero Road', lat: 25.4380, lng: 81.8480, density: 72, capacity: 18000, status: 'high', sector: 'Central' },
  { id: 'Z9', name: 'Banda Road', lat: 25.4200, lng: 81.8320, density: 30, capacity: 22000, status: 'normal', sector: 'South' },
  { id: 'Z10', name: 'Mela Ground North', lat: 25.4450, lng: 81.9050, density: 88, capacity: 60000, status: 'critical', sector: 'Mela' },
  { id: 'Z11', name: 'Mela Ground South', lat: 25.4290, lng: 81.9020, density: 76, capacity: 55000, status: 'high', sector: 'Mela' },
  { id: 'Z12', name: 'Kumbh Mela Gate 1', lat: 25.4410, lng: 81.8650, density: 95, capacity: 15000, status: 'critical', sector: 'Entry' },
  { id: 'Z13', name: 'Kumbh Mela Gate 2', lat: 25.4320, lng: 81.8700, density: 41, capacity: 15000, status: 'normal', sector: 'Entry' },
  { id: 'Z14', name: 'Kumbh Mela Gate 3', lat: 25.4550, lng: 81.8800, density: 63, capacity: 15000, status: 'moderate', sector: 'Entry' },
  { id: 'Z15', name: 'Parking Zone A', lat: 25.4600, lng: 81.8560, density: 82, capacity: 8000, status: 'high', sector: 'Parking' },
  { id: 'Z16', name: 'Parking Zone B', lat: 25.4150, lng: 81.8900, density: 35, capacity: 10000, status: 'normal', sector: 'Parking' },
  { id: 'Z17', name: 'Parking Zone C', lat: 25.4700, lng: 81.9100, density: 58, capacity: 12000, status: 'moderate', sector: 'Parking' },
  { id: 'Z18', name: 'Railway Station', lat: 25.4585, lng: 81.8347, density: 70, capacity: 20000, status: 'high', sector: 'Transport Hub' },
]

export const PARKING_ZONES = [
  { id: 'P1', name: 'Sector A Parking', location: 'Near Gate 1', capacity: 8000, occupied: 7360, walking: '8 min', shuttleFreq: '5 min', lat: 25.4600, lng: 81.8560, status: 'high' },
  { id: 'P2', name: 'Sector B Parking', location: 'Arail Road', capacity: 10000, occupied: 3500, walking: '12 min', shuttleFreq: '3 min', lat: 25.4150, lng: 81.8900, status: 'normal' },
  { id: 'P3', name: 'Sector C Parking', location: 'Jhunsi Area', capacity: 12000, occupied: 6960, walking: '15 min', shuttleFreq: '7 min', lat: 25.4700, lng: 81.9100, status: 'moderate' },
  { id: 'P4', name: 'Railway Parking', location: 'Prayagraj Junction', capacity: 5000, occupied: 1500, walking: '20 min', shuttleFreq: '10 min', lat: 25.4620, lng: 81.8380, status: 'normal' },
]

export const SHUTTLE_ROUTES = [
  { id: 'S1', name: 'Saffron Line', from: 'Railway Station', to: 'Sangam Ghat', frequency: '5 min', capacity: 80, active: 12, color: '#FF6B00' },
  { id: 'S2', name: 'Gold Line', from: 'Parking Zone B', to: 'Arail Ghat', frequency: '3 min', capacity: 60, active: 18, color: '#E8A937' },
  { id: 'S3', name: 'Green Line', from: 'Civil Lines', to: 'Ram Ghat', frequency: '7 min', capacity: 80, active: 8, color: '#05C77E' },
  { id: 'S4', name: 'Blue Line', from: 'Phaphamau', to: 'Mela Ground', frequency: '10 min', capacity: 100, active: 6, color: '#3B82F6' },
]

export const ROUTES_GRAPH = {
  'Railway Station': { 'Civil Lines': { time: 8, congestion: 38, via: 'MG Road' }, 'Phaphamau': { time: 15, congestion: 55, via: 'NH-19' }, 'Parking Zone A': { time: 20, congestion: 70, via: 'Stanley Road' } },
  'Civil Lines': { 'Zero Road': { time: 10, congestion: 72, via: 'Elgin Road' }, 'Ram Ghat': { time: 12, congestion: 45, via: 'Sarojini Naidu Road' }, 'Gate 2': { time: 14, congestion: 41, via: 'GT Road' } },
  'Phaphamau': { 'Jhunsi Sector': { time: 18, congestion: 78, via: 'Yamuna Bridge' }, 'Mela Ground North': { time: 22, congestion: 88, via: 'Ring Road' } },
  'Parking Zone A': { 'Gate 1': { time: 8, congestion: 95, via: 'Inner Road' }, 'Gate 3': { time: 12, congestion: 63, via: 'Outer Road' } },
  'Parking Zone B': { 'Arail Ghat': { time: 12, congestion: 67, via: 'Arail Road' }, 'Sangam Sector': { time: 25, congestion: 92, via: 'Mela Road' } },
  'Gate 2': { 'Arail Ghat': { time: 8, congestion: 67, via: 'Mela Bypass' }, 'Sangam Sector': { time: 15, congestion: 92, via: 'Main Rd' } },
  'Gate 3': { 'Sangam Sector': { time: 18, congestion: 92, via: 'Triveni Path' }, 'Ram Ghat': { time: 10, congestion: 45, via: 'Ghat Road' } },
  'Arail Ghat': { 'Sangam Sector': { time: 20, congestion: 92, via: 'River Walk' } },
}

export const PREDICTION_DATA = {
  '30min': [
    { zone: 'Sangam Sector', current: 92, predicted: 96, trend: 'up' },
    { zone: 'Gate 1', current: 95, predicted: 88, trend: 'down' },
    { zone: 'Mela Ground North', current: 88, predicted: 93, trend: 'up' },
    { zone: 'Naini Bridge', current: 85, predicted: 80, trend: 'down' },
    { zone: 'Jhunsi Sector', current: 78, predicted: 85, trend: 'up' },
  ],
  '1hr': [
    { zone: 'Sangam Sector', current: 92, predicted: 98, trend: 'up' },
    { zone: 'Gate 1', current: 95, predicted: 75, trend: 'down' },
    { zone: 'Mela Ground North', current: 88, predicted: 91, trend: 'up' },
    { zone: 'Ram Ghat', current: 45, predicted: 65, trend: 'up' },
    { zone: 'Arail Ghat', current: 67, predicted: 72, trend: 'up' },
  ],
  '3hr': [
    { zone: 'Sangam Sector', current: 92, predicted: 85, trend: 'down' },
    { zone: 'Arail Ghat', current: 67, predicted: 88, trend: 'up' },
    { zone: 'Ram Ghat', current: 45, predicted: 78, trend: 'up' },
    { zone: 'Mela Ground South', current: 76, predicted: 65, trend: 'down' },
    { zone: 'Gate 2', current: 41, predicted: 70, trend: 'up' },
  ],
}

export const HOURLY_FOOTFALL = [
  { hour: '6 AM', pilgrims: 12000, shuttles: 45 },
  { hour: '7 AM', pilgrims: 28000, shuttles: 80 },
  { hour: '8 AM', pilgrims: 67000, shuttles: 120 },
  { hour: '9 AM', pilgrims: 145000, shuttles: 180 },
  { hour: '10 AM', pilgrims: 280000, shuttles: 220 },
  { hour: '11 AM', pilgrims: 320000, shuttles: 250 },
  { hour: '12 PM', pilgrims: 290000, shuttles: 230 },
  { hour: '1 PM', pilgrims: 240000, shuttles: 200 },
  { hour: '2 PM', pilgrims: 210000, shuttles: 185 },
  { hour: '3 PM', pilgrims: 195000, shuttles: 175 },
  { hour: '4 PM', pilgrims: 225000, shuttles: 195 },
  { hour: '5 PM', pilgrims: 310000, shuttles: 240 },
  { hour: '6 PM', pilgrims: 280000, shuttles: 215 },
  { hour: 'Now', pilgrims: 248000, shuttles: 198 },
]

export const LIVE_STATS = {
  totalPilgrims: 2480000,
  activeSectors: 18,
  activeShuttles: 198,
  resolvedIncidents: 47,
  avgWaitTime: 12,
  criticalZones: 3,
}

export const AI_ADVISOR_PROMPTS = [
  { question: "Why are you routing through Zone 7?", zone: "Phaphamau" },
  { question: "Is it safe to go to Sangam Ghat now?", zone: "Sangam Sector" },
  { question: "What's the fastest route to Ram Ghat?", zone: "Ram Ghat" },
  { question: "Which parking lot should I use?", zone: null },
  { question: "When will Gate 1 congestion ease?", zone: "Gate 1" },
]

export const INCIDENTS = [
  { id: 'I1', type: 'SOS', location: 'Zone 12 - Gate 1', time: '2 min ago', severity: 'critical', description: 'Medical emergency near Gate 1 entrance', status: 'active' },
  { id: 'I2', type: 'Crowd Surge', location: 'Sangam Sector', time: '8 min ago', severity: 'high', description: 'Crowd density exceeded safe capacity', status: 'responding' },
  { id: 'I3', type: 'Traffic Block', location: 'Naini Bridge', time: '15 min ago', severity: 'moderate', description: 'Vehicle breakdown causing pedestrian bottleneck', status: 'resolved' },
  { id: 'I4', type: 'Missing Person', location: 'Ram Ghat', time: '22 min ago', severity: 'moderate', description: 'Elderly pilgrim separated from group', status: 'resolved' },
]
