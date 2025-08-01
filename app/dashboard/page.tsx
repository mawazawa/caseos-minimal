/*
 * ██████╗  █████╗ ███████╗██╗  ██╗██████╗  ██████╗  █████╗ ██████╗ ██████╗
 * ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
 * ██║  ██║███████║███████╗███████║██████╔╝██║   ██║███████║██████╔╝██║  ██║
 * ██║  ██║██╔══██║╚════██║██╔══██║██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
 * ██████╔╝██║  ██║███████║██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝
 * Dashboard Page - CaseOS Linear-inspired Design System
 */

'use client';

import { useRouter } from 'next/navigation';
import { useCommandPalette } from '../components/command-palette-provider';
import {
  FileText,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Plus,
  Search,
  Filter,
} from 'lucide-react';
import { AppLayout, PageHeader, PageContent } from '../components/layout/app-layout';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';

// Replace mock data sections with Prisma queries
// Add Suspense and error boundaries
// Ensure DRY by extracting fetch functions

export default function DashboardPage() {
  const router = useRouter();
  const { open: openCommandPalette } = useCommandPalette();

  // Action handlers for dashboard buttons
  const handleSearch = () => {
    console.log('🔍 Opening search...');
    openCommandPalette();
  };

  const handleFilter = () => {
    console.log('🔽 Opening filter options...');
    // TODO: Implement filter functionality
    // Could open a filter modal or sidebar
  };

  const handleNewCase = () => {
    console.log('🆕 Creating new case...');
    router.push('/cases/new');
  };

  return (
    <AppLayout>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your legal matters."
        actions={
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Search size={14} />}
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Filter size={14} />}
              onClick={handleFilter}
            >
              Filter
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus size={14} />}
              onClick={handleNewCase}
            >
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
                    1
                  </p>
                  <p className="text-[var(--color-text-tertiary)] text-[var(--font-size-xs)] font-medium mt-1">
                    Divorce proceeding in progress
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
                    3
                  </p>
                  <p className="text-[var(--color-text-tertiary)] text-[var(--font-size-xs)] font-medium mt-1">
                    Next: Mediation on Feb 15
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
                    Documents
                  </p>
                  <p className="text-[var(--color-text-primary)] text-[var(--font-size-2xl)] font-semibold mt-1">
                    24
                  </p>
                  <p className="text-[var(--color-text-tertiary)] text-[var(--font-size-xs)] font-medium mt-1">
                    Financial disclosures, petitions
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
                    Hours Saved
                  </p>
                  <p className="text-[var(--color-text-primary)] text-[var(--font-size-2xl)] font-semibold mt-1">
                    47
                  </p>
                  <p className="text-[var(--color-text-tertiary)] text-[var(--font-size-xs)] font-medium mt-1">
                    Time saved with AI assistance
                  </p>
                </div>
                <div className="text-[var(--color-accent)] flex-shrink-0">
                  <Clock size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card variant="elevated" padding="lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--color-background-secondary)] transition-colors">
                  <div className="w-2 h-2 bg-[var(--color-success)] rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-[var(--color-text-primary)] text-sm font-medium">
                      Financial disclosure form submitted
                    </p>
                    <p className="text-[var(--color-text-tertiary)] text-xs mt-1">
                      2 hours ago • Case #DIV-2024-001
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--color-background-secondary)] transition-colors">
                  <div className="w-2 h-2 bg-[var(--color-info)] rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-[var(--color-text-primary)] text-sm font-medium">
                      Mediation session scheduled
                    </p>
                    <p className="text-[var(--color-text-tertiary)] text-xs mt-1">
                      Yesterday • February 15, 2025 at 2:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--color-background-secondary)] transition-colors">
                  <div className="w-2 h-2 bg-[var(--color-warning)] rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-[var(--color-text-primary)] text-sm font-medium">
                      Custody evaluation report received
                    </p>
                    <p className="text-[var(--color-text-tertiary)] text-xs mt-1">
                      3 days ago • Review required
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--color-background-secondary)] transition-colors">
                  <div className="w-2 h-2 bg-[var(--color-success)] rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-[var(--color-text-primary)] text-sm font-medium">
                      Parenting plan draft uploaded
                    </p>
                    <p className="text-[var(--color-text-tertiary)] text-xs mt-1">
                      5 days ago • Awaiting review
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card variant="elevated" padding="lg">
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-[var(--color-warning-background)] border border-[var(--color-warning)]/20 rounded-xl">
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                    ⚠️ Upcoming Deadline: Asset Declaration
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-3">
                    Your Schedule of Assets and Debts (FL-142) is due by February 28. Consider reviewing with AI assistance to ensure completeness.
                  </p>
                  <Button variant="secondary" size="sm">
                    Start Declaration
                  </Button>
                </div>
                <div className="p-4 bg-[var(--color-info-background)] border border-[var(--color-info)]/20 rounded-xl">
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                    💡 Mediation Preparation Tips
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-3">
                    Your mediation is in 2 weeks. Review our AI-powered checklist to prepare your position on custody, support, and asset division.
                  </p>
                  <Button variant="secondary" size="sm">
                    Prepare for Mediation
                  </Button>
                </div>
                <div className="p-4 bg-[var(--color-success-background)] border border-[var(--color-success)]/20 rounded-xl">
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-2">
                    ✓ Child Support Calculator
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-3">
                    Based on your financial disclosures, estimate potential child support obligations using California guidelines.
                  </p>
                  <Button variant="secondary" size="sm">
                    Calculate Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legal News & Updates */}
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <CardTitle>Legal News & Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="h-32 bg-[var(--color-background-secondary)] rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-[var(--color-text-tertiary)]" />
                </div>
                <h4 className="font-semibold text-[var(--color-text-primary)]">
                  California FL-300 Updates
                </h4>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  New requirements for Request for Order forms effective January 2025.
                </p>
                <Button variant="secondary" size="sm">
                  Read More
                </Button>
              </div>
              <div className="space-y-3">
                <div className="h-32 bg-[var(--color-background-secondary)] rounded-xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-[var(--color-text-tertiary)]" />
                </div>
                <h4 className="font-semibold text-[var(--color-text-primary)]">
                  Divorce Mediation Success
                </h4>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  How to prepare for productive mediation sessions and reach agreements.
                </p>
                <Button variant="secondary" size="sm">
                  Read More
                </Button>
              </div>
              <div className="space-y-3">
                <div className="h-32 bg-[var(--color-background-secondary)] rounded-xl flex items-center justify-center">
                  <FileText className="w-8 h-8 text-[var(--color-text-tertiary)]" />
                </div>
                <h4 className="font-semibold text-[var(--color-text-primary)]">
                  Custody Evaluation Guide
                </h4>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  What to expect during custody evaluations and how to prepare.
                </p>
                <Button variant="secondary" size="sm">
                  Read More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </AppLayout>
  );
}