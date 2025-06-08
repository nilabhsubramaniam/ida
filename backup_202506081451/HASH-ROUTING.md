# Hash-Based Routing for GitHub Pages Angular Apps

## Overview

We've switched to a hash-based routing strategy for the Angular application to solve the infinite redirect loop on GitHub Pages. This document explains the changes made and how to maintain the application going forward.

## What is Hash-Based Routing?

Hash-based routing uses the fragment identifier part of the URL (the part after #) to manage client-side navigation without triggering server requests for new URLs.

Example:
- Before: `https://nilabhsubramaniam.github.io/ida/dashboard`
- After: `https://nilabhsubramaniam.github.io/ida/#/dashboard`

## Benefits for GitHub Pages

1. **No 404 Issues**: With hash-based routing, the browser doesn't actually navigate to new URLs that would trigger 404s on GitHub Pages.
2. **No Redirect Loops**: Eliminates complex redirect handling that was causing infinite loops.
3. **Better Compatibility**: Works reliably across browsers and environments.

## Changes Made

1. **Updated app.config.ts**:
   - Added `withHashLocation()` to router configuration
   - Set `LocationStrategy` to `HashLocationStrategy`

2. **Simplified 404.html and index.html**:
   - Direct redirects to the hash-based root `/ida/#/`
   - Added cache-busting timestamp to avoid caching issues
   - Added debugging information

3. **Created Diagnostic Tool**:
   - Added hash-routing-diagnostic.html to help debug routing issues

## How to Access the Application

The main application URL is now:
```
https://nilabhsubramaniam.github.io/ida/#/
```

All other routes follow this pattern:
```
https://nilabhsubramaniam.github.io/ida/#/route-name
```

## Testing

1. Visit the application's main URL: `https://nilabhsubramaniam.github.io/ida/#/`
2. Try direct navigation to a route: `https://nilabhsubramaniam.github.io/ida/#/login`
3. Use the diagnostic tool: `https://nilabhsubramaniam.github.io/ida/hash-routing-diagnostic.html`

## Troubleshooting

If you still experience routing issues:

1. Check browser console for errors
2. Use the hash-routing-diagnostic.html tool to identify the issue
3. Ensure all application links use the `/#/route` format
4. Clear browser cache and cookies

## GitHub Pages Settings

Your GitHub Pages settings should remain:
- Branch: gh-pages
- Directory: / (root)

These settings are correct for hash-based routing.
