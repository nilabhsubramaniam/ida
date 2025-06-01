#!/usr/bin/env zsh

echo "Testing GitHub Pages redirect handler..."

# Build the application
echo "\nBuilding application..."
npm run build:prod -- --base-href "/ida/"

# Create a test server directory
echo "\nCreating test environment..."
mkdir -p test-server
cp -r dist/vyaktigatav-rtta/* test-server/
cp -f public/404.html test-server/

# Start a local server
echo "\nStarting test server..."
echo "Test the following URLs to verify routing:"
echo "1. http://localhost:8080/ida/"
echo "2. http://localhost:8080/ida/dashboard"
echo "3. http://localhost:8080/ida/resume-editor"
echo "4. http://localhost:8080/ida/login"
echo "\nPress Ctrl+C to stop the server"

cd test-server && python3 -m http.server 8080
