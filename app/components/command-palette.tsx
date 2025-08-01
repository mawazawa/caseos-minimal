/*
 *  ██████╗ ██████╗ ███╗   ███╗███╗   ███╗ █████╗ ███╗   ██╗██████╗ 
 * ██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔══██╗████╗  ██║██╔══██╗
 * ██║     ██║   ██║██╔████╔██║██╔████╔██║███████║██╔██╗ ██║██║  ██║
 * ██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║╚██╗██║██║  ██║
 * ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║██████╔╝
 *  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 
 * Command Palette - CaseOS Linear-inspired Design System
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import {
  Search,
  Home,
  FileText,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  Plus,
  Upload,
  MessageSquare,
  FileSearch,
  UserSearch,
  Keyboard,
  Zap,
  ArrowRight,
  Command as CommandIcon,
} from 'lucide-react';

// Command definitions
interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  shortcut?: string[];
  category: 'navigation' | 'actions' | 'search' | 'help';
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = useState('');
  const router = useRouter();

  // Navigation commands
  const navigationCommands: CommandItem[] = [
    {
      id: 'nav-dashboard',
      title: 'Go to Dashboard',
      subtitle: 'View your case overview and recent activity',
      icon: <Home size={16} />,
      shortcut: ['⌘', '1'],
      category: 'navigation',
      action: () => {
        router.push('/');
        onOpenChange(false);
      },
      keywords: ['home', 'overview', 'main'],
    },
    {
      id: 'nav-cases',
      title: 'Go to Cases',
      subtitle: 'Manage your legal cases and documents',
      icon: <FileText size={16} />,
      shortcut: ['⌘', '2'],
      category: 'navigation',
      action: () => {
        router.push('/cases');
        onOpenChange(false);
      },
      keywords: ['legal', 'documents', 'files'],
    },
    {
      id: 'nav-calendar',
      title: 'Go to Calendar',
      subtitle: 'View court dates and appointments',
      icon: <Calendar size={16} />,
      shortcut: ['⌘', '3'],
      category: 'navigation',
      action: () => {
        router.push('/calendar');
        onOpenChange(false);
      },
      keywords: ['schedule', 'appointments', 'dates', 'court'],
    },
    {
      id: 'nav-contacts',
      title: 'Go to Contacts',
      subtitle: 'Manage lawyers, judges, and court contacts',
      icon: <Users size={16} />,
      shortcut: ['⌘', '4'],
      category: 'navigation',
      action: () => {
        router.push('/contacts');
        onOpenChange(false);
      },
      keywords: ['people', 'lawyers', 'judges', 'attorneys'],
    },
    {
      id: 'nav-settings',
      title: 'Go to Settings',
      subtitle: 'Configure your account and preferences',
      icon: <Settings size={16} />,
      shortcut: ['⌘', ','],
      category: 'navigation',
      action: () => {
        router.push('/settings');
        onOpenChange(false);
      },
      keywords: ['preferences', 'account', 'profile'],
    },
    {
      id: 'nav-help',
      title: 'Go to Help Center',
      subtitle: 'Get assistance and legal resources',
      icon: <HelpCircle size={16} />,
      shortcut: ['⌘', '?'],
      category: 'navigation',
      action: () => {
        router.push('/help');
        onOpenChange(false);
      },
      keywords: ['support', 'assistance', 'resources', 'faq'],
    },
  ];

  // Action commands
  const actionCommands: CommandItem[] = [
    {
      id: 'action-new-case',
      title: 'Create New Case',
      subtitle: 'Start a new legal case with AI assistance',
      icon: <Plus size={16} />,
      shortcut: ['⌘', 'N'],
      category: 'actions',
      action: () => {
        // TODO: Implement new case creation
        router.push('/cases?action=new');
        onOpenChange(false);
      },
      keywords: ['create', 'add', 'start', 'begin'],
    },
    {
      id: 'action-upload-document',
      title: 'Upload Document',
      subtitle: 'Add legal documents to your case',
      icon: <Upload size={16} />,
      shortcut: ['⌘', 'U'],
      category: 'actions',
      action: () => {
        // TODO: Implement document upload
        console.log('Upload document');
        onOpenChange(false);
      },
      keywords: ['file', 'pdf', 'evidence', 'attach'],
    },
    {
      id: 'action-start-chat',
      title: 'Start AI Chat',
      subtitle: 'Get legal guidance from our AI assistant',
      icon: <MessageSquare size={16} />,
      shortcut: ['⌘', 'T'],
      category: 'actions',
      action: () => {
        // TODO: Implement AI chat
        console.log('Start AI chat');
        onOpenChange(false);
      },
      keywords: ['ai', 'assistant', 'help', 'guidance', 'legal advice'],
    },
  ];

  // Search commands
  const searchCommands: CommandItem[] = [
    {
      id: 'search-cases',
      title: 'Search Cases',
      subtitle: 'Find cases by name, number, or content',
      icon: <FileSearch size={16} />,
      shortcut: ['⌘', 'F'],
      category: 'search',
      action: () => {
        // TODO: Implement case search
        console.log('Search cases');
        onOpenChange(false);
      },
      keywords: ['find', 'locate', 'filter'],
    },
    {
      id: 'search-documents',
      title: 'Search Documents',
      subtitle: 'Find documents across all your cases',
      icon: <Search size={16} />,
      shortcut: ['⌘', 'Shift', 'F'],
      category: 'search',
      action: () => {
        // TODO: Implement document search
        console.log('Search documents');
        onOpenChange(false);
      },
      keywords: ['files', 'pdf', 'evidence', 'papers'],
    },
    {
      id: 'search-contacts',
      title: 'Search Contacts',
      subtitle: 'Find lawyers, judges, and court contacts',
      icon: <UserSearch size={16} />,
      shortcut: ['⌘', 'Shift', 'C'],
      category: 'search',
      action: () => {
        // TODO: Implement contact search
        console.log('Search contacts');
        onOpenChange(false);
      },
      keywords: ['people', 'lawyers', 'attorneys', 'judges'],
    },
  ];

  // Help commands
  const helpCommands: CommandItem[] = [
    {
      id: 'help-shortcuts',
      title: 'Keyboard Shortcuts',
      subtitle: 'View all available keyboard shortcuts',
      icon: <Keyboard size={16} />,
      category: 'help',
      action: () => {
        // TODO: Show shortcuts modal
        console.log('Show shortcuts');
        onOpenChange(false);
      },
      keywords: ['hotkeys', 'keys', 'commands'],
    },
    {
      id: 'help-tips',
      title: 'Quick Tips',
      subtitle: 'Learn how to use CaseOS effectively',
      icon: <Zap size={16} />,
      category: 'help',
      action: () => {
        // TODO: Show tips
        console.log('Show tips');
        onOpenChange(false);
      },
      keywords: ['tutorial', 'guide', 'learn', 'tips'],
    },
  ];

  const allCommands = [
    ...navigationCommands,
    ...actionCommands,
    ...searchCommands,
    ...helpCommands,
  ];

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, onOpenChange]);

  // Clear search when closing
  useEffect(() => {
    if (!open) {
      setSearch('');
    }
  }, [open]);

  const renderShortcut = (shortcut: string[]) => (
    <div className="flex items-center gap-1">
      {shortcut.map((key, index) => (
        <kbd
          key={index}
          className={clsx(
            'px-1.5 py-0.5 rounded text-xs font-mono',
            'bg-[var(--color-background-secondary)]',
            'border border-[var(--color-border)]',
            'text-[var(--color-text-tertiary)]'
          )}
        >
          {key}
        </kbd>
      ))}
    </div>
  );

  const renderCommand = (command: CommandItem) => (
    <Command.Item
      key={command.id}
      value={`${command.title} ${command.subtitle} ${command.keywords?.join(' ')}`}
      onSelect={() => command.action()}
      className={clsx(
        'flex items-center gap-3 px-3 py-2.5 cursor-pointer',
        'rounded-lg mx-2 my-0.5',
        'hover:bg-[var(--color-background-secondary)]',
        'data-[selected=true]:bg-[var(--color-background-secondary)]',
        'data-[selected=true]:shadow-sm',
        'transition-all duration-150',
        'group'
      )}
    >
      <div className="flex-shrink-0 text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] group-data-[selected=true]:text-[var(--color-text-primary)]">
        {command.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[var(--font-size-sm)] font-medium text-[var(--color-text-primary)]">
          {command.title}
        </div>
        {command.subtitle && (
          <div className="text-[var(--font-size-xs)] text-[var(--color-text-secondary)] truncate">
            {command.subtitle}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {command.shortcut && renderShortcut(command.shortcut)}
        <ArrowRight size={12} className="text-[var(--color-text-tertiary)] opacity-0 group-hover:opacity-100 group-data-[selected=true]:opacity-100 transition-opacity" />
      </div>
    </Command.Item>
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[var(--z-modal)]"
            onClick={() => onOpenChange(false)}
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed left-1/2 top-[20vh] -translate-x-1/2 z-[var(--z-modal)] w-full max-w-2xl mx-4"
          >
            <Command
              className={clsx(
                'bg-[var(--color-surface)] border border-[var(--color-border)]',
                'rounded-xl shadow-xl overflow-hidden',
                'backdrop-blur-xl'
              )}
              shouldFilter={false}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border)]">
                <Search size={16} className="text-[var(--color-text-secondary)]" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Type a command or search..."
                  className={clsx(
                    'flex-1 bg-transparent outline-none',
                    'text-[var(--font-size-base)] text-[var(--color-text-primary)]',
                    'placeholder:text-[var(--color-text-tertiary)]'
                  )}
                />
                <div className="flex items-center gap-2 text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">
                  <CommandIcon size={12} />
                  <span>K</span>
                </div>
              </div>

              {/* Content */}
              <Command.List className="max-h-96 overflow-y-auto py-2">
                <Command.Empty className="flex flex-col items-center justify-center py-8 text-center">
                  <Search size={24} className="text-[var(--color-text-tertiary)] mb-2" />
                  <div className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)]">
                    No commands found
                  </div>
                  <div className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)] mt-1">
                    Try searching for something else
                  </div>
                </Command.Empty>

                {/* Navigation */}
                <Command.Group
                  value="navigation"
                  heading={
                    <div className="px-3 py-2 text-[var(--font-size-xs)] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider">
                      Navigation
                    </div>
                  }
                >
                  {navigationCommands.map(renderCommand)}
                </Command.Group>

                {/* Actions */}
                <Command.Group
                  value="actions"
                  heading={
                    <div className="px-3 py-2 text-[var(--font-size-xs)] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider">
                      Actions
                    </div>
                  }
                >
                  {actionCommands.map(renderCommand)}
                </Command.Group>

                {/* Search */}
                <Command.Group
                  value="search"
                  heading={
                    <div className="px-3 py-2 text-[var(--font-size-xs)] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider">
                      Search
                    </div>
                  }
                >
                  {searchCommands.map(renderCommand)}
                </Command.Group>

                {/* Help */}
                <Command.Group
                  value="help"
                  heading={
                    <div className="px-3 py-2 text-[var(--font-size-xs)] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider">
                      Help
                    </div>
                  }
                >
                  {helpCommands.map(renderCommand)}
                </Command.Group>
              </Command.List>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--color-border)] bg-[var(--color-background-secondary)]">
                <div className="flex items-center gap-4 text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded text-xs">↑↓</kbd>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded text-xs">↵</kbd>
                    <span>Select</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-[var(--color-background)] border border-[var(--color-border)] rounded text-xs">Esc</kbd>
                    <span>Close</span>
                  </div>
                </div>
                <div className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">
                  {allCommands.length} commands available
                </div>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook for using the command palette
export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { open, setOpen };
}