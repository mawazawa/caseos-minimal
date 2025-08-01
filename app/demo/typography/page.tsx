/*
 * ████████╗██╗   ██╗██████╗  ██████╗  ██████╗ ██████╗  █████╗ ██████╗ ██╗  ██╗██╗   ██╗
 * ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔═══██╗██╔════╝ ██╔══██╗██╔══██╗██╔══██╗██║  ██║╚██╗ ██╔╝
 *    ██║    ╚████╔╝ ██████╔╝██║   ██║██║  ███╗██████╔╝███████║██████╔╝███████║ ╚████╔╝ 
 *    ██║     ╚██╔╝  ██╔═══╝ ██║   ██║██║   ██║██╔══██╗██╔══██║██╔═══╝ ██╤  ██║  ╚██╔╝  
 *    ██║      ██║   ██║     ╚██████╔╝╚██████╔╝██║  ██║██║  ██║██║     ██║  ██║   ██║   
 *    ╚═╝      ╚═╝   ╚═╝      ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝   ╚═╝   
 * Typography Demo - CaseOS Inter Variable Font System
 */

"use client";

import { useState } from "react";

export default function TypographyDemo() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const fontWeights = [
    { name: "Thin", value: "100", class: "font-thin" },
    { name: "Extra Light", value: "200", class: "font-extralight" },
    { name: "Light", value: "300", class: "font-light" },
    { name: "Normal", value: "400", class: "font-normal" },
    { name: "Medium", value: "500", class: "font-medium" },
    { name: "Semibold", value: "600", class: "font-semibold" },
    { name: "Bold", value: "700", class: "font-bold" },
    { name: "Extra Bold", value: "800", class: "font-extrabold" },
    { name: "Black", value: "900", class: "font-black" },
  ];

  const fontSizes = [
    { name: "2XS", value: "0.6875rem", class: "text-2xs" },
    { name: "XS", value: "0.75rem", class: "text-xs" },
    { name: "SM", value: "0.8125rem", class: "text-sm" },
    { name: "Base", value: "0.875rem", class: "text-base" },
    { name: "MD", value: "0.9375rem", class: "text-md" },
    { name: "LG", value: "1rem", class: "text-lg" },
    { name: "XL", value: "1.125rem", class: "text-xl" },
    { name: "2XL", value: "1.25rem", class: "text-2xl" },
    { name: "3XL", value: "1.5rem", class: "text-3xl" },
    { name: "4XL", value: "1.875rem", class: "text-4xl" },
  ];

  const sampleText = "CaseOS™ empowers self-represented litigants with AI-powered legal assistance";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark' : ''}`} style={{
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text-primary)'
    }}>
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="typography-heading text-4xl mb-2">Inter Variable Font System</h1>
            <p className="typography-body text-lg" style={{ color: 'var(--color-text-secondary)' }}>
              Premium typography for CaseOS™ platform
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg border transition-all duration-200 typography-interactive"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-primary)'
            }}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Typography Classes Demo */}
        <section className="mb-16">
          <h2 className="typography-heading text-2xl mb-8">Typography Classes</h2>
          <div className="grid gap-6">
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <h3 className="typography-brand text-lg mb-4">Brand Typography (Hover me!)</h3>
              <p className="typography-body mb-4">
                This is body text using the typography-body class. It uses normal weight and optimal line height for reading.
              </p>
              <p className="typography-caption text-sm">
                Caption text with typography-caption class - perfect for metadata and secondary information.
              </p>
              <p className="typography-interactive text-base mt-4 cursor-pointer">
                Interactive text - hover to see smooth font weight transition!
              </p>
            </div>
          </div>
        </section>

        {/* Font Weight Showcase */}
        <section className="mb-16">
          <h2 className="typography-heading text-2xl mb-8">Font Weight Range (100-900)</h2>
          <div className="grid gap-4">
            {fontWeights.map((weight) => (
              <div
                key={weight.value}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <div className="flex items-center gap-4">
                  <span className="typography-caption text-sm w-20" style={{ color: 'var(--color-text-secondary)' }}>
                    {weight.name}
                  </span>
                  <span className="typography-caption text-sm w-12" style={{ color: 'var(--color-text-tertiary)' }}>
                    {weight.value}
                  </span>
                </div>
                <div
                  className="text-lg transition-all duration-200"
                  style={{ fontWeight: weight.value }}
                >
                  {sampleText}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Font Size Scale */}
        <section className="mb-16">
          <h2 className="typography-heading text-2xl mb-8">Font Size Scale</h2>
          <div className="grid gap-4">
            {fontSizes.map((size) => (
              <div
                key={size.name}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <div className="flex items-center gap-4">
                  <span className="typography-caption text-sm w-16" style={{ color: 'var(--color-text-secondary)' }}>
                    {size.name}
                  </span>
                  <span className="typography-caption text-sm w-20" style={{ color: 'var(--color-text-tertiary)' }}>
                    {size.value}
                  </span>
                </div>
                <div
                  className="transition-all duration-200"
                  style={{ fontSize: size.value, fontWeight: 'var(--font-weight-medium)' }}
                >
                  Legal Technology Revolution
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography in Context */}
        <section className="mb-16">
          <h2 className="typography-heading text-2xl mb-8">Typography in Legal Context</h2>
          <div className="p-8 rounded-xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <h1 className="typography-heading text-4xl mb-4">Case Management System</h1>
            <p className="typography-body text-lg mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              Professional legal document management for self-represented litigants
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="typography-heading text-xl mb-4">Document Analysis</h3>
                <p className="typography-body mb-4">
                  Our AI-powered system analyzes legal documents with precision, extracting key information 
                  and identifying critical deadlines that matter most to your case.
                </p>
                <ul className="space-y-2">
                  <li className="typography-body flex items-center gap-2">
                    <span style={{ color: 'var(--color-success)' }}>✓</span>
                    Automated deadline tracking
                  </li>
                  <li className="typography-body flex items-center gap-2">
                    <span style={{ color: 'var(--color-success)' }}>✓</span>
                    Key term identification
                  </li>
                  <li className="typography-body flex items-center gap-2">
                    <span style={{ color: 'var(--color-success)' }}>✓</span>
                    Risk assessment analysis
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="typography-heading text-xl mb-4">Case Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                    <div>
                      <p className="typography-body font-medium">Initial Filing</p>
                      <p className="typography-caption" style={{ color: 'var(--color-text-secondary)' }}>
                        Case documents submitted to court system
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: 'var(--color-warning)' }}></div>
                    <div>
                      <p className="typography-body font-medium">Discovery Phase</p>
                      <p className="typography-caption" style={{ color: 'var(--color-text-secondary)' }}>
                        Evidence gathering and document exchange
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Font Features */}
        <section className="mb-16">
          <h2 className="typography-heading text-2xl mb-8">Typography Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <h3 className="typography-heading text-lg mb-4">Ligatures & Contextual Alternates</h3>
              <div className="space-y-2 text-lg">
                <p>fi fl ff ffi ffl → Automatic ligatures</p>
                <p>→ ← ↑ ↓ → Contextual alternates</p>
                <p>123 456 789 → Tabular numbers</p>
              </div>
            </div>
            
            <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <h3 className="typography-heading text-lg mb-4">Letter Spacing</h3>
              <div className="space-y-3">
                <p style={{ letterSpacing: 'var(--letter-spacing-tighter)' }}>Tighter spacing for headings</p>
                <p style={{ letterSpacing: 'var(--letter-spacing-normal)' }}>Normal spacing for body text</p>
                <p style={{ letterSpacing: 'var(--letter-spacing-wide)' }}>Wide spacing for captions</p>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="mb-16">
          <h2 className="typography-heading text-2xl mb-8">Performance Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl text-center" style={{ backgroundColor: 'var(--color-success-background)', border: '1px solid var(--color-success)' }}>
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--color-success)' }}>
                &lt;50ms
              </div>
              <p className="typography-caption" style={{ color: 'var(--color-success)' }}>
                Font Load Time
              </p>
            </div>
            
            <div className="p-6 rounded-xl text-center" style={{ backgroundColor: 'var(--color-info-background)', border: '1px solid var(--color-info)' }}>
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--color-info)' }}>
                Variable
              </div>
              <p className="typography-caption" style={{ color: 'var(--color-info)' }}>
                Font Technology
              </p>
            </div>
            
            <div className="p-6 rounded-xl text-center" style={{ backgroundColor: 'var(--color-warning-background)', border: '1px solid var(--color-warning)' }}>
              <div className="text-3xl font-bold mb-2" style={{ color: 'var(--color-warning)' }}>
                100-900
              </div>
              <p className="typography-caption" style={{ color: 'var(--color-warning)' }}>
                Weight Range
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <p className="typography-caption" style={{ color: 'var(--color-text-tertiary)' }}>
            CaseOS™ Typography System - Built with Inter Variable Font for premium user experience
          </p>
        </footer>
      </div>
    </div>
  );
}