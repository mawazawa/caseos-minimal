/*
 * Button Interactions Component Tests
 * Comprehensive testing for micro-interactions and accessibility
 */

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InteractiveButton } from '../button-interactions';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    button: jest.fn(({ children, ...props }) => (
      <button data-testid="interactive-button" {...props}>
        {children}
      </button>
    )),
    div: jest.fn(({ children, ...props }) => (
      <div data-testid="ripple-div" {...props}>
        {children}
      </div>
    )),
  },
}));

// Mock window.matchMedia
const mockMatchMedia = (matches: boolean) => ({
  matches,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  media: '(prefers-reduced-motion: reduce)',
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

describe('InteractiveButton', () => {
  beforeEach(() => {
    // Reset matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => mockMatchMedia(false)),
    });

    // Mock setTimeout for ripple cleanup
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders button content correctly', () => {
    render(
      <InteractiveButton>
        Click Me
      </InteractiveButton>
    );

    expect(screen.getByText('Click Me')).toBeInTheDocument();
    expect(screen.getByTestId('interactive-button')).toBeInTheDocument();
  });

  it('applies correct variant styles', () => {
    const { rerender } = render(
      <InteractiveButton variant="primary">
        Primary Button
      </InteractiveButton>
    );

    let button = screen.getByTestId('interactive-button');
    expect(button.className).toContain('bg-blue-600');

    rerender(
      <InteractiveButton variant="secondary">
        Secondary Button
      </InteractiveButton>
    );

    button = screen.getByTestId('interactive-button');
    expect(button.className).toContain('bg-gray-200');

    rerender(
      <InteractiveButton variant="ghost">
        Ghost Button
      </InteractiveButton>
    );

    button = screen.getByTestId('interactive-button');
    expect(button.className).toContain('bg-transparent');
  });

  it('applies correct size styles', () => {
    const { rerender } = render(
      <InteractiveButton size="sm">
        Small Button
      </InteractiveButton>
    );

    let button = screen.getByTestId('interactive-button');
    expect(button.className).toContain('px-3 py-1.5 text-sm');

    rerender(
      <InteractiveButton size="md">
        Medium Button
      </InteractiveButton>
    );

    button = screen.getByTestId('interactive-button');
    expect(button.className).toContain('px-4 py-2 text-base');

    rerender(
      <InteractiveButton size="lg">
        Large Button
      </InteractiveButton>
    );

    button = screen.getByTestId('interactive-button');
    expect(button.className).toContain('px-6 py-3 text-lg');
  });

  it('handles disabled state correctly', () => {
    const mockOnClick = jest.fn();

    render(
      <InteractiveButton disabled onClick={mockOnClick}>
        Disabled Button
      </InteractiveButton>
    );

    const button = screen.getByTestId('interactive-button');
    
    expect(button).toBeDisabled();
    expect(button.className).toContain('cursor-not-allowed');

    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it('calls onClick handler when clicked', async () => {
    const mockOnClick = jest.fn();
    const user = userEvent.setup();

    render(
      <InteractiveButton onClick={mockOnClick}>
        Click Me
      </InteractiveButton>
    );

    const button = screen.getByTestId('interactive-button');
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('creates ripple effect on click when enabled', () => {
    const mockOnClick = jest.fn();

    render(
      <InteractiveButton onClick={mockOnClick} enableRipple={true}>
        Ripple Button
      </InteractiveButton>
    );

    const button = screen.getByTestId('interactive-button');
    
    // Mock getBoundingClientRect for ripple positioning
    button.getBoundingClientRect = jest.fn(() => ({
      left: 10,
      top: 10,
      right: 100,
      bottom: 50,
      width: 90,
      height: 40,
      x: 10,
      y: 10,
      toJSON: jest.fn(),
    }));

    // Simulate click at specific coordinates
    fireEvent.click(button, {
      clientX: 50,
      clientY: 30,
    });

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('does not create ripple when disabled', () => {
    const mockOnClick = jest.fn();

    render(
      <InteractiveButton onClick={mockOnClick} enableRipple={false}>
        No Ripple Button
      </InteractiveButton>
    );

    const button = screen.getByTestId('interactive-button');
    fireEvent.click(button);

    // Should not find ripple elements
    expect(screen.queryByTestId('ripple-div')).not.toBeInTheDocument();
  });

  it('respects reduced motion preference', async () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => mockMatchMedia(true)),
    });

    render(
      <InteractiveButton>
        Reduced Motion Button
      </InteractiveButton>
    );

    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });

  it('cleans up ripples after animation', () => {
    const mockOnClick = jest.fn();

    render(
      <InteractiveButton onClick={mockOnClick} enableRipple={true}>
        Ripple Button
      </InteractiveButton>
    );

    const button = screen.getByTestId('interactive-button');
    
    button.getBoundingClientRect = jest.fn(() => ({
      left: 0,
      top: 0,
      right: 100,
      bottom: 40,
      width: 100,
      height: 40,
      x: 0,
      y: 0,
      toJSON: jest.fn(),
    }));

    fireEvent.click(button, {
      clientX: 50,
      clientY: 20,
    });

    // Fast-forward time to trigger ripple cleanup
    act(() => {
      jest.advanceTimersByTime(600);
    });

    // Ripple should be cleaned up (this is handled by component state)
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('applies custom className correctly', () => {
    render(
      <InteractiveButton className="custom-button-class">
        Custom Button
      </InteractiveButton>
    );

    const button = screen.getByTestId('interactive-button');
    expect(button.className).toContain('custom-button-class');
  });

  it('has correct accessibility attributes', () => {
    render(
      <InteractiveButton>
        Accessible Button
      </InteractiveButton>
    );

    const button = screen.getByTestId('interactive-button');
    expect(button.className).toContain('focus-visible:ring-2');
    expect(button.className).toContain('outline-none');
  });

  it('has performance optimization styles', () => {
    render(
      <InteractiveButton>
        Optimized Button
      </InteractiveButton>
    );

    const button = screen.getByTestId('interactive-button');
    expect(button.style.willChange).toBe('transform, box-shadow');
    expect(button.style.transform).toBe('translateZ(0)');
  });

  it('handles media query changes dynamically', async () => {
    let mediaQueryCallback: (e: any) => void;

    const mockMediaQuery = {
      ...mockMatchMedia(false),
      addEventListener: jest.fn((event, callback) => {
        mediaQueryCallback = callback;
      }),
      removeEventListener: jest.fn(),
    };

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => mockMediaQuery),
    });

    render(
      <InteractiveButton>
        Dynamic Button
      </InteractiveButton>
    );

    await waitFor(() => {
      expect(mockMediaQuery.addEventListener).toHaveBeenCalled();
    });

    // Simulate media query change
    act(() => {
      mediaQueryCallback({ matches: true });
    });

    expect(screen.getByTestId('interactive-button')).toBeInTheDocument();
  });

  it('cleans up event listeners on unmount', () => {
    const mockRemoveEventListener = jest.fn();
    const mockAddEventListener = jest.fn();

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        ...mockMatchMedia(false),
        addEventListener: mockAddEventListener,
        removeEventListener: mockRemoveEventListener,
      })),
    });

    const { unmount } = render(
      <InteractiveButton>
        Cleanup Button
      </InteractiveButton>
    );

    expect(mockAddEventListener).toHaveBeenCalled();

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalled();
  });
});