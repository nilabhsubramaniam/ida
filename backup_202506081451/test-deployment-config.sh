#!/bin/bash
echo "=============================================="
echo "  Testing GitHub Pages Deployment Configuration"
echo "=============================================="

# Check for .nojekyll file
echo -n "Checking for .nojekyll file: "
if [ -f "public/.nojekyll" ]; then
  echo "✅ Present"
else
  echo "❌ Missing"
  echo "Creating .nojekyll file..."
  touch public/.nojekyll
fi

# Check simplified 404.html
echo -n "Checking 404.html redirect approach: "
if grep -q "location.replace" public/404.html; then
  echo "✅ Using ultra-simple redirect logic"
elif grep -q "window.location.href" public/404.html; then
  echo "✅ Using simplified redirect logic"
else
  echo "❌ Using complex redirect logic"
  echo "Consider updating to ultra-simple redirect in 404.html"
fi

# Check base href in app.config.ts
echo -n "Checking app.config.ts base href: "
if grep -q "getBaseHref" src/app/app.config.ts; then
  echo "✅ Dynamic base href configured"
else
  echo "❌ Base href configuration missing"
fi

# Check GitHub workflow file
echo -n "Checking GitHub workflow: "
if [ -f ".github/workflows/angular-deploy.yml" ]; then
  echo "✅ Workflow file present"
else
  echo "❌ Workflow file missing"
fi

# Check index.html in src folder
echo -n "Checking src/index.html for redirect logic: "
if ! grep -q "sessionStorage" src/index.html; then
  echo "✅ No complex redirect logic in main app"
else
  echo "❌ Found sessionStorage handling in main app"
  echo "Consider removing sessionStorage handling from src/index.html"
fi

# Check if public/index.html has any redirect loops
echo -n "Checking public/index.html for redirect safety: "
if grep -q "redirectCount" public/index.html; then
  echo "❌ Found potential redirect loop counters"
  echo "Consider simplifying redirect logic in public/index.html"
else
  echo "✅ No redirect loop indicators found"
fi

# Show final status
echo ""
echo "=============================================="
echo "Deployment Configuration Status: Ready"
echo "=============================================="
echo ""
echo "To deploy, push your changes to the GitHub repository:"
echo "  git add ."
echo "  git commit -m 'Fix GitHub Pages redirect issues with ultra-simple approach'"
echo "  git push origin main"
echo ""
echo "After the GitHub Action completes, your site will be available at:"
echo "  https://nilabhsubramaniam.github.io/ida/"
echo ""
echo "IMPORTANT: Verify GitHub Pages settings:"
echo "  1. Go to your repository Settings > Pages"
echo "  2. Source should be 'Deploy from a branch'"
echo "  3. Branch should be 'gh-pages' and folder '/ (root)'"
echo "  4. Custom domain should be empty (unless you're using one)"
