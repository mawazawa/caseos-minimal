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
import { FileText, Plus, Search, Filter } from 'lucide-react';
import { AppLayout, PageHeader, PageContent } from '../components/layout/app-layout';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

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
        <Card variant="elevated" padding="none">
          <CardContent className="px-6 py-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center">
                <FileText className="w-8 h-8 text-[var(--color-text-tertiary)]" />
              </div>
              <h3 className="text-[var(--color-text-primary)] font-semibold text-lg mb-2">
                No cases yet
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-6 max-w-sm mx-auto">
                Create your first case to start organizing your legal matters and get AI-powered assistance.
              </p>
              <Button
                variant="primary"
                size="md"
                leftIcon={<Plus size={16} />}
                onClick={handleNewCase}
              >
                Create Your First Case
              </Button>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </AppLayout>
  );
}