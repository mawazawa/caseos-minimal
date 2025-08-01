/*
 * Skeleton Component Tests
 * Testing loading states, animations, and accessibility
 */

import { render, screen, waitFor } from '@testing-library/react';
import { 
  Skeleton, 
  TextSkeleton, 
  AvatarSkeleton, 
  CardSkeleton, 
  TableSkeleton,
  ButtonSkeleton,
  PageSkeleton 
} from '../skeleton';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: jest.fn(({ children, ...props }) => (
      <div data-testid="motion-skeleton" {...props}>
        {children}
      </div>
    )),
  },
}));

// Mock utils
jest.mock('@/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
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

describe('Skeleton', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(() => mockMatchMedia(false)),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Skeleton', () => {
    it('renders with default props', () => {
      render(<Skeleton />);
      
      const skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton.style.width).toBe('100%');
      expect(skeleton.style.height).toBe('20px');
    });

    it('applies custom width and height', () => {
      render(<Skeleton width={200} height={50} />);
      
      const skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.style.width).toBe('200px');
      expect(skeleton.style.height).toBe('50px');
    });

    it('applies variant classes correctly', () => {
      const { rerender } = render(<Skeleton variant="rectangular" />);
      
      let skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.className).toContain('rounded-md');

      rerender(<Skeleton variant="circular" />);
      skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.className).toContain('rounded-full');

      rerender(<Skeleton variant="rounded" />);
      skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.className).toContain('rounded-lg');

      rerender(<Skeleton variant="text" />);
      skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.className).toContain('rounded-sm');
    });

    it('applies custom className', () => {
      render(<Skeleton className="custom-class" />);
      
      const skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.className).toContain('custom-class');
    });

    it('respects reduced motion preference', async () => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(() => mockMatchMedia(true)),
      });

      render(<Skeleton />);

      expect(window.matchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
    });

    it('disables shimmer when requested', () => {
      render(<Skeleton shimmer={false} />);
      
      const skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.style.willChange).toBe('opacity');
    });

    it('enables shimmer by default', () => {
      render(<Skeleton shimmer={true} />);
      
      const skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.style.willChange).toBe('background-position, opacity');
    });

    it('has GPU optimization styles', () => {
      render(<Skeleton />);
      
      const skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.style.transform).toBe('translateZ(0)');
    });
  });

  describe('TextSkeleton', () => {
    it('renders default number of lines', () => {
      render(<TextSkeleton />);
      
      const skeletons = screen.getAllByTestId('motion-skeleton');
      expect(skeletons).toHaveLength(3); // default lines
    });

    it('renders custom number of lines', () => {
      render(<TextSkeleton lines={5} />);
      
      const skeletons = screen.getAllByTestId('motion-skeleton');
      expect(skeletons).toHaveLength(5);
    });

    it('applies custom line height', () => {
      render(<TextSkeleton lineHeight={24} />);
      
      const skeletons = screen.getAllByTestId('motion-skeleton');
      skeletons.forEach(skeleton => {
        expect(skeleton.style.height).toBe('24px');
      });
    });

    it('applies different width to last line', () => {
      render(<TextSkeleton lines={2} lastLineWidth="50%" />);
      
      const skeletons = screen.getAllByTestId('motion-skeleton');
      expect(skeletons[0].style.width).toBe('100%');
      expect(skeletons[1].style.width).toBe('50%');
    });
  });

  describe('AvatarSkeleton', () => {
    it('renders with default medium size', () => {
      render(<AvatarSkeleton />);
      
      const skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.style.width).toBe('40px');
      expect(skeleton.style.height).toBe('40px');
      expect(skeleton.className).toContain('rounded-full');
    });

    it('renders different sizes correctly', () => {
      const { rerender } = render(<AvatarSkeleton size="sm" />);
      
      let skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.style.width).toBe('32px');

      rerender(<AvatarSkeleton size="lg" />);
      skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.style.width).toBe('56px');

      rerender(<AvatarSkeleton size="xl" />);
      skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.style.width).toBe('80px');
    });
  });

  describe('CardSkeleton', () => {
    it('renders basic card skeleton', () => {
      render(<CardSkeleton />);
      
      const skeletons = screen.getAllByTestId('motion-skeleton');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('shows avatar when requested', () => {
      render(<CardSkeleton showAvatar />);
      
      // Should have avatar skeleton (circular)
      const skeletons = screen.getAllByTestId('motion-skeleton');
      const avatarSkeleton = skeletons.find(s => s.className.includes('rounded-full'));
      expect(avatarSkeleton).toBeInTheDocument();
    });

    it('shows image when requested', () => {
      render(<CardSkeleton showImage />);
      
      // Should have image skeleton with significant height
      const skeletons = screen.getAllByTestId('motion-skeleton');
      const imageSkeleton = skeletons.find(s => s.style.height === '200px');
      expect(imageSkeleton).toBeInTheDocument();
    });

    it('renders custom number of text lines', () => {
      render(<CardSkeleton lines={5} />);
      
      // Should have more skeletons for more text lines
      const skeletons = screen.getAllByTestId('motion-skeleton');
      expect(skeletons.length).toBeGreaterThan(3);
    });
  });

  describe('TableSkeleton', () => {
    it('renders with default configuration', () => {
      render(<TableSkeleton />);
      
      const skeletons = screen.getAllByTestId('motion-skeleton');
      // 4 columns header + 5 rows * 4 columns = 24 skeletons
      expect(skeletons).toHaveLength(24);
    });

    it('renders custom rows and columns', () => {
      render(<TableSkeleton rows={3} columns={3} />);
      
      const skeletons = screen.getAllByTestId('motion-skeleton');
      // 3 columns header + 3 rows * 3 columns = 12 skeletons
      expect(skeletons).toHaveLength(12);
    });

    it('hides header when requested', () => {
      render(<TableSkeleton rows={2} columns={2} showHeader={false} />);
      
      const skeletons = screen.getAllByTestId('motion-skeleton');
      // Only 2 rows * 2 columns = 4 skeletons (no header)
      expect(skeletons).toHaveLength(4);
    });
  });

  describe('ButtonSkeleton', () => {
    it('renders with default medium size', () => {
      render(<ButtonSkeleton />);
      
      const skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.style.height).toBe('40px');
      expect(skeleton.style.width).toBe('100px');
    });

    it('renders different sizes correctly', () => {
      const { rerender } = render(<ButtonSkeleton size="sm" />);
      
      let skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.style.height).toBe('32px');
      expect(skeleton.style.width).toBe('80px');

      rerender(<ButtonSkeleton size="lg" />);
      skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.style.height).toBe('48px');
      expect(skeleton.style.width).toBe('120px');
    });

    it('applies custom width', () => {
      render(<ButtonSkeleton width={150} />);
      
      const skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.style.width).toBe('150px');
    });

    it('applies variant styling', () => {
      render(<ButtonSkeleton variant="primary" />);
      
      const skeleton = screen.getByTestId('motion-skeleton');
      expect(skeleton.className).toContain('bg-blue-200');
    });
  });

  describe('PageSkeleton', () => {
    it('renders full page skeleton with all sections', () => {
      render(<PageSkeleton />);
      
      const skeletons = screen.getAllByTestId('motion-skeleton');
      expect(skeletons.length).toBeGreaterThan(10); // Should have many skeleton elements
    });

    it('hides sidebar when requested', () => {
      const { container } = render(<PageSkeleton showSidebar={false} />);
      
      // Check if sidebar content is not rendered
      expect(container.querySelector('.w-64')).not.toBeInTheDocument();
    });

    it('hides header when requested', () => {
      const { container } = render(<PageSkeleton showHeader={false} />);
      
      // Check if header content is not rendered
      expect(container.querySelector('.border-b')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<PageSkeleton className="custom-page" />);
      
      expect(container.firstChild).toHaveClass('custom-page');
    });
  });

  describe('Accessibility and Performance', () => {
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

      const { unmount } = render(<Skeleton />);

      expect(mockAddEventListener).toHaveBeenCalled();

      unmount();

      expect(mockRemoveEventListener).toHaveBeenCalled();
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

      render(<Skeleton />);

      await waitFor(() => {
        expect(mockMediaQuery.addEventListener).toHaveBeenCalled();
      });

      // Simulate media query change
      if (mediaQueryCallback!) {
        mediaQueryCallback({ matches: true });
      }

      expect(screen.getByTestId('motion-skeleton')).toBeInTheDocument();
    });
  });
});