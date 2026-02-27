'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Shared carousel control state exposed through context.
 */
type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

/**
 * Context that wires child carousel parts to the parent Embla instance.
 */
const CarouselContext = React.createContext<CarouselContextValue | null>(null);

/**
 * Returns the active carousel context or throws if used outside the provider.
 */
function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }
  return context;
}

/**
 * Props for the carousel root component.
 */
type CarouselProps = {
  opts?: Parameters<typeof useEmblaCarousel>[0];
  plugins?: Parameters<typeof useEmblaCarousel>[1];
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: ReturnType<typeof useEmblaCarousel>[1]) => void;
  className?: string;
  children: React.ReactNode;
};

/**
 * Provides the carousel container and keyboard/navigation controls.
 */
export function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
}: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((emblaApi: NonNullable<typeof api>) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const onKeyDownCapture = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api) return;

    setApi?.(api);
    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api.off('reInit', onSelect);
      api.off('select', onSelect);
    };
  }, [api, onSelect, setApi]);

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div className={cn('ui-carousel', className)} onKeyDownCapture={onKeyDownCapture} role="region" aria-roledescription="carousel">
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

/**
 * Renders the scroll viewport and content track for carousel items.
 */
export function CarouselContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { carouselRef } = useCarousel();

  return (
    <div ref={carouselRef} className="ui-carousel-viewport">
      <div className={cn('ui-carousel-content', className)} {...props} />
    </div>
  );
}

/**
 * Wraps one carousel slide item.
 */
export function CarouselItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('ui-carousel-item', className)} role="group" aria-roledescription="slide" {...props} />;
}

/**
 * Renders the previous-slide navigation button.
 */
export function CarouselPrevious({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn('ui-carousel-prev', className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      aria-label="Previous slide"
      {...props}
    >
      <ChevronLeft />
    </Button>
  );
}

/**
 * Renders the next-slide navigation button.
 */
export function CarouselNext({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn('ui-carousel-next', className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      aria-label="Next slide"
      {...props}
    >
      <ChevronRight />
    </Button>
  );
}
