# 📥 Installation Guide

Detailed step-by-step installation instructions for JEE Study Tracker.

## Prerequisites

### Operating System
- **Windows**: Windows 10 or later
- **macOS**: macOS 10.14 or later
- **Linux**: Any modern distribution

### Software Requirements
1. **Node.js** - v18.17.0 or higher
2. **npm** - v9+ (comes with Node.js)
3. **Git** - For cloning repository
4. **Code Editor** - VS Code recommended

## Installation Steps

### 1. Verify Prerequisites

#### Check Node.js
```bash
node --version
# Should show v18.17.0 or higher
```

#### Check npm
```bash
npm --version
# Should show v9.0.0 or higher
```

If you don't have Node.js installed, download from [nodejs.org](https://nodejs.org/)

### 2. Get the Code

#### Option A: Clone from Git
```bash
git clone <your-repo-url>
cd jee-study-tracker
```

#### Option B: Download ZIP
1. Download repository as ZIP
2. Extract ZIP file
3. Open terminal in extracted folder

### 3. Install Dependencies

```bash
npm install
```

This will:
- Download all required packages
- Create `node_modules` folder
- Generate `package-lock.json`

**Installation time**: ~2-3 minutes (depends on internet speed)

### 4. Start Development Server

```bash
npm run dev
```

You should see:
```
- Local: http://localhost:3000
- Press 'q' to quit
```

### 5. Open in Browser

Visit: `http://localhost:3000`

You should see the JEE Study Tracker app loaded! 🎉

## Windows-Specific Instructions

### Using Command Prompt (cmd)
```cmd
cd path\to\jee-study-tracker
npm install
npm run dev
```

### Using PowerShell
```powershell
cd path\to\jee-study-tracker
npm install
npm run dev
```

### Using Git Bash
```bash
cd /c/path/to/jee-study-tracker
npm install
npm run dev
```

## macOS-Specific Instructions

### Using Terminal
```bash
cd ~/path/to/jee-study-tracker
npm install
npm run dev
```

### If you don't have Node.js
```bash
# Using Homebrew (if installed)
brew install node

# Or download from nodejs.org
```

## Linux-Specific Instructions

### Ubuntu/Debian
```bash
# Install Node.js
sudo apt update
sudo apt install nodejs npm

# Clone and install
git clone <repo-url>
cd jee-study-tracker
npm install
npm run dev
```

### Fedora/RHEL
```bash
sudo dnf install nodejs npm
git clone <repo-url>
cd jee-study-tracker
npm install
npm run dev
```

## Troubleshooting Installation

### Problem: "npm command not found"
**Solution**: Node.js not installed
- Download from [nodejs.org](https://nodejs.org/)
- Restart terminal after installation
- Verify: `node --version`

### Problem: "Permission denied" (Linux/macOS)
**Solution**: Try with sudo or check permissions
```bash
sudo npm install
# OR
chmod -R 755 node_modules
```

### Problem: "Port 3000 already in use"
**Solution**: Use different port
```bash
npm run dev -- -p 3001
# App runs on localhost:3001
```

### Problem: "Module not found" errors
**Solution**: Reinstall dependencies
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Problem: "Failed to fetch packages"
**Solution**: Clear npm cache
```bash
npm cache clean --force
npm install
```

## Production Build

### Build for Production
```bash
npm run build
```

Output:
- Optimized bundle in `.next/` folder
- Minified JavaScript and CSS
- Ready for deployment

### Test Production Build
```bash
npm run build
npm start
```

Visit: `http://localhost:3000`

## Deployment Preparation

### Before Deploying

1. **Run build to check for errors**
   ```bash
   npm run build
   ```

2. **Test production locally**
   ```bash
   npm start
   ```

3. **Test all features**
   - Log study hours
   - Toggle dark mode
   - Export/Import data
   - Check charts display

4. **Clear console errors**
   - Open DevTools (F12)
   - Check Console tab
   - Fix any errors shown

## Vercel Deployment

### Automatic (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Click "Deploy"

**Done!** Your app is live.

### Manual Using CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

## Optional: Using alternate package managers

### Using Yarn
```bash
# Install yarn first
npm install -g yarn

# Then use yarn instead of npm
yarn install
yarn dev
```

### Using PNPM
```bash
# Install pnpm
npm install -g pnpm

# Then use pnpm
pnpm install
pnpm dev
```

## Verify Installation

```bash
# Check project structure
ls -la

# Should see:
# - app/
# - components/
# - store/
# - hooks/
# - utils/
# - types/
# - package.json
# - next.config.ts
# - tsconfig.json
```

## Development Server Features

The development server provides:
- ✅ Hot Module Reloading (changes reflect instantly)
- ✅ Type checking during development
- ✅ Fast refresh on file changes
- ✅ Development error messages

## IDE Setup (VS Code)

### Recommended Extensions
1. ES7+ React/Redux/React-Native snippets
2. Tailwind CSS IntelliSense
3. TypeScript Vue Plugin
4. Prettier - Code formatter
5. ThunderClient (for API testing)

### Settings
Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Successful Installation Checklist

- [ ] Node.js v18+ installed
- [ ] npm v9+ installed
- [ ] Code cloned/extracted
- [ ] `npm install` completed
- [ ] `npm run dev` running
- [ ] App visible at localhost:3000
- [ ] All sections accessible
- [ ] Dark mode working
- [ ] No console errors

## Next Steps

1. Read [QUICKSTART.md](./QUICKSTART.md)
2. Check [README.md](./README.md) for features
3. Start logging studies!
4. Deploy to Vercel

## Getting Help

If installation fails:

1. **Check Node.js version**
   ```bash
   node --version
   ```

2. **Check npm version**
   ```bash
   npm --version
   ```

3. **Clear and retry**
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

4. **Check internet connection**
   - Slow downloads may cause timeouts

5. **Try different npm registry**
   ```bash
   npm config set registry https://registry.npmjs.org/
   npm install
   ```

---

**Installation successful? Amazing! Start building your study tracker! 🚀**
