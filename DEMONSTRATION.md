# RER Time Sheet Calculator - System Demonstration

## Overview
This document demonstrates the RER Time Sheet Calculator system functionality.

## Test Scenarios and Results

### Scenario 1: Single Day Entry
**Input:**
- Date: February 5, 2026
- Day: Wednesday (auto-populated)
- Start Time: 09:00
- End Time: 17:00
- Job Site: "Construction Site A"
- Scope of Work: "Foundation work and concrete pouring"

**Calculation:**
- Total time: 17:00 - 09:00 = 8 hours (480 minutes)
- Break deduction: 30 minutes
- Net hours: 480 - 30 = 450 minutes = 7.50 hours

**Expected Result:** Entry shows 7.50 hrs in the table

### Scenario 2: Multiple Entries in Same Week
**Entries:**
1. Monday, Feb 3: 08:00 - 16:00 = 7.50 hrs
2. Tuesday, Feb 4: 08:00 - 17:00 = 8.50 hrs
3. Wednesday, Feb 5: 09:00 - 17:00 = 7.50 hrs

**Weekly Total Calculation:**
- Week starts: Monday, February 2, 2026
- Total hours: 7.50 + 8.50 + 7.50 = 23.50 hours

**Expected Result:** "Week of 2026-02-02: 23.50 hours total"

### Scenario 3: Multiple Weeks
**Week 1 (Feb 2-8):**
- Monday: 7.50 hrs
- Tuesday: 8.50 hrs
- Wednesday: 7.50 hrs
- Total: 23.50 hrs

**Week 2 (Feb 9-15):**
- Monday: 8.00 hrs
- Tuesday: 8.00 hrs
- Total: 16.00 hrs

**Expected Result:**
- Week of 2026-02-09: 16.00 hours total
- Week of 2026-02-02: 23.50 hours total

### Scenario 4: Data Persistence
**Test:**
1. Add entry
2. Refresh browser
3. Verify entry still appears

**Expected Result:** All entries persist across page refreshes using localStorage

## Features Verified

✅ **Date Input**: Calendar picker for selecting work date
✅ **Auto Day Calculation**: Day of week automatically populates based on selected date
✅ **Time Entry**: Start and end time inputs with validation
✅ **Job Site Field**: Text input for location
✅ **Scope of Work**: Multi-line textarea for detailed work description
✅ **30-Minute Deduction**: Automatically applied to all entries
✅ **Hours Display**: Shows net hours in decimal format (7.50 = 7hrs 30min)
✅ **Weekly Grouping**: Entries grouped by week (Monday start)
✅ **Weekly Totals**: Automatic calculation and display
✅ **Delete Function**: Remove button for each entry
✅ **Data Storage**: LocalStorage persistence
✅ **Responsive Design**: Works on desktop and mobile devices

## Technical Implementation Notes

### Break Deduction Algorithm
```
totalMinutes = (endHour × 60 + endMin) - (startHour × 60 + startMin)
netMinutes = totalMinutes - 30
netHours = netMinutes / 60
displayHours = netHours.toFixed(2)
```

### Week Calculation
- Weeks start on Monday
- Week grouping uses ISO week date system
- Date is adjusted to find Monday of the week

### Storage Format
```javascript
{
  id: timestamp,
  workDate: "YYYY-MM-DD",
  weekDay: "Monday|Tuesday|...",
  clockIn: "HH:MM",
  clockOut: "HH:MM",
  location: "string",
  workDescription: "string",
  netHours: "decimal string"
}
```

## User Interface Elements

1. **Header**: Gradient background with "RER Weekly Time Sheet" title
2. **Entry Form**: Grid layout with labeled input fields
3. **Add Button**: Purple gradient button for submitting entries
4. **Records Table**: 
   - Columns: Date, Day, Start, End, Job Site, Scope, Hours, Action
   - Hover effects for better UX
   - Remove button in each row
5. **Weekly Display**: Pink gradient box showing weekly totals
6. **Responsive Layout**: Adapts to mobile devices

## Browser Compatibility
- Modern browsers with JavaScript enabled
- localStorage support required
- CSS Grid support required
- ES6 JavaScript support required

## Conclusion
The RER Time Sheet Calculator successfully implements all required features:
- User can log hours with all required fields
- 30 minutes automatically deducted from each work day
- Hours totaled per week
- Clean, user-friendly interface
- Data persistence across sessions
