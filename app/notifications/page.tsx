/*
 * ███╗   ██╗ ██████╗ ████████╗██╗███████╗██╗ ██████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗███████╗
 * ████╗  ██║██╔═══██╗╚══██╔══╝██║██╔════╝██║██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
 * ██╔██╗ ██║██║   ██║   ██║   ██║█████╗  ██║██║     ███████║   ██║   ██║██║   ██║██╔██╗ ██║███████╗
 * ██║╚██╗██║██║   ██║   ██║   ██║██╔══╝  ██║██║     ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║╚════██║
 * ██║ ╚████║╚██████╔╝   ██║   ██║██║     ██║╚██████╗██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║███████║
 * ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚═╝╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
 * Notifications Center - Stay Updated on Your Legal Matters
 */

'use client';

import { useState } from 'react';
import { AppLayout, PageHeader, PageContent } from '../components/layout/app-layout';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  Bell, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Scale,
  Settings
} from 'lucide-react';
import { clsx } from 'clsx';

interface Notification {
  id: string;
  type: 'deadline' | 'update' | 'reminder' | 'alert' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  relatedCase?: string;
  actionRequired?: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'deadline',
    title: 'Filing Deadline Approaching',
    message: 'Your response to motion in Case #2024-001 is due in 3 days.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    priority: 'high',
    relatedCase: 'Smith vs. Johnson Contract Dispute',
    actionRequired: true
  },
  {
    id: '2',
    type: 'update',
    title: 'Case Status Updated',
    message: 'Your landlord dispute case has been assigned to Judge Martinez.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    isRead: false,
    priority: 'medium',
    relatedCase: 'Tenant Rights Case #2024-002'
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Document Upload Reminder',
    message: 'Remember to upload supporting evidence for your small claims case.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    priority: 'medium',
    relatedCase: 'Small Claims Case #2024-003'
  },
  {
    id: '4',
    type: 'info',
    title: 'New Feature: AI Document Review',
    message: 'Try our new AI-powered document review feature to strengthen your case.',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isRead: true,
    priority: 'low'
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'priority'>('all');

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'deadline':
        return <Clock size={16} className="text-[var(--color-error)]" />;
      case 'update':
        return <Info size={16} className="text-[var(--color-info)]" />;
      case 'reminder':
        return <Bell size={16} className="text-[var(--color-warning)]" />;
      case 'alert':
        return <AlertTriangle size={16} className="text-[var(--color-error)]" />;
      case 'info':
        return <Info size={16} className="text-[var(--color-accent)]" />;
      default:
        return <Bell size={16} className="text-[var(--color-text-secondary)]" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-[var(--color-error)]';
      case 'medium':
        return 'text-[var(--color-warning)]';
      case 'low':
        return 'text-[var(--color-text-tertiary)]';
      default:
        return 'text-[var(--color-text-secondary)]';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread':
        return !notif.isRead;
      case 'priority':
        return notif.priority === 'high' || notif.actionRequired;
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppLayout>
      <PageHeader
        title="Notifications"
        description={`Stay updated on your legal matters. ${unreadCount} unread notifications.`}
        actions={
          <div className="flex items-center gap-3">
            <Button 
              variant="secondary" 
              size="sm" 
              leftIcon={<CheckCircle size={14} />}
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark All Read
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              leftIcon={<Settings size={14} />}
            >
              Settings
            </Button>
          </div>
        }
      />

      <PageContent>
        <div className="max-w-4xl mx-auto">
          {/* Filter Tabs */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={clsx(
                'px-4 py-2 rounded-md text-[var(--font-size-sm)] font-medium transition-colors',
                filter === 'all'
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-secondary)]'
              )}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={clsx(
                'px-4 py-2 rounded-md text-[var(--font-size-sm)] font-medium transition-colors',
                filter === 'unread'
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-secondary)]'
              )}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('priority')}
              className={clsx(
                'px-4 py-2 rounded-md text-[var(--font-size-sm)] font-medium transition-colors',
                filter === 'priority'
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-secondary)]'
              )}
            >
              Priority ({notifications.filter(n => n.priority === 'high' || n.actionRequired).length})
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card variant="elevated" padding="lg">
                <CardContent className="text-center py-8">
                  <Bell size={48} className="mx-auto mb-4 text-[var(--color-text-tertiary)]" />
                  <h3 className="text-[var(--color-text-primary)] text-[var(--font-size-lg)] font-medium mb-2">
                    No notifications
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">
                    {filter === 'all' 
                      ? "You're all caught up! No notifications to show."
                      : `No ${filter} notifications at this time.`
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  variant="elevated"
                  padding="md"
                  className={clsx(
                    'transition-all duration-200 hover:shadow-md cursor-pointer',
                    !notification.isRead && 'border-l-4 border-l-[var(--color-accent)]'
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <h4 className={clsx(
                            'text-[var(--font-size-base)] font-medium truncate',
                            notification.isRead 
                              ? 'text-[var(--color-text-secondary)]' 
                              : 'text-[var(--color-text-primary)]'
                          )}>
                            {notification.title}
                          </h4>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className={clsx(
                              'text-[var(--font-size-xs)] font-medium uppercase tracking-wide',
                              getPriorityColor(notification.priority)
                            )}>
                              {notification.priority}
                            </span>
                            <span className="text-[var(--color-text-tertiary)] text-[var(--font-size-xs)]">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                        
                        <p className={clsx(
                          'text-[var(--font-size-sm)] mb-2',
                          notification.isRead 
                            ? 'text-[var(--color-text-tertiary)]' 
                            : 'text-[var(--color-text-secondary)]'
                        )}>
                          {notification.message}
                        </p>
                        
                        {notification.relatedCase && (
                          <div className="flex items-center gap-2 mb-2">
                            <Scale size={12} className="text-[var(--color-text-tertiary)]" />
                            <span className="text-[var(--color-text-tertiary)] text-[var(--font-size-xs)]">
                              {notification.relatedCase}
                            </span>
                          </div>
                        )}
                        
                        {notification.actionRequired && (
                          <div className="flex items-center gap-2 mt-3">
                            <Button size="sm" variant="primary">
                              Take Action
                            </Button>
                            {!notification.isRead && (
                              <Button 
                                size="sm" 
                                variant="secondary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                              >
                                Mark Read
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </PageContent>
    </AppLayout>
  );
}