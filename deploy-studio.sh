#!/usr/bin/env bash
set -e

STACK_NAME="english4all-studio"
TEMPLATE="infrastructure/studio-cloudformation.yml"

echo "▶ Deploying CloudFormation stack: $STACK_NAME ..."
aws cloudformation deploy \
  --template-file "$TEMPLATE" \
  --stack-name "$STACK_NAME"

echo "▶ Fetching stack outputs..."
BUCKET=$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='BucketName'].OutputValue" \
  --output text)

DISTRIBUTION_ID=$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='CloudFrontDistributionId'].OutputValue" \
  --output text)

URL=$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='CloudFrontURL'].OutputValue" \
  --output text)

echo "  Bucket:          $BUCKET"
echo "  Distribution ID: $DISTRIBUTION_ID"
echo "  URL:             $URL"

echo "▶ Building and deploying studio to S3..."
STUDIO_BUCKET="$BUCKET" \
STUDIO_DISTRIBUTION_ID="$DISTRIBUTION_ID" \
  docker compose --profile deploy-s3 run --rm studio-deploy-s3

echo ""
echo "✅ Studio deployed to: $URL"
