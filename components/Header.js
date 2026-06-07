'use client'
import { useState, useEffect } from 'react'

export default function Header({ view, setView, criticalZones }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' })
    setTime(fmt())
    const t = setInterval(() => setTime(fmt()), 60000)
    return () => clearInterval(t)
  }, [])

  return (
    <header className="glass-panel border-b border-sf-border sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sf-gold to-sf-saffron flex items-center justify-center text-xl glow-gold">
              🔮
            </div>
            <div>
              <h1 className="text-lg font-bold gradient-text leading-none">SmartFlow AI</h1>
              <p className="text-xs text-gray-400 leading-none mt-0.5">Mahakumbh 2028 Mobility Intelligence</p>
            </div>
          </div>

          {/* Center: Live Status */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-lg">
              <span className="status-dot red"></span>
              <span className="text-xs text-gray-300">{criticalZones} Critical Zones</span>
            </div>
            <div className="flex items-center gap-2 glass-card px-3 py-1.5 rounded-lg">
              <div className="w-2 h-2 rounded-full bg-sf-emerald animate-pulse"></div>
              <span className="text-xs text-gray-300">LIVE · Prayagraj IST {time}</span>
            </div>
          </div>

          {/* Right: View Toggle */}
          <div className="flex items-center gap-2">
            <div className="glass-card rounded-lg p-1 flex gap-1">
              <button
                id="btn-dashboard-view"
                onClick={() => setView('dashboard')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  view === 'dashboard'
                    ? 'bg-gradient-to-r from-sf-gold to-sf-saffron text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                🖥️ Command Center
              </button>
              <button
                id="btn-pilgrim-view"
                onClick={() => setView('pilgrim')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  view === 'pilgrim'
                    ? 'bg-gradient-to-r from-sf-gold to-sf-saffron text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                📱 Pilgrim App
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
