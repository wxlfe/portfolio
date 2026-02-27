import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

/**
 * Bootstraps the Angular application for server-side rendering.
 */
const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
