#!/usr/bin/env zsh

# Simple script to test GitHub Pages deployment locally

echo "🚀 Building Angular application for GitHub Pages deployment..."
npm run build:prod

# Check if the build was successful and the directory exists
if [[ ! -d "dist/vyaktigatav-rtta" ]]; then
  echo "❌ Build failed or output directory 'dist/vyaktigatav-rtta' was not created."
  echo "   Please check for build errors above."
  exit 1
fi

echo "📋 Creating a simple HTTP server to test the build..."
cd dist/vyaktigatav-rtta

# Copy the 404.html and .htaccess files if they don't exist in the output
if [[ ! -f "404.html" && -f "../../public/404.html" ]]; then
  echo "📄 Copying 404.html to distribution folder..."
  cp -f ../../public/404.html ./
fi

if [[ ! -f ".htaccess" && -f "../../public/.htaccess" ]]; then
  echo "📄 Copying .htaccess to distribution folder..."
  cp -f ../../public/.htaccess ./
fi

# Verify that main_theme.jpg is properly copied to assets
if [[ ! -f "assets/main_theme.jpg" ]]; then
  echo "🖼 Ensuring main_theme.jpg background image exists..."
  mkdir -p assets
  cp -f ../../public/assets/main_theme.jpg ./assets/
  # Verify the copy
  if [[ -f "assets/main_theme.jpg" ]]; then
    echo "✅ Background image main_theme.jpg successfully added"
  else
    echo "❌ Warning: Failed to copy background image!"
  fi
fi

# Create a .nojekyll file to disable Jekyll processing on GitHub Pages
if [[ ! -f ".nojekyll" ]]; then
  echo "📄 Creating .nojekyll file..."
  touch .nojekyll
fi

# Create a version.txt file with timestamp
echo "v$(date +'%Y%m%d%H%M')" > version.txt

# Set up a symlink for /ida/ to simulate GitHub Pages path
mkdir -p ida
ln -sf ../index.html ida/index.html

# Check if Python is available
if command -v python3 &> /dev/null; then
  echo "🌐 Serving on http://localhost:4200/"
  echo "   You can also test GitHub Pages style paths at: http://localhost:4200/ida/"
  python3 -m http.server 4200
elif command -v python &> /dev/null; then
  echo "🌐 Serving on http://localhost:4200/"
  echo "   You can also test GitHub Pages style paths at: http://localhost:4200/ida/"
  python -m SimpleHTTPServer 4200
else
  echo "❌ Python not found. Please install Python or use another HTTP server."
  exit 1
fi
