/**
 * Command Palette Types & Interfaces
 *
 * Centralized type definitions for the command palette system.
 * Follows interface segregation principle - only what's needed.
 */

export interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  group: 'Navigation' | 'Actions' | 'Help' | 'Custom';
  keywords?: string[];
  shortcut?: string;
}

export interface CommandPaletteProps {
  /**
   * Custom commands to add to the palette
   */
  customCommands?: CommandItem[];
  /**
   * Callback when command is executed
   */
  onCommandExecute?: (command: CommandItem) => void;
}

export interface CommandGroupConfig {
  id: string;
  heading: string;
  className?: string;
  iconClassName?: string;
}