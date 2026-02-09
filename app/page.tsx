"use client"

import { MarketingNav } from "@/components/marketing/nav"
import { MarketingFooter } from "@/components/marketing/footer"
import { LandingPage } from "@/components/marketing/landing-page"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <LandingPage />
      </main>
      <MarketingFooter />
    </div>
  )
}
