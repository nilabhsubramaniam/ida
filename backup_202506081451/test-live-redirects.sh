#!/bin/bash
# Script to test GitHub Pages redirect using curl

echo "==============================================="
echo "  Testing Live GitHub Pages Redirects"
echo "==============================================="

# The base URL for the GitHub Pages site
BASE_URL="https://nilabhsubramaniam.github.io/ida"

# Function to test a URL with curl
test_url() {
  local url=$1
  local description=$2
  
  echo "Testing: $description"
  echo "URL: $url"
  
  # Use curl to check redirect chain
  echo "Checking redirect chain:"
  curl -s -v -L --max-redirs 5 "$url" > /dev/null 2>&1 
  
  # Use curl to get headers only
  echo "Response headers:"
  curl -s -I -L --max-redirs 5 "$url" | grep -E "HTTP/|Location:"
  
  echo "----------------------------------------"
}

# Run tests
echo "Running tests..."

# Test root URL
test_url "$BASE_URL" "Root URL"

# Test with trailing slash
test_url "$BASE_URL/" "Root URL with trailing slash"

# Test direct access to index.html
test_url "$BASE_URL/index.html" "Direct access to index.html"

# Test hash routing
test_url "$BASE_URL/#/" "Hash routing root"

# Test non-existent URL to check 404 handling
test_url "$BASE_URL/nonexistent-page" "Non-existent page (404 handling)"

echo
echo "All tests completed."
echo
echo "Next steps:"
echo "1. Check if redirects work in the browser"
echo "2. If issues persist, try clearing browser cache or using incognito mode"
echo "3. Remember that cached pages might show old behavior"
