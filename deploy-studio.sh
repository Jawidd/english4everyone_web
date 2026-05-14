#!/usr/bin/env bash
set -e

echo "🚀 Deploying Sanity Studio using Docker..."

# Create a temporary deployment Dockerfile
cat > studio/Dockerfile.deploy << 'EOF'
FROM node:22-alpine

WORKDIR /studio

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm install

# Copy all studio files
COPY . .

# Build the studio
RUN npm run build

# Deploy command
CMD ["npm", "run", "deploy"]
EOF

# Build the deployment image
echo "🔨 Building deployment Docker image..."
docker build -f studio/Dockerfile.deploy -t english4all-studio-deploy ./studio

# Run the deployment
echo "☁️  Deploying to Sanity hosting..."
docker run --rm english4all-studio-deploy

# Clean up
echo "🧹 Cleaning up..."
rm -f studio/Dockerfile.deploy

echo "✅ Studio deployed successfully!"
echo "🌐 Access your studio at: https://english4all-leeds.sanity.studio"