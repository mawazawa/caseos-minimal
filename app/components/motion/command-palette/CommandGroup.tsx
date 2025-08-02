/**
 * Command Group Component
 *
 * Reusable command group container following Single Responsibility Principle.
 * Handles grouped command display with consistent styling.
 */

'use client';

import { CommandGroup as CmdkGroup, CommandSeparator } from 'cmdk';
import { motion } from 'framer-motion';
import { CommandItem } from './CommandItem';
import { listVariants } from './animations';
import type { CommandItem as CommandItemType } from './types';

interface CommandGroupProps {
  heading: string;
  commands: CommandItemType[];
  onCommandSelect: (command: CommandItemType) => void;
  variant?: 'default' | 'recent';
  showSeparator?: boolean;
}

/**
 * Command group with header and animated list of commands
 */
export function CommandGroup({
  heading,
  commands,
  onCommandSelect,
  variant = 'default',
  showSeparator = true
}: CommandGroupProps) {
  // Don't render if no commands
  if (commands.length === 0) {
    return null;
  }

  return (
    <>
      {showSeparator && <CommandSeparator className="my-2" />}

      <CmdkGroup heading={heading}>
        <motion.div
          variants={listVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {commands.map((command) => (
            <CommandItem
              key={command.id}
              command={command}
              onSelect={onCommandSelect}
              variant={variant}
            />
          ))}
        </motion.div>
      </CmdkGroup>
    </>
  );
}