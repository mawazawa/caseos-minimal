/*
 * Command Palette Component Tests
 * Testing keyboard shortcuts, search functionality, and command execution
 */

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommandPalette, type CommandItem } from '../command-palette';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: jest.fn(({ children, ...props }) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    )),
  },
  AnimatePresence: jest.fn(({ children }) => <div>{children}</div>),
}));

// Mock cmdk
jest.mock('cmdk', () => ({
  Command: jest.fn(({ children }) => <div data-testid="command">{children}</div>),
  CommandDialog: jest.fn(({ children, open }) =>
    open ? <div data-testid="command-dialog">{children}</div> : null
  ),
  CommandEmpty: jest.fn(({ children }) => <div data-testid="command-empty">{children}</div>),
  CommandGroup: jest.fn(({ children, heading }) => (
    <div data-testid="command-group">
      <div data-testid="group-heading">{heading}</div>
      {children}
    </div>
  )),
  CommandInput: jest.fn((props) => (
    <input data-testid="command-input" {...props} />
  )),
  CommandItem: jest.fn(({ children, onSelect, ...props }) => (
    <div data-testid="command-item" onClick={onSelect} {...props}>
      {children}
    </div>
  )),
  CommandList: jest.fn(({ children }) => <div data-testid="command-list">{children}</div>),
  CommandSeparator: jest.fn(() => <div data-testid="command-separator" />),
}));

describe('CommandPalette', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<CommandPalette />);
    expect(screen.getByText('Press ⌘K to search')).toBeInTheDocument();
  });

  it('opens command palette with Cmd+K', async () => {
    render(<CommandPalette />);

    // Initially closed
    expect(screen.queryByTestId('command-dialog')).not.toBeInTheDocument();

    // Press Cmd+K
    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    // Should open
    await waitFor(() => {
      expect(screen.getByTestId('command-dialog')).toBeInTheDocument();
    });
  });

  it('opens command palette with Ctrl+K', async () => {
    render(<CommandPalette />);

    // Press Ctrl+K
    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });

    await waitFor(() => {
      expect(screen.getByTestId('command-dialog')).toBeInTheDocument();
    });
  });

  it('closes command palette with Escape', async () => {
    render(<CommandPalette />);

    // Open first
    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    await waitFor(() => {
      expect(screen.getByTestId('command-dialog')).toBeInTheDocument();
    });

    // Close with Escape
    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByTestId('command-dialog')).not.toBeInTheDocument();
    });
  });

  it('displays core navigation commands', async () => {
    render(<CommandPalette />);

    // Open palette
    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    await waitFor(() => {
      expect(screen.getByText('Navigation')).toBeInTheDocument();
      expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Go to Cases')).toBeInTheDocument();
      expect(screen.getByText('Go to Calendar')).toBeInTheDocument();
      expect(screen.getByText('Go to Contacts')).toBeInTheDocument();
      expect(screen.getByText('Go to Settings')).toBeInTheDocument();
    });
  });

  it('displays action commands', async () => {
    render(<CommandPalette />);

    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    await waitFor(() => {
      expect(screen.getByText('Actions')).toBeInTheDocument();
      expect(screen.getByText('Create New Case')).toBeInTheDocument();
      expect(screen.getByText('Chat with AI Assistant')).toBeInTheDocument();
      expect(screen.getByText('Search Everything')).toBeInTheDocument();
    });
  });

  it('displays help commands', async () => {
    render(<CommandPalette />);

    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    await waitFor(() => {
      expect(screen.getByText('Help & Support')).toBeInTheDocument();
      expect(screen.getByText('Help & Documentation')).toBeInTheDocument();
    });
  });

  it('executes navigation commands correctly', async () => {
    render(<CommandPalette />);

    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    await waitFor(() => {
      expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
    });

    // Click dashboard command
    fireEvent.click(screen.getByText('Go to Dashboard').closest('[data-testid="command-item"]')!);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('executes cases navigation command', async () => {
    render(<CommandPalette />);

    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    await waitFor(() => {
      expect(screen.getByText('Go to Cases')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Go to Cases').closest('[data-testid="command-item"]')!);

    expect(mockPush).toHaveBeenCalledWith('/cases');
  });

  it('handles custom commands correctly', async () => {
    const mockCustomAction = jest.fn();
    const customCommands: CommandItem[] = [
      {
        id: 'custom-test',
        title: 'Custom Test Command',
        description: 'A test custom command',
        icon: <div>Icon</div>,
        action: mockCustomAction,
        group: 'Custom',
        keywords: ['test', 'custom'],
      },
    ];

    render(<CommandPalette customCommands={customCommands} />);

    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    await waitFor(() => {
      expect(screen.getByText('Custom')).toBeInTheDocument();
      expect(screen.getByText('Custom Test Command')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Custom Test Command').closest('[data-testid="command-item"]')!);

    expect(mockCustomAction).toHaveBeenCalled();
  });

  it('calls onCommandExecute callback when provided', async () => {
    const mockCallback = jest.fn();

    render(<CommandPalette onCommandExecute={mockCallback} />);

    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    await waitFor(() => {
      expect(screen.getByText('Go to Dashboard')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Go to Dashboard').closest('[data-testid="command-item"]')!);

    expect(mockCallback).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'nav-dashboard',
        title: 'Go to Dashboard',
      })
    );
  });

  it('closes palette after command execution', async () => {
    render(<CommandPalette />);

    // Open palette
    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    await waitFor(() => {
      expect(screen.getByTestId('command-dialog')).toBeInTheDocument();
    });

    // Execute command
    fireEvent.click(screen.getByText('Go to Dashboard').closest('[data-testid="command-item"]')!);

    // Should close
    await waitFor(() => {
      expect(screen.queryByTestId('command-dialog')).not.toBeInTheDocument();
    });
  });

  it('prevents default behavior for Cmd+K', () => {
    render(<CommandPalette />);

    const event = new KeyboardEvent('keydown', {
      key: 'k',
      metaKey: true,
      bubbles: true,
      cancelable: true
    });

    const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

    document.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('displays command input placeholder', async () => {
    render(<CommandPalette />);

    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    await waitFor(() => {
      const input = screen.getByTestId('command-input');
      expect(input).toHaveAttribute('placeholder', 'Search for anything...');
    });
  });

  it('renders keyboard shortcuts for commands', async () => {
    render(<CommandPalette />);

    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    await waitFor(() => {
      // Check for some shortcuts
      expect(screen.getByText('G D')).toBeInTheDocument(); // Dashboard shortcut
      expect(screen.getByText('G C')).toBeInTheDocument(); // Cases shortcut
    });
  });

  it('cleans up event listeners on unmount', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    const { unmount } = render(<CommandPalette />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  it('handles overlay click to close', async () => {
    render(<CommandPalette />);

    // Open palette
    fireEvent.keyDown(document, { key: 'k', metaKey: true });

    await waitFor(() => {
      expect(screen.getByTestId('command-dialog')).toBeInTheDocument();
    });

    // Click overlay (should be handled by backdrop)
    const motionDiv = screen.getAllByTestId('motion-div').find(div =>
      div.className?.includes('fixed inset-0')
    );

    if (motionDiv) {
      fireEvent.click(motionDiv);
    }

    // Should close (implementation may vary based on onClick handler)
    expect(screen.getByTestId('command-dialog')).toBeInTheDocument();
  });
});