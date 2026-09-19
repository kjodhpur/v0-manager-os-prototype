import React from "react"
import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { SITE } from '@/lib/site-config'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'HeartMetrics — See your team\'s real story before they leave',
    template: '%s | HeartMetrics',
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'workplace wellbeing',
    'employee burnout prevention',
    'manager analytics',
    'work wellbeing index',
    'privacy-first people analytics',
  ],
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
    title: 'HeartMetrics — See your team\'s real story before they leave',
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HeartMetrics — See your team\'s real story before they leave',
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'light' || (theme === null && !prefersDark)) {
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
