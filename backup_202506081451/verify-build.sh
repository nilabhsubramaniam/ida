#!/usr/bin/env zsh

echo " Comprehensive Angular Build Verification"
echo "=========================================="

# Build the Angular application for production
echo "\n Building Angular application for production..."
npm run build:prod

# Check if the dist directory exists
if [ -d "./dist/vyaktigatav-rtta" ]; then
  echo "\n Build succeeded! Output folder exists."
  
  # Check the size of the build
  echo "\n Build size analysis:"
  du -sh ./dist/vyaktigatav-rtta
  
  # Check for key files
  echo "\n Checking for key files:"
  
  # Create an array of critical files to check
  critical_files=(
    "index.html"
    "main-*.js"
    "polyfills-*.js"
    "styles-*.css"
    "assets"
    "assets/main_theme.jpg"  # Explicitly check for our background image
    "favicon.ico"
  )
  
  missing_files=0
  for file in "${critical_files[@]}"; do
    if ls -la ./dist/vyaktigatav-rtta/$file 2>/dev/null >/dev/null; then
      echo " Found: $file"
    else
      echo " Missing: $file"
      missing_files=$((missing_files+1))
    fi
  done
  
  # Check for GitHub Pages specific files
  gh_pages_files=(
    "404.html"
    ".htaccess"
    ".nojekyll"
  )
  
  echo "\n Checking GitHub Pages specific files:"
  for file in "${gh_pages_files[@]}"; do
    if ls -la ./dist/vyaktigatav-rtta/$file 2>/dev/null >/dev/null; then
      echo " Found: $file"
    else
      echo " Missing: $file - copying from public directory"
      cp -f ./public/$file ./dist/vyaktigatav-rtta/ 2>/dev/null
      
      # Check again after copying
      if ls -la ./dist/vyaktigatav-rtta/$file 2>/dev/null >/dev/null; then
        echo "   Successfully copied $file"
      fi
    fi
  done
  
  # Create a .nojekyll file if it doesn't exist
  if [ ! -f "./dist/vyaktigatav-rtta/.nojekyll" ]; then
    echo " Creating .nojekyll file..."
    touch ./dist/vyaktigatav-rtta/.nojekyll
  fi
  
  # Check if there are any missing critical files
  if [ $missing_files -gt 0 ]; then
    echo "\n Warning: $missing_files critical files are missing. The application may not work correctly."
  else
    echo "\n All critical files are present!"
  fi
  
  # Final verification message
  echo "\n The application is ready for GitHub Pages deployment."
  echo " Run the push-to-github.sh script to deploy to GitHub."
  
  # Offer to run a local server for testing
  echo "\n Would you like to run a local server to test the build? (y/n)"
  read run_server
  
  if [[ "$run_server" == "y" || "$run_server" == "Y" ]]; then
    echo " Starting a local server on port 4200..."
    cd ./dist/vyaktigatav-rtta
    
    # Try to use python's http server modules
    if command -v python3 &> /dev/null; then
      python3 -m http.server 4200
    elif command -v python &> /dev/null; then
      python -m SimpleHTTPServer 4200
    else
      echo "Python not found. Please install Python or use another HTTP server."
    fi
  fi
else
  echo "\n Build failed or output directory 'dist/vyaktigatav-rtta' was not created."
  echo "Please check for build errors above."
  exit 1
fi
