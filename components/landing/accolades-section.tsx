"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Zap, Target } from "lucide-react";

const accolades = [
  {
    icon: Trophy,
    title: "1st Place",
    subtitle: "ASU Love AI Competition",
    description: "Selected as the top AI innovation addressing real-world workplace challenges from 100+ submissions",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Zap,
    title: "IBM SkillsBuild",
    subtitle: "Program Participant",
    description: "Recognized for advanced AI/ML expertise and commitment to responsible AI development",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Target,
    title: "Ignite the Future",
    subtitle: "Competition Finalist",
    description: "Selected among top 5% of ventures advancing workplace innovation and employee wellbeing",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    title: "ASU Change the World",
    subtitle: "Competition Pitcher",
    description: "Presented at Arizona State University's flagship innovation competition at Mountain America Stadium",
    color: "from-emerald-500 to-green-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function AccoladesSection() {
  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden bg-card/30">
      {/* Background gradient */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        animate={{
          y: [0, 40, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            Recognized by
            <br />
            <span className="text-gradient">leading institutions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Industry validation and awards for our innovation in workplace wellbeing
          </p>
        </motion.div>

        {/* Accolades Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {accolades.map((accolade, idx) => {
            const Icon = accolade.icon;
            return (
              <motion.div key={idx} variants={itemVariants} className="group">
                <div
                  className="relative p-8 rounded-xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                  style={{
                    boxShadow: "0 0 24px rgba(0, 184, 160, 0.05)",
                  }}
                >
                  {/* Icon with gradient background */}
                  <motion.div
                    className={`w-14 h-14 rounded-lg bg-gradient-to-br ${accolade.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-bold mb-1">{accolade.title}</h3>
                  <p className="text-sm text-primary mb-3 font-medium">{accolade.subtitle}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {accolade.description}
                  </p>

                  {/* Hover indicator */}
                  <motion.div
                    className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ height: "0%" }}
                    whileHover={{ height: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Validation statement */}
        <motion.div
          className="mt-16 p-8 rounded-xl border border-primary/20 bg-primary/5 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-muted-foreground mb-2">
            💡 Validated by academic institutions and industry leaders
          </p>
          <p className="text-foreground font-medium">
            Our approach to workplace wellbeing has been recognized as addressing a critical gap
            in how organizations support employee engagement and retention.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
