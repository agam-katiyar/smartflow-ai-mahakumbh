'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Header from '@/components/Header'
import StatsBar from '@/components/StatsBar'
import CongestionMap from '@/components/CongestionMap'
import RouteRecommender from '@/components/RouteRecommender'
import ParkingOptimizer from '@/components/ParkingOptimizer'
import AIAdvisor from '@/components/AIAdvisor'
import PredictionPanel from '@/components/PredictionPanel'
import IncidentBoard from '@/components/IncidentBoard'
import AlertTicker from '@/components/AlertTicker'
import { MAHAKUMBH_ZONES, LIVE_STATS, INCIDENTS } from '@/lib/data'

export default function Home() {
  const [activeTab, setActiveTab] = useState('map')
  const [zones, setZones] = useState(MAHAKUMBH_ZONES)
  const [stats, setStats] = useState(LIVE_STATS)
  const [incidents, setIncidents] = useState(INCIDENTS)
  const [alerts, setAlerts] = useState([
    '⚠️ CRITICAL: Sangam Sector at 92% capacity — use alternate routes',
    '🔴 Gate 1 temporarily closed for crowd management — use Gate 2 or Gate 3',
    '🚌 Gold Line shuttle frequency increased to 3 minutes due to high demand at Parking Zone B',
    '✅ Naini Bridge congestion reducing — down from 90% to 85%',
    '📢 Special bathing muhurta at 6 AM tomorrow — arrive early via Arail or Ram Ghat',
  ])
  const [view, setView] = useState('dashboard') // 'dashboard' | 'pilgrim'

  // Live simulation: update zone densities periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setZones(prev => prev.map(zone => {
        const delta = (Math.random() - 0.48) * 3
        const newDensity = Math.max(10, Math.min(100, zone.density + delta))
        let status = 'normal'
        if (newDensity >= 85) status = 'critical'
        else if (newDensity >= 70) status = 'high'
        else if (newDensity >= 50) status = 'moderate'
        return { ...zone, density: Math.round(newDensity), status }
      }))
      setStats(prev => ({
        ...prev,
        totalPilgrims: prev.totalPilgrims + Math.floor((Math.random() - 0.4) * 5000),
        activeShuttles: Math.max(150, Math.min(250, prev.activeShuttles + Math.floor((Math.random() - 0.5) * 4))),
        avgWaitTime: Math.max(5, Math.min(25, prev.avgWaitTime + (Math.random() - 0.5) * 2)),
        criticalZones: zones.filter(z => z.status === 'critical').length,
      }))
    }, 4000)
    return () => clearInterval(interval)
  }, [zones])

  const tabs = [
    { id: 'map', label: 'Live Map', icon: '🗺️' },
    { id: 'route', label: 'Route Planner', icon: '🧭' },
    { id: 'parking', label: 'Parking', icon: '🅿️' },
    { id: 'ai', label: 'AI Advisor', icon: '🤖' },
    { id: 'predict', label: 'Predictions', icon: '🔮' },
    { id: 'incidents', label: 'Incidents', icon: '🚨' },
  ]

  return (
    <div className="min-h-screen bg-sf-bg text-white">
      {/* Header */}
      <Header view={view} setView={setView} criticalZones={stats.criticalZones} />
      
      {/* Alert Ticker */}
      <AlertTicker alerts={alerts} />

      {/* Stats Bar */}
      <StatsBar stats={stats} />

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-sf-bg/95 backdrop-blur-xl border-b border-sf-border">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-sf-gold/20 to-sf-saffron/20 text-sf-gold border border-sf-gold/30'
                    : 'text-gray-400 hover:text-white hover:bg-sf-card'
                }`}
                id={`tab-${tab.id}`}
              >
                <span>{tab.icon}</span>
                {tab.label}
                {tab.id === 'incidents' && incidents.filter(i => i.status === 'active').length > 0 && (
                  <span className="ml-1 bg-sf-crimson text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {incidents.filter(i => i.status === 'active').length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-4 py-6">
        {activeTab === 'map' && <CongestionMap zones={zones} />}
        {activeTab === 'route' && <RouteRecommender zones={zones} />}
        {activeTab === 'parking' && <ParkingOptimizer zones={zones} />}
        {activeTab === 'ai' && <AIAdvisor zones={zones} />}
        {activeTab === 'predict' && <PredictionPanel zones={zones} />}
        {activeTab === 'incidents' && (
          <IncidentBoard
            incidents={incidents}
            setIncidents={setIncidents}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-sf-border mt-12 py-6 text-center">
        <p className="text-gray-500 text-sm">
          <span className="gradient-text font-semibold">SmartFlow AI</span>
          {' '}— Intelligent Mobility System for Mahakumbh 2028 | Prayagraj, India
        </p>
        <p className="text-gray-600 text-xs mt-1">
          Powered by Gemini AI · Real-time crowd analytics · 18 active monitoring zones
        </p>
      </footer>
    </div>
  )
}
