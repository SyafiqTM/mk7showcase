#!/bin/bash
set -e

echo "🚀 Starting Angular 14 → 20 upgrade process..."

# --- Step 0: Pre-checks ---
echo "🔍 Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "Node version: $NODE_VERSION"

echo "✅ Make sure you are on Node >= 18.19"
sleep 2

# --- Step 1: Clean project ---
echo "🧹 Cleaning node_modules and cache..."
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# --- Step 2: Sequential Angular upgrades ---
for VERSION in 15 16 17 18 19 20
do
  echo ""
  echo "⬆️ Upgrading to Angular v$VERSION ..."
  npx ng update @angular/core@$VERSION @angular/cli@$VERSION --force || true
  echo "✅ Angular v$VERSION upgrade completed."
  sleep 1
done

# --- Step 3: Update optional packages ---
echo ""
echo "📦 Updating optional dependencies..."
npx ng update

# --- Step 4: Clean again after all upgrades ---
echo "🧹 Final cleanup..."
rm -rf node_modules package-lock.json
npm install

# --- Step 5: Verify result ---
echo ""
echo "🎯 Final Angular version:"
npx ng version

echo ""
echo "🚀 All done! Try running: ng serve"