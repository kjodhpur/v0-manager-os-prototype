"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedHeart } from "./animated-heart";

const words = ["fairer", "healthier", "happier", "balanced"];

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
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-14">
      {/* Animated heart background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-40 pointer-events-none">
        <AnimatedHeart />
      </div>
      
      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-foreground/10"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-foreground/10"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>
      
      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.div variants={itemVariants}>
          <Badge variant="secondary" className="gap-2 px-4 py-2">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm font-mono">Privacy-First Workplace Analytics</span>
          </Badge>
        </motion.div>
        
        {/* Main headline */}
        <motion.div className="mb-12 mt-8" variants={itemVariants}>
          <h1 className="text-[clamp(2.5rem,10vw,7rem)] font-display leading-[0.95] tracking-tight">
            <span className="block">Make work</span>
            <span className="block">
              more{" "}
              <span className="relative inline-block text-gradient">
                <span 
                  key={wordIndex}
                  className="inline-flex"
                >
                  {words[wordIndex].split("").map((char, i) => (
                    <span
                      key={`${wordIndex}-${i}`}
                      className="inline-block animate-char-in"
                      style={{
                        animationDelay: `${i * 50}ms`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-primary/30 via-ring/30 to-accent/30" />
              </span>
            </span>
          </h1>
        </motion.div>
        
        {/* Description */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <motion.p 
            className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl"
            variants={itemVariants}
          >
            HeartMetrics is an AI copilot that helps managers run fairer, healthier teams by making
            work distribution, contribution, and growth visible — without surveillance.
          </motion.p>
          
          {/* CTAs */}
          <motion.div 
            className="flex flex-col sm:flex-row items-start gap-4"
            variants={itemVariants}
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base rounded-full group btn-glow"
              asChild
            >
              <Link href="/demo">
                Try Demo Mode
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-base rounded-full border-primary/30 hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
              asChild
            >
              <Link href="/product">Learn more</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Social proof marquee */}
      <motion.div 
        className="absolute bottom-24 left-0 right-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="flex gap-16 marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16">
              {[
                { value: "40%", label: "reduced burnout risk", company: "TECH STARTUP" },
                { value: "3x", label: "faster issue detection", company: "ENTERPRISE" },
                { value: "85%", label: "manager satisfaction", company: "FINTECH" },
                { value: "2hrs", label: "saved per week", company: "AGENCY" },
              ].map((stat) => (
                <div key={`${stat.company}-${i}`} className="flex items-baseline gap-4">
                  <span className="text-4xl lg:text-5xl font-display">{stat.value}</span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                    <span className="block font-mono text-xs mt-1">{stat.company}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
