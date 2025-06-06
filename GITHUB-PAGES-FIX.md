# GitHub Pages Redirect Fix

This document explains how we resolved the GitHub Pages infinite redirect loop issue.

## Problem

When deploying the Angular application to GitHub Pages, we encountered an infinite redirect loop. This happened because:

1. Angular's default routing uses HTML5 pushState API, which requires server-side support
2. GitHub Pages only serves static files and doesn't support server-side rewrites
3. When a user navigated directly to a route like `/login`, GitHub Pages would return a 404
4. Our 404.html was redirecting back to the root, causing a loop

## Solution

We implemented a two-part solution:

1. **Hash-Based Routing**: Changed Angular's router to use hash-based routing (`#/` in URLs)
2. **JavaScript Redirects**: Implemented more reliable redirection in index.html and 404.html

### Hash-Based Routing

By using hash-based routing, all navigation stays client-side. URLs look like:
`https://nilabhsubramaniam.github.io/ida/#/login` instead of `https://nilabhsubramaniam.github.io/ida/login`

Changes made:
- Created app.config.hash.ts with hash routing configuration
- Modified app.config.ts to use HashLocationStrategy

### JavaScript Redirects

To prevent infinite redirect loops, we've implemented:
- JavaScript-based redirects in index.html and 404.html with cache-busting
- Fallback meta refresh redirects
- Relative URLs that work in any environment

## Testing

We've created multiple test scripts:
- `test-js-redirect.sh`: Tests the JavaScript redirects locally
- `test-live-redirects.sh`: Tests the live GitHub Pages site
- `test-redirect-loops.sh`: Detects potential redirect loops

## Implementation Details

1. index-js-redirect.html:
   - Uses JavaScript to redirect to the app with a cache-busting parameter
   - Has a meta refresh fallback

2. 404-js-redirect.html:
   - Similar JavaScript redirection for 404 errors
   - Redirects to the root app path with hash routing

3. GitHub Actions workflow:
   - Properly deploys the JavaScript redirect files
   - Verifies that redirects are correctly set up

## Future Maintenance

If you need to modify the routing:
1. Keep using hash-based routing for GitHub Pages compatibility
2. Make sure the redirect files use relative paths for portability
3. Run the test scripts to verify no redirect loops are introduced

## References

- GitHub Pages SPA documentation: https://github.blog/2016-08-22-publish-your-project-documentation-with-github-pages/
- Angular routing documentation: https://angular.io/guide/router