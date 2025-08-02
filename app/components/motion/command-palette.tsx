/**
 * Command Palette - Legacy Compatibility Layer
 *
 * Re-exports the new modular command palette for backward compatibility.
 * The original 527-line monolithic component has been refactored into
 * focused, maintainable modules following SOLID principles.
 *
 * New architecture:
 * - types.ts: Interface definitions
 * - command-data.ts: Command configuration and data
 * - animations.ts: Framer Motion animation variants
 * - useCommandPalette.ts: Business logic hook
 * - CommandItem.tsx: Reusable command item component
 * - CommandGroup.tsx: Command group container
 * - CommandPalette.tsx: Main composition component
 */

// Export the new modular implementation
export { CommandPalette } from './command-palette/CommandPalette';
export type { CommandItem, CommandPaletteProps } from './command-palette/types';