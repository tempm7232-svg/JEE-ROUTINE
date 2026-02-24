#!/usr/bin/env bash
# JEE Study Tracker - Quick Setup Script

echo "🚀 JEE Study Tracker - Quick Setup"
echo "===================================="
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Download from: https://nodejs.org/"
    exit 1
fi
echo "  Node version: $(node --version)"
echo "  npm version: $(npm --version)"
echo ""

# Install dependencies
echo "✓ Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Installation failed!"
    exit 1
fi
echo "  ✅ Dependencies installed"
echo ""

# Start dev server
echo "✓ Starting development server..."
echo ""
echo "🎉 Success! Your app is ready!"
echo ""
echo "📍 Open your browser: http://localhost:3000"
echo ""
echo "ℹ️  Commands:"
echo "  npm run dev    - Start development server"
echo "  npm run build  - Build for production"
echo "  npm start      - Start production server"
echo "  npm run lint   - Run ESLint"
echo ""
echo "📚 Documentation:"
echo "  - Start with: QUICKSTART.md"
echo "  - Full guide: README.md"
echo "  - Deployment: DEPLOYMENT.md"
echo ""
echo "Happy studying! 📚✨"
echo ""

npm run dev
