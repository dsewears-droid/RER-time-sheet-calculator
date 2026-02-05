# RER Time Sheet Calculator

A simple weekly time sheet calculator that allows employees to submit their hours daily with automatic lunch period deductions.

## Features

- **Daily Time Entry**: Enter start and end times for each day of the week
- **Automatic Lunch Deduction**: Automatically subtracts 30 minutes for lunch on workdays (Monday-Friday)
- **Real-time Calculations**: Instantly calculates daily and weekly totals
- **Clean UI**: Modern, responsive design that works on desktop and mobile
- **Summary View**: Shows total gross hours, lunch deductions, and net hours

## Usage

1. Open `index.html` in your web browser
2. Enter your start and end times for each workday
3. The calculator automatically:
   - Calculates hours worked per day
   - Deducts 30 minutes lunch time for workdays (Mon-Fri)
   - Displays total net hours for the week
4. Click "Submit Timesheet" to finalize your entries
5. Use "Clear All" to reset the form

## How It Works

- **Workdays** (Monday-Friday): 30 minutes automatically deducted for lunch
- **Weekends** (Saturday-Sunday): No lunch deduction applied
- **Real-time Updates**: Hours are calculated as you type
- **Validation**: Ensures end time is after start time

## Example

If you work Monday-Friday from 9:00 AM to 5:00 PM:
- Gross hours per day: 8.00 hours
- Lunch deduction: 0.50 hours (30 minutes)
- Net hours per day: 7.50 hours
- **Weekly total: 37.50 hours**
