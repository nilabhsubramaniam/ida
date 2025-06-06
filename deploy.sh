#!/bin/bash
# Script to fix Angular deployment issues for GitHub Pages

echo "==============================================="
echo "  Angular GitHub Pages Deployment Fix"
echo "==============================================="

# Configuration
CONFIG_FILE="src/app/app.config.ts"
CONFIG_HASH="src/app/app.config.hash.ts"
BACKUP_CONFIG="src/app/app.config.backup.ts"
DIST_DIR="dist/vyaktigatav-rtta"

# Clean up previous builds
echo "Cleaning previous builds..."
rm -rf $DIST_DIR

# Backup the current config
echo "Backing up current app.config.ts"
cp "$CONFIG_FILE" "$BACKUP_CONFIG"

# Use hash routing config
echo "Applying hash routing configuration"
cp "$CONFIG_HASH" "$CONFIG_FILE"

# Build the application with hash-based routing
echo "Building Angular application with hash-based routing"
npm run build:prod -- --base-href "/ida/"

# Check build success
if [ ! -d "$DIST_DIR" ]; then
  echo "ERROR: Build failed - no dist directory found"
  # Restore the original config
  cp "$BACKUP_CONFIG" "$CONFIG_FILE"
  exit 1
fi

# Check if browser directory exists (Angular 17+ outputs to a browser subdirectory)
if [ -d "$DIST_DIR/browser" ]; then
  echo "Moving files from browser directory to root..."
  cp -a $DIST_DIR/browser/* $DIST_DIR/
  rm -rf $DIST_DIR/browser
fi

# Create .nojekyll file to disable Jekyll processing
echo "Creating .nojekyll file to disable GitHub Pages Jekyll processing..."
touch "$DIST_DIR/.nojekyll"

# Create a favicon if missing
if [ ! -f "$DIST_DIR/favicon.ico" ]; then
  echo "Adding default favicon"
  cp -f public/favicon.ico $DIST_DIR/ || echo "No favicon found"
fi

# Copy CNAME file if it exists
if [ -f "public/CNAME" ]; then
  echo "Copying CNAME file for custom domain..."
  cp -f public/CNAME $DIST_DIR/
fi

# Copy assets
echo "Setting up assets for the deployment..."
if [ -d "public/assets" ]; then
  echo "Copying assets from public/assets to dist..."
  mkdir -p "$DIST_DIR/assets"
  cp -a public/assets/* "$DIST_DIR/assets/"
  echo "✅ Assets copied successfully"
  ls -la "$DIST_DIR/assets/"

  # Fix asset URLs in CSS files for GitHub Pages deployment
  echo "Fixing asset URLs in CSS files..."
  
  # Find all CSS files
  CSSFILES=$(find "$DIST_DIR" -name "*.css")
  
  # For each CSS file, replace absolute asset paths with relative ones
  for file in $CSSFILES; do
    echo "Processing $file"
    # Replace "/assets/" with "assets/" (remove leading slash)
    sed -i 's|url(/assets/|url(assets/|g' "$file"
    echo "✅ Fixed asset paths in $(basename "$file")"
  done
else
  echo "⚠️ WARNING: No assets directory found in public/"
fi

# Verify the build
echo "Verifying Angular build files:"
grep -q "<app-root" $DIST_DIR/index.html && echo "✅ Angular app root found" || echo "❌ Angular app root not found"

echo "Verifying hash routing is enabled:"
grep -q "base href=\"/ida/\"" $DIST_DIR/index.html && echo "✅ Base href is set" || echo "❌ Base href not found"

# Check for main JavaScript file
echo "Checking for main JS file:"
find $DIST_DIR -name "main-*.js" | grep -q . && echo "✅ Main JS file found" || echo "❌ Main JS file not found"

# Create a version file with timestamp
TIMESTAMP=$(date +'%Y%m%d%H%M')
echo "v$TIMESTAMP" > "$DIST_DIR/version.txt"
echo "✅ Version file created: v$TIMESTAMP"

# Restore original config
echo "Restoring original app.config.ts"
cp "$BACKUP_CONFIG" "$CONFIG_FILE"

# Ask user what to do next
echo
echo "==============================================="
echo "  Deployment Options"
echo "==============================================="
echo "Build completed successfully! What would you like to do next?"
echo
echo "1) Test locally with a development server"
echo "2) Deploy to GitHub Pages"
echo "3) Exit"
echo

read -p "Enter your choice (1-3): " choice

case $choice in
  1)
    echo
    echo "==============================================="
    echo "  Starting test server"
    echo "==============================================="
    echo "Starting server on port 8080..."
    echo "Press Ctrl+C to stop the server"
    echo
    echo "To test the application visit: http://localhost:8080/"
    echo
    cd $DIST_DIR && python3 -m http.server 8080
    ;;
  2)
    echo
    echo "==============================================="
    echo "  Deploying to GitHub Pages"
    echo "==============================================="
    echo "Committing and pushing changes..."
    
    # Check if there are changes to commit
    if git diff --quiet; then
      echo "No changes detected. Committing only build changes."
      git add $DIST_DIR
    else
      echo "Changes detected. Committing all changes."
      git add .
    fi
    
    # Commit and push
    git commit -m "Deploy to GitHub Pages: v$TIMESTAMP"
    git push origin main
    
    echo
    echo "Deployment initiated. GitHub Actions will deploy the changes to GitHub Pages."
    echo "Check the status at: https://github.com/nilabhsubramaniam/ida/actions"
    echo
    echo "Once deployed, your site will be available at: https://nilabhsubramaniam.github.io/ida/"
    ;;
  3)
    echo "Exiting without testing or deployment."
    ;;
  *)
    echo "Invalid choice. Exiting."
    ;;
esac
