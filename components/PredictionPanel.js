'use client'
import { useState } from 'react'
import { TrendingUp, TrendingDown, Clock, Activity } from 'lucide-react'
import { PREDICTION_DATA, HOURLY_FOOTFALL } from '@/lib/data'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, Legend
} from 'recharts'

const TIME_WINDOWS = ['30min', '1hr', '3hr']
const TIME_LABELS = { '30min': 'Next 30 Minutes', '1hr': 'Next 1 Hour', '3hr': 'Next 3 Hours' }

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="text-white font-medium mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }} className="text-xs">{p.name}: {p.value?.toLocaleString()}</p>
        ))}
      </div>
    )
  }
  return null
}

export default function PredictionPanel({ zones }) {
  const [window, setWindow] = useState('30min')
  const predictions = PREDICTION_DATA[window]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">🔮 Congestion Prediction Engine</h2>
          <p className="text-sm text-gray-400 mt-1">AI-driven forecasting based on historical movement patterns and live flow rates</p>
        </div>
        <div className="glass-card rounded-xl p-1 flex gap-1">
          {TIME_WINDOWS.map(tw => (
            <button
              key={tw}
              id={`predict-tab-${tw}`}
              onClick={() => setWindow(tw)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                window === tw
                  ? 'bg-gradient-to-r from-sf-purple to-sf-blue text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tw === '30min' ? '30m' : tw === '1hr' ? '1h' : '3h'}
            </button>
          ))}
        </div>
      </div>

      {/* Prediction Forecast Bars */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-2">Zone Density Forecast — {TIME_LABELS[window]}</h3>
        <p className="text-xs text-gray-400 mb-6">Predicted vs current density for top 5 zones</p>
        <div className="space-y-4">
          {predictions.map((p, i) => (
            <div key={i} className="grid grid-cols-[1fr_100px_80px_80px] gap-4 items-center">
              <div>
                <p className="text-sm text-gray-300 mb-1">{p.zone}</p>
                <div className="h-2 bg-sf-border rounded-full overflow-hidden flex gap-0.5">
                  {/* Current */}
                  <div
                    className="h-full rounded-l-full"
                    style={{
                      width: `${p.current}%`,
                      background: p.current >= 85 ? '#FF3B30' : p.current >= 70 ? '#FF6B00' : '#05C77E',
                      opacity: 0.5
                    }}
                  />
                </div>
                <div className="h-2 bg-sf-border rounded-full overflow-hidden mt-1">
                  {/* Predicted */}
                  <div
                    className="h-full rounded-l-full transition-all duration-700"
                    style={{
                      width: `${p.predicted}%`,
                      background: p.predicted >= 85 ? '#FF3B30' : p.predicted >= 70 ? '#FF6B00' : '#05C77E',
                    }}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-500 text-right">
                <div>Now: <span className="text-white font-medium">{p.current}%</span></div>
                <div className="mt-1">→ <span className="font-bold" style={{ color: p.predicted >= 85 ? '#FF3B30' : p.predicted >= 70 ? '#FF6B00' : '#05C77E' }}>{p.predicted}%</span></div>
              </div>
              <div className={`flex items-center gap-1 justify-end text-sm font-bold ${p.trend === 'up' ? 'text-red-400' : 'text-emerald-400'}`}>
                {p.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {p.trend === 'up' ? '+' : '-'}{Math.abs(p.predicted - p.current)}%
              </div>
              <div className={`text-xs px-2 py-1 rounded-full text-center border ${
                p.predicted >= 85 ? 'text-red-400 border-red-400/30 bg-red-400/10' :
                p.predicted >= 70 ? 'text-orange-400 border-orange-400/30 bg-orange-400/10' :
                'text-emerald-400 border-emerald-400/30 bg-emerald-400/10'
              }`}>
                {p.predicted >= 85 ? 'Critical' : p.predicted >= 70 ? 'High' : 'Safe'}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="inline-block w-4 h-1.5 rounded bg-white/30"></span> Current</span>
          <span className="flex items-center gap-1"><span className="inline-block w-4 h-1.5 rounded bg-sf-gold"></span> Predicted</span>
        </div>
      </div>

      {/* Hourly Footfall Chart */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-1">Today's Footfall Pattern</h3>
        <p className="text-xs text-gray-400 mb-6">Pilgrim movement and shuttle deployment across the day</p>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={HOURLY_FOOTFALL}>
            <defs>
              <linearGradient id="pilgramGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#E8A937" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#E8A937" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="shuttleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#05C77E" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#05C77E" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,42,62,0.8)" />
            <XAxis dataKey="hour" stroke="#4B5563" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
            <YAxis stroke="#4B5563" tick={{ fill: '#9CA3AF', fontSize: 11 }} tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#9CA3AF' }} />
            <Area type="monotone" dataKey="pilgrims" name="Pilgrims" stroke="#E8A937" fill="url(#pilgramGrad)" strokeWidth={2} dot={false} />
            <Area type="monotone" dataKey="shuttles" name="Shuttles Active" stroke="#05C77E" fill="url(#shuttleGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Current Zone Density Bar Chart */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="font-semibold text-white mb-1">All Zone Density Snapshot</h3>
        <p className="text-xs text-gray-400 mb-6">Current real-time density across all 18 monitored zones</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={zones.sort((a,b) => b.density - a.density)} layout="vertical" margin={{ left: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(42,42,62,0.8)" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} stroke="#4B5563" tick={{ fill: '#9CA3AF', fontSize: 10 }} tickFormatter={v => `${v}%`} />
            <YAxis type="category" dataKey="name" stroke="#4B5563" tick={{ fill: '#9CA3AF', fontSize: 9 }} width={80} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="density" name="Density" radius={[0, 4, 4, 0]}
              fill="#E8A937"
              label={{ position: 'right', fill: '#9CA3AF', fontSize: 9, formatter: v => `${v}%` }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
