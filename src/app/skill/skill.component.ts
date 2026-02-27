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
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'portfolio-skill',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    NgIconComponent,
    MatStepperModule,
    SanityImagePipe,
    MatChipsModule,
    RouterModule,
    MatCardModule,
  ],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.sass',
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
 * Angular skill detail component resolved from the current route slug.
 */
export class SkillComponent {
  data: any;

  constructor(
    private sanityService: SanityService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.pipe(take(1)).subscribe(({ slug }: any) => {
      this.getSkill(slug);
    });
  }

  /**
   * Fetches and stores a single skill by slug.
   */
  async getSkill(slug: string): Promise<any> {
    const data = await this.sanityService.getSkill(slug);
    this.data = data[0];
    console.log(this.data);
    return data[0];
  }
}
