import '@testing-library/jest-dom';

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock intersection observer
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Suppress console warnings for tests
const originalWarn = console.warn;
const originalError = console.error;

beforeEach(() => {
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterEach(() => {
  console.warn = originalWarn;
  console.error = originalError;
});

// Mock framer-motion for stable testing
jest.mock('framer-motion', () => ({
  motion: {
    div: jest.fn(({ children, ...props }) => {
      // Filter out motion-specific props that shouldn't be on DOM elements
      const {
        animate, initial, exit, variants, transition, whileHover, whileTap,
        layoutId, layout, onAnimationComplete, onAnimationStart,
        drag, dragConstraints, onDragEnd, ...domProps
      } = props;
      return <div data-testid="motion-div" {...domProps}>{children}</div>;
    }),
    button: jest.fn(({ children, ...props }) => {
      const {
        animate, initial, exit, variants, transition, whileHover, whileTap,
        layoutId, layout, onAnimationComplete, onAnimationStart,
        drag, dragConstraints, onDragEnd, ...domProps
      } = props;
      return <button data-testid="motion-button" {...domProps}>{children}</button>;
    }),
  },
  AnimatePresence: jest.fn(({ children }) => <div data-testid="animate-presence">{children}</div>),
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

// Mock Next.js router
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Export for test access
global.mockPush = mockPush;