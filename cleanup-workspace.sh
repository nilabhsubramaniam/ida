#!/bin/bash
# Script to clean up unnecessary files while preserving essential deployment functionality

echo "==============================================="
echo "  Cleaning up workspace"
echo "==============================================="

# Create a backup directory just in case
BACKUP_DIR="backup_$(date +%Y%m%d%H%M)"
mkdir -p $BACKUP_DIR

# Preserve essential files
echo "Backing up essential files..."
cp deploy.sh $BACKUP_DIR/
cp -r .github $BACKUP_DIR/ 2>/dev/null || true

# Files to keep - modify this list as needed
KEEP_FILES=(
  "angular.json"
  "package.json"
  "package-lock.json"
  "tsconfig.json"
  "tsconfig.app.json"
  "deploy.sh"
  "README.md"
  ".gitignore"
  ".editorconfig"
)

# Clean up documentation files that aren't needed anymore
echo "Removing documentation files..."
MD_FILES=$(find . -maxdepth 1 -name "*.md" -not -name "README.md")
for file in $MD_FILES; do
  echo "Moving $file to backup"
  mv "$file" "$BACKUP_DIR/"
done

# Clean up unnecessary scripts
echo "Removing unnecessary scripts..."
SH_FILES=$(find . -maxdepth 1 -name "*.sh" -not -name "deploy.sh" -not -name "cleanup-workspace.sh")
for file in $SH_FILES; do
  echo "Moving $file to backup"
  mv "$file" "$BACKUP_DIR/"
done

# Clean public folder (keep only essential files)
echo "Cleaning up public folder..."
mkdir -p "$BACKUP_DIR/public"
# Only keep these files in public
mv public/assets "$BACKUP_DIR/public/" 2>/dev/null || true
mv public/favicon.ico "$BACKUP_DIR/public/" 2>/dev/null || true
mv public/favicon.svg "$BACKUP_DIR/public/" 2>/dev/null || true
mv public/CNAME "$BACKUP_DIR/public/" 2>/dev/null || true
mv public/404.html "$BACKUP_DIR/public/" 2>/dev/null || true
mv public/.nojekyll "$BACKUP_DIR/public/" 2>/dev/null || true

# Now clean up everything else in public
find public -type f -not -path "public/assets/*" | while read file; do
  # Check if this is a file we backed up
  if [ -f "$BACKUP_DIR/$file" ]; then
    rm "$file"
  else
    echo "Moving $file to backup"
    mkdir -p "$(dirname "$BACKUP_DIR/$file")"
    mv "$file" "$BACKUP_DIR/$file"
  fi
done

# Restore essential files from backup
echo "Restoring essential files..."
cp -r "$BACKUP_DIR/public/assets" public/ 2>/dev/null || true
cp "$BACKUP_DIR/public/favicon.ico" public/ 2>/dev/null || true
cp "$BACKUP_DIR/public/favicon.svg" public/ 2>/dev/null || true
cp "$BACKUP_DIR/public/CNAME" public/ 2>/dev/null || true
cp "$BACKUP_DIR/public/404.html" public/ 2>/dev/null || true
cp "$BACKUP_DIR/public/.nojekyll" public/ 2>/dev/null || true

# Remove log files
echo "Removing log files..."
find . -maxdepth 1 -name "*.log" -exec mv {} "$BACKUP_DIR/" \;

echo "==============================================="
echo "  Cleanup complete!"
echo "==============================================="
echo "Essential files preserved, other files backed up to: $BACKUP_DIR"
echo 
echo "If you need to restore any files, they are available in the backup folder."
echo "To remove the backup folder once you've verified everything works:"
echo "  rm -rf $BACKUP_DIR"
