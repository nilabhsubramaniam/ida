# Deploying Angular to GitHub Pages

This document provides guidance on deploying this Angular application to GitHub Pages correctly, with special attention to resolving routing issues.

## Key Solution Components

### 1. Hash-Based Routing

Angular's default routing won't work on GitHub Pages without server-side configuration. Hash-based routing solves this by keeping navigation client-side.

**Implementation:**
- Using `HashLocationStrategy` in Angular
- Configured in `app.config.ts` with `provideRouter(routes, withHashLocation())`
- URLs use `#` for routes (e.g., `/ida/#/login`)

### 2. Build Output Structure (Angular 17+)

Angular 17+ places build output in a `browser` subdirectory which can cause GitHub Pages deployment issues.

**Solution:**
- Move files from `browser` directory to the root deployment folder
- GitHub Actions workflow handles this automatically

### 3. Essential GitHub Pages Files

These files ensure correct GitHub Pages behavior:

- `.nojekyll` - Prevents GitHub from processing with Jekyll
- `CNAME` (optional) - For custom domain configuration
- `404.html` - For proper handling of missing routes

## Deployment Process

### Automatic Deployment (Recommended)

1. Run the deployment script:
   ```bash
   ./deploy.sh
   ```
   
2. Select option 2 to push to GitHub

3. GitHub Actions will:
   - Build the Angular application with hash routing
   - Move files from the browser directory to the root
   - Deploy to the gh-pages branch
   - Handle all necessary file configurations

### Manual Deployment

If needed, you can deploy manually:

1. Build with hash routing:
   ```bash
   npm run build:prod -- --base-href "/ida/"
   ```

2. Move files from browser directory:
   ```bash
   cp -a dist/vyaktigatav-rtta/browser/* dist/vyaktigatav-rtta/
   rm -rf dist/vyaktigatav-rtta/browser
   ```

3. Add GitHub Pages files:
   ```bash
   touch dist/vyaktigatav-rtta/.nojekyll
   ```

4. Deploy using your preferred method

## Troubleshooting

If you encounter GitHub Pages issues:

1. **Infinite Redirects**: 
   - Ensure you're using hash-based routing
   - Check that `app.config.ts` is using `HashLocationStrategy`

2. **404 Errors**:
   - Verify that `.nojekyll` file exists in the root
   - Ensure base href is set correctly (`/ida/`)

3. **Missing Resources**:
   - Check paths for absolute vs relative URLs
   - Ensure assets are in the correct location

4. **Cache Issues**:
   - Try clearing your browser cache
   - Use incognito/private browsing mode for testing

## References

- [Angular Deployment Guide](https://angular.io/guide/deployment#deploy-to-github-pages)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
