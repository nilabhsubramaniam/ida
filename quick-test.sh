#!/bin/bash
# Quick local test for GitHub Pages deployment

echo "==============================================="
echo "  Quick GitHub Pages Deployment Test"
echo "==============================================="

DIST_DIR="dist/vyaktigatav-rtta"
LOCAL_PORT=9000

# Check if build exists
if [ ! -d "$DIST_DIR" ]; then
  echo "No build found! Building the application first..."
  ./deploy.sh
  exit 0
fi

# Check if build has app-root (Angular app)
if ! grep -q "<app-root" "$DIST_DIR/index.html"; then
  echo "❌ ERROR: Build does not appear to be a proper Angular application."
  echo "Please run ./deploy.sh to create a proper build."
  exit 1
fi

# Check if hash routing is configured
if ! grep -q "base href=\"/ida/\"" "$DIST_DIR/index.html"; then
  echo "⚠️ WARNING: Base href may not be configured correctly."
fi

# Check for main JS file
if ! find "$DIST_DIR" -name "main-*.js" | grep -q .; then
  echo "❌ ERROR: Main JavaScript file not found. Build may be incomplete."
  exit 1
fi

# Start test server
echo
echo "==============================================="
echo "  Starting test server"
echo "==============================================="
echo "Starting server on port $LOCAL_PORT..."
echo "Press Ctrl+C to stop the server"
echo
echo "To test the application visit: http://localhost:$LOCAL_PORT/"
echo "IMPORTANT: Test the following URLs:"
echo "  - http://localhost:$LOCAL_PORT/"
echo "  - http://localhost:$LOCAL_PORT/login (should work with hash routing)"
echo

# Start server
cd "$DIST_DIR" && python3 -m http.server "$LOCAL_PORT"
