#!/bin/bash

# ═══════════════════════════════════════════════════════════════
#  DEPLOY WORMZONE KE VERCEL - QUICK SETUP
# ═══════════════════════════════════════════════════════════════

echo "🚀 WORMZONE DEPLOYMENT SETUP"
echo ""

# Step 1: Check git status
echo "📌 Step 1: Checking Git..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo "✅ Git repository found"
    git status --short | head -5
else
    echo "❌ Not a git repo - initializing..."
    git init
    git add .
    git commit -m "Initial Wormzone game"
fi

echo ""

# Step 2: Build test
echo "📌 Step 2: Testing build..."
if pnpm build > /dev/null 2>&1; then
    echo "✅ Build successful - ready to deploy!"
else
    echo "❌ Build failed - fix errors before deploying"
    exit 1
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "🎮 YOUR WORMZONE GAME IS READY TO DEPLOY!"
echo ""
echo "📖 CHOOSE YOUR DEPLOYMENT METHOD:"
echo ""
echo "Option 1️⃣  - v0 Settings (Easiest)"
echo "  → Open v0 → Settings → Git → Connect GitHub"
echo "  → Then connect Vercel project"
echo ""
echo "Option 2️⃣  - GitHub Push (Recommended)"
echo "  Commands:"
echo "  $ git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO"
echo "  $ git branch -M main"
echo "  $ git push -u origin main"
echo "  Then go to https://vercel.com → Import GitHub Repo"
echo ""
echo "Option 3️⃣  - Vercel CLI"
echo "  $ vercel login"
echo "  $ vercel"
echo "  Then follow prompts"
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "✨ Files ready for deployment:"
echo "  ✓ package.json"
echo "  ✓ pnpm-lock.yaml"
echo "  ✓ tsconfig.json"
echo "  ✓ next.config.mjs"
echo "  ✓ vercel.json"
echo "  ✓ .vercelignore"
echo ""
echo "📚 Read DEPLOY_GUIDE.md for detailed instructions"
echo ""
