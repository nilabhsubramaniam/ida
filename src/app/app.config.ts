import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_BASE_HREF, PathLocationStrategy, LocationStrategy } from '@angular/common';

import { routes } from './app.routes';

// Helper function to determine base href for GitHub Pages deployment
const getBaseHref = () => {
  // For GitHub Pages deployment
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    // Always use /ida/ for GitHub Pages
    console.log('[AppConfig] GitHub Pages detected, using /ida/ as base href');
    return '/ida/';
  }
  // Default for local development
  console.log('[AppConfig] Local development detected, using / as base href');
  return '/';
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Using path location strategy for clean URLs
    provideRouter(routes),
    provideAnimations(),
    { provide: APP_BASE_HREF, useFactory: getBaseHref },
    // Use PathLocationStrategy for clean URLs
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
};
