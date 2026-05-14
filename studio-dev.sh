#!/usr/bin/env bash
set -e

echo "🚀 Starting Sanity Studio in development mode using Docker..."

# Build and run the studio in development mode
docker build -t english4all-studio ./studio

echo "🌐 Starting studio at http://localhost:3333"
echo "Press Ctrl+C to stop"

docker run --rm -it \
  -p 3333:3333 \
  -v "$(pwd)/studio:/studio" \
  -v /studio/node_modules \
  english4all-studio