import { describe, expect, it } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProjectsList } from '@/components/projects-list';
import type { Project } from '@/lib/types';

const projects: Project[] = [
  {
    _id: 'p1',
    title: 'Beta API',
    year: '2022',
    slug: { current: 'beta-api' },
  },
  {
    _id: 'p2',
    title: 'Zeta Core',
    year: '2024',
    slug: { current: 'zeta-core' },
  },
  {
    _id: 'p3',
    title: 'Gamma UI',
    year: '2021',
    slug: { current: 'gamma-ui' },
  },
];

describe('ProjectsList', () => {
  it('defaults to sorting by year descending', () => {
    render(<ProjectsList projects={projects} />);

    const headings = screen.getAllByRole('heading', { level: 3 }).map((node) => node.textContent);
    expect(headings).toEqual(['Zeta Core', 'Beta API', 'Gamma UI']);
  });

  it('re-sorts by name when the select changes', async () => {
    const user = userEvent.setup();
    render(<ProjectsList projects={projects} />);

    await user.selectOptions(screen.getByLabelText('Sort By'), 'Name');

    const headings = screen.getAllByRole('heading', { level: 3 }).map((node) => node.textContent);
    expect(headings).toEqual(['Beta API', 'Gamma UI', 'Zeta Core']);

    await user.selectOptions(screen.getByLabelText('Sort By'), 'Year');
    const yearSortedHeadings = screen.getAllByRole('heading', { level: 3 }).map((node) => node.textContent);
    expect(yearSortedHeadings).toEqual(['Zeta Core', 'Beta API', 'Gamma UI']);
  });
});
