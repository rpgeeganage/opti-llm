#!/bin/bash

echo "Testing build of all services..."

# Test API service build
echo "Building API service..."
cd api && pnpm build && echo "API service built successfully" || echo "API service build failed"

# Test Proxy service build
echo "Building Proxy service..."
cd ../proxy && pnpm build && echo "Proxy service built successfully" || echo "Proxy service build failed"

# Test Dashboard service build
echo "Building Dashboard service..."
cd ../dashboard && pnpm build && echo "Dashboard service built successfully" || echo "Dashboard service build failed"

echo "Build test completed"
