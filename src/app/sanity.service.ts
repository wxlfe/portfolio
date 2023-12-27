import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, ClientConfig, SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private client: SanityClient;
  private imageUrlBuilder: ImageUrlBuilder;
  private clientConfig: ClientConfig = {
    projectId: environment.sanity.projectId,
    dataset: environment.sanity.dataset,
    apiVersion: environment.sanity.apiVersion,
    useCdn: environment.sanity.useCdn,
  };

  constructor(private http: HttpClient) {
    this.client = this.sanityClient();
    this.imageUrlBuilder = imageUrlBuilder(this.client);
  }

  private sanityClient(): SanityClient {
    return createClient(this.clientConfig);
  }

  getImageUrlBuilder(source: SanityImageSource): ImageUrlBuilder {
    return this.imageUrlBuilder.image(source);
  }

  async getHomepage(): Promise<any> {
    return await this.sanityClient().fetch('*[_type == "homepage"]');
  }

  async getProjects(): Promise<any> {
    return await this.sanityClient().fetch(`*[_type == "project"]{
      ...,
      job->
    }`);
  }

  async getSkills(): Promise<any> {
    return await this.sanityClient().fetch(`*[_type == "skill"]`);
  }

  async getExperience(): Promise<any> {
    return await this.sanityClient().fetch(`*[_type == "job"]{
      ...,
      "skills": skills[]->,
      "projects": projects[]->
    }`);
  }

  async getProject(slug: string): Promise<any> {
    return await this.sanityClient()
      .fetch(`*[_type == "project" && slug.current == "${slug}"]{
      ...,
      "skills": skills[]->,
      "job": job->
    }`);
  }
}
