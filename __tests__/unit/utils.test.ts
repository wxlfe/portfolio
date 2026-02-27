import { describe, expect, it } from '@jest/globals';
import { cn } from '@/lib/utils';

describe('cn', () => {
  it('merges truthy class names', () => {
    expect(cn('base', false && 'hidden', 'active')).toBe('base active');
  });

  it('resolves tailwind utility conflicts', () => {
    expect(cn('p-2 text-sm', 'p-4', 'text-base')).toBe('p-4 text-base');
  });
});
