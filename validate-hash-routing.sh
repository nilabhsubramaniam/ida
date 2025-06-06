#!/bin/bash
# Script to validate and prepare a clean GitHub Pages deployment

echo "==============================================="
echo "  GitHub Pages Hash Routing Deployment Validator"
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

# Copy the simple meta redirect files
cp "$PUBLIC_DIR/index-meta.html" "$DIST_DIR/index.html"
cp "$PUBLIC_DIR/404-meta-redirect.html" "$DIST_DIR/404.html"

# Copy diagnostic tools
cp "$PUBLIC_DIR/hash-routing-diagnostic.html" "$DIST_DIR/"

# Create a verification file
echo "v$(date +'%Y%m%d%H%M')" > "$DIST_DIR/version.txt"

echo
echo "==============================================="
echo "  Deployment files ready for testing!"
echo "==============================================="
echo
echo "To test locally, you can use:"
echo "  python3 -m http.server --directory $DIST_DIR 8080"
echo
echo "Then visit: http://localhost:8080/"
echo
echo "To deploy to GitHub Pages:"
echo "  - Push changes to GitHub"
echo "  - GitHub Actions will deploy to gh-pages branch"
echo
echo "Restored original app.config.ts"
cp "$BACKUP_CONFIG" "$CONFIG_FILE"
