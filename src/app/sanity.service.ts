import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, ClientConfig, SanityClient } from '@sanity/client';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private client: SanityClient;
  private clientConfig: ClientConfig = {
    projectId: environment.sanity.projectId,
    dataset: environment.sanity.dataset,
    apiVersion: environment.sanity.apiVersion,
    useCdn: environment.sanity.useCdn,
  };
  constructor(private http: HttpClient) {
    this.client = this.sanityClient();
  }

  private sanityClient(): SanityClient {
    return createClient(this.clientConfig);
  }

  async getHomepage(): Promise<any> {
    return await this.sanityClient().fetch('*[_type == "homepage"]');
  }
}
