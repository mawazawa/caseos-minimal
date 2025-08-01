/*
 * ███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗    ██████╗  █████╗ ██╗     ███████╗████████╗████████╗███████╗
 * ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║    ██╔══██╗██╔══██╗██║     ██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝
 * ███████╗█████╗  ███████║██████╔╝██║     ███████║    ██████╔╝███████║██║     █████╗     ██║      ██║   █████╗  
 * ╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║    ██╔═══╝ ██╔══██║██║     ██╔══╝     ██║      ██║   ██╔══╝  
 * ███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║    ██║     ██║  ██║███████╗███████╗   ██║      ██║   ███████╗
 * ╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝      ╚═╝   ╚══════╝
 * Command Palette - Linear-inspired global search and navigation
 * 
 * Provides instant access to all app functions via ⌘K
 * Lightning-fast fuzzy search with keyboard navigation
 * Recent items, AI chat integration, and quick actions
 */

'use client';

import { 
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from 'cmdk';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  Search,
  FileText,
  Calendar,
  Users,
  Settings,
  HelpCircle,
  Plus,
  MessageSquare,
  Clock,
  Command as CommandIcon,
} from 'lucide-react';

// Animation variants for smooth command palette appearance
const dialogVariants: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.96,
    y: -20,
    filter: 'blur(4px)'
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.15,
      ease: [0.16, 1, 0.3, 1] as const // Linear-inspired easing
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.96,
    y: -10,
    filter: 'blur(2px)',
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 1, 1] as const
    }
  }
};

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  group: string;
  keywords?: string[];
  shortcut?: string;
}

interface CommandPaletteProps {
  /**
   * Custom commands to add to the palette
   */
  customCommands?: CommandItem[];
  /**
   * Callback when command is executed
   */
  onCommandExecute?: (command: CommandItem) => void;
}

/**
 * CommandPalette Component
 * 
 * Linear-inspired command palette with:
 * - Global ⌘K keyboard shortcut
 * - Fuzzy search for instant navigation
 * - Recent items and quick actions
 * - Smooth animations and transitions
 * - AI chat integration placeholder
 * 
 * @example
 * ```tsx
 * <CommandPalette 
 *   customCommands={[
 *     {
 *       id: 'custom-action',
 *       title: 'Custom Action',
 *       icon: <CustomIcon />,
 *       action: () => console.log('Custom action'),
 *       group: 'Custom'
 *     }
 *   ]}
 * />
 * ```
 */
