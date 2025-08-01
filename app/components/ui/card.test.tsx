/*
 * ██████╗ █████╗ ██████╗ ██████╗     ████████╗███████╗███████╗████████╗
 * ██╔════╝██╔══██╗██╔══██╗██╔══██╗    ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝
 * ██║     ███████║██████╔╝██║  ██║       ██║   █████╗  ███████╗   ██║   
 * ██║     ██╔══██║██╔══██╗██║  ██║       ██║   ██╔══╝  ╚════██║   ██║   
 * ╚██████╗██║  ██║██║  ██║██████╔╝       ██║   ███████╗███████║   ██║   
 *  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝        ╚═╝   ╚══════╝╚══════╝   ╚═╝   
 * Card Component Unit Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardContent } from './card';

describe('Card Component', () => {
  describe('Basic Rendering', () => {
    it('renders Card with children', () => {
      render(
        <Card>
          <div>Card content</div>
        </Card>
      );
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <Card className="custom-card-class" data-testid="custom-card">
          Content
        </Card>
      );
      const card = container.querySelector('[data-testid="custom-card"]');
      expect(card).toHaveClass('custom-card-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Content</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Card Variants', () => {
    it('renders default surface variant', () => {
      const { container } = render(<Card data-testid="default-card">Default</Card>);
      const card = container.querySelector('[data-testid="default-card"]');
      expect(card).toHaveClass('bg-[var(--color-surface)]');
    });

    it('renders elevated variant', () => {
      const { container } = render(<Card variant="elevated" data-testid="elevated-card">Elevated</Card>);
      const card = container.querySelector('[data-testid="elevated-card"]');
      expect(card).toHaveClass('bg-[var(--color-surface-elevated)]');
      expect(card).toHaveClass('shadow-[var(--shadow-sm)]');
    });

    it('renders outlined variant', () => {
      const { container } = render(<Card variant="outlined" data-testid="outlined-card">Outlined</Card>);
      const card = container.querySelector('[data-testid="outlined-card"]');
      expect(card).toHaveClass('border');
    });
  });

  describe('Card Padding', () => {
    it('applies default medium padding', () => {
      const { container } = render(<Card data-testid="medium-padding">Medium padding</Card>);
      const card = container.querySelector('[data-testid="medium-padding"]');
      expect(card).toHaveClass('p-4');
    });

    it('applies small padding', () => {
      const { container } = render(<Card padding="sm" data-testid="small-padding">Small padding</Card>);
      const card = container.querySelector('[data-testid="small-padding"]');
      expect(card).toHaveClass('p-3');
    });

    it('applies large padding', () => {
      const { container } = render(<Card padding="lg" data-testid="large-padding">Large padding</Card>);
      const card = container.querySelector('[data-testid="large-padding"]');
      expect(card).toHaveClass('p-6');
    });

    it('applies no padding', () => {
      const { container } = render(<Card padding="none" data-testid="no-padding">No padding</Card>);
      const card = container.querySelector('[data-testid="no-padding"]');
      expect(card).not.toHaveClass('p-3');
      expect(card).not.toHaveClass('p-4');
      expect(card).not.toHaveClass('p-6');
    });
  });

  describe('CardHeader Component', () => {
    it('renders CardHeader with children', () => {
      render(
        <Card>
          <CardHeader>Header content</CardHeader>
        </Card>
      );
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <Card>
          <CardHeader className="custom-header" data-testid="custom-header">Header</CardHeader>
        </Card>
      );
      const header = container.querySelector('[data-testid="custom-header"]');
      expect(header).toHaveClass('custom-header');
      expect(header).toHaveClass('flex');
      expect(header).toHaveClass('flex-col');
    });

    it('has proper spacing by default', () => {
      const { container } = render(
        <Card>
          <CardHeader data-testid="spaced-header">Header</CardHeader>
        </Card>
      );
      const header = container.querySelector('[data-testid="spaced-header"]');
      expect(header).toHaveClass('space-y-1.5');
      expect(header).toHaveClass('pb-4');
    });
  });

  describe('CardTitle Component', () => {
    it('renders CardTitle with children', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>
      );
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('renders as h3 element by default', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
        </Card>
      );
      const title = screen.getByText('Title');
      expect(title.tagName).toBe('H3');
    });

    it('applies proper text styles', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Styled Title</CardTitle>
          </CardHeader>
        </Card>
      );
      const title = screen.getByText('Styled Title');
      expect(title).toHaveClass('text-[var(--font-size-lg)]');
      expect(title).toHaveClass('font-semibold');
      expect(title).toHaveClass('leading-none');
    });

    it('accepts custom className', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle className="custom-title">Title</CardTitle>
          </CardHeader>
        </Card>
      );
      expect(screen.getByText('Title')).toHaveClass('custom-title');
    });
  });

  describe('CardContent Component', () => {
    it('renders CardContent with children', () => {
      render(
        <Card>
          <CardContent>Content body</CardContent>
        </Card>
      );
      expect(screen.getByText('Content body')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <Card>
          <CardContent className="custom-content">Content</CardContent>
        </Card>
      );
      const content = screen.getByText('Content');
      expect(content).toHaveClass('custom-content');
    });

    it('applies no default padding', () => {
      render(
        <Card>
          <CardContent>Content</CardContent>
        </Card>
      );
      const content = screen.getByText('Content');
      // CardContent should not have default padding as Card handles it
      expect(content.className).not.toContain('p-');
    });
  });

  describe('Card Composition', () => {
    it('renders complete card structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Complete Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is the card content</p>
          </CardContent>
        </Card>
      );
      
      expect(screen.getByText('Complete Card')).toBeInTheDocument();
      expect(screen.getByText('This is the card content')).toBeInTheDocument();
    });

    it('allows multiple CardContent sections', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Multi-section Card</CardTitle>
          </CardHeader>
          <CardContent>Section 1</CardContent>
          <CardContent>Section 2</CardContent>
        </Card>
      );
      
      expect(screen.getByText('Section 1')).toBeInTheDocument();
      expect(screen.getByText('Section 2')).toBeInTheDocument();
    });

    it('works without CardHeader', () => {
      render(
        <Card>
          <CardContent>Just content</CardContent>
        </Card>
      );
      
      expect(screen.getByText('Just content')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('Card can have role and aria attributes', () => {
      render(
        <Card role="article" aria-label="User profile card">
          <CardContent>Profile</CardContent>
        </Card>
      );
      
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-label', 'User profile card');
    });

    it('CardTitle maintains heading hierarchy', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Accessible Title</CardTitle>
          </CardHeader>
        </Card>
      );
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Accessible Title');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty Card gracefully', () => {
      const { container } = render(<Card>{null}</Card>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles Card with only padding prop', () => {
      const { container } = render(
        <Card padding="lg" data-testid="padding-only">
          <div>Content</div>
        </Card>
      );
      const card = container.querySelector('[data-testid="padding-only"]');
      expect(card).toHaveClass('p-6');
    });

    it('preserves additional HTML attributes', () => {
      const { container } = render(
        <Card data-testid="test-card" id="unique-card">
          Content
        </Card>
      );
      
      const card = container.querySelector('[data-testid="test-card"]');
      expect(card).toBeInTheDocument();
      expect(card).toHaveAttribute('id', 'unique-card');
      expect(card).toHaveTextContent('Content');
    });

    it('handles complex nested content', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Complex Card</CardTitle>
            <p>Subtitle text</p>
          </CardHeader>
          <CardContent>
            <div>
              <h4>Section Title</h4>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      );
      
      expect(screen.getByText('Complex Card')).toBeInTheDocument();
      expect(screen.getByText('Subtitle text')).toBeInTheDocument();
      expect(screen.getByText('Section Title')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });
});