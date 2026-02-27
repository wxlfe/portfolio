import { cn } from '@/lib/utils';

type ProgressProps = {
  value: number;
  className?: string;
};

/**
 * Displays a horizontal progress bar clamped to the range 0-100.
 */
export function Progress({ value, className }: ProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('ui-progress', className)} aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
      <div className="ui-progress-indicator" style={{ width: `${clamped}%` }} />
    </div>
  );
}
