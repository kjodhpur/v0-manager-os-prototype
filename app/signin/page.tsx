"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HeartMetricsLogo } from "@/components/heart-metrics-logo"
import { ShieldCheck } from "lucide-react"
import { login, supabase } from "./connection"

export default function SignInPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/demo")
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await login()
    } catch (err) {
      console.error("Error signing in:", err)
      setError("We couldn't start Google sign-in. Please try again, or use demo mode below.")
      setIsLoading(false)
    }
  }

  const handleDemoMode = () => {
    router.push("/demo")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Link
            href="/"
            className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="HeartMetrics home"
          >
            <HeartMetricsLogo />
          </Link>
          <h1 className="mt-4 text-xl font-semibold">Sign in to HeartMetrics</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Use your work Google account to continue.
          </p>
        </div>

        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex flex-col gap-5">
              <Button onClick={handleGoogleSignIn} className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in with Google"}
              </Button>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
              >
                {error}
              </p>
            )}

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <Button variant="outline" className="w-full bg-transparent" onClick={handleDemoMode}>
              Try Demo Mode
            </Button>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link href="/contact" className="font-medium text-primary hover:underline">
                Request access
              </Link>
            </p>
          </CardContent>
        </Card>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5" />
          Privacy-first. No surveillance. No private message reading.
        </div>
      </div>
    </div>
  )
}
