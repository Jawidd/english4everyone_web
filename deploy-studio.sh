#!/usr/bin/env bash
set -e

# Load SANITY_DEPLOY_STUDIO_TOKEN from .env if not already set
if [ -f .env ]; then
  export $(grep -v '^#' .env | grep 'SANITY_DEPLOY_STUDIO_TOKEN' | xargs)
fi

if [ -z "$SANITY_DEPLOY_STUDIO_TOKEN" ]; then
  echo "Error: SANITY_DEPLOY_STUDIO_TOKEN is not set in .env"
  exit 1
fi

echo "Building deployment Docker image..."
docker build -f studio/Dockerfile.deploy -t english4all-studio-deploy ./studio

echo "Deploying to Sanity hosting..."
docker run --rm -e SANITY_AUTH_TOKEN="$SANITY_DEPLOY_STUDIO_TOKEN" english4all-studio-deploy

echo "Done — studio live at: https://english4all-leeds.sanity.studio"
