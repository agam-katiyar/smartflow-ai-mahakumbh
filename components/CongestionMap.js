'use client'
import { useEffect, useRef, useState } from 'react'
import { SHUTTLE_ROUTES } from '@/lib/data'

const DENSITY_COLORS = {
  critical: { bg: '#FF3B30', light: 'rgba(255,59,48,0.3)', label: 'CRITICAL' },
  high: { bg: '#FF6B00', light: 'rgba(255,107,0,0.3)', label: 'HIGH' },
  moderate: { bg: '#F59E0B', light: 'rgba(245,158,11,0.3)', label: 'MODERATE' },
  normal: { bg: '#05C77E', light: 'rgba(5,199,126,0.3)', label: 'NORMAL' },
}

const statusBg = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  moderate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  normal: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
}

function DensityBar({ density, status }) {
  const color = DENSITY_COLORS[status]?.bg || '#05C77E'
  return (
    <div className="relative w-full h-2 bg-sf-border rounded-full overflow-hidden">
      <div
        className="h-full rounded-full density-bar transition-all duration-1000"
        style={{ width: `${density}%`, background: color }}
      />
    </div>
  )
}

export default function CongestionMap({ zones }) {
  const canvasRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [hoveredZone, setHoveredZone] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [useLeaflet, setUseLeaflet] = useState(false)

  // Try to load Leaflet (client only)
  useEffect(() => {
    setMapLoaded(true)
  }, [])

  const criticalZones = zones.filter(z => z.status === 'critical')
  const highZones = zones.filter(z => z.status === 'high')
  const normalZones = zones.filter(z => z.status === 'normal')

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Map Panel */}
      <div className="xl:col-span-2 glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-sf-border flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-white">Live Congestion Heatmap</h2>
            <p className="text-xs text-gray-400 mt-0.5">18 monitoring zones · Real-time density updates every 4s</p>
          </div>
          <div className="flex gap-2 text-xs">
            {Object.entries(DENSITY_COLORS).map(([key, val]) => (
              <span key={key} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: val.bg }}></span>
                <span className="text-gray-400 capitalize">{key}</span>
              </span>
            ))}
          </div>
        </div>

        {/* SVG Map of Prayagraj Zones */}
        <div className="relative bg-[#0D0D1A] min-h-[420px] p-4">
          <svg viewBox="0 0 800 500" className="w-full h-full" style={{ minHeight: 380 }}>
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(42,42,62,0.4)" strokeWidth="0.5"/>
              </pattern>
              <radialGradient id="glowRed" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF3B30" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#FF3B30" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="glowOrange" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#FF6B00" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="glowGreen" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#05C77E" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#05C77E" stopOpacity="0"/>
              </radialGradient>
              <filter id="blur">
                <feGaussianBlur stdDeviation="4"/>
              </filter>
            </defs>
            <rect width="800" height="500" fill="url(#grid)"/>

            {/* Yamuna/Ganga river representation */}
            <path d="M 0 320 Q 100 300 200 310 Q 350 290 450 280 Q 550 270 650 260 Q 750 250 800 240"
              fill="none" stroke="rgba(59,130,246,0.4)" strokeWidth="20" strokeLinecap="round"/>
            <path d="M 0 320 Q 100 300 200 310 Q 350 290 450 280 Q 550 270 650 260 Q 750 250 800 240"
              fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="35" strokeLinecap="round"/>
            <text x="350" y="295" fill="rgba(59,130,246,0.5)" fontSize="10" fontFamily="Outfit">Ganga-Yamuna Sangam</text>

            {/* Zone nodes mapped to approx screen coords */}
            {zones.map((zone, i) => {
              // Map lat/lng to SVG coords
              const svgX = ((zone.lng - 81.82) / 0.12) * 700 + 50
              const svgY = ((25.52 - zone.lat) / 0.12) * 440 + 30
              const radius = zone.status === 'critical' ? 22 : zone.status === 'high' ? 18 : 15
              const color = DENSITY_COLORS[zone.status]?.bg || '#05C77E'
              const isSelected = selected?.id === zone.id

              return (
                <g key={zone.id} onClick={() => setSelected(zone === selected ? null : zone)}
                  onMouseEnter={() => setHoveredZone(zone)} onMouseLeave={() => setHoveredZone(null)}
                  style={{ cursor: 'pointer' }}>
                  {/* Glow halo */}
                  <circle cx={svgX} cy={svgY} r={radius * 2.5} fill={color} opacity="0.12" filter="url(#blur)"
                    className={zone.status === 'critical' ? 'zone-critical' : ''}/>
                  {/* Pulse ring for critical */}
                  {zone.status === 'critical' && (
                    <circle cx={svgX} cy={svgY} r={radius * 1.8} fill="none" stroke={color} strokeWidth="1.5"
                      opacity="0.5" className="zone-critical"/>
                  )}
                  {/* Main circle */}
                  <circle cx={svgX} cy={svgY} r={radius} fill={color} opacity="0.85"
                    stroke={isSelected ? 'white' : 'transparent'} strokeWidth="2"/>
                  {/* Density text */}
                  <text x={svgX} y={svgY + 1} textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize={zone.status === 'critical' ? '9' : '8'} fontWeight="bold"
                    fontFamily="Outfit">{zone.density}%</text>
                  {/* Zone label */}
                  <text x={svgX} y={svgY + radius + 10} textAnchor="middle" fill="rgba(255,255,255,0.7)"
                    fontSize="7" fontFamily="Outfit">{zone.name.split(' ').slice(0,2).join(' ')}</text>
                </g>
              )
            })}

            {/* Shuttle route lines */}
            <line x1="350" y1="190" x2="470" y2="270" stroke="#FF6B00" strokeWidth="2"
              strokeDasharray="6 3" opacity="0.6" className="route-animated"/>
            <line x1="210" y1="210" x2="350" y2="260" stroke="#E8A937" strokeWidth="2"
              strokeDasharray="6 3" opacity="0.6" className="route-animated"/>
            <line x1="550" y1="160" x2="350" y2="260" stroke="#05C77E" strokeWidth="1.5"
              strokeDasharray="6 3" opacity="0.5"/>

            {/* Legend */}
            <g transform="translate(20, 440)">
              <text fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="Outfit">🔵 Rivers  🟠 Shuttle Routes  ● Zone Density</text>
            </g>
          </svg>

          {/* Hovered tooltip */}
          {hoveredZone && (
            <div className="absolute top-4 right-4 custom-tooltip z-10 min-w-[180px]">
              <p className="font-semibold text-white">{hoveredZone.name}</p>
              <p className="text-gray-400 mt-1">Density: <span className="text-sf-gold font-bold">{hoveredZone.density}%</span></p>
              <p className="text-gray-400">Capacity: {hoveredZone.capacity.toLocaleString()}</p>
              <p className="text-gray-400">Sector: {hoveredZone.sector}</p>
              <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs border font-medium ${statusBg[hoveredZone.status]}`}>
                {DENSITY_COLORS[hoveredZone.status]?.label}
              </span>
            </div>
          )}
        </div>

        {/* Shuttle Routes */}
        <div className="p-4 border-t border-sf-border">
          <p className="text-xs text-gray-400 mb-3 font-medium">ACTIVE SHUTTLE LINES</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SHUTTLE_ROUTES.map(route => (
              <div key={route.id} className="glass-card rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: route.color }}></div>
                  <span className="text-xs font-semibold" style={{ color: route.color }}>{route.name}</span>
                </div>
                <p className="text-xs text-gray-400">{route.from} → {route.to}</p>
                <div className="flex gap-2 mt-1 text-xs text-gray-500">
                  <span>🚌 {route.active} buses</span>
                  <span>⏱ {route.frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone List Panel */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-sf-border">
          <h2 className="font-semibold text-white">Zone Status Board</h2>
          <div className="flex gap-3 mt-2 text-xs">
            <span className="text-red-400">🔴 {criticalZones.length} Critical</span>
            <span className="text-orange-400">🟠 {highZones.length} High</span>
            <span className="text-emerald-400">🟢 {normalZones.length} Normal</span>
          </div>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: 560 }}>
          {zones
            .sort((a, b) => b.density - a.density)
            .map(zone => (
              <div
                key={zone.id}
                onClick={() => setSelected(zone === selected ? null : zone)}
                className={`p-3 border-b border-sf-border/50 cursor-pointer transition-all hover:bg-sf-card/50 ${
                  selected?.id === zone.id ? 'bg-sf-card' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="status-dot" style={{ background: DENSITY_COLORS[zone.status]?.bg }}></span>
                    <span className="text-sm font-medium text-white truncate max-w-[140px]">{zone.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${statusBg[zone.status]}`}>
                    {zone.density}%
                  </span>
                </div>
                <DensityBar density={zone.density} status={zone.status} />
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>{zone.sector}</span>
                  <span>{(zone.capacity * zone.density / 100).toLocaleString()} / {zone.capacity.toLocaleString()}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
