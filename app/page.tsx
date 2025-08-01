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

// Mock data for dashboard
const recentCases = [
  {
    id: '1',
    title: 'Landlord Dispute - Security Deposit',
    status: 'active',
    lastActivity: '2 hours ago',
    nextAction: 'Submit response',
    priority: 'high',
  },
  {
    id: '2', 
    title: 'Small Claims - Invoice Payment',
    status: 'waiting',
    lastActivity: '1 day ago',
    nextAction: 'Wait for court date',
    priority: 'medium',
  },
  {
    id: '3',
    title: 'Employment Issue - Wage Dispute',
    status: 'completed',
    lastActivity: '1 week ago', 
    nextAction: 'Case closed',
    priority: 'low',
  },
];

const upcomingEvents = [
  {
    id: '1',
    title: 'Court Hearing - Case #2024-001',
    date: 'Jan 15, 2025',
    time: '9:00 AM',
    location: 'Superior Court Room 4A',
  },
  {
    id: '2',
    title: 'Document Deadline - Discovery',
    date: 'Jan 12, 2025', 
    time: '5:00 PM',
    location: 'File electronically',
  },
];

const stats = [
  {
    label: 'Active Cases',
    value: '3',
    trend: '+1 this month',
    icon: <FileText size={20} />,
  },
  {
    label: 'Upcoming Events',
    value: '2',
    trend: 'Next: Jan 12',
    icon: <Calendar size={20} />,
  },
  {
    label: 'Response Time',
    value: '2.3 days',
    trend: '15% faster',
    icon: <Clock size={20} />,
  },
  {
    label: 'Success Rate',
    value: '89%',
    trend: '+5% this year',
    icon: <TrendingUp size={20} />,
  },
];

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
          {stats.map((stat) => (
            <Card key={stat.label} variant="elevated" padding="md">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] font-medium">
                      {stat.label}
                    </p>
                    <p className="text-[var(--color-text-primary)] text-[var(--font-size-2xl)] font-semibold mt-1">
                      {stat.value}
                    </p>
                    <p className="text-[var(--color-accent)] text-[var(--font-size-xs)] font-medium mt-1">
                      {stat.trend}
                    </p>
                  </div>
                  <div className="text-[var(--color-accent)] flex-shrink-0">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
                  {recentCases.map((case_) => (
                    <div 
                      key={case_.id}
                      className="px-6 py-4 hover:bg-[var(--color-background-secondary)] transition-colors duration-200 cursor-pointer border-b border-[var(--color-border)] last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-2 h-2 rounded-full flex-shrink-0
                              ${case_.status === 'active' ? 'bg-[var(--color-success)]' : 
                                case_.status === 'waiting' ? 'bg-[var(--color-warning)]' : 
                                'bg-[var(--color-text-tertiary)]'}
                            `} />
                            <h4 className="text-[var(--color-text-primary)] font-medium text-[var(--font-size-base)] truncate">
                              {case_.title}
                            </h4>
                            <span className={`
                              px-2 py-1 rounded-full text-[var(--font-size-xs)] font-medium
                              ${case_.priority === 'high' ? 'bg-[var(--color-error-background)] text-[var(--color-error)]' :
                                case_.priority === 'medium' ? 'bg-[var(--color-warning-background)] text-[var(--color-warning)]' :
                                'bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)]'}
                            `}>
                              {case_.priority}
                            </span>
                          </div>
                          <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] mt-1">
                            {case_.nextAction} • {case_.lastActivity}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
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
                  {upcomingEvents.map((event) => (
                    <div 
                      key={event.id}
                      className="px-6 py-4 hover:bg-[var(--color-background-secondary)] transition-colors duration-200 cursor-pointer border-b border-[var(--color-border)] last:border-b-0"
                    >
                      <h4 className="text-[var(--color-text-primary)] font-medium text-[var(--font-size-base)] leading-tight">
                        {event.title}
                      </h4>
                      <div className="mt-2 space-y-1">
                        <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)]">
                          {event.date} at {event.time}
                        </p>
                        <p className="text-[var(--color-text-tertiary)] text-[var(--font-size-sm)]">
                          {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
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
