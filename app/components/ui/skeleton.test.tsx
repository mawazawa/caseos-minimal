/*
 * ███████╗██╗  ██╗███████╗██╗     ███████╗████████╗ ██████╗ ███╗   ██╗
 * ██╔════╝██║ ██╔╝██╔════╝██║     ██╔════╝╚══██╔══╝██╔═══██╗████╗  ██║
 * ███████╗█████╔╝ █████╗  ██║     █████╗     ██║   ██║   ██║██╔██╗ ██║
 * ╚════██║██╔═██╗ ██╔══╝  ██║     ██╔══╝     ██║   ██║   ██║██║╚██╗██║
 * ███████║██║  ██╗███████╗███████╗███████╗   ██║   ╚██████╔╝██║ ╚████║
 * ╚══════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═══╝
 * Skeleton Component Tests
 */

import { render, screen } from '@testing-library/react';
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonTableRow,
  SkeletonListItem,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonPage,
  SkeletonForm,
} from './skeleton';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('Skeleton Components', () => {
  describe('Skeleton', () => {
    it('renders basic skeleton', () => {
      render(<Skeleton className="h-10 w-20" />);
      const skeleton = document.querySelector('.bg-\\[var\\(--color-background-secondary\\)\\]');
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass('h-10', 'w-20');
    });

    it('renders without animation when animate is false', () => {
      render(<Skeleton animate={false} />);
      const animatedDiv = document.querySelector('.absolute.inset-0');
      expect(animatedDiv).not.toBeInTheDocument();
    });
  });

  describe('SkeletonText', () => {
    it('renders single line by default', () => {
      render(<SkeletonText />);
      const skeletons = document.querySelectorAll('.h-4');
      expect(skeletons).toHaveLength(1);
    });

    it('renders multiple lines', () => {
      render(<SkeletonText lines={3} />);
      const skeletons = document.querySelectorAll('.h-4');
      expect(skeletons).toHaveLength(3);
    });

    it('makes last line shorter when multiple lines', () => {
      render(<SkeletonText lines={3} />);
      const skeletons = document.querySelectorAll('.h-4');
      const lastSkeleton = skeletons[skeletons.length - 1];
      expect(lastSkeleton).toHaveClass('w-3/4');
    });
  });

  describe('SkeletonCard', () => {
    it('renders card skeleton with correct structure', () => {
      render(<SkeletonCard />);
      const card = document.querySelector('.rounded-\\[var\\(--radius-lg\\)\\]');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('p-4');
      
      // Check for skeleton elements
      const skeletons = card?.querySelectorAll('.bg-\\[var\\(--color-background-secondary\\)\\]');
      expect(skeletons?.length).toBeGreaterThan(0);
    });
  });

  describe('SkeletonTableRow', () => {
    it('renders default 4 columns', () => {
      render(<SkeletonTableRow />);
      const skeletons = document.querySelectorAll('.h-4');
      expect(skeletons).toHaveLength(4);
    });

    it('renders custom number of columns', () => {
      render(<SkeletonTableRow columns={6} />);
      const skeletons = document.querySelectorAll('.h-4');
      expect(skeletons).toHaveLength(6);
    });
  });

  describe('SkeletonAvatar', () => {
    it('renders with default medium size', () => {
      render(<SkeletonAvatar />);
      const avatar = document.querySelector('.rounded-full');
      expect(avatar).toHaveClass('h-8', 'w-8');
    });

    it('renders with small size', () => {
      render(<SkeletonAvatar size="sm" />);
      const avatar = document.querySelector('.rounded-full');
      expect(avatar).toHaveClass('h-6', 'w-6');
    });

    it('renders with large size', () => {
      render(<SkeletonAvatar size="lg" />);
      const avatar = document.querySelector('.rounded-full');
      expect(avatar).toHaveClass('h-10', 'w-10');
    });
  });

  describe('SkeletonButton', () => {
    it('renders with default size', () => {
      render(<SkeletonButton />);
      const button = document.querySelector('.rounded-\\[var\\(--radius-md\\)\\]');
      expect(button).toHaveClass('h-10', 'w-24');
    });

    it('renders with small size', () => {
      render(<SkeletonButton size="sm" />);
      const button = document.querySelector('.rounded-\\[var\\(--radius-md\\)\\]');
      expect(button).toHaveClass('h-8', 'w-20');
    });

    it('renders with large size', () => {
      render(<SkeletonButton size="lg" />);
      const button = document.querySelector('.rounded-\\[var\\(--radius-md\\)\\]');
      expect(button).toHaveClass('h-12', 'w-32');
    });
  });

  describe('SkeletonListItem', () => {
    it('renders list item skeleton', () => {
      render(<SkeletonListItem />);
      const container = document.querySelector('.flex.items-center.gap-3');
      expect(container).toBeInTheDocument();
      
      const skeletons = container?.querySelectorAll('.bg-\\[var\\(--color-background-secondary\\)\\]');
      expect(skeletons).toHaveLength(2);
    });
  });

  describe('SkeletonForm', () => {
    it('renders form skeleton with 3 fields', () => {
      render(<SkeletonForm />);
      const fieldGroups = document.querySelectorAll('.space-y-6 > div');
      expect(fieldGroups.length).toBeGreaterThanOrEqual(3);
    });

    it('renders buttons at the end', () => {
      render(<SkeletonForm />);
      const buttonContainer = document.querySelector('.flex.gap-3');
      expect(buttonContainer).toBeInTheDocument();
      const buttons = buttonContainer?.querySelectorAll('.rounded-\\[var\\(--radius-md\\)\\]');
      expect(buttons).toHaveLength(2);
    });
  });

  describe('SkeletonPage', () => {
    it('renders complete page skeleton', () => {
      render(<SkeletonPage />);
      
      // Check header
      const headerSkeletons = document.querySelectorAll('.mb-6 .h-8, .mb-6 .h-4');
      expect(headerSkeletons.length).toBeGreaterThan(0);
      
      // Check stats grid
      const statsGrid = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4');
      expect(statsGrid).toBeInTheDocument();
      
      // Check content sections
      const contentGrid = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-3');
      expect(contentGrid).toBeInTheDocument();
    });
  });
});