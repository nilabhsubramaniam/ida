import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';

import { routes } from './app.routes';

// Helper function to determine base href for GitHub Pages deployment
const getBaseHref = () => {
  // For GitHub Pages deployment
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    return '/ida/'; // Hardcode the repository name for consistent routing
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
