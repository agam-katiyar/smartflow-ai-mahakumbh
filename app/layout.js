import { Outfit, Inter } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'SmartFlow AI – Mahakumbh Intelligent Mobility System',
  description: 'AI-powered crowd routing, congestion prediction, and smart parking allocation for Mahakumbh 2028. Real-time mobility intelligence for 450 million pilgrims.',
  keywords: 'Mahakumbh, crowd management, smart routing, AI mobility, traffic management, Prayagraj',
  openGraph: {
    title: 'SmartFlow AI – Mahakumbh Intelligent Mobility System',
    description: 'AI-powered crowd routing and congestion prediction for Mahakumbh 2028',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔮</text></svg>" />
      </head>
      <body className="bg-sf-bg text-white font-sans antialiased">{children}</body>
    </html>
  )
}
