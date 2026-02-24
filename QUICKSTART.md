# 🚀 Quick Start Guide

Get your JEE Study Tracker running in 5 minutes!

## Step 1: Prerequisites Check
Ensure you have Node.js v18+ installed:
```bash
node --version
npm --version
```

## Step 2: Install & Run (Development)
```bash
# Navigate to project directory
cd jee-study-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Your app is now running at `http://localhost:3000` 🎉

## Step 3: Start Using
1. Open the app in your browser
2. Click the **Dashboard** icon to see metrics
3. Click the **Study Entry** icon to log hours
4. Click the **Backup** icon to backup your data
5. Toggle **Dark/Light Mode** with the button in the header

## Step 4: Deploy to Vercel (Free)

### Option A: Using Vercel CLI
```bash
npm i -g vercel
vercel
# Follow the prompts
```

### Option B: Using GitHub (Recommended)
1. Push your code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Click "Deploy"
6. Your app goes live instantly! ✨

## Key Features Quick Tour

| Section | What It Does |
|---------|-------------|
| 🏠 **Dashboard** | See all your metrics at a glance |
| 📝 **Study Entry** | Log today's study hours |
| 📅 **Routine** | Plan your weekly schedule |
| 🎯 **Mocks** | Track mock exam scores |
| 📊 **Analytics** | Visual charts and trends |
| 🐛 **Error Log** | Document mistakes |
| 💾 **Backup** | Save/restore your data |

## Dark Mode
Click the **Sun/Moon icon** in the top-right to toggle themes. Your choice is saved!

## Data Backup
1. Go to **Backup & Restore** section
2. Click **Export as JSON** to download backup
3. Keep backup files safe for future use
4. Use **Import from JSON** to restore anytime

## Troubleshooting

### App won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Data not saving
- Check if localStorage is enabled in browser
- Not in private/incognito mode?
- Clear browser cache and reload

## Next Steps

1. ✅ Add your first study entry
2. ✅ Set up your weekly routine
3. ✅ Log mocks when you take them
4. ✅ Check analytics for insights
5. ✅ Export backup regularly

## Deployment Success Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] App deployed successfully
- [ ] Can access at vercel URL
- [ ] Dark mode works
- [ ] Can save study entries
- [ ] Can export data

## Getting Help

1. Check browser console for errors (F12)
2. Try hard refresh (Ctrl+Shift+R)
3. Clear browser cache
4. Read the full README.md

---

**You're all set! Start tracking your studies and ace the JEE! 📚💪**
