import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import { HomeHero } from '@/components/home-hero';

describe('HomeHero', () => {
  it('renders title, subtitle, image and contact links', () => {
    render(<HomeHero imageUrl="https://cdn.sanity.io/image.jpg" title="Nate" subtitle="Engineer" />);

    expect(screen.getByText('Nate')).toBeTruthy();
    expect(screen.getByText('Engineer')).toBeTruthy();

    const image = screen.getByAltText('Nate profile');
    expect(image).toBeTruthy();
    expect(image.getAttribute('src') ?? '').toContain('cdn.sanity.io');

    expect(screen.getByRole('link', { name: 'Nate on LinkedIn' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Nate on GitHub' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Email Nate' })).toBeTruthy();
  });

  it('renders without profile image when imageUrl is missing', () => {
    render(<HomeHero title="Nate" subtitle="Engineer" />);

    expect(screen.queryByAltText('Nate profile')).toBeNull();
    expect(screen.getByText('Nate')).toBeTruthy();
    expect(screen.getByText('Engineer')).toBeTruthy();
  });
});
