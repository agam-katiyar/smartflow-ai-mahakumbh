'use client'
import { useState } from 'react'
import { Car, MapPin, Clock, Bus, ArrowRight, Star } from 'lucide-react'
import { PARKING_ZONES } from '@/lib/data'

function OccupancyBar({ occupied, capacity, status }) {
  const pct = Math.round((occupied / capacity) * 100)
  const color = pct >= 85 ? '#FF3B30' : pct >= 60 ? '#FF6B00' : '#05C77E'
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{occupied.toLocaleString()} occupied</span>
        <span className="font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-2 bg-sf-border rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{(capacity - occupied).toLocaleString()} spaces free</span>
        <span>Cap: {capacity.toLocaleString()}</span>
      </div>
    </div>
  )
}

const statusStyle = {
  normal: { badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: '✅ Available' },
  moderate: { badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: '⚡ Filling Fast' },
  high: { badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30', label: '⚠️ Almost Full' },
  critical: { badge: 'bg-red-500/20 text-red-400 border-red-500/30', label: '🔴 Full' },
}

export default function ParkingOptimizer({ zones }) {
  const [selected, setSelected] = useState(null)

  // Enrich parking with live zone data
  const enrichedParking = PARKING_ZONES.map(p => {
    const zone = zones.find(z => z.name.toLowerCase().includes('parking'))
    const liveOccupied = Math.round(p.occupied * (1 + (Math.random() - 0.5) * 0.05))
    const pct = Math.round((liveOccupied / p.capacity) * 100)
    let status = 'normal'
    if (pct >= 90) status = 'critical'
    else if (pct >= 75) status = 'high'
    else if (pct >= 55) status = 'moderate'
    return { ...p, occupied: liveOccupied, status }
  })

  const recommended = enrichedParking.reduce((best, p) =>
    (p.occupied / p.capacity) < (best.occupied / best.capacity) ? p : best
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Smart Parking Optimizer</h2>
          <p className="text-sm text-gray-400 mt-1">AI-recommended parking with real-time occupancy and shuttle access</p>
        </div>
        <div className="glass-card px-4 py-2 rounded-xl text-sm">
          <span className="text-gray-400">Best Available: </span>
          <span className="text-sf-emerald font-semibold">{recommended.name}</span>
        </div>
      </div>

      {/* Parking Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {enrichedParking.map(parking => {
          const pct = Math.round((parking.occupied / parking.capacity) * 100)
          const isRecommended = parking.id === recommended.id
          const style = statusStyle[parking.status]
          return (
            <div
              key={parking.id}
              id={`parking-${parking.id}`}
              onClick={() => setSelected(selected?.id === parking.id ? null : parking)}
              className={`glass-card rounded-2xl p-5 cursor-pointer transition-all card-hover ${
                isRecommended ? 'border border-sf-emerald/40 glow-emerald' : ''
              } ${selected?.id === parking.id ? 'border border-sf-gold/40' : ''}`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${style.badge}`}>
                  {style.label}
                </span>
                {isRecommended && (
                  <span className="flex items-center gap-1 text-xs text-sf-gold">
                    <Star size={12} fill="currentColor" /> Best
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-white mb-1">{parking.name}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                <MapPin size={10} /> {parking.location}
              </div>

              {/* Occupancy */}
              <OccupancyBar occupied={parking.occupied} capacity={parking.capacity} status={parking.status} />

              {/* Details */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-sf-surface rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">Walking</p>
                  <p className="text-sm font-bold text-sf-gold mt-0.5">
                    <Clock size={10} className="inline mr-1" />
                    {parking.walking}
                  </p>
                </div>
                <div className="bg-sf-surface rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-500">Shuttle</p>
                  <p className="text-sm font-bold text-sf-blue mt-0.5">
                    <Bus size={10} className="inline mr-1" />
                    {parking.shuttleFreq}
                  </p>
                </div>
              </div>

              {isRecommended && (
                <button className="btn-primary w-full mt-4 py-2 rounded-xl text-xs font-bold text-black">
                  Navigate Here
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Selected Detail Panel */}
      {selected && (
        <div className="glass-card rounded-2xl p-6 border border-sf-gold/20 animate-slide-up">
          <h3 className="font-semibold text-sf-gold mb-4">📍 {selected.name} — Detailed View</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-sf-surface rounded-xl p-4 text-center">
              <Car className="mx-auto text-sf-gold mb-2" size={24} />
              <p className="text-2xl font-bold text-white">{(selected.capacity - selected.occupied).toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Free Spaces</p>
            </div>
            <div className="bg-sf-surface rounded-xl p-4 text-center">
              <Clock className="mx-auto text-sf-blue mb-2" size={24} />
              <p className="text-2xl font-bold text-white">{selected.walking}</p>
              <p className="text-xs text-gray-400 mt-1">Walking to Ghat</p>
            </div>
            <div className="bg-sf-surface rounded-xl p-4 text-center">
              <Bus className="mx-auto text-sf-emerald mb-2" size={24} />
              <p className="text-2xl font-bold text-white">{selected.shuttleFreq}</p>
              <p className="text-xs text-gray-400 mt-1">Shuttle Frequency</p>
            </div>
            <div className="bg-sf-surface rounded-xl p-4 text-center">
              <MapPin className="mx-auto text-sf-purple mb-2" size={24} />
              <p className="text-lg font-bold text-white">{selected.location}</p>
              <p className="text-xs text-gray-400 mt-1">Nearest Area</p>
            </div>
          </div>

          {/* AI Recommendation */}
          <div className="ai-bubble mt-4 p-4 rounded-xl">
            <p className="text-xs font-semibold text-sf-purple mb-1">🤖 AI Parking Advisor</p>
            <p className="text-sm text-gray-300">
              {selected.id === recommended.id
                ? `${selected.name} is currently the best choice with ${Math.round((1 - selected.occupied/selected.capacity)*100)}% capacity remaining. Shuttles run every ${selected.shuttleFreq}, minimizing your walk to the ghat. Recommend arriving within the next 45 minutes before occupancy increases.`
                : `${selected.name} is ${Math.round(selected.occupied/selected.capacity*100)}% full. Consider ${recommended.name} instead — it has ${Math.round((1 - recommended.occupied/recommended.capacity)*100)}% free capacity and shuttles every ${recommended.shuttleFreq}.`
              }
            </p>
          </div>
        </div>
      )}

      {/* Parking Tips */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-4">💡 Smart Parking Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '⏰', tip: 'Peak Hours', desc: 'Avoid 9 AM–11 AM and 4 PM–6 PM. Parking fills 40% faster during these windows.' },
            { icon: '🚌', tip: 'Use Shuttles', desc: 'Park at Zone B or D and take the shuttle. Saves 20+ minutes vs driving to Zone A.' },
            { icon: '📱', tip: 'Pre-book Slot', desc: 'Zone B has 30-minute slot reservations. Reduces uncertainty for families with elderly.' },
          ].map(t => (
            <div key={t.tip} className="bg-sf-surface rounded-xl p-4">
              <p className="text-2xl mb-2">{t.icon}</p>
              <p className="font-medium text-white text-sm">{t.tip}</p>
              <p className="text-xs text-gray-400 mt-1">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
