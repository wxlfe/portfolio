'use client';

import { type ComponentProps, useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type Props = {
  images: string[];
  title: string;
};

type CarouselApi = Parameters<NonNullable<ComponentProps<typeof Carousel>['setApi']>>[0];

export function ProjectImageCarousel({ images, title }: Props) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    setSnapCount(api.scrollSnapList().length);
    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || snapCount <= 1 || isPaused) return;

    const intervalId = window.setInterval(() => {
      api.scrollNext();
    }, 4200);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [api, snapCount, isPaused]);

  const openImageFullscreen = (img: HTMLImageElement) => {
    const withWebkitFullscreen = img as HTMLImageElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    };

    if (img.requestFullscreen) {
      void img.requestFullscreen();
      return;
    }

    if (withWebkitFullscreen.webkitRequestFullscreen) {
      withWebkitFullscreen.webkitRequestFullscreen();
    }
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <Carousel className="project_carousel" opts={{ loop: images.length > 1 }} setApi={setApi}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={`${title}-${index}`}>
              <img
                className="project_carousel_image"
                src={image}
                alt={`${title} image ${index + 1}`}
                onClick={(event) => openImageFullscreen(event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openImageFullscreen(event.currentTarget);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open image ${index + 1} fullscreen`}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {snapCount > 1 ? (
          <div className="project_carousel_dots" aria-label="Slide indicators">
            {Array.from({ length: snapCount }).map((_, index) => (
              <button
                key={`${title}-dot-${index}`}
                type="button"
                className={`project_carousel_dot${index === selectedIndex ? ' is-active' : ''}`}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === selectedIndex ? 'true' : undefined}
              />
            ))}
          </div>
        ) : null}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
