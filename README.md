# 📚 JEE Study Tracker

A **production-ready**, **fully responsive** web application for tracking JEE 2027 preparation. Built with modern technologies and designed for maximum productivity.

## ✨ Features

### Core Features
- 📊 **Dashboard** - Real-time study metrics and performance analytics
- 📝 **Daily Study Entry** - Log hours for Physics, Maths, Chemistry, and more
- 📅 **Weekly Routine** - Plan and manage your weekly study schedule
- 🎯 **Mock Tracker** - Track mock exam scores and performance trends
- 📈 **Analytics** - Visual insights with interactive charts
- 🐛 **Error Log** - Document and track mistakes and doubts
- 💾 **Backup & Restore** - Export/Import your data for portability

### Advanced Features
- ✅ **Automatic Metrics Calculation**
  - Daily, weekly, and monthly study hours
  - Current streak counter with achievement badges
  - Productivity rating (Low/Strong/Elite)
  - Weakest subject auto-detection
  - Problems solved tracking

- 🎨 **Modern UI/UX**
  - Glassmorphism design with smooth animations
  - Dark/Light mode with theme persistence
  - Fully responsive (mobile, tablet, desktop)
  - Snackbar-based navigation system
  - Smooth section transitions

- 💾 **Data Management**
  - Automatic LocalStorage persistence
  - No external database required
  - One-click data backup/restore
  - Data reset with confirmation

- 🚀 **Performance**
  - Optimized bundle size
  - Fast load times
  - Smooth animations
  - No console errors
  - SEO-friendly

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | App Router with TypeScript |
| **React 18** | UI component framework |
| **TypeScript** | Type safety and developer experience |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Smooth animations and transitions |
| **Zustand** | Lightweight state management |
| **Recharts** | Interactive data visualization |
| **Lucide React** | Modern icon library |
| **UUID** | Unique ID generation |

## 📋 Prerequisites

- **Node.js**: v18.17.0 or higher
- **npm**: v9+ or **yarn** v3+

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd jee-study-tracker
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

## 📁 Project Structure

```
jee-study-tracker/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global Tailwind styles
├── components/
│   ├── MainLayout.tsx      # Main container with theme toggle
│   ├── SnackbarNavigation.tsx # Bottom navigation bar
│   ├── Dashboard.tsx       # Dashboard section
│   ├── DailyStudyEntry.tsx # Daily study logging
│   ├── WeeklyRoutine.tsx   # Weekly schedule planning
│   ├── MockTracker.tsx     # Mock exam tracking
│   ├── Analytics.tsx       # Data visualization
│   ├── ErrorLog.tsx        # Error/doubt logging
│   └── BackupRestore.tsx   # Data management
├── store/
│   └── useStudyStore.ts    # Zustand state management
├── hooks/
│   └── index.ts            # Custom React hooks
├── types/
│   └── index.ts            # TypeScript type definitions
├── utils/
│   ├── calculations.ts     # Business logic and calculations
│   └── cn.ts               # Utility functions
├── public/                 # Static assets
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── postcss.config.mjs      # PostCSS configuration
├── package.json            # Dependencies and scripts
└── .gitignore              # Git ignore rules
```

## 🎯 Using the Application

### Dashboard
- View your study statistics
- Monitor productivity rating
- Track current study streak
- Identify weakest subject
- See warning alerts for low activity

### Daily Study Entry
- Log study hours for each subject
- Track problems solved
- Real-time total hours calculation
- Auto-save validation
- Success notifications

### Weekly Routine
- Plan study hours for each day
- Set subject-specific targets
- View daily and weekly totals
- Editable routine planning

### Mock Tracker
- Add mock exam scores (/300)
- View score percentage and rating
- See average score
- Track performance trends
- Interactive mock history

### Analytics
- 7-day study hour trend (line chart)
- Subject distribution (bar chart)
- Mock score progression (line chart)
- Subject statistics

### Error Log
- Document mistakes and doubts
- Auto-date tagging
- Easy deletion
- Rich text support

### Backup & Restore
- Export data as JSON
- Import from backup files
- Complete data reset
- Cross-device data transfer

## 🔧 Configuration

### Theme Preferences
- Automatically detects system preference
- Toggle between dark/light mode
- Persists theme choice

### Local Storage
All data is automatically saved to browser's LocalStorage:
- Study entries
- Routine plans
- Mock scores
- Error logs
- Theme preference

## 📊 Data Format

The application stores data in JSON format when exported:

```json
{
  "version": "1.0.0",
  "exportDate": "2024-12-31T12:00:00.000Z",
  "data": {
    "dailyStudies": [],
    "weeklyRoutine": {},
    "mockScores": [],
    "errorLogs": [],
    "lastUpdated": 1234567890
  }
}
```

## 🚀 Deployment on Vercel

### Automatic Deployment

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

### Manual Deployment

```bash
# Using Vercel CLI
npm i -g vercel
vercel
```

Follow the prompts to deploy. No environment variables are required!

### Post-Deployment
- Your app will be live at `https://your-project.vercel.app`
- Automatic deployments on every push to main branch
- Preview deployments for pull requests

## 📱 Mobile Optimization

- Fully responsive design
- Touch-friendly navigation
- Optimized for mobile screens
- Bottom navigation snackbar stays visible
- Proper spacing and padding on small screens

## ♿ Accessibility

- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- High contrast colors
- Clear focus indicators

## 🎨 Customization

### Change Color Scheme
Edit `tailwind.config.ts` or `app/globals.css`:

```ts
// Update primary color
colors: {
  primary: '#your-color',
  secondary: '#your-color',
}
```

### Add New Section
1. Create component in `components/` folder
2. Add navigation item in `SnackbarNavigation.tsx`
3. Add route in `MainLayout.tsx` switch statement
4. Add type to `types/index.ts`

### Modify Calculations
Edit functions in `utils/calculations.ts` to change:
- Productivity rating thresholds
- Streak calculation logic
- Performance metrics

## 🐛 Troubleshooting

### Data Not Persisting
- Check browser's LocalStorage is enabled
- Ensure not in private/incognito mode
- Clear browser cache and try again

### Charts Not Showing
- Ensure you have study data logged
- Check browser console for errors
- Try refreshing the page

### Theme Not Applying
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache
- Check system theme preference

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm install
npm run build
```

## 📈 Performance Tips

1. Regular backups - Use export feature weekly
2. Consistent logging - Log daily for accurate metrics
3. Mobile-friendly - Use on any device
4. No sync delays - All changes instant

## 🔐 Privacy & Security

- ✅ **No server required** - Everything runs locally
- ✅ **No data transmission** - Data stays in your browser
- ✅ **No tracking** - No analytics or telemetry
- ✅ **No external APIs** - Complete offline capable
- ✅ **Your data** - Full control with export/import

## 📝 License

MIT License - Free to use and modify

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Verify your Node.js version
3. Ensure all dependencies are installed
4. Clear browser cache and try again

## 🎉 Getting Started Checklist

- [x] Install Node.js v18+
- [x] Clone repository
- [x] Run `npm install`
- [x] Run `npm run dev`
- [x] Open `http://localhost:3000`
- [x] Start logging your studies!

---

**Happy Studying! 📚✨**

Build with passion. Track with precision. Achieve excellence.
