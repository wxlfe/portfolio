import { Component, OnInit } from '@angular/core';
import { SanityService } from '../sanity.service';
import { CommonModule } from '@angular/common';
import { SanityImagePipe } from '../sanity-image.pipe';
import { Router, RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionArrowForwardCircle } from '@ng-icons/ionicons';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'portfolio-skills',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule,
    SanityImagePipe,
    MatButtonModule,
    NgIconComponent,
    MatCardModule,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.sass',
  providers: [provideIcons({ ionArrowForwardCircle })],
})
export class SkillsComponent implements OnInit {
  data: any;
  categories: any = [];

  constructor(private sanityService: SanityService, private router: Router) {}

  ngOnInit(): void {
    this.getSkills();
  }

  async getSkills() {
    const data = await this.sanityService.getSkills();
    this.data = this.groupBy(data, 'category');
    this.categories = Object.keys(this.data);
    console.log(this.data);
    return this.data;
  }

  groupBy(objectArray: any, property: any) {
    objectArray.sort(this.compareExperience);
    return objectArray.reduce((acc: any, obj: any) => {
      const key = obj[property];
      const curGroup = acc[key] ?? [];
      return { ...acc, [key]: [...curGroup, obj] };
    }, {});
  }

  compareExperience(a: any, b: any) {
    if (parseInt(a.experience) > parseInt(b.experience)) {
      return -1;
    } else if (parseInt(a.experience) < parseInt(b.experience)) {
      return 1;
    }
    return 0;
  }
}
