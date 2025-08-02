/**
 * Command Palette Data Configuration
 *
 * Centralized command definitions following DRY principle.
 * All core application commands in one place for easy maintenance.
 */

import {
  Search,
  FileText,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  Plus,
  MessageSquare,
  Command as CommandIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { CommandItem, CommandGroupConfig } from './types';

/**
 * Core application commands
 * Organized by functionality for easy navigation
 */
export const createCoreCommands = (router: ReturnType<typeof useRouter>): CommandItem[] => [
  // Navigation Commands
  {
    id: 'nav-dashboard',
    title: 'Go to Dashboard',
    description: 'View your case overview and statistics',
    icon: <FileText size={16} />,
    action: () => router.push('/'),
    group: 'Navigation',
    keywords: ['home', 'overview', 'main'],
    shortcut: 'G D'
  },
  {
    id: 'nav-cases',
    title: 'Go to Cases',
    description: 'Manage your legal cases',
    icon: <FileText size={16} />,
    action: () => router.push('/cases'),
    group: 'Navigation',
    keywords: ['legal', 'matters', 'litigation'],
    shortcut: 'G C'
  },
  {
    id: 'nav-calendar',
    title: 'Go to Calendar',
    description: 'View court dates and deadlines',
    icon: <Calendar size={16} />,
    action: () => router.push('/calendar'),
    group: 'Navigation',
    keywords: ['schedule', 'appointments', 'court'],
    shortcut: 'G L'
  },
  {
    id: 'nav-contacts',
    title: 'Go to Contacts',
    description: 'Manage legal contacts and relationships',
    icon: <Users size={16} />,
    action: () => router.push('/contacts'),
    group: 'Navigation',
    keywords: ['people', 'lawyers', 'attorneys'],
    shortcut: 'G O'
  },
  {
    id: 'nav-settings',
    title: 'Go to Settings',
    description: 'Configure your account and preferences',
    icon: <Settings size={16} />,
    action: () => router.push('/settings'),
    group: 'Navigation',
    keywords: ['config', 'preferences', 'account'],
    shortcut: 'G S'
  },

  // Quick Actions
  {
    id: 'action-new-case',
    title: 'Create New Case',
    description: 'Start a new legal matter',
    icon: <Plus size={16} />,
    action: () => {
      // TODO: Open case creation modal
      console.log('Creating new case...');
    },
    group: 'Actions',
    keywords: ['add', 'create', 'new', 'legal'],
    shortcut: 'C'
  },
  {
    id: 'action-ai-chat',
    title: 'Chat with AI Assistant',
    description: 'Get legal guidance and support',
    icon: <MessageSquare size={16} />,
    action: () => {
      // TODO: Open AI chat interface
      console.log('Opening AI chat...');
    },
    group: 'Actions',
    keywords: ['ai', 'assistant', 'help', 'chat'],
    shortcut: 'A'
  },
  {
    id: 'action-quick-search',
    title: 'Quick Search',
    description: 'Search across all your legal documents',
    icon: <Search size={16} />,
    action: () => {
      // TODO: Open global search
      console.log('Opening search...');
    },
    group: 'Actions',
    keywords: ['find', 'search', 'documents', 'files'],
    shortcut: 'S'
  },

  // Help Commands
  {
    id: 'help-docs',
    title: 'Documentation',
    description: 'View user guide and help articles',
    icon: <HelpCircle size={16} />,
    action: () => router.push('/help'),
    group: 'Help',
    keywords: ['docs', 'guide', 'manual', 'support'],
    shortcut: 'H'
  },
  {
    id: 'help-shortcuts',
    title: 'Keyboard Shortcuts',
    description: 'View all available keyboard shortcuts',
    icon: <CommandIcon size={16} />,
    action: () => {
      // TODO: Show shortcuts modal
      console.log('Showing shortcuts...');
    },
    group: 'Help',
    keywords: ['keys', 'hotkeys', 'commands'],
    shortcut: '?'
  }
];

/**
 * Command group configurations
 * Defines styling and behavior for each command group
 */
export const commandGroups: Record<string, CommandGroupConfig> = {
  Recent: {
    id: 'recent',
    heading: 'Recent',
    className: 'bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40',
    iconClassName: 'text-blue-600 dark:text-blue-400'
  },
  Navigation: {
    id: 'navigation',
    heading: 'Navigation',
    className: 'bg-indigo-50 dark:bg-indigo-900/20 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40',
    iconClassName: 'text-indigo-600 dark:text-indigo-400'
  },
  Actions: {
    id: 'actions',
    heading: 'Actions',
    className: 'bg-green-50 dark:bg-green-900/20 group-hover:bg-green-100 dark:group-hover:bg-green-900/40',
    iconClassName: 'text-green-600 dark:text-green-400'
  },
  Help: {
    id: 'help',
    heading: 'Help & Support',
    className: 'bg-purple-50 dark:bg-purple-900/20 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40',
    iconClassName: 'text-purple-600 dark:text-purple-400'
  },
  Custom: {
    id: 'custom',
    heading: 'Custom',
    className: 'bg-gray-50 dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-700',
    iconClassName: 'text-gray-600 dark:text-gray-400'
  }
};

/**
 * Default recent command IDs for new users
 */
export const defaultRecentCommands = [
  'nav-dashboard',
  'nav-cases',
  'action-new-case'
];