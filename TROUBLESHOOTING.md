# 🔧 Troubleshooting Guide

Common issues and solutions for JEE Study Tracker.

## Installation Issues

### Problem: "npm command not found"

**Cause**: Node.js not installed or not in PATH

**Solutions**:
```bash
# 1. Check if Node is installed
node --version

# 2. If not, download from nodejs.org
# 3. Reinstall Node.js
# 4. Restart terminal/IDE
# 5. Try again: npm install
```

### Problem: "EACCES: permission denied"

**Cause**: Permission issues on Linux/Mac

**Solutions**:
```bash
# Option 1: Use sudo
sudo npm install

# Option 2: Fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH

# Option 3: Use nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
npm install
```

### Problem: "npm ERR! code ETIMEDOUT"

**Cause**: Network timeout, slow internet, or npm servers down

**Solutions**:
```bash
# 1. Clear npm cache
npm cache clean --force

# 2. Try again with longer timeout
npm install --timeout=60000

# 3. Use different registry
npm config set registry https://registry.npmjs.org/
npm install

# 4. Check internet connection
ping google.com

# 5. Wait and retry
# npm servers might be down temporarily
```

### Problem: "Module not found" errors after install

**Cause**: Incomplete installation or corrupted node_modules

**Solutions**:
```bash
# 1. Delete and reinstall
rm -rf node_modules package-lock.json
npm install

# 2. On Windows
rmdir /s node_modules
del package-lock.json
npm install

# 3. Use npm ci (for reproducible installs)
npm ci

# 4. Check package.json isn't corrupted
cat package.json  # Should be valid JSON
```

---

## Development Server Issues

### Problem: "Port 3000 already in use"

**Cause**: Another app using port 3000

**Solutions**:
```bash
# 1. Use different port
npm run dev -- -p 3001
# App runs on http://localhost:3001

# 2. Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -i :3000
kill -9 <PID>

# 3. Change next.config.ts
# Add: server: { port: 3001 }
```

### Problem: "ERR_MODULE_NOT_FOUND"

**Cause**: Missing dependency or wrong import path

**Solutions**:
```bash
# 1. Check import path uses @ alias
// Correct:
import { useStudyStore } from '@/store/useStudyStore'

// Wrong:
import { useStudyStore } from '../store/useStudyStore'

# 2. Reinstall dependencies
npm install

# 3. Restart dev server
# Kill and restart: npm run dev
```

### Problem: Dev server won't start

**Cause**: Various build issues

**Solutions**:
```bash
# 1. Check for errors
npm run build

# 2. Clear Next.js cache
rm -rf .next

# 3. Clear node_modules
rm -rf node_modules package-lock.json
npm install

# 4. Check Node version
node --version
# Should be 18.17.0 or higher

# 5. Kill all Node processes
# Mac/Linux: killall node
# Windows: taskkill /F /IM node.exe

# 6. Try again
npm run dev
```

---

## TypeScript & Build Issues

### Problem: "Type 'X' is not assignable to type 'Y'"

**Cause**: Type mismatch - code doesn't match type definitions

**Solutions**:
```bash
# 1. Check the error message carefully
# It tells you exactly what's wrong

# 2. Type explicitly
const value: number = parseInt(input);

# 3. Check tsconfig.json
# May have strict mode enabled

# 4. Disable strict checking (not recommended)
# Set "strict": false in tsconfig.json
```

### Problem: "Property 'X' does not exist on type"

**Cause**: Property name is wrong or object structure different

**Solutions**:
```ts
// Wrong:
study.physicss  // Typo!

// Correct:
study.physics

// Or check the type:
interface DailyStudy {
  physics: number;  // Property name
  // ...
}
```

### Problem: "Cannot find module"

**Cause**: Import path wrong or file doesn't exist

**Solutions**:
```bash
# 1. Check file exists
ls components/Dashboard.tsx  # Should exist

# 2. Check spelling and case
# JavaScript is case-sensitive!
// Wrong: Dashboard
// Correct: Dashboard (correct case)

# 3. Check @ alias in tsconfig.json
# Should have: "@/*": ["./*"]

# 4. Restart IDE/Dev server
```

### Problem: Build fails with errors

**Cause**: Syntax errors, type errors, or import issues

**Solutions**:
```bash
# 1. Read error message carefully
npm run build

# 2. Check TypeScript
npx tsc --noEmit

# 3. Check for syntax errors
node -c app/page.tsx

# 4. Try building components separately
# Comment out problematic sections

# 5. Clear cache and rebuild
rm -rf .next
npm run build
```

---

## Data & Storage Issues

### Problem: Data not persisting after refresh

**Cause**: LocalStorage disabled, private mode, or data cleared

