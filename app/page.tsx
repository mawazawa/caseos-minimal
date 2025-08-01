/*
 * ██████╗  █████╗ ███████╗██╗  ██╗██████╗  ██████╗  █████╗ ██████╗ ██████╗
 * ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
 * ██║  ██║███████║███████╗███████║██████╔╝██║   ██║███████║██████╔╝██║  ██║
 * ██║  ██║██╔══██║╚════██║██╔══██║██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
 * ██████╔╝██║  ██║███████║██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝
 * Dashboard Page - CaseOS Linear-inspired Design System
 */

import {
  FileText,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Plus,
  Search,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { AppLayout, PageHeader, PageContent } from './components/layout/app-layout';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';

// Replace mock data sections with Prisma queries
// Add Suspense and error boundaries
// Ensure DRY by extracting fetch functions

export default function Dashboard() {
  return (
    <AppLayout>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your legal matters."
        actions={
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" leftIcon={<Search size={14} />}>
              Search
            </Button>
            <Button variant="secondary" size="sm" leftIcon={<Filter size={14} />}>
              Filter
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>
              New Case
            </Button>
          </div>
        }
      />

      <PageContent>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Replace mock data with actual queries */}
          <Card variant="elevated" padding="md">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] font-medium">
                    Active Cases
                  </p>
                  <p className="text-[var(--color-text-primary)] text-[var(--font-size-2xl)] font-semibold mt-1">
                    3
                  </p>
                  <p className="text-[var(--color-accent)] text-[var(--font-size-xs)] font-medium mt-1">
                    +1 this month
                  </p>
                </div>
                <div className="text-[var(--color-accent)] flex-shrink-0">
                  <FileText size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated" padding="md">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] font-medium">
                    Upcoming Events
                  </p>
                  <p className="text-[var(--color-text-primary)] text-[var(--font-size-2xl)] font-semibold mt-1">
                    2
                  </p>
                  <p className="text-[var(--color-accent)] text-[var(--font-size-xs)] font-medium mt-1">
                    Next: Jan 12
                  </p>
                </div>
                <div className="text-[var(--color-accent)] flex-shrink-0">
                  <Calendar size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated" padding="md">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] font-medium">
                    Response Time
                  </p>
                  <p className="text-[var(--color-text-primary)] text-[var(--font-size-2xl)] font-semibold mt-1">
                    2.3 days
                  </p>
                  <p className="text-[var(--color-accent)] text-[var(--font-size-xs)] font-medium mt-1">
                    15% faster
                  </p>
                </div>
                <div className="text-[var(--color-accent)] flex-shrink-0">
                  <Clock size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card variant="elevated" padding="md">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] font-medium">
                    Success Rate
                  </p>
                  <p className="text-[var(--color-text-primary)] text-[var(--font-size-2xl)] font-semibold mt-1">
                    89%
                  </p>
                  <p className="text-[var(--color-accent)] text-[var(--font-size-xs)] font-medium mt-1">
                    +5% this year
                  </p>
                </div>
                <div className="text-[var(--color-accent)] flex-shrink-0">
                  <TrendingUp size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Cases */}
          <div className="lg:col-span-2">
            <Card variant="elevated" padding="none">
              <CardHeader className="px-6 pt-6 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Cases</CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-0">
                  {/* Replace mock data with actual queries */}
                  <div
                    className="px-6 py-4 hover:bg-[var(--color-background-secondary)] transition-colors duration-200 cursor-pointer border-b border-[var(--color-border)] last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-2 h-2 rounded-full flex-shrink-0
                            bg-[var(--color-success)]
                          `} />
                          <h4 className="text-[var(--color-text-primary)] font-medium text-[var(--font-size-base)] truncate">
                            Landlord Dispute - Security Deposit
                          </h4>
                          <span className={`
                            px-2 py-1 rounded-full text-[var(--font-size-xs)] font-medium
                            bg-[var(--color-error-background)] text-[var(--color-error)]
                          `}>
                            high
                          </span>
                        </div>
                        <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] mt-1">
                          Submit response • 2 hours ago
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                  </div>
                  <div
                    className="px-6 py-4 hover:bg-[var(--color-background-secondary)] transition-colors duration-200 cursor-pointer border-b border-[var(--color-border)] last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-2 h-2 rounded-full flex-shrink-0
                            bg-[var(--color-warning)]
                          `} />
                          <h4 className="text-[var(--color-text-primary)] font-medium text-[var(--font-size-base)] truncate">
                            Small Claims - Invoice Payment
                          </h4>
                          <span className={`
                            px-2 py-1 rounded-full text-[var(--font-size-xs)] font-medium
                            bg-[var(--color-warning-background)] text-[var(--color-warning)]
                          `}>
                            medium
                          </span>
                        </div>
                        <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] mt-1">
                          Wait for court date • 1 day ago
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                  </div>
                  <div
                    className="px-6 py-4 hover:bg-[var(--color-background-secondary)] transition-colors duration-200 cursor-pointer border-b border-[var(--color-border)] last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-2 h-2 rounded-full flex-shrink-0
                            bg-[var(--color-text-tertiary)]
                          `} />
                          <h4 className="text-[var(--color-text-primary)] font-medium text-[var(--font-size-base)] truncate">
                            Employment Issue - Wage Dispute
                          </h4>
                          <span className={`
                            px-2 py-1 rounded-full text-[var(--font-size-xs)] font-medium
                            bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)]
                          `}>
                            low
                          </span>
                        </div>
                        <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] mt-1">
                          Case closed • 1 week ago
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div>
            <Card variant="elevated" padding="none">
              <CardHeader className="px-6 pt-6 pb-4">
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-0">
                  {/* Replace mock data with actual queries */}
                  <div
                    className="px-6 py-4 hover:bg-[var(--color-background-secondary)] transition-colors duration-200 cursor-pointer border-b border-[var(--color-border)] last:border-b-0"
                  >
                    <h4 className="text-[var(--color-text-primary)] font-medium text-[var(--font-size-base)] leading-tight">
                      Court Hearing - Case #2024-001
                    </h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)]">
                        Jan 15, 2025 at 9:00 AM
                      </p>
                      <p className="text-[var(--color-text-tertiary)] text-[var(--font-size-sm)]">
                        Superior Court Room 4A
                      </p>
                    </div>
                  </div>
                  <div
                    className="px-6 py-4 hover:bg-[var(--color-background-secondary)] transition-colors duration-200 cursor-pointer border-b border-[var(--color-border)] last:border-b-0"
                  >
                    <h4 className="text-[var(--color-text-primary)] font-medium text-[var(--font-size-base)] leading-tight">
                      Document Deadline - Discovery
                    </h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)]">
                        Jan 12, 2025 at 5:00 PM
                      </p>
                      <p className="text-[var(--color-text-tertiary)] text-[var(--font-size-sm)]">
                        File electronically
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <Button variant="ghost" size="sm" className="w-full" leftIcon={<Plus size={14} />}>
                    Add Event
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card variant="elevated" padding="md" className="mt-6">
              <CardHeader className="pb-4">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="secondary" size="sm" className="h-auto py-3 flex-col gap-2">
                    <FileText size={16} />
                    <span className="text-xs">New Case</span>
                  </Button>
                  <Button variant="secondary" size="sm" className="h-auto py-3 flex-col gap-2">
                    <Calendar size={16} />
                    <span className="text-xs">Schedule</span>
                  </Button>
                  <Button variant="secondary" size="sm" className="h-auto py-3 flex-col gap-2">
                    <Users size={16} />
                    <span className="text-xs">Contacts</span>
                  </Button>
                  <Button variant="secondary" size="sm" className="h-auto py-3 flex-col gap-2">
                    <Search size={16} />
                    <span className="text-xs">Research</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContent>
    </AppLayout>
  );
}
