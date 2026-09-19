"use client"

import React from "react"

import { useState } from "react"
import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Mail, Clock } from "lucide-react"
import { SITE } from "@/lib/site-config"

const EMPTY_FORM = { name: "", email: "", company: "", teamSize: "", message: "" }

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)

  const update = (field: keyof typeof EMPTY_FORM) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  /**
   * There is no backend to post to, so the form composes a real message and hands
   * it to the visitor's mail client. Nothing is claimed as "received" that wasn't.
   */
  const mailtoHref = (() => {
    const subject = `Demo request${form.company ? ` — ${form.company}` : ""}`
    const body = [
      `Name: ${form.name}`,
      `Work email: ${form.email}`,
      form.company && `Company: ${form.company}`,
      form.teamSize && `Team size: ${form.teamSize}`,
      "",
      form.message || "(no additional message)",
    ]
      .filter(Boolean)
      .join("\n")

    return `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  })()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = mailtoHref
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-16">
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
                      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground">Email us</p>
                        <a
                          href={`mailto:${SITE.contactEmail}`}
                          className="break-all text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {SITE.contactEmail}
                        </a>
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
                    <div className="flex flex-col items-center py-12 text-center" role="status" aria-live="polite">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-7 w-7 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-foreground">Almost there</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Your email app should have opened with the message ready to send. Hit send
                        and we&apos;ll reply within 1 business day.
                      </p>
                      <p className="mt-4 text-sm text-muted-foreground">
                        Didn&apos;t open?{" "}
                        <a href={mailtoHref} className="font-medium text-primary hover:underline">
                          Open it again
                        </a>{" "}
                        or email{" "}
                        <a
                          href={`mailto:${SITE.contactEmail}`}
                          className="font-medium text-primary hover:underline"
                        >
                          {SITE.contactEmail}
                        </a>
                        .
                      </p>
                      <Button
                        variant="outline"
                        className="mt-6"
                        onClick={() => {
                          setSubmitted(false)
                          setForm(EMPTY_FORM)
                        }}
                      >
                        Send another
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <h2 className="text-xl font-semibold text-foreground">Request a demo</h2>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Full name</Label>
                        <Input id="name" placeholder="Your name" required value={form.name} onChange={update("name")} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Work email</Label>
                        <Input id="email" type="email" placeholder="you@company.com" required value={form.email} onChange={update("email")} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Your company name" value={form.company} onChange={update("company")} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="team-size">Team size</Label>
                        <Input id="team-size" placeholder="e.g. 10-50" value={form.teamSize} onChange={update("teamSize")} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="message">Message (optional)</Label>
                        <Textarea id="message" placeholder="Tell us about your team or questions you have..." rows={4} value={form.message} onChange={update("message")} />
                      </div>
                      <Button type="submit" className="w-full">
                        Send Request
                      </Button>
                      <p className="text-center text-xs leading-relaxed text-muted-foreground">
                        Opens in your email app so you can see exactly what you send. No spam, ever.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
