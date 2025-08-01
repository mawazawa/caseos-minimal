/*
 *  ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗  ██████╗████████╗███████╗
 * ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔════╝╚══██╔══╝██╔════╝
 * ██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║        ██║   ███████╗
 * ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║        ██║   ╚════██║
 * ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║╚██████╗   ██║   ███████║
 *  ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚══════╝
 * Contacts Page - CaseOS Legal AI Platform
 */

import { Users, Plus, Search } from 'lucide-react';
import { AppLayout, PageHeader, PageContent } from '../components/layout/app-layout';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function ContactsPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Contacts"
        description="Manage your legal contacts and professionals"
        actions={
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" leftIcon={<Search size={14} />}>
              Search
            </Button>
            <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>
              Add Contact
            </Button>
          </div>
        }
      />

      <PageContent>
        <Card variant="elevated" padding="none">
          <CardContent className="px-6 py-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center">
                <Users className="w-8 h-8 text-[var(--color-text-tertiary)]" />
              </div>
              <h3 className="text-[var(--color-text-primary)] font-semibold text-lg mb-2">
                No contacts yet
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-6 max-w-sm mx-auto">
                Add lawyers, court clerks, witnesses, and other important contacts to keep them organized.
              </p>
              <Button variant="primary" size="md" leftIcon={<Plus size={16} />}>
                Add Your First Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </AppLayout>
  );
}