import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

/**
 * Server-only Angular providers used for SSR.
 */
const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

/**
 * Merged Angular configuration for server bootstrap.
 */
export const config = mergeApplicationConfig(appConfig, serverConfig);
