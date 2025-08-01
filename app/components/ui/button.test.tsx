/*
 * ██████╗ ██╗   ██╗████████╗████████╗ ██████╗ ███╗   ██╗    ████████╗███████╗███████╗████████╗
 * ██╔══██╗██║   ██║╚══██╔══╝╚══██╔══╝██╔═══██╗████╗  ██║    ╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝
 * ██████╔╝██║   ██║   ██║      ██║   ██║   ██║██╔██╗ ██║       ██║   █████╗  ███████╗   ██║   
 * ██╔══██╗██║   ██║   ██║      ██║   ██║   ██║██║╚██╗██║       ██║   ██╔══╝  ╚════██║   ██║   
 * ██████╔╝╚██████╔╝   ██║      ██║   ╚██████╔╝██║ ╚████║       ██║   ███████╗███████║   ██║   
 * ╚═════╝  ╚═════╝    ╚═╝      ╚═╝    ╚═════╝ ╚═╝  ╚═══╝       ╚═╝   ╚══════╝╚══════╝   ╚═╝   
 * Button Component Unit Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button';
import { Plus, Check } from 'lucide-react';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with children text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('renders with custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Button</Button>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Variants', () => {
    it('renders primary variant by default', () => {
      render(<Button>Primary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[var(--color-accent)]');
    });

    it('renders secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[var(--color-surface)]');
    });

    it('renders ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-[var(--color-text-secondary)]');
    });

    it('renders destructive variant', () => {
      render(<Button variant="destructive">Delete</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[var(--color-error)]');
    });
  });

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Button>Medium</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9');
    });

    it('renders small size', () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-8');
    });

    it('renders large size', () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10');
    });
  });

  describe('Icons', () => {
    it('renders with left icon', () => {
      render(
        <Button leftIcon={<Plus size={16} />}>
          Add Item
        </Button>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Add Item')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      render(
        <Button rightIcon={<Check size={16} />}>
          Save
        </Button>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('renders with both icons', () => {
      render(
        <Button leftIcon={<Plus size={16} />} rightIcon={<Check size={16} />}>
          Action
        </Button>
      );
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('handles disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:pointer-events-none');
    });

    it('handles loading state', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      
      // Check for loading spinner
      const spinner = button.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
      
      // Check that content is hidden
      const loadingText = screen.getByText('Loading');
      const contentSpan = loadingText.closest('span');
      expect(contentSpan).toHaveClass('opacity-0');
    });

    it('prevents clicks when loading', () => {
      const handleClick = jest.fn();
      render(
        <Button isLoading onClick={handleClick}>
          Click me
        </Button>
      );
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard navigation', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Press me</Button>);
      const button = screen.getByRole('button');
      
      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('prevents default when disabled', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();
      
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Button aria-label="Save document">Save</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Save document');
    });

    it('supports aria-pressed', () => {
      render(<Button aria-pressed="true">Toggle</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true');
    });

    it('supports aria-disabled', () => {
      render(<Button disabled aria-disabled="true">Disabled</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    });

    it('maintains focus visibility', () => {
      render(<Button>Focus me</Button>);
      const button = screen.getByRole('button');
      
      button.focus();
      expect(button).toHaveClass('focus-visible:outline-none');
      expect(button).toHaveClass('focus-visible:ring-2');
    });
  });

  describe('HTML Button Props', () => {
    it('passes through native button props', () => {
      render(
        <Button
          type="submit"
          form="test-form"
          name="submit-button"
          value="submit"
        >
          Submit
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('form', 'test-form');
      expect(button).toHaveAttribute('name', 'submit-button');
      expect(button).toHaveAttribute('value', 'submit');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children gracefully', () => {
      render(<Button>{''}</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('handles complex children', () => {
      render(
        <Button>
          <span>Complex</span>
          <strong>Children</strong>
        </Button>
      );
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Children')).toBeInTheDocument();
    });

    it('maintains button functionality with custom onClick and disabled', () => {
      const handleClick = jest.fn();
      const { rerender } = render(
        <Button onClick={handleClick}>Click</Button>
      );
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      rerender(
        <Button onClick={handleClick} disabled>
          Click
        </Button>
      );
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1); // No additional calls
    });
  });
});