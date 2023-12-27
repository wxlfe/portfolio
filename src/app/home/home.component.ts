import { Component, OnInit } from '@angular/core';
import { SanityService } from '../sanity.service';
import { SanityImagePipe } from '../sanity-image.pipe';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { ionMail, ionLogoGithub, ionLogoLinkedin } from '@ng-icons/ionicons';

@Component({
  selector: 'portfolio-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
  imports: [
    CommonModule,
    SanityImagePipe,
    MatButtonModule,
    MatIconModule,
    NgIconComponent,
  ],
  providers: [provideIcons({ ionMail, ionLogoGithub, ionLogoLinkedin })],
})
export class HomeComponent implements OnInit {
  data: any;

  constructor(private sanityService: SanityService) {}

  ngOnInit(): void {
    this.getHomepage();
  }

  async getHomepage(): Promise<any> {
    const data = await this.sanityService.getHomepage();
    this.data = data[0];
    return data[0];
  }
}
