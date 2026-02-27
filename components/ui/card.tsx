import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * Base card surface container.
 */
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('ui-card', className)} {...props} />
));
Card.displayName = 'Card';

/**
 * Card header wrapper.
 */
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('ui-card-header', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

/**
 * Card heading text element.
 */
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 ref={ref} className={cn('ui-card-title', className)} {...props} />
);
CardTitle.displayName = 'CardTitle';

/**
 * Card description text element.
 */
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => <p ref={ref} className={cn('ui-card-description', className)} {...props} />
);
CardDescription.displayName = 'CardDescription';

/**
 * Card body content wrapper.
 */
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('ui-card-content', className)} {...props} />
));
CardContent.displayName = 'CardContent';

/**
 * Card footer actions wrapper.
 */
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('ui-card-footer', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
