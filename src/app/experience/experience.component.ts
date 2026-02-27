import { Component, OnInit } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { SanityService } from '../sanity.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { SanityImagePipe } from '../sanity-image.pipe';
import { PortableTextPipe } from '../portable-text.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'portfolio-experience',
  standalone: true,
  imports: [
    CommonModule,
    SanityImagePipe,
    PortableTextPipe,
    MatChipsModule,
    MatIconModule,
    MatStepperModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.sass',
  providers: [
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
 * Angular experience timeline component.
 */
export class ExperienceComponent implements OnInit {
  data: any;

  constructor(private sanityService: SanityService, private router: Router) {}

  /**
   * Loads experience timeline data.
   */
  ngOnInit(): void {
    this.getExperience();
  }

  /**
   * Fetches and stores job experience entries.
   */
  async getExperience(): Promise<any> {
    const data = await this.sanityService.getExperience();
    console.log(data);
    this.data = data;
    return data;
  }

  /**
   * Placeholder navigation hook for skill deep links.
   */
  goToSkill(slug: string): void {
    this.router.navigate([]);
  }
}
