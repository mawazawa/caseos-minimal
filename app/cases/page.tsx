/*
 *  ██████╗ █████╗ ███████╗███████╗███████╗
 * ██╔════╝██╔══██╗██╔════╝██╔════╝██╔════╝
 * ██║     ███████║███████╗█████╗  ███████╗
 * ██║     ██╔══██║╚════██║██╔══╝  ╚════██║
 * ╚██████╗██║  ██║███████║███████╗███████║
 *  ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
 * Cases Page - CaseOS Legal AI Platform
 */

'use client';

import { useRouter } from 'next/navigation';
import { useCommandPalette } from '../components/command-palette-provider';
import { FileText, Plus, Search, Filter, Calendar, Clock, AlertCircle, CheckCircle, Users } from 'lucide-react';
import { AppLayout, PageHeader, PageContent } from '../components/layout/app-layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function CasesPage() {
  const router = useRouter();
  const { open: openCommandPalette } = useCommandPalette();

  // Action handlers
  const handleSearch = () => {
    console.log('🔍 Opening search...');
    openCommandPalette();
  };

  const handleFilter = () => {
    console.log('🔽 Opening filter options...');
    // TODO: Implement filter functionality
  };

  const handleNewCase = () => {
    console.log('🆕 Creating new case...');
    router.push('/cases/new');
  };

  return (
    <AppLayout>
      <PageHeader
        title="My Cases"
        description="Manage your legal cases and documents"
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
        {/* Active Case */}
        <Card variant="elevated" padding="none" className="mb-6">
          <CardHeader className="border-b border-[var(--color-border)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[var(--color-warning)] rounded-full animate-pulse"></div>
                <CardTitle>Wauters v. Wauters - Divorce Proceeding</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-[var(--color-warning-background)] text-[var(--color-warning)] text-xs font-medium rounded-lg">
                  Active
                </span>
                <span className="px-3 py-1 bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] text-xs font-medium rounded-lg">
                  Case #DIV-2024-001
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Case Info Cards */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)] text-sm">
                  <Calendar size={14} />
                  <span>Filed Date</span>
                </div>
                <p className="text-[var(--color-text-primary)] font-medium">January 15, 2024</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)] text-sm">
                  <Users size={14} />
                  <span>Parties</span>
                </div>
                <p className="text-[var(--color-text-primary)] font-medium">Mathieu W. vs. Sarah W.</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)] text-sm">
                  <AlertCircle size={14} />
                  <span>Next Deadline</span>
                </div>
                <p className="text-[var(--color-text-primary)] font-medium">Feb 28 - Asset Declaration</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--color-text-secondary)] text-sm">
                  <Clock size={14} />
                  <span>Duration</span>
                </div>
                <p className="text-[var(--color-text-primary)] font-medium">13 months</p>
              </div>
            </div>

            {/* Key Issues */}
            <div className="mb-6">
              <h4 className="text-[var(--color-text-primary)] font-semibold text-sm mb-3">Key Issues</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-[var(--color-info-background)] text-[var(--color-info)] text-xs font-medium rounded-lg">
                  Child Custody (50/50 proposed)
                </span>
                <span className="px-3 py-1 bg-[var(--color-info-background)] text-[var(--color-info)] text-xs font-medium rounded-lg">
                  Child Support
                </span>
                <span className="px-3 py-1 bg-[var(--color-info-background)] text-[var(--color-info)] text-xs font-medium rounded-lg">
                  Property Division (House, 401k)
                </span>
                <span className="px-3 py-1 bg-[var(--color-info-background)] text-[var(--color-info)] text-xs font-medium rounded-lg">
                  Spousal Support
                </span>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="mb-6">
              <h4 className="text-[var(--color-text-primary)] font-semibold text-sm mb-3">Recent Activity</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <CheckCircle size={14} className="text-[var(--color-success)]" />
                  <span className="text-[var(--color-text-secondary)] text-sm">Financial disclosure submitted - 2 hours ago</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={14} className="text-[var(--color-info)]" />
                  <span className="text-[var(--color-text-secondary)] text-sm">Mediation scheduled for Feb 15 - Yesterday</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText size={14} className="text-[var(--color-warning)]" />
                  <span className="text-[var(--color-text-secondary)] text-sm">Custody evaluation report received - 3 days ago</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button variant="primary" size="sm" onClick={() => router.push('/cases/DIV-2024-001')}>
                View Case Details
              </Button>
              <Button variant="secondary" size="sm" leftIcon={<FileText size={14} />}>
                Documents (24)
              </Button>
              <Button variant="secondary" size="sm" leftIcon={<Calendar size={14} />}>
                Timeline
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Other Cases Section */}
        <div className="mb-4">
          <h3 className="text-[var(--color-text-primary)] font-semibold text-lg">Other Cases</h3>
          <p className="text-[var(--color-text-secondary)] text-sm">No other cases at this time</p>
        </div>
      </PageContent>
    </AppLayout>
  );
}