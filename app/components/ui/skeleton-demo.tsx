/*
 * ███████╗██╗  ██╗███████╗██╗     ███████╗████████╗ ██████╗ ███╗   ██╗
 * ██╔════╝██║ ██╔╝██╔════╝██║     ██╔════╝╚══██╔══╝██╔═══██╗████╗  ██║
 * ███████╗█████╔╝ █████╗  ██║     █████╗     ██║   ██║   ██║██╔██╗ ██║
 * ╚════██║██╔═██╗ ██╔══╝  ██║     ██╔══╝     ██║   ██║   ██║██║╚██╗██║
 * ███████║██║  ██╗███████╗███████╗███████╗   ██║   ╚██████╔╝██║ ╚████║
 * ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
 * Skeleton Demo - Showcasing Loading States
 */

'use client';

import { useState } from 'react';
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonTableRow,
  SkeletonListItem,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonForm,
} from './skeleton';
import { Button } from './button';

export function SkeletonDemo() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Skeleton Components</h2>
        <Button
          onClick={() => setShowContent(!showContent)}
          variant="secondary"
          size="sm"
        >
          {showContent ? 'Show Skeletons' : 'Show Content'}
        </Button>
      </div>

      {/* Basic Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic Skeleton</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {showContent ? (
            <>
              <div className="h-10 bg-blue-500 rounded-md" />
              <div className="h-10 bg-green-500 rounded-md" />
              <div className="h-10 bg-purple-500 rounded-md" />
            </>
          ) : (
            <>
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </>
          )}
        </div>
      </section>

      {/* Text Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Text Skeleton</h3>
        {showContent ? (
          <p className="text-[var(--color-text-secondary)] max-w-2xl">
            This is a paragraph of text that would normally load from an API.
            It demonstrates how text content appears when fully loaded.
            The skeleton provides a smooth loading experience.
          </p>
        ) : (
          <SkeletonText lines={3} className="max-w-2xl" />
        )}
      </section>

      {/* Card Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Card Skeleton</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {showContent ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[var(--radius-lg)] p-4 bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--color-text-secondary)]">Active Cases</p>
                    <p className="text-2xl font-semibold mt-1">24</p>
                    <p className="text-xs text-[var(--color-accent)] mt-1">+12% this month</p>
                  </div>
                  <div className="h-5 w-5 bg-[var(--color-accent)] rounded-full" />
                </div>
              </div>
            ))
          ) : (
            Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          )}
        </div>
      </section>

      {/* Table Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Table Skeleton</h3>
        <div className="rounded-[var(--radius-lg)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] overflow-hidden">
          {showContent ? (
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-6 py-4 border-b border-[var(--color-border)] last:border-b-0">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Case #{2024000 + i}</span>
                    <span className="text-sm text-[var(--color-text-secondary)]">In Progress</span>
                    <span className="text-sm">John Doe</span>
                    <span className="text-sm text-[var(--color-text-tertiary)] flex-1 text-right">
                      2 hours ago
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonTableRow key={i} columns={4} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Avatar Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Avatar Skeleton</h3>
        <div className="flex items-center gap-4">
          {showContent ? (
            <>
              <div className="h-6 w-6 bg-[var(--color-accent)] rounded-full" />
              <div className="h-8 w-8 bg-[var(--color-accent)] rounded-full" />
              <div className="h-10 w-10 bg-[var(--color-accent)] rounded-full" />
            </>
          ) : (
            <>
              <SkeletonAvatar size="sm" />
              <SkeletonAvatar size="md" />
              <SkeletonAvatar size="lg" />
            </>
          )}
        </div>
      </section>

      {/* Button Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Button Skeleton</h3>
        <div className="flex items-center gap-4">
          {showContent ? (
            <>
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
            </>
          ) : (
            <>
              <SkeletonButton size="sm" />
              <SkeletonButton />
              <SkeletonButton size="lg" />
            </>
          )}
        </div>
      </section>

      {/* List Item Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">List Item Skeleton</h3>
        <div className="w-64 rounded-[var(--radius-lg)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] p-2">
          {showContent ? (
            <div className="space-y-1">
              {['Dashboard', 'Cases', 'Calendar', 'Contacts'].map((item) => (
                <div key={item} className="flex items-center gap-3 px-2 py-1.5">
                  <div className="h-4 w-4 bg-[var(--color-text-secondary)]" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonListItem key={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Form Skeleton */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Form Skeleton</h3>
        <div className="max-w-md">
          {showContent ? (
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full h-10 px-3 rounded-[var(--radius-md)] border border-[var(--color-border)]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full h-10 px-3 rounded-[var(--radius-md)] border border-[var(--color-border)]"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  className="w-full h-10 px-3 rounded-[var(--radius-md)] border border-[var(--color-border)]"
                  placeholder="Your message..."
                />
              </div>
              <div className="flex gap-3">
                <Button>Submit</Button>
                <Button variant="secondary" size="sm">Cancel</Button>
              </div>
            </form>
          ) : (
            <SkeletonForm />
          )}
        </div>
      </section>
    </div>
  );
}