**Solutions**:
```bash
# 1. Check if localStorage is enabled
# DevTools > Console:
localStorage.setItem('test', 'value')
console.log(localStorage.getItem('test'))
# Should print: value

# 2. Not in private/incognito mode?
# Open in normal window and try

# 3. Browser storage full?
# Clear some space:
localStorage.clear()
# ⚠️ Deletes all data!

# 4. Check storage quota
navigator.storage.estimate()

# 5. Browser blocks storage?
# Check security settings
# Allow cookies and storage for site
```

### Problem: Backup file won't import

**Cause**: File format wrong or corrupted

**Solutions**:
```bash
# 1. Check it's a valid JSON file
# Open in text editor - should look like:
{
  "version": "1.0.0",
  "exportDate": "...",
  "data": {...}
}

# 2. Try with different browser
# Some browsers have stricter rules

# 3. Export and try again
# Maybe previous export was corrupted

# 4. Manually edit JSON (advanced)
# Fix any syntax errors
# Must be valid JSON

# 5. Ask for fresh backup
# User can export again
```

### Problem: "Storage quota exceeded"

**Cause**: Too much data in localStorage

**Solutions**:
```bash
# 1. Export and clear old data
# Use Backup & Restore feature
# Delete old study entries

# 2. Clear old mocks
# Keep only recent mocks

# 3. Clear error logs
# Delete old entries

# 4. Switch browser/device
# Use fresh storage

# 5. Export to file and reset
# Use JSON backup for safety
```

---

## UI/UX Issues

### Problem: Dark mode not working

**Cause**: Theme toggle not triggering properly

**Solutions**:
```bash
# 1. Hard refresh browser
# Ctrl+Shift+R (Windows)
# Cmd+Shift+R (Mac)

# 2. Clear browser cache
# Chrome > Settings > Clear browsing data
# Select: Cookies and cached images
# Click: Clear data

# 3. Check localStorage
localStorage.getItem('jee-study-tracker-dark-mode')
# Should return: true or false

# 4. Reset theme
localStorage.removeItem('jee-study-tracker-dark-mode')
# Refresh page

# 5. Check system preference
# Some browsers sync with system theme
```

### Problem: Charts not displaying

**Cause**: No data, data format wrong, or Recharts issue

**Solutions**:
```bash
# 1. Add some study data first
# Charts need data to display

# 2. Check browser console
# F12 > Console tab
# Look for red error messages

# 3. Try adding mock scores
# Mock chart appears after adding scores

# 4. Refresh page
# Sometimes DOM needs refresh

# 5. Check if Recharts installed
npm list recharts
# Should show version
```

### Problem: Buttons not responding

**Cause**: JavaScript issues or CSS problems

**Solutions**:
```bash
# 1. Hard refresh
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)

# 2. Check console for errors
F12 > Console
# Look for red errors

# 3. Check network
F12 > Network
# All resources loaded?

# 4. Try different browser
# Rule out browser-specific issue

# 5. Clear site data
# Settings > Privacy > Clear data
```

### Problem: Responsive design broken on mobile

**Cause**: CSS or viewport issues

**Solutions**:
```bash
# 1. Check viewport meta tag
# In app/layout.tsx should have:
<meta name="viewport" content="width=device-width, initial-scale=1" />

# 2. Test with DevTools
# F12 > Toggle device toolbar
# Test different screen sizes

# 3. Check Tailwind config
# Should have: darkMode: 'class'

# 4. Clear mobile cache
# Site Settings > Clear site data

# 5. Try different mobile browser
```

---

## Performance Issues

### Problem: App loads slowly

**Cause**: Large bundle, network slow, or rendering issues

**Solutions**:
```bash
# 1. Check network speed
# DevTools > Network
# See how long files take

# 2. Check Core Web Vitals
# DevTools > Lighthouse > Performance

# 3. Check bundle size
npm run build
du -sh .next/

# 4. Measure performance
# DevTools > Performance tab
# Record and analyze

# 5. Clear browser cache
# Fresh load shows true speed
```

### Problem: Animations choppy/laggy

**Cause**: Too many animations, slow device, or GPU issues

**Solutions**:
```bash
# 1. Disable some animations
# Edit component @whileHover
# Remove animation={...}

# 2. Check DevTools Performance
# Record animation
# Look for dropped frames

# 3. Check device performance
# Close other apps
# Free up memory

# 4. Update browser
# Old browsers have worse animation support

# 5. Reduce animation complexity
# Use simpler transitions
# duration: 0.2 instead of 0.5
```

### Problem: Memory leak or lag

**Cause**: Infinite loops, event listeners not removed, or render loops

