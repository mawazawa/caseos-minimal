/*
 * ███████╗██╗██████╗ ███████╗██████╗  █████╗ ██████╗ 
 * ██╔════╝██║██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔══██╗
 * ███████╗██║██║  ██║█████╗  ██████╔╝███████║██████╔╝
 * ╚════██║██║██║  ██║██╔══╝  ██╔══██╗██╔══██║██╔══██╗
 * ███████║██║██████╔╝███████╗██████╔╝██║  ██║██║  ██║
 * ╚══════╝╚═╝╚═════╝ ╚══════╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
 * Sidebar Navigation - Linear-inspired Design System
 */

'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  FileText, 
  Calendar, 
  Users, 
  Settings, 
  Search,
  Plus,
  HelpCircle,
  Bell
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  section?: 'main' | 'secondary';
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    icon: <Home size={16} />,
    section: 'main',
  },
  {
    id: 'cases',
    label: 'My Cases',
    href: '/cases',
    icon: <FileText size={16} />,
    badge: '3',
    section: 'main',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    href: '/calendar',
    icon: <Calendar size={16} />,
    section: 'main',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    href: '/contacts',
    icon: <Users size={16} />,
    section: 'main',
  },
  {
    id: 'help',
    label: 'Help Center',
    href: '/help',
    icon: <HelpCircle size={16} />,
    section: 'secondary',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: <Settings size={16} />,
    section: 'secondary',
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  const mainItems = sidebarItems.filter(item => item.section === 'main');
  const secondaryItems = sidebarItems.filter(item => item.section === 'secondary');

  return (
    <aside 
      className={clsx(
        'fixed left-0 top-0 z-30 h-screen w-[var(--sidebar-width)]',
        'bg-[var(--color-sidebar)] border-r border-[var(--color-border)]',
        'flex flex-col',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-12 items-center justify-between px-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-[var(--color-accent)] flex items-center justify-center">
            <span className="text-xs font-bold text-white">C</span>
          </div>
          <span className="font-semibold text-[var(--color-text-primary)] text-[var(--font-size-base)]">
            CaseOS
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <button 
            className={clsx(
              'h-6 w-6 rounded-md flex items-center justify-center',
              'text-[var(--color-text-secondary)]',
              'hover:bg-[var(--color-background-secondary)]',
              'hover:text-[var(--color-text-primary)]',
              'transition-colors duration-200'
            )}
            aria-label="Search"
          >
            <Search size={14} />
          </button>
          <button 
            className={clsx(
              'h-6 w-6 rounded-md flex items-center justify-center',
              'text-[var(--color-text-secondary)]',
              'hover:bg-[var(--color-background-secondary)]',
              'hover:text-[var(--color-text-primary)]',
              'transition-colors duration-200'
            )}
            aria-label="Notifications"
          >
            <Bell size={14} />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-b border-[var(--color-border)]">
        <button 
          className={clsx(
            'w-full h-8 px-3 rounded-md',
            'bg-[var(--color-accent)] text-[var(--color-accent-text)]',
            'hover:bg-[var(--color-accent-hover)]',
            'flex items-center justify-center gap-2',
            'text-[var(--font-size-sm)] font-medium',
            'transition-colors duration-200',
            'shadow-sm'
          )}
        >
          <Plus size={14} />
          New Case
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-2 space-y-1">
        {mainItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={clsx(
                'group flex items-center gap-3 px-2 py-1.5 rounded-md',
                'text-[var(--font-size-sm)] font-medium',
                'transition-all duration-200 ease-in-out',
                'relative',
                isActive ? [
                  'bg-[var(--color-background-secondary)]',
                  'text-[var(--color-text-primary)]',
                  'shadow-sm',
                ] : [
                  'text-[var(--color-text-secondary)]',
                  'hover:bg-[var(--color-background-secondary)]',
                  'hover:text-[var(--color-text-primary)]',
                ]
              )}
            >
              <span className="flex-shrink-0 text-inherit">
                {item.icon}
              </span>
              <span className="flex-1 truncate">
                {item.label}
              </span>
              {item.badge && (
                <span className={clsx(
                  'flex-shrink-0 px-1.5 py-0.5 rounded-full',
                  'bg-[var(--color-accent)] text-[var(--color-accent-text)]',
                  'text-xs font-medium leading-none',
                  'min-w-[18px] text-center'
                )}>
                  {item.badge}
                </span>
              )}
              
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[var(--color-accent)] rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-2 border-t border-[var(--color-border)]">
        <div className="space-y-1">
          {secondaryItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={clsx(
                  'group flex items-center gap-3 px-2 py-1.5 rounded-md',
                  'text-[var(--font-size-sm)] font-medium',
                  'transition-all duration-200 ease-in-out',
                  isActive ? [
                    'bg-[var(--color-background-secondary)]',
                    'text-[var(--color-text-primary)]',
                  ] : [
                    'text-[var(--color-text-secondary)]',
                    'hover:bg-[var(--color-background-secondary)]',
                    'hover:text-[var(--color-text-primary)]',
                  ]
                )}
              >
                <span className="flex-shrink-0 text-inherit">
                  {item.icon}
                </span>
                <span className="flex-1 truncate">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* User Info */}
        <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="h-6 w-6 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
              <span className="text-xs font-medium text-white">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[var(--font-size-xs)] font-medium text-[var(--color-text-primary)] truncate">
                John Doe
              </p>
              <p className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] truncate">
                Pro Plan
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}