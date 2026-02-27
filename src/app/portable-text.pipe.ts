import { Pipe, PipeTransform } from '@angular/core';
import { PortableTextComponents, toHTML } from '@portabletext/to-html';
import { PortableTextBlock } from '@portabletext/types';
import { SanityImagePipe } from './sanity-image.pipe';

@Pipe({
  name: 'portableText',
  standalone: true,
})
/**
 * Angular pipe that renders Portable Text rich content as HTML.
 */
export class PortableTextPipe implements PipeTransform {
  constructor(private sanityImagePipe: SanityImagePipe) {}

  components: PortableTextComponents = {
    types: {
      image: ({ value }: { value: string }) =>
        '<img src="' + this.sanityImagePipe.transform(value, 900) + '" />',
    },
  };

  /**
   * Converts Portable Text blocks into HTML for Angular templates.
   */
  transform(value: PortableTextBlock[]): string {
    return toHTML(value, { components: this.components });
  }
}
