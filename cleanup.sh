#!/bin/bash
# Script to clean up testing and documentation files

echo "==============================================="
echo "  Cleaning up testing files"
echo "==============================================="

# Files to remove
echo "Removing temporary test and documentation files..."

# Remove test scripts
rm -f test-*.sh
rm -f simulate-github-pages.sh
rm -f local-test-results.log
rm -f js-redirect-test-results.log

# Remove old deployment scripts but keep the main ones
rm -f deploy-with-cache-busting.sh
rm -f deploy-with-js-redirect.sh
rm -f test-deployment.sh
rm -f test-deployment-config.sh
rm -f test-gh-pages.sh

# Keep the essential scripts
mv fix-deployment.sh deploy.sh
chmod +x deploy.sh

# Remove test and documentation markdown files but keep important ones
echo "Cleaning documentation files..."
rm -f DEPLOYMENT-SUMMARY.md
rm -f META-REDIRECT-FIX.md
rm -f HASH-ROUTING.md
# Keep README.md, DEPLOYMENT.md, GITHUB-PAGES-FIX.md

# Clean up test HTML files in public directory
echo "Cleaning HTML test files..."
rm -f public/bg-test.html
rm -f public/deploy-test.html
rm -f public/hash-routing-diagnostic.html
rm -f public/redirect-test.html
rm -f public/routing-test.html
rm -f public/test.html
rm -f public/404-cachebuster.html
rm -f public/404-js-redirect.html
rm -f public/404-meta-redirect.html
rm -f public/404-simple.html
rm -f public/index-cachebuster.html
rm -f public/index-js-redirect.html
rm -f public/index-meta.html

# Keep only essential files in public directory
echo "Keeping only essential files..."

echo
echo "==============================================="
echo "  Cleanup complete"
echo "==============================================="
echo
echo "Your workspace is now clean and organized."
echo
echo "To build and deploy the application, run:"
echo "  ./deploy.sh"
echo
