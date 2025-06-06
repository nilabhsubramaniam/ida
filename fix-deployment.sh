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

# Move files from browser directory to the root
echo "Moving files from browser directory to root..."
cp -a $DIST_DIR/browser/* $DIST_DIR/
rm -rf $DIST_DIR/browser

# Create .nojekyll file to disable Jekyll processing
touch "$DIST_DIR/.nojekyll"

# Create a favicon if missing
if [ ! -f "$DIST_DIR/favicon.ico" ]; then
  echo "Adding default favicon"
  cp -f public/favicon.ico $DIST_DIR/ || echo "No favicon found"
fi

# Verify the build
echo "Verifying Angular build files:"
grep -q "<app-root" $DIST_DIR/index.html && echo "✅ Angular app root found" || echo "❌ Angular app root not found"

echo "Verifying hash routing is enabled:"
grep -q "base href=\"/ida/\"" $DIST_DIR/index.html && echo "✅ Base href is set" || echo "❌ Base href not found"

# Test the build with a local server
echo
echo "==============================================="
echo "  Starting test server"
echo "==============================================="
echo "Starting server on port 8080..."
echo "Press Ctrl+C to stop the server"
echo
echo "To test the application visit: http://localhost:8080/"
echo

# Restore original config
cp "$BACKUP_CONFIG" "$CONFIG_FILE"

# Start a local server
cd $DIST_DIR && python3 -m http.server 8080
