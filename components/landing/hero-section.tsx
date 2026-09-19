'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedHeart } from "./animated-heart";
import { ROUTES, CTA } from "@/lib/site-config";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-16">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      {/* Animated heart background. Hidden on small screens, where it would sit
          directly behind the headline at 2x the viewport width. */}
      <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[min(80vw,600px)] w-[min(80vw,600px)] -translate-y-1/2 opacity-30 md:block lg:h-[800px] lg:w-[800px]">
        <AnimatedHeart />
      </div>

      {/* Animated orbs */}
      <motion.div
        className="absolute top-20 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        animate={{
          y: [0, -40, 0],
          x: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow with award badges */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="gap-2 px-4 py-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="text-sm font-mono">Privacy-First Analytics</span>
            </Badge>
            <Badge variant="secondary" className="gap-2 px-4 py-2">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-mono">AI-Powered Insights</span>
            </Badge>
          </div>
        </motion.div>

        {/* Main headline - stronger, more impactful */}
        <motion.div className="mb-8 mt-4" variants={itemVariants}>
          {/* The clamp floor has to fit "See your team's" inside a 320px
              viewport minus the page gutters, or the line clips. */}
          <h1 className="font-display text-[clamp(2rem,10vw,6.5rem)] font-bold leading-[1.02] tracking-tight">
            <span className="block">See your team&apos;s</span>
            <span className="block">
              <span className="text-gradient">real story</span>
            </span>
            <span className="block text-[0.6em] leading-[1.15] text-muted-foreground">
              before they leave
            </span>
          </h1>
        </motion.div>

        {/* Description - problem statement */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start max-w-5xl">
          <motion.div variants={itemVariants}>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8">
              By the time someone resigns, the signals were there for weeks. HeartMetrics surfaces the invisible patterns—workload spikes, recognition gaps, and disengagement—so managers can intervene before it's too late.
            </p>

            {/* Key differentiators */}
            <div className="space-y-3">
              {[
                "Real signals from your work system",
                "AI coaching for managers",
                "Privacy-first (no surveillance)",
                "Fairness analytics built-in"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-accent" />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col gap-4"
            variants={itemVariants}
          >
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base rounded-full group btn-glow justify-center"
              asChild
            >
              <Link href={ROUTES.demo}>
                {CTA.demo}
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 justify-center rounded-full border-primary/30 px-8 text-base transition-colors hover:border-primary/60 hover:bg-primary/5"
              asChild
            >
              <Link href={ROUTES.howWeCalculate}>See how it works</Link>
            </Button>

            {/* Social proof below CTAs */}
            <motion.div
              className="pt-6 border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="mb-3 text-xs text-muted-foreground">Built for:</p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>Fortune 500s</span>
                <span>•</span>
                <span>Fast-growth startups</span>
                <span>•</span>
                <span>Tech leaders</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
