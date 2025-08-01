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

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <CommandPaletteProvider>
        {children}
      </CommandPaletteProvider>
    </SessionProvider>
  );
}