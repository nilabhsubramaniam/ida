import { ApplicationConfig } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

const getBaseHref = () => {
  // For GitHub Pages deployment
  if (document.location.hostname.includes('github.io')) {
    // Extract the repository name from the URL path for GitHub Pages
    const pathSegments = document.location.pathname.split('/');
    if (pathSegments.length > 1) {
      return `/${pathSegments[1]}/`; // Repository name is typically the first path segment
    }
  }
  return '/'; // Default for local development
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: APP_BASE_HREF, useFactory: getBaseHref }
  ]
};
