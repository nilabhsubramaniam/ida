# GitHub Deployment Guide


## Setting Up GitHub Repository for Deployment

1. Push your code to GitHub:
   ```zsh
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/nilabhsubramaniam/ida.git
   git push -u origin main
   ```
   
   Note: Replace `YOUR_USERNAME/ida.git` with your actual GitHub username and repository name.

2. Configure GitHub Pages:
   - Go to your repository on GitHub
   - Navigate to "Settings" > "Pages"
   - Under "Source", select "Deploy from a branch"
   - Select the branch "gh-pages" (this will be created automatically by the GitHub Actions workflow)
   - Click "Save"

3. Enable GitHub Actions:
   - Go to your repository on GitHub
   - Navigate to "Actions"
   - If prompted, enable GitHub Actions

4. Update the deployment configuration (already configured in this repository):
   - Make sure the branch name in `.github/workflows/angular-deploy.yml` matches your repository's default branch (main or master)
   - The workflow will automatically detect your GitHub username and repository name

## Testing Deployment Locally

Before pushing your changes to GitHub, you can test the deployment locally using the provided script:

```zsh
# Make the script executable (only needed once)
chmod +x test-deployment.sh

# Run the script
./test-deployment.sh
```

This script will:
1. Build the application with production settings
2. Create all necessary files for GitHub Pages (404.html, .htaccess, .nojekyll)
3. Set up a local HTTP server to test the application
4. Create a simulated GitHub Pages path structure for testing deep links

## Manual Deployment (Optional)

If you want to manually deploy your application, you can run:

```zsh
npm run build:prod  # Build for production
npm run deploy:gh-pages  # Build and configure for GitHub Pages with correct base href
```

## Automated Deployment with GitHub Actions

After pushing changes to your main branch, GitHub Actions will automatically build and deploy your application. You can push your changes using the provided script:

```zsh
# Make the script executable (only needed once)
chmod +x push-to-github.sh

# Run the script to commit and push changes
./push-to-github.sh
```

You can check the deployment progress in the "Actions" tab of your GitHub repository. The workflow will:

1. Check out your code
2. Set up Node.js and install dependencies
3. Build the application with production settings
4. Copy necessary files for GitHub Pages
5. Deploy the built application to the gh-pages branch

## Accessing Your Deployed Application

Once deployed, your application will be available at:
`https://{nilabhsubramaniam}.github.io/{your-repository-name}/`

For example: `https://nilabhsubramaniam.github.io/ida/`

## Troubleshooting

If your application doesn't load correctly after deployment:

1. Make sure the gh-pages branch was created successfully
2. Check for build errors in the GitHub Actions logs
3. Ensure that client-side routing is working by testing direct URLs
4. Verify that the base href is configured correctly
5. Test different browsers to rule out browser-specific issues
