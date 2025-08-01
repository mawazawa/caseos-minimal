/*
 * ██████╗███╗   ███╗██████╗ ██╗  ██╗    ███╗   ███╗ ██████╗  ██████╗██╗  ██╗
 * ██╔════╝████╗ ████║██╔══██╗██║ ██╔╝    ████╗ ████║██╔═══██╗██╔════╝██║ ██╔╝
 * ██║     ██╔████╔██║██║  ██║█████╔╝     ██╔████╔██║██║   ██║██║     █████╔╝ 
 * ██║     ██║╚██╔╝██║██║  ██║██╔═██╗     ██║╚██╔╝██║██║   ██║██║     ██╔═██╗ 
 * ╚██████╗██║ ╚═╝ ██║██████╔╝██║  ██╗    ██║ ╚═╝ ██║╚██████╔╝╚██████╗██║  ██╗
 *  ╚═════╝╚═╝     ╚═╝╚═════╝ ╚═╝  ╚═╝    ╚═╝     ╚═╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝
 * Mock for cmdk library - Used in Jest tests
 */

import React from 'react';

const Command = React.forwardRef<HTMLDivElement, any>(({ children, onOpenChange, ...props }, ref) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onOpenChange) {
        onOpenChange(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onOpenChange]);

  return (
    <div ref={ref} {...props} cmdk-root="">
      {children}
    </div>
  );
});
Command.displayName = 'Command';

const CommandInput = React.forwardRef<HTMLInputElement, any>(({ value, onValueChange, ...props }, ref) => {
  return (
    <input
      ref={ref}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      {...props}
      cmdk-input=""
    />
  );
});
CommandInput.displayName = 'CommandInput';

const CommandList = React.forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props} cmdk-list="">
      <div cmdk-list-sizer="">{children}</div>
    </div>
  );
});
CommandList.displayName = 'CommandList';

const CommandEmpty = React.forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props} cmdk-empty="">
      {children}
    </div>
  );
});
CommandEmpty.displayName = 'CommandEmpty';

const CommandGroup = React.forwardRef<HTMLDivElement, any>(({ children, value, ...props }, ref) => {
  return (
    <div ref={ref} {...props} cmdk-group="" role="presentation" value={value} data-value={value}>
      {children}
    </div>
  );
});
CommandGroup.displayName = 'CommandGroup';

const CommandItem = React.forwardRef<HTMLDivElement, any>(({ children, onSelect, disabled = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      onClick={() => !disabled && onSelect?.()}
      {...props}
      cmdk-item=""
      aria-disabled={disabled}
      data-disabled={disabled}
      aria-selected="false"
      data-selected="false"
    >
      {children}
    </div>
  );
});
CommandItem.displayName = 'CommandItem';

const CommandShortcut = React.forwardRef<HTMLSpanElement, any>(({ children, ...props }, ref) => {
  return (
    <span ref={ref} {...props} cmdk-shortcut="">
      {children}
    </span>
  );
});
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
};