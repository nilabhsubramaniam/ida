#!/usr/bin/env zsh

# Script to generate GitHub Actions workflow status badge

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

# Generate the badge markdown
badge_url="https://github.com/$repo_owner/$repo_name/actions/workflows/$workflow_file/badge.svg"
badge_link="https://github.com/$repo_owner/$repo_name/actions/workflows/$workflow_file"
badge_md="[![Deploy Angular Application]($badge_url)]($badge_link)"

# Print the badge markdown
echo "\nGitHub Actions Status Badge for $repo_owner/$repo_name:\n"
echo $badge_md
echo "\n"
echo "Add this to your README.md file to show the current deployment status."
