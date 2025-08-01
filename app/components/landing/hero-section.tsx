/*
 * ██╗  ██╗███████╗██████╗  ██████╗     ███████╗███████╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗
 * ██║  ██║██╔════╝██╔══██╗██╔═══██╗    ██╔════╝██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
 * ███████║█████╗  ██████╔╝██║   ██║    ███████╗█████╗  ██║        ██║   ██║██║   ██║██╔██╗ ██║
 * ██╔══██║██╔══╝  ██╔══██╗██║   ██║    ╚════██║██╔══╝  ██║        ██║   ██║██║   ██║██║╚██╗██║
 * ██║  ██║███████╗██║  ██║╚██████╔╝    ███████║███████╗╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
 * ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝ ╚═════╝     ╚══════╝╚══════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 * Landing Page Hero Section - Conversion-Optimized Design
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Play, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { ThemeToggle } from '../theme';

/**
 * Hero Section Component
 *
 * Features:
 * - Compelling value proposition
 * - Social proof indicators
 * - Clear call-to-action buttons
 * - Animated cosmic background
 * - Theme-aware design
 */
export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-[var(--color-background)] overflow-hidden flex items-center">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle size="md" variant="default" showLabel />
      </div>

      {/* Cosmic Background */}
      <div className="absolute inset-0">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 via-[var(--color-background)] to-[var(--color-accent)]/5" />

        {/* Floating orbs */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-1/4 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-[var(--color-success)]/8 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-2xl"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-[0.08]" />

        {/* Particle field */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[var(--color-accent)]/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="mb-8">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center shadow-xl group-hover:shadow-[var(--color-accent)]/25 transition-all duration-300">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--color-accent-text)]"
                >
                  <path d="M3 6l3 6 3-6" />
                  <path d="M21 6l-3 6-3-6" />
                  <path d="M12 3v18" />
                  <path d="M8 21h8" />
                </svg>
              </div>
              <span className="text-4xl font-bold text-[var(--color-text-primary)]">CaseOS</span>
            </Link>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-5xl md:text-7xl font-bold text-[var(--color-text-primary)] mb-4 leading-tight">
              Legal AI for
              <span className="block bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-success)] bg-clip-text text-transparent">
                Self-Represented
              </span>
              Litigants
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
              Revolutionary access to justice platform empowering the 75% of litigants
              navigating the legal system alone. AI-powered case management, document
              generation, and legal guidance.
            </p>
          </motion.div>

          {/* Social Proof Indicators */}
          <motion.div variants={itemVariants} className="mb-10">
            <div className="flex items-center justify-center gap-8 text-[var(--color-text-tertiary)] text-sm">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>10,000+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={16} />
                <span>98% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} />
                <span>$2M+ Saved in Legal Fees</span>
              </div>
            </div>
          </motion.div>

          {/* Call to Action Buttons */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                className="text-lg px-8 py-4"
                rightIcon={<ArrowRight size={20} />}
                asChild
              >
                <Link href="/auth/signup">
                  Start Free Trial
                </Link>
              </Button>

              <Button
                variant="secondary"
                size="lg"
                className="text-lg px-8 py-4"
                leftIcon={<Play size={20} />}
                asChild
              >
                <Link href="#demo">
                  Watch Demo
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-[var(--color-text-tertiary)] text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-accent)] mb-2">75%</div>
                <div className="text-[var(--color-text-secondary)] text-sm">
                  of litigants represent themselves
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-success)] mb-2">$15K</div>
                <div className="text-[var(--color-text-secondary)] text-sm">
                  average saved per case
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[var(--color-accent)] mb-2">24/7</div>
                <div className="text-[var(--color-text-secondary)] text-sm">
                  AI legal assistance
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[var(--color-text-tertiary)] rounded-full flex justify-center">
          <div className="w-1 h-3 bg-[var(--color-text-tertiary)] rounded-full mt-2" />
        </div>
      </motion.div>

      {/* Command Palette Hint */}
      <div className="fixed bottom-6 right-6 text-[var(--color-text-tertiary)] text-[var(--font-size-xs)] flex items-center gap-2">
        <kbd className="px-2 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded text-[var(--color-text-secondary)]">⌘K</kbd>
        <span>to search</span>
      </div>
    </section>
  );
}