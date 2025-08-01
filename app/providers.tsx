/*
 * ██████╗ ██████╗  ██████╗ ██╗   ██╗██╗██████╗ ███████╗██████╗ ███████╗
 * ██╔══██╗██╔══██╗██╔═══██╗██║   ██║██║██╔══██╗██╔════╝██╔══██╗██╔════╝
 * ██████╔╝██████╔╝██║   ██║██║   ██║██║██║  ██║█████╗  ██████╔╝███████╗
 * ██╔═══╝ ██╔══██╗██║   ██║╚██╗ ██╔╝██║██║  ██║██╔══╝  ██╔══██╗╚════██║
 * ██║     ██║  ██║╚██████╔╝ ╚████╔╝ ██║██████╔╝███████╗██║  ██║███████║
 * ╚═╝     ╚═╝  ╚═╝ ╚═════╝   ╚═══╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝
 * Application Providers - CaseOS Session Management
 */

'use client';

import { SessionProvider } from 'next-auth/react';
import { CommandPaletteProvider } from './components/command-palette-provider';
import { ThemeProvider } from './components/theme';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider enableSystem enableTransitions>
      <SessionProvider>
        <CommandPaletteProvider>
          {children}
        </CommandPaletteProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}