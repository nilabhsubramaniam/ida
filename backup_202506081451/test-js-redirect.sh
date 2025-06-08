#!/bin/bash
# Script to test the JavaScript-based redirects

echo "==============================================="
echo "  Testing JavaScript Redirects"
echo "==============================================="

# Configuration
DIST_DIR="dist/vyaktigatav-rtta"
TEST_DIR="/tmp/js-redirect-test"
PORT=4203

# Check if DIST_DIR exists, if not use the TEST_DIR
if [ -d "$DIST_DIR" ]; then
  echo "Using Angular build directory: $DIST_DIR"
  # Copy our redirect files to the existing build
  cp "/home/nilabh/Projects/ida/public/index-js-redirect.html" "$DIST_DIR/index.html"
  cp "/home/nilabh/Projects/ida/public/404-js-redirect.html" "$DIST_DIR/404.html"
  TARGET_DIR="$DIST_DIR"
else
  echo "No build found, creating test environment in $TEST_DIR..."
  mkdir -p "$TEST_DIR"
  # Copy our redirect files
  cp "/home/nilabh/Projects/ida/public/index-js-redirect.html" "$TEST_DIR/index.html"
  cp "/home/nilabh/Projects/ida/public/404-js-redirect.html" "$TEST_DIR/404.html"
  # Create a simulated ida folder with a basic app
  mkdir -p "$TEST_DIR/ida"
  TARGET_DIR="$TEST_DIR"
fi
cat > "$TEST_DIR/ida/index.html" << EOL
<!DOCTYPE html>
<html>
<head>
  <title>Test Angular App</title>
</head>
<body>
  <h1>Angular App Loaded Successfully!</h1>
  <p>URL Hash: <span id="hash"></span></p>
  <script>
    document.getElementById('hash').textContent = window.location.hash;
  </script>
</body>
</html>
EOL

# Start a web server
echo "Starting test server on port 9000..."
cd "$TEST_DIR"
python3 -m http.server 9000 &
SERVER_PID=$!

# Give the server a moment to start
sleep 2

# Use curl to test redirects
echo "Testing index.html redirect..."
curl -i -L "http://localhost:9000/" | grep -A 10 "<head\|<body"

echo "Testing 404.html redirect..."
curl -i -L "http://localhost:9000/nonexistent" | grep -A 10 "<head\|<body"

# Cleanup
kill $SERVER_PID
echo "Test complete. Server stopped."
echo "You can manually test at http://localhost:9000/ if you start the server again."
