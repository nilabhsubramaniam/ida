#!/bin/bash
# Script to detect infinite redirect loops in local testing

echo "==============================================="
echo "  Redirect Loop Detection Tool"
echo "==============================================="

# Configuration
DIST_DIR="dist/vyaktigatav-rtta"
PORT=4201
MAX_REDIRECTS=10
TEST_URLS=(
  "/"
  "/index.html"
  "/404.html"
  "/nonexistent-route"
  "/login"
  "/dashboard"
)

# Function to check if a command exists
command_exists() {
  command -v "$1" &> /dev/null
}

# Check if required tools are available
if ! command_exists curl; then
  echo "Error: curl is required for this test."
  exit 1
fi

if ! command_exists python3 && ! command_exists python; then
  echo "Error: Python is required for this test."
  exit 1
fi

# Determine Python command
if command_exists python3; then
  PYTHON_CMD="python3"
else
  PYTHON_CMD="python"
fi

# Make sure we have a build to test
if [ ! -d "$DIST_DIR" ]; then
  echo "No build found in $DIST_DIR"
  echo "Please run a build script first."
  exit 1
fi

# Start a background server on a different port
echo "Starting test server on port $PORT..."
$PYTHON_CMD -m http.server --directory "$DIST_DIR" $PORT > /dev/null 2>&1 &
SERVER_PID=$!

# Give the server a moment to start
sleep 2

# Make sure the server started successfully
if ! ps -p $SERVER_PID > /dev/null; then
  echo "Error: Failed to start local server."
  exit 1
fi

echo "Server running with PID: $SERVER_PID"
echo

# Function to test for redirect loops
test_for_redirect_loops() {
  local url=$1
  local max_redirects=$2
  
  echo "Testing: $url"
  
  # Use curl with -L to follow redirects and --max-redirs to limit redirects
  REDIRECT_OUTPUT=$(curl -s -v -L --max-redirs $max_redirects "http://localhost:$PORT$url" 2>&1)
  
  # Count redirects by counting Location headers
  REDIRECT_COUNT=$(echo "$REDIRECT_OUTPUT" | grep -c "< location:")
  
  echo "  Redirects: $REDIRECT_COUNT (max allowed: $max_redirects)"
  
  # Check for potential loop
  if [ $REDIRECT_COUNT -ge $max_redirects ]; then
    echo "  ⚠️ WARNING: Potential redirect loop detected!"
    echo "  Redirect chain:"
    echo "$REDIRECT_OUTPUT" | grep -E "< HTTP/|< location:" | sed 's/^/    /'
  else
    echo "  ✅ No redirect loop detected"
  fi
  
  # Check final destination
  FINAL_URL=$(echo "$REDIRECT_OUTPUT" | grep -o "< location: [^ ]*" | tail -1 | awk '{print $3}')
  if [ -n "$FINAL_URL" ]; then
    echo "  Final destination: $FINAL_URL"
  else
    echo "  No more redirects - reached final page"
  fi
  
  echo "----------------------------------------"
}

# Run tests for each URL
echo "Running redirect loop tests with max redirects: $MAX_REDIRECTS"
echo "----------------------------------------"

for url in "${TEST_URLS[@]}"; do
  test_for_redirect_loops "$url" $MAX_REDIRECTS
done

# Test a few hash routes as well
echo "Testing hash routes:"
echo "----------------------------------------"
test_for_redirect_loops "/#/" $MAX_REDIRECTS
test_for_redirect_loops "/#/login" $MAX_REDIRECTS

echo
echo "All tests completed!"
echo

# Clean up the server
kill $SERVER_PID
echo "Server stopped"
