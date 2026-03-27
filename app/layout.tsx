import React from "react"
import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Inter, Geist_Mono, Source_Serif_4 } from 'next/font/google'

// Initialize fonts with CSS variables
const inter = Inter({ 
  subsets: ['latin'], 
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: '--font-inter'
})
const geistMono = Geist_Mono({ 
  subsets: ['latin'], 
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: '--font-geist-mono'
})
const sourceSerif4 = Source_Serif_4({ 
  subsets: ['latin'], 
  weight: ["200","300","400","500","600","700","800","900"],
  variable: '--font-source-serif'
})

export const metadata: Metadata = {
  title: 'HeartMetrics - AI-Powered Manager Dashboard',
  description: 'An AI copilot that helps managers run fairer, healthier teams by making work distribution, contribution, and growth visible.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${geistMono.variable} ${sourceSerif4.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
