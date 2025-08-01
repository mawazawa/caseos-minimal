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
import { useCommandPalette } from './components/command-palette-provider';
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
import { AppLayout, PageHeader, PageContent } from './components/layout/app-layout';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';

// Replace mock data sections with Prisma queries
// Add Suspense and error boundaries
// Ensure DRY by extracting fetch functions

export default function Dashboard() {
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
                    0
                  </p>
                  <p className="text-[var(--color-text-tertiary)] text-[var(--font-size-xs)] font-medium mt-1">
                    Get started by creating your first case
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
                    0
                  </p>
                  <p className="text-[var(--color-text-tertiary)] text-[var(--font-size-xs)] font-medium mt-1">
                    No upcoming events scheduled
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
                    0
                  </p>
                  <p className="text-[var(--color-text-tertiary)] text-[var(--font-size-xs)] font-medium mt-1">
                    Upload your legal documents
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
                    AI Conversations
                  </p>
                  <p className="text-[var(--color-text-primary)] text-[var(--font-size-2xl)] font-semibold mt-1">
                    0
                  </p>
                  <p className="text-[var(--color-text-tertiary)] text-[var(--font-size-xs)] font-medium mt-1">
                    Start chatting with AI legal assistant
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
              <CardContent className="px-6 py-12">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[var(--color-text-tertiary)]" />
                  </div>
                  <h3 className="text-[var(--color-text-primary)] font-medium mb-2">
                    No cases yet
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] mb-6 max-w-sm mx-auto">
                    Create your first case to start organizing your legal matters and get AI-powered assistance.
                  </p>
                  <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>
                    Create First Case
                  </Button>
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
              <CardContent className="px-6 py-8">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[var(--color-text-tertiary)]" />
                  </div>
                  <h3 className="text-[var(--color-text-primary)] font-medium mb-1 text-sm">
                    No upcoming events
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-xs mb-4">
                    Schedule court dates, deadlines, and meetings
                  </p>
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
