'use client'
import { useEffect, useState } from 'react'
import { Users, Bus, AlertTriangle, Clock, Zap, Activity } from 'lucide-react'

function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }) {
  const [displayed, setDisplayed] = useState(value)
  useEffect(() => {
    setDisplayed(value)
  }, [value])
  return (
    <span className="count-up">
      {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN', { maximumFractionDigits: decimals }) : value}{suffix}
    </span>
  )
}

const StatCard = ({ icon: Icon, label, value, prefix, suffix, color, decimals }) => (
  <div className="glass-card rounded-xl p-4 flex items-center gap-4 card-hover flex-1 min-w-[160px]">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-xs text-gray-400 leading-none">{label}</p>
      <p className="text-xl font-bold mt-1 leading-none">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </p>
    </div>
  </div>
)

export default function StatsBar({ stats }) {
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-4">
      <div className="flex gap-3 overflow-x-auto pb-2">
        <StatCard
          icon={Users}
          label="Live Pilgrims"
          value={stats.totalPilgrims}
          color="bg-sf-gold/20 text-sf-gold"
        />
        <StatCard
          icon={Bus}
          label="Active Shuttles"
          value={stats.activeShuttles}
          color="bg-sf-emerald/20 text-sf-emerald"
        />
        <StatCard
          icon={AlertTriangle}
          label="Critical Zones"
          value={stats.criticalZones}
          color="bg-sf-crimson/20 text-sf-crimson"
        />
        <StatCard
          icon={Clock}
          label="Avg Wait Time"
          value={Math.round(stats.avgWaitTime)}
          suffix=" min"
          color="bg-sf-blue/20 text-sf-blue"
        />
        <StatCard
          icon={Zap}
          label="Incidents Resolved"
          value={stats.resolvedIncidents}
          color="bg-sf-purple/20 text-sf-purple"
        />
        <StatCard
          icon={Activity}
          label="Active Sectors"
          value={stats.activeSectors}
          color="bg-sf-saffron/20 text-sf-saffron"
        />
      </div>
    </div>
  )
}
