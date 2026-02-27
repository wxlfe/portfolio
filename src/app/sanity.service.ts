import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient, ClientConfig, SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
/**
 * Centralized Sanity API client for Angular pages and pipes.
 */
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

  /**
   * Creates a configured Sanity client instance.
   */
  private sanityClient(): SanityClient {
    return createClient(this.clientConfig);
  }

  /**
   * Returns an image URL builder bound to the configured client.
   */
  getImageUrlBuilder(source: SanityImageSource): ImageUrlBuilder {
    return this.imageUrlBuilder.image(source);
  }

  /**
   * Fetches homepage content.
   */
  async getHomepage(): Promise<any> {
    return await this.sanityClient().fetch('*[_type == "homepage"]');
  }

  /**
   * Fetches all projects with linked job data.
   */
  async getProjects(): Promise<any> {
    return await this.sanityClient().fetch(`*[_type == "project"]{
      ...,
      job->
    }`);
  }

  /**
   * Fetches all skills.
   */
  async getSkills(): Promise<any> {
    return await this.sanityClient().fetch(`*[_type == "skill"]`);
  }

  /**
   * Fetches a skill by slug with related projects.
   */
  async getSkill(slug: string): Promise<any> {
    return await this.sanityClient()
      .fetch(` *[_type == "skill" && slug.current == "${slug}"]{
      ...,
      "projects": *[_type=='project' && references(^._id)]{
        ...,
        job->
      }
    }`);
  }

  /**
   * Fetches all experience entries with linked skills and projects.
   */
  async getExperience(): Promise<any> {
    return await this.sanityClient().fetch(`*[_type == "job"]{
      ...,
      "skills": skills[]->,
      "projects": projects[]->
    }`);
  }

  /**
   * Fetches a project by slug with linked skills and job.
   */
  async getProject(slug: string): Promise<any> {
    return await this.sanityClient()
      .fetch(`*[_type == "project" && slug.current == "${slug}"]{
      ...,
      "skills": skills[]->,
      "job": job->
    }`);
  }
}
