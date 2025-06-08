#!/usr/bin/env zsh

# Script to check for style issues and component size warnings in the codebase

echo " SCSS Style Check"
echo "=================="

# Locations to check
scss_files=(
  "src/styles.scss"
  "src/styles/**/*.scss"
  "src/app/**/*.scss"
)

# Check for deprecated @import usage
echo "\n Checking for deprecated @import usage..."
grep -r --include="*.scss" "@import " . || echo " No deprecated @import found"

# Check for component style size
echo "\n Checking for component style sizes..."
large_styles=$(find src -name "*.scss" -type f -exec du -k {} \; | sort -nr | head -10)
echo "Top 10 largest style files:"
echo "$large_styles"

# Check for specific SCSS mixin usages
echo "\n Checking for mixin usage patterns..."
mixin_uses=$(grep -r --include="*.scss" "@include" . | wc -l)
echo "Found $mixin_uses mixin usages"

# Suggest style refactoring for big components
echo "\n Style Optimization Suggestions:"
echo "1. Consider refactoring large component styles (>10KB) into shared mixins"
echo "2. Move common styles to global styles.scss"
echo "3. Use CSS variables for repeated values"
echo "4. Split complex components into smaller ones"

# Show component style budget settings
echo "\n Current Component Style Budget Settings:"
budget_settings=$(grep -A 5 "anyComponentStyle" angular.json)
echo "$budget_settings"

echo "\n Style check complete!"
