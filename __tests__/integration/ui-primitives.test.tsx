import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

describe('UI primitives', () => {
  it('renders button variants', () => {
    render(<Button variant="outline" size="sm">Click</Button>);
    const button = screen.getByRole('button', { name: 'Click' });
    expect(button.className).toContain('ui-button-outline');
    expect(button.className).toContain('ui-button-sm');
  });

  it('renders badge default outline variant', () => {
    render(<Badge>TypeScript</Badge>);
    expect(screen.getByText('TypeScript').className).toContain('ui-badge-outline');
  });

  it('clamps progress values to 0..100', () => {
    const { rerender, container } = render(<Progress value={180} />);
    const progress = container.querySelector('.ui-progress');
    const indicator = container.querySelector('.ui-progress-indicator');

    expect(progress?.getAttribute('aria-valuenow')).toBe('100');
    expect((indicator as HTMLElement | null)?.style.width).toBe('100%');

    rerender(<Progress value={-10} />);
    expect(progress?.getAttribute('aria-valuenow')).toBe('0');
    expect((indicator as HTMLElement | null)?.style.width).toBe('0%');
  });
});
