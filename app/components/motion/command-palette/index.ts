/**
 * Command Palette Module
 *
 * Clean export interface following barrel export pattern.
 * Provides a single entry point for the command palette system.
 */

// Main component
export { CommandPalette } from './CommandPalette';

// Sub-components for advanced usage
export { CommandItem } from './CommandItem';
export { CommandGroup } from './CommandGroup';

// Hook for custom implementations
export { useCommandPalette } from './useCommandPalette';

// Types and configuration
export type {
  CommandItem as CommandItemType,
  CommandPaletteProps,
  CommandGroupConfig
} from './types';

export {
  createCoreCommands,
  commandGroups,
  defaultRecentCommands
} from './command-data';

export {
  dialogVariants,
  backdropVariants,
  itemVariants,
  listVariants,
  animationConfig
} from './animations';