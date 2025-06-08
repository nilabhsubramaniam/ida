#!/bin/bash
# Script to test and deploy the GitHub Pages fix with JavaScript redirects

echo "==============================================="
echo "  GitHub Pages Fix Deployment"
echo "==============================================="

# Paths
CONFIG_FILE="src/app/app.config.ts"
CONFIG_HASH="src/app/app.config.hash.ts"
BACKUP_CONFIG="src/app/app.config.backup.ts"
DIST_DIR="dist/vyaktigatav-rtta"
PUBLIC_DIR="public"

# Backup the current config
echo "Backing up current app.config.ts"
cp "$CONFIG_FILE" "$BACKUP_CONFIG"

# Use hash routing config
echo "Applying hash routing configuration"
cp "$CONFIG_HASH" "$CONFIG_FILE"

# Build the application
echo "Building Angular application with hash routing"
npm run build:prod -- --base-href "/ida/"

# Check build success
if [ ! -d "$DIST_DIR" ]; then
  echo "ERROR: Build failed - no dist directory found"
  # Restore the original config
  cp "$BACKUP_CONFIG" "$CONFIG_FILE"
  exit 1
fi

# Setup GitHub Pages files
echo "Setting up GitHub Pages files"

# Create .nojekyll file
touch "$DIST_DIR/.nojekyll"

# Copy the JavaScript-based redirect files
echo "Using JavaScript redirects for more reliable client-side routing"
cp "$PUBLIC_DIR/index-js-redirect.html" "$DIST_DIR/index.html"
cp "$PUBLIC_DIR/404-js-redirect.html" "$DIST_DIR/404.html"

# Copy diagnostic tools
cp "$PUBLIC_DIR/hash-routing-diagnostic.html" "$DIST_DIR/"
cp "$PUBLIC_DIR/redirect-test.html" "$DIST_DIR/"

# Create a verification file
TIMESTAMP=$(date +'%Y%m%d%H%M')
echo "v$TIMESTAMP" > "$DIST_DIR/version.txt"

# Verify the HTML files
echo "Verifying JavaScript redirects are properly set up:"
if grep -q "window.location.replace" "$DIST_DIR/index.html"; then
  echo "✅ index.html: JavaScript redirect found"
else
  echo "❌ index.html: JavaScript redirect not found"
fi

if grep -q "window.location.replace" "$DIST_DIR/404.html"; then
  echo "✅ 404.html: JavaScript redirect found"
else
  echo "❌ 404.html: JavaScript redirect not found"
fi

echo
echo "==============================================="
echo "  Deployment files ready!"
echo "==============================================="
echo
echo "To test locally:"
echo "  python3 -m http.server --directory $DIST_DIR 8080"
echo
echo "Then visit: http://localhost:8080/"
echo
echo "To commit and push to GitHub:"
echo "  git add ."
echo "  git commit -m \"Updated with JavaScript redirects for GitHub Pages\""
echo "  git push origin main"
echo
echo "Restored original app.config.ts"
cp "$BACKUP_CONFIG" "$CONFIG_FILE"
