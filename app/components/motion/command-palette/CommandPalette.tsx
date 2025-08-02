/**
 * Command Palette - Main Container Component
 *
 * Linear-inspired global search and navigation following composition pattern.
 * Ties together all focused sub-components for maintainable architecture.
 */

'use client';

import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
} from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

import { useCommandPalette } from './useCommandPalette';
import { CommandGroup } from './CommandGroup';
import { dialogVariants, backdropVariants } from './animations';
import type { CommandPaletteProps } from './types';

/**
 * Main CommandPalette Component
 *
 * Provides instant access to all app functions via ⌘K
 * - Global keyboard shortcuts
 * - Fuzzy search with instant results
 * - Recent items and quick actions
 * - Smooth Linear-inspired animations
 * - Fully accessible with keyboard navigation
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
export function CommandPalette(props: CommandPaletteProps) {
  const {
    open,
    getRecentCommands,
    getCommandsByGroup,
    executeCommand,
    closeCommand
  } = useCommandPalette(props);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={closeCommand}
        >
          <motion.div
            variants={dialogVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <CommandDialog
              open={open}
              onOpenChange={closeCommand}
              className="border-none shadow-2xl"
            >
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center border-b border-gray-200 dark:border-gray-700 px-4">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <CommandInput
                    placeholder="Search commands or type to navigate..."
                    className="flex-1 py-4 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
                  />
                  <kbd className="hidden sm:inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono text-gray-600 dark:text-gray-400">
                    ESC
                  </kbd>
                </div>

                {/* Command List */}
                <CommandList className="max-h-80 overflow-y-auto p-2">
                  <CommandEmpty className="py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-8 h-8 text-gray-300" />
                      <p>No commands found.</p>
                      <p className="text-sm">Try a different search term.</p>
                    </div>
                  </CommandEmpty>

                  {/* Recent Commands */}
                  <CommandGroup
                    heading="Recent"
                    commands={getRecentCommands()}
                    onCommandSelect={executeCommand}
                    variant="recent"
                    showSeparator={false}
                  />

                  {/* Navigation Commands */}
                  <CommandGroup
                    heading="Navigation"
                    commands={getCommandsByGroup('Navigation')}
                    onCommandSelect={executeCommand}
                  />

                  {/* Quick Actions */}
                  <CommandGroup
                    heading="Actions"
                    commands={getCommandsByGroup('Actions')}
                    onCommandSelect={executeCommand}
                  />

                  {/* Help Commands */}
                  <CommandGroup
                    heading="Help & Support"
                    commands={getCommandsByGroup('Help')}
                    onCommandSelect={executeCommand}
                  />

                  {/* Custom Commands */}
                  <CommandGroup
                    heading="Custom"
                    commands={getCommandsByGroup('Custom')}
                    onCommandSelect={executeCommand}
                  />
                </CommandList>

                {/* Footer */}
                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded font-mono">↑↓</kbd>
                        Navigate
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded font-mono">↵</kbd>
                        Select
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded font-mono">ESC</kbd>
                        Close
                      </span>
                    </div>
                    <span>
                      Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 rounded font-mono">⌘K</kbd> anytime
                    </span>
                  </div>
                </div>
              </div>
            </CommandDialog>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Re-export types for external use
export type { CommandItem, CommandPaletteProps } from './types';