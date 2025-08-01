/*
 *  ██████╗ █████╗ ██╗     ███████╗███╗   ██╗██████╗  █████╗ ██████╗ 
 * ██╔════╝██╔══██╗██║     ██╔════╝████╗  ██║██╔══██╗██╔══██╗██╔══██╗
 * ██║     ███████║██║     █████╗  ██╔██╗ ██║██║  ██║███████║██████╔╝
 * ██║     ██╔══██║██║     ██╔══╝  ██║╚██╗██║██║  ██║██╔══██║██╔══██╗
 * ╚██████╗██║  ██║███████╗███████╗██║ ╚████║██████╔╝██║  ██║██║  ██║
 *  ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
 * Calendar Page - CaseOS Legal AI Platform
 */

import { Calendar, Plus } from 'lucide-react';
import { AppLayout, PageHeader, PageContent } from '../components/layout/app-layout';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export default function CalendarPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Calendar"
        description="Track important dates, deadlines, and court appearances"
        actions={
          <Button variant="primary" size="sm" leftIcon={<Plus size={14} />}>
            Add Event
          </Button>
        }
      />

      <PageContent>
        <Card variant="elevated" padding="none">
          <CardContent className="px-6 py-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-background-secondary)] flex items-center justify-center">
                <Calendar className="w-8 h-8 text-[var(--color-text-tertiary)]" />
              </div>
              <h3 className="text-[var(--color-text-primary)] font-semibold text-lg mb-2">
                No events scheduled
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm mb-6 max-w-sm mx-auto">
                Add important dates like court hearings, filing deadlines, and appointments to stay organized.
              </p>
              <Button variant="primary" size="md" leftIcon={<Plus size={16} />}>
                Add Your First Event
              </Button>
            </div>
          </CardContent>
        </Card>
      </PageContent>
    </AppLayout>
  );
}