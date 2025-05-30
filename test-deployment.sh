#!/usr/bin/env zsh

# Simple script to test GitHub Pages deployment locally

echo "🚀 Building Angular application for GitHub Pages deployment..."
npm run build:prod

echo "📋 Creating a simple HTTP server to test the build..."
cd dist/vyaktigatav-rtta

# Check if Python is available
if command -v python3 &> /dev/null; then
  echo "🌐 Serving on http://localhost:4200/ida/"
  python3 -m http.server 4200
elif command -v python &> /dev/null; then
  echo "🌐 Serving on http://localhost:4200/ida/"
  python -m SimpleHTTPServer 4200
else
  echo "❌ Python not found. Please install Python or use another HTTP server."
  exit 1
fi
