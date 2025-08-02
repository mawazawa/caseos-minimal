/**
 * Command Item Component
 *
 * Reusable command item UI component following DRY principle.
 * Eliminates code duplication from the original monolithic component.
 */

'use client';

import { CommandItem as CmdkItem } from 'cmdk';
import { motion } from 'framer-motion';
import type { CommandItem as CommandItemType } from './types';
import { commandGroups } from './command-data';
import { itemVariants } from './animations';

interface CommandItemProps {
  command: CommandItemType;
  onSelect: (command: CommandItemType) => void;
  variant?: 'default' | 'recent';
}

/**
 * Individual command item with consistent styling and behavior
 */
export function CommandItem({
  command,
  onSelect,
  variant = 'default'
}: CommandItemProps) {
  const groupConfig = commandGroups[command.group];
  const isRecent = variant === 'recent';

  return (
    <CmdkItem
      key={command.id}
      value={`${command.title} ${command.keywords?.join(' ') || ''}`}
      onSelect={() => onSelect(command)}
      asChild
    >
      <motion.div
        variants={itemVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 group"
      >
        {/* Icon Container */}
        <div
          className={`w-8 h-8 rounded-md flex items-center justify-center ${
            isRecent
              ? 'bg-blue-50 dark:bg-blue-900/20 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40'
              : groupConfig?.className || 'bg-gray-50 dark:bg-gray-800 group-hover:bg-gray-100 dark:group-hover:bg-gray-700'
          }`}
        >
          <div className={groupConfig?.iconClassName || 'text-gray-600 dark:text-gray-400'}>
            {command.icon}
          </div>
        </div>

        {/* Content */}
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

        {/* Keyboard Shortcut */}
        {command.shortcut && (
          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono text-gray-600 dark:text-gray-400">
            {command.shortcut}
          </kbd>
        )}

        {/* Recent Indicator */}
        {isRecent && (
          <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 opacity-60" />
        )}
      </motion.div>
    </CmdkItem>
  );
}