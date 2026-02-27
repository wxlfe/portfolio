import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SiteHeader } from '@/components/site-header';

describe('SiteHeader', () => {
  it('renders nav links', () => {
    render(<SiteHeader />);

    expect(screen.getByRole('link', { name: 'Projects' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Skills' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Experience' })).toBeTruthy();
  });

  it('toggles mobile menu button state', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const toggle = screen.getByRole('button', { name: 'Open navigation menu' });
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    await user.click(toggle);
    expect(screen.getByRole('button', { name: 'Close navigation menu' }).getAttribute('aria-expanded')).toBe('true');
  });
});
