# RER Time Sheet Calculator

A web-based time sheet logging system for tracking work hours with automatic break deductions and weekly totals.

## Features

- **Daily Entry Logging**: Record date, day of week, start time, end time, job site, and scope of work
- **Automatic Break Deduction**: 30 minutes automatically subtracted from each work day
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
   - Describe the scope of work
3. Click "Add Entry" to save
4. View your entries in the table below
5. Weekly totals are displayed at the top of the records section

## Technical Details

- **Break Calculation**: Each entry automatically deducts 30 minutes from total work time
- **Weekly Grouping**: Weeks start on Monday and all entries are grouped accordingly
- **Hour Format**: Hours are displayed in decimal format (e.g., 7.50 hours = 7 hours 30 minutes)

## Files

- `index.html` - Main application page
- `app.js` - Application logic and calculations
- `styles.css` - Styling and layout

## Requirements

- Modern web browser with JavaScript enabled
- No server or internet connection required - runs entirely in the browser
