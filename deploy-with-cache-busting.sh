#!/bin/bash
# Deploy Angular app with hash routing and cache-busting meta redirects

# Exit on error
set -e

echo "==============================================="
echo "  Angular App Deployment with Hash Routing"
echo "  and Cache-Busting Meta Redirects"
echo "==============================================="

# Paths
CONFIG_FILE="src/app/app.config.ts"
CONFIG_HASH="src/app/app.config.hash.ts"
BACKUP_CONFIG="src/app/app.config.backup.ts"
DIST_DIR="dist/vyaktigatav-rtta"
PUBLIC_DIR="public"

# Update cache-buster timestamp in meta redirect files
TIMESTAMP=$(date +"%Y%m%d%H%M")

echo "Updating cache-buster timestamp in redirect files to: $TIMESTAMP"
sed -i "s/cachebuster-[0-9]*/cachebuster-$TIMESTAMP/g" "$PUBLIC_DIR/index-cachebuster.html"
sed -i "s/cachebuster-[0-9]*/cachebuster-$TIMESTAMP/g" "$PUBLIC_DIR/404-cachebuster.html"

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

# Copy the cache-busting meta redirect files
cp "$PUBLIC_DIR/index-cachebuster.html" "$DIST_DIR/index.html"
cp "$PUBLIC_DIR/404-cachebuster.html" "$DIST_DIR/404.html"

# Copy diagnostic tools
cp "$PUBLIC_DIR/hash-routing-diagnostic.html" "$DIST_DIR/"

# Create a verification file
echo "v$TIMESTAMP" > "$DIST_DIR/version.txt"

# Verify the HTML files
echo "Verifying redirects are properly set up:"
echo -n "index.html meta refresh: "
grep -q "meta http-equiv=\"refresh\"" "$DIST_DIR/index.html" && echo "✅" || echo "❌"

echo -n "404.html meta refresh: "
grep -q "meta http-equiv=\"refresh\"" "$DIST_DIR/404.html" && echo "✅" || echo "❌"

echo -n "Cache busting timestamp: "
grep -q "cachebuster-$TIMESTAMP" "$DIST_DIR/index.html" && echo "✅" || echo "❌"

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
echo "  git commit -m \"Updated cache-busting redirects\""
echo "  git push origin main"
echo
echo "Restored original app.config.ts"
cp "$BACKUP_CONFIG" "$CONFIG_FILE"
