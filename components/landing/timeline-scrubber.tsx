'use client';

import { useEffect, useRef, useState } from 'react';
import { TrendingDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const weeks = [
  { week: 1, status: 'Healthy', wwiScore: 72, color: 'var(--week-1)' },
  { week: 2, status: 'Watch', wwiScore: 65, color: 'var(--week-2)' },
  { week: 3, status: 'Elevated', wwiScore: 58, color: 'var(--week-3)' },
  { week: 4, status: 'At Risk', wwiScore: 51, color: 'var(--week-4)' },
  { week: 5, status: 'High Risk', wwiScore: 45, color: 'var(--week-5)' },
  { week: 6, status: 'Critical', wwiScore: 43, color: 'var(--week-6)' },
  { week: 7, status: 'Resigned', wwiScore: 41, color: 'var(--week-7)' },
];

export function TimelineScrubber() {
  const [activeWeek, setActiveWeek] = useState(0);
  const [userTookControl, setUserTookControl] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout[]>([]);
  const sliderRef = useRef<HTMLInputElement>(null);

  const currentWeek = weeks[activeWeek];
  const signals = [
    'Slack responses slowing down',
    'Declined 3 meeting invites',
    'Skipped team standup',
    'Email engagement ↓ 40%',
  ].slice(0, activeWeek + 1);

  // Auto-play sequence on mount
  useEffect(() => {
    const handleAutoPlay = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !userTookControl) {
        // Clear any existing timeouts
        autoPlayRef.current.forEach(timeout => clearTimeout(timeout));
        autoPlayRef.current = [];

        // Week 2 at 800ms
        autoPlayRef.current.push(
          setTimeout(() => {
            setActiveWeek(1);
          }, 800)
        );

        // Week 3 at 2200ms
        autoPlayRef.current.push(
          setTimeout(() => {
            setActiveWeek(2);
          }, 2200)
        );

        // Show tooltip at 3600ms
        autoPlayRef.current.push(
          setTimeout(() => {
            setShowTooltip(true);
            // Fade out after 3 seconds
            autoPlayRef.current.push(
              setTimeout(() => {
                setShowTooltip(false);
              }, 3000)
            );
          }, 3600)
        );
      }
    };

    const observer = new IntersectionObserver(handleAutoPlay, { threshold: 0.4 });
    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      observer.disconnect();
      autoPlayRef.current.forEach(timeout => clearTimeout(timeout));
    };
  }, [userTookControl]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.currentTarget.value);
    setActiveWeek(newValue);
    
    // Cancel auto-play permanently on first interaction
    if (!userTookControl) {
      setUserTookControl(true);
      autoPlayRef.current.forEach(timeout => clearTimeout(timeout));
      autoPlayRef.current = [];
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <motion.div 
        className="mb-8 flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold">What happened to Riya S.?</h3>
        <motion.div
          className="px-3 py-1 rounded-full text-sm font-mono transition-all duration-500"
          style={{ backgroundColor: `${currentWeek.color}20`, color: currentWeek.color }}
          key={currentWeek.week}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Week {currentWeek.week}
        </motion.div>
      </motion.div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Left: Employee Card */}
        <motion.div
          className="border rounded-xl p-6 backdrop-blur-sm transition-all duration-500"
          style={{
            borderColor: `${currentWeek.color}40`,
            backgroundColor: `${currentWeek.color}08`,
            boxShadow: `0 0 24px ${currentWeek.color}20, inset 0 0 20px ${currentWeek.color}08`,
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 className="font-mono text-xs text-muted-foreground mb-4 uppercase tracking-wider">
            Work Wellbeing Index
          </h4>

          <motion.div
            className="mb-8"
            key={currentWeek.week}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="text-5xl font-display font-bold"
              style={{ color: currentWeek.color }}
              layoutId="wwiScore"
            >
              {currentWeek.wwiScore}
            </motion.div>
            <motion.p
              className="text-sm mt-2"
              style={{ color: currentWeek.color }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {currentWeek.status}
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <div className="mb-6 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full"
              style={{
                backgroundColor: currentWeek.color,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${(currentWeek.wwiScore / 100) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          {/* Accumulated signals */}
          <h5 className="text-xs font-mono text-muted-foreground mb-3 uppercase">
            Accumulated Signals
          </h5>
          <div className="space-y-2">
            <AnimatePresence mode="wait">
              {signals.map((signal, idx) => (
                <motion.div
                  key={`${activeWeek}-${idx}`}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <span className="text-primary">●</span>
                  <span>{signal}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right: Alert Card */}
        <motion.div
          className="border rounded-xl p-6 transition-all duration-500"
          style={{
            borderColor: `${currentWeek.color}40`,
            backgroundColor: `${currentWeek.color}10`,
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          key={currentWeek.week}
        >
          <div className="flex items-start gap-3 mb-4">
            <TrendingDown className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: currentWeek.color }} />
            <h4 className="font-semibold">HeartMetrics Alert</h4>
          </div>

          <motion.p 
            className="text-sm text-foreground/70 leading-relaxed"
            key={`alert-${activeWeek}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {activeWeek === 0
              && "Riya's WWI is in the healthy range. Monitor for any sudden changes."}
            {activeWeek === 1
              && "Work engagement is starting to decline. Watch for patterns in communication."}
            {activeWeek === 2
              && "Multiple signals indicate increasing stress. Consider a one-on-one check-in."}
            {activeWeek === 3
              && "Riya may be approaching burnout. Immediate action recommended."}
            {activeWeek >= 4
              && "Critical intervention needed. Riya is likely planning to leave."}
          </motion.p>

          <AnimatePresence>
            {activeWeek === 6 && (
              <motion.div
                className="mt-4 pt-4 border-t border-current/20"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <p className="text-xs font-mono text-muted-foreground">Riya S. resigned on this date</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Timeline Scrubber */}
      <div className="space-y-4">
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-sm text-muted-foreground">
                Now you take over →
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Slider */}
        <div className="relative">
          <input
            ref={sliderRef}
            type="range"
            min="0"
            max="6"
            value={activeWeek}
            onChange={handleSliderChange}
            aria-label="Week"
            aria-valuetext={`Week ${currentWeek.week}`}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            style={{
              background: `linear-gradient(to right, ${currentWeek.color} 0%, ${currentWeek.color} ${(activeWeek / 6) * 100}%, var(--border) ${(activeWeek / 6) * 100}%, var(--border) 100%)`,
            }}
          />

          {/* Week marks */}
          <div className="mt-1 flex justify-between">
            {weeks.map((w, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveWeek(idx);
                  if (!userTookControl) {
                    setUserTookControl(true);
                    autoPlayRef.current.forEach(timeout => clearTimeout(timeout));
                  }
                }}
                aria-label={`Week ${w.week}`}
                aria-pressed={activeWeek === idx}
                className={`min-h-[44px] min-w-[36px] rounded-lg font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  activeWeek === idx
                    ? 'font-semibold text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                W{w.week}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
