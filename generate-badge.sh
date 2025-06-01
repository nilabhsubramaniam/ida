#!/usr/bin/env zsh

# Script to generate GitHub Actions workflow status badge and update README.md

# Default repository owner and name
repo_owner="nilabhsubramaniam"
repo_name="ida"
workflow_file="angular-deploy.yml"

# Check if arguments were provided
if [[ $# -ge 1 ]]; then
  repo_owner="$1"
fi

if [[ $# -ge 2 ]]; then
  repo_name="$2"
fi

if [[ $# -ge 3 ]]; then
  workflow_file="$3"
fi

# Try to extract info from git remote if no arguments provided
if [[ $repo_owner == "nilabhsubramaniam" && $repo_name == "ida" && $# -eq 0 ]]; then
  echo "No arguments provided, attempting to extract from git remote..."
  
  REMOTE_URL=$(git config --get remote.origin.url)
  if [[ ! -z "$REMOTE_URL" ]]; then
    if [[ $REMOTE_URL == *"github.com"* ]]; then
      if [[ $REMOTE_URL == *":"* ]]; then
        # SSH format: git@github.com:username/repo.git
        USER_REPO=$(echo $REMOTE_URL | sed -E 's/.*:(.+)\/(.+)\.git/\1 \2/')
      else
        # HTTPS format: https://github.com/username/repo.git
        USER_REPO=$(echo $REMOTE_URL | sed -E 's/.*github\.com\/(.+)\/(.+)\.git/\1 \2/')
      fi
      
      TMP_OWNER=$(echo $USER_REPO | cut -d ' ' -f 1)
      TMP_REPO=$(echo $USER_REPO | cut -d ' ' -f 2)
      
      if [[ ! -z "$TMP_OWNER" && ! -z "$TMP_REPO" ]]; then
        repo_owner=$TMP_OWNER
        repo_name=$TMP_REPO
        echo "Detected repository: $repo_owner/$repo_name"
      fi
    fi
  fi
fi

# Generate the badge markdown
badge_url="https://github.com/$repo_owner/$repo_name/actions/workflows/$workflow_file/badge.svg"
badge_link="https://github.com/$repo_owner/$repo_name/actions/workflows/$workflow_file"
badge_md="[![Deploy Angular Application]($badge_url)]($badge_link)"

# Print the badge markdown
echo "\nGitHub Actions Status Badge for $repo_owner/$repo_name:\n"
echo $badge_md
echo "\n"
echo "HTML version:"
echo "<a href=\"$badge_link\"><img src=\"$badge_url\" alt=\"Deploy Angular Application\"></a>"

# Ask if user wants to update README.md
echo "\nWould you like to update the README.md with this badge? (y/n)"
read UPDATE_README

if [[ "$UPDATE_README" == "y" || "$UPDATE_README" == "Y" ]]; then
  # Find the current badge line and replace it
  if grep -q "!\[Deploy Angular Application\]" README.md; then
    sed -i "s|!\[Deploy Angular Application\].*|$badge_md|" README.md
    echo "Updated existing badge in README.md"
  else
    # Otherwise add it after the project description
    sed -i "/^The UI is built using/a\\\\n$badge_md" README.md
    echo "Added badge to README.md"
  fi
  
  # Also update any references to the GitHub username in README.md
  sed -i "s|YOUR_USERNAME|$repo_owner|g" README.md
  echo "Updated all references to YOUR_USERNAME in README.md"
fi
