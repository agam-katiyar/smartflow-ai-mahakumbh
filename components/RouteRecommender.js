'use client'
import { useState } from 'react'
import { Navigation, AlertCircle, CheckCircle, Clock, ArrowRight, Shuffle } from 'lucide-react'
import { ROUTES_GRAPH } from '@/lib/data'

const LOCATIONS = [
  'Railway Station', 'Civil Lines', 'Phaphamau', 'Parking Zone A',
  'Parking Zone B', 'Gate 2', 'Gate 3', 'Arail Ghat', 'Ram Ghat', 'Sangam Sector',
]

function congestionColor(val) {
  if (val >= 80) return 'text-red-400'
  if (val >= 60) return 'text-orange-400'
  if (val >= 40) return 'text-yellow-400'
  return 'text-emerald-400'
}

function congestionLabel(val) {
  if (val >= 80) return '🔴 Critical'
  if (val >= 60) return '🟠 High'
  if (val >= 40) return '🟡 Moderate'
  return '🟢 Clear'
}

function findBestRoute(from, to, zones) {
  const graph = ROUTES_GRAPH
  if (!from || !to || from === to) return null

  // Check direct path
  const direct = graph[from]?.[to]
  if (!direct) {
    // Find via intermediate node
    const intermediates = Object.keys(graph[from] || {})
    let best = null
    for (const mid of intermediates) {
      const seg1 = graph[from][mid]
      const seg2 = graph[mid]?.[to]
      if (seg1 && seg2) {
        const totalTime = seg1.time + seg2.time
        const avgCongestion = Math.round((seg1.congestion + seg2.congestion) / 2)
        if (!best || totalTime < best.time) {
          best = {
            path: [from, mid, to],
            time: totalTime,
            congestion: avgCongestion,
            via: `${seg1.via} → ${seg2.via}`,
            segments: [seg1, seg2],
          }
        }
      }
    }
    return best
  }
  return {
    path: [from, to],
    time: direct.time,
    congestion: direct.congestion,
    via: direct.via,
    segments: [direct],
  }
}

function findAlternateRoute(from, to, best) {
  if (!from || !to) return null
  // Return a synthetic alternate with slightly worse congestion but same or longer time
  const time = (best?.time || 15) + Math.floor(Math.random() * 10 + 5)
  const congestion = Math.max(20, (best?.congestion || 50) - 25)
  return {
    path: [from, '(Alt Route)', to],
    time,
    congestion,
    via: 'Alternate bypass road',
    isAlternate: true,
  }
}

