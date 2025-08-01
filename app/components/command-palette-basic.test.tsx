/*
 *  ██████╗ ██████╗ ███╗   ███╗███╗   ███╗ █████╗ ███╗   ██╗██████╗ 
 * ██╔════╝██╔═══██╗████╗ ████║████╗ ████║██╔══██╗████╗  ██║██╔══██╗
 * ██║     ██║   ██║██╔████╔██║██╔████╔██║███████║██╔██╗ ██║██║  ██║
 * ██║     ██║   ██║██║╚██╔╝██║██║╚██╔╝██║██╔══██║██║╚██╗██║██║  ██║
 * ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║██████╔╝
 *  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝ 
 * Command Palette Basic Tests - Focused Testing
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { CommandPaletteProvider, useCommandPalette } from './command-palette-provider';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe('CommandPaletteProvider Basic', () => {
  const TestComponent = () => {
    const { isOpen, open, close, toggle } = useCommandPalette();
    return (
      <div>
        <span data-testid="is-open">{isOpen.toString()}</span>
        <button onClick={open} data-testid="open-btn">Open</button>
        <button onClick={close} data-testid="close-btn">Close</button>
        <button onClick={toggle} data-testid="toggle-btn">Toggle</button>
      </div>
    );
  };

  beforeEach(() => {
    mockPush.mockClear();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });
  });

  it('initializes with closed state', () => {
    render(
      <CommandPaletteProvider>
        <TestComponent />
      </CommandPaletteProvider>
    );
    
    expect(screen.getByTestId('is-open')).toHaveTextContent('false');
  });

  it('opens command palette', () => {
    render(
      <CommandPaletteProvider>
        <TestComponent />
      </CommandPaletteProvider>
    );
    
    fireEvent.click(screen.getByTestId('open-btn'));
    expect(screen.getByTestId('is-open')).toHaveTextContent('true');
  });

  it('closes command palette', () => {
    render(
      <CommandPaletteProvider>
        <TestComponent />
      </CommandPaletteProvider>
    );
    
    fireEvent.click(screen.getByTestId('open-btn'));
    expect(screen.getByTestId('is-open')).toHaveTextContent('true');
    
    fireEvent.click(screen.getByTestId('close-btn'));
    expect(screen.getByTestId('is-open')).toHaveTextContent('false');
  });

  it('toggles command palette', () => {
    render(
      <CommandPaletteProvider>
        <TestComponent />
      </CommandPaletteProvider>
    );
    
    expect(screen.getByTestId('is-open')).toHaveTextContent('false');
    
    fireEvent.click(screen.getByTestId('toggle-btn'));
    expect(screen.getByTestId('is-open')).toHaveTextContent('true');
    
    fireEvent.click(screen.getByTestId('toggle-btn'));
    expect(screen.getByTestId('is-open')).toHaveTextContent('false');
  });

  it('throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useCommandPalette must be used within a CommandPaletteProvider');
    
    consoleSpy.mockRestore();
  });
});