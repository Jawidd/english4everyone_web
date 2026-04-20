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

set -e

BUCKET=$1
DISTRIBUTION_ID=$2

if [ -z "$BUCKET" ] || [ -z "$DISTRIBUTION_ID" ]; then
  echo "Usage: ./deploy.sh <bucket-name> <cloudfront-distribution-id>"
  exit 1
fi

echo "▶ Building site..."
npm run build

echo "▶ Uploading to S3 bucket: $BUCKET"
aws s3 sync dist/ "s3://$BUCKET" --delete

echo "▶ Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id "$DISTRIBUTION_ID" \
  --paths "/*"

echo "✅ Deploy complete!"
