import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';

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
    // Using hash location strategy which is more compatible with GitHub Pages
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    { provide: APP_BASE_HREF, useFactory: getBaseHref },
    // This ensures URLs look like /ida/#/route instead of /ida/route
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
};
