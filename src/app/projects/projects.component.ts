import { Component, OnInit } from '@angular/core';
import { SanityService } from '../sanity.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SanityImagePipe } from '../sanity-image.pipe';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'portfolio-projects',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    SanityImagePipe,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.sass',
})
export class ProjectsComponent implements OnInit {
  data: any;
  sortBy: any = new FormControl();
  sortOptions: string[] = ['Name', 'Year'];

  constructor(private sanityService: SanityService, private router: Router) {}

  ngOnInit(): void {
    this.getProjects();
  }

  async getProjects(): Promise<any> {
    const data = await this.sanityService.getProjects();
    this.data = data.sort(this.compareYear);
    return data.sort(this.compareYear);
  }

  sortByChanged() {
    if (this.sortBy === 'Year') {
      this.data = this.data.sort(this.compareYear);
    } else if (this.sortBy === 'Name') {
      this.data = this.data.sort(this.compareName);
    } else {
      this.data = this.data.sort();
    }
  }

  compareYear(a: any, b: any) {
    if (parseInt(a.year) > parseInt(b.year)) {
      return -1;
    } else if (parseInt(a.year) < parseInt(b.year)) {
      return 1;
    }
    return 0;
  }

  compareName(a: any, b: any) {
    if (a.title < b.title) {
      return -1;
    } else if (a.title > b.title) {
      return 1;
    }
    return 0;
  }
}
