import { Pipe, PipeTransform } from '@angular/core';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { SanityService } from './sanity.service';

@Pipe({
  name: 'sanityImage',
  standalone: true,
})
/**
 * Angular pipe that builds Sanity CDN image URLs.
 */
export class SanityImagePipe implements PipeTransform {
  constructor(private sanityService: SanityService) {}

  /**
   * Transforms a Sanity image source into a CDN URL with optional width.
   */
  transform(value: SanityImageSource, width?: number): string {
    if (width) {
      return this.sanityService
        .getImageUrlBuilder(value)
        .width(width)
        .auto('format')
        .url();
    }
    return this.sanityService.getImageUrlBuilder(value).auto('format').url();
  }
}
