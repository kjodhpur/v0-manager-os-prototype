"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeartMetricsLogo } from "@/components/heart-metrics-logo"
import { ArrowRight, Download, Copy, Check, ExternalLink } from "lucide-react"

export default function QRPage() {
  const [qrDataUrl, setQrDataUrl] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [demoUrl, setDemoUrl] = useState("")
  const [error, setError] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const url = `${window.location.origin}/demo`
    setDemoUrl(url)

    let cancelled = false

    const generate = async () => {
      try {
        const QRCode = (await import("qrcode")).default
        const canvas = canvasRef.current
        if (!canvas || cancelled) return

        await QRCode.toCanvas(canvas, url, {
          width: 400,
          margin: 2,
          // Plain black on white keeps the code scannable in both themes.
          color: { dark: "#000000", light: "#ffffff" },
          errorCorrectionLevel: "H",
        })

        if (!cancelled) setQrDataUrl(canvas.toDataURL("image/png"))
      } catch {
        if (!cancelled) setError("We couldn't generate the QR code. You can still copy the link below.")
      }
    }

    generate()
    return () => {
      cancelled = true
    }
  }, [])

  const handleDownload = () => {
    if (!qrDataUrl) return
    const link = document.createElement("a")
    link.download = "heartmetrics-demo-qr.png"
    link.href = qrDataUrl
    link.click()
  }

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(demoUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError("Copying isn't available here — select the link above manually.")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <div className="mx-auto w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <HeartMetricsLogo size="lg" />
          </div>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground">
            Scan to try the demo
          </h1>
          <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
            Point your phone camera at the QR code below to instantly open the HeartMetrics interactive demo.
          </p>
        </div>

        {/* QR Code Card */}
        <Card className="border-border shadow-lg">
          <CardContent className="flex flex-col items-center gap-6 p-5 sm:p-8">
            <div className="w-full max-w-[18rem] overflow-hidden rounded-xl border-2 border-border bg-white p-3 sm:p-4">
              <canvas
                ref={canvasRef}
                role="img"
                aria-label={demoUrl ? `QR code linking to ${demoUrl}` : "QR code loading"}
                className="block h-auto w-full"
              />
            </div>

            {error && (
              <p role="alert" className="text-center text-sm text-destructive">
                {error}
              </p>
            )}

            {/* URL display */}
            <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-secondary/50 px-4 py-3">
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
              <code className="flex-1 truncate text-sm text-foreground">
                {demoUrl || "Loading..."}
              </code>
              <button
                onClick={handleCopyUrl}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Copy demo URL"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-[var(--healthy)]" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
              <span role="status" aria-live="polite" className="sr-only">
                {copied ? "Demo URL copied to clipboard" : ""}
              </span>
            </div>

            {/* Actions */}
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={handleDownload}
                disabled={!qrDataUrl}
              >
                <Download className="mr-2 h-4 w-4" />
                Download QR
              </Button>
              <Button className="flex-1" asChild>
                <Link href="/demo">
                  Open Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer hint */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Print this page or share the QR code at events, on slides, or in pitch decks.
        </p>
      </div>
    </div>
  )
}
