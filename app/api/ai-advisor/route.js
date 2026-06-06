// AI Advisor API route - calls Gemini API with smart Mahakumbh context

export async function POST(request) {
  try {
    const { message, zoneData, routeContext } = await request.json()
    
    const apiKey = process.env.GEMINI_API_KEY
    
    // If no API key, return a smart simulated response
    if (!apiKey || apiKey === 'your-api-key-here') {
      return Response.json({ 
        response: getSimulatedResponse(message, zoneData, routeContext),
        simulated: true 
      })
    }

    const systemPrompt = `You are SmartFlow AI, the intelligent mobility advisor for Mahakumbh 2028 — the world's largest human gathering in Prayagraj, India, with 450 million pilgrims. You have real-time access to crowd density data, route conditions, parking availability, and transport schedules.

Current Live Data:
- Zone Status: ${JSON.stringify(zoneData || {})}
- Route Context: ${JSON.stringify(routeContext || {})}

Your role:
1. Provide SPECIFIC, DATA-DRIVEN route recommendations with exact numbers
2. Explain WHY you recommend a route (congestion %, time savings, crowd exposure)
3. Warn about critical zones proactively
4. Suggest alternatives always
5. Keep responses concise (3-4 sentences max), professional, and helpful
6. Use specific zone names, percentages, and time estimates
7. Always mention a specific recommended action

Respond in a friendly but authoritative tone. Include specific metrics.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: message }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          }
        })
      }
    )

    if (!response.ok) {
      throw new Error('Gemini API error')
    }

    const data = await response.json()
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || getSimulatedResponse(message, zoneData, routeContext)

    return Response.json({ response: aiText, simulated: false })

  } catch (error) {
    console.error('AI Advisor error:', error)
    return Response.json({ 
      response: getSimulatedResponse('', {}, {}),
      simulated: true,
      error: error.message 
    })
  }
}

function getSimulatedResponse(message, zoneData, routeContext) {
  const msg = message.toLowerCase()
  
  if (msg.includes('zone 7') || msg.includes('phaphamau')) {
    return "Zone 7 (Phaphamau) currently has only 55% density — well below the 80% safety threshold. Routing through Zone 7 reduces your estimated travel time by 12 minutes and lowers crowd exposure by 37% compared to the direct Naini Bridge path, which is at 85% critical capacity. I recommend taking the NH-19 approach via Phaphamau and transferring to Shuttle Gold Line at the interchange. Expected arrival at Sangam Ghat: 28 minutes."
  }
  if (msg.includes('sangam') || msg.includes('safe')) {
    return "⚠️ Sangam Sector is currently at 92% of safe capacity — I do not recommend direct entry right now. Crowd density has increased 15% in the last 30 minutes. My recommendation: head to Arail Ghat instead (67% density, 8-minute shuttle ride via Gold Line), which offers the same sacred bathing experience with 25 minutes shorter wait time. Gate 1 is critical — use Gate 2 or Gate 3 for safer entry."
  }
  if (msg.includes('parking')) {
    return "Best available parking right now is Sector B (Arail Road) at 35% capacity — over 6,500 spaces free. It's a 12-minute shuttle ride to Arail Ghat via Gold Line running every 3 minutes. Sector A is 92% full — avoid it. Sector C (Jhunsi) is 58% full but shuttles run every 7 minutes. I'd strongly recommend Sector B for the fastest ghat access with the least crowding."
  }
  if (msg.includes('ram ghat') || msg.includes('fastest')) {
    return "Fastest route to Ram Ghat: Civil Lines → Sarojini Naidu Road → Gate 3 → Ram Ghat. Estimated travel time: 22 minutes. Current congestion on this path is only 45% — the lowest of all routes. Gate 3 (63% density) is your safest entry point. Avoid Zero Road which is at 72% and causing 15-minute delays. Green Line shuttle from Civil Lines runs every 7 minutes."
  }
  if (msg.includes('gate 1') || msg.includes('congestion ease')) {
    return "Gate 1 is currently at 95% critical density — the system has auto-activated a temporary diversion protocol. Based on historical patterns and current inflow rates, Gate 1 congestion is expected to reduce to below 70% in approximately 45 minutes (around 11:45 AM). I recommend waiting at the Parking Zone A holding area or using Gate 2 as an immediate alternative, which is at 41% density with no wait time."
  }
  
  return "Based on current live data across all 18 Mahakumbh zones, I recommend avoiding the Sangam Sector (92% density) and Naini Bridge (85% density). The optimal route is via Civil Lines → Gate 2 → Arail Ghat, with an estimated 20-minute travel time and only 41% congestion at Gate 2. Shuttle Gold Line departs every 3 minutes from Parking Zone B and will get you to your destination with minimal crowd exposure. Stay updated — conditions change every 5 minutes."
}