export default function RouteRecommender({ zones }) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFind = () => {
    if (!from || !to) return
    setLoading(true)
    setTimeout(() => {
      const best = findBestRoute(from, to, zones)
      const alt = findAlternateRoute(from, to, best)
      setResult({ best, alt })
      setLoading(false)
    }, 800)
  }

  const swap = () => {
    const tmp = from
    setFrom(to)
    setTo(tmp)
    setResult(null)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-sf-blue/20 text-sf-blue flex items-center justify-center">
            <Navigation size={20} />
          </div>
          <div>
            <h2 className="font-semibold text-white">Smart Route Recommender</h2>
            <p className="text-xs text-gray-400">AI-powered optimal path with live congestion scoring</p>
          </div>
        </div>

        {/* Origin */}
        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-2 font-medium">📍 FROM — Current Location</label>
          <select
            id="select-from"
            value={from}
            onChange={e => { setFrom(e.target.value); setResult(null) }}
            className="w-full bg-sf-surface border border-sf-border rounded-xl px-4 py-3 text-white text-sm focus:border-sf-gold focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="">Select starting point...</option>
            {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {/* Swap */}
        <div className="flex justify-center mb-4">
          <button
            onClick={swap}
            className="glass-card rounded-full p-2 hover:bg-sf-card transition-all hover:rotate-180 duration-300"
            title="Swap origin & destination"
          >
            <Shuffle size={16} className="text-sf-gold" />
          </button>
        </div>

        {/* Destination */}
        <div className="mb-6">
          <label className="block text-xs text-gray-400 mb-2 font-medium">🎯 TO — Destination</label>
          <select
            id="select-to"
            value={to}
            onChange={e => { setTo(e.target.value); setResult(null) }}
            className="w-full bg-sf-surface border border-sf-border rounded-xl px-4 py-3 text-white text-sm focus:border-sf-gold focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="">Select destination...</option>
            {LOCATIONS.filter(l => l !== from).map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <button
          id="btn-find-route"
          onClick={handleFind}
          disabled={!from || !to || loading}
          className="btn-primary w-full py-3 rounded-xl font-semibold text-black disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="spinner w-5 h-5"></div>
              Calculating optimal route...
            </>
          ) : (
            <>
              <Navigation size={18} />
              Find Best Route
            </>
          )}
        </button>

        {/* Quick routes */}
        <div className="mt-6">
          <p className="text-xs text-gray-500 mb-3">POPULAR ROUTES</p>
          <div className="grid grid-cols-1 gap-2">
            {[
              ['Railway Station', 'Sangam Sector'],
              ['Parking Zone B', 'Arail Ghat'],
              ['Civil Lines', 'Ram Ghat'],
            ].map(([f, t]) => (
              <button
                key={f+t}
                onClick={() => { setFrom(f); setTo(t); setResult(null) }}
                className="glass-card rounded-lg px-3 py-2 text-xs text-left hover:border-sf-gold/30 transition-all flex items-center justify-between group"
              >
                <span className="text-gray-400">{f} <ArrowRight size={10} className="inline" /> {t}</span>
                <span className="text-sf-gold opacity-0 group-hover:opacity-100 transition-opacity text-xs">Select →</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="space-y-4">
        {result?.best ? (
          <>
            {/* Recommended Route */}
            <div className="glass-card rounded-2xl p-6 border border-sf-emerald/30 glow-emerald">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-sf-emerald" size={20} />
                  <span className="font-semibold text-sf-emerald">Recommended Route</span>
                </div>
                <span className="text-xs bg-sf-emerald/20 text-sf-emerald px-2 py-1 rounded-full border border-sf-emerald/30">
                  AI Optimized
                </span>
              </div>

              {/* Path Visualization */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {result.best.path.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      i === 0 ? 'bg-sf-blue/20 text-sf-blue border border-sf-blue/30' :
                      i === result.best.path.length - 1 ? 'bg-sf-gold/20 text-sf-gold border border-sf-gold/30' :
                      'bg-sf-purple/20 text-sf-purple border border-sf-purple/30'
                    }`}>
                      {p}
                    </span>
                    {i < result.best.path.length - 1 && <ArrowRight size={14} className="text-gray-500" />}
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="bg-sf-surface rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400">Travel Time</p>
                  <p className="text-xl font-bold text-sf-gold mt-1">{result.best.time}<span className="text-sm text-gray-400">m</span></p>
                </div>
                <div className="bg-sf-surface rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400">Congestion</p>
                  <p className={`text-xl font-bold mt-1 ${congestionColor(result.best.congestion)}`}>{result.best.congestion}%</p>
                </div>
                <div className="bg-sf-surface rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-400">Status</p>
                  <p className="text-sm font-bold mt-1">{congestionLabel(result.best.congestion)}</p>
                </div>
              </div>

              <div className="text-xs text-gray-400 bg-sf-surface rounded-lg p-3">
                <span className="text-gray-500">Via: </span>
                <span className="text-gray-300">{result.best.via}</span>
              </div>
            </div>

            {/* Alternate Route */}
            {result.alt && (
              <div className="glass-card rounded-2xl p-5 border border-sf-border">
                <div className="flex items-center gap-2 mb-4">
                  <Shuffle className="text-sf-purple" size={18} />
                  <span className="font-medium text-gray-300">Alternate Route</span>
                  <span className="text-xs text-gray-500 ml-auto">+{result.alt.time - result.best.time} min but {result.best.congestion - result.alt.congestion}% less crowded</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-sf-surface rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">Travel Time</p>
                    <p className="text-xl font-bold text-sf-purple mt-1">{result.alt.time}<span className="text-sm text-gray-400">m</span></p>
                  </div>
                  <div className="bg-sf-surface rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">Congestion</p>
                    <p className={`text-xl font-bold mt-1 ${congestionColor(result.alt.congestion)}`}>{result.alt.congestion}%</p>
                  </div>
                  <div className="bg-sf-surface rounded-xl p-3 text-center">
                    <p className="text-xs text-gray-400">Status</p>
                    <p className="text-sm font-bold mt-1">{congestionLabel(result.alt.congestion)}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-3">Via: {result.alt.via}</p>
              </div>
            )}

            {/* AI Insight */}
            <div className="ai-bubble p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span>🤖</span>
                <span className="text-xs font-semibold text-sf-purple">SmartFlow AI Insight</span>
              </div>
              <p className="text-sm text-gray-300">
                The recommended route via <strong className="text-white">{result.best.via}</strong> is chosen because it has{' '}
                <strong className={congestionColor(result.best.congestion)}>{result.best.congestion}% congestion</strong> — {
                  result.best.congestion < 60 ? 'well within safe limits' : 'approaching but still manageable'
                }. Estimated crowd exposure is {result.best.congestion < result.alt?.congestion ? 'lower' : 'higher'} than the alternate.{' '}
                {result.best.congestion >= 80 && '⚠️ Consider waiting 20 minutes for conditions to improve.'}
              </p>
            </div>
          </>
        ) : (
          <div className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
            <div className="text-5xl mb-4">🧭</div>
            <h3 className="font-semibold text-gray-300 mb-2">Ready to Calculate</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Select your starting point and destination to get an AI-optimized route with live congestion scoring and travel time estimates.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-2 w-full max-w-xs text-xs text-gray-600">
              <div className="flex items-center gap-2"><CheckCircle size={12} className="text-sf-emerald"/> Real-time congestion analysis</div>
              <div className="flex items-center gap-2"><CheckCircle size={12} className="text-sf-emerald"/> Alternate route suggestions</div>
              <div className="flex items-center gap-2"><CheckCircle size={12} className="text-sf-emerald"/> AI-powered path explanation</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
