/*
 * ██████╗  █████╗ ███████╗██╗  ██╗██████╗  ██████╗  █████╗ ██████╗ ██████╗ 
 * ██╔══██╗██╔══██╗██╔════╝██║  ██║██╔══██╗██╔═══██╗██╔══██╗██╔══██╗██╔══██╗
 * ██║  ██║███████║███████╗███████║██████╔╝██║   ██║███████║██████╔╝██║  ██║
 * ██║  ██║██╔══██║╚════██║██╔══██║██╔══██╗██║   ██║██╔══██║██╔══██╗██║  ██║
 * ██████╔╝██║  ██║███████║██║  ██║██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
 * ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ 
 * Dashboard with Loading States - Example Implementation
 */

'use client';

import { useState, useEffect } from 'react';
import { AppLayout, PageHeader, PageContent } from './components/layout/app-layout';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/card';
import { SkeletonCard, SkeletonTableRow } from './components/ui/skeleton';
import {
  FileText,
  Calendar,
  Clock,
  TrendingUp,
  Plus,
  Search,
  Filter,
} from 'lucide-react';

// Simulate data fetching with loading states
function useDashboardData() {
  const [stats, setStats] = useState(null);
  const [cases, setCases] = useState(null);
  const [events, setEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls with different loading times
    const loadData = async () => {
      setIsLoading(true);
      
      // Load stats
      setTimeout(() => {
        setStats([
          { label: 'Active Cases', value: 3, change: '+1 this month', icon: FileText },
          { label: 'Upcoming Events', value: 2, change: 'Next: Jan 12', icon: Calendar },
          { label: 'Response Time', value: '2.3 days', change: '15% faster', icon: Clock },
          { label: 'Success Rate', value: '89%', change: '+5% this year', icon: TrendingUp },
        ]);
      }, 800);

      // Load cases
      setTimeout(() => {
        setCases([
          { id: 1, title: 'Landlord Dispute - Security Deposit', priority: 'high', status: 'Submit response', time: '2 hours ago' },
          { id: 2, title: 'Small Claims - Invoice Payment', priority: 'medium', status: 'Wait for court date', time: '1 day ago' },
          { id: 3, title: 'Employment Issue - Wage Dispute', priority: 'low', status: 'Case closed', time: '1 week ago' },
        ]);
      }, 1200);

      // Load events
      setTimeout(() => {
        setEvents([
          { id: 1, title: 'Court Hearing - Case #2024-001', date: 'Jan 15, 2025 at 9:00 AM', location: 'Superior Court Room 4A' },
          { id: 2, title: 'Document Deadline - Discovery', date: 'Jan 12, 2025 at 5:00 PM', location: 'File electronically' },
        ]);
        setIsLoading(false);
      }, 1500);
    };

    loadData();
  }, []);

  return { stats, cases, events, isLoading };
}

export default function DashboardWithLoading() {
  const { stats, cases, events, isLoading } = useDashboardData();

  return (
    <AppLayout>
      <PageHeader 
        title="Dashboard" 
        description="Welcome back! Here's an overview of your legal matters."
      >
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            <Search size={14} />
            Search
          </Button>
          <Button variant="secondary" size="sm">
            <Filter size={14} />
            Filter
          </Button>
          <Button size="sm">
            <Plus size={14} />
            New Case
          </Button>
        </div>
      </PageHeader>

      <PageContent>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats ? (
            stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] font-medium">
                        {stat.label}
                      </p>
                      <p className="text-[var(--color-text-primary)] text-[var(--font-size-2xl)] font-semibold mt-1">
                        {stat.value}
                      </p>
                      <p className="text-[var(--color-accent)] text-[var(--font-size-xs)] font-medium mt-1">
                        {stat.change}
                      </p>
                    </div>
                    <div className="text-[var(--color-accent)] flex-shrink-0">
                      <stat.icon size={20} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Cases */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Cases</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-0">
                  {cases ? (
                    cases.map((case_) => (
                      <div
                        key={case_.id}
                        className="px-6 py-4 hover:bg-[var(--color-background-secondary)] transition-colors duration-200 cursor-pointer border-b border-[var(--color-border)] last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3">
                              <h4 className="text-[var(--color-text-primary)] font-medium text-[var(--font-size-base)] truncate">
                                {case_.title}
                              </h4>
                              <span className={`
                                px-2 py-0.5 rounded-full text-[var(--font-size-xs)] font-medium
                                ${case_.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' : ''}
                                ${case_.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' : ''}
                                ${case_.priority === 'low' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : ''}
                              `}>
                                {case_.priority}
                              </span>
                            </div>
                            <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)] mt-1">
                              {case_.status} • {case_.time}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            •••
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    Array.from({ length: 3 }).map((_, i) => (
                      <SkeletonTableRow key={i} columns={3} />
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-0">
                  {events ? (
                    <>
                      {events.map((event) => (
                        <div
                          key={event.id}
                          className="px-6 py-4 hover:bg-[var(--color-background-secondary)] transition-colors duration-200 cursor-pointer border-b border-[var(--color-border)] last:border-b-0"
                        >
                          <h4 className="text-[var(--color-text-primary)] font-medium text-[var(--font-size-base)] leading-tight">
                            {event.title}
                          </h4>
                          <div className="mt-2 space-y-1">
                            <p className="text-[var(--color-text-secondary)] text-[var(--font-size-sm)]">
                              {event.date}
                            </p>
                            <p className="text-[var(--color-text-tertiary)] text-[var(--font-size-sm)]">
                              {event.location}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div className="px-6 py-4">
                        <Button variant="ghost" size="sm" className="w-full">
                          <Plus size={14} />
                          Add Event
                        </Button>
                      </div>
                    </>
                  ) : (
                    Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="px-6 py-4 border-b border-[var(--color-border)] last:border-b-0">
                        <SkeletonTableRow columns={1} />
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContent>
    </AppLayout>
  );
}