**Solutions**:
```bash
# 1. Check DevTools Memory tab
# Take heap snapshot
# Look for growing objects

# 2. Check for useEffect issues
# Missing dependencies?
// Wrong:
useEffect(() => {
  setInterval(() => {...}, 1000)
}, [])  // No cleanup!

// Correct:
useEffect(() => {
  const id = setInterval(() => {...}, 1000)
  return () => clearInterval(id)  // Cleanup!
}, [])

# 3. Close and reopen browser
# See if issue persists

# 4. Check for event listener leaks
# Each component add listener?
# Must remove on unmount
```

---

## Deployment Issues

### Problem: App won't build

**Cause**: Various build errors

**Solutions**:
```bash
# 1. Check for errors locally first
npm run build

# 2. Read error message
# It tells exactly what's wrong

# 3. Fix TypeScript errors
npx tsc --noEmit

# 4. Clear cache
rm -rf .next node_modules
npm install
npm run build

# 5. Check vercel logs
# Vercel dashboard > Deployments > Logs
```

### Problem: Vercel deployment fails

**Cause**: Configuration, environment, or build issues

**Solutions**:
```bash
# 1. Check Vercel logs
# Project > Deployments > [Latest] > Logs
# Read error message

# 2. Ensure .env.local not in git
cat .gitignore
# Should have: .env.local

# 3. Push latest code
git add .
git commit -m "Fix deployment issue"
git push origin main
# Vercel auto-redeploys

# 4. Check vercel.json
cat vercel.json
# Should be valid JSON

# 5. Redeploy manually
# Vercel Dashboard > Deployments > ... > Redeploy
```

### Problem: Built app won't start

**Cause**: Build successful but runtime error

**Solutions**:
```bash
# 1. Test locally first
npm run build
npm start
# Visit http://localhost:3000

# 2. Check production mode
NODE_ENV=production npm start

# 3. Check for console errors
# Browser DevTools > Console
# F12

# 4. Check Vercel logs
# See what crashed

# 5. Rebuild and redeploy
# Code might be stale
```

---

## Common General Issues

### Problem: "Not found" on page refresh

**Cause**: Client-side routing not configured

**Solutions**:
```bash
# 1. Check server-side rendering
# Next.js App Router should handle this

# 2. Check vercel.json rewrites
# May need to configure

# 3. Update vercel.json:
{
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/index.html"
    }
  ]
}

# 4. Try Netlify instead
# Better default support
```

### Problem: Styles not loading

**Cause**: Tailwind CSS not compiled

**Solutions**:
```bash
# 1. Restart dev server
# Ctrl+C then npm run dev

# 2. Check tailwind.config.ts
# Should have content paths

# 3. Check globals.css
# Should have tailwind directives:
// @tailwind base;
// @tailwind components;
// @tailwind utilities;

# 4. Rebuild Tailwind
npm run build

# 5. Clear .next folder
rm -rf .next
npm run dev
```

### Problem: "Error: Cannot find module X"

**Cause**: File doesn't exist or path wrong

**Solutions**:
```bash
# 1. Check file exists
ls components/Dashboard.tsx

# 2. Check import path
// Check for typos
import { Dashboard } from '@/components/Dashboard'

# 3. Check file exported properly
// In file:
export const Dashboard = () => {...}

# 4. Restart dev server
# Kill npm run dev
# npm run dev again

# 5. Check TypeScript errors
npx tsc --noEmit
```

---

## When All Else Fails

### Nuclear Option: Fresh Start

```bash
# 1. Backup your data
# Use Backup & Restore to export JSON

# 2. Delete everything
rm -rf node_modules .next package-lock.json

# 3. Reinstall
npm install

# 4. Rebuild
npm run build

# 5. Test
npm run dev

# 6. Restore data
# Import from JSON backup
```

### Ask for Help

```
When posting issues online, include:
- What you did
- What happened
- What you expected
- Error messages (copy-paste)
- Your environment:
  Node version
  npm version
  Browser
  OS
- Steps to reproduce
```

---

## Useful Debug Commands

```bash
# Check Node version
node --version

# Check npm version  
npm --version

# Check installed packages
npm list

# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit

# Check TypeScript
npx tsc --noEmit

# Check build
npm run build

# Check linting
npm run lint

# Clear all caches
npm cache clean --force
rm -rf node_modules .next
npm install

# Find process on port
# Mac/Linux:
lsof -i :3000
# Windows:
netstat -ano | findstr :3000

# Kill process
# Mac/Linux:
kill -9 <PID>
# Windows:
taskkill /PID <PID> /F
```

---

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Zustand**: https://github.com/pmndrs/zustand
- **Framer Motion**: https://www.framer.com/motion

---

**Still stuck? Check the documentation files or refer to specific feature guides for more help!**

Good luck! 🚀
