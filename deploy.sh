#!/usr/bin/env bash
set -e

BUCKET="english4allinleeds-test"
IMAGE_NAME="english4all-builder"
CONTAINER_NAME="english4all-build"

echo "▶ Building Docker image (runs npm run build inside)..."
docker build -f Dockerfile.build -t "$IMAGE_NAME" .

echo "▶ Extracting dist/ from image..."
rm -rf dist
docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
docker create --name "$CONTAINER_NAME" "$IMAGE_NAME"
docker cp "$CONTAINER_NAME:/app/dist" ./dist
docker rm "$CONTAINER_NAME" >/dev/null 2>&1 || true

echo "▶ Uploading dist/ to s3://$BUCKET ..."
aws s3 sync dist/ "s3://$BUCKET" --delete

echo "✅ Deploy complete! Visit: http://$BUCKET.s3-website.eu-west-2.amazonaws.com"
