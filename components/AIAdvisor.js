'use client'
import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Sparkles, RefreshCw } from 'lucide-react'
import { AI_ADVISOR_PROMPTS } from '@/lib/data'

const WELCOME_MSG = {
  id: 'welcome',
  role: 'assistant',
  text: "Namaste! 🙏 I'm **SmartFlow AI**, your intelligent mobility advisor for Mahakumbh 2028.\n\nI have real-time access to crowd density, route conditions, parking availability, and shuttle schedules across all **18 zones** in Prayagraj.\n\nAsk me anything — route recommendations, zone safety, parking advice, or why I'm routing through a specific sector. How can I help you today?",
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/⚠️/g, '<span class="text-yellow-400">⚠️</span>')
    .replace(/🔴/g, '<span class="text-red-400">🔴</span>')
    .replace(/✅/g, '<span class="text-emerald-400">✅</span>')
    .replace(/\n/g, '<br/>')
}

export default function AIAdvisor({ zones }) {
  const [messages, setMessages] = useState([WELCOME_MSG])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return

    const userMsg = {
      id: Date.now(),
      role: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Build zone context for AI
    const criticalZones = zones.filter(z => z.status === 'critical').map(z => `${z.name} (${z.density}%)`).join(', ')
    const safeZones = zones.filter(z => z.status === 'normal').map(z => `${z.name} (${z.density}%)`).join(', ')

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          zoneData: { criticalZones, safeZones, totalZones: zones.length },
          routeContext: { avgDensity: Math.round(zones.reduce((s, z) => s + z.density, 0) / zones.length) }
        })
      })

      const data = await res.json()
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        text: data.response,
        simulated: data.simulated,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        text: "I'm having trouble connecting right now. Based on current data: Sangam Sector is at 92% capacity — please use alternate ghats. Parking Zone B is your best option with 65% free capacity.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    }

    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const resetChat = () => {
    setMessages([WELCOME_MSG])
    setInput('')
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat Panel */}
      <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden flex flex-col" style={{ height: 620 }}>
        {/* Chat Header */}
        <div className="p-4 border-b border-sf-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sf-purple to-sf-blue flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white flex items-center gap-2">
                SmartFlow AI Advisor
                <span className="flex items-center gap-1 text-xs text-sf-emerald bg-sf-emerald/10 px-2 py-0.5 rounded-full border border-sf-emerald/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-sf-emerald animate-pulse"></span>
                  Online
                </span>
              </h2>
              <p className="text-xs text-gray-400">Powered by Gemini AI · Real-time Mahakumbh intelligence</p>
            </div>
          </div>
          <button onClick={resetChat} className="glass-card rounded-lg p-2 hover:bg-sf-card transition-all" title="Reset conversation">
            <RefreshCw size={14} className="text-gray-400" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm ${
                msg.role === 'user'
                  ? 'bg-sf-gold/20 text-sf-gold border border-sf-gold/30'
                  : 'bg-gradient-to-br from-sf-purple to-sf-blue text-white'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>

              {/* Bubble */}
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-sf-gold/20 text-white border border-sf-gold/20 rounded-tr-sm'
                    : 'ai-bubble text-gray-200 rounded-tl-sm'
                }`}
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                />
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-600">{msg.time}</span>
                  {msg.simulated && (
                    <span className="text-xs text-gray-600">(Smart simulation)</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sf-purple to-sf-blue flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div className="ai-bubble px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-sf-purple animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-sf-purple animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-2 h-2 rounded-full bg-sf-purple animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
                <span className="text-xs text-gray-400">Analyzing live data...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-sf-border">
          <div className="flex gap-3">
            <input
              id="ai-chat-input"
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about routes, parking, zone safety..."
              className="flex-1 bg-sf-surface border border-sf-border rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-sf-purple focus:outline-none transition-colors"
            />
            <button
              id="btn-send-ai"
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              className="btn-primary px-4 py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send size={18} className="text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="space-y-4">
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-sf-gold" />
            <h3 className="font-semibold text-white text-sm">Suggested Questions</h3>
          </div>
          <div className="space-y-2">
            {AI_ADVISOR_PROMPTS.map((p, i) => (
              <button
                key={i}
                id={`suggested-q-${i}`}
                onClick={() => sendMessage(p.question)}
                className="w-full text-left glass-card rounded-xl px-4 py-3 text-sm text-gray-300 hover:text-white hover:border-sf-gold/30 transition-all card-hover"
              >
                💬 {p.question}
              </button>
            ))}
          </div>
        </div>

        {/* Live Zone Summary for AI Context */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-semibold text-white text-sm mb-3">📊 Live Context (AI Uses This)</h3>
          <div className="space-y-2">
            {zones.filter(z => z.status === 'critical' || z.status === 'high').slice(0, 5).map(z => (
              <div key={z.id} className="flex items-center justify-between text-xs">
                <span className="text-gray-400 truncate max-w-[140px]">{z.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${z.density >= 85 ? 'text-red-400' : 'text-orange-400'}`}>{z.density}%</span>
                  <span className={`px-1.5 py-0.5 rounded text-xs border ${z.density >= 85 ? 'text-red-400 border-red-400/30 bg-red-400/10' : 'text-orange-400 border-orange-400/30 bg-orange-400/10'}`}>
                    {z.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-3">AI advisor uses real-time density data from all 18 zones to generate contextual responses.</p>
        </div>
      </div>
    </div>
  )
}