export function CommandPalette({ 
  customCommands = [],
  onCommandExecute 
}: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [recentCommands, setRecentCommands] = useState<string[]>([]);
  const router = useRouter();

  // Define core application commands
  const coreCommands: CommandItem[] = [
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
      keywords: ['assistant', 'help', 'ai', 'chat'],
      shortcut: 'A'
    },
    {
      id: 'action-search',
      title: 'Search Everything',
      description: 'Search across all your legal documents',
      icon: <Search size={16} />,
      action: () => {
        // TODO: Open global search
        console.log('Opening global search...');
      },
      group: 'Actions',
      keywords: ['find', 'documents', 'content'],
      shortcut: '/'
    },

    // Help & Support
    {
      id: 'help-guide',
      title: 'Help & Documentation',
      description: 'Learn how to use CaseOS effectively',
      icon: <HelpCircle size={16} />,
      action: () => router.push('/help'),
      group: 'Help',
      keywords: ['documentation', 'guide', 'tutorial'],
      shortcut: '?'
    },
  ];

  // Combine core and custom commands
  const allCommands = [...coreCommands, ...customCommands];

  // Global keyboard listener for ⌘K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to open command palette
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }

      // Escape to close
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Execute command and track recent usage
  const executeCommand = useCallback((command: CommandItem) => {
    // Track recent commands (max 5)
    setRecentCommands(prev => {
      const filtered = prev.filter(id => id !== command.id);
      return [command.id, ...filtered].slice(0, 5);
    });

    // Execute the command
    command.action();
    
    // Notify parent component
    onCommandExecute?.(command);
    
    // Close palette
    setOpen(false);
  }, [onCommandExecute]);

  // Get recent commands for display
  const getRecentCommands = () => {
    return recentCommands
      .map(id => allCommands.find(cmd => cmd.id === id))
      .filter(Boolean) as CommandItem[];
  };

  // Filter commands by group
  const getCommandsByGroup = (group: string) => {
    return allCommands.filter(cmd => cmd.group === group);
  };

  return (
    <>
      {/* Trigger hint (floating in corner) */}
      <motion.div
        className="fixed bottom-4 right-4 z-40 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
      >
        <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 backdrop-blur">
          <CommandIcon size={14} />
          <span>Press ⌘K to search</span>
        </div>
      </motion.div>

      {/* Command Dialog */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              variants={dialogVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <CommandDialog open={open} onOpenChange={setOpen}>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Search Input */}
                  <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-4">
                    <Search className="w-5 h-5 text-gray-400 mr-3" />
                    <CommandInput 
                      placeholder="Search for anything..." 
                      className="flex-1 py-4 bg-transparent border-0 outline-none text-lg placeholder-gray-400"
                    />
                    <div className="text-xs text-gray-400 font-mono">ESC</div>
                  </div>

                  {/* Command List */}
                  <CommandList className="max-h-96 overflow-y-auto p-2">
                    <CommandEmpty className="py-8 text-center text-gray-500">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <p>No commands found.</p>
                      <p className="text-sm text-gray-400 mt-1">Try searching for something else.</p>
                    </CommandEmpty>

                    {/* Recent Commands */}
                    {getRecentCommands().length > 0 && (
                      <>
                        <CommandGroup heading="Recent">
                          {getRecentCommands().map((command) => (
                            <CommandItem
                              key={command.id}
                              value={`${command.title} ${command.keywords?.join(' ') || ''}`}
                              onSelect={() => executeCommand(command)}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 group"
                            >
                              <div className="w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-gray-700">
                                {command.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                  {command.title}
                                </div>
                                {command.description && (
                                  <div className="text-sm text-gray-500 truncate">
                                    {command.description}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock size={12} className="text-gray-400" />
                                {command.shortcut && (
                                  <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
                                    {command.shortcut}
                                  </kbd>
                                )}
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                        <CommandSeparator className="my-2" />
                      </>
                    )}

                    {/* Navigation Commands */}
                    <CommandGroup heading="Navigation">
                      {getCommandsByGroup('Navigation').map((command) => (
                        <CommandItem
                          key={command.id}
                          value={`${command.title} ${command.keywords?.join(' ') || ''}`}
                          onSelect={() => executeCommand(command)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 group"
                        >
                          <div className="w-8 h-8 rounded-md bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40">
                            {command.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 dark:text-gray-100">
                              {command.title}
                            </div>
                            {command.description && (
                              <div className="text-sm text-gray-500 truncate">
                                {command.description}
                              </div>
                            )}
                          </div>
                          {command.shortcut && (
                            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
                              {command.shortcut}
                            </kbd>
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>

                    <CommandSeparator className="my-2" />

                    {/* Quick Actions */}
                    <CommandGroup heading="Actions">
                      {getCommandsByGroup('Actions').map((command) => (
                        <CommandItem
                          key={command.id}
                          value={`${command.title} ${command.keywords?.join(' ') || ''}`}
                          onSelect={() => executeCommand(command)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 group"
                        >
                          <div className="w-8 h-8 rounded-md bg-green-50 dark:bg-green-900/20 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-900/40">
                            {command.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 dark:text-gray-100">
                              {command.title}
                            </div>
                            {command.description && (
                              <div className="text-sm text-gray-500 truncate">
                                {command.description}
                              </div>
                            )}
                          </div>
                          {command.shortcut && (
                            <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
                              {command.shortcut}
                            </kbd>
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>

                    {/* Help Commands */}
                    {getCommandsByGroup('Help').length > 0 && (
                      <>
                        <CommandSeparator className="my-2" />
                        <CommandGroup heading="Help & Support">
                          {getCommandsByGroup('Help').map((command) => (
                            <CommandItem
                              key={command.id}
                              value={`${command.title} ${command.keywords?.join(' ') || ''}`}
                              onSelect={() => executeCommand(command)}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 group"
                            >
                              <div className="w-8 h-8 rounded-md bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40">
                                {command.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                  {command.title}
                                </div>
                                {command.description && (
                                  <div className="text-sm text-gray-500 truncate">
                                    {command.description}
                                  </div>
                                )}
                              </div>
                              {command.shortcut && (
                                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
                                  {command.shortcut}
                                </kbd>
                              )}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </>
                    )}

                    {/* Custom Commands */}
                    {customCommands.length > 0 && (
                      <>
                        <CommandSeparator className="my-2" />
                        <CommandGroup heading="Custom">
                          {customCommands.map((command) => (
                            <CommandItem
                              key={command.id}
                              value={`${command.title} ${command.keywords?.join(' ') || ''}`}
                              onSelect={() => executeCommand(command)}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 group"
                            >
                              <div className="w-8 h-8 rounded-md bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-gray-700">
                                {command.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 dark:text-gray-100">
                                  {command.title}
                                </div>
                                {command.description && (
                                  <div className="text-sm text-gray-500 truncate">
                                    {command.description}
                                  </div>
                                )}
                              </div>
                              {command.shortcut && (
                                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
                                  {command.shortcut}
                                </kbd>
                              )}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </>
                    )}
                  </CommandList>
                </div>
              </CommandDialog>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Export command item type for external use
export type { CommandItem };