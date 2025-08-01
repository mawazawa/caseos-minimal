/*
 * ███████╗███████╗ █████╗ ████████╗██╗   ██╗██████╗ ███████╗███████╗
 * ██╔════╝██╔════╝██╔══██╗╚══██╔══╝██║   ██║██╔══██╗██╔════╝██╔════╝
 * █████╗  █████╗  ███████║   ██║   ██║   ██║██████╔╝█████╗  ███████╗
 * ██╔══╝  ██╔══╝  ██╔══██║   ██║   ██║   ██║██╔══██╗██╔══╝  ╚════██║
 * ██║     ███████╗██║  ██║   ██║   ╚██████╔╝██║  ██║███████╗███████║
 * ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
 * Landing Page Features Section - Value Proposition Cards
 */

'use client';

import { motion } from 'framer-motion';
import { Search, FileText, Bot, Clock, Shield, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';

interface Feature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
}

/**
 * Features Section Component
 *
 * Showcases the three main value propositions from the mockup:
 * - Legal Research
 * - Court Filing
 * - AI Form Drafting
 */
export function FeaturesSection() {
  const features: Feature[] = [
    {
      id: 'legal-research',
      title: 'Legal Research',
      subtitle: 'Explore statutes, case law and precedents',
      description: 'AI-powered research that finds relevant cases, statutes, and legal precedents in seconds. Get comprehensive legal analysis with citations and strategy recommendations.',
      icon: <Search size={24} />,
      gradient: 'from-[var(--color-info)] to-[var(--color-accent)]',
      features: [
        'Case law database search',
        'Statute analysis and interpretation',
        'Precedent matching and relevance scoring',
        'Legal strategy recommendations',
        'Citation generation and verification'
      ]
    },
    {
      id: 'court-filing',
      title: 'Court Filing',
      subtitle: 'Electronically files court documents',
      description: 'Streamline your court filings with automated document preparation, deadline tracking, and electronic submission to court systems nationwide.',
      icon: <FileText size={24} />,
      gradient: 'from-[var(--color-success)] to-[var(--color-info)]',
      features: [
        'Electronic court filing integration',
        'Document preparation and review',
        'Deadline tracking and reminders',
        'Court fee calculation and payment',
        'Filing status monitoring'
      ]
    },
    {
      id: 'ai-form-drafting',
      title: 'AI Form Drafting',
      subtitle: 'Generate legal forms with AI assistance',
      description: 'Create professional legal documents and forms using AI that understands legal requirements and ensures compliance with local jurisdiction rules.',
      icon: <Bot size={24} />,
      gradient: 'from-[var(--color-warning)] to-[var(--color-success)]',
      features: [
        'Automated form generation',
        'Jurisdiction-specific compliance',
        'Legal language optimization',
        'Document template library',
        'Real-time error checking'
      ]
    }
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  };

  return (
    <section className="py-24 bg-[var(--color-background)] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-background-secondary)]/30 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
            Powerful Legal Tools
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Everything you need to navigate the legal system with confidence
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              className="group relative"
            >
              {/* Feature Card */}
              <div className="h-full bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:border-[var(--color-accent)]/20">
                {/* Card Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 shadow-lg relative z-10`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] mb-4 font-medium">
                    {feature.subtitle}
                  </p>
                  <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-2 mb-8">
                    {feature.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[var(--color-text-secondary)] text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant="secondary"
                    className="w-full group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-accent-text)] transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/0 to-[var(--color-accent)]/0 group-hover:from-[var(--color-accent)]/5 group-hover:to-[var(--color-accent)]/5 transition-all duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
              Trusted by Legal Professionals
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock size={20} className="text-[var(--color-success)]" />
                  <span className="text-2xl font-bold text-[var(--color-text-primary)]">90%</span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-sm">Faster Document Prep</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield size={20} className="text-[var(--color-info)]" />
                  <span className="text-2xl font-bold text-[var(--color-text-primary)]">99.8%</span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-sm">Accuracy Rate</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp size={20} className="text-[var(--color-success)]" />
                  <span className="text-2xl font-bold text-[var(--color-text-primary)]">$15K</span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-sm">Average Savings</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FileText size={20} className="text-[var(--color-accent)]" />
                  <span className="text-2xl font-bold text-[var(--color-text-primary)]">500K+</span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-sm">Documents Generated</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}