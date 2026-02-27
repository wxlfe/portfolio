import { Component } from '@angular/core';
import { SanityService } from '../sanity.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { take } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionOpen } from '@ng-icons/ionicons';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SanityImagePipe } from '../sanity-image.pipe';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'portfolio-project',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    NgIconComponent,
    MatStepperModule,
    SanityImagePipe,
    MatChipsModule,
    RouterModule,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.sass',
  providers: [
    provideIcons({ ionOpen }),
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
    {
      provide: SanityImagePipe,
      useValue: { SanityImagePipe },
    },
  ],
})
/**
 * Angular project detail component resolved from the current route slug.
 */
export class ProjectComponent {
  data: any;

  constructor(
    private sanityService: SanityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.pipe(take(1)).subscribe(({ slug }: any) => {
      this.getProject(slug);
    });
  }

  /**
   * Fetches and stores a single project by slug.
   */
  async getProject(slug: string): Promise<any> {
    const data = await this.sanityService.getProject(slug);
    this.data = data[0];
    console.log(this.data);
    return data[0];
  }
}
