# GitHub Pages for व्यक्तिगतवृत्त Resume Builder

This is the GitHub Pages deployment for the व्यक्तिगतवृत्त Resume Builder Angular application.

## URL Structure

The application is deployed at: https://nilabhsubramaniam.github.io/ida/

## Deployment Notes

This application uses an ultra-simple redirect approach for GitHub Pages hosting of Angular single-page applications.

### Key Files:

1. **404.html** - Handles redirects for client-side routing
2. **.nojekyll** - Prevents GitHub Pages from processing the site with Jekyll
3. **index.html** (at repo root) - Handles redirects from the root domain to the app 

### How the Routing Works

1. GitHub Pages serves the app from `/ida/`
2. Angular's router handles all client-side navigation
3. For direct access to deep links, 404.html redirects to the main app
4. The app uses a dynamic base href to ensure proper path resolution

## Testing

To test the deployment:
1. Visit https://nilabhsubramaniam.github.io/ida/routing-test.html
2. Check if routing works properly with direct links
3. Check if the app loads without infinite redirects

## GitHub Pages Settings

Make sure your GitHub Pages settings are:
- Source: Deploy from a branch
- Branch: gh-pages
- Folder: / (root)
