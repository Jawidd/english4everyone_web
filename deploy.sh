#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy.sh — Deploy the built site to S3 + invalidate CloudFront cache
#
# Prerequisites:
#   - AWS CLI installed and configured (aws configure)
#   - Run `npm run build` first to generate the dist/ folder
#
# Usage:
#   ./deploy.sh <bucket-name> <cloudfront-distribution-id>
#
# Example:
#   ./deploy.sh english4all-leeds-website-123456789 E1ABCDEF123456
# ─────────────────────────────────────────────────────────────────────────────

# set -e

# BUCKET=$1
# DISTRIBUTION_ID=$2

# if [ -z "$BUCKET" ] || [ -z "$DISTRIBUTION_ID" ]; then
#   echo "Usage: ./deploy.sh <bucket-name> <cloudfront-distribution-id>"
#   exit 1
# fi

# echo "▶ Building site..."
# npm run build

# echo "▶ Uploading to S3 bucket: $BUCKET"
# aws s3 sync dist/ "s3://$BUCKET" --delete

# echo "▶ Invalidating CloudFront cache..."
# aws cloudfront create-invalidation \
#   --distribution-id "$DISTRIBUTION_ID" \
#   --paths "/*"

# echo "✅ Deploy complete!"




#!/usr/bin/env bash
set -e

BUCKET="english4allinleeds-test"
IMAGE_NAME="english4all-builder"
CONTAINER_NAME="english4all-build"

echo "▶ Building Docker image..."
docker build -f Dockerfile.build -t "$IMAGE_NAME" .

echo "▶ Running build container..."
docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
docker create --name "$CONTAINER_NAME" "$IMAGE_NAME"
docker start -a "$CONTAINER_NAME"

echo "▶ Copying dist/ from container..."
rm -rf dist
docker cp "$CONTAINER_NAME:/app/dist" ./dist

echo "▶ Cleaning up container..."
docker rm "$CONTAINER_NAME" >/dev/null 2>&1 || true

echo "▶ Uploading dist/ to S3..."
aws s3 sync dist/ "s3://$BUCKET" --delete

echo "✅ Deploy complete!"