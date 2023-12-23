import { Component, OnInit } from '@angular/core';
import { SanityService } from '../sanity.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass',
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
