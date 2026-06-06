'use client'
import { useState } from 'react'
import { AlertTriangle, CheckCircle, Clock, MapPin, Radio, Zap } from 'lucide-react'

const SEVERITY_STYLE = {
  critical: { badge: 'bg-red-500/20 text-red-400 border-red-500/30', icon: '🔴', glow: 'border-red-500/20' },
  high: { badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30', icon: '🟠', glow: 'border-orange-500/20' },
  moderate: { badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: '🟡', glow: '' },
}

const STATUS_STYLE = {
  active: 'text-red-400 bg-red-500/10 border-red-500/20',
  responding: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  resolved: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
}

export default function IncidentBoard({ incidents, setIncidents }) {
  const [broadcastMsg, setBroadcastMsg] = useState('')
  const [broadcasts, setBroadcasts] = useState([])
  const [filter, setFilter] = useState('all')

  const resolve = (id) => {
    setIncidents(prev => prev.map(i => i.id === id ? { ...i, status: 'resolved' } : i))
  }

  const respond = (id) => {
    setIncidents(prev => prev.map(i => i.id === id ? { ...i, status: 'responding' } : i))
  }

  const sendBroadcast = () => {
    if (!broadcastMsg.trim()) return
    setBroadcasts(prev => [{
      id: Date.now(),
      message: broadcastMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true,
    }, ...prev])
    setBroadcastMsg('')
  }

  const filtered = filter === 'all' ? incidents : incidents.filter(i => i.status === filter)

  const activeCount = incidents.filter(i => i.status === 'active').length
  const resolvedCount = incidents.filter(i => i.status === 'resolved').length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Incident List */}
      <div className="lg:col-span-2 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">🚨 Incident Command Board</h2>
            <p className="text-sm text-gray-400 mt-1">Live incidents and crowd management alerts</p>
          </div>
          <div className="flex gap-3 text-sm">
            <span className="text-red-400">{activeCount} Active</span>
            <span className="text-emerald-400">{resolvedCount} Resolved</span>
          </div>
        </div>

        {/* Filter */}
        <div className="glass-card rounded-xl p-1 flex gap-1 w-fit">
          {['all', 'active', 'responding', 'resolved'].map(f => (
            <button
              key={f}
              id={`incident-filter-${f}`}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                filter === f
                  ? 'bg-gradient-to-r from-sf-gold to-sf-saffron text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Incidents */}
        <div className="space-y-3">
          {filtered.map(incident => {
            const style = SEVERITY_STYLE[incident.severity] || SEVERITY_STYLE.moderate
            return (
              <div
                key={incident.id}
                className={`glass-card rounded-2xl p-5 border transition-all ${
                  incident.status === 'active' ? 'border-red-500/30' : 'border-sf-border'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">{style.icon}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${style.badge}`}>
                        {incident.type}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${STATUS_STYLE[incident.status]}`}>
                        {incident.status}
                      </span>
                    </div>
                    <p className="text-white font-medium text-sm mb-1">{incident.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><MapPin size={10} />{incident.location}</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{incident.time}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  {incident.status !== 'resolved' && (
                    <div className="flex flex-col gap-2">
                      {incident.status === 'active' && (
                        <button
                          id={`btn-respond-${incident.id}`}
                          onClick={() => respond(incident.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 transition-all whitespace-nowrap"
                        >
                          🚁 Dispatch
                        </button>
                      )}
                      <button
                        id={`btn-resolve-${incident.id}`}
                        onClick={() => resolve(incident.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-all whitespace-nowrap"
                      >
                        ✅ Resolve
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Broadcast Terminal */}
      <div className="space-y-4">
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Radio className="text-sf-gold" size={18} />
            <h3 className="font-semibold text-white">Broadcast Terminal</h3>
          </div>
          <p className="text-xs text-gray-400 mb-4">Send emergency alerts to all pilgrim displays and announcement systems across 18 zones instantly.</p>

          {/* Preset Messages */}
          <div className="space-y-2 mb-4">
            {[
              '⚠️ Sangam Sector at capacity. Use Gate 2 / Gate 3.',
              '🚌 Gold Line shuttles every 2 min from Zone B.',
              '✅ Gate 1 is now reopened. Flow resuming normally.',
              '🌊 Bathing muhurta begins in 30 minutes at Triveni.',
            ].map((msg, i) => (
              <button
                key={i}
                onClick={() => setBroadcastMsg(msg)}
                className="w-full text-left glass-card rounded-lg px-3 py-2 text-xs text-gray-300 hover:text-white hover:border-sf-gold/20 transition-all"
              >
                {msg}
              </button>
            ))}
          </div>

          <textarea
            id="broadcast-input"
            value={broadcastMsg}
            onChange={e => setBroadcastMsg(e.target.value)}
            placeholder="Type custom broadcast message..."
            className="w-full bg-sf-surface border border-sf-border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-sf-gold focus:outline-none transition-colors resize-none"
            rows={3}
          />

          <button
            id="btn-broadcast"
            onClick={sendBroadcast}
            disabled={!broadcastMsg.trim()}
            className="btn-primary w-full mt-3 py-3 rounded-xl font-semibold text-black disabled:opacity-40 flex items-center justify-center gap-2"
          >
            <Zap size={16} />
            Broadcast to All Zones
          </button>

          {/* Sent Broadcasts */}
          {broadcasts.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-gray-500 font-medium">SENT BROADCASTS</p>
              {broadcasts.map(b => (
                <div key={b.id} className="bg-sf-surface rounded-xl p-3">
                  <p className="text-xs text-white">{b.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle size={10} className="text-sf-emerald" />
                    <span className="text-xs text-gray-500">Delivered to 18 zones at {b.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-semibold text-white text-sm mb-3">Incident Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Active', value: activeCount, color: 'text-red-400' },
              { label: 'Responding', value: incidents.filter(i=>i.status==='responding').length, color: 'text-orange-400' },
              { label: 'Resolved', value: resolvedCount, color: 'text-emerald-400' },
              { label: 'Total', value: incidents.length, color: 'text-sf-gold' },
            ].map(s => (
              <div key={s.label} className="bg-sf-surface rounded-xl p-3 text-center">
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
