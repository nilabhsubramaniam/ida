#!/bin/bash
# Script to test the hash routing solution locally

echo "==============================================="
echo "  Local GitHub Pages Testing Environment"
echo "==============================================="

# Configuration
DIST_DIR="dist/vyaktigatav-rtta"
PORT=4200
TEST_LOG="local-test-results.log"

# Function to check if a command exists
command_exists() {
  command -v "$1" &> /dev/null
}

# Check if Python is available
if command_exists python3; then
  PYTHON_CMD="python3"
elif command_exists python; then
  PYTHON_CMD="python"
else
  echo "Error: Python is not available. Please install Python to run this test."
  exit 1
fi

# Check if curl is available
if ! command_exists curl; then
  echo "Warning: curl is not available. Some tests will be skipped."
fi

# Make sure we have a build to test
if [ ! -d "$DIST_DIR" ]; then
  echo "No build found in $DIST_DIR"
  echo "Running deploy script to create a build with hash routing..."
  
  if [ -f "./deploy-with-cache-busting.sh" ]; then
    bash ./deploy-with-cache-busting.sh
  elif [ -f "./validate-hash-routing.sh" ]; then
    bash ./validate-hash-routing.sh
  else
    echo "Error: No deploy script found."
    exit 1
  fi
  
  # Check again if build was created
  if [ ! -d "$DIST_DIR" ]; then
    echo "Error: Build failed. Cannot continue with testing."
    exit 1
  fi
fi

# Clear previous test log
echo "Test run: $(date)" > "$TEST_LOG"

# Start a background server
echo "Starting local server on port $PORT..."
echo "Server starting at: $(date)" >> "$TEST_LOG"
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

# Function to test a URL and log the result
test_url() {
  local url=$1
  local description=$2
  
  echo "Testing: $description" | tee -a "$TEST_LOG"
  echo "URL: $url" | tee -a "$TEST_LOG"
  
  if command_exists curl; then
    # Use curl to check the URL with -L to follow redirects
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" -L "http://localhost:$PORT$url")
    echo "HTTP Status: $HTTP_CODE" | tee -a "$TEST_LOG"
    
    # Get redirect information
    REDIRECT_INFO=$(curl -s -I -L "http://localhost:$PORT$url")
    echo "Redirect chain:" | tee -a "$TEST_LOG"
    echo "$REDIRECT_INFO" | grep -E "HTTP/|Location:" | tee -a "$TEST_LOG"
  else
    echo "Skipping HTTP test (curl not available)" | tee -a "$TEST_LOG"
  fi
  
  echo "----------------------------------------" | tee -a "$TEST_LOG"
}

# Run tests
echo "Running tests..."
echo "----------------------------------------" | tee -a "$TEST_LOG"

# Test the root URL
test_url "/" "Root URL"

# Test index.html directly
test_url "/index.html" "Direct access to index.html"

# Test 404.html directly
test_url "/404.html" "Direct access to 404.html"

# Test a simulated non-existent route
test_url "/nonexistent-route" "Non-existent route"

# Test deep link to a route that should be handled by Angular
test_url "/login" "Deep link to login page"

# Test hash route
test_url "/#/login" "Hash route to login page"

echo
echo "Tests completed. Results saved to $TEST_LOG"
echo

# Open the diagnostic page in the default browser if available
if command_exists xdg-open; then
  echo "Opening hash routing diagnostic page in browser..."
  xdg-open "http://localhost:$PORT/hash-routing-diagnostic.html" &
elif command_exists open; then
  echo "Opening hash routing diagnostic page in browser..."
  open "http://localhost:$PORT/hash-routing-diagnostic.html" &
else
  echo "To view the diagnostic page, open: http://localhost:$PORT/hash-routing-diagnostic.html"
fi

echo
echo "Local server is still running on http://localhost:$PORT"
echo "Press Ctrl+C when done testing to stop the server"

# Provide information about the redirect test page
echo
echo "You can also test with the redirect test page:"
echo "http://localhost:$PORT/redirect-test.html"
echo

# Wait for user to press Ctrl+C
trap "kill $SERVER_PID; echo 'Server stopped'; exit 0" INT
wait $SERVER_PID
