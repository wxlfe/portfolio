import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { SanityService } from './sanity.service';

declare const gtag: Function;

@Component({
  selector: 'portfolio-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  navLinks: any[];
  activeLinkIndex = -1;
  public data: any;

  constructor(private router: Router, private sanityService: SanityService) {
    this.navLinks = [
      {
        label: 'Projects',
        link: './projects',
        index: 0,
      },
      {
        label: 'Skills',
        link: './skills',
        index: 1,
      },
      {
        label: 'Experience',
        link: './experience',
        index: 2,
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
      if (event instanceof NavigationEnd) {
        gtag('config', 'MEASUREMENT-ID', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }
}
