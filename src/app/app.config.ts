import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';

import { routes } from './app.routes';

// Helper function to determine base href for GitHub Pages deployment
const getBaseHref = () => {
  // For GitHub Pages deployment
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    // Extract the repository name from the URL path for GitHub Pages
    const pathSegments = window.location.pathname.split('/');
    // Find the repository name in path segments (usually the first non-empty segment)
    for (let i = 1; i < pathSegments.length; i++) {
      if (pathSegments[i]) {
        return `/${pathSegments[i]}/`;
      }
    }
  }
  return '/'; // Default for local development
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(),
    { provide: APP_BASE_HREF, useFactory: getBaseHref }
  ]
};
