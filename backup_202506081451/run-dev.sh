#!/usr/bin/env zsh

# Script to run the Angular development server with live reload

echo "Starting Angular development server..."
echo "This will use the default configuration (development)"

# Navigate to project directory (if script is run from elsewhere)
cd "$(dirname "$0")"

# Run the Angular development server
npm run start -- --open
