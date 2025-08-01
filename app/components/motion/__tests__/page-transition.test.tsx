/*
 * PageTransition Component Tests
 * Comprehensive testing following DESIGN_EXCELLENCE.md requirements
 * Tests animation behavior, accessibility, and performance
 */

import { render, screen, waitFor, act } from '@testing-library/react';
import { PageTransition } from '../page-transition';

// Mock framer-motion for predictable testing
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

// Mock window.matchMedia for reduced motion testing
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

describe('PageTransition', () => {
  // Clean up after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children content correctly', () => {
    render(
      <PageTransition>
        <div data-testid="test-content">Test Content</div>
      </PageTransition>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(
      <PageTransition className="custom-class">
        <div>Content</div>
      </PageTransition>
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv.className).toContain('custom-class');
  });

  it('sets correct accessibility attributes', () => {
    render(
      <PageTransition>
        <div>Content</div>
      </PageTransition>
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv).toHaveAttribute('aria-live', 'polite');
    expect(motionDiv).toHaveAttribute('role', 'main');
  });

  it('handles reduced motion preference correctly', async () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => mockMatchMedia(true)),
    });

    render(
      <PageTransition>
        <div>Content</div>
      </PageTransition>
    );

    // Verify matchMedia was called with correct query
    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');

    // Wait for effect to complete
    await waitFor(() => {
      expect(window.matchMedia).toHaveBeenCalled();
    });
  });

  it('handles normal motion preference correctly', async () => {
    // Mock normal motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => mockMatchMedia(false)),
    });

    render(
      <PageTransition>
        <div>Content</div>
      </PageTransition>
    );

    expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
  });

  it('handles pageKey changes for route transitions', () => {
    const { rerender } = render(
      <PageTransition pageKey="page1">
        <div>Page 1</div>
      </PageTransition>
    );

    // Change pageKey to trigger transition
    rerender(
      <PageTransition pageKey="page2">
        <div>Page 2</div>
      </PageTransition>
    );

    expect(screen.getByText('Page 2')).toBeInTheDocument();
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
      <PageTransition>
        <div>Content</div>
      </PageTransition>
    );

    // Verify event listener was added
    expect(mockAddEventListener).toHaveBeenCalled();

    // Unmount component
    unmount();

    // Verify cleanup occurred
    expect(mockRemoveEventListener).toHaveBeenCalled();
  });

  it('has correct performance optimization styles', () => {
    render(
      <PageTransition>
        <div>Content</div>
      </PageTransition>
    );

    const motionDiv = screen.getByTestId('motion-div');
    
    // Check for performance optimization styles
    expect(motionDiv.style.willChange).toBe('transform, opacity, filter');
    expect(motionDiv.style.transform).toBe('translateZ(0)');
  });

  it('includes min-height for proper layout', () => {
    render(
      <PageTransition>
        <div>Content</div>
      </PageTransition>
    );

    const motionDiv = screen.getByTestId('motion-div');
    expect(motionDiv.className).toContain('min-h-screen');
  });

  it('responds to media query changes dynamically', async () => {
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
      <PageTransition>
        <div>Content</div>
      </PageTransition>
    );

    // Wait for initial effect
    await waitFor(() => {
      expect(mockMediaQuery.addEventListener).toHaveBeenCalled();
    });

    // Simulate media query change
    act(() => {
      mediaQueryCallback({ matches: true });
    });

    // Component should handle the change without errors
    expect(screen.getByTestId('motion-div')).toBeInTheDocument();
  });
});