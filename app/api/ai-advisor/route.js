// AI Advisor API route - Simhastha Kumbh 2028, Ujjain, Madhya Pradesh

export async function POST(request) {
  try {
    const { message, zoneData, routeContext } = await request.json()
    const apiKey = process.env.GEMINI_API_KEY

    if (!apiKey || apiKey === 'your-api-key-here') {
      return Response.json({ response: getSimulatedResponse(message, zoneData, routeContext), simulated: true })
    }

    const systemPrompt = `You are SmartFlow AI, the intelligent mobility advisor for Simhastha Mahakumbh 2028 — held in Ujjain, Madhya Pradesh on the sacred Shipra (Kshipra) River. Millions of pilgrims come for holy bathing (shahi snan) at Ram Ghat, Triveni Ghat, and Siddhawar Ghat. You have real-time access to crowd density data, route conditions, parking, and transport schedules.

Current Live Data:
- Zone Status: ${JSON.stringify(zoneData || {})}
- Route Context: ${JSON.stringify(routeContext || {})}

Key Ujjain Simhastha locations:
- Ram Ghat: Main bathing ghat on Shipra River (critical during snan timings)
- Mahakaleshwar Temple: One of 12 Jyotirlingas — always highest crowd density
- Triveni Ghat: Sacred confluence — moderate crowd alternative
- Siddhawar Ghat: Northern ghat — usually least crowded
- Bhairavgarh: Northern approach corridor to mela ground
- Nanakheda Bus Stand: Main intercity transport hub
- Mela Ground: Tent city north of Shipra River

Your role:
1. Give SPECIFIC, DATA-DRIVEN route recommendations with exact numbers
2. Explain WHY (congestion %, time savings, crowd exposure reduction)
3. Proactively warn about critical zones
4. Always suggest an alternative
5. Keep responses to 3-4 sentences, professional but friendly
6. Use real zone names, percentages, and time estimates

Respond with authority and empathy. Always include a recommended action.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: message }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
        })
      }
    )

    if (!response.ok) throw new Error('Gemini API error')

    const data = await response.json()
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || getSimulatedResponse(message, zoneData, routeContext)
    return Response.json({ response: aiText, simulated: false })

  } catch (error) {
    console.error('AI Advisor error:', error)
    return Response.json({ response: getSimulatedResponse('', {}, {}), simulated: true, error: error.message })
  }
}

function getSimulatedResponse(message, zoneData, routeContext) {
  const msg = message.toLowerCase()

  if (msg.includes('bhairavgarh') || msg.includes('zone 7')) {
    return "Bhairavgarh is currently at only 55% crowd density — well below the 80% safety threshold. Routing through Bhairavgarh reduces your travel time by 14 minutes and lowers crowd exposure by 40% compared to the direct Mahakal Marg, which is at 95% critical capacity. Take NH-52 via Bhairavgarh and transfer to Shuttle Blue Line at the Mela Ground interchange. Expected arrival: 25 minutes."
  }
  if (msg.includes('ram ghat') || msg.includes('snan') || msg.includes('bathing')) {
    return "⚠️ Ram Ghat is currently at 92% safe capacity — direct entry is not advisable. Crowd density has increased 18% in the last 30 minutes. My recommendation: head to Triveni Ghat instead (67% density, 10-minute Gold Line shuttle ride), which offers the same sacred Shipra bathing experience with 20 minutes shorter wait. Avoid Ram Ghat main steps during peak hours 9 AM–12 PM."
  }
  if (msg.includes('safe') || msg.includes('which ghat')) {
    return "The safest ghat right now is Siddhawar Ghat at only 38% density — plenty of space for a peaceful snan. It's 22 minutes from Ujjain Railway Station via Saffron Line shuttle (every 5 min). Triveni Ghat (67% density) is also a good choice with Gold Line shuttle every 3 minutes from Parking Zone B. Both offer the same sacred Shipra River experience as Ram Ghat."
  }
  if (msg.includes('parking')) {
    return "Best parking right now is Sector B (Dewas Naka Road) at 35% capacity — over 6,500 spaces free. It's 12 minutes to Triveni Ghat via Gold Line running every 3 minutes. Avoid Sector A Parking (82% full). Sector C on Indore Road is 58% full with 7-minute shuttle frequency. Sector B gives you the fastest ghat access with minimal walking."
  }
  if (msg.includes('mahakaleshwar') || msg.includes('temple') || msg.includes('darshan')) {
    return "Fastest route to Mahakaleshwar Temple: Nanakheda Bus Stand → Freeganj → Mahakal Marg — 15 minutes. However, temple entry is at 95% density with a 45-minute darshan queue expected. For faster access, use the west-side gate. Green Line shuttle from Nanakheda runs every 7 minutes. I recommend visiting before 8 AM or after 6 PM for significantly shorter queues."
  }
  if (msg.includes('route') || msg.includes('fastest') || msg.includes('reach')) {
    return "Optimal route from Railway Station: Railway Station → Tower Chowk → Freeganj → Mahakal Marg (for temple) or Bhairavgarh → Mela Ground (for ghats). Avoid Harsiddhi Temple area (78% density). The Saffron Line shuttle from Station covers the main corridor every 5 minutes. Estimated travel time to Ram Ghat: 22 minutes via the recommended corridor."
  }

  return "Based on live Simhastha data across all 18 Ujjain zones: avoid Ram Ghat (92%) and Mahakaleshwar Temple (95%) right now. Best option for Shipra snan is Siddhawar Ghat (38% density, no wait). Saffron Line shuttle departs every 5 minutes from Ujjain Railway Station — 22-minute ride to Triveni Ghat. Crowd conditions update every 4 seconds — check back for the latest recommendations."
}
