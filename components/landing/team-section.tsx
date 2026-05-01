'use client';
"use client";

import { motion } from "framer-motion";
import { Linkedin, Award } from "lucide-react";
import Image from "next/image";

const founders = [
  {
    name: "Vipul Navale",
    role: "CEO & Co-Founder",
    bio: "Led 35+ cross-functional teams at Walmart, Amazon, and Microsoft. Vipul brings deep expertise in scaling operations and building high-performing teams at Fortune 500 companies. Currently pursuing MS AI in Business at ASU W.P. Carey.",
    highlights: ["Walmart", "Amazon", "Microsoft", "35+ years enterprise"],
    linkedin: "#",
    initials: "VN",
    imageUrl: "/vipul.jpg"
  },
  {
    name: "Kanha Jodhpurkar",
    role: "Chief AI Officer & Co-Founder",
    bio: "AI Product Owner at Deloitte, led Google's AI Rapid Innovation Team. Built domain-specific LLM on Google Gemini for enterprise clients. Pursuing MS AI in Business at ASU W.P. Carey and bringing cutting-edge AI research to HeartMetrics.",
    highlights: ["Deloitte", "Google Gemini", "LLM Expert", "Product AI"],
    linkedin: "#",
    initials: "KJ",
    imageUrl: "/kanha.jpg"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function TeamSection() {
  return (
    <section className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

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
            Built by operators &<br />
            <span className="text-gradient">AI experts</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Combining 35+ years of enterprise leadership with cutting-edge AI innovation
          </p>
        </motion.div>

        {/* Founders Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {founders.map((founder, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative"
            >
              {/* Card */}
              <div
                className="relative p-8 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                style={{
                  boxShadow: "0 0 24px rgba(0, 184, 160, 0.05)",
                }}
              >
                {/* Avatar */}
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform overflow-hidden relative"
                  whileHover={{ scale: 1.1 }}
                >
                  {founder.imageUrl ? (
                    <Image
                      src={founder.imageUrl}
                      alt={founder.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-display font-bold text-primary-foreground">
                      {founder.initials}
                    </span>
                  )}
                </motion.div>

                {/* Name and role */}
                <h3 className="text-2xl font-display font-bold mb-1">{founder.name}</h3>
                <p className="text-sm text-gradient mb-4">{founder.role}</p>

                {/* Bio */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {founder.bio}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {founder.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* LinkedIn link */}
                <a
                  href={founder.linkedin}
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Profile
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partnership section */}
        <motion.div
          className="mt-20 pt-16 border-t border-border/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-8 text-center">In Partnership With</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "ASU W.P. Carey", desc: "MS AI in Business" },
              { name: "Google AI", desc: "Gemini LLM Technology" },
              { name: "Enterprise Tech Leaders", desc: "Walmart, Amazon, Microsoft, Deloitte" },
            ].map((partner, i) => (
              <motion.div
                key={i}
                className="text-center p-4 rounded-lg border border-border/30 hover:border-primary/30 transition-colors"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.1 * i }}
                viewport={{ once: true }}
              >
                <p className="font-semibold mb-1">{partner.name}</p>
                <p className="text-sm text-muted-foreground">{partner.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
