'use client'
import { useEffect, useRef } from 'react'

export default function AlertTicker({ alerts }) {
  return (
    <div className="bg-gradient-to-r from-sf-crimson/20 via-sf-saffron/10 to-sf-crimson/20 border-y border-sf-crimson/30 py-2 overflow-hidden">
      <div className="ticker-wrap">
        <div className="ticker-content text-xs text-gray-300 flex gap-12">
          {[...alerts, ...alerts].map((alert, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              {alert}
              <span className="text-sf-border">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
