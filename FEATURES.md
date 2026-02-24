# 📚 Complete Features Guide

Deep dive into every feature of the JEE Study Tracker.

## Table of Contents
1. [Dashboard](#dashboard)
2. [Daily Study Entry](#daily-study-entry)
3. [Weekly Routine](#weekly-routine)
4. [Mock Tracker](#mock-tracker)
5. [Analytics](#analytics)
6. [Error Log](#error-log)
7. [Backup & Restore](#backup--restore)
8. [Settings](#settings)

---

## 🏠 Dashboard

The nerve center of your study tracking. See everything at a glance.

### Metrics Displayed

#### 1. Today's Hours
- **Shows**: Total study hours logged today
- **Calculation**: Physics + Maths + Chemistry + Recovery + Revision
- **Updates**: Immediately when you save entries
- **Purpose**: Quick check on daily progress

#### 2. Weekly Hours
- **Shows**: Total hours from last 7 days
- **Calculation**: Sum of all daily entries from past 7 days
- **Updates**: Every time you log hours
- **Purpose**: Track consistency

#### 3. Monthly Hours
- **Shows**: Total hours from last 30 days
- **Calculation**: Sum of all daily entries from past 30 days
- **Updates**: Automatically tracked
- **Purpose**: Long-term progress indicator

#### 4. Current Streak
- **Shows**: Consecutive days with non-zero hours logged
- **Calculation**: Counts days backward until a day with 0 hours
- **Breaks On**: A day with 0 hours logged
- **Achievement**: 🏆 Badge at 7+ day streak
- **Purpose**: Motivation and consistency

#### 5. Productivity Rating
Shows your productivity level based on weekly data:

**Elite Status** 👑
- Weekly hours: 55+
- Problems solved: 600+
- Rare achievement - maintain this!

**Strong Status** ⚡
- Weekly hours: 45-54
- Solid progress
- Aim for Elite next

**Low Status** 📈
- Weekly hours: <45
- Room for improvement
- Increase hours next week

#### 6. Problems Solved
- **Shows**: Total problems solved this week
- **Calculation**: Sum of "Problems Solved" entries from last 7 days
- **Updates**: Every time you log problems
- **Purpose**: Track problem-solving practice

#### 7. Weakest Subject
- **Shows**: Which subject has lowest hours in last 7 days
- **Calculation**: Physics vs Maths vs Chemistry
- **Updates**: Each time you log study
- **Purpose**: Identify focus area

#### 8. Warning Alerts
**Red Alert for Low Productivity**
- Triggers: 3+ consecutive days with 0 hours
- Action: Increase study hours urgently
- Message: Clear warning displayed

### Dashboard Calculation Examples

**Example 1: Streak Calculation**
```
Today (Dec 10):    5 hours ✓
Yesterday (Dec 9): 3 hours ✓
Dec 8:             4 hours ✓
Dec 7:             0 hours ✗ BREAKS AT THIS POINT
Streak: 3 days
```

**Example 2: Productivity Rating**
```
Weekly hours: 55+
Problems solved: 600+
Rating: Elite! 👑
```

**Example 3: Weakest Subject**
```
Physics:   8 hours
Maths:     12 hours
Chemistry: 5 hours ← LOWEST
Weakest Subject: Chemistry
```

---

## 📝 Daily Study Entry

Log your daily study activities with precision.

### Fields to Log

#### 1. Physics Hours
- **Input**: Decimal numbers (0.5, 1.5, 3.25, etc.)
- **Range**: 0 to 24
- **Purpose**: Track physics study time
- **Min Unit**: 0.5 hour = 30 minutes

#### 2. Maths Hours
- **Input**: Decimal numbers
- **Range**: 0 to 24
- **Purpose**: Track maths study time
- **Subjects Covered**: Algebra, Trigonometry, Calculus

#### 3. Chemistry Hours
- **Input**: Decimal numbers
- **Range**: 0 to 24
- **Purpose**: Track chemistry study time
- **Subjects Covered**: Physical, Organic, Inorganic

#### 4. 11th Recovery Hours
- **Input**: Decimal numbers
- **Range**: 0 to 24
- **Purpose**: Revise 11th standard concepts
- **Why Important**: Strengthen foundations

#### 5. Revision/Test Hours
- **Input**: Decimal numbers
- **Range**: 0 to 24
- **Purpose**: Time spent revising or taking tests
- **Activity Types**: Full-length tests, chapter tests, revision

#### 6. Problems Solved
- **Input**: Integer numbers (no decimals)
- **Range**: 0 to unlimited
- **Purpose**: Quantify practice problems completed
- **Tracking**: Automatically included in analytics

### How to Use

1. Click **Study Entry** icon in bottom navigation
2. Current date auto-fills
3. Enter hours for each subject
4. Enter problems solved
5. Click **"Save Entry"**
6. See confirmation message
7. Data auto-saves to browser

### Validation

The app validates:
- ✅ No negative values
- ✅ Values ≤ 24 hours per subject
- ✅ All fields numerical
- ❌ Shows error if any validation fails

### Auto-Save Features

1. **LocalStorage Persistence**
   - Entry saved immediately to browser
   - Survives browser restart
   - No internet required

2. **Conflict Resolution**
   - If entry exists for date, it updates
   - Prevents duplicate entries
   - Last saved version is latest

3. **Backup Integration**
   - Entry included in exports
   - Can restore from backup

### Entry Examples

**Light Study Day**
```
Physics:    2 hours
Maths:      2 hours
Chemistry:  1.5 hours
Recovery:   0 hours
Revision:   0.5 hours
Problems:   10
Total:      6 hours
```

**Heavy Study Day**
```
Physics:    4 hours
Maths:      4 hours
Chemistry:  3 hours
Recovery:   1 hour
Revision:   2 hours
Problems:   50
Total:      14 hours
```

---

## 📅 Weekly Routine

Plan and structure your week strategically.

### Routine Structure

Pre-populated with defaults:
```
Monday to Friday: 12 hours/day
Saturday:        14 hours/day  (extra prep)
Sunday:          11 hours/day  (lighter)
```

### Subject Distribution

For each day, plan hours:
- Physics
- Maths
- Chemistry
- 11th Recovery
- Revision/Test

### How to Customize

1. Click **Routine** icon
2. Select a day (e.g., Monday)
3. Adjust hours for each subject
4. Watch total update automatically
5. Repeat for each day
6. Click **"Save Routine"**

### Calculation Example

**Monday Plan**
```
Physics:    3 hours
Maths:      3 hours  
Chemistry:  2 hours
Recovery:   1 hour
Revision:   1 hour
━━━━━━━━━━━━━━━━━━━
Daily Total: 10 hours
```

### Weekly Total

App automatically calculates:
```
Mon-Fri: 50 hours
Sat:     14 hours
Sun:     11 hours
━━━━━━━━━━━━━━━
Total:   75 hours/week
```

### Best Practices

1. **Balance subjects** - Don't allocate too little to weak subject
2. **Account for breaks** - 14 hours includes breaks
3. **Be realistic** - Can you maintain this consistently?
4. **Adjust weekly** - Update based on performance
5. **Use for accountability** - Check against routine daily

---

## 🎯 Mock Tracker

Track your mock exam performance over time.

### Adding a Score

1. Click **Mocks** icon
2. Select date of mock
3. Enter score (0-300)
4. Click **"Add"**
5. See score added to history

### Score Display

Each mock shows:
- **Percentage**: Automatically calculated
- **Color Code**:
  - 🟢 Green: ≥85% (Excellent)
  - 🔵 Blue: 75-84% (Very Good)
  - 🟡 Yellow: 65-74% (Good)
  - 🟠 Orange: 50-64% (Average)
  - 🔴 Red: <50% (Needs Improvement)

### Analytics Included

**Average Score**
- Total: Sum of all mock scores
- Average: Sum ÷ Number of mocks
- Updates: With each new mock

**Percentage Ranking**
- Shows% score out of 300
- Helps compare with peers
- Track improvement

### Mock History Table

Shows all mocks in reverse chronological order:
- Date taken
- Score (/300)
- Percentage
- Color-coded rating bar
- Latest first

### Tracking Examples

**Mock Event 1: Nov 15**
```
Score: 180/300
Percentage: 60%
Rating: Average 🟠
Rank: Below target
Action: Increase practice
```

**Mock Event 2: Nov 22**
```
Score: 210/300
Percentage: 70%
Rating: Good 🟡
Rank: Improved 10%
Action: Keep momentum
```

**Mock Event 3: Nov 29**
```
Score: 255/300
Percentage: 85%
Rating: Excellent 🟢
Rank: Improved 15%
Action: Maintain form
```

### Performance Trends

The app shows:
- Upward trend: 📈 Getting better
- Flat trend: → Plateaued
- Downward trend: 📉 Need change

---

## 📊 Analytics

Visualize your study data with interactive charts.

### 1. Last 7 Days Study Hours (Line Chart)

**What it shows**: Daily study hours trend

**How to read**:
- X-axis: Last 7 days (Dec 3, Dec 4, etc.)
- Y-axis: Hours (0-16)
- Line: Connects daily totals

**Insights**:
- Flat line: Consistent studying ✓
- Spikes: Heavy study days
- Dips: Light days or rest days

### 2. Subject Distribution (Bar Chart)

**What it shows**: Time spent on each subject in last 7 days

**How to read**:
- Bars: Physics, Maths, Chemistry
- Height: Total hours for that subject
- Pattern: Reveals imbalance

**Interpretation**:
```
Physics:   8 hours  ████
Maths:    12 hours  ██████
Chemistry: 5 hours  ███
```

Maths is highest. Chemistry needs boost.

### 3. Mock Score Progression (Line Chart)

**What it shows**: Mock scores over time

**How to read**:
- X-axis: Mock test dates
- Y-axis: Scores (0-300)
- Line: Score trajectory
- Shows: Up to 10 recent mocks

**Analysis**:
- Upward slope: → Improving! 📈
- Plateau: Need new strategy
- Downward: Take break then resume
- High volatility: Inconsistent prep

### Subject Statistics Cards

Shows in last 7 days:
- **Physics**: Total hours
- **Maths**: Total hours
- **Chemistry**: Total hours

Click cards for breakdown by day.

### Using Analytics for Planning

**In 7 days, 32 hours tracked**
```
Avg per day: 4.6 hours
Subject focus: Maths (38%)
Weakest: Chemistry (16%)
Action: Increase chemistry study
```

---

## 🐛 Error Log

Document your mistakes and doubts for future reference.

### Using Error Log

1. Click **Error Log** icon
2. Write description of error/doubt in textarea
3. Click **"Save Entry"**
4. Entry auto-dated with today's date
5. Appears in recent entries list

### Entry Features

**Auto Fields**:
- Date: Auto-filled with current date
- Timestamp: Microsecond precision
- ID: Unique identifier

**Your Input**:
- Description: Rich text (multiline)
- Examples: Solutions, explanations, notes

### Entry Management

**View All Entries**:
- Shows in reverse chronological order
- Latest entries first
- Formatted with date and content

**Delete Entry**:
- Hover over entry
- Click trash icon
- Entry removed permanently
- No undo (be careful!)

### Entry Examples

**Error 1: Trigonometry Mistake**
```
Date: Nov 15, 2024
Content: Made mistake in sin(2x) formula.
The correct formula is sin(2x) = 2sin(x)cos(x).
I kept writing it as sin(x)² + cos(x)².
Practice this formula 20 times.
Entry count: 1/45
```

**Error 2: Algebra Concept**
```
Date: Nov 15, 2024
Content: Don't understand why (a+b)³ = a³+3a²b+3ab²+b³.
Need to derive it step-by-step.
Assignment for today: Derive 5 algebraic expansions.
Entry count: 2/45
```

### Best Practices

1. **Be specific**: Not "made mistake" but "made this specific mistake"
2. **Add solution**: Include correct approach
3. **Mark for review**: Flag important ones
4. **Use for revision**: Review error logs weekly
5. **Track improvements**: Mark as solved

### Error Log Statistics

Shows total entries logged:
```
Total Entries: 45
This week: 12
Today: 3
Categories: Algebra, Geometry, Chemistry
```

---

## 💾 Backup & Restore

Safeguard your data and transfer across devices.

### Export Backup

**How to Export**:
1. Click **Backup** icon
2. Click **"Export as JSON"**
3. File downloads: `jee-study-backup-YYYY-MM-DD.json`
4. Save in safe location

**What's Included**:
- All study entries
- Weekly routine
- Mock scores
- Error logs
- Metadata (export date, version)

**Export Example**:
```json
{
  "version": "1.0.0",
  "exportDate": "2024-12-31T12:00:00.000Z",
  "data": {
    "dailyStudies": [
      {
        "date": "2024-12-31",
        "physics": 3,
        "maths": 4,
        "chemistry": 2,
        "recovery": 1,
        "revision": 1,
        "problemsSolved": 25
      }
    ],
    "weeklyRoutine": {...},
    "mockScores": [
      {"date": "2024-12-22", "score": 210}
    ],
    "errorLogs": [...]
  }
}
```

### Import Backup

**How to Import**:
1. Click **Backup** icon
2. Click **"Import from JSON"**
3. Select a `.json` backup file
4. Confirm import
5. Page refreshes with imported data

**Requirements**:
- File must be valid JSON
- Must be from JEE tracker export
- Must have correct structure

### Data Reset

**⚠️ WARNING**: This is irreversible!

**How to Reset**:
1. Click **Backup** icon
2. Click **"Reset All Data"**
3. Confirm with "Yes, Reset Everything"
4. All data deleted
5. Defaults restored
6. App refreshes

**Restore Checklist Before Reset**:
- [x] Exported latest backup?
- [x] Backup file saved somewhere safe?
- [x] Really want to delete everything?
- [x] Have email backup too?

### Backup Strategy

**Daily**:
1. Before bed, export backup
2. Save with that day's date
3. Store in cloud (Google Drive, OneDrive)

**Weekly**:
1. Export full backup
2. Save with week number
3. Keep for 4 weeks

**Monthly**:
1. Export full backup with month
2. Archive offline
3. Keep for 1 year

### Cloud Storage Options

- **Google Drive**: Unlimited space (free)
- **OneDrive**: 5GB free
- **Dropbox**: 2GB free
- **iCloud**: 5GB free
- **GitHub**: Store in private repo

### Recovery Scenarios

**Scenario 1: Device died**
```
1. Get backup from cloud
2. Open app on new device
3. Import from JSON
4. Continue from where you left off!
```

**Scenario 2: Accidentally reset**
```
1. Stop! Don't close browser
2. Open backup file you saved
3. Import immediately
4. All data restored
```

**Scenario 3: Switch to new computer**
```
1. Download backup from cloud
2. Open app on new computer
3. Import from JSON
4. Keep studying!
```

---

## ⚙️ Settings & Theme

Control app appearance and preferences.

### Dark Mode / Light Mode

**Toggle Theme**:
1. Click **Sun/Moon icon** in top-right
2. Theme switches instantly
3. Preference auto-saves

**What Changes**:
- Background colors
- Text colors
- Card colors
- Chart colors
- Border colors

**System Preference**:
- First visit: Uses your system setting
- If you toggle: Uses your choice
- Saves for next visit

**Scheduling**:
- Currently: Manual toggle
- Future: Option for `follow system`

### Color Scheme Details

**Light Mode**:
- Background: Soft white to light gray
- Text: Dark gray to black
- Cards: White with subtle shadows
- Accents: Blue and purple gradients

**Dark Mode**:
- Background: Dark gray to charcoal
- Text: Light gray to white
- Cards: Dark with glow effect
- Accents: Blue and purple gleams

### Responsive Design

App works on all devices:

**Desktop**
- Full-width layout
- Multi-column grids
- Large charts
- 2-3 sections per row

**Tablet**
- 2-column layout
- Adjusted spacing
- Touch-friendly buttons
- Readabletext size

**Mobile**
- Single column
- Full-width components
- Large tap targets
- Vertical snackbar scrolling

---

## Keyboard Shortcuts (Future)

Planned shortcuts:
- `S`: Go to Study Entry
- `D`: Go to Dashboard
- `A`: Go to Analytics
- `E`: Go to Error Log
- `T`: Toggle theme

---

## 🔔 Notifications

Automatic alerts for important events:

### Success Notifications
```
✅ Study entry saved successfully!
✅ Weekly routine updated!
✅ Mock score added!
✅ Backup exported!
```

### Warning Alerts
```
⚠️ Low activity in last 3 days!
⚠️ Weak in Chemistry - increase hours!
⚠️ Mock score below 50%!
```

### Error Notifications
```
❌ Please enter a valid score!
❌ Failed to import backup!
❌ Negative values not allowed!
```

---

## Data Privacy & Storage

### Where Your Data Lives
- ✅ Your browser's LocalStorage
- ✅ Your computer's memory
- ✅ Backup files in your downloads
- ❌ NOT on any server
- ❌ NOT shared online
- ❌ NOT sold or tracked

### What Data You Own
- 100% ownership of all your study data
- Free to download anytime
- Free to delete anytime
- Free to transfer anytime
- Free to backup anywhere

---

**Master every feature and ace your JEE preparation! 📚✨**
