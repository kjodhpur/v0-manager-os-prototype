"use client"

import React from "react"

import { useState } from "react"
import { MarketingNav } from "@/components/marketing/nav"
import { MarketingFooter } from "@/components/marketing/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <section className="bg-card py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="grid items-start gap-12 md:grid-cols-2">
              <div>
                <Badge variant="secondary" className="mb-6">Contact</Badge>
                <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  {"Let's talk about your team"}
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Whether you want a demo, have a question about privacy, or just want to learn more, we are here.
                </p>
                <div className="mt-8 flex flex-col gap-4">
                  <Card className="border-border">
                    <CardContent className="flex items-start gap-3 p-4">
                      <Mail className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Email us</p>
                        <p className="text-sm text-muted-foreground">hello@heartmetrics.io</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-border">
                    <CardContent className="flex items-start gap-3 p-4">
                      <Clock className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Response time</p>
                        <p className="text-sm text-muted-foreground">We typically respond within 1 business day.</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Card className="border-border">
                <CardContent className="p-6">
                  {submitted ? (
                    <div className="flex flex-col items-center py-12 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-foreground">Thank you!</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {"We've received your message and will get back to you within 1 business day."}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <h2 className="text-xl font-semibold text-foreground">Request a demo</h2>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input id="name" placeholder="Your name" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Work email</Label>
                        <Input id="email" type="email" placeholder="you@company.com" required />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Your company name" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="team-size">Team size</Label>
                        <Input id="team-size" placeholder="e.g. 10-50" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="message">Message (optional)</Label>
                        <Textarea id="message" placeholder="Tell us about your team or questions you have..." rows={4} />
                      </div>
                      <Button type="submit" className="w-full">
                        Send Request
                      </Button>
                      <p className="text-center text-xs text-muted-foreground">
                        We respect your privacy. No spam, ever.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  )
}
