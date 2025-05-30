# GitHub Deployment Guide

This document explains how to set up your GitHub repository for automated deployment of your Angular application.

## Prerequisites

1. Make sure you have a GitHub account
2. Create a GitHub repository for your project

## Setting Up GitHub Repository for Deployment

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/nilabhsubramaniam/ida.git
   git push -u origin main
   ```
   
   Note: Replace `nilabhsubramaniam/ida.git` with your actual GitHub username and repository name.

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

4. Update the deployment configuration:
   - Make sure the branch name in `.github/workflows/angular-deploy.yml` matches your repository's default branch (main or master)
   - The workflow will automatically detect your GitHub username and repository name

## Manual Deployment (Optional)

If you want to manually deploy your application, you can run:

```bash
npm run build:prod  # Build for production
npm run deploy:gh-pages  # Build and configure for GitHub Pages
```

## Testing Deployment

After pushing changes to your main branch, GitHub Actions will automatically build and deploy your application. You can check the progress in the "Actions" tab of your GitHub repository.

Once deployed, your application will be available at:
`https://{your-github-username}.github.io/{your-repository-name}/`

For example: `https://nilabhsubramaniam.github.io/ida/`
