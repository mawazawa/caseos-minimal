/**
 * Command Palette Business Logic Hook
 *
 * Centralized state management and business logic for the command palette.
 * Follows Single Responsibility Principle and custom hooks pattern.
 */

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import type { CommandItem } from './types';
import { createCoreCommands, defaultRecentCommands } from './command-data';

interface UseCommandPaletteProps {
  customCommands?: CommandItem[];
  onCommandExecute?: (command: CommandItem) => void;
}

export function useCommandPalette({
  customCommands = [],
  onCommandExecute
}: UseCommandPaletteProps = {}) {
  const [open, setOpen] = useState(false);
  const [recentCommands, setRecentCommands] = useState<string[]>(defaultRecentCommands);
  const router = useRouter();

  // Combine core and custom commands
  const allCommands = useMemo(() => {
    const coreCommands = createCoreCommands(router);
    return [...coreCommands, ...customCommands];
  }, [router, customCommands]);

  /**
   * Execute a command and track it in recent items
   */
  const executeCommand = useCallback((command: CommandItem) => {
    // Execute the command action
    command.action();

    // Track in recent commands (max 5 items, avoid duplicates)
    setRecentCommands(prev => {
      const filtered = prev.filter(id => id !== command.id);
      return [command.id, ...filtered].slice(0, 5);
    });

    // Close the palette
    setOpen(false);

    // Notify parent component
    onCommandExecute?.(command);
  }, [onCommandExecute]);

  /**
   * Get commands by group for organized display
   */
  const getCommandsByGroup = useCallback((group: string) => {
    return allCommands.filter(cmd => cmd.group === group);
  }, [allCommands]);

  /**
   * Get recent commands with full command data
   */
  const getRecentCommands = useCallback(() => {
    return recentCommands
      .map(id => allCommands.find(cmd => cmd.id === id))
      .filter(Boolean) as CommandItem[];
  }, [recentCommands, allCommands]);

  /**
   * Toggle command palette visibility
   */
  const toggleOpen = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  /**
   * Close command palette
   */
  const closeCommand = useCallback(() => {
    setOpen(false);
  }, []);

  /**
   * Open command palette
   */
  const openCommand = useCallback(() => {
    setOpen(true);
  }, []);

  /**
   * Keyboard shortcuts handler
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Global ⌘K or Ctrl+K to toggle
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleOpen();
        return;
      }

      // ESC to close when open
      if (e.key === 'Escape' && open) {
        closeCommand();
        return;
      }

      // Quick shortcuts when palette is closed
      if (!open && (e.metaKey || e.ctrlKey)) {
        const command = allCommands.find(cmd => {
          if (!cmd.shortcut) return false;

          // Handle single letter shortcuts (like 'C' for create)
          if (cmd.shortcut.length === 1) {
            return e.key.toLowerCase() === cmd.shortcut.toLowerCase();
          }

          // Handle multi-key shortcuts (like 'G D' for go to dashboard)
          // This is a simplified version - could be enhanced
          return false;
        });

        if (command) {
          e.preventDefault();
          executeCommand(command);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, allCommands, executeCommand, toggleOpen, closeCommand]);

  /**
   * Load recent commands from localStorage on mount
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('caseos-recent-commands');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setRecentCommands(parsed);
          }
        } catch (error) {
          console.warn('Failed to load recent commands:', error);
        }
      }
    }
  }, []);

  /**
   * Save recent commands to localStorage when they change
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('caseos-recent-commands', JSON.stringify(recentCommands));
    }
  }, [recentCommands]);

  return {
    // State
    open,
    recentCommands,
    allCommands,

    // Computed data
    getCommandsByGroup,
    getRecentCommands,

    // Actions
    executeCommand,
    toggleOpen,
    openCommand,
    closeCommand
  };
}