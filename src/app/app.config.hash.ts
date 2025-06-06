import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

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
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(
      routes,
      withHashLocation() // Use hash location strategy for GitHub Pages compatibility
    ),
    provideAnimations(),
    { provide: APP_BASE_HREF, useFactory: getBaseHref },
    // Configure hash location strategy
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
};
