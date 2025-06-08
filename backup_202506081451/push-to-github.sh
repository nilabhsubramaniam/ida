#!/usr/bin/env zsh

# Script to commit and push changes to GitHub
# This will trigger the GitHub Actions workflow to build and deploy the application

echo "🚀 Preparing to push changes to GitHub..."
echo "This will trigger automated deployment if pushed to main branch."

# Navigate to project directory (if script is run from elsewhere)
cd "$(dirname "$0")"

# Ask for commit message
echo "📝 Enter a commit message describing your changes:"
read commit_message

if [ -z "$commit_message" ]; then
  echo "❌ Commit message cannot be empty. Please try again."
  exit 1
fi

echo "📋 The following files have been modified:"
git status --porcelain

echo "\n🔍 Reviewing changes before committing..."

# Check if there are changes to commit
if [ -z "$(git status --porcelain)" ]; then
  echo "❌ No changes to commit! Make some changes first."
  exit 1
fi

# Confirm before proceeding
echo "\n⚠️ Are you sure you want to commit and push these changes? (y/n)"
read confirm

if [ "$confirm" != "y" ]; then
  echo "❌ Operation cancelled."
  exit 1
fi

# Add all changes, commit and push
git add .
git commit -m "$commit_message"

echo " Pushing to GitHub..."
git push origin main

echo " Done! If you pushed to the main branch, GitHub Actions will now deploy your app."
echo " Check the status of your deployment at: https://github.com/nilabhsubramaniam/ida/actions"
echo " Your site should be available at: https://nilabhsubramaniam.github.io/ida/"
