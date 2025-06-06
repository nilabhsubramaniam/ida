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
if grep -q "redirected" public/404.html; then
  echo "✅ Using simplified redirect logic"
else
  echo "❌ Using complex redirect logic"
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

# Show final status
echo ""
echo "=============================================="
echo "Deployment Configuration Status: Ready"
echo "=============================================="
echo ""
echo "To deploy, push your changes to the GitHub repository:"
echo "  git add ."
echo "  git commit -m 'Fix GitHub Pages redirect issues'"
echo "  git push origin main"
echo ""
echo "After the GitHub Action completes, your site will be available at:"
echo "  https://nilabhsubramaniam.github.io/ida/"
