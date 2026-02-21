# RER Time Sheet Calculator

A web-based time sheet logging system for tracking work hours with automatic break deductions and weekly totals.

## Features

- **Daily Entry Logging**: Record date, day of week, start time, end time, job site, and scope of work
- **Conditional Break Deduction**: 30 minutes automatically subtracted only from work days exceeding 4 hours
- **Scope of Work Dropdown**: Predefined options for consistent data entry (Grading, Excavation, R&R, Demolition-Machine, Demolition-ReUse)
- **Weekly Totals**: Automatically calculates and displays total hours per week
- **Data Persistence**: All entries are saved in browser local storage
- **Clean Interface**: Modern, responsive design that works on desktop and mobile

## How to Use

1. Open `index.html` in your web browser
2. Fill in the work entry form:
   - Select the work date
   - Day of week will auto-populate
   - Enter start and end times
   - Enter job site location
   - Select scope of work from dropdown
3. Click "Add Entry" to save
4. View your entries in the table below
5. Weekly totals are displayed at the top of the records section

## Break Deduction Logic

- **Work time ≤ 4 hours**: No break deduction (full time counted)
- **Work time > 4 hours**: 30-minute break deduction applied

Examples:
- 3 hours worked → 3.00 hours counted (no break)
- 4 hours worked → 4.00 hours counted (no break)
- 5 hours worked → 4.50 hours counted (30 min break)
- 8 hours worked → 7.50 hours counted (30 min break)

## Scope of Work Options

- Grading
- Excavation
- R&R
- Demolition-Machine
- Demolition-ReUse

## Technical Details

- **Weekly Grouping**: Weeks start on Monday and all entries are grouped accordingly
- **Hour Format**: Hours are displayed in decimal format (e.g., 7.50 hours = 7 hours 30 minutes)
- **Browser Storage**: Uses localStorage for data persistence

## Files

- `index.html` - Main application page
- `app.js` - Application logic and calculations
- `styles.css` - Styling and layout
- `CHANGELOG.md` - Detailed change history

## Requirements

- Modern web browser with JavaScript enabled
- No server or internet connection required - runs entirely in the browser

## Recent Updates

### Version 2.0 (February 2026)
- **Issue #2**: Modified break deduction to only apply to work days exceeding 4 hours
- **Issue #1**: Changed scope of work to dropdown with predefined options
- See `CHANGELOG.md` for detailed